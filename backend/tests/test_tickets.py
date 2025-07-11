import pytest
from unittest.mock import Mock, patch
from sqlalchemy.orm import Session
from fastapi.testclient import TestClient
from fastapi import HTTPException

from app.models.tickets import Ticket
from app.schemas.tickets import TicketCreate, TicketUpdate, TicketResponse
from app.api.endpoints.tickets import get_tickets, get_ticket, create_ticket, update_ticket, delete_ticket
from app.main import app

# Create test client
client = TestClient(app)

@pytest.fixture
def mock_db():
    """Mock database session"""
    return Mock(spec=Session)

@pytest.fixture
def sample_ticket():
    """Sample ticket for testing"""
    return Ticket(
        id='1',
        ticket_number='TK-001',
        title='Test Ticket',
        description='Test Description',
        status='open',
        priority='medium',
        ticket_type='bug',
        department='IT',
        module='Dashboard',
        assigned_to='user@example.com',
        due_date=None,
        created_at='2025-07-01T10:00:00Z',
        updated_at='2025-07-01T10:00:00Z'
    )

@pytest.fixture
def sample_ticket_create():
    """Sample ticket creation data"""
    return TicketCreate(
        title='New Ticket',
        description='New Description',
        priority='high',
        ticket_type='bug',
        department='IT',
        module='Dashboard',
        assigned_to='user@example.com',
        due_date=None
    )

@pytest.fixture
def sample_ticket_update():
    """Sample ticket update data"""
    return TicketUpdate(
        title='Updated Ticket',
        description='Updated Description',
        status='in_progress',
        priority='high'
    )

