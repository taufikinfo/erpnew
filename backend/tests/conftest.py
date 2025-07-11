import pytest
import os
import sys
from unittest.mock import Mock
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.main import app
from app.core.database import Base, get_db

# Test database URL
TEST_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture(scope="session")
def test_engine():
    """Create test database engine"""
    engine = create_engine(TEST_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    return engine

@pytest.fixture(scope="function")
def test_db(test_engine):
    """Create a test database session"""
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    session = SessionLocal()
    
    yield session
    
    session.close()

@pytest.fixture(scope="function")
def client(test_db):
    """Create a test client with database override"""
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()

@pytest.fixture
def mock_db():
    """Create a mock database session"""
    return Mock()

@pytest.fixture
def sample_ticket_dict():
    """Sample ticket data as dictionary"""
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
        "due_date": "2025-07-15T10:00:00Z"
    }

@pytest.fixture
def sample_ticket_create_dict():
    """Sample ticket creation data"""
    return {
        "title": "New Ticket",
        "description": "New Description",
        "priority": "high",
        "ticket_type": "bug",
        "department": "IT",
        "module": "Dashboard",
        "assigned_to": "user@example.com",
        "due_date": "2025-07-15T10:00:00Z"
    }

@pytest.fixture
def sample_ticket_update_dict():
    """Sample ticket update data"""
    return {
        "title": "Updated Ticket",
        "description": "Updated Description",
        "status": "in_progress",
        "priority": "high"
    }

@pytest.fixture(autouse=True)
def setup_test_environment():
    """Set up test environment variables"""
    os.environ["ENVIRONMENT"] = "testing"
    os.environ["DATABASE_URL"] = TEST_DATABASE_URL
    yield
    # Cleanup if needed
