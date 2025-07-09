from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import Supplier
from app.schemas import SupplierCreate, SupplierUpdate, SupplierResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["vendors"])

@router.get("/", response_model=List[SupplierResponse])
def get_vendors(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get all vendors/suppliers."""
    vendors = db.query(Supplier).offset(skip).limit(limit).all()
    return vendors

@router.get("/{vendor_id}", response_model=SupplierResponse)
def get_vendor(
    vendor_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get a specific vendor by ID."""
    vendor = db.query(Supplier).filter(Supplier.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    return vendor

@router.post("/", response_model=SupplierResponse)
def create_vendor(
    vendor: SupplierCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new vendor."""
    db_vendor = Supplier(**vendor.dict(), created_by=current_user["id"])
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

@router.put("/{vendor_id}", response_model=SupplierResponse)
def update_vendor(
    vendor_id: str,
    vendor: SupplierUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a vendor."""
    db_vendor = db.query(Supplier).filter(Supplier.id == vendor_id).first()
    if not db_vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    
    for field, value in vendor.dict(exclude_unset=True).items():
        setattr(db_vendor, field, value)
    
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

@router.delete("/{vendor_id}")
def delete_vendor(
    vendor_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a vendor."""
    vendor = db.query(Supplier).filter(Supplier.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    
    db.delete(vendor)
    db.commit()
    return {"message": "Vendor deleted successfully"}
