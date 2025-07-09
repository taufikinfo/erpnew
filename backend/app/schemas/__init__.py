from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any, Dict
from datetime import datetime, date
from decimal import Decimal

class BaseSchema(BaseModel):
    class Config:
        from_attributes = True

# User and Auth schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Profile schemas
class ProfileBase(BaseModel):
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None

class ProfileResponse(ProfileBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime

# Customer schemas
class CustomerBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None

class CustomerResponse(CustomerBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Employee schemas
class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    email: str
    phone: Optional[str] = None
    department: str
    position: str
    salary: Optional[Decimal] = None
    hire_date: date
    status: str = 'active'
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    employee_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    position: Optional[str] = None
    salary: Optional[Decimal] = None
    hire_date: Optional[date] = None
    status: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class EmployeeResponse(EmployeeBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Invoice schemas
class InvoiceBase(BaseModel):
    invoice_number: str
    client_name: str
    amount: Decimal
    status: str = 'pending'
    issue_date: date
    due_date: date

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    client_name: Optional[str] = None
    amount: Optional[Decimal] = None
    status: Optional[str] = None
    issue_date: Optional[date] = None
    due_date: Optional[date] = None

class InvoiceResponse(InvoiceBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Inventory schemas
class InventoryItemBase(BaseModel):
    name: str
    category: str
    stock: int = 0
    unit_price: Decimal
    supplier: str
    status: str

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    unit_price: Optional[Decimal] = None
    supplier: Optional[str] = None
    status: Optional[str] = None

class InventoryItemResponse(InventoryItemBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Sales Lead schemas
class SalesLeadBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    status: str
    value: Optional[Decimal] = None
    notes: Optional[str] = None

class SalesLeadCreate(SalesLeadBase):
    pass

class SalesLeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    status: Optional[str] = None
    value: Optional[Decimal] = None
    notes: Optional[str] = None

class SalesLeadResponse(SalesLeadBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Project schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[Decimal] = None
    progress: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[Decimal] = None
    progress: Optional[int] = None

class ProjectResponse(ProjectBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Expense schemas
class ExpenseBase(BaseModel):
    expense_number: str
    category: str
    amount: Decimal
    vendor: str
    expense_date: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    expense_number: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[Decimal] = None
    vendor: Optional[str] = None
    expense_date: Optional[date] = None

class ExpenseResponse(ExpenseBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Supplier schemas
class SupplierBase(BaseModel):
    name: str
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierResponse(SupplierBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Purchase Order schemas
class PurchaseOrderBase(BaseModel):
    po_number: str
    supplier_id: Optional[str] = None
    status: str
    total_amount: Decimal
    order_date: date
    expected_delivery: Optional[date] = None
    notes: Optional[str] = None

class PurchaseOrderCreate(PurchaseOrderBase):
    pass

class PurchaseOrderUpdate(BaseModel):
    po_number: Optional[str] = None
    supplier_id: Optional[str] = None
    status: Optional[str] = None
    total_amount: Optional[Decimal] = None
    order_date: Optional[date] = None
    expected_delivery: Optional[date] = None
    notes: Optional[str] = None

class PurchaseOrderResponse(PurchaseOrderBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Work Order schemas
class WorkOrderBase(BaseModel):
    work_order_id: str
    product: str
    quantity: int
    status: str
    start_date: date
    due_date: date

class WorkOrderCreate(WorkOrderBase):
    pass

class WorkOrderUpdate(BaseModel):
    work_order_id: Optional[str] = None
    product: Optional[str] = None
    quantity: Optional[int] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    due_date: Optional[date] = None

class WorkOrderResponse(WorkOrderBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# Leave Request schemas
class LeaveRequestBase(BaseModel):
    employee_id: Optional[str] = None
    leave_type: str
    start_date: date
    end_date: date
    days_requested: int
    reason: Optional[str] = None
    status: str = 'pending'

class LeaveRequestCreate(LeaveRequestBase):
    pass

class LeaveRequestUpdate(BaseModel):
    employee_id: Optional[str] = None
    leave_type: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    days_requested: Optional[int] = None
    reason: Optional[str] = None
    status: Optional[str] = None

class LeaveRequestResponse(LeaveRequestBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime

# Report schemas
class ReportBase(BaseModel):
    title: str
    type: str
    description: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

class ReportCreate(ReportBase):
    pass

class ReportUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

class ReportResponse(ReportBase, BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None

# FAQ schemas
class FAQBase(BaseModel):
    question: str
    answer: str
    category: str
    order_index: Optional[int] = 0
    published: bool = False

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    order_index: Optional[int] = None
    published: Optional[bool] = None

class FAQResponse(FAQBase, BaseSchema):
    id: str
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: datetime
    updated_at: datetime

# Blog schemas
class BlogBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    featured_image: Optional[str] = None
    category: str
    tags: Optional[List[str]] = None
    published: bool = False
    featured: bool = False
    publish_date: Optional[datetime] = None

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None
    featured: Optional[bool] = None
    publish_date: Optional[datetime] = None

class BlogResponse(BlogBase, BaseSchema):
    id: str
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: datetime
    updated_at: datetime

# Doc schemas
class DocBase(BaseModel):
    title: str
    slug: str
    content: str
    category: str
    tags: Optional[List[str]] = None
    published: bool = False
    featured: bool = False

class DocCreate(DocBase):
    pass

class DocUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None
    featured: Optional[bool] = None

class DocResponse(DocBase, BaseSchema):
    id: str
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: datetime
    updated_at: datetime

# Dashboard stats schema
class DashboardStats(BaseModel):
    totalRevenue: Decimal
    totalOrders: int
    activeEmployees: int
    totalInventoryItems: int
    totalStock: int
    lowStockItems: int
    outOfStockItems: int
    totalLeadsValue: Decimal
    employees: List[EmployeeResponse]
    inventoryItems: List[InventoryItemResponse]
    salesLeads: List[SalesLeadResponse]
