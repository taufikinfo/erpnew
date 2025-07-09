from sqlalchemy import Column, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    type = Column(String(50), nullable=False)  # income, expense, transfer
    amount = Column(Float, nullable=False)
    description = Column(Text)
    date = Column(DateTime, nullable=False)
    category = Column(String(100), nullable=False)
    reference = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(CHAR(36), nullable=True)  # Removed foreign key temporarily


class FinanceInvoice(Base):
    __tablename__ = "finance_invoices"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    invoice_number = Column(String(100), nullable=False, unique=True)
    client_name = Column(String(255), nullable=False)  # Changed from customer_id to client_name to match existing Invoice
    amount = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)  # draft, sent, paid, overdue
    issue_date = Column(DateTime, nullable=False)
    due_date = Column(DateTime, nullable=False)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(CHAR(36), nullable=True)  # Removed foreign key temporarily


class FinanceExpense(Base):
    __tablename__ = "finance_expenses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    expense_number = Column(String(100), nullable=False, unique=True)
    category = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    vendor = Column(String(255), nullable=False)
    expense_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(CHAR(36), nullable=True)  # Removed foreign key temporarily
