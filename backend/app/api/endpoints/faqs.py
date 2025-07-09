from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import FAQ
from app.schemas import FAQCreate, FAQUpdate, FAQResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["faqs"])

@router.get("/", response_model=List[FAQResponse])
def get_faqs(
    published_only: bool = True,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all FAQ items."""
    query = db.query(FAQ)
    
    if published_only:
        query = query.filter(FAQ.published == True)
    
    if category:
        query = query.filter(FAQ.category == category)
    
    faqs = query.order_by(FAQ.order_index).all()
    return faqs

@router.get("/{faq_id}", response_model=FAQResponse)
def get_faq(
    faq_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific FAQ item."""
    faq = db.query(FAQ).filter(FAQ.id == faq_id, FAQ.published == True).first()
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found"
        )
    return faq

@router.post("/", response_model=FAQResponse)
def create_faq(
    faq: FAQCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new FAQ item."""
    db_faq = FAQ(
        **faq.dict(),
        created_by=current_user["sub"],
        updated_by=current_user["sub"]
    )
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq

@router.put("/{faq_id}", response_model=FAQResponse)
def update_faq(
    faq_id: str,
    faq: FAQUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update an FAQ item."""
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not db_faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found"
        )
    
    update_data = faq.dict(exclude_unset=True)
    update_data["updated_by"] = current_user["sub"]
    
    for field, value in update_data.items():
        setattr(db_faq, field, value)
    
    db.commit()
    db.refresh(db_faq)
    return db_faq

@router.delete("/{faq_id}")
def delete_faq(
    faq_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete an FAQ item."""
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not db_faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="FAQ not found"
        )
    
    db.delete(db_faq)
    db.commit()
    return {"message": "FAQ deleted successfully"}

@router.get("/categories/", response_model=List[str])
def get_faq_categories(
    db: Session = Depends(get_db)
):
    """Get all unique FAQ categories."""
    categories = db.query(FAQ.category).filter(FAQ.published == True).distinct().all()
    return [cat[0] for cat in categories if cat[0]]
