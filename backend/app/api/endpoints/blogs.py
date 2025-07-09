from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import Blog
from app.schemas import BlogCreate, BlogUpdate, BlogResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["blogs"])

@router.get("/", response_model=List[BlogResponse])
def get_blogs(
    published_only: bool = True,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all blog posts."""
    query = db.query(Blog)
    
    if published_only:
        query = query.filter(Blog.published == True)
    
    if category:
        query = query.filter(Blog.category == category)
    
    blogs = query.order_by(Blog.publish_date.desc()).all()
    return blogs

@router.get("/{slug}", response_model=BlogResponse)
def get_blog_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a blog post by slug."""
    blog = db.query(Blog).filter(Blog.slug == slug, Blog.published == True).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return blog

@router.post("/", response_model=BlogResponse)
def create_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new blog post."""
    # Check if slug already exists
    existing_blog = db.query(Blog).filter(Blog.slug == blog.slug).first()
    if existing_blog:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A blog post with this slug already exists"
        )
    
    db_blog = Blog(
        **blog.dict(),
        created_by=current_user["sub"],
        updated_by=current_user["sub"]
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_id: str,
    blog: BlogUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update a blog post."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Check if slug conflicts with another blog
    if blog.slug and blog.slug != db_blog.slug:
        existing_blog = db.query(Blog).filter(Blog.slug == blog.slug, Blog.id != blog_id).first()
        if existing_blog:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A blog post with this slug already exists"
            )
    
    update_data = blog.dict(exclude_unset=True)
    update_data["updated_by"] = current_user["sub"]
    
    for field, value in update_data.items():
        setattr(db_blog, field, value)
    
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.delete("/{blog_id}")
def delete_blog(
    blog_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a blog post."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    db.delete(db_blog)
    db.commit()
    return {"message": "Blog post deleted successfully"}

@router.get("/categories/", response_model=List[str])
def get_blog_categories(
    db: Session = Depends(get_db)
):
    """Get all unique blog categories."""
    categories = db.query(Blog.category).filter(Blog.published == True).distinct().all()
    return [cat[0] for cat in categories if cat[0]]
