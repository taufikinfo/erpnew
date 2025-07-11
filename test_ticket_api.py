#!/usr/bin/env python3
"""
Test script for the Ticket System API endpoints
Run this script to test the basic functionality of the ticket system
"""

import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api/v1"

def test_ticket_creation():
    """Test creating a new ticket"""
    print("Testing ticket creation...")
    
    ticket_data = {
        "title": "Test Ticket - API Test",
        "description": "This is a test ticket created via API testing script",
        "priority": "medium",
        "type": "support",
        "department": "IT",
        "module": "API Testing",
        "due_date": (datetime.now() + timedelta(days=7)).isoformat()
    }
    
    try:
        response = requests.post(f"{BASE_URL}/tickets", json=ticket_data)
        if response.status_code == 200:
            ticket = response.json()
            print(f"✅ Ticket created successfully: {ticket['ticket_number']}")
            return ticket['id']
        else:
            print(f"❌ Failed to create ticket: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error creating ticket: {e}")
        return None

def test_ticket_listing():
    """Test listing tickets"""
    print("\nTesting ticket listing...")
    
    try:
        response = requests.get(f"{BASE_URL}/tickets")
        if response.status_code == 200:
            tickets = response.json()
            print(f"✅ Successfully retrieved {len(tickets)} tickets")
            return tickets
        else:
            print(f"❌ Failed to list tickets: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"❌ Error listing tickets: {e}")
        return []

def test_ticket_filtering():
    """Test ticket filtering"""
    print("\nTesting ticket filtering...")
    
    try:
        # Test filtering by status
        response = requests.get(f"{BASE_URL}/tickets?status=open")
        if response.status_code == 200:
            tickets = response.json()
            print(f"✅ Successfully retrieved {len(tickets)} open tickets")
        else:
            print(f"❌ Failed to filter tickets: {response.status_code}")
            
        # Test searching
        response = requests.get(f"{BASE_URL}/tickets?search=test")
        if response.status_code == 200:
            tickets = response.json()
            print(f"✅ Successfully searched tickets: {len(tickets)} results")
        else:
            print(f"❌ Failed to search tickets: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error filtering tickets: {e}")

def test_ticket_update(ticket_id):
    """Test updating a ticket"""
    if not ticket_id:
        print("\nSkipping ticket update test - no ticket ID available")
        return
        
    print(f"\nTesting ticket update for ID: {ticket_id}")
    
    update_data = {
        "status": "in_progress",
        "priority": "high",
        "description": "Updated description - ticket is now in progress"
    }
    
    try:
        response = requests.put(f"{BASE_URL}/tickets/{ticket_id}", json=update_data)
        if response.status_code == 200:
            ticket = response.json()
            print(f"✅ Ticket updated successfully: {ticket['status']}")
        else:
            print(f"❌ Failed to update ticket: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error updating ticket: {e}")

def test_ticket_comments(ticket_id):
    """Test adding comments to a ticket"""
    if not ticket_id:
        print("\nSkipping comment test - no ticket ID available")
        return
        
    print(f"\nTesting comments for ticket ID: {ticket_id}")
    
    comment_data = {
        "comment": "This is a test comment added via API",
        "is_internal": False
    }
    
    try:
        # Add comment
        response = requests.post(f"{BASE_URL}/tickets/{ticket_id}/comments", json=comment_data)
        if response.status_code == 200:
            comment = response.json()
            print(f"✅ Comment added successfully: {comment['id']}")
        else:
            print(f"❌ Failed to add comment: {response.status_code} - {response.text}")
            
        # Get comments
        response = requests.get(f"{BASE_URL}/tickets/{ticket_id}/comments")
        if response.status_code == 200:
            comments = response.json()
            print(f"✅ Successfully retrieved {len(comments)} comments")
        else:
            print(f"❌ Failed to get comments: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error with comments: {e}")

def test_ticket_stats():
    """Test ticket statistics"""
    print("\nTesting ticket statistics...")
    
    try:
        response = requests.get(f"{BASE_URL}/tickets/stats/summary")
        if response.status_code == 200:
            stats = response.json()
            print("✅ Statistics retrieved successfully:")
            print(f"   Total tickets: {stats['total_tickets']}")
            print(f"   Open tickets: {stats['open_tickets']}")
            print(f"   In progress: {stats['in_progress_tickets']}")
            print(f"   Resolved: {stats['resolved_tickets']}")
            print(f"   Urgent: {stats['urgent_tickets']}")
        else:
            print(f"❌ Failed to get statistics: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error getting statistics: {e}")

def test_ticket_deletion(ticket_id):
    """Test deleting a ticket"""
    if not ticket_id:
        print("\nSkipping ticket deletion test - no ticket ID available")
        return
        
    print(f"\nTesting ticket deletion for ID: {ticket_id}")
    
    try:
        response = requests.delete(f"{BASE_URL}/tickets/{ticket_id}")
        if response.status_code == 200:
            print("✅ Ticket deleted successfully")
        else:
            print(f"❌ Failed to delete ticket: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error deleting ticket: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting Ticket System API Tests")
    print("=" * 50)
    
    # Test ticket creation
    ticket_id = test_ticket_creation()
    
    # Test ticket listing
    test_ticket_listing()
    
    # Test ticket filtering
    test_ticket_filtering()
    
    # Test ticket update
    test_ticket_update(ticket_id)
    
    # Test comments
    test_ticket_comments(ticket_id)
    
    # Test statistics
    test_ticket_stats()
    
    # Test ticket deletion (uncomment if you want to clean up)
    # test_ticket_deletion(ticket_id)
    
    print("\n" + "=" * 50)
    print("🏁 Ticket System API Tests Completed")
    print("\nNote: Make sure the backend server is running on http://localhost:8000")
    print("and the database is properly configured with the ticket tables.")

if __name__ == "__main__":
    main()
