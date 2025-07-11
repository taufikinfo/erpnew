import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'bug' | 'feature_request' | 'support' | 'improvement' | 'question';
  department?: string;
  module?: string;
  created_by: string;
  assigned_to?: string;
  due_date?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

interface TicketStats {
  total_tickets: number;
  open_tickets: number;
  in_progress_tickets: number;
  resolved_tickets: number;
  closed_tickets: number;
  urgent_tickets: number;
  high_priority_tickets: number;
  overdue_tickets: number;
}

interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  comment: string;
  is_internal: boolean;
  created_at: string;
  updated_at: string;
}

interface TicketCreateRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'bug' | 'feature_request' | 'support' | 'improvement' | 'question';
  department?: string;
  module?: string;
  assigned_to?: string;
  due_date?: string;
}

interface TicketUpdateRequest extends Partial<TicketCreateRequest> {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened';
}

interface TicketFilters {
  search?: string;
  status?: string;
  priority?: string;
  ticket_type?: string;
  department?: string;
  assigned_to?: string;
  created_by?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTickets = async (filters: TicketFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/v1/tickets?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTickets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tickets';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/v1/tickets/stats/summary');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching ticket stats:', err);
    }
  };

  const createTicket = async (ticketData: TicketCreateRequest): Promise<Ticket> => {
    try {
      const response = await fetch('/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTicket = await response.json();
      
      toast({
        title: "Success",
        description: "Ticket created successfully",
      });

      return newTicket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create ticket';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateTicket = async (ticketId: string, ticketData: TicketUpdateRequest): Promise<Ticket> => {
    try {
      const response = await fetch(`/api/v1/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTicket = await response.json();
      
      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });

      return updatedTicket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update ticket';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteTicket = async (ticketId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/v1/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Success",
        description: "Ticket deleted successfully",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete ticket';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const getTicket = async (ticketId: string): Promise<Ticket> => {
    try {
      const response = await fetch(`/api/v1/tickets/${ticketId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch ticket';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const addComment = async (ticketId: string, comment: string, isInternal: boolean = false): Promise<TicketComment> => {
    try {
      const response = await fetch(`/api/v1/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          is_internal: isInternal,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newComment = await response.json();
      
      toast({
        title: "Success",
        description: "Comment added successfully",
      });

      return newComment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add comment';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const getComments = async (ticketId: string, includeInternal: boolean = false): Promise<TicketComment[]> => {
    try {
      const params = new URLSearchParams();
      if (includeInternal) {
        params.append('include_internal', 'true');
      }

      const response = await fetch(`/api/v1/tickets/${ticketId}/comments?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch comments';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    tickets,
    stats,
    loading,
    error,
    fetchTickets,
    fetchStats,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
    addComment,
    getComments,
  };
}

export type { Ticket, TicketStats, TicketComment, TicketCreateRequest, TicketUpdateRequest, TicketFilters };
