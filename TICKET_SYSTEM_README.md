# Ticket System

A comprehensive ticket management system integrated into the ERP application for handling support requests, bug reports, feature requests, and other organizational workflows.

## Features

### Core Functionality
- **Ticket Creation**: Create tickets with title, description, priority, type, and assignment
- **Ticket Management**: Update status, priority, assignment, and other fields
- **Ticket Types**: Bug, Feature Request, Support, Improvement, Question
- **Priority Levels**: Low, Medium, High, Urgent
- **Status Tracking**: Open, In Progress, Resolved, Closed, Reopened
- **Department & Module Assignment**: Organize tickets by department and system module
- **Due Date Management**: Set and track due dates for tickets
- **Comment System**: Add comments to tickets (public and internal)
- **Change History**: Track all changes made to tickets
- **File Attachments**: Attach files to tickets (planned feature)

### User Interface
- **Dashboard**: Overview of ticket statistics and metrics
- **Advanced Filtering**: Filter by status, priority, type, department, assignee
- **Search**: Full-text search across ticket titles and descriptions
- **Sorting**: Sort tickets by various fields (created date, priority, etc.)
- **Responsive Design**: Mobile-friendly interface

### API Endpoints
- `POST /api/v1/tickets` - Create new ticket
- `GET /api/v1/tickets` - List tickets with filtering and pagination
- `GET /api/v1/tickets/{id}` - Get ticket details
- `PUT /api/v1/tickets/{id}` - Update ticket
- `DELETE /api/v1/tickets/{id}` - Delete ticket
- `POST /api/v1/tickets/{id}/comments` - Add comment
- `GET /api/v1/tickets/{id}/comments` - Get comments
- `GET /api/v1/tickets/stats/summary` - Get ticket statistics

## Database Schema

### Tickets Table
```sql
CREATE TABLE tickets (
    id CHAR(36) PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'resolved', 'closed', 'reopened') NOT NULL DEFAULT 'open',
    priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    ticket_type VARCHAR(50) NOT NULL DEFAULT 'support',
    department VARCHAR(100),
    module VARCHAR(100),
    due_date DATETIME,
    resolved_at DATETIME,
    created_by CHAR(36) NOT NULL,
    assigned_to CHAR(36),
    group_id CHAR(36),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES profiles(id),
    FOREIGN KEY (assigned_to) REFERENCES profiles(id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
);
```

### Ticket Comments Table
```sql
CREATE TABLE ticket_comments (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    comment TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES profiles(id)
);
```

### Ticket Attachments Table
```sql
CREATE TABLE ticket_attachments (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES profiles(id)
);
```

### Ticket History Table
```sql
CREATE TABLE ticket_history (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    changed_by CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES profiles(id)
);
```

## Frontend Components

### Pages
- **`/src/pages/Tickets.tsx`** - Main tickets page with listing and filtering
- **`/src/components/tickets/TicketDialog.tsx`** - Create/edit ticket dialog
- **`/src/components/tickets/DeleteConfirmDialog.tsx`** - Delete confirmation dialog

### Hooks
- **`/src/hooks/useTickets.ts`** - Custom hook for ticket API operations

### Routes
- **`/tickets`** - Main tickets page (protected route)

## Backend Implementation

### Models
- **`/backend/app/models/__init__.py`** - SQLAlchemy models for tickets
- **`/backend/app/schemas/tickets.py`** - Pydantic schemas for API validation
- **`/backend/app/api/endpoints/tickets.py`** - FastAPI endpoints for ticket operations

### Key Features
- **Automatic Ticket Numbers**: Generate unique ticket numbers (TK-YYYYMMDD-XXXXXXXX)
- **Change Tracking**: Log all field changes to ticket history
- **Flexible Filtering**: Support for multiple filter combinations
- **Pagination**: Efficient handling of large ticket datasets
- **Validation**: Comprehensive input validation using Pydantic

## Usage Examples

### Creating a Ticket
```typescript
const ticketData = {
  title: "Login page not loading",
  description: "Users are unable to access the login page. Getting 404 error.",
  priority: "high",
  type: "bug",
  department: "IT",
  module: "Authentication",
  assigned_to: "user@example.com",
  due_date: "2024-12-31"
};

const newTicket = await createTicket(ticketData);
```

### Updating Ticket Status
```typescript
const updateData = {
  status: "in_progress",
  assigned_to: "developer@example.com"
};

const updatedTicket = await updateTicket(ticketId, updateData);
```

### Adding Comments
```typescript
const comment = await addComment(ticketId, "Working on this issue now", false);
```

### Filtering Tickets
```typescript
const filters = {
  status: "open",
  priority: "high",
  search: "login",
  sort_by: "created_at",
  sort_order: "desc"
};

await fetchTickets(filters);
```

## Statistics and Reporting

The system provides comprehensive statistics:
- Total tickets count
- Open tickets count
- In-progress tickets count
- Resolved tickets count
- Closed tickets count
- Urgent tickets count
- High-priority tickets count
- Overdue tickets count

## Future Enhancements

### Planned Features
1. **File Attachments**: Support for uploading and managing file attachments
2. **Email Notifications**: Automatic email notifications for ticket updates
3. **Advanced Reporting**: Detailed analytics and reporting dashboard
4. **SLA Management**: Service Level Agreement tracking and alerts
5. **Integration**: Integration with external systems (email, Slack, etc.)
6. **Bulk Operations**: Bulk update and assignment of tickets
7. **Templates**: Pre-defined ticket templates for common issues
8. **Knowledge Base**: Integration with knowledge base for self-service

### Technical Improvements
1. **Real-time Updates**: WebSocket support for real-time ticket updates
2. **Advanced Search**: Full-text search with Elasticsearch integration
3. **Performance Optimization**: Database indexing and query optimization
4. **API Rate Limiting**: Implement rate limiting for API endpoints
5. **Caching**: Redis caching for frequently accessed data

## Installation and Setup

1. **Database Migration**: Run database migrations to create ticket tables
2. **API Registration**: The ticket endpoints are automatically registered in the API router
3. **Frontend Navigation**: The tickets page is added to the main navigation
4. **Permissions**: Configure user permissions for ticket management

## Contributing

When contributing to the ticket system:
1. Follow the existing code patterns and naming conventions
2. Add appropriate error handling and validation
3. Include comprehensive tests for new features
4. Update documentation for any API changes
5. Ensure responsive design for mobile compatibility

The ticket system is designed to be extensible and can be customized for specific organizational needs.
