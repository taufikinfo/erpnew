from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import Doc
from app.schemas import DocCreate, DocUpdate, DocResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["docs"])

@router.get("/", response_model=List[DocResponse])
def get_docs(
    published_only: bool = True,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all documentation pages."""
    query = db.query(Doc)
    
    if published_only:
        query = query.filter(Doc.published == True)
    
    if category:
        query = query.filter(Doc.category == category)
    
    docs = query.order_by(Doc.category, Doc.title).all()
    return docs

@router.get("/{slug}", response_model=DocResponse)
def get_doc_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a documentation page by slug."""
    doc = db.query(Doc).filter(Doc.slug == slug, Doc.published == True).first()
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation page not found"
        )
    return doc

@router.post("/", response_model=DocResponse)
def create_doc(
    doc: DocCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new documentation page."""
    # Check if slug already exists
    existing_doc = db.query(Doc).filter(Doc.slug == doc.slug).first()
    if existing_doc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A document with this slug already exists"
        )
    
    db_doc = Doc(
        **doc.dict(),
        created_by=current_user["sub"],
        updated_by=current_user["sub"]
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

@router.put("/{doc_id}", response_model=DocResponse)
def update_doc(
    doc_id: str,
    doc: DocUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a documentation page."""
    db_doc = db.query(Doc).filter(Doc.id == doc_id).first()
    if not db_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation page not found"
        )
    
    # Check if slug conflicts with another document
    if doc.slug and doc.slug != db_doc.slug:
        existing_doc = db.query(Doc).filter(Doc.slug == doc.slug, Doc.id != doc_id).first()
        if existing_doc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A document with this slug already exists"
            )
    
    update_data = doc.dict(exclude_unset=True)
    update_data["updated_by"] = current_user["sub"]
    
    for field, value in update_data.items():
        setattr(db_doc, field, value)
    
    db.commit()
    db.refresh(db_doc)
    return db_doc

@router.delete("/{doc_id}")
def delete_doc(
    doc_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a documentation page."""
    db_doc = db.query(Doc).filter(Doc.id == doc_id).first()
    if not db_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation page not found"
        )
    
    db.delete(db_doc)
    db.commit()
    return {"message": "Documentation page deleted successfully"}

@router.get("/categories/", response_model=List[str])
def get_doc_categories(
    db: Session = Depends(get_db)
):
    """Get all unique documentation categories."""
    categories = db.query(Doc.category).filter(Doc.published == True).distinct().all()
    return [cat[0] for cat in categories if cat[0]]
