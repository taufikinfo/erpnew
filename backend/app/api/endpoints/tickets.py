from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc, asc
from typing import List, Optional
from datetime import datetime, timedelta
import uuid
import os
import shutil

from app.core.database import get_db
from app.models import Ticket, TicketComment, TicketAttachment, TicketHistory
from app.models.tickets import TicketStatus as ModelTicketStatus, TicketPriority as ModelTicketPriority
from app.schemas.tickets import (
    TicketCreate, TicketUpdate, TicketResponse, TicketListResponse, 
    TicketCommentCreate, TicketCommentResponse, TicketStatsResponse,
    TicketStatus, TicketPriority
)

router = APIRouter()


def generate_ticket_number() -> str:
    """Generate a unique ticket number"""
    return f"TK-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"


def log_ticket_change(db: Session, ticket_id: str, field_name: str, old_value: str, new_value: str, changed_by: str):
    """Log ticket field changes to history"""
    if old_value != new_value:
        # Skip logging if changed_by is 'system' or not a valid UUID
        if changed_by == 'system' or not changed_by:
            return
        
        try:
            history = TicketHistory(
                ticket_id=ticket_id,
                field_name=field_name,
                old_value=old_value,
                new_value=new_value,
                changed_by=changed_by
            )
            db.add(history)
        except Exception as e:
            # Log the error but don't fail the ticket update
            print(f"Warning: Could not log ticket change: {e}")
            return


@router.post("/", response_model=TicketResponse)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db),
    current_user: str = "system"  # TODO: Replace with actual auth
):
    """Create a new ticket"""
    db_ticket = Ticket(
        ticket_number=generate_ticket_number(),
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        ticket_type=ticket.ticket_type,
        department=ticket.department,
        module=ticket.module,
        due_date=ticket.due_date,
        assigned_to=ticket.assigned_to,
        created_by=current_user
    )
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    return db_ticket


@router.get("/", response_model=List[TicketListResponse])
def get_tickets(
    skip: int = 0,
    limit: int = 50,
    status: Optional[TicketStatus] = None,
    priority: Optional[TicketPriority] = None,
    ticket_type: Optional[str] = None,
    department: Optional[str] = None,
    assigned_to: Optional[str] = None,
    created_by: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
    db: Session = Depends(get_db)
):
    """Get tickets with filtering and pagination"""
    query = db.query(Ticket)
    
    # Apply filters
    if status:
        query = query.filter(Ticket.status == status)
    if priority:
        query = query.filter(Ticket.priority == priority)
    if ticket_type:
        query = query.filter(Ticket.ticket_type == ticket_type)
    if department:
        query = query.filter(Ticket.department == department)
    if assigned_to:
        query = query.filter(Ticket.assigned_to == assigned_to)
    if created_by:
        query = query.filter(Ticket.created_by == created_by)
    if search:
        query = query.filter(
            or_(
                Ticket.title.contains(search),
                Ticket.description.contains(search),
                Ticket.ticket_number.contains(search)
            )
        )
    
    # Apply sorting
    if sort_order == "desc":
        query = query.order_by(desc(getattr(Ticket, sort_by)))
    else:
        query = query.order_by(asc(getattr(Ticket, sort_by)))
    
    return query.offset(skip).limit(limit).all()


@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    """Get a specific ticket by ID"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    return ticket


@router.put("/{ticket_id}", response_model=TicketResponse)
def update_ticket(
    ticket_id: str,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: str = "system"  # TODO: Replace with actual auth
):
    """Update a ticket"""
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Log changes
    update_data = ticket_update.dict(exclude_unset=True)
    for field, new_value in update_data.items():
        if hasattr(db_ticket, field):
            old_value = getattr(db_ticket, field)
            log_ticket_change(db, ticket_id, field, str(old_value), str(new_value), current_user)
    
    # Update fields
    for field, value in update_data.items():
        if hasattr(db_ticket, field):
            # Skip updating description if it's None (empty string was provided)
            if field == 'description' and value is None:
                continue
            setattr(db_ticket, field, value)
    
    # Set resolved_at if status is resolved
    if ticket_update.status == TicketStatus.RESOLVED and db_ticket.resolved_at is None:
        db_ticket.resolved_at = datetime.now()
    
    db.commit()
    db.refresh(db_ticket)
    
    return db_ticket


@router.delete("/{ticket_id}")
def delete_ticket(ticket_id: str, db: Session = Depends(get_db)):
    """Delete a ticket"""
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    db.delete(db_ticket)
    db.commit()
    
    return {"message": "Ticket deleted successfully"}


@router.post("/{ticket_id}/comments", response_model=TicketCommentResponse)
def add_comment(
    ticket_id: str,
    comment: TicketCommentCreate,
    db: Session = Depends(get_db),
    current_user: str = "system"  # TODO: Replace with actual auth
):
    """Add a comment to a ticket"""
    # Check if ticket exists
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    db_comment = TicketComment(
        ticket_id=ticket_id,
        user_id=current_user,
        comment=comment.comment,
        is_internal=comment.is_internal
    )
    
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    
    return db_comment


@router.get("/{ticket_id}/comments", response_model=List[TicketCommentResponse])
def get_comments(
    ticket_id: str,
    include_internal: bool = False,
    db: Session = Depends(get_db)
):
    """Get comments for a ticket"""
    query = db.query(TicketComment).filter(TicketComment.ticket_id == ticket_id)
    
    if not include_internal:
        query = query.filter(TicketComment.is_internal == False)
    
    return query.order_by(TicketComment.created_at).all()


@router.get("/stats/summary", response_model=TicketStatsResponse)
def get_ticket_stats(db: Session = Depends(get_db)):
    """Get ticket statistics"""
    total_tickets = db.query(Ticket).count()
    open_tickets = db.query(Ticket).filter(Ticket.status == ModelTicketStatus.OPEN.value).count()
    in_progress_tickets = db.query(Ticket).filter(Ticket.status == ModelTicketStatus.IN_PROGRESS.value).count()
    resolved_tickets = db.query(Ticket).filter(Ticket.status == ModelTicketStatus.RESOLVED.value).count()
    closed_tickets = db.query(Ticket).filter(Ticket.status == ModelTicketStatus.CLOSED.value).count()
    urgent_tickets = db.query(Ticket).filter(Ticket.priority == ModelTicketPriority.URGENT.value).count()
    high_priority_tickets = db.query(Ticket).filter(Ticket.priority == ModelTicketPriority.HIGH.value).count()
    
    # Overdue tickets (due_date < now and status not resolved/closed)
    overdue_tickets = db.query(Ticket).filter(
        and_(
            Ticket.due_date < datetime.now(),
            Ticket.status.not_in([ModelTicketStatus.RESOLVED.value, ModelTicketStatus.CLOSED.value])
        )
    ).count()
    
    return TicketStatsResponse(
        total_tickets=total_tickets,
        open_tickets=open_tickets,
        in_progress_tickets=in_progress_tickets,
        resolved_tickets=resolved_tickets,
        closed_tickets=closed_tickets,
        urgent_tickets=urgent_tickets,
        high_priority_tickets=high_priority_tickets,
        overdue_tickets=overdue_tickets
    )
