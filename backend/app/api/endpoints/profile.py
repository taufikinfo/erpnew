from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models import Profile, UserPreference
from app.schemas import ProfileCreate, ProfileUpdate, ProfileResponse
from app.core.auth import get_current_user

router = APIRouter(tags=["profile"])

@router.get("/", response_model=ProfileResponse)
async def get_current_profile(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user's profile."""
    profile = db.query(Profile).filter(Profile.email == current_user.email).first()
    if not profile:
        # Create a profile if it doesn't exist
        profile = Profile(
            id=current_user.id,
            email=current_user.email
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/", response_model=ProfileResponse)
async def update_profile(
    profile_update: ProfileUpdate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user's profile."""
    profile = db.query(Profile).filter(Profile.email == current_user.email).first()
    if not profile:
        # Create a profile if it doesn't exist
        profile = Profile(
            id=current_user.id,
            email=current_user.email
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    # Update profile fields
    for field, value in profile_update.dict(exclude_unset=True).items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/notifications")
async def get_notification_preferences(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's notification preferences."""
    # Get the profile first to get the correct ID
    profile = db.query(Profile).filter(Profile.email == current_user.email).first()
    if not profile:
        profile = Profile(
            id=current_user.id,
            email=current_user.email
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    preferences = db.query(UserPreference).filter(
        UserPreference.user_id == profile.id
    ).first()
    
    if not preferences:
        # Create default preferences if none exist
        preferences = UserPreference(
            user_id=profile.id,
            email_notifications=True,
            push_notifications=False,
            project_updates=True,
            task_assignments=True,
            system_maintenance=False,
            dark_mode=False,
            compact_view=False,
            language='en',
            timezone='utc'
        )
        db.add(preferences)
        db.commit()
        db.refresh(preferences)
    
    return {
        "email_notifications": preferences.email_notifications,
        "push_notifications": preferences.push_notifications,
        "project_updates": preferences.project_updates,
        "task_assignments": preferences.task_assignments,
        "system_maintenance": preferences.system_maintenance,
        "dark_mode": preferences.dark_mode,
        "compact_view": preferences.compact_view,
        "language": preferences.language,
        "timezone": preferences.timezone
    }

@router.put("/notifications")
async def update_notification_preferences(
    notifications: dict,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user's notification preferences."""
    # Get the profile first to get the correct ID
    profile = db.query(Profile).filter(Profile.email == current_user.email).first()
    if not profile:
        profile = Profile(
            id=current_user.id,
            email=current_user.email
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    preferences = db.query(UserPreference).filter(
        UserPreference.user_id == profile.id
    ).first()
    
    if not preferences:
        preferences = UserPreference(user_id=profile.id)
        db.add(preferences)
    
    # Update notification settings
    for field, value in notifications.items():
        if hasattr(preferences, field):
            setattr(preferences, field, value)
    
    db.commit()
    db.refresh(preferences)
    
    # Return the updated preferences
    return {
        "email_notifications": preferences.email_notifications,
        "push_notifications": preferences.push_notifications,
        "project_updates": preferences.project_updates,
        "task_assignments": preferences.task_assignments,
        "system_maintenance": preferences.system_maintenance,
        "dark_mode": preferences.dark_mode,
        "compact_view": preferences.compact_view,
        "language": preferences.language,
        "timezone": preferences.timezone
    }
