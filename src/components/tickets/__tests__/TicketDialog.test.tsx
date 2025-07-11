import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TicketDialog } from '../TicketDialog';
import { apiClient } from '@/lib/api-client';

// Mock the API client
vi.mock('@/lib/api-client', () => ({
  apiClient: {
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
  },
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockTicket = {
  id: '1',
  ticket_number: 'TK-001',
  title: 'Test Ticket',
  description: 'Test Description',
  status: 'open' as const,
  priority: 'medium' as const,
  ticket_type: 'bug' as const,
  department: 'IT',
  module: 'Dashboard',
  assigned_to: 'user@example.com',
  due_date: '2025-07-15',
};

describe('TicketDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Create Mode', () => {
    it('renders create ticket dialog correctly', () => {
      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      expect(screen.getByText('Create New Ticket')).toBeInTheDocument();
      expect(screen.getByText('Fill out the form below to create a new support ticket.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    it('has all required fields', () => {
      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      expect(screen.getByLabelText('Title *')).toBeInTheDocument();
      expect(screen.getByLabelText('Description *')).toBeInTheDocument();
      expect(screen.getByLabelText('Priority')).toBeInTheDocument();
      expect(screen.getByLabelText('Type')).toBeInTheDocument();
    });

    it('creates a new ticket with valid data', async () => {
      const user = userEvent.setup();
      vi.mocked(apiClient.createTicket).mockResolvedValueOnce({});

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      await user.type(screen.getByLabelText('Title *'), 'New Bug Report');
      await user.type(screen.getByLabelText('Description *'), 'Found a critical bug');
      
      await user.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() => {
        expect(apiClient.createTicket).toHaveBeenCalledWith({
          title: 'New Bug Report',
          description: 'Found a critical bug',
          priority: 'medium',
          ticket_type: 'support',
          department: null,
          module: null,
          assigned_to: null,
          due_date: null,
          status: 'open',
        });
      });

      expect(mockOnSave).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('validates required fields', async () => {
      const user = userEvent.setup();

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Create' }));

      // Form should not submit without required fields
      expect(apiClient.createTicket).not.toHaveBeenCalled();
    });
  });

  describe('Edit Mode', () => {
    it('renders edit ticket dialog correctly', () => {
      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={mockTicket}
        />
      );

      expect(screen.getByText('Edit Ticket')).toBeInTheDocument();
      expect(screen.getByText('Update the ticket details below.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    });

    it('populates form with ticket data', () => {
      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={mockTicket}
        />
      );

      expect(screen.getByDisplayValue('Test Ticket')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument();
    });

    it('shows status field in edit mode', () => {
      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={mockTicket}
        />
      );

      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    it('updates existing ticket', async () => {
      const user = userEvent.setup();
      vi.mocked(apiClient.updateTicket).mockResolvedValueOnce({});

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={mockTicket}
        />
      );

      await user.clear(screen.getByLabelText('Title *'));
      await user.type(screen.getByLabelText('Title *'), 'Updated Title');
      
      await user.click(screen.getByRole('button', { name: 'Update' }));

      await waitFor(() => {
        expect(apiClient.updateTicket).toHaveBeenCalledWith('1', expect.objectContaining({
          title: 'Updated Title',
        }));
      });

      expect(mockOnSave).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Form Interactions', () => {
    it('handles department selection', async () => {
      const user = userEvent.setup();

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      // Note: Testing select components might require additional setup for Radix UI
      // This is a simplified test structure
      expect(screen.getByLabelText('Department')).toBeInTheDocument();
    });

    it('handles date selection', async () => {
      const user = userEvent.setup();

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      const dateInput = screen.getByLabelText('Due Date');
      await user.type(dateInput, '2025-08-01');

      expect(dateInput).toHaveValue('2025-08-01');
    });

    it('handles cancel button', async () => {
      const user = userEvent.setup();

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(mockOnClose).toHaveBeenCalled();
      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles API errors during creation', async () => {
      const user = userEvent.setup();
      vi.mocked(apiClient.createTicket).mockRejectedValueOnce(new Error('API Error'));

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      await user.type(screen.getByLabelText('Title *'), 'Test Ticket');
      await user.type(screen.getByLabelText('Description *'), 'Test Description');
      await user.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() => {
        expect(apiClient.createTicket).toHaveBeenCalled();
      });

      // The component should not close on error
      expect(mockOnSave).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('handles API errors during update', async () => {
      const user = userEvent.setup();
      vi.mocked(apiClient.updateTicket).mockRejectedValueOnce(new Error('Update failed'));

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={mockTicket}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Update' }));

      await waitFor(() => {
        expect(apiClient.updateTicket).toHaveBeenCalled();
      });

      expect(mockOnSave).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    it('shows loading state during form submission', async () => {
      const user = userEvent.setup();
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      vi.mocked(apiClient.createTicket).mockReturnValueOnce(promise);

      render(
        <TicketDialog
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          ticket={null}
        />
      );

      await user.type(screen.getByLabelText('Title *'), 'Test Ticket');
      await user.type(screen.getByLabelText('Description *'), 'Test Description');
      await user.click(screen.getByRole('button', { name: 'Create' }));

      expect(screen.getByText('Saving...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();

      resolvePromise!({});
      await waitFor(() => {
        expect(screen.queryByText('Saving...')).not.toBeInTheDocument();
      });
    });
  });
});
