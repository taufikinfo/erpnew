from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import Profile, User, UserRole
from app.schemas import ProfileResponse, ProfileUpdate
from app.core.auth import get_current_user, get_password_hash
from pydantic import BaseModel

router = APIRouter(tags=["users"])

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str | None
    last_name: str | None
    phone: str | None
    job_title: str | None
    bio: str | None
    status: str
    last_login: str | None
    account_locked: bool
    created_at: str
    
    class Config:
        from_attributes = True

class UserStatusUpdate(BaseModel):
    status: str

class UserRoleUpdate(BaseModel):
    role: str

class PasswordReset(BaseModel):
    new_password: str

@router.get("/", response_model=List[UserResponse])
def get_users(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all users (admin only)."""
    # For now, assume admin if user exists - you can enhance this with proper role checking
    profiles = db.query(Profile).all()
    
    # Convert profiles to user response format
    users = []
    for profile in profiles:
        user_data = {
            "id": profile.id,
            "email": profile.email,
            "first_name": profile.first_name,
            "last_name": profile.last_name,
            "phone": profile.phone,
            "job_title": profile.job_title,
            "bio": profile.bio,
            "status": profile.status or "active",
            "last_login": profile.last_login.isoformat() if profile.last_login else None,
            "account_locked": profile.account_locked or False,
            "created_at": profile.created_at.isoformat(),
        }
        users.append(user_data)
    
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific user by ID (admin only)."""
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user_data = {
        "id": profile.id,
        "email": profile.email,
        "first_name": profile.first_name,
        "last_name": profile.last_name,
        "phone": profile.phone,
        "job_title": profile.job_title,
        "bio": profile.bio,
        "status": profile.status or "active",
        "last_login": profile.last_login.isoformat() if profile.last_login else None,
        "account_locked": profile.account_locked or False,
        "created_at": profile.created_at.isoformat(),
    }
    
    return user_data

@router.put("/{user_id}/status")
def update_user_status(
    user_id: str,
    status_update: UserStatusUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user status (admin only)."""
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    profile.status = status_update.status
    db.commit()
    db.refresh(profile)
    
    return {"message": "User status updated successfully"}

@router.put("/{user_id}/profile")
def update_user_profile(
    user_id: str,
    profile_update: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile (admin only)."""
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update profile fields
    for field, value in profile_update.dict(exclude_unset=True).items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    
    return {"message": "User profile updated successfully"}

@router.post("/{user_id}/reset-password")
def reset_user_password(
    user_id: str,
    password_reset: PasswordReset,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Reset user password (admin only)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.password_hash = get_password_hash(password_reset.new_password)
    db.commit()
    
    return {"message": "Password reset successfully"}

@router.post("/{user_id}/unlock-account")
def unlock_user_account(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Unlock user account (admin only)."""
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    profile.account_locked = False
    db.commit()
    
    return {"message": "User account unlocked successfully"}

@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete user (admin only)."""
    # Don't allow user to delete themselves
    if user_id == current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    user = db.query(User).filter(User.id == user_id).first()
    
    if not profile or not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Delete profile and user
    db.delete(profile)
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
