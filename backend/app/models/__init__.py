from sqlalchemy import (
    Column, String, Boolean, Integer, Numeric, Date, DateTime, 
    ForeignKey, Text, JSON, Enum
)
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import declarative_base
from datetime import datetime
import uuid
import enum

# --- Base Model and Declarative Base ---
# Using declarative_base() from sqlalchemy.orm for modern SQLAlchemy
Base = declarative_base()

class BaseModel(Base):
    """
    An abstract base model that provides self-updating 'id', 'created_at', 
    and 'updated_at' fields.
    """
    __abstract__ = True
    # Using CHAR(36) for UUIDs is standard. It's indexed as the primary key.
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

# --- Enum Definitions ---
# Defining enums based on the types.ts file to ensure data consistency.
class AppRole(enum.Enum):
    admin = "admin"
    moderator = "moderator"
    user = "user"

class TicketStatus(enum.Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"
    reopened = "reopened"

class TicketPriority(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"

# --- Table Models ---

class Profile(BaseModel):
    """Represents user profiles, the central entity for users."""
    __tablename__ = "profiles"
    
    email = Column(String(255), nullable=False, unique=True)
    first_name = Column(String(255), nullable=True)
    last_name = Column(String(255), nullable=True)
    avatar_url = Column(Text, nullable=True)
    bio = Column(Text, nullable=True)
    job_title = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    # Added fields based on types.ts
    status = Column(String(50), nullable=True)
    last_login = Column(DateTime, nullable=True)
    account_locked = Column(Boolean, default=False, nullable=True)

class AdminUserAction(BaseModel):
    """Model for logging actions performed by administrators."""
    __tablename__ = "admin_user_actions"
    
    admin_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    target_user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    action_type = Column(String(255), nullable=False)
    details = Column(JSON, nullable=True)

class Blog(BaseModel):
    """Model for blog posts."""
    __tablename__ = "blogs"
    
    title = Column(Text, nullable=False)
    slug = Column(String(255), nullable=False, unique=True)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    featured_image = Column(Text, nullable=True)
    category = Column(Text, nullable=False)
    tags = Column(JSON, nullable=True)
    published = Column(Boolean, default=False, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    publish_date = Column(DateTime, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)
    updated_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Customer(BaseModel):
    """Model for customer information."""
    __tablename__ = "customers"
    
    name = Column(Text, nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Doc(BaseModel):
    """Model for documentation pages."""
    __tablename__ = "docs"
    
    title = Column(Text, nullable=False)
    slug = Column(String(255), nullable=False, unique=True)
    content = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    tags = Column(JSON, nullable=True)
    published = Column(Boolean, default=False, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)
    updated_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Employee(BaseModel):
    """Model for employee data."""
    __tablename__ = "employees"
    
    # FIX: Changed from Text to String(255) to allow unique=True (indexing) in MySQL.
    # This resolves the "key specification without a key length" error.
    employee_id = Column(String(255), nullable=False, unique=True)
    name = Column(Text, nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    department = Column(Text, nullable=False)
    position = Column(Text, nullable=False)
    salary = Column(Numeric(10, 2), nullable=True)
    hire_date = Column(Date, nullable=False)
    status = Column(String(50), default='active', nullable=False)
    first_name = Column(Text, nullable=True)
    last_name = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Expense(BaseModel):
    """Model for tracking expenses."""
    __tablename__ = "expenses"
    
    expense_number = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    vendor = Column(Text, nullable=False)
    expense_date = Column(Date, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class FAQ(BaseModel):
    """Model for frequently asked questions."""
    __tablename__ = "faqs"
    
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    published = Column(Boolean, default=False, nullable=False)
    order_index = Column(Integer, default=0, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)
    updated_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Group(BaseModel):
    """Model for user groups."""
    __tablename__ = "groups"
    
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)

class GroupMember(BaseModel):
    """Model for tracking members of groups."""
    __tablename__ = "group_members"
    
    group_id = Column(CHAR(36), ForeignKey('groups.id'), nullable=False)
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    role = Column(Text, default='member', nullable=True)
    joined_at = Column(DateTime, default=datetime.utcnow, nullable=False)

class InventoryItem(BaseModel):
    """Model for inventory items."""
    __tablename__ = "inventory_items"
    
    name = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    stock = Column(Integer, default=0, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    supplier = Column(Text, nullable=False)
    status = Column(String(50), nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Invoice(BaseModel):
    """Model for invoices."""
    __tablename__ = "invoices"
    
    invoice_number = Column(Text, nullable=False)
    client_name = Column(Text, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    status = Column(String(50), default='pending', nullable=False)
    issue_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class LeaveRequest(BaseModel):
    """Model for employee leave requests."""
    __tablename__ = "leave_requests"
    
    employee_id = Column(CHAR(36), ForeignKey('employees.id'), nullable=True)
    leave_type = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    days_requested = Column(Integer, nullable=False)
    reason = Column(Text, nullable=True)
    status = Column(String(50), default='pending', nullable=False)

class Message(BaseModel):
    """Model for chat messages."""
    __tablename__ = "messages"

    user_id = Column(CHAR(36), nullable=False)
    user_name = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

class Project(BaseModel):
    """Model for projects."""
    __tablename__ = "projects"
    
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    budget = Column(Numeric(12, 2), nullable=True)
    progress = Column(Integer, default=0, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Supplier(BaseModel):
    """Model for supplier information. Referenced by PurchaseOrder."""
    __tablename__ = "suppliers"
    
    name = Column(Text, nullable=False)
    contact_person = Column(Text, nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class PurchaseOrder(BaseModel):
    """Model for purchase orders."""
    __tablename__ = "purchase_orders"
    
    po_number = Column(Text, nullable=False)
    supplier_id = Column(CHAR(36), ForeignKey('suppliers.id'), nullable=True)
    status = Column(String(50), nullable=False)
    total_amount = Column(Numeric(12, 2), nullable=False)
    order_date = Column(Date, nullable=False)
    expected_delivery = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Report(BaseModel):
    """Model for system reports."""
    __tablename__ = "reports"
    
    title = Column(Text, nullable=False)
    type = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    data = Column(JSON, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class SalesLead(BaseModel):
    """Model for tracking sales leads."""
    __tablename__ = "sales_leads"
    
    name = Column(Text, nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(Text, nullable=True)
    status = Column(String(50), nullable=False)
    value = Column(Numeric(10, 2), nullable=True)
    notes = Column(Text, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Setting(BaseModel):
    """Model for application-wide settings."""
    __tablename__ = "settings"
    
    company_name = Column(Text, nullable=False)
    currency = Column(Text, nullable=False)
    timezone = Column(Text, nullable=False)
    language = Column(Text, nullable=False)
    two_factor_auth = Column(Boolean, default=False, nullable=False)
    password_expiry = Column(Boolean, default=False, nullable=False)
    login_alerts = Column(Boolean, default=False, nullable=False)
    email_notifications = Column(Boolean, default=False, nullable=False)
    push_notifications = Column(Boolean, default=False, nullable=False)
    sms_alerts = Column(Boolean, default=False, nullable=False)
    auto_backup = Column(Boolean, default=False, nullable=False)
    api_access = Column(Boolean, default=False, nullable=False)
    debug_mode = Column(Boolean, default=False, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class SystemSetting(BaseModel):
    """Model for core system settings."""
    __tablename__ = "system_settings"
    
    auto_backup = Column(Boolean, default=True, nullable=False)
    api_access = Column(Boolean, default=False, nullable=False)
    debug_mode = Column(Boolean, default=False, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class Ticket(BaseModel):
    """Model for support tickets."""
    __tablename__ = "tickets"
    
    ticket_number = Column(String(50), nullable=False, unique=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), default=TicketStatus.open, nullable=False)
    priority = Column(Enum(TicketPriority), default=TicketPriority.medium, nullable=False)
    ticket_type = Column(String(50), nullable=False, default="support")  # bug, feature_request, support, improvement, question
    department = Column(String(100), nullable=True)
    module = Column(String(100), nullable=True)
    due_date = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    assigned_to = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)
    group_id = Column(CHAR(36), ForeignKey('groups.id'), nullable=True)

class TicketComment(BaseModel):
    """Model for comments on support tickets."""
    __tablename__ = "ticket_comments"
    
    ticket_id = Column(CHAR(36), ForeignKey('tickets.id'), nullable=False)
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    comment = Column(Text, nullable=False)
    is_internal = Column(Boolean, default=False, nullable=False)

class TicketAttachment(BaseModel):
    """Model for ticket attachments."""
    __tablename__ = "ticket_attachments"
    
    ticket_id = Column(CHAR(36), ForeignKey('tickets.id'), nullable=False)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=True)
    mime_type = Column(String(100), nullable=True)
    uploaded_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)

class TicketHistory(BaseModel):
    """Model for ticket change history."""
    __tablename__ = "ticket_history"
    
    ticket_id = Column(CHAR(36), ForeignKey('tickets.id'), nullable=False)
    field_name = Column(String(50), nullable=False)
    old_value = Column(String(255), nullable=True)
    new_value = Column(String(255), nullable=True)
    changed_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)

class TypingIndicator(BaseModel):
    """Model to indicate if a user is currently typing."""
    __tablename__ = "typing_indicators"

    user_id = Column(CHAR(36), nullable=False, unique=True)
    user_name = Column(String(255), nullable=False)
    is_typing = Column(Boolean, default=False)

class UserPreference(BaseModel):
    """Model for individual user preferences."""
    __tablename__ = "user_preferences"
    
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False, unique=True)
    email_notifications = Column(Boolean, default=True, nullable=False)
    push_notifications = Column(Boolean, default=False, nullable=False)
    project_updates = Column(Boolean, default=True, nullable=False)
    task_assignments = Column(Boolean, default=True, nullable=False)
    system_maintenance = Column(Boolean, default=False, nullable=False)
    dark_mode = Column(Boolean, default=False, nullable=False)
    compact_view = Column(Boolean, default=False, nullable=False)
    language = Column(Text, default='en', nullable=False)
    timezone = Column(Text, default='utc', nullable=False)
    two_factor_auth = Column(Boolean, default=False, nullable=False)
    password_expiry = Column(Boolean, default=False, nullable=False)
    login_alerts = Column(Boolean, default=False, nullable=False)
    sms_alerts = Column(Boolean, default=False, nullable=False)
    company_name = Column(Text, nullable=True)
    currency = Column(Text, nullable=True)

class UserProfile(BaseModel):
    """Model for extended user profile details."""
    __tablename__ = "user_profiles"
    
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False, unique=True)
    first_name = Column(Text, nullable=True)
    last_name = Column(Text, nullable=True)
    phone = Column(Text, nullable=True)
    job_title = Column(Text, nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(Text, nullable=True)

class UserRole(BaseModel):
    """Model to assign roles to users."""
    __tablename__ = "user_roles"
    
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    role = Column(Enum(AppRole), nullable=False)

class WorkOrder(BaseModel):
    """Model for work orders."""
    __tablename__ = "work_orders"
    
    work_order_id = Column(Text, nullable=False)
    product = Column(Text, nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    created_by = Column(CHAR(36), ForeignKey('profiles.id'), nullable=True)

class User(BaseModel):
    """
    A separate User model, likely for authentication purposes,
    distinct from the Profile model.
    """
    __tablename__ = "users"
    
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

class ChatMessage(BaseModel):
    """Model for chat messages."""
    __tablename__ = "chat_messages"
    
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False)
    content = Column(Text, nullable=False)

class ChatTypingIndicator(BaseModel):
    """Model for chat typing indicators."""
    __tablename__ = "chat_typing_indicators"
    
    user_id = Column(CHAR(36), ForeignKey('profiles.id'), nullable=False, unique=True)
    is_typing = Column(Boolean, default=False, nullable=False)

# Import finance models to ensure they're included in metadata
# This should be at the end to avoid circular dependencies
from app.models.finance import Transaction, FinanceInvoice, FinanceExpense
