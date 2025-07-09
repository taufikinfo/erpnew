from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import User, Profile
from app.models.finance import Transaction, FinanceInvoice, FinanceExpense
from app.schemas.finance import (
    TransactionCreate, TransactionUpdate, TransactionOut,
    FinanceInvoiceCreate, FinanceInvoiceUpdate, FinanceInvoiceOut,
    FinanceExpenseCreate, FinanceExpenseUpdate, FinanceExpenseOut,
    TransactionList, FinanceInvoiceList, FinanceExpenseList
)

router = APIRouter()

# Transaction endpoints
@router.get("/transactions/", response_model=TransactionList)
def read_transactions(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve all transactions.
    """
    transactions = db.query(Transaction).offset(skip).limit(limit).all()
    total = db.query(Transaction).count()
    return {"items": transactions, "total": total}

@router.post("/transactions/", response_model=TransactionOut)
def create_transaction(
    transaction: TransactionCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new transaction.
    """
    db_transaction = Transaction(
        **transaction.dict(),
        created_by=current_user["id"]
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/transactions/{transaction_id}", response_model=TransactionOut)
def read_transaction(
    transaction_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve a specific transaction.
    """
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    return transaction

@router.put("/transactions/{transaction_id}", response_model=TransactionOut)
def update_transaction(
    transaction_id: str, 
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a specific transaction.
    """
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    update_data = transaction_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(transaction, field, value)
    
    db.commit()
    db.refresh(transaction)
    return transaction

@router.delete("/transactions/{transaction_id}")
def delete_transaction(
    transaction_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a specific transaction.
    """
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}

# Invoice endpoints
@router.get("/invoices/", response_model=FinanceInvoiceList)
def read_invoices(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve all invoices.
    """
    invoices = db.query(FinanceInvoice).offset(skip).limit(limit).all()
    total = db.query(FinanceInvoice).count()
    return {"items": invoices, "total": total}

@router.post("/invoices/", response_model=FinanceInvoiceOut)
def create_invoice(
    invoice: FinanceInvoiceCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new invoice.
    """
    db_invoice = FinanceInvoice(
        **invoice.dict(),
        created_by=current_user["id"]
    )
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

@router.get("/invoices/{invoice_id}", response_model=FinanceInvoiceOut)
def read_invoice(
    invoice_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve a specific invoice.
    """
    invoice = db.query(FinanceInvoice).filter(FinanceInvoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    return invoice

@router.put("/invoices/{invoice_id}", response_model=FinanceInvoiceOut)
def update_invoice(
    invoice_id: str, 
    invoice_update: FinanceInvoiceUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a specific invoice.
    """
    invoice = db.query(FinanceInvoice).filter(FinanceInvoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    update_data = invoice_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(invoice, field, value)
    
    db.commit()
    db.refresh(invoice)
    return invoice

@router.delete("/invoices/{invoice_id}")
def delete_invoice(
    invoice_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a specific invoice.
    """
    invoice = db.query(FinanceInvoice).filter(FinanceInvoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    db.delete(invoice)
    db.commit()
    return {"message": "Invoice deleted successfully"}

# Expense endpoints
@router.get("/expenses/", response_model=FinanceExpenseList)
def read_expenses(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve all expenses.
    """
    expenses = db.query(FinanceExpense).offset(skip).limit(limit).all()
    total = db.query(FinanceExpense).count()
    return {"items": expenses, "total": total}

@router.post("/expenses/", response_model=FinanceExpenseOut)
def create_expense(
    expense: FinanceExpenseCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new expense.
    """
    db_expense = FinanceExpense(
        **expense.dict(),
        created_by=current_user["id"]
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.get("/expenses/{expense_id}", response_model=FinanceExpenseOut)
def read_expense(
    expense_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve a specific expense.
    """
    expense = db.query(FinanceExpense).filter(FinanceExpense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    return expense

@router.put("/expenses/{expense_id}", response_model=FinanceExpenseOut)
def update_expense(
    expense_id: str, 
    expense_update: FinanceExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a specific expense.
    """
    expense = db.query(FinanceExpense).filter(FinanceExpense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    update_data = expense_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(expense, field, value)
    
    db.commit()
    db.refresh(expense)
    return expense

@router.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a specific expense.
    """
    expense = db.query(FinanceExpense).filter(FinanceExpense.id == expense_id).first()
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}
