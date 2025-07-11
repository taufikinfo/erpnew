import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTransactions } from '@/hooks/useFinance';
import { Plus, Edit, Eye } from 'lucide-react';
import RightDrawer from '@/components/ui/right-drawer';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface TransactionDialogProps {
  mode: 'create' | 'edit' | 'view';
  transaction?: Transaction;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ mode, transaction, trigger, onClose }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    description: '',
    date: '',
    category: '',
    reference: ''
  });

  const { createTransaction, updateTransaction } = useTransactions();

  useEffect(() => {
    if (transaction && (mode === 'edit' || mode === 'view')) {
      setFormData({
        type: transaction.type || '',
        amount: transaction.amount?.toString() || '',
        description: transaction.description || '',
        date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
        category: transaction.category || '',
        reference: transaction.reference || ''
      });
    }
  }, [transaction, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date + 'T00:00:00Z' // Convert to ISO datetime
    };

    if (mode === 'create') {
      createTransaction(transactionData);
    } else if (mode === 'edit' && transaction) {
      updateTransaction({ id: transaction.id, ...transactionData });
    }

    setOpen(false);
    if (onClose) onClose();
    
    // Reset form for create mode
    if (mode === 'create') {
      setFormData({
        type: '',
        amount: '',
        description: '',
        date: '',
        category: '',
        reference: ''
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
      case 'create': return 'Create New Transaction';
      case 'edit': return 'Edit Transaction';
      case 'view': return 'View Transaction';
      default: return 'Transaction';
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
          {mode === 'create' && <span className="ml-2">New Transaction</span>}
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
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleChange('type', value)}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange('category', value)}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={mode === 'view'}
                required
                rows={3}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                disabled={mode === 'view'}
                placeholder="Optional reference number"
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
                {mode === 'create' ? 'Create' : 'Update'} Transaction
              </Button>
            </div>
          )}
        </form>
      </RightDrawer>
    </>
  );
};

export default TransactionDialog;
