import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useTickets } from '../useTickets';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

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
    type: 'bug',
    department: 'IT',
    module: 'Dashboard',
    created_by: 'user1@example.com',
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
    type: 'feature_request',
    department: 'Sales',
    module: 'Reports',
    created_by: 'user2@example.com',
    assigned_to: 'user2@example.com',
    due_date: '2025-07-20',
    created_at: '2025-07-02T10:00:00Z',
    updated_at: '2025-07-02T10:00:00Z',
  },
];

const mockStats = {
  total_tickets: 2,
  open_tickets: 1,
  in_progress_tickets: 1,
  resolved_tickets: 0,
  closed_tickets: 0,
  urgent_tickets: 0,
  high_priority_tickets: 1,
  overdue_tickets: 0,
};

describe('useTickets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useTickets());

    expect(result.current.tickets).toEqual([]);
    expect(result.current.stats).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch tickets successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTickets,
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchTickets();
    });

    expect(result.current.tickets).toEqual(mockTickets);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch tickets error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchTickets();
    });

    expect(result.current.tickets).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain('HTTP error! status: 500');
  });

  it('should fetch stats successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchStats();
    });

    expect(result.current.stats).toEqual(mockStats);
  });

  it('should create a ticket successfully', async () => {
    const newTicketData = {
      title: 'New Ticket',
      description: 'New Description',
      priority: 'high' as const,
      type: 'bug' as const,
      department: 'IT',
      module: 'Dashboard',
      assigned_to: 'user@example.com',
    };

    const createdTicket = {
      id: '3',
      ticket_number: 'TK-003',
      ...newTicketData,
      status: 'open',
      created_by: 'user@example.com',
      due_date: null,
      created_at: '2025-07-03T10:00:00Z',
      updated_at: '2025-07-03T10:00:00Z',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdTicket,
    });

    const { result } = renderHook(() => useTickets());

    let resultTicket;
    await act(async () => {
      resultTicket = await result.current.createTicket(newTicketData);
    });

    expect(resultTicket).toEqual(createdTicket);
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicketData),
    });
  });

  it('should update a ticket successfully', async () => {
    const updateData = {
      title: 'Updated Ticket',
      status: 'resolved' as const,
    };

    const updatedTicket = {
      ...mockTickets[0],
      ...updateData,
      updated_at: '2025-07-03T11:00:00Z',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTicket,
    });

    const { result } = renderHook(() => useTickets());

    let resultTicket;
    await act(async () => {
      resultTicket = await result.current.updateTicket('1', updateData);
    });

    expect(resultTicket).toEqual(updatedTicket);
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
  });

  it('should delete a ticket successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Ticket deleted successfully' }),
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.deleteTicket('1');
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets/1', {
      method: 'DELETE',
    });
  });

  it('should get a single ticket successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTickets[0],
    });

    const { result } = renderHook(() => useTickets());

    let resultTicket;
    await act(async () => {
      resultTicket = await result.current.getTicket('1');
    });

    expect(resultTicket).toEqual(mockTickets[0]);
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets/1');
  });

  it('should add a comment successfully', async () => {
    const commentData = {
      id: '1',
      ticket_id: '1',
      user_id: 'user1',
      comment: 'Test comment',
      is_internal: false,
      created_at: '2025-07-03T12:00:00Z',
      updated_at: '2025-07-03T12:00:00Z',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => commentData,
    });

    const { result } = renderHook(() => useTickets());

    let resultComment;
    await act(async () => {
      resultComment = await result.current.addComment('1', 'Test comment', false);
    });

    expect(resultComment).toEqual(commentData);
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets/1/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: 'Test comment',
        is_internal: false,
      }),
    });
  });

  it('should get comments successfully', async () => {
    const commentsData = [
      {
        id: '1',
        ticket_id: '1',
        user_id: 'user1',
        comment: 'Test comment 1',
        is_internal: false,
        created_at: '2025-07-03T12:00:00Z',
        updated_at: '2025-07-03T12:00:00Z',
      },
      {
        id: '2',
        ticket_id: '1',
        user_id: 'user2',
        comment: 'Test comment 2',
        is_internal: true,
        created_at: '2025-07-03T13:00:00Z',
        updated_at: '2025-07-03T13:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => commentsData,
    });

    const { result } = renderHook(() => useTickets());

    let resultComments;
    await act(async () => {
      resultComments = await result.current.getComments('1', true);
    });

    expect(resultComments).toEqual(commentsData);
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets/1/comments?include_internal=true');
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchTickets();
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.loading).toBe(false);
  });

  it('should handle create ticket error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    const { result } = renderHook(() => useTickets());

    const newTicketData = {
      title: 'New Ticket',
      description: 'New Description',
      priority: 'high' as const,
      type: 'bug' as const,
    };

    await act(async () => {
      try {
        await result.current.createTicket(newTicketData);
      } catch (error) {
        expect(error.message).toContain('HTTP error! status: 400');
      }
    });
  });

  it('should handle update ticket error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useTickets());

    const updateData = {
      title: 'Updated Ticket',
    };

    await act(async () => {
      try {
        await result.current.updateTicket('999', updateData);
      } catch (error) {
        expect(error.message).toContain('HTTP error! status: 404');
      }
    });
  });

  it('should handle delete ticket error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      try {
        await result.current.deleteTicket('1');
      } catch (error) {
        expect(error.message).toContain('HTTP error! status: 403');
      }
    });
  });

  it('should fetch tickets with filters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockTickets[0]],
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchTickets({
        status: 'open',
        priority: 'high',
        search: 'test',
      });
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets?status=open&priority=high&search=test');
  });

  it('should skip empty filter values', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTickets,
    });

    const { result } = renderHook(() => useTickets());

    await act(async () => {
      await result.current.fetchTickets({
        status: 'open',
        priority: '', // Empty string should be skipped
        search: undefined, // Undefined should be skipped
      });
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/v1/tickets?status=open');
  });
});
