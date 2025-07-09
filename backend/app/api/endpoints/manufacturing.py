from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import WorkOrder
from app.schemas import WorkOrderCreate, WorkOrderUpdate, WorkOrderResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["manufacturing"])

@router.get("/work-orders/", response_model=List[WorkOrderResponse])
def get_work_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get all work orders."""
    work_orders = db.query(WorkOrder).offset(skip).limit(limit).all()
    return work_orders

@router.get("/work-orders/{work_order_id}", response_model=WorkOrderResponse)
def get_work_order(
    work_order_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get a specific work order by ID."""
    work_order = db.query(WorkOrder).filter(WorkOrder.id == work_order_id).first()
    if not work_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Work order not found"
        )
    return work_order

@router.post("/work-orders/", response_model=WorkOrderResponse)
def create_work_order(
    work_order: WorkOrderCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new work order."""
    db_work_order = WorkOrder(**work_order.dict(), created_by=current_user["id"])
    db.add(db_work_order)
    db.commit()
    db.refresh(db_work_order)
    return db_work_order

@router.put("/work-orders/{work_order_id}", response_model=WorkOrderResponse)
def update_work_order(
    work_order_id: str,
    work_order: WorkOrderUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a work order."""
    db_work_order = db.query(WorkOrder).filter(WorkOrder.id == work_order_id).first()
    if not db_work_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Work order not found"
        )
    
    for field, value in work_order.dict(exclude_unset=True).items():
        setattr(db_work_order, field, value)
    
    db.commit()
    db.refresh(db_work_order)
    return db_work_order

@router.delete("/work-orders/{work_order_id}")
def delete_work_order(
    work_order_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a work order."""
    work_order = db.query(WorkOrder).filter(WorkOrder.id == work_order_id).first()
    if not work_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Work order not found"
        )
    
    db.delete(work_order)
    db.commit()
    return {"message": "Work order deleted successfully"}