class TestTicketEndpoints:
    """Test cases for ticket endpoints"""
    
    def test_get_tickets_success(self, mock_db, sample_ticket):
        """Test successful retrieval of tickets"""
        mock_db.query.return_value.all.return_value = [sample_ticket]
        
        result = get_tickets(db=mock_db)
        
        assert len(result) == 1
        assert result[0].title == 'Test Ticket'
        mock_db.query.assert_called_once()
    
    def test_get_tickets_empty(self, mock_db):
        """Test retrieval of tickets when none exist"""
        mock_db.query.return_value.all.return_value = []
        
        result = get_tickets(db=mock_db)
        
        assert result == []
        mock_db.query.assert_called_once()
    
    def test_get_ticket_success(self, mock_db, sample_ticket):
        """Test successful retrieval of a single ticket"""
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        result = get_ticket(ticket_id='1', db=mock_db)
        
        assert result.title == 'Test Ticket'
        assert result.id == '1'
        mock_db.query.assert_called_once()
    
    def test_get_ticket_not_found(self, mock_db):
        """Test retrieval of non-existent ticket"""
        mock_db.query.return_value.filter.return_value.first.return_value = None
        
        with pytest.raises(HTTPException) as exc_info:
            get_ticket(ticket_id='999', db=mock_db)
        
        assert exc_info.value.status_code == 404
        assert "Ticket not found" in str(exc_info.value.detail)
    
    def test_create_ticket_success(self, mock_db, sample_ticket_create):
        """Test successful ticket creation"""
        mock_ticket = Mock()
        mock_ticket.id = '1'
        mock_ticket.ticket_number = 'TK-001'
        mock_ticket.title = sample_ticket_create.title
        mock_ticket.description = sample_ticket_create.description
        mock_ticket.priority = sample_ticket_create.priority
        mock_ticket.ticket_type = sample_ticket_create.ticket_type
        mock_ticket.department = sample_ticket_create.department
        mock_ticket.module = sample_ticket_create.module
        mock_ticket.assigned_to = sample_ticket_create.assigned_to
        mock_ticket.due_date = sample_ticket_create.due_date
        mock_ticket.status = 'open'
        
        with patch('app.api.endpoints.tickets.Ticket') as mock_ticket_class:
            mock_ticket_class.return_value = mock_ticket
            
            result = create_ticket(ticket=sample_ticket_create, db=mock_db)
            
            assert result.title == 'New Ticket'
            mock_db.add.assert_called_once()
            mock_db.commit.assert_called_once()
            mock_db.refresh.assert_called_once()
    
    def test_create_ticket_database_error(self, mock_db, sample_ticket_create):
        """Test ticket creation with database error"""
        mock_db.commit.side_effect = Exception("Database error")
        
        with patch('app.api.endpoints.tickets.Ticket'):
            with pytest.raises(Exception):
                create_ticket(ticket=sample_ticket_create, db=mock_db)
    
    def test_update_ticket_success(self, mock_db, sample_ticket, sample_ticket_update):
        """Test successful ticket update"""
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        result = update_ticket(ticket_id='1', ticket=sample_ticket_update, db=mock_db)
        
        assert result.title == 'Updated Ticket'
        assert result.description == 'Updated Description'
        assert result.status == 'in_progress'
        mock_db.commit.assert_called_once()
    
    def test_update_ticket_not_found(self, mock_db, sample_ticket_update):
        """Test update of non-existent ticket"""
        mock_db.query.return_value.filter.return_value.first.return_value = None
        
        with pytest.raises(HTTPException) as exc_info:
            update_ticket(ticket_id='999', ticket=sample_ticket_update, db=mock_db)
        
        assert exc_info.value.status_code == 404
        assert "Ticket not found" in str(exc_info.value.detail)
    
    def test_update_ticket_partial_update(self, mock_db, sample_ticket):
        """Test partial ticket update"""
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        partial_update = TicketUpdate(title='Partially Updated')
        result = update_ticket(ticket_id='1', ticket=partial_update, db=mock_db)
        
        assert result.title == 'Partially Updated'
        # Other fields should remain unchanged
        assert result.description == 'Test Description'
        mock_db.commit.assert_called_once()
    
    def test_delete_ticket_success(self, mock_db, sample_ticket):
        """Test successful ticket deletion"""
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        result = delete_ticket(ticket_id='1', db=mock_db)
        
        assert result == {"message": "Ticket deleted successfully"}
        mock_db.delete.assert_called_once_with(sample_ticket)
        mock_db.commit.assert_called_once()
    
    def test_delete_ticket_not_found(self, mock_db):
        """Test deletion of non-existent ticket"""
        mock_db.query.return_value.filter.return_value.first.return_value = None
        
        with pytest.raises(HTTPException) as exc_info:
            delete_ticket(ticket_id='999', db=mock_db)
        
        assert exc_info.value.status_code == 404
        assert "Ticket not found" in str(exc_info.value.detail)

