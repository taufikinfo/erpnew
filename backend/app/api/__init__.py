from fastapi import APIRouter
from app.api.endpoints import auth, customers, employees, inventory, dashboard, sales, projects, docs, blogs, faqs, finance, profile, vendors, purchase_orders, manufacturing, users, system_settings, chat

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
api_router.include_router(sales.router, prefix="/sales", tags=["sales"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(docs.router, prefix="/docs", tags=["docs"])
api_router.include_router(blogs.router, prefix="/blogs", tags=["blogs"])
api_router.include_router(faqs.router, prefix="/faqs", tags=["faqs"])
api_router.include_router(finance.router, prefix="/finance", tags=["finance"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(vendors.router, prefix="/vendors", tags=["vendors"])
api_router.include_router(purchase_orders.router, prefix="/purchase-orders", tags=["purchase-orders"])
api_router.include_router(manufacturing.router, prefix="/manufacturing", tags=["manufacturing"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(system_settings.router, prefix="/system-settings", tags=["system-settings"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
