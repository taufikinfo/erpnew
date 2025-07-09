from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models import ChatMessage, ChatTypingIndicator, Profile
from app.core.auth import get_current_user
from pydantic import BaseModel

router = APIRouter(tags=["chat"])

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: str
    user_id: str
    user_name: str
    content: str
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True

class TypingIndicatorCreate(BaseModel):
    is_typing: bool

class TypingIndicatorResponse(BaseModel):
    id: str
    user_id: str
    user_name: str
    is_typing: bool
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True

@router.get("/messages", response_model=List[MessageResponse])
def get_messages(
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get chat messages."""
    messages = db.query(ChatMessage).order_by(ChatMessage.created_at.desc()).offset(skip).limit(limit).all()
    
    result = []
    for message in reversed(messages):  # Reverse to show oldest first
        # Get user profile for user_name
        profile = db.query(Profile).filter(Profile.id == message.user_id).first()
        user_name = f"{profile.first_name} {profile.last_name}" if profile and profile.first_name and profile.last_name else profile.email if profile else "Unknown User"
        
        result.append({
            "id": message.id,
            "user_id": message.user_id,
            "user_name": user_name,
            "content": message.content,
            "created_at": message.created_at.isoformat(),
            "updated_at": message.updated_at.isoformat(),
        })
    
    return result

@router.post("/messages", response_model=MessageResponse)
def create_message(
    message: MessageCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new chat message."""
    # Get user profile for user_name
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    user_name = f"{profile.first_name} {profile.last_name}" if profile and profile.first_name and profile.last_name else profile.email if profile else "Unknown User"
    
    db_message = ChatMessage(
        user_id=current_user.id,
        content=message.content,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return {
        "id": db_message.id,
        "user_id": db_message.user_id,
        "user_name": user_name,
        "content": db_message.content,
        "created_at": db_message.created_at.isoformat(),
        "updated_at": db_message.updated_at.isoformat(),
    }

@router.get("/typing-indicators", response_model=List[TypingIndicatorResponse])
def get_typing_indicators(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current typing indicators."""
    # Clean up old typing indicators (older than 5 seconds)
    five_seconds_ago = datetime.now() - timedelta(seconds=5)
    db.query(ChatTypingIndicator).filter(ChatTypingIndicator.updated_at < five_seconds_ago).delete()
    
    indicators = db.query(ChatTypingIndicator).filter(
        ChatTypingIndicator.is_typing == True,
        ChatTypingIndicator.user_id != current_user.id
    ).all()
    
    result = []
    for indicator in indicators:
        # Get user profile for user_name
        profile = db.query(Profile).filter(Profile.id == indicator.user_id).first()
        user_name = f"{profile.first_name} {profile.last_name}" if profile and profile.first_name and profile.last_name else profile.email if profile else "Unknown User"
        
        result.append({
            "id": indicator.id,
            "user_id": indicator.user_id,
            "user_name": user_name,
            "is_typing": indicator.is_typing,
            "created_at": indicator.created_at.isoformat(),
            "updated_at": indicator.updated_at.isoformat(),
        })
    
    return result

@router.post("/typing-indicators", response_model=TypingIndicatorResponse)
def update_typing_indicator(
    typing_data: TypingIndicatorCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update typing indicator for current user."""
    # Get user profile for user_name
    profile = db.query(Profile).filter(Profile.id == current_user.id).first()
    user_name = f"{profile.first_name} {profile.last_name}" if profile and profile.first_name and profile.last_name else profile.email if profile else "Unknown User"
    
    # Check if indicator already exists
    existing = db.query(ChatTypingIndicator).filter(
        ChatTypingIndicator.user_id == current_user.id
    ).first()
    
    if existing:
        existing.is_typing = typing_data.is_typing
        existing.updated_at = datetime.now()
        db.commit()
        db.refresh(existing)
        indicator = existing
    else:
        indicator = ChatTypingIndicator(
            user_id=current_user.id,
            is_typing=typing_data.is_typing,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(indicator)
        db.commit()
        db.refresh(indicator)
    
    return {
        "id": indicator.id,
        "user_id": indicator.user_id,
        "user_name": user_name,
        "is_typing": indicator.is_typing,
        "created_at": indicator.created_at.isoformat(),
        "updated_at": indicator.updated_at.isoformat(),
    }
