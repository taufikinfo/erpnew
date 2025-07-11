import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  ticket_type: 'bug' | 'feature_request' | 'support' | 'improvement' | 'question';
  department?: string;
  module?: string;
  assigned_to?: string;
  due_date?: string;
}

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: Ticket | null;
  onSave: () => void;
}

const departments = [
  'IT', 'Finance', 'Human Resources', 'Sales', 'Marketing', 'Operations', 'Customer Service'
];

const modules = [
  'Dashboard', 'Finance', 'Human Resources', 'Inventory', 'Sales', 'Projects', 'Reports', 'Settings'
];

export function TicketDialog({ isOpen, onClose, ticket, onSave }: TicketDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    ticket_type: 'support' as const,
    department: '',
    module: '',
    assigned_to: '',
    due_date: '',
    status: 'open' as const
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        ticket_type: ticket.ticket_type,
        department: ticket.department || '',
        module: ticket.module || '',
        assigned_to: ticket.assigned_to || '',
        due_date: ticket.due_date ? ticket.due_date.split('T')[0] : '',
        status: ticket.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        ticket_type: 'support',
        department: '',
        module: '',
        assigned_to: '',
        due_date: '',
        status: 'open'
      });
    }
  }, [ticket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
        department: formData.department || null,
        module: formData.module || null,
        assigned_to: formData.assigned_to || null
      };

      if (ticket) {
        // Update existing ticket
        await apiClient.updateTicket(ticket.id, payload);
      } else {
        // Create new ticket
        await apiClient.createTicket(payload);
      }

      toast({
        title: "Success",
        description: ticket ? "Ticket updated successfully" : "Ticket created successfully",
      });

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving ticket:', error);
      toast({
        title: "Error",
        description: `Failed to save ticket: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{ticket ? 'Edit Ticket' : 'Create New Ticket'}</DialogTitle>
          <DialogDescription>
            {ticket ? 'Update the ticket details below.' : 'Fill out the form below to create a new support ticket.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                placeholder="Enter ticket title"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                placeholder="Describe the issue or request"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.ticket_type} onValueChange={(value) => handleInputChange('ticket_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="improvement">Improvement</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {ticket && (
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="reopened">Reopened</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="module">Module</Label>
                <Select value={formData.module} onValueChange={(value) => handleInputChange('module', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((mod) => (
                      <SelectItem key={mod} value={mod}>{mod}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  value={formData.assigned_to}
                  onChange={(e) => handleInputChange('assigned_to', e.target.value)}
                  placeholder="Enter assignee email/username"
                />
              </div>

              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleInputChange('due_date', e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (ticket ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
