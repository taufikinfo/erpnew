import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;  // Changed from customer_id to client_name
  amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface TransactionInsert {
  type: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  reference?: string;
}

interface InvoiceInsert {
  invoice_number: string;
  client_name: string;  // Changed from customer_id to client_name
  amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  notes?: string;
}

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

interface ExpenseInsert {
  expense_number: string;
  category: string;
  amount: number;
  vendor: string;
  expense_date: string;
}

export const useTransactions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      try {
        const response = await apiClient.getTransactions();
        return response.items || [];
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    },
    enabled: !!user, // Enable when user is authenticated
  });

  const createTransaction = useMutation({
    mutationFn: async (transaction: TransactionInsert) => {
      if (!user) throw new Error('User not authenticated');
      
      try {
        return await apiClient.createTransaction(transaction);
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({ title: "Success", description: "Transaction created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateTransaction = useMutation({
    mutationFn: async ({ id, ...transaction }: Partial<Transaction> & { id: string }) => {
      try {
        return await apiClient.updateTransaction(id, transaction);
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({ title: "Success", description: "Transaction updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await apiClient.deleteTransaction(id);
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({ title: "Success", description: "Transaction deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    transactions,
    isLoading,
    createTransaction: createTransaction.mutate,
    updateTransaction: updateTransaction.mutate,
    deleteTransaction: deleteTransaction.mutate,
  };
};

export const useInvoices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      try {
        const response = await apiClient.getInvoices();
        return response.items || [];
      } catch (error) {
        console.error("Error fetching invoices:", error);
        return [];
      }
    },
    enabled: !!user, // Enable when user is authenticated
  });

  const createInvoice = useMutation({
    mutationFn: async (invoice: InvoiceInsert) => {
      if (!user) throw new Error('User not authenticated');
      
      try {
        return await apiClient.createInvoice(invoice);
      } catch (error) {
        console.error("Error creating invoice:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: "Success", description: "Invoice created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, ...invoice }: Partial<Invoice> & { id: string }) => {
      try {
        return await apiClient.updateInvoice(id, invoice);
      } catch (error) {
        console.error("Error updating invoice:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: "Success", description: "Invoice updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await apiClient.deleteInvoice(id);
      } catch (error) {
        console.error("Error deleting invoice:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: "Success", description: "Invoice deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    invoices,
    isLoading,
    createInvoice: createInvoice.mutate,
    updateInvoice: updateInvoice.mutate,
    deleteInvoice: deleteInvoice.mutate,
  };
};

export const useExpenses = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      try {
        const response = await apiClient.getExpenses();
        return response.items || [];
      } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
      }
    },
    enabled: !!user, // Enable when user is authenticated
  });

  const createExpense = useMutation({
    mutationFn: async (expense: ExpenseInsert) => {
      if (!user) throw new Error('User not authenticated');
      
      try {
        return await apiClient.createExpense(expense);
      } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: "Success", description: "Expense created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateExpense = useMutation({
    mutationFn: async ({ id, ...expense }: Partial<Expense> & { id: string }) => {
      try {
        return await apiClient.updateExpense(id, expense);
      } catch (error) {
        console.error("Error updating expense:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: "Success", description: "Expense updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await apiClient.deleteExpense(id);
      } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: "Success", description: "Expense deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    expenses,
    isLoading,
    createExpense: createExpense.mutate,
    updateExpense: updateExpense.mutate,
    deleteExpense: deleteExpense.mutate,
  };
};

export const useFinance = () => {
  const transactions = useTransactions();
  const invoices = useInvoices();
  const expenses = useExpenses();

  return {
    transactions: transactions.transactions,
    invoices: invoices.invoices,
    expenses: expenses.expenses,
    isLoading: transactions.isLoading || invoices.isLoading || expenses.isLoading,
    createTransaction: transactions.createTransaction,
    updateTransaction: transactions.updateTransaction,
    deleteTransaction: transactions.deleteTransaction,
    createInvoice: invoices.createInvoice,
    updateInvoice: invoices.updateInvoice,
    deleteInvoice: invoices.deleteInvoice,
    createExpense: expenses.createExpense,
    updateExpense: expenses.updateExpense,
    deleteExpense: expenses.deleteExpense,
  };
};
