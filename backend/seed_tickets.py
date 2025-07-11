#!/usr/bin/env python3
"""
Ticket Data Seeding Script
This script seeds the database with dummy ticket data for testing the ticket system.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models import Profile, Ticket, TicketComment, TicketAttachment, TicketHistory
from datetime import datetime, timedelta
import uuid
import random

def seed_tickets():
    """Seed the database with ticket dummy data."""
    db = SessionLocal()
    
    try:
        print("🎫 Starting ticket data seeding...")
        
        # Get user profiles for ticket assignment
        all_profiles = db.query(Profile).all()
        if not all_profiles:
            print("❌ No user profiles found. Please run the main seed script first.")
            return
            
        print(f"Found {len(all_profiles)} user profiles for ticket assignment.")
        
        # Define ticket data templates
        ticket_templates = [
            {
                "title": "System performance degradation",
                "description": "Users are reporting slow response times across the application, particularly during peak hours.",
                "priority": "high",
                "type": "bug",
                "status": "open",
                "department": "IT",
                "module": "System",
                "days_old": 1
            },
            {
                "title": "Add multi-language support",
                "description": "Implement internationalization (i18n) support for Spanish, French, and German languages.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Settings",
                "days_old": 5
            },
            {
                "title": "Email notifications not working",
                "description": "Users are not receiving email notifications for important events like password resets and order confirmations.",
                "priority": "urgent",
                "type": "bug",
                "status": "in_progress",
                "department": "IT",
                "module": "Notifications",
                "days_old": 0
            },
            {
                "title": "Inventory barcode scanner integration",
                "description": "Request to integrate barcode scanning functionality for faster inventory management.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "Operations",
                "module": "Inventory",
                "days_old": 12
            },
            {
                "title": "Report generation timeout",
                "description": "Large reports are timing out before completion. Need to optimize report generation process.",
                "priority": "high",
                "type": "improvement",
                "status": "in_progress",
                "department": "IT",
                "module": "Reports",
                "days_old": 3
            },
            {
                "title": "User access permissions clarification",
                "description": "Need clarification on how to set up role-based access permissions for different user groups.",
                "priority": "low",
                "type": "question",
                "status": "resolved",
                "department": "IT",
                "module": "User Management",
                "days_old": 7
            },
            {
                "title": "Customer portal access issues",
                "description": "Some customers are unable to access their portal accounts. Login credentials appear to be correct.",
                "priority": "urgent",
                "type": "bug",
                "status": "open",
                "department": "Customer Service",
                "module": "Portal",
                "days_old": 2
            },
            {
                "title": "Advanced search functionality",
                "description": "Add advanced search filters and sorting options across all modules for better data discovery.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Search",
                "days_old": 15
            },
            {
                "title": "Data backup verification failed",
                "description": "Automated backup verification is failing. Need to investigate backup integrity and restoration process.",
                "priority": "high",
                "type": "bug",
                "status": "resolved",
                "department": "IT",
                "module": "Backup",
                "days_old": 10
            },
            {
                "title": "Mobile responsiveness improvements",
                "description": "Several UI components are not displaying correctly on mobile devices. Need responsive design updates.",
                "priority": "medium",
                "type": "improvement",
                "status": "in_progress",
                "department": "IT",
                "module": "UI/UX",
                "days_old": 8
            },
            {
                "title": "API documentation update",
                "description": "Update API documentation to reflect recent changes and add more code examples.",
                "priority": "low",
                "type": "improvement",
                "status": "open",
                "department": "IT",
                "module": "Documentation",
                "days_old": 20
            },
            {
                "title": "Integration with accounting software",
                "description": "Request to integrate with popular accounting software like QuickBooks and Xero for seamless financial data sync.",
                "priority": "high",
                "type": "feature_request",
                "status": "open",
                "department": "Finance",
                "module": "Integration",
                "days_old": 6
            },
            {
                "title": "Security audit findings",
                "description": "Address security vulnerabilities identified in the recent security audit report.",
                "priority": "urgent",
                "type": "bug",
                "status": "in_progress",
                "department": "IT",
                "module": "Security",
                "days_old": 1
            },
            {
                "title": "Bulk data import feature",
                "description": "Add functionality to import large datasets from CSV and Excel files with validation and error handling.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Data Import",
                "days_old": 18
            },
            {
                "title": "Dashboard widget customization",
                "description": "Allow users to create custom dashboard widgets with their own metrics and data visualizations.",
                "priority": "low",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Dashboard",
                "days_old": 25
            },
            {
                "title": "Print layout formatting issues",
                "description": "Reports and invoices are not formatting correctly when printed. Text overlapping and page breaks are problematic.",
                "priority": "medium",
                "type": "bug",
                "status": "open",
                "department": "IT",
                "module": "Printing",
                "days_old": 4
            },
            {
                "title": "Two-factor authentication",
                "description": "Implement two-factor authentication for enhanced security, supporting SMS and authenticator apps.",
                "priority": "high",
                "type": "feature_request",
                "status": "in_progress",
                "department": "IT",
                "module": "Authentication",
                "days_old": 9
            },
            {
                "title": "Automated workflow triggers",
                "description": "Create automated workflows that trigger actions based on specific events or conditions.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Automation",
                "days_old": 14
            },
            {
                "title": "Database connection pool exhaustion",
                "description": "Application is experiencing database connection pool exhaustion during peak usage times.",
                "priority": "urgent",
                "type": "bug",
                "status": "resolved",
                "department": "IT",
                "module": "Database",
                "days_old": 11
            },
            {
                "title": "Calendar integration for scheduling",
                "description": "Integrate with Google Calendar and Outlook for appointment scheduling and meeting management.",
                "priority": "medium",
                "type": "feature_request",
                "status": "open",
                "department": "IT",
                "module": "Calendar",
                "days_old": 16
            }
        ]
        
        # Create tickets
        created_tickets = []
        for i, template in enumerate(ticket_templates):
            ticket_number = f"TK-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
            
            # Assign creator and assignee
            creator = all_profiles[i % len(all_profiles)]
            assignee = all_profiles[(i + 1) % len(all_profiles)] if i % 3 != 0 else None
            
            # Calculate dates
            created_date = datetime.now() - timedelta(days=template["days_old"])
            due_date = created_date + timedelta(days=random.randint(1, 30))
            resolved_date = None
            
            if template["status"] in ["resolved", "closed"]:
                resolved_date = created_date + timedelta(days=random.randint(1, template["days_old"]))
            
            ticket = Ticket(
                id=str(uuid.uuid4()),
                ticket_number=ticket_number,
                title=template["title"],
                description=template["description"],
                status=template["status"],
                priority=template["priority"],
                ticket_type=template["type"],
                department=template["department"],
                module=template["module"],
                due_date=due_date,
                resolved_at=resolved_date,
                created_by=creator.id,
                assigned_to=assignee.id if assignee else None,
                created_at=created_date,
                updated_at=created_date
            )
            
            db.add(ticket)
            created_tickets.append(ticket)
        
        db.commit()
        print(f"✅ Created {len(created_tickets)} tickets successfully!")
        
        # Add comments to tickets
        print("Adding comments to tickets...")
        
        comment_templates = [
            "I've started investigating this issue. Will provide updates as I make progress.",
            "This looks like a complex problem that may require additional resources.",
            "I've reproduced the issue and identified the root cause. Working on a fix.",
            "This is a duplicate of ticket #XXX. Linking them together.",
            "The priority has been escalated due to user impact. Working on this immediately.",
            "I need more information to proceed. Can you provide additional details?",
            "This feature request aligns with our roadmap. Adding to the next sprint.",
            "I've implemented a temporary workaround. The permanent fix is in progress.",
            "Testing the proposed solution in the development environment.",
            "The issue has been resolved. Please test and confirm the fix works.",
            "This requires approval from the security team before implementation.",
            "I've assigned this to the appropriate team member for their expertise.",
            "The fix has been deployed to production. Monitoring for any issues.",
            "This is a known limitation that will be addressed in the next major release.",
            "I've created a knowledge base article to help prevent similar issues.",
            "The user has confirmed the issue is resolved. Closing the ticket.",
            "Additional testing revealed edge cases that need to be addressed.",
            "This enhancement will significantly improve user experience.",
            "I've updated the documentation to reflect the changes made.",
            "The issue was caused by a recent configuration change. Reverting now."
        ]
        
        # Add comments to random tickets
        for ticket in created_tickets:
            # 70% chance of having comments
            if random.random() < 0.7:
                num_comments = random.randint(1, 4)
                for j in range(num_comments):
                    commenter = all_profiles[random.randint(0, len(all_profiles) - 1)]
                    comment_text = random.choice(comment_templates)
                    is_internal = random.choice([True, False]) if j == 0 else False
                    
                    comment_date = ticket.created_at + timedelta(
                        hours=random.randint(1, 24 * (datetime.now() - ticket.created_at).days or 1)
                    )
                    
                    comment = TicketComment(
                        id=str(uuid.uuid4()),
                        ticket_id=ticket.id,
                        user_id=commenter.id,
                        comment=comment_text,
                        is_internal=is_internal,
                        created_at=comment_date,
                        updated_at=comment_date
                    )
                    db.add(comment)
        
        db.commit()
        print("✅ Added comments to tickets successfully!")
        
        # Print summary
        print("\n📊 Ticket Seeding Summary:")
        print(f"   Total tickets created: {len(created_tickets)}")
        
        # Count by status
        status_counts = {}
        for ticket in created_tickets:
            status_counts[ticket.status] = status_counts.get(ticket.status, 0) + 1
        
        print("   Status distribution:")
        for status, count in status_counts.items():
            print(f"     {status}: {count}")
        
        # Count by priority
        priority_counts = {}
        for ticket in created_tickets:
            priority_counts[ticket.priority] = priority_counts.get(ticket.priority, 0) + 1
        
        print("   Priority distribution:")
        for priority, count in priority_counts.items():
            print(f"     {priority}: {count}")
        
        # Count by type
        type_counts = {}
        for ticket in created_tickets:
            type_counts[ticket.ticket_type] = type_counts.get(ticket.ticket_type, 0) + 1
        
        print("   Type distribution:")
        for ticket_type, count in type_counts.items():
            print(f"     {ticket_type}: {count}")
        
        print("\n🎉 Ticket data seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding ticket data: {e}")
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_tickets()
