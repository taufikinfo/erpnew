import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useInvoices } from '@/hooks/useFinance';
import { Plus, Edit, Eye } from 'lucide-react';
import RightDrawer from '@/components/ui/right-drawer';

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface InvoiceDialogProps {
  mode: 'create' | 'edit' | 'view';
  invoice?: Invoice;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const InvoiceDialog: React.FC<InvoiceDialogProps> = ({ mode, invoice, trigger, onClose }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    invoice_number: '',
    client_name: '',
    amount: '',
    status: 'pending',
    issue_date: '',
    due_date: '',
    notes: ''
  });

  const { createInvoice, updateInvoice } = useInvoices();

  useEffect(() => {
    if (invoice && (mode === 'edit' || mode === 'view')) {
      setFormData({
        invoice_number: invoice.invoice_number || '',
        client_name: invoice.client_name || '',
        amount: invoice.amount?.toString() || '',
        status: invoice.status || 'pending',
        issue_date: invoice.issue_date ? new Date(invoice.issue_date).toISOString().split('T')[0] : '',
        due_date: invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : '',
        notes: invoice.notes || ''
      });
    }
  }, [invoice, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      issue_date: formData.issue_date + 'T00:00:00Z', // Convert to ISO datetime
      due_date: formData.due_date + 'T00:00:00Z' // Convert to ISO datetime
    };

    if (mode === 'create') {
      createInvoice(invoiceData);
    } else if (mode === 'edit' && invoice) {
      updateInvoice({ id: invoice.id, ...invoiceData });
    }

    setOpen(false);
    if (onClose) onClose();
    
    // Reset form for create mode
    if (mode === 'create') {
      setFormData({
        invoice_number: '',
        client_name: '',
        amount: '',
        status: 'pending',
        issue_date: '',
        due_date: '',
        notes: ''
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTitle = () => {
    switch (mode) {
      case 'create': return 'Create New Invoice';
      case 'edit': return 'Edit Invoice';
      case 'view': return 'View Invoice';
      default: return 'Invoice';
    }
  };

  const getIcon = () => {
    switch (mode) {
      case 'create': return <Plus className="h-4 w-4" />;
      case 'edit': return <Edit className="h-4 w-4" />;
      case 'view': return <Eye className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>
          {trigger}
        </div>
      ) : (
        <Button 
          onClick={() => setOpen(true)}
          variant={mode === 'create' ? 'default' : 'ghost'} 
          size={mode === 'create' ? 'default' : 'sm'}
          className={mode === 'create' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}
        >
          {getIcon()}
          {mode === 'create' && <span className="ml-2">New Invoice</span>}
        </Button>
      )}
      
      <RightDrawer 
        isOpen={open} 
        onClose={handleClose} 
        title={getTitle()}
        width="w-[500px]"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice_number">Invoice Number</Label>
                <Input
                  id="invoice_number"
                  value={formData.invoice_number}
                  onChange={(e) => handleChange('invoice_number', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleChange('status', value)}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleChange('client_name', e.target.value)}
                disabled={mode === 'view'}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                disabled={mode === 'view'}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue_date">Issue Date</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => handleChange('issue_date', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleChange('due_date', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                disabled={mode === 'view'}
                rows={4}
                className="w-full"
              />
            </div>
          </div>

          {mode !== 'view' && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {mode === 'create' ? 'Create' : 'Update'} Invoice
              </Button>
            </div>
          )}
        </form>
      </RightDrawer>
    </>
  );
};

export default InvoiceDialog;