class TestTicketEndpointsIntegration:
    """Integration tests for ticket endpoints"""
    
    @patch('app.api.endpoints.tickets.get_db')
    def test_get_tickets_api_endpoint(self, mock_get_db, mock_db, sample_ticket):
        """Test GET /tickets endpoint"""
        mock_get_db.return_value = mock_db
        mock_db.query.return_value.all.return_value = [sample_ticket]
        
        response = client.get("/api/v1/tickets")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]['title'] == 'Test Ticket'
    
    @patch('app.api.endpoints.tickets.get_db')
    def test_get_ticket_api_endpoint(self, mock_get_db, mock_db, sample_ticket):
        """Test GET /tickets/{ticket_id} endpoint"""
        mock_get_db.return_value = mock_db
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        response = client.get("/api/v1/tickets/1")
        
        assert response.status_code == 200
        data = response.json()
        assert data['title'] == 'Test Ticket'
    
    @patch('app.api.endpoints.tickets.get_db')
    def test_create_ticket_api_endpoint(self, mock_get_db, mock_db):
        """Test POST /tickets endpoint"""
        mock_get_db.return_value = mock_db
        
        ticket_data = {
            "title": "New Ticket",
            "description": "New Description",
            "priority": "high",
            "ticket_type": "bug",
            "department": "IT",
            "module": "Dashboard",
            "assigned_to": "user@example.com"
        }
        
        with patch('app.api.endpoints.tickets.Ticket') as mock_ticket_class:
            mock_ticket = Mock()
            mock_ticket.id = '1'
            mock_ticket.ticket_number = 'TK-001'
            mock_ticket.title = ticket_data['title']
            mock_ticket.description = ticket_data['description']
            mock_ticket.priority = ticket_data['priority']
            mock_ticket.ticket_type = ticket_data['ticket_type']
            mock_ticket.department = ticket_data['department']
            mock_ticket.module = ticket_data['module']
            mock_ticket.assigned_to = ticket_data['assigned_to']
            mock_ticket.due_date = None
            mock_ticket.status = 'open'
            mock_ticket_class.return_value = mock_ticket
            
            response = client.post("/api/v1/tickets", json=ticket_data)
            
            assert response.status_code == 200
            data = response.json()
            assert data['title'] == 'New Ticket'
    
    @patch('app.api.endpoints.tickets.get_db')
    def test_update_ticket_api_endpoint(self, mock_get_db, mock_db, sample_ticket):
        """Test PUT /tickets/{ticket_id} endpoint"""
        mock_get_db.return_value = mock_db
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        update_data = {
            "title": "Updated Ticket",
            "status": "in_progress"
        }
        
        response = client.put("/api/v1/tickets/1", json=update_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data['title'] == 'Updated Ticket'
    
    @patch('app.api.endpoints.tickets.get_db')
    def test_delete_ticket_api_endpoint(self, mock_get_db, mock_db, sample_ticket):
        """Test DELETE /tickets/{ticket_id} endpoint"""
        mock_get_db.return_value = mock_db
        mock_db.query.return_value.filter.return_value.first.return_value = sample_ticket
        
        response = client.delete("/api/v1/tickets/1")
        
        assert response.status_code == 200
        data = response.json()
        assert data['message'] == 'Ticket deleted successfully'

class TestTicketValidation:
    """Test ticket validation logic"""
    
    def test_ticket_create_validation(self):
        """Test ticket creation validation"""
        # Valid ticket
        valid_ticket = TicketCreate(
            title='Valid Ticket',
            description='Valid Description',
            priority='medium',
            ticket_type='bug'
        )
        assert valid_ticket.title == 'Valid Ticket'
        
        # Test title length validation
        with pytest.raises(ValueError):
            TicketCreate(
                title='',  # Empty title should fail
                description='Valid Description',
                priority='medium',
                ticket_type='bug'
            )
    
    def test_ticket_update_validation(self):
        """Test ticket update validation"""
        # Valid partial update
        valid_update = TicketUpdate(title='Updated Title')
        assert valid_update.title == 'Updated Title'
        
        # All fields None should be valid (no update)
        empty_update = TicketUpdate()
        assert empty_update.title is None
    
    def test_ticket_status_validation(self):
        """Test ticket status validation"""
        valid_statuses = ['open', 'in_progress', 'resolved', 'closed', 'reopened']
        
        for status in valid_statuses:
            update = TicketUpdate(status=status)
            assert update.status == status
    
    def test_ticket_priority_validation(self):
        """Test ticket priority validation"""
        valid_priorities = ['low', 'medium', 'high', 'urgent']
        
        for priority in valid_priorities:
            ticket = TicketCreate(
                title='Test',
                description='Test',
                priority=priority,
                ticket_type='bug'
            )
            assert ticket.priority == priority
    
    def test_ticket_type_validation(self):
        """Test ticket type validation"""
        valid_types = ['bug', 'feature_request', 'support', 'improvement', 'question']
        
        for ticket_type in valid_types:
            ticket = TicketCreate(
                title='Test',
                description='Test',
                priority='medium',
                ticket_type=ticket_type
            )
            assert ticket.ticket_type == ticket_type

if __name__ == "__main__":
    pytest.main([__file__])
