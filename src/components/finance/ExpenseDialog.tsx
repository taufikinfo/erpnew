import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpenses } from '@/hooks/useFinance';
import { Plus, Edit, Eye } from 'lucide-react';
import RightDrawer from '@/components/ui/right-drawer';

interface Expense {
  id: string;
  expense_number: string;
  category: string;
  amount: number;
  vendor: string;
  expense_date: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface ExpenseDialogProps {
  mode: 'create' | 'edit' | 'view';
  expense?: Expense;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({ mode, expense, trigger, onClose }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    expense_number: '',
    category: '',
    amount: '',
    vendor: '',
    expense_date: ''
  });

  const { createExpense, updateExpense } = useExpenses();

  useEffect(() => {
    if (expense && (mode === 'edit' || mode === 'view')) {
      setFormData({
        expense_number: expense.expense_number || '',
        category: expense.category || '',
        amount: expense.amount?.toString() || '',
        vendor: expense.vendor || '',
        expense_date: expense.expense_date ? new Date(expense.expense_date).toISOString().split('T')[0] : ''
      });
    }
  }, [expense, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      expense_date: formData.expense_date + 'T00:00:00Z' // Convert to ISO datetime
    };

    if (mode === 'create') {
      createExpense(expenseData);
    } else if (mode === 'edit' && expense) {
      updateExpense({ id: expense.id, ...expenseData });
    }

    setOpen(false);
    if (onClose) onClose();
    
    // Reset form for create mode
    if (mode === 'create') {
      setFormData({
        expense_number: '',
        category: '',
        amount: '',
        vendor: '',
        expense_date: ''
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
      case 'create': return 'Create New Expense';
      case 'edit': return 'Edit Expense';
      case 'view': return 'View Expense';
      default: return 'Expense';
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
          {mode === 'create' && <span className="ml-2">New Expense</span>}
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
                <Label htmlFor="expense_number">Expense Number</Label>
                <Input
                  id="expense_number"
                  value={formData.expense_number}
                  onChange={(e) => handleChange('expense_number', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
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
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => handleChange('vendor', e.target.value)}
                disabled={mode === 'view'}
                required
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
                <Label htmlFor="expense_date">Expense Date</Label>
                <Input
                  id="expense_date"
                  type="date"
                  value={formData.expense_date}
                  onChange={(e) => handleChange('expense_date', e.target.value)}
                  disabled={mode === 'view'}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {mode !== 'view' && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {mode === 'create' ? 'Create' : 'Update'} Expense
              </Button>
            </div>
          )}
        </form>
      </RightDrawer>
    </>
  );
};

export default ExpenseDialog;
