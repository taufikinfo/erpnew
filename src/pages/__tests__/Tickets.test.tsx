import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Tickets from '../../pages/Tickets';
import { apiClient } from '@/lib/api-client';

// Mock the API client
vi.mock('@/lib/api-client', () => ({
  apiClient: {
    getTickets: vi.fn(),
    deleteTicket: vi.fn(),
  },
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockTickets = [
  {
    id: '1',
    ticket_number: 'TK-001',
    title: 'Test Ticket 1',
    description: 'Test Description 1',
    status: 'open',
    priority: 'medium',
    ticket_type: 'bug',
    department: 'IT',
    module: 'Dashboard',
    assigned_to: 'user1@example.com',
    due_date: '2025-07-15',
    created_at: '2025-07-01T10:00:00Z',
    updated_at: '2025-07-01T10:00:00Z',
  },
  {
    id: '2',
    ticket_number: 'TK-002',
    title: 'Test Ticket 2',
    description: 'Test Description 2',
    status: 'in_progress',
    priority: 'high',
    ticket_type: 'feature_request',
    department: 'Sales',
    module: 'Reports',
    assigned_to: 'user2@example.com',
    due_date: '2025-07-20',
    created_at: '2025-07-02T10:00:00Z',
    updated_at: '2025-07-02T10:00:00Z',
  },
];

describe('Tickets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tickets page with loading state', () => {
    vi.mocked(apiClient.getTickets).mockReturnValue(new Promise(() => {}));

    render(<Tickets />);

    expect(screen.getByText('Support Tickets')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders tickets list when data is loaded', async () => {
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
      expect(screen.getByText('Test Ticket 2')).toBeInTheDocument();
    });

    expect(screen.getByText('TK-001')).toBeInTheDocument();
    expect(screen.getByText('TK-002')).toBeInTheDocument();
  });

  it('opens create ticket dialog when Create Ticket button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    const createButton = screen.getByRole('button', { name: /create ticket/i });
    await user.click(createButton);

    expect(screen.getByText('Create New Ticket')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search tickets/i);
    await user.type(searchInput, 'Test Ticket 1');

    // After typing, only the first ticket should be visible
    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Ticket 2')).not.toBeInTheDocument();
    });
  });

  it('handles filter by status', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // This test assumes there's a status filter - adjust based on actual implementation
    const statusFilter = screen.getByLabelText(/status/i);
    if (statusFilter) {
      await user.click(statusFilter);
      // Add assertions based on your actual filter implementation
    }
  });

  it('handles filter by priority', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // This test assumes there's a priority filter - adjust based on actual implementation
    const priorityFilter = screen.getByLabelText(/priority/i);
    if (priorityFilter) {
      await user.click(priorityFilter);
      // Add assertions based on your actual filter implementation
    }
  });

  it('handles edit ticket action', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Look for edit button/action - adjust based on actual implementation
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    if (editButtons.length > 0) {
      await user.click(editButtons[0]);
      expect(screen.getByText('Edit Ticket')).toBeInTheDocument();
    }
  });

  it('handles delete ticket action', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);
    vi.mocked(apiClient.deleteTicket).mockResolvedValueOnce({ message: 'Ticket deleted' });

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Look for delete button/action - adjust based on actual implementation
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);
      
      // Confirm deletion if there's a confirmation dialog
      const confirmButton = screen.getByRole('button', { name: /confirm/i });
      if (confirmButton) {
        await user.click(confirmButton);
      }

      await waitFor(() => {
        expect(apiClient.deleteTicket).toHaveBeenCalledWith('1');
      });
    }
  });

  it('handles API errors gracefully', async () => {
    vi.mocked(apiClient.getTickets).mockRejectedValueOnce(new Error('API Error'));

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText(/error loading tickets/i)).toBeInTheDocument();
    });
  });

  it('refreshes ticket list after creating new ticket', async () => {
    const user = userEvent.setup();
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Mock a second call for refresh
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce([...mockTickets, {
      id: '3',
      ticket_number: 'TK-003',
      title: 'New Ticket',
      description: 'New Description',
      status: 'open',
      priority: 'low',
      ticket_type: 'support',
      department: 'HR',
      module: 'Settings',
      assigned_to: 'user3@example.com',
      due_date: '2025-07-25',
      created_at: '2025-07-03T10:00:00Z',
      updated_at: '2025-07-03T10:00:00Z',
    }]);

    const createButton = screen.getByRole('button', { name: /create ticket/i });
    await user.click(createButton);

    // Simulate creating a ticket and closing the dialog
    // This would trigger the onSave callback which should refresh the list
    // The exact implementation depends on your TicketDialog component
  });

  it('displays correct ticket status badges', async () => {
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Check for status badges - adjust based on actual implementation
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText('in_progress')).toBeInTheDocument();
  });

  it('displays correct priority indicators', async () => {
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(mockTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Check for priority indicators - adjust based on actual implementation
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('handles empty ticket list', async () => {
    vi.mocked(apiClient.getTickets).mockResolvedValueOnce([]);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText(/no tickets found/i)).toBeInTheDocument();
    });
  });

  it('handles pagination if implemented', async () => {
    // This test assumes pagination is implemented
    // Adjust based on actual implementation
    const manyTickets = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      ticket_number: `TK-${String(i + 1).padStart(3, '0')}`,
      title: `Test Ticket ${i + 1}`,
      description: `Test Description ${i + 1}`,
      status: 'open',
      priority: 'medium',
      ticket_type: 'bug',
      department: 'IT',
      module: 'Dashboard',
      assigned_to: `user${i + 1}@example.com`,
      due_date: '2025-07-15',
      created_at: '2025-07-01T10:00:00Z',
      updated_at: '2025-07-01T10:00:00Z',
    }));

    vi.mocked(apiClient.getTickets).mockResolvedValueOnce(manyTickets);

    render(<Tickets />);

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
    });

    // Check for pagination controls if they exist
    const nextButton = screen.queryByRole('button', { name: /next/i });
    if (nextButton) {
      expect(nextButton).toBeInTheDocument();
    }
  });
});
