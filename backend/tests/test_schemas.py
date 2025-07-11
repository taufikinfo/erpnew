import pytest
from datetime import datetime
from pydantic import ValidationError

from app.schemas.tickets import (
    TicketCreate, 
    TicketUpdate, 
    TicketResponse,
    TicketStatus,
    TicketPriority,
    TicketType
)

class TestTicketSchemas:
    """Test cases for ticket Pydantic schemas"""
    
    def test_ticket_create_valid(self):
        """Test valid ticket creation schema"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug",
            "department": "IT",
            "module": "Dashboard",
            "assigned_to": "user@example.com",
            "due_date": "2025-07-15T10:00:00Z"
        }
        
        ticket = TicketCreate(**ticket_data)
        
        assert ticket.title == "Test Ticket"
        assert ticket.description == "Test Description"
        assert ticket.priority == "medium"
        assert ticket.ticket_type == "bug"
        assert ticket.department == "IT"
        assert ticket.module == "Dashboard"
        assert ticket.assigned_to == "user@example.com"
        assert ticket.due_date is not None
    
    def test_ticket_create_minimal(self):
        """Test ticket creation with minimal required fields"""
        ticket_data = {
            "title": "Minimal Ticket",
            "description": "Minimal Description",
            "priority": "low",
            "ticket_type": "support"
        }
        
        ticket = TicketCreate(**ticket_data)
        
        assert ticket.title == "Minimal Ticket"
        assert ticket.description == "Minimal Description"
        assert ticket.priority == "low"
        assert ticket.ticket_type == "support"
        assert ticket.department is None
        assert ticket.module is None
        assert ticket.assigned_to is None
        assert ticket.due_date is None
    
    def test_ticket_create_empty_title(self):
        """Test ticket creation with empty title"""
        ticket_data = {
            "title": "",
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TicketCreate(**ticket_data)
        
        assert "String should have at least 1 character" in str(exc_info.value)
    
    def test_ticket_create_empty_description(self):
        """Test ticket creation with empty description"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        # With our validator, empty description should be converted to None
        ticket = TicketCreate(**ticket_data)
        assert ticket.description is None
    
    def test_ticket_create_invalid_priority(self):
        """Test ticket creation with invalid priority"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "Test Description",
            "priority": "invalid_priority",
            "ticket_type": "bug"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TicketCreate(**ticket_data)
        
        assert "Input should be" in str(exc_info.value)
    
    def test_ticket_create_invalid_type(self):
        """Test ticket creation with invalid ticket type"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "invalid_type"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TicketCreate(**ticket_data)
        
        assert "Input should be" in str(exc_info.value)
    
    def test_ticket_update_valid(self):
        """Test valid ticket update schema"""
        update_data = {
            "title": "Updated Ticket",
            "description": "Updated Description",
            "status": "in_progress",
            "priority": "high",
            "ticket_type": "feature_request",
            "department": "Sales",
            "module": "Reports",
            "assigned_to": "admin@example.com",
            "due_date": "2025-08-01T10:00:00Z"
        }
        
        ticket_update = TicketUpdate(**update_data)
        
        assert ticket_update.title == "Updated Ticket"
        assert ticket_update.description == "Updated Description"
        assert ticket_update.status == "in_progress"
        assert ticket_update.priority == "high"
        assert ticket_update.ticket_type == "feature_request"
        assert ticket_update.department == "Sales"
        assert ticket_update.module == "Reports"
        assert ticket_update.assigned_to == "admin@example.com"
        assert ticket_update.due_date is not None
    
    def test_ticket_update_partial(self):
        """Test partial ticket update"""
        update_data = {
            "title": "Partially Updated Ticket",
            "status": "resolved"
        }
        
        ticket_update = TicketUpdate(**update_data)
        
        assert ticket_update.title == "Partially Updated Ticket"
        assert ticket_update.status == "resolved"
        assert ticket_update.description is None
        assert ticket_update.priority is None
        assert ticket_update.ticket_type is None
    
    def test_ticket_update_empty(self):
        """Test empty ticket update"""
        ticket_update = TicketUpdate()
        
        assert ticket_update.title is None
        assert ticket_update.description is None
        assert ticket_update.status is None
        assert ticket_update.priority is None
        assert ticket_update.ticket_type is None
        assert ticket_update.department is None
        assert ticket_update.module is None
        assert ticket_update.assigned_to is None
        assert ticket_update.due_date is None
    
    def test_ticket_update_invalid_status(self):
        """Test ticket update with invalid status"""
        update_data = {
            "status": "invalid_status"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TicketUpdate(**update_data)
        
        assert "Input should be" in str(exc_info.value)
    
    def test_ticket_update_empty_description_conversion(self):
        """Test that empty description is converted to None in update"""
        update_data = {
            "description": ""
        }
        
        ticket_update = TicketUpdate(**update_data)
        assert ticket_update.description is None
    
    def test_ticket_response_valid(self):
        """Test valid ticket response schema"""
        response_data = {
            "id": "1",
            "ticket_number": "TK-001",
            "title": "Test Ticket",
            "description": "Test Description",
            "status": "open",
            "priority": "medium",
            "ticket_type": "bug",
            "department": "IT",
            "module": "Dashboard",
            "assigned_to": "user@example.com",
            "due_date": "2025-07-15T10:00:00Z",
            "created_at": "2025-07-01T10:00:00Z",
            "updated_at": "2025-07-01T10:00:00Z"
        }
        
        ticket_response = TicketResponse(**response_data)
        
        assert ticket_response.id == "1"
        assert ticket_response.ticket_number == "TK-001"
        assert ticket_response.title == "Test Ticket"
        assert ticket_response.description == "Test Description"
        assert ticket_response.status == "open"
        assert ticket_response.priority == "medium"
        assert ticket_response.ticket_type == "bug"
        assert ticket_response.department == "IT"
        assert ticket_response.module == "Dashboard"
        assert ticket_response.assigned_to == "user@example.com"
        assert ticket_response.due_date is not None
        assert ticket_response.created_at is not None
        assert ticket_response.updated_at is not None

class TestTicketEnums:
    """Test cases for ticket enums"""
    
    def test_ticket_status_enum(self):
        """Test ticket status enum values"""
        valid_statuses = ['open', 'in_progress', 'resolved', 'closed', 'reopened']
        
        for status in valid_statuses:
            assert status in [e.value for e in TicketStatus]
    
    def test_ticket_priority_enum(self):
        """Test ticket priority enum values"""
        valid_priorities = ['low', 'medium', 'high', 'urgent']
        
        for priority in valid_priorities:
            assert priority in [e.value for e in TicketPriority]
    
    def test_ticket_type_enum(self):
        """Test ticket type enum values"""
        valid_types = ['bug', 'feature_request', 'support', 'improvement', 'question']
        
        for ticket_type in valid_types:
            assert ticket_type in [e.value for e in TicketType]

class TestTicketValidators:
    """Test cases for custom validators"""
    
    def test_description_validator_empty_string(self):
        """Test description validator with empty string"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.description is None
    
    def test_description_validator_whitespace_only(self):
        """Test description validator with whitespace only"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "   ",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.description is None
    
    def test_description_validator_valid_content(self):
        """Test description validator with valid content"""
        ticket_data = {
            "title": "Test Ticket",
            "description": "Valid description with content",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.description == "Valid description with content"
    
    def test_description_validator_none_value(self):
        """Test description validator with None value"""
        ticket_data = {
            "title": "Test Ticket",
            "description": None,
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.description is None
    
    def test_update_description_validator(self):
        """Test description validator in update schema"""
        update_data = {
            "description": ""
        }
        
        ticket_update = TicketUpdate(**update_data)
        assert ticket_update.description is None
        
        update_data = {
            "description": "Updated description"
        }
        
        ticket_update = TicketUpdate(**update_data)
        assert ticket_update.description == "Updated description"

class TestTicketSchemaEdgeCases:
    """Test edge cases for ticket schemas"""
    
    def test_very_long_title(self):
        """Test handling of very long titles"""
        long_title = "A" * 1000
        ticket_data = {
            "title": long_title,
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        # Should not raise an error unless there's a max length validator
        ticket = TicketCreate(**ticket_data)
        assert ticket.title == long_title
    
    def test_special_characters_in_title(self):
        """Test handling of special characters in title"""
        special_title = "Test Ticket with Special Characters: @#$%^&*()_+"
        ticket_data = {
            "title": special_title,
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.title == special_title
    
    def test_unicode_characters(self):
        """Test handling of Unicode characters"""
        unicode_title = "Test Ticket with Unicode: 测试 🎯 café"
        ticket_data = {
            "title": unicode_title,
            "description": "Test Description with Unicode: 描述 📝",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.title == unicode_title
        assert ticket.description == "Test Description with Unicode: 描述 📝"
    
    def test_email_validation_in_assigned_to(self):
        """Test email format in assigned_to field"""
        # Valid email
        ticket_data = {
            "title": "Test Ticket",
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug",
            "assigned_to": "user@example.com"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.assigned_to == "user@example.com"
        
        # Invalid email format (if email validation is implemented)
        # This test would depend on whether email validation is implemented
        # in the schema. If not, it would just store the string as-is.
    
    def test_datetime_formats(self):
        """Test various datetime formats"""
        # ISO format
        ticket_data = {
            "title": "Test Ticket",
            "description": "Test Description",
            "priority": "medium",
            "ticket_type": "bug",
            "due_date": "2025-07-15T10:00:00Z"
        }
        
        ticket = TicketCreate(**ticket_data)
        assert ticket.due_date is not None
        
        # Test with different timezone
        ticket_data["due_date"] = "2025-07-15T10:00:00+05:30"
        ticket = TicketCreate(**ticket_data)
        assert ticket.due_date is not None

if __name__ == "__main__":
    pytest.main([__file__])
