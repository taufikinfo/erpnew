from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import PurchaseOrder, Supplier
from app.schemas import PurchaseOrderCreate, PurchaseOrderUpdate, PurchaseOrderResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["purchase-orders"])

@router.get("/", response_model=List[PurchaseOrderResponse])
def get_purchase_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get all purchase orders."""
    purchase_orders = db.query(PurchaseOrder).offset(skip).limit(limit).all()
    return purchase_orders

@router.get("/{po_id}", response_model=PurchaseOrderResponse)
def get_purchase_order(
    po_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get a specific purchase order by ID."""
    purchase_order = db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()
    if not purchase_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Purchase order not found"
        )
    return purchase_order

@router.post("/", response_model=PurchaseOrderResponse)
def create_purchase_order(
    purchase_order: PurchaseOrderCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new purchase order."""
    db_purchase_order = PurchaseOrder(**purchase_order.dict(), created_by=current_user["id"])
    db.add(db_purchase_order)
    db.commit()
    db.refresh(db_purchase_order)
    return db_purchase_order

@router.put("/{po_id}", response_model=PurchaseOrderResponse)
def update_purchase_order(
    po_id: str,
    purchase_order: PurchaseOrderUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a purchase order."""
    db_purchase_order = db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()
    if not db_purchase_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Purchase order not found"
        )
    
    for field, value in purchase_order.dict(exclude_unset=True).items():
        setattr(db_purchase_order, field, value)
    
    db.commit()
    db.refresh(db_purchase_order)
    return db_purchase_order

@router.delete("/{po_id}")
def delete_purchase_order(
    po_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a purchase order."""
    purchase_order = db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()
    if not purchase_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Purchase order not found"
        )
    
    db.delete(purchase_order)
    db.commit()
    return {"message": "Purchase order deleted successfully"}
