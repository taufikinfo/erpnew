import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models import *
from app.models.finance import Transaction, FinanceInvoice, FinanceExpense
from app.core.auth import get_password_hash
from datetime import datetime, date, timedelta
from decimal import Decimal
import uuid
import random

def seed_data():
    """Seed the database with sample data."""
    db = SessionLocal()
    
    try:
        # Create admin user and profile
        admin_user = User(
            email="admin@erpnew.com",
            password_hash=get_password_hash("admin123"),
            is_active=True,
            is_verified=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        admin_profile = Profile(
            id=admin_user.id,
            email="admin@erpnew.com",
            first_name="Admin",
            last_name="User",
            job_title="System Administrator"
        )
        db.add(admin_profile)
        db.commit()
        
        # Create some test users and profiles for testing
        test_users_data = [
            {"email": "user1@erpnew.com", "password": "user123", "first_name": "John", "last_name": "Smith", "job_title": "Manager"},
            {"email": "user2@erpnew.com", "password": "user123", "first_name": "Jane", "last_name": "Doe", "job_title": "Developer"},
        ]
        
        for user_data in test_users_data:
            # Create user
            test_user = User(
                email=user_data["email"],
                password_hash=get_password_hash(user_data["password"]),
                is_active=True,
                is_verified=True
            )
            db.add(test_user)
            db.commit()
            db.refresh(test_user)
            
            # Create profile
            test_profile = Profile(
                id=test_user.id,
                email=user_data["email"],
                first_name=user_data["first_name"],
                last_name=user_data["last_name"],
                job_title=user_data["job_title"]
            )
            db.add(test_profile)
        
        db.commit()
        print("✅ Test users seeded successfully!")
        
        # Seed Customers (10 records)
        customers_data = [
            {"name": "John Smith", "email": "john.smith@example.com", "phone": "555-0101", "company": "Smith Industries"},
            {"name": "Jane Doe", "email": "jane.doe@example.com", "phone": "555-0102", "company": "Doe Enterprises"},
            {"name": "Mike Johnson", "email": "mike.johnson@example.com", "phone": "555-0103", "company": "Johnson Corp"},
            {"name": "Sarah Wilson", "email": "sarah.wilson@example.com", "phone": "555-0104", "company": "Wilson LLC"},
            {"name": "David Brown", "email": "david.brown@example.com", "phone": "555-0105", "company": "Brown & Associates"},
            {"name": "Lisa Garcia", "email": "lisa.garcia@example.com", "phone": "555-0106", "company": "Garcia Solutions"},
            {"name": "Tom Miller", "email": "tom.miller@example.com", "phone": "555-0107", "company": "Miller Group"},
            {"name": "Amy Davis", "email": "amy.davis@example.com", "phone": "555-0108", "company": "Davis Tech"},
            {"name": "Chris Anderson", "email": "chris.anderson@example.com", "phone": "555-0109", "company": "Anderson Ltd"},
            {"name": "Emma Taylor", "email": "emma.taylor@example.com", "phone": "555-0110", "company": "Taylor Systems"}
        ]
        
        for data in customers_data:
            customer = Customer(**data, created_by=admin_profile.id)
            db.add(customer)
        
        # Seed Employees (10 records)
        employees_data = [
            {"employee_id": "EMP001", "name": "Robert Johnson", "email": "robert.j@company.com", "department": "Engineering", "position": "Software Engineer", "salary": Decimal("75000"), "hire_date": date(2023, 1, 15)},
            {"employee_id": "EMP002", "name": "Maria Rodriguez", "email": "maria.r@company.com", "department": "Sales", "position": "Sales Manager", "salary": Decimal("85000"), "hire_date": date(2023, 2, 1)},
            {"employee_id": "EMP003", "name": "James Wilson", "email": "james.w@company.com", "department": "HR", "position": "HR Specialist", "salary": Decimal("65000"), "hire_date": date(2023, 3, 10)},
            {"employee_id": "EMP004", "name": "Jennifer Lee", "email": "jennifer.l@company.com", "department": "Marketing", "position": "Marketing Coordinator", "salary": Decimal("55000"), "hire_date": date(2023, 4, 5)},
            {"employee_id": "EMP005", "name": "Michael Brown", "email": "michael.b@company.com", "department": "Finance", "position": "Financial Analyst", "salary": Decimal("70000"), "hire_date": date(2023, 5, 20)},
            {"employee_id": "EMP006", "name": "Lisa Zhang", "email": "lisa.z@company.com", "department": "Engineering", "position": "DevOps Engineer", "salary": Decimal("80000"), "hire_date": date(2023, 6, 1)},
            {"employee_id": "EMP007", "name": "Daniel Kim", "email": "daniel.k@company.com", "department": "Sales", "position": "Sales Representative", "salary": Decimal("60000"), "hire_date": date(2023, 7, 15)},
            {"employee_id": "EMP008", "name": "Amanda Smith", "email": "amanda.s@company.com", "department": "Operations", "position": "Operations Manager", "salary": Decimal("90000"), "hire_date": date(2023, 8, 1)},
            {"employee_id": "EMP009", "name": "Kevin Davis", "email": "kevin.d@company.com", "department": "IT", "position": "System Administrator", "salary": Decimal("72000"), "hire_date": date(2023, 9, 10)},
            {"employee_id": "EMP010", "name": "Rachel Green", "email": "rachel.g@company.com", "department": "Design", "position": "UI/UX Designer", "salary": Decimal("68000"), "hire_date": date(2023, 10, 5)}
        ]
        
        for data in employees_data:
            employee = Employee(**data, created_by=admin_profile.id)
            db.add(employee)
        
        # Seed Inventory Items (10 records)
        inventory_data = [
            {"name": "Laptop Dell XPS 13", "category": "Electronics", "stock": 25, "unit_price": Decimal("1200.00"), "supplier": "Dell Inc", "status": "in stock"},
            {"name": "Office Chair Ergonomic", "category": "Furniture", "stock": 5, "unit_price": Decimal("350.00"), "supplier": "Office Depot", "status": "low stock"},
            {"name": "Printer HP LaserJet", "category": "Electronics", "stock": 12, "unit_price": Decimal("450.00"), "supplier": "HP Inc", "status": "in stock"},
            {"name": "Desk Standing", "category": "Furniture", "stock": 8, "unit_price": Decimal("800.00"), "supplier": "IKEA", "status": "in stock"},
            {"name": "Monitor 27 inch 4K", "category": "Electronics", "stock": 0, "unit_price": Decimal("600.00"), "supplier": "Samsung", "status": "out of stock"},
            {"name": "Wireless Mouse", "category": "Accessories", "stock": 50, "unit_price": Decimal("45.00"), "supplier": "Logitech", "status": "in stock"},
            {"name": "Mechanical Keyboard", "category": "Accessories", "stock": 3, "unit_price": Decimal("120.00"), "supplier": "Corsair", "status": "low stock"},
            {"name": "Conference Table", "category": "Furniture", "stock": 2, "unit_price": Decimal("1500.00"), "supplier": "Herman Miller", "status": "low stock"},
            {"name": "Webcam HD", "category": "Electronics", "stock": 15, "unit_price": Decimal("80.00"), "supplier": "Logitech", "status": "in stock"},
            {"name": "Headset Noise Cancelling", "category": "Accessories", "stock": 20, "unit_price": Decimal("250.00"), "supplier": "Sony", "status": "in stock"}
        ]
        
        for data in inventory_data:
            item = InventoryItem(**data, created_by=admin_profile.id)
            db.add(item)
        
        # Skip the old Invoices data - we're using the new finance seeding below
        # This section was causing the 'client_name' error
        """
        # Seed Invoices (10 records) - OLD VERSION WITH ERROR
        invoices_data = [
            {"invoice_number": "INV-2024-001", "client_name": "Smith Industries", "amount": Decimal("5000.00"), "status": "paid", "issue_date": date(2024, 1, 1), "due_date": date(2024, 1, 31)},
            # ... more data
        ]
        
        for data in invoices_data:
            invoice = Invoice(**data, created_by=admin_profile.id)
            db.add(invoice)
        """
        
        # Seed Sales Leads (10 records)
        sales_leads_data = [
            {"name": "Alex Thompson", "email": "alex.t@prospect.com", "company": "Thompson Corp", "status": "new", "value": Decimal("15000.00"), "notes": "Interested in our enterprise solution"},
            {"name": "Sofia Martinez", "email": "sofia.m@prospect.com", "company": "Martinez Ltd", "status": "contacted", "value": Decimal("8500.00"), "notes": "Scheduled for demo next week"},
            {"name": "Ryan O'Connor", "email": "ryan.o@prospect.com", "company": "O'Connor Industries", "status": "qualified", "value": Decimal("25000.00"), "notes": "Ready to proceed with proposal"},
            {"name": "Nina Patel", "email": "nina.p@prospect.com", "company": "Patel Solutions", "status": "new", "value": Decimal("12000.00"), "notes": "Referral from existing customer"},
            {"name": "Marcus Johnson", "email": "marcus.j@prospect.com", "company": "Johnson Enterprises", "status": "contacted", "value": Decimal("18000.00"), "notes": "Comparing with competitors"},
            {"name": "Elena Rodriguez", "email": "elena.r@prospect.com", "company": "Rodriguez Group", "status": "lost", "value": Decimal("5000.00"), "notes": "Chose competitor solution"},
            {"name": "Oliver Chen", "email": "oliver.c@prospect.com", "company": "Chen Technologies", "status": "qualified", "value": Decimal("30000.00"), "notes": "Large enterprise client"},
            {"name": "Isabella White", "email": "isabella.w@prospect.com", "company": "White & Associates", "status": "new", "value": Decimal("7500.00"), "notes": "Small business lead"},
            {"name": "Lucas Brown", "email": "lucas.b@prospect.com", "company": "Brown Systems", "status": "contacted", "value": Decimal("14000.00"), "notes": "Interested in custom integration"},
            {"name": "Maya Singh", "email": "maya.s@prospect.com", "company": "Singh Consulting", "status": "qualified", "value": Decimal("22000.00"), "notes": "Decision maker identified"}
        ]
        
        for data in sales_leads_data:
            lead = SalesLead(**data, created_by=admin_profile.id)
            db.add(lead)
        
        # Seed Projects (10 records)
        projects_data = [
            {"name": "Website Redesign", "description": "Complete overhaul of company website", "status": "active", "start_date": date(2024, 1, 1), "end_date": date(2024, 6, 30), "budget": Decimal("50000.00"), "progress": 65},
            {"name": "Mobile App Development", "description": "Native iOS and Android app", "status": "planning", "start_date": date(2024, 3, 1), "end_date": date(2024, 12, 31), "budget": Decimal("150000.00"), "progress": 10},
            {"name": "ERP System Upgrade", "description": "Upgrade legacy ERP system", "status": "active", "start_date": date(2024, 2, 1), "end_date": date(2024, 8, 31), "budget": Decimal("200000.00"), "progress": 40},
            {"name": "Data Migration", "description": "Migrate data to cloud infrastructure", "status": "completed", "start_date": date(2023, 10, 1), "end_date": date(2024, 1, 31), "budget": Decimal("75000.00"), "progress": 100},
            {"name": "Security Audit", "description": "Comprehensive security assessment", "status": "active", "start_date": date(2024, 3, 15), "end_date": date(2024, 5, 15), "budget": Decimal("25000.00"), "progress": 80},
            {"name": "Training Program", "description": "Employee training on new systems", "status": "on-hold", "start_date": date(2024, 5, 1), "end_date": date(2024, 7, 31), "budget": Decimal("30000.00"), "progress": 0},
            {"name": "API Integration", "description": "Third-party API integrations", "status": "active", "start_date": date(2024, 2, 15), "end_date": date(2024, 6, 15), "budget": Decimal("40000.00"), "progress": 55},
            {"name": "Database Optimization", "description": "Optimize database performance", "status": "completed", "start_date": date(2024, 1, 1), "end_date": date(2024, 3, 31), "budget": Decimal("20000.00"), "progress": 100},
            {"name": "Marketing Campaign", "description": "Q2 digital marketing campaign", "status": "planning", "start_date": date(2024, 4, 1), "end_date": date(2024, 6, 30), "budget": Decimal("35000.00"), "progress": 20},
            {"name": "Office Renovation", "description": "Renovate main office space", "status": "active", "start_date": date(2024, 3, 1), "end_date": date(2024, 7, 31), "budget": Decimal("80000.00"), "progress": 30}
        ]
        
        for data in projects_data:
            project = Project(**data, created_by=admin_profile.id)
            db.add(project)
        
        # Seed Suppliers (10 records)
        suppliers_data = [
            {"name": "Tech Solutions Inc", "contact_person": "John Manager", "email": "john@techsolutions.com", "phone": "555-1001", "address": "123 Tech Street, Tech City, TC 12345"},
            {"name": "Office Supplies Co", "contact_person": "Sarah Sales", "email": "sarah@officesupplies.com", "phone": "555-1002", "address": "456 Supply Ave, Supply Town, ST 67890"},
            {"name": "Furniture World", "contact_person": "Mike Furniture", "email": "mike@furnitureworld.com", "phone": "555-1003", "address": "789 Furniture Blvd, Furniture City, FC 13579"},
            {"name": "Electronics Plus", "contact_person": "Lisa Electronics", "email": "lisa@electronicsplus.com", "phone": "555-1004", "address": "321 Electronics Way, Electronic City, EC 24680"},
            {"name": "Industrial Equipment LLC", "contact_person": "David Industrial", "email": "david@industrial.com", "phone": "555-1005", "address": "654 Industrial Park, Industrial Town, IT 97531"},
            {"name": "Software Solutions", "contact_person": "Amy Software", "email": "amy@softwaresolutions.com", "phone": "555-1006", "address": "987 Software Lane, Software City, SC 86420"},
            {"name": "Hardware Store", "contact_person": "Tom Hardware", "email": "tom@hardwarestore.com", "phone": "555-1007", "address": "147 Hardware St, Hardware Town, HT 75319"},
            {"name": "Network Systems", "contact_person": "Emma Network", "email": "emma@networksystems.com", "phone": "555-1008", "address": "258 Network Ave, Network City, NC 64208"},
            {"name": "Cloud Services", "contact_person": "Chris Cloud", "email": "chris@cloudservices.com", "phone": "555-1009", "address": "369 Cloud Road, Cloud Town, CT 53197"},
            {"name": "Security Solutions", "contact_person": "Rachel Security", "email": "rachel@securitysolutions.com", "phone": "555-1010", "address": "741 Security Blvd, Security City, SC 42086"}
        ]
        
        for data in suppliers_data:
            supplier = Supplier(**data, created_by=admin_profile.id)
            db.add(supplier)
        
        # Commit suppliers before creating purchase orders
        db.commit()
        
        # Get all suppliers for purchase order creation
        suppliers = db.query(Supplier).all()
        
        # Seed Purchase Orders (10 records)
        print("Seeding purchase orders...")
        purchase_orders_data = [
            {"po_number": "PO-2025-001", "status": "pending", "total_amount": Decimal("2500.00"), "order_date": date(2025, 1, 5), "expected_delivery": date(2025, 1, 20), "notes": "Urgent delivery required"},
            {"po_number": "PO-2025-002", "status": "approved", "total_amount": Decimal("1800.00"), "order_date": date(2025, 1, 10), "expected_delivery": date(2025, 1, 25), "notes": "Standard delivery"},
            {"po_number": "PO-2025-003", "status": "delivered", "total_amount": Decimal("3200.00"), "order_date": date(2025, 1, 15), "expected_delivery": date(2025, 2, 1), "notes": "Delivered on time"},
            {"po_number": "PO-2025-004", "status": "pending", "total_amount": Decimal("950.00"), "order_date": date(2025, 1, 20), "expected_delivery": date(2025, 2, 5), "notes": "Awaiting approval"},
            {"po_number": "PO-2025-005", "status": "approved", "total_amount": Decimal("4500.00"), "order_date": date(2025, 1, 25), "expected_delivery": date(2025, 2, 10), "notes": "Bulk order discount applied"},
            {"po_number": "PO-2025-006", "status": "delivered", "total_amount": Decimal("1200.00"), "order_date": date(2025, 2, 1), "expected_delivery": date(2025, 2, 15), "notes": "Express delivery"},
            {"po_number": "PO-2025-007", "status": "pending", "total_amount": Decimal("2800.00"), "order_date": date(2025, 2, 5), "expected_delivery": date(2025, 2, 20), "notes": "Payment terms: Net 30"},
            {"po_number": "PO-2025-008", "status": "approved", "total_amount": Decimal("3600.00"), "order_date": date(2025, 2, 10), "expected_delivery": date(2025, 2, 25), "notes": "Quality inspection required"},
            {"po_number": "PO-2025-009", "status": "delivered", "total_amount": Decimal("1500.00"), "order_date": date(2025, 2, 15), "expected_delivery": date(2025, 3, 1), "notes": "Partial delivery accepted"},
            {"po_number": "PO-2025-010", "status": "pending", "total_amount": Decimal("5200.00"), "order_date": date(2025, 2, 20), "expected_delivery": date(2025, 3, 5), "notes": "Large order - special handling"}
        ]
        
        for i, data in enumerate(purchase_orders_data):
            # Assign suppliers cyclically
            supplier_id = suppliers[i % len(suppliers)].id
            purchase_order = PurchaseOrder(**data, supplier_id=supplier_id, created_by=admin_profile.id)
            db.add(purchase_order)
        
        print("✅ Procurement data seeded successfully!")
        
        # Skip the old expenses data - we're using the new finance seeding below
        # This section was causing conflicts with our new finance module
        """
        # Seed Expenses (10 records)
        expenses_data = [
            {"expense_number": "EXP-2024-001", "category": "Office Supplies", "amount": Decimal("250.00"), "vendor": "Office Depot", "expense_date": date(2024, 1, 15)},
            {"expense_number": "EXP-2024-002", "category": "Travel", "amount": Decimal("850.00"), "vendor": "Airlines Inc", "expense_date": date(2024, 1, 20)},
            {"expense_number": "EXP-2024-003", "category": "Software", "amount": Decimal("1200.00"), "vendor": "Microsoft", "expense_date": date(2024, 2, 1)},
            {"expense_number": "EXP-2024-004", "category": "Marketing", "amount": Decimal("500.00"), "vendor": "Google Ads", "expense_date": date(2024, 2, 10)},
            {"expense_number": "EXP-2024-005", "category": "Equipment", "amount": Decimal("3000.00"), "vendor": "Dell Inc", "expense_date": date(2024, 2, 15)},
            {"expense_number": "EXP-2024-006", "category": "Utilities", "amount": Decimal("400.00"), "vendor": "Power Company", "expense_date": date(2024, 3, 1)},
            {"expense_number": "EXP-2024-007", "category": "Training", "amount": Decimal("750.00"), "vendor": "Training Corp", "expense_date": date(2024, 3, 10)},
            {"expense_number": "EXP-2024-008", "category": "Maintenance", "amount": Decimal("350.00"), "vendor": "Maintenance Co", "expense_date": date(2024, 3, 15)},
            {"expense_number": "EXP-2024-009", "category": "Insurance", "amount": Decimal("1500.00"), "vendor": "Insurance Inc", "expense_date": date(2024, 4, 1)},
            {"expense_number": "EXP-2024-010", "category": "Legal", "amount": Decimal("2000.00"), "vendor": "Law Firm LLC", "expense_date": date(2024, 4, 10)}
        ]
        
        for data in expenses_data:
            expense = Expense(**data, created_by=admin_profile.id)
            db.add(expense)
        """
        
        # Seed Work Orders (10 records)
        work_orders_data = [
            {"work_order_id": "WO-2024-001", "product": "Custom Software Module", "quantity": 1, "status": "completed", "start_date": date(2024, 1, 1), "due_date": date(2024, 2, 1)},
            {"work_order_id": "WO-2024-002", "product": "Website Landing Page", "quantity": 3, "status": "in-progress", "start_date": date(2024, 2, 1), "due_date": date(2024, 3, 15)},
            {"work_order_id": "WO-2024-003", "product": "Mobile App Feature", "quantity": 2, "status": "planning", "start_date": date(2024, 3, 1), "due_date": date(2024, 4, 30)},
            {"work_order_id": "WO-2024-004", "product": "Database Report", "quantity": 5, "status": "completed", "start_date": date(2024, 1, 15), "due_date": date(2024, 2, 15)},
            {"work_order_id": "WO-2024-005", "product": "API Integration", "quantity": 1, "status": "in-progress", "start_date": date(2024, 2, 15), "due_date": date(2024, 4, 1)},
            {"work_order_id": "WO-2024-006", "product": "Security Patch", "quantity": 1, "status": "completed", "start_date": date(2024, 3, 1), "due_date": date(2024, 3, 15)},
            {"work_order_id": "WO-2024-007", "product": "User Training Material", "quantity": 10, "status": "planning", "start_date": date(2024, 4, 1), "due_date": date(2024, 5, 31)},
            {"work_order_id": "WO-2024-008", "product": "System Backup", "quantity": 1, "status": "in-progress", "start_date": date(2024, 3, 15), "due_date": date(2024, 4, 15)},
            {"work_order_id": "WO-2024-009", "product": "Performance Optimization", "quantity": 1, "status": "completed", "start_date": date(2024, 2, 1), "due_date": date(2024, 3, 1)},
            {"work_order_id": "WO-2024-010", "product": "Data Migration Script", "quantity": 1, "status": "planning", "start_date": date(2024, 4, 15), "due_date": date(2024, 6, 1)}
        ]
        
        for data in work_orders_data:
            work_order = WorkOrder(**data, created_by=admin_profile.id)
            db.add(work_order)
        
        # Seed Docs (10 records)
        docs_data = [
            {
                "title": "Getting Started Guide",
                "slug": "getting-started",
                "content": "# Getting Started\n\nWelcome to our ERP system! This guide will help you get started.\n\n## Initial Setup\n\n1. Log in with your credentials\n2. Configure your profile\n3. Set up your workspace",
                "category": "Getting Started",
                "tags": ["tutorial", "basics", "setup"],
                "published": True,
                "featured": True
            },
            {
                "title": "User Management",
                "slug": "user-management",
                "content": "# User Management\n\nLearn how to manage users in the system.\n\n## Adding Users\n\n- Navigate to User Management\n- Click Add New User\n- Fill in the required information",
                "category": "Administration",
                "tags": ["users", "admin", "management"],
                "published": True,
                "featured": False
            },
            {
                "title": "Inventory Management",
                "slug": "inventory-management",
                "content": "# Inventory Management\n\nManage your inventory efficiently.\n\n## Adding Items\n\n1. Go to Inventory section\n2. Click Add New Item\n3. Enter item details",
                "category": "Inventory",
                "tags": ["inventory", "items", "stock"],
                "published": True,
                "featured": True
            },
            {
                "title": "Sales Process",
                "slug": "sales-process",
                "content": "# Sales Process\n\nUnderstand the complete sales workflow.\n\n## Creating Sales Leads\n\n- Navigate to Sales section\n- Create new lead\n- Track progress",
                "category": "Sales",
                "tags": ["sales", "leads", "workflow"],
                "published": True,
                "featured": False
            },
            {
                "title": "Project Management",
                "slug": "project-management",
                "content": "# Project Management\n\nManage projects from start to finish.\n\n## Creating Projects\n\n1. Access Projects module\n2. Define project scope\n3. Assign team members",
                "category": "Projects",
                "tags": ["projects", "management", "planning"],
                "published": True,
                "featured": True
            },
            {
                "title": "Financial Reports",
                "slug": "financial-reports",
                "content": "# Financial Reports\n\nGenerate comprehensive financial reports.\n\n## Types of Reports\n\n- Revenue reports\n- Expense tracking\n- Profit analysis",
                "category": "Finance",
                "tags": ["finance", "reports", "analytics"],
                "published": True,
                "featured": False
            },
            {
                "title": "System Configuration",
                "slug": "system-configuration",
                "content": "# System Configuration\n\nConfigure system settings for optimal performance.\n\n## General Settings\n\n- Company information\n- Currency settings\n- Time zones",
                "category": "Administration",
                "tags": ["configuration", "settings", "admin"],
                "published": True,
                "featured": False
            },
            {
                "title": "API Documentation",
                "slug": "api-documentation",
                "content": "# API Documentation\n\nLearn how to use our REST API.\n\n## Authentication\n\nUse JWT tokens for API access.\n\n## Endpoints\n\n- GET /api/v1/users\n- POST /api/v1/users",
                "category": "Developers",
                "tags": ["api", "development", "integration"],
                "published": True,
                "featured": True
            },
            {
                "title": "Troubleshooting Guide",
                "slug": "troubleshooting",
                "content": "# Troubleshooting Guide\n\nCommon issues and their solutions.\n\n## Login Issues\n\n- Check credentials\n- Clear browser cache\n- Contact support",
                "category": "Support",
                "tags": ["troubleshooting", "support", "help"],
                "published": True,
                "featured": False
            },
            {
                "title": "Best Practices",
                "slug": "best-practices",
                "content": "# Best Practices\n\nRecommended practices for system usage.\n\n## Data Entry\n\n- Use consistent formats\n- Validate before saving\n- Regular backups",
                "category": "Getting Started",
                "tags": ["best-practices", "guidelines", "tips"],
                "published": True,
                "featured": False
            }
        ]
        
        for data in docs_data:
            doc = Doc(**data, created_by=admin_profile.id, updated_by=admin_profile.id)
            db.add(doc)
        
        # Seed Blogs (10 records)
        blogs_data = [
            {
                "title": "Welcome to Our ERP System",
                "slug": "welcome-to-erp",
                "excerpt": "Discover the power of our comprehensive ERP solution for modern businesses.",
                "content": "# Welcome to Our ERP System\n\nWe're excited to introduce you to our comprehensive Enterprise Resource Planning (ERP) system. Our platform brings together all aspects of your business operations into one unified solution.\n\n## Key Features\n\n- **Inventory Management**: Track stock levels, manage suppliers, and optimize your supply chain\n- **Sales & CRM**: Manage customer relationships and track sales performance\n- **Financial Management**: Handle invoicing, expenses, and financial reporting\n- **Project Management**: Plan, execute, and monitor projects effectively\n- **Human Resources**: Manage employee data and organizational structure\n\n## Getting Started\n\nOur system is designed to be intuitive and user-friendly. Whether you're a small business or a large enterprise, our ERP solution scales with your needs.",
                "category": "Product Updates",
                "tags": ["announcement", "features", "welcome"],
                "published": True,
                "featured": True,
                "publish_date": datetime(2024, 1, 15)
            },
            {
                "title": "5 Ways ERP Can Transform Your Business",
                "slug": "5-ways-erp-transforms-business",
                "excerpt": "Learn how implementing an ERP system can revolutionize your business operations and drive growth.",
                "content": "# 5 Ways ERP Can Transform Your Business\n\nImplementing an Enterprise Resource Planning (ERP) system can be a game-changer for businesses of all sizes. Here are five key ways ERP can transform your operations:\n\n## 1. Streamlined Operations\n\nERP systems integrate all business processes, eliminating data silos and reducing manual work.\n\n## 2. Real-time Visibility\n\nGet instant access to critical business data and make informed decisions quickly.\n\n## 3. Improved Efficiency\n\nAutomate routine tasks and workflows to boost productivity across your organization.\n\n## 4. Better Customer Service\n\nAccess complete customer information to provide superior service and support.\n\n## 5. Scalable Growth\n\nERP systems grow with your business, supporting expansion without major system overhauls.",
                "category": "Business Insights",
                "tags": ["transformation", "efficiency", "growth"],
                "published": True,
                "featured": True,
                "publish_date": datetime(2024, 2, 1)
            },
            {
                "title": "Understanding Inventory Management",
                "slug": "understanding-inventory-management",
                "excerpt": "Master the fundamentals of inventory management and optimize your stock levels.",
                "content": "# Understanding Inventory Management\n\nEffective inventory management is crucial for business success. It involves overseeing the flow of goods from manufacturers to warehouses and from these facilities to point of sale.\n\n## Key Concepts\n\n### Stock Levels\n- **Minimum Stock**: The lowest quantity of an item you should have\n- **Maximum Stock**: The highest quantity you should maintain\n- **Reorder Point**: When to place new orders\n\n### Inventory Methods\n- **FIFO**: First In, First Out\n- **LIFO**: Last In, First Out\n- **Weighted Average**: Average cost method\n\n## Best Practices\n\n1. Regular audits and cycle counting\n2. Automated reorder points\n3. Supplier relationship management\n4. Demand forecasting",
                "category": "How-To Guides",
                "tags": ["inventory", "management", "tutorial"],
                "published": True,
                "featured": False,
                "publish_date": datetime(2024, 2, 15)
            },
            {
                "title": "Sales Pipeline Optimization",
                "slug": "sales-pipeline-optimization",
                "excerpt": "Learn strategies to optimize your sales pipeline and increase conversion rates.",
                "content": "# Sales Pipeline Optimization\n\nA well-optimized sales pipeline is essential for consistent revenue growth. Here's how to improve your sales process:\n\n## Pipeline Stages\n\n1. **Lead Generation**: Attract potential customers\n2. **Lead Qualification**: Identify serious prospects\n3. **Proposal**: Present your solution\n4. **Negotiation**: Handle objections and pricing\n5. **Closing**: Finalize the deal\n6. **Follow-up**: Ensure customer satisfaction\n\n## Optimization Strategies\n\n### Data-Driven Decisions\nUse analytics to identify bottlenecks and improvement opportunities.\n\n### Process Standardization\nCreate consistent procedures for each pipeline stage.\n\n### Technology Integration\nLeverage CRM tools to automate and streamline processes.",
                "category": "Sales & Marketing",
                "tags": ["sales", "pipeline", "optimization"],
                "published": True,
                "featured": False,
                "publish_date": datetime(2024, 3, 1)
            },
            {
                "title": "Financial Reporting Best Practices",
                "slug": "financial-reporting-best-practices",
                "excerpt": "Essential practices for accurate and timely financial reporting in your organization.",
                "content": "# Financial Reporting Best Practices\n\nAccurate financial reporting is critical for business decision-making and compliance. Follow these best practices:\n\n## Key Principles\n\n### Accuracy\nEnsure all financial data is correct and verifiable.\n\n### Timeliness\nProduce reports promptly to support decision-making.\n\n### Consistency\nUse standardized methods and formats across all reports.\n\n### Transparency\nProvide clear explanations and supporting documentation.\n\n## Essential Reports\n\n1. **Income Statement**: Revenue and expenses\n2. **Balance Sheet**: Assets, liabilities, and equity\n3. **Cash Flow Statement**: Cash inflows and outflows\n4. **Budget vs. Actual**: Performance against budget\n\n## Automation Benefits\n\nModern ERP systems automate much of the reporting process, reducing errors and saving time.",
                "category": "Finance",
                "tags": ["reporting", "finance", "compliance"],
                "published": True,
                "featured": True,
                "publish_date": datetime(2024, 3, 15)
            },
            {
                "title": "Project Management Methodologies",
                "slug": "project-management-methodologies",
                "excerpt": "Explore different project management approaches and find the right fit for your organization.",
                "content": "# Project Management Methodologies\n\nChoosing the right project management methodology can significantly impact project success. Here are the most popular approaches:\n\n## Waterfall\n\nA traditional, linear approach where each phase must be completed before the next begins.\n\n**Best for**: Well-defined projects with stable requirements\n\n## Agile\n\nAn iterative approach that emphasizes flexibility and customer collaboration.\n\n**Best for**: Projects with changing requirements and need for rapid delivery\n\n## Scrum\n\nA specific Agile framework using sprints and defined roles.\n\n**Best for**: Software development and complex product development\n\n## Kanban\n\nA visual workflow management method that limits work in progress.\n\n**Best for**: Continuous workflow and process improvement\n\n## Hybrid Approaches\n\nMany organizations combine elements from different methodologies to create a custom approach.",
                "category": "Project Management",
                "tags": ["methodology", "agile", "waterfall"],
                "published": True,
                "featured": False,
                "publish_date": datetime(2024, 4, 1)
            },
            {
                "title": "Data Security in ERP Systems",
                "slug": "data-security-erp-systems",
                "excerpt": "Essential security measures to protect your business data in ERP environments.",
                "content": "# Data Security in ERP Systems\n\nProtecting sensitive business data is paramount in today's digital landscape. Here's how to secure your ERP system:\n\n## Security Fundamentals\n\n### Access Control\n- Role-based permissions\n- Multi-factor authentication\n- Regular access reviews\n\n### Data Encryption\n- Encryption at rest\n- Encryption in transit\n- Key management\n\n### Network Security\n- Firewalls and intrusion detection\n- VPN for remote access\n- Regular security updates\n\n## Compliance Considerations\n\n### GDPR\nEnsure proper handling of personal data for EU citizens.\n\n### SOX\nMaintain financial data integrity and audit trails.\n\n### Industry Standards\nFollow sector-specific security requirements.\n\n## Best Practices\n\n1. Regular security audits\n2. Employee training\n3. Incident response planning\n4. Backup and disaster recovery",
                "category": "Security",
                "tags": ["security", "compliance", "data protection"],
                "published": True,
                "featured": True,
                "publish_date": datetime(2024, 4, 15)
            },
            {
                "title": "Cloud vs On-Premise ERP",
                "slug": "cloud-vs-onpremise-erp",
                "excerpt": "Compare cloud and on-premise ERP deployments to make the right choice for your business.",
                "content": "# Cloud vs On-Premise ERP\n\nChoosing between cloud and on-premise ERP deployment is a critical decision. Here's a comprehensive comparison:\n\n## Cloud ERP Advantages\n\n### Lower Upfront Costs\nNo need for extensive hardware investments.\n\n### Scalability\nEasily scale resources up or down based on needs.\n\n### Automatic Updates\nVendor handles system updates and maintenance.\n\n### Remote Access\nAccess from anywhere with internet connection.\n\n## On-Premise ERP Advantages\n\n### Complete Control\nFull control over system and data.\n\n### Customization\nExtensive customization possibilities.\n\n### Security\nDirect control over security measures.\n\n### Compliance\nEasier to meet specific regulatory requirements.\n\n## Making the Decision\n\nConsider factors like:\n- Budget and cash flow\n- IT resources and expertise\n- Security requirements\n- Compliance needs\n- Growth plans",
                "category": "Technology",
                "tags": ["cloud", "deployment", "comparison"],
                "published": True,
                "featured": False,
                "publish_date": datetime(2024, 5, 1)
            },
            {
                "title": "Mobile ERP: Business on the Go",
                "slug": "mobile-erp-business-on-go",
                "excerpt": "Discover how mobile ERP solutions enable productivity and decision-making anywhere.",
                "content": "# Mobile ERP: Business on the Go\n\nMobile ERP solutions are transforming how businesses operate, enabling real-time access to critical information from anywhere.\n\n## Mobile Capabilities\n\n### Real-time Data Access\nAccess dashboards, reports, and key metrics on mobile devices.\n\n### Workflow Approvals\nApprove purchase orders, expense reports, and other documents remotely.\n\n### Field Operations\nUpdate inventory, record transactions, and manage projects from the field.\n\n### Customer Interactions\nAccess customer information during meetings and site visits.\n\n## Benefits\n\n### Increased Productivity\nEmployees can work efficiently regardless of location.\n\n### Faster Decision Making\nReal-time data enables quick, informed decisions.\n\n### Improved Customer Service\nInstant access to customer data improves service quality.\n\n### Cost Reduction\nReduce travel and office overhead costs.\n\n## Implementation Considerations\n\n1. Security protocols for mobile access\n2. User interface optimization for mobile devices\n3. Offline capability requirements\n4. Device management policies",
                "category": "Technology",
                "tags": ["mobile", "productivity", "remote work"],
                "published": True,
                "featured": False,
                "publish_date": datetime(2024, 5, 15)
            },
            {
                "title": "ERP ROI: Measuring Success",
                "slug": "erp-roi-measuring-success",
                "excerpt": "Learn how to measure and maximize return on investment from your ERP implementation.",
                "content": "# ERP ROI: Measuring Success\n\nMeasuring return on investment (ROI) is crucial for justifying ERP expenses and optimizing system value.\n\n## ROI Calculation\n\n### Formula\nROI = (Benefits - Costs) / Costs × 100\n\n### Timeframe\nTypically measured over 3-5 years post-implementation.\n\n## Quantifiable Benefits\n\n### Cost Savings\n- Reduced labor costs through automation\n- Lower inventory carrying costs\n- Decreased IT maintenance expenses\n\n### Revenue Increases\n- Improved customer satisfaction\n- Faster order processing\n- Better inventory availability\n\n### Efficiency Gains\n- Reduced processing time\n- Eliminated duplicate data entry\n- Streamlined workflows\n\n## Intangible Benefits\n\n### Improved Decision Making\nBetter data leads to smarter business decisions.\n\n### Enhanced Compliance\nReduced risk of regulatory violations.\n\n### Competitive Advantage\nImproved agility and responsiveness.\n\n## Measuring Success\n\n1. Establish baseline metrics before implementation\n2. Track key performance indicators (KPIs)\n3. Regular reviews and assessments\n4. Continuous optimization",
                "category": "Business Insights",
                "tags": ["roi", "metrics", "success"],
                "published": True,
                "featured": True,
                "publish_date": datetime(2024, 6, 1)
            }
        ]
        
        for data in blogs_data:
            blog = Blog(**data, created_by=admin_profile.id, updated_by=admin_profile.id)
            db.add(blog)
        
        # Seed FAQs (10 records)
        faqs_data = [
            {
                "question": "What is an ERP system?",
                "answer": "An Enterprise Resource Planning (ERP) system is a comprehensive business management software that integrates various business processes and functions into a single, unified system. It helps organizations manage their operations more efficiently by providing real-time visibility into all aspects of the business.",
                "category": "General",
                "order_index": 1,
                "published": True
            },
            {
                "question": "How do I get started with the system?",
                "answer": "To get started, simply log in with your provided credentials, complete your profile setup, and familiarize yourself with the dashboard. We recommend starting with the Getting Started guide in our documentation section.",
                "category": "Getting Started",
                "order_index": 2,
                "published": True
            },
            {
                "question": "Can I customize the dashboard?",
                "answer": "Yes! Our dashboard is fully customizable. You can add, remove, and rearrange widgets to show the information most relevant to your role and responsibilities. Access the customization options from the dashboard settings menu.",
                "category": "Dashboard",
                "order_index": 3,
                "published": True
            },
            {
                "question": "How do I manage inventory items?",
                "answer": "Navigate to the Inventory section to add, edit, and track your inventory items. You can set reorder points, track stock levels, and generate reports. The system will automatically alert you when items are running low.",
                "category": "Inventory",
                "order_index": 4,
                "published": True
            },
            {
                "question": "Is my data secure?",
                "answer": "Absolutely. We implement industry-standard security measures including data encryption, secure authentication, regular backups, and access controls. Your data is protected both in transit and at rest.",
                "category": "Security",
                "order_index": 5,
                "published": True
            },
            {
                "question": "Can I access the system from mobile devices?",
                "answer": "Yes, our ERP system is fully responsive and works on tablets and smartphones. You can access all major functions from any device with an internet connection and a modern web browser.",
                "category": "Technical",
                "order_index": 6,
                "published": True
            },
            {
                "question": "How do I generate reports?",
                "answer": "Go to the Reports section where you'll find various pre-built reports for sales, inventory, finance, and more. You can also create custom reports using our report builder tool. Reports can be exported to PDF or Excel formats.",
                "category": "Reports",
                "order_index": 7,
                "published": True
            },
            {
                "question": "What payment methods do you accept?",
                "answer": "We accept all major credit cards, bank transfers, and digital payment methods. Payment processing is handled securely through our certified payment partners. Contact our billing team for enterprise payment options.",
                "category": "Billing",
                "order_index": 8,
                "published": True
            },
            {
                "question": "How do I add new users to the system?",
                "answer": "Admin users can add new users through the User Management section. Simply click 'Add New User', enter their details, assign appropriate roles and permissions, and send them an invitation email.",
                "category": "User Management",
                "order_index": 9,
                "published": True
            },
            {
                "question": "What support options are available?",
                "answer": "We offer multiple support channels including email support, live chat, comprehensive documentation, video tutorials, and community forums. Premium plans include phone support and dedicated account managers.",
                "category": "Support",
                "order_index": 10,
                "published": True
            }
        ]
        
        for data in faqs_data:
            faq = FAQ(**data, created_by=admin_profile.id, updated_by=admin_profile.id)
            db.add(faq)
        
        # Commit all seeded data
        db.commit()
        print("✅ Database seeded successfully with comprehensive data!")
        print("📊 Seeded data summary:")
        print("   - Users & Profiles: Admin + Test users")
        print("   - Customers: 10 records")
        print("   - Employees: 10 records")
        print("   - Inventory Items: 10 records")
        print("   - Sales Leads: 10 records")
        print("   - Projects: 10 records")
        print("   - Suppliers: 10 records")
        print("   - Purchase Orders: 10 records")
        print("   - Work Orders: 10 records")
        print("   - Docs: 10 records")
        print("   - Blogs: 10 records")
        print("   - FAQs: 10 records")
        print("   - Finance Data: Transactions, Invoices, Expenses")
        print("   - System Settings: 1 record")
        print("   - Chat Messages: Sample messages")
        print("   - Tickets: 15 tickets with various statuses and priorities")
        print("   - Ticket Comments: Comments on selected tickets")
        print("🔑 Admin credentials: admin@erpnew.com / admin123")
        
        # Seed finance transactions
        print("Seeding transactions...")
        transaction_types = ["income", "expense", "transfer"]
        categories = ["Sales", "Salary", "Rent", "Utilities", "Office Supplies", "Marketing", "Travel", "Consulting", "Software", "Hardware"]
        
        for i in range(10):
            transaction = Transaction(
                id=str(uuid.uuid4()),
                type=transaction_types[i % len(transaction_types)],
                amount=float(Decimal(str(100 + i * 250)) + Decimal(str(random.randint(0, 99) / 100))),
                description=f"Sample transaction {i+1}",
                date=datetime.now() - timedelta(days=i*3),
                category=categories[i % len(categories)],
                reference=f"REF-{2025}-{i+100}" if i % 2 == 0 else None,
                created_by=admin_profile.id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.add(transaction)

        # Seed finance invoices
        print("Seeding finance invoices...")
        statuses = ["draft", "sent", "paid", "overdue"]
        
        # Get client names from customers table
        customers = db.query(Customer).all()
        client_names = [customer.name for customer in customers]
        
        for i in range(10):
            invoice = FinanceInvoice(
                id=str(uuid.uuid4()),
                invoice_number=f"INV-{2025}-{i+100}",
                client_name=client_names[i % len(client_names)],  # Use client_name instead of customer_id
                amount=float(Decimal(str(500 + i * 300)) + Decimal(str(random.randint(0, 99) / 100))),
                status=statuses[i % len(statuses)],
                issue_date=datetime.now() - timedelta(days=i*5),
                due_date=datetime.now() + timedelta(days=30 - i*3),
                notes=f"Payment due in 30 days. Thank you for your business!" if i % 2 == 0 else None,
                created_by=admin_profile.id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.add(invoice)

        # Seed finance expenses
        print("Seeding finance expenses...")
        expense_categories = ["Travel", "Office Supplies", "Utilities", "Rent", "Software", "Hardware", "Marketing", "Consulting", "Maintenance", "Training"]
        vendors = ["Vendor A", "Vendor B", "Vendor C", "Vendor D", "Vendor E", "Vendor F", "Vendor G", "Vendor H", "Vendor I", "Vendor J"]
        
        for i in range(10):
            expense = FinanceExpense(
                id=str(uuid.uuid4()),
                expense_number=f"EXP-{2025}-{i+100}",
                category=expense_categories[i % len(expense_categories)],
                amount=float(Decimal(str(200 + i * 150)) + Decimal(str(random.randint(0, 99) / 100))),
                vendor=vendors[i % len(vendors)],
                expense_date=datetime.now() - timedelta(days=i*2),
                created_by=admin_profile.id,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.add(expense)

        db.commit()
        print("✅ Finance data seeded successfully!")

        # Seed system settings
        print("Seeding system settings...")
        system_setting = SystemSetting(
            id=str(uuid.uuid4()),
            auto_backup=True,
            api_access=False,
            debug_mode=False,
            created_by=admin_profile.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(system_setting)
        db.commit()
        print("✅ System settings seeded successfully!")

        # Seed chat messages
        print("Seeding chat messages...")
        chat_messages_data = [
            {"user_id": admin_profile.id, "content": "Welcome to the team chat! 🎉"},
            {"user_id": admin_profile.id, "content": "Feel free to ask questions and collaborate here."},
        ]
        
        # Add messages from test users if they exist
        test_profiles = db.query(Profile).filter(Profile.email.like('%@erpnew.com')).all()
        if len(test_profiles) > 1:
            chat_messages_data.extend([
                {"user_id": test_profiles[1].id, "content": "Hi everyone! Excited to be working with the team."},
                {"user_id": test_profiles[2].id if len(test_profiles) > 2 else admin_profile.id, "content": "Looking forward to our project collaboration!"},
                {"user_id": admin_profile.id, "content": "Great to have you all aboard! Let's make this project successful."},
            ])
        
        for i, data in enumerate(chat_messages_data):
            message = ChatMessage(
                id=str(uuid.uuid4()),
                user_id=data["user_id"],
                content=data["content"],
                created_at=datetime.now() - timedelta(hours=i),
                updated_at=datetime.now() - timedelta(hours=i)
            )
            db.add(message)
        
        db.commit()
        print("✅ Chat messages seeded successfully!")

        # Seed tickets
        print("Seeding tickets...")
        
        # Get user profiles for ticket assignment
        all_profiles = db.query(Profile).all()
        ticket_types = ["bug", "feature_request", "support", "improvement", "question"]
        ticket_statuses = ["open", "in_progress", "resolved", "closed", "reopened"]
        ticket_priorities = ["low", "medium", "high", "urgent"]
        departments = ["IT", "Finance", "Human Resources", "Sales", "Marketing", "Operations", "Customer Service"]
        modules = ["Dashboard", "Finance", "Human Resources", "Inventory", "Sales", "Projects", "Reports", "Settings", "Authentication", "API"]
        
        ticket_data = [
            {
                "title": "Login page not loading correctly",
                "description": "Users are experiencing issues with the login page. The page loads but the login form doesn't appear properly on mobile devices.",
                "priority": "high",
                "type": "bug",
                "status": "open",
                "department": "IT",
                "module": "Authentication",
                "due_date": datetime.now() + timedelta(days=3)
            },
            {
                "title": "Add dark mode feature",
                "description": "Users have requested a dark mode toggle for better accessibility and reduced eye strain during extended use.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Dashboard",
                "due_date": datetime.now() + timedelta(days=14)
            },
            {
                "title": "Database connection timeout",
                "description": "Intermittent database connection timeouts affecting the finance module. Users report slow loading times and occasional errors.",
                "priority": "urgent",
                "type": "bug",
                "status": "in_progress",
                "department": "IT",
                "module": "Finance",
                "due_date": datetime.now() + timedelta(days=1)
            },
            {
                "title": "Export reports to Excel",
                "description": "Add functionality to export all reports to Excel format for better data manipulation and sharing.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Reports",
                "due_date": datetime.now() + timedelta(days=10)
            },
            {
                "title": "Improve inventory search performance",
                "description": "The inventory search is taking too long when searching through large datasets. Need to optimize the search algorithm.",
                "priority": "high",
                "type": "improvement",
                "status": "in_progress",
                "department": "IT",
                "module": "Inventory",
                "due_date": datetime.now() + timedelta(days=5)
            },
            {
                "title": "How to reset user password",
                "description": "Need clarification on the process for resetting user passwords. The current documentation is unclear.",
                "priority": "low",
                "type": "question",
                "status": "resolved",
                "department": "IT",
                "module": "Settings",
                "due_date": datetime.now() - timedelta(days=2),
                "resolved_at": datetime.now() - timedelta(days=1)
            },
            {
                "title": "Sales dashboard shows incorrect data",
                "description": "The sales dashboard is displaying incorrect revenue figures for the current month. Numbers don't match the actual sales records.",
                "priority": "urgent",
                "type": "bug",
                "status": "open",
                "department": "Sales",
                "module": "Dashboard",
                "due_date": datetime.now() + timedelta(days=2)
            },
            {
                "title": "Add bulk email functionality",
                "description": "Request to add bulk email sending capability for marketing campaigns and customer communications.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "Marketing",
                "module": "Sales",
                "due_date": datetime.now() + timedelta(days=21)
            },
            {
                "title": "Payroll calculation error",
                "description": "There's an error in the payroll calculation for employees with overtime hours. The overtime rate is not being applied correctly.",
                "priority": "high",
                "type": "bug",
                "status": "resolved",
                "department": "Human Resources",
                "module": "Human Resources",
                "due_date": datetime.now() - timedelta(days=3),
                "resolved_at": datetime.now() - timedelta(days=1)
            },
            {
                "title": "Optimize database queries",
                "description": "General performance improvement task to optimize slow database queries across the application.",
                "priority": "medium",
                "type": "improvement",
                "status": "in_progress",
                "department": "IT",
                "module": "API",
                "due_date": datetime.now() + timedelta(days=7)
            },
            {
                "title": "Mobile app integration",
                "description": "Develop mobile app integration for field workers to access inventory and project management features.",
                "priority": "high",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Projects",
                "due_date": datetime.now() + timedelta(days=30)
            },
            {
                "title": "Customer support ticket system",
                "description": "Implement a customer support ticket system for better customer service management.",
                "priority": "medium",
                "type": "feature_request",
                "status": "closed",
                "department": "Customer Service",
                "module": "Dashboard",
                "due_date": datetime.now() - timedelta(days=10),
                "resolved_at": datetime.now() - timedelta(days=5)
            },
            {
                "title": "API rate limiting issues",
                "description": "Some API endpoints are hitting rate limits too quickly, causing integration failures with third-party services.",
                "priority": "high",
                "type": "bug",
                "status": "open",
                "department": "IT",
                "module": "API",
                "due_date": datetime.now() + timedelta(days=4)
            },
            {
                "title": "Financial report discrepancies",
                "description": "Monthly financial reports show discrepancies between different modules. Need to investigate data synchronization issues.",
                "priority": "urgent",
                "type": "bug",
                "status": "in_progress",
                "department": "Finance",
                "module": "Reports",
                "due_date": datetime.now() + timedelta(days=2)
            },
            {
                "title": "User interface improvements",
                "description": "General UI/UX improvements based on user feedback. Make the interface more intuitive and user-friendly.",
                "priority": "low",
                "type": "improvement",
                "status": "open",
                "department": "IT",
                "module": "Dashboard",
                "due_date": datetime.now() + timedelta(days=20)
            }
        ]
        
        # Generate ticket numbers and create tickets
        for i, data in enumerate(ticket_data):
            ticket_number = f"TK-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
            
            # Assign creator and assignee
            creator = all_profiles[i % len(all_profiles)]
            assignee = all_profiles[(i + 1) % len(all_profiles)] if i % 3 != 0 else None
            
            ticket = Ticket(
                id=str(uuid.uuid4()),
                ticket_number=ticket_number,
                title=data["title"],
                description=data["description"],
                status=data["status"],
                priority=data["priority"],
                ticket_type=data["type"],
                department=data["department"],
                module=data["module"],
                due_date=data["due_date"],
                resolved_at=data.get("resolved_at"),
                created_by=creator.id,
                assigned_to=assignee.id if assignee else None,
                created_at=datetime.now() - timedelta(days=i),
                updated_at=datetime.now() - timedelta(days=i)
            )
            db.add(ticket)
        
        db.commit()
        print("✅ Tickets seeded successfully!")
        
        # Seed ticket comments
        print("Seeding ticket comments...")
        
        # Get all tickets for adding comments
        all_tickets = db.query(Ticket).all()
        
        comment_templates = [
            "I'm looking into this issue and will provide an update shortly.",
            "This has been escalated to the development team for immediate attention.",
            "The issue has been reproduced and we're working on a fix.",
            "Please provide additional details about when this issue occurs.",
            "A temporary workaround has been implemented while we develop a permanent solution.",
            "This feature has been added to our roadmap for the next release.",
            "The problem has been identified and a fix will be deployed tomorrow.",
            "Thank you for reporting this. We'll investigate and get back to you.",
            "This is a known issue that will be addressed in the upcoming maintenance window.",
            "The requested feature aligns with our product strategy and will be prioritized.",
            "We need to schedule a meeting to discuss the requirements in detail.",
            "The issue was caused by a recent configuration change. It has been reverted.",
            "This improvement will significantly benefit our users. Moving forward with implementation.",
            "The bug has been fixed and deployed to production. Please verify the resolution.",
            "Additional testing is required before we can implement this change."
        ]
        
        # Add comments to some tickets
        for i, ticket in enumerate(all_tickets):
            if i % 2 == 0:  # Add comments to every other ticket
                # Add 1-3 comments per ticket
                num_comments = random.randint(1, 3)
                for j in range(num_comments):
                    commenter = all_profiles[random.randint(0, len(all_profiles) - 1)]
                    comment_text = comment_templates[random.randint(0, len(comment_templates) - 1)]
                    is_internal = random.choice([True, False]) if j == 0 else False  # First comment might be internal
                    
                    comment = TicketComment(
                        id=str(uuid.uuid4()),
                        ticket_id=ticket.id,
                        user_id=commenter.id,
                        comment=comment_text,
                        is_internal=is_internal,
                        created_at=datetime.now() - timedelta(hours=i * 2 + j * 6),
                        updated_at=datetime.now() - timedelta(hours=i * 2 + j * 6)
                    )
                    db.add(comment)
        
        db.commit()
        print("✅ Ticket comments seeded successfully!")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Drop all tables first
    print("Dropping existing tables...")
    Base.metadata.drop_all(bind=engine)
    
    # Create tables
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    # Then seed data
    print("Seeding data...")
    seed_data()
