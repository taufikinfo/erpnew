from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.auth import get_current_profile
from app.models import SalesLead, Profile
from app.schemas import SalesLeadCreate, SalesLeadUpdate, SalesLeadResponse

router = APIRouter()

@router.get("/", response_model=List[SalesLeadResponse])
async def get_sales_leads(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_profile: Profile = Depends(get_current_profile)
):
    """Get all sales leads with pagination."""
    leads = db.query(SalesLead).offset(skip).limit(limit).all()
    return leads

@router.get("/{lead_id}", response_model=SalesLeadResponse)
async def get_sales_lead(
    lead_id: str,
    db: Session = Depends(get_db),
    current_profile: Profile = Depends(get_current_profile)
):
    """Get a specific sales lead by ID."""
    lead = db.query(SalesLead).filter(SalesLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Sales lead not found")
    return lead

@router.post("/", response_model=SalesLeadResponse)
async def create_sales_lead(
    lead: SalesLeadCreate,
    db: Session = Depends(get_db),
    current_profile: Profile = Depends(get_current_profile)
):
    """Create a new sales lead."""
    db_lead = SalesLead(**lead.dict(), created_by=current_profile.id)
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@router.put("/{lead_id}", response_model=SalesLeadResponse)
async def update_sales_lead(
    lead_id: str,
    lead_update: SalesLeadUpdate,
    db: Session = Depends(get_db),
    current_profile: Profile = Depends(get_current_profile)
):
    """Update a sales lead."""
    lead = db.query(SalesLead).filter(SalesLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Sales lead not found")
    
    update_data = lead_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(lead, field, value)
    
    db.commit()
    db.refresh(lead)
    return lead

@router.delete("/{lead_id}")
async def delete_sales_lead(
    lead_id: str,
    db: Session = Depends(get_db),
    current_profile: Profile = Depends(get_current_profile)
):
    """Delete a sales lead."""
    lead = db.query(SalesLead).filter(SalesLead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Sales lead not found")
    
    db.delete(lead)
    db.commit()
    return {"message": "Sales lead deleted successfully"}
