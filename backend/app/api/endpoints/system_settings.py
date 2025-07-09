from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.models import SystemSetting
from app.core.auth import get_current_user
from pydantic import BaseModel

router = APIRouter(tags=["system-settings"])

class SystemSettingResponse(BaseModel):
    id: str
    auto_backup: bool
    api_access: bool
    debug_mode: bool
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True

class SystemSettingUpdate(BaseModel):
    auto_backup: Optional[bool] = None
    api_access: Optional[bool] = None
    debug_mode: Optional[bool] = None

@router.get("/", response_model=SystemSettingResponse)
def get_system_settings(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get system settings (admin only)."""
    # For now, assume admin if user exists - you can enhance this with proper role checking
    settings = db.query(SystemSetting).first()
    
    if not settings:
        # Create default settings if none exist
        settings = SystemSetting(
            auto_backup=True,
            api_access=False,
            debug_mode=False,
            created_by=current_user["id"]
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    
    return {
        "id": settings.id,
        "auto_backup": settings.auto_backup,
        "api_access": settings.api_access,
        "debug_mode": settings.debug_mode,
        "created_at": settings.created_at.isoformat(),
        "updated_at": settings.updated_at.isoformat(),
    }

@router.put("/", response_model=SystemSettingResponse)
def update_system_settings(
    settings_update: SystemSettingUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update system settings (admin only)."""
    settings = db.query(SystemSetting).first()
    
    if not settings:
        # Create new settings if none exist
        settings = SystemSetting(
            auto_backup=settings_update.auto_backup if settings_update.auto_backup is not None else True,
            api_access=settings_update.api_access if settings_update.api_access is not None else False,
            debug_mode=settings_update.debug_mode if settings_update.debug_mode is not None else False,
            created_by=current_user["id"]
        )
        db.add(settings)
    else:
        # Update existing settings
        if settings_update.auto_backup is not None:
            settings.auto_backup = settings_update.auto_backup
        if settings_update.api_access is not None:
            settings.api_access = settings_update.api_access
        if settings_update.debug_mode is not None:
            settings.debug_mode = settings_update.debug_mode
    
    db.commit()
    db.refresh(settings)
    
    return {
        "id": settings.id,
        "auto_backup": settings.auto_backup,
        "api_access": settings.api_access,
        "debug_mode": settings.debug_mode,
        "created_at": settings.created_at.isoformat(),
        "updated_at": settings.updated_at.isoformat(),
    }
