import pytest
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from unittest.mock import Mock, patch

from app.core.database import Base
from app.models.tickets import Ticket

# Test database URL - using SQLite in-memory for testing
TEST_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="function")
def test_db():
    """Create a test database session"""
    engine = create_engine(TEST_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()
    
    yield session
    
    session.close()

@pytest.fixture
def sample_ticket_data():
    """Sample ticket data for testing"""
    return {
        "ticket_number": "TK-001",
        "title": "Test Ticket",
        "description": "Test Description",
        "status": "open",
        "priority": "medium",
        "ticket_type": "bug",
        "department": "IT",
        "module": "Dashboard",
        "assigned_to": "user@example.com",
        "due_date": datetime(2025, 7, 15, 10, 0, 0)
    }

class TestTicketModel:
    """Test cases for Ticket model"""
    
    def test_create_ticket_success(self, test_db, sample_ticket_data):
        """Test successful ticket creation"""
        ticket = Ticket(**sample_ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        assert ticket.id is not None
        assert ticket.ticket_number == "TK-001"
        assert ticket.title == "Test Ticket"
        assert ticket.description == "Test Description"
        assert ticket.status == "open"
        assert ticket.priority == "medium"
        assert ticket.ticket_type == "bug"
        assert ticket.department == "IT"
        assert ticket.module == "Dashboard"
        assert ticket.assigned_to == "user@example.com"
        assert ticket.due_date is not None
        assert ticket.created_at is not None
        assert ticket.updated_at is not None
    
    def test_create_ticket_minimal_required_fields(self, test_db):
        """Test ticket creation with minimal required fields"""
        ticket_data = {
            "ticket_number": "TK-002",
            "title": "Minimal Ticket",
            "description": "Minimal Description",
            "status": "open",
            "priority": "low",
            "ticket_type": "support"
        }
        
        ticket = Ticket(**ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        assert ticket.id is not None
        assert ticket.ticket_number == "TK-002"
        assert ticket.title == "Minimal Ticket"
        assert ticket.description == "Minimal Description"
        assert ticket.department is None
        assert ticket.module is None
        assert ticket.assigned_to is None
        assert ticket.due_date is None
    
    def test_create_ticket_without_required_fields(self, test_db):
        """Test ticket creation without required fields"""
        # Test without title
        ticket_data = {
            "ticket_number": "TK-003",
            "description": "Test Description",
            "status": "open",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = Ticket(**ticket_data)
        test_db.add(ticket)
        
        with pytest.raises(IntegrityError):
            test_db.commit()
        
        test_db.rollback()
    
    def test_create_ticket_without_description(self, test_db):
        """Test ticket creation without description (should fail due to NOT NULL constraint)"""
        ticket_data = {
            "ticket_number": "TK-004",
            "title": "Test Ticket",
            "status": "open",
            "priority": "medium",
            "ticket_type": "bug"
        }
        
        ticket = Ticket(**ticket_data)
        test_db.add(ticket)
        
        with pytest.raises(IntegrityError):
            test_db.commit()
        
        test_db.rollback()
    
    def test_create_ticket_duplicate_ticket_number(self, test_db, sample_ticket_data):
        """Test creating tickets with duplicate ticket numbers"""
        # Create first ticket
        ticket1 = Ticket(**sample_ticket_data)
        test_db.add(ticket1)
        test_db.commit()
        
        # Try to create second ticket with same ticket number
        sample_ticket_data["title"] = "Duplicate Ticket"
        ticket2 = Ticket(**sample_ticket_data)
        test_db.add(ticket2)
        
        with pytest.raises(IntegrityError):
            test_db.commit()
        
        test_db.rollback()
    
    def test_ticket_timestamps(self, test_db, sample_ticket_data):
        """Test that timestamps are set correctly"""
        ticket = Ticket(**sample_ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        assert ticket.created_at is not None
        assert ticket.updated_at is not None
        assert isinstance(ticket.created_at, datetime)
        assert isinstance(ticket.updated_at, datetime)
        
        # Check that created_at and updated_at are close to current time
        now = datetime.utcnow()
        assert abs((now - ticket.created_at).total_seconds()) < 5
        assert abs((now - ticket.updated_at).total_seconds()) < 5
    
    def test_ticket_update_timestamp(self, test_db, sample_ticket_data):
        """Test that updated_at is changed when ticket is updated"""
        ticket = Ticket(**sample_ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        original_updated_at = ticket.updated_at
        
        # Update the ticket
        ticket.title = "Updated Title"
        test_db.commit()
        test_db.refresh(ticket)
        
        assert ticket.updated_at > original_updated_at
    
    def test_ticket_string_representation(self, test_db, sample_ticket_data):
        """Test ticket string representation"""
        ticket = Ticket(**sample_ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        str_repr = str(ticket)
        assert "TK-001" in str_repr
        assert "Test Ticket" in str_repr
    
    def test_ticket_status_enum_values(self, test_db):
        """Test that status field accepts valid enum values"""
        valid_statuses = ['open', 'in_progress', 'resolved', 'closed', 'reopened']
        
        for i, status in enumerate(valid_statuses):
            ticket_data = {
                "ticket_number": f"TK-{i+10:03d}",
                "title": f"Test Ticket {i+1}",
                "description": f"Test Description {i+1}",
                "status": status,
                "priority": "medium",
                "ticket_type": "bug"
            }
            
            ticket = Ticket(**ticket_data)
            test_db.add(ticket)
            test_db.commit()
            test_db.refresh(ticket)
            
            assert ticket.status == status
    
    def test_ticket_priority_enum_values(self, test_db):
        """Test that priority field accepts valid enum values"""
        valid_priorities = ['low', 'medium', 'high', 'urgent']
        
        for i, priority in enumerate(valid_priorities):
            ticket_data = {
                "ticket_number": f"TK-{i+20:03d}",
                "title": f"Test Ticket {i+1}",
                "description": f"Test Description {i+1}",
                "status": "open",
                "priority": priority,
                "ticket_type": "bug"
            }
            
            ticket = Ticket(**ticket_data)
            test_db.add(ticket)
            test_db.commit()
            test_db.refresh(ticket)
            
            assert ticket.priority == priority
    
    def test_ticket_type_enum_values(self, test_db):
        """Test that ticket_type field accepts valid enum values"""
        valid_types = ['bug', 'feature_request', 'support', 'improvement', 'question']
        
        for i, ticket_type in enumerate(valid_types):
            ticket_data = {
                "ticket_number": f"TK-{i+30:03d}",
                "title": f"Test Ticket {i+1}",
                "description": f"Test Description {i+1}",
                "status": "open",
                "priority": "medium",
                "ticket_type": ticket_type
            }
            
            ticket = Ticket(**ticket_data)
            test_db.add(ticket)
            test_db.commit()
            test_db.refresh(ticket)
            
            assert ticket.ticket_type == ticket_type
    
    def test_ticket_query_by_status(self, test_db):
        """Test querying tickets by status"""
        # Create tickets with different statuses
        ticket1 = Ticket(
            ticket_number="TK-101",
            title="Open Ticket",
            description="Open Description",
            status="open",
            priority="medium",
            ticket_type="bug"
        )
        
        ticket2 = Ticket(
            ticket_number="TK-102",
            title="In Progress Ticket",
            description="In Progress Description",
            status="in_progress",
            priority="high",
            ticket_type="feature_request"
        )
        
        test_db.add(ticket1)
        test_db.add(ticket2)
        test_db.commit()
        
        # Query for open tickets
        open_tickets = test_db.query(Ticket).filter(Ticket.status == "open").all()
        assert len(open_tickets) == 1
        assert open_tickets[0].title == "Open Ticket"
        
        # Query for in_progress tickets
        in_progress_tickets = test_db.query(Ticket).filter(Ticket.status == "in_progress").all()
        assert len(in_progress_tickets) == 1
        assert in_progress_tickets[0].title == "In Progress Ticket"
    
    def test_ticket_query_by_priority(self, test_db):
        """Test querying tickets by priority"""
        # Create tickets with different priorities
        ticket1 = Ticket(
            ticket_number="TK-201",
            title="Low Priority Ticket",
            description="Low Priority Description",
            status="open",
            priority="low",
            ticket_type="bug"
        )
        
        ticket2 = Ticket(
            ticket_number="TK-202",
            title="Urgent Priority Ticket",
            description="Urgent Priority Description",
            status="open",
            priority="urgent",
            ticket_type="bug"
        )
        
        test_db.add(ticket1)
        test_db.add(ticket2)
        test_db.commit()
        
        # Query for urgent tickets
        urgent_tickets = test_db.query(Ticket).filter(Ticket.priority == "urgent").all()
        assert len(urgent_tickets) == 1
        assert urgent_tickets[0].title == "Urgent Priority Ticket"
    
    def test_ticket_query_by_assigned_to(self, test_db):
        """Test querying tickets by assigned_to"""
        ticket1 = Ticket(
            ticket_number="TK-301",
            title="Assigned Ticket 1",
            description="Assigned Description 1",
            status="open",
            priority="medium",
            ticket_type="bug",
            assigned_to="user1@example.com"
        )
        
        ticket2 = Ticket(
            ticket_number="TK-302",
            title="Assigned Ticket 2",
            description="Assigned Description 2",
            status="open",
            priority="medium",
            ticket_type="bug",
            assigned_to="user2@example.com"
        )
        
        test_db.add(ticket1)
        test_db.add(ticket2)
        test_db.commit()
        
        # Query for tickets assigned to user1
        user1_tickets = test_db.query(Ticket).filter(Ticket.assigned_to == "user1@example.com").all()
        assert len(user1_tickets) == 1
        assert user1_tickets[0].title == "Assigned Ticket 1"
    
    def test_ticket_delete(self, test_db, sample_ticket_data):
        """Test ticket deletion"""
        ticket = Ticket(**sample_ticket_data)
        test_db.add(ticket)
        test_db.commit()
        test_db.refresh(ticket)
        
        ticket_id = ticket.id
        
        # Delete the ticket
        test_db.delete(ticket)
        test_db.commit()
        
        # Verify ticket is deleted
        deleted_ticket = test_db.query(Ticket).filter(Ticket.id == ticket_id).first()
        assert deleted_ticket is None
    
    def test_ticket_bulk_operations(self, test_db):
        """Test bulk operations on tickets"""
        # Create multiple tickets
        tickets = []
        for i in range(5):
            ticket = Ticket(
                ticket_number=f"TK-{i+400:03d}",
                title=f"Bulk Ticket {i+1}",
                description=f"Bulk Description {i+1}",
                status="open",
                priority="medium",
                ticket_type="bug"
            )
            tickets.append(ticket)
        
        test_db.add_all(tickets)
        test_db.commit()
        
        # Query all tickets
        all_tickets = test_db.query(Ticket).filter(Ticket.ticket_number.like("TK-4%")).all()
        assert len(all_tickets) == 5
        
        # Bulk update
        test_db.query(Ticket).filter(Ticket.ticket_number.like("TK-4%")).update({"status": "resolved"})
        test_db.commit()
        
        # Verify bulk update
        resolved_tickets = test_db.query(Ticket).filter(Ticket.status == "resolved").all()
        assert len(resolved_tickets) >= 5

if __name__ == "__main__":
    pytest.main([__file__])
