-- Ticket System Database Migration Script
-- This script creates the necessary tables for the ticket system

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
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
    INDEX idx_tickets_status (status),
    INDEX idx_tickets_priority (priority),
    INDEX idx_tickets_created_by (created_by),
    INDEX idx_tickets_assigned_to (assigned_to),
    INDEX idx_tickets_created_at (created_at),
    INDEX idx_tickets_ticket_number (ticket_number),
    FOREIGN KEY (created_by) REFERENCES profiles(id),
    FOREIGN KEY (assigned_to) REFERENCES profiles(id)
);

-- Create ticket_comments table
CREATE TABLE IF NOT EXISTS ticket_comments (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    comment TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ticket_comments_ticket_id (ticket_id),
    INDEX idx_ticket_comments_user_id (user_id),
    INDEX idx_ticket_comments_created_at (created_at),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- Create ticket_attachments table
CREATE TABLE IF NOT EXISTS ticket_attachments (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ticket_attachments_ticket_id (ticket_id),
    INDEX idx_ticket_attachments_uploaded_by (uploaded_by),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES profiles(id)
);

-- Create ticket_history table
CREATE TABLE IF NOT EXISTS ticket_history (
    id CHAR(36) PRIMARY KEY,
    ticket_id CHAR(36) NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    changed_by CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ticket_history_ticket_id (ticket_id),
    INDEX idx_ticket_history_changed_by (changed_by),
    INDEX idx_ticket_history_created_at (created_at),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES profiles(id)
);

-- Insert sample data for testing (optional)
-- Note: Replace with actual user IDs from your profiles table
INSERT INTO tickets (
    id, 
    ticket_number, 
    title, 
    description, 
    status, 
    priority, 
    ticket_type, 
    department, 
    module, 
    created_by,
    assigned_to,
    due_date
) VALUES 
(
    UUID(),
    'TK-20240101-SAMPLE01',
    'Login Page Not Loading',
    'Users are unable to access the login page. Getting 404 error when navigating to /login.',
    'open',
    'high',
    'bug',
    'IT',
    'Authentication',
    'system', -- Replace with actual user ID
    'system', -- Replace with actual user ID
    DATE_ADD(NOW(), INTERVAL 3 DAY)
),
(
    UUID(),
    'TK-20240101-SAMPLE02',
    'Add Dark Mode Feature',
    'Users have requested a dark mode toggle for better accessibility and user experience.',
    'open',
    'medium',
    'feature_request',
    'IT',
    'UI/UX',
    'system', -- Replace with actual user ID
    NULL,
    DATE_ADD(NOW(), INTERVAL 14 DAY)
),
(
    UUID(),
    'TK-20240101-SAMPLE03',
    'Database Connection Timeout',
    'Intermittent database connection timeouts affecting the finance module.',
    'in_progress',
    'urgent',
    'bug',
    'IT',
    'Database',
    'system', -- Replace with actual user ID
    'system', -- Replace with actual user ID
    DATE_ADD(NOW(), INTERVAL 1 DAY)
);

-- Add comments for sample tickets
INSERT INTO ticket_comments (
    id,
    ticket_id,
    user_id,
    comment,
    is_internal
) VALUES 
(
    UUID(),
    (SELECT id FROM tickets WHERE ticket_number = 'TK-20240101-SAMPLE01'),
    'system', -- Replace with actual user ID
    'Investigating the issue. Checking server logs for errors.',
    FALSE
),
(
    UUID(),
    (SELECT id FROM tickets WHERE ticket_number = 'TK-20240101-SAMPLE03'),
    'system', -- Replace with actual user ID
    'Database connection pool configuration needs to be reviewed.',
    TRUE
);

-- Create views for common ticket queries (optional)
CREATE OR REPLACE VIEW ticket_summary AS
SELECT 
    t.id,
    t.ticket_number,
    t.title,
    t.status,
    t.priority,
    t.ticket_type,
    t.department,
    t.module,
    t.created_by,
    t.assigned_to,
    t.due_date,
    t.created_at,
    t.updated_at,
    CASE 
        WHEN t.due_date IS NOT NULL AND t.due_date < NOW() AND t.status NOT IN ('resolved', 'closed') 
        THEN 'overdue'
        ELSE 'on_time'
    END as due_status,
    (SELECT COUNT(*) FROM ticket_comments tc WHERE tc.ticket_id = t.id) as comment_count,
    (SELECT COUNT(*) FROM ticket_attachments ta WHERE ta.ticket_id = t.id) as attachment_count
FROM tickets t;

-- Create indexes for better performance
CREATE INDEX idx_tickets_compound_status_priority ON tickets(status, priority);
CREATE INDEX idx_tickets_compound_department_module ON tickets(department, module);
CREATE INDEX idx_tickets_due_date_status ON tickets(due_date, status);

-- Display table creation summary
SELECT 
    'Ticket System Tables Created Successfully' as message,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'tickets') as tickets_table,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'ticket_comments') as comments_table,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'ticket_attachments') as attachments_table,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'ticket_history') as history_table;
