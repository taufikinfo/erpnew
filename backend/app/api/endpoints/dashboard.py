from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models import Employee, InventoryItem, SalesLead, Profile
from app.models.finance import FinanceInvoice
from app.schemas import DashboardStats
from decimal import Decimal

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get dashboard statistics."""
    
    # Get all data
    invoices = db.query(FinanceInvoice).all()
    employees = db.query(Employee).all()
    inventory_items = db.query(InventoryItem).all()
    sales_leads = db.query(SalesLead).all()
    
    # Calculate stats
    total_revenue = sum(
        invoice.amount for invoice in invoices 
        if invoice.status == 'paid'
    ) if invoices else Decimal(0)
    
    total_orders = len(invoices)
    # Since we don't have an active status field, count all employees
    active_employees = len(employees)
    total_inventory_items = len(inventory_items)
    total_stock = sum(item.stock for item in inventory_items) if inventory_items else 0
    low_stock_items = len([item for item in inventory_items if item.status == 'low stock'])
    out_of_stock_items = len([item for item in inventory_items if item.status == 'out of stock'])
    total_leads_value = sum(
        lead.value for lead in sales_leads 
        if lead.value is not None
    ) if sales_leads else Decimal(0)
    
    return DashboardStats(
        totalRevenue=total_revenue,
        totalOrders=total_orders,
        activeEmployees=active_employees,
        totalInventoryItems=total_inventory_items,
        totalStock=total_stock,
        lowStockItems=low_stock_items,
        outOfStockItems=out_of_stock_items,
        totalLeadsValue=total_leads_value,
        employees=employees,
        inventoryItems=inventory_items,
        salesLeads=sales_leads
    )
