import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '../api-client';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage for auth token
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'mock-auth-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  describe('getTickets', () => {
    it('fetches tickets with correct URL and headers', async () => {
      const mockTickets = [
        {
          id: '1',
          ticket_number: 'TK-001',
          title: 'Test Ticket',
          description: 'Test Description',
          status: 'open',
          priority: 'medium',
          ticket_type: 'bug',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTickets,
      });

      const result = await apiClient.getTickets();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tickets',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-auth-token',
          },
        }
      );

      expect(result).toEqual(mockTickets);
    });

    it('handles fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.getTickets()).rejects.toThrow('Network error');
    });

    it('handles HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(apiClient.getTickets()).rejects.toThrow('HTTP error! status: 500');
    });
  });

  describe('getTicket', () => {
    it('fetches single ticket by ID', async () => {
      const mockTicket = {
        id: '1',
        ticket_number: 'TK-001',
        title: 'Test Ticket',
        description: 'Test Description',
        status: 'open',
        priority: 'medium',
        ticket_type: 'bug',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTicket,
      });

      const result = await apiClient.getTicket('1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tickets/1',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-auth-token',
          },
        }
      );

      expect(result).toEqual(mockTicket);
    });
  });

  describe('createTicket', () => {
    it('creates a new ticket with correct data', async () => {
      const newTicket = {
        title: 'New Ticket',
        description: 'New Description',
        priority: 'high',
        ticket_type: 'bug',
        status: 'open',
      };

      const createdTicket = {
        id: '2',
        ticket_number: 'TK-002',
        ...newTicket,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdTicket,
      });

      const result = await apiClient.createTicket(newTicket);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tickets',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-auth-token',
          },
          body: JSON.stringify(newTicket),
        }
      );

      expect(result).toEqual(createdTicket);
    });

    it('handles validation errors', async () => {
      const newTicket = {
        title: '',
        description: 'Description',
        priority: 'high',
        ticket_type: 'bug',
        status: 'open',
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        statusText: 'Validation Error',
      });

      await expect(apiClient.createTicket(newTicket)).rejects.toThrow('HTTP error! status: 422');
    });
  });

  describe('updateTicket', () => {
    it('updates an existing ticket', async () => {
      const updateData = {
        title: 'Updated Ticket',
        description: 'Updated Description',
        status: 'in_progress',
      };

      const updatedTicket = {
        id: '1',
        ticket_number: 'TK-001',
        ...updateData,
        priority: 'medium',
        ticket_type: 'bug',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedTicket,
      });

      const result = await apiClient.updateTicket('1', updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tickets/1',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-auth-token',
          },
          body: JSON.stringify(updateData),
        }
      );

      expect(result).toEqual(updatedTicket);
    });

    it('handles update errors', async () => {
      const updateData = {
        title: 'Updated Ticket',
        status: 'invalid_status',
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(apiClient.updateTicket('1', updateData)).rejects.toThrow('HTTP error! status: 400');
    });
  });

  describe('deleteTicket', () => {
    it('deletes a ticket', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Ticket deleted successfully' }),
      });

      const result = await apiClient.deleteTicket('1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/tickets/1',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-auth-token',
          },
        }
      );

      expect(result).toEqual({ message: 'Ticket deleted successfully' });
    });

    it('handles delete errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(apiClient.deleteTicket('999')).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('Authentication', () => {
    it('includes authorization header when token exists', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await apiClient.getTickets();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-auth-token',
          }),
        })
      );
    });

    it('handles missing auth token', async () => {
      // Mock localStorage to return null
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => null),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await apiClient.getTickets();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer null',
          }),
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.getTickets()).rejects.toThrow('Network error');
    });

    it('handles malformed JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(apiClient.getTickets()).rejects.toThrow('Invalid JSON');
    });

    it('handles 401 unauthorized errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      await expect(apiClient.getTickets()).rejects.toThrow('HTTP error! status: 401');
    });

    it('handles 403 forbidden errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      await expect(apiClient.getTickets()).rejects.toThrow('HTTP error! status: 403');
    });
  });
});
