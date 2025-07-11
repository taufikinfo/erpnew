from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

# Transaction schemas
class TransactionBase(BaseModel):
    type: str
    amount: float
    description: str
    date: datetime
    category: str
    reference: Optional[str] = None


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    type: Optional[str] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    category: Optional[str] = None
    reference: Optional[str] = None


class TransactionOut(TransactionBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class TransactionList(BaseModel):
    items: List[TransactionOut]
    total: int


# Invoice schemas
class FinanceInvoiceBase(BaseModel):
    invoice_number: str
    client_name: str  # Changed from customer_id to client_name
    amount: float
    status: str
    issue_date: datetime
    due_date: datetime
    notes: Optional[str] = None


class FinanceInvoiceCreate(FinanceInvoiceBase):
    pass


class FinanceInvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    client_name: Optional[str] = None  # Changed from customer_id to client_name
    amount: Optional[float] = None
    status: Optional[str] = None
    issue_date: Optional[datetime] = None
    due_date: Optional[datetime] = None
    notes: Optional[str] = None


class FinanceInvoiceOut(FinanceInvoiceBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class FinanceInvoiceList(BaseModel):
    items: List[FinanceInvoiceOut]
    total: int


# Expense schemas
class FinanceExpenseBase(BaseModel):
    expense_number: str
    category: str
    amount: float
    vendor: str
    expense_date: datetime


class FinanceExpenseCreate(FinanceExpenseBase):
    pass


class FinanceExpenseUpdate(BaseModel):
    expense_number: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[float] = None
    vendor: Optional[str] = None
    expense_date: Optional[datetime] = None


class FinanceExpenseOut(FinanceExpenseBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    created_by: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class FinanceExpenseList(BaseModel):
    items: List[FinanceExpenseOut]
    total: int
