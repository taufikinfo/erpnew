from sqlalchemy import Column, String, Text, DateTime, Enum, ForeignKey, Integer
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid
import enum


class TicketStatus(enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"
    REOPENED = "reopened"


class TicketPriority(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TicketType(enum.Enum):
    BUG = "bug"
    FEATURE_REQUEST = "feature_request"
    SUPPORT = "support"
    IMPROVEMENT = "improvement"
    QUESTION = "question"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_number = Column(String(50), nullable=False, unique=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), nullable=False, default=TicketStatus.OPEN)
    priority = Column(Enum(TicketPriority), nullable=False, default=TicketPriority.MEDIUM)
    ticket_type = Column(Enum(TicketType), nullable=False, default=TicketType.SUPPORT)
    
    # User relationships (using string references for now)
    created_by = Column(CHAR(36), nullable=False)  # User who created the ticket
    assigned_to = Column(CHAR(36), nullable=True)  # User assigned to handle the ticket
    
    # Department/Module
    department = Column(String(100), nullable=True)  # e.g., "Finance", "HR", "IT"
    module = Column(String(100), nullable=True)  # e.g., "Invoicing", "Payroll", "System"
    
    # Dates
    due_date = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    comments = relationship("TicketComment", back_populates="ticket", cascade="all, delete-orphan")
    attachments = relationship("TicketAttachment", back_populates="ticket", cascade="all, delete-orphan")


class TicketComment(Base):
    __tablename__ = "ticket_comments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String(36), ForeignKey("tickets.id"), nullable=False)
    comment = Column(Text, nullable=False)
    created_by = Column(CHAR(36), nullable=False)
    is_internal = Column(String(5), nullable=False, default="false")  # Internal comments not visible to ticket creator
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    ticket = relationship("Ticket", back_populates="comments")


class TicketAttachment(Base):
    __tablename__ = "ticket_attachments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String(36), ForeignKey("tickets.id"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String(100), nullable=True)
    uploaded_by = Column(CHAR(36), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    ticket = relationship("Ticket", back_populates="attachments")


class TicketHistory(Base):
    __tablename__ = "ticket_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String(36), ForeignKey("tickets.id"), nullable=False)
    field_name = Column(String(50), nullable=False)  # e.g., "status", "priority", "assigned_to"
    old_value = Column(String(255), nullable=True)
    new_value = Column(String(255), nullable=True)
    changed_by = Column(CHAR(36), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
