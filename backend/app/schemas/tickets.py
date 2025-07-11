from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum


class TicketStatus(str, Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"
    REOPENED = "reopened"


class TicketPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TicketType(str, Enum):
    BUG = "bug"
    FEATURE_REQUEST = "feature_request"
    SUPPORT = "support"
    IMPROVEMENT = "improvement"
    QUESTION = "question"


# Base schemas
class TicketBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    priority: TicketPriority = TicketPriority.MEDIUM
    ticket_type: TicketType = TicketType.SUPPORT
    department: Optional[str] = None
    module: Optional[str] = None
    due_date: Optional[datetime] = None
    assigned_to: Optional[str] = None


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    ticket_type: Optional[TicketType] = None
    department: Optional[str] = None
    module: Optional[str] = None
    due_date: Optional[datetime] = None
    assigned_to: Optional[str] = None

    @validator('description')
    def validate_description(cls, v):
        if v is not None and v.strip() == '':
            return None
        return v


class TicketCommentBase(BaseModel):
    comment: str = Field(..., min_length=1)
    is_internal: bool = False


class TicketCommentCreate(TicketCommentBase):
    pass


class TicketCommentResponse(TicketCommentBase):
    id: str
    ticket_id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TicketAttachmentResponse(BaseModel):
    id: str
    ticket_id: str
    filename: str
    file_size: Optional[int] = None
    mime_type: Optional[str] = None
    uploaded_by: str
    created_at: datetime

    class Config:
        from_attributes = True


class TicketHistoryResponse(BaseModel):
    id: str
    ticket_id: str
    field_name: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None
    changed_by: str
    created_at: datetime

    class Config:
        from_attributes = True


class TicketResponse(TicketBase):
    id: str
    ticket_number: str
    status: TicketStatus
    created_by: str
    resolved_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TicketListResponse(BaseModel):
    id: str
    ticket_number: str
    title: str
    status: TicketStatus
    priority: TicketPriority
    ticket_type: TicketType
    department: Optional[str] = None
    module: Optional[str] = None
    created_by: str
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TicketStatsResponse(BaseModel):
    total_tickets: int
    open_tickets: int
    in_progress_tickets: int
    resolved_tickets: int
    closed_tickets: int
    urgent_tickets: int
    high_priority_tickets: int
    overdue_tickets: int
