import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Receipt, 
  PieChart as PieChartIcon,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useInvoices, useExpenses, useTransactions } from '@/hooks/useFinance';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import FinanceSkeleton from '@/components/skeletons/FinanceSkeleton';
import InvoiceDialog from '@/components/finance/InvoiceDialog';
import ExpenseDialog from '@/components/finance/ExpenseDialog';
import TransactionDialog from '@/components/finance/TransactionDialog';
import DeleteConfirmDialog from '@/components/finance/DeleteConfirmDialog';

const Finance = () => {
  const { invoices, isLoading: invoicesLoading, deleteInvoice } = useInvoices();
  const { expenses, isLoading: expensesLoading, deleteExpense } = useExpenses();
  const { transactions, isLoading: transactionsLoading, deleteTransaction } = useTransactions();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Invoice column definitions
  const invoiceColumns: ColumnDef<{
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
  }>[] = [
    {
      id: 'invoice_number',
      header: 'Invoice Number',
      accessorKey: 'invoice_number',
      sortable: true,
      filterable: true,
      cell: (invoice) => <span className="font-medium">{invoice.invoice_number}</span>
    },
    {
      id: 'client_name',
      header: 'Client',
      accessorKey: 'client_name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      sortable: true,
      cell: (invoice) => <span className="font-semibold">${Number(invoice.amount).toLocaleString()}</span>
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['paid', 'pending', 'overdue'],
      cell: (invoice) => (
        <Badge className={getStatusColor(invoice.status)}>
          {invoice.status}
        </Badge>
      )
    },
    {
      id: 'issue_date',
      header: 'Issue Date',
      accessorKey: 'issue_date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    },
    {
      id: 'due_date',
      header: 'Due Date',
      accessorKey: 'due_date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    }
  ];

  // Expense column definitions
  const expenseColumns: ColumnDef<{
    id: string;
    expense_number: string;
    category: string;
    amount: number;
    vendor: string;
    expense_date: string;
    created_at: string;
    updated_at: string;
    created_by: string | null;
  }>[] = [
    {
      id: 'expense_number',
      header: 'Expense Number',
      accessorKey: 'expense_number',
      sortable: true,
      filterable: true,
      cell: (expense) => <span className="font-medium">{expense.expense_number}</span>
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Office Supplies', 'Travel', 'Marketing', 'Utilities', 'Other']
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      sortable: true,
      cell: (expense) => <span className="font-semibold text-red-600">${Number(expense.amount).toLocaleString()}</span>
    },
    {
      id: 'vendor',
      header: 'Vendor',
      accessorKey: 'vendor',
      sortable: true,
      filterable: true,
    },
    {
      id: 'expense_date',
      header: 'Date',
      accessorKey: 'expense_date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    }
  ];

  // Transaction column definitions
  const transactionColumns: ColumnDef<{
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
  }>[] = [
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['income', 'expense', 'transfer'],
      cell: (transaction) => (
        <Badge className={transaction.type === 'income' ? 'bg-green-100 text-green-800' : 
                           transaction.type === 'expense' ? 'bg-red-100 text-red-800' : 
                           'bg-blue-100 text-blue-800'}>
          {transaction.type}
        </Badge>
      )
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      sortable: true,
      filterable: true,
      cell: (transaction) => <span className="font-medium">{transaction.description}</span>
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Sales', 'Marketing', 'Office', 'Travel', 'Utilities', 'Other']
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      sortable: true,
      cell: (transaction) => (
        <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toLocaleString()}
        </span>
      )
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
      filterable: true,
      filterType: 'date'
    },
    {
      id: 'reference',
      header: 'Reference',
      accessorKey: 'reference',
      sortable: true,
      filterable: true,
      cell: (transaction) => transaction.reference || '-'
    }
  ];

  const invoiceActions = (invoice: {
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
  }) => (
    <div className="flex space-x-2">
      <InvoiceDialog mode="view" invoice={invoice} trigger={
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      } />
      <InvoiceDialog mode="edit" invoice={invoice} trigger={
        <Button size="sm" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      } />
      <DeleteConfirmDialog
        title="Delete Invoice"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        onConfirm={() => deleteInvoice(invoice.id)}
      />
    </div>
  );

  const expenseActions = (expense: {
    id: string;
    expense_number: string;
    category: string;
    amount: number;
    vendor: string;
    expense_date: string;
    created_at: string;
    updated_at: string;
    created_by: string | null;
  }) => (
    <div className="flex space-x-2">
      <ExpenseDialog mode="view" expense={expense} trigger={
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      } />
      <ExpenseDialog mode="edit" expense={expense} trigger={
        <Button size="sm" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      } />
      <DeleteConfirmDialog
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={() => deleteExpense(expense.id)}
      />
    </div>
  );

  const transactionActions = (transaction: {
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
  }) => (
    <div className="flex space-x-2">
      <TransactionDialog mode="view" transaction={transaction} trigger={
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      } />
      <TransactionDialog mode="edit" transaction={transaction} trigger={
        <Button size="sm" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      } />
      <DeleteConfirmDialog
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={() => deleteTransaction(transaction.id)}
      />
    </div>
  );

  if (invoicesLoading || expensesLoading || transactionsLoading) {
    return <FinanceSkeleton />;
  }

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const outstanding = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0);

  // Process data for revenue vs expenses chart by month
  const revenueData = invoices.reduce((acc: { month: string; revenue: number; expenses: number; profit: number; }[], invoice) => {
    const month = new Date(invoice.issue_date).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    const amount = Number(invoice.amount);
    
    if (existing) {
      if (invoice.status === 'paid') {
        existing.revenue += amount;
      }
    } else {
      acc.push({
        month,
        revenue: invoice.status === 'paid' ? amount : 0,
        expenses: 0,
        profit: 0
      });
    }
    return acc;
  }, []);

  // Add expenses data
  expenses.forEach(expense => {
    const month = new Date(expense.expense_date).toLocaleDateString('en-US', { month: 'short' });
    const existing = revenueData.find(item => item.month === month);
    const amount = Number(expense.amount);
    
    if (existing) {
      existing.expenses += amount;
    } else {
      revenueData.push({
        month,
        revenue: 0,
        expenses: amount,
        profit: 0
      });
    }
  });

  // Calculate profit
  revenueData.forEach(item => {
    item.profit = item.revenue - item.expenses;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance & Accounting</h1>
          <p className="text-gray-600 mt-1">Manage your financial operations and accounting</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <InvoiceDialog mode="create" />
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              From paid invoices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Total recorded expenses
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${(totalRevenue - totalExpenses).toLocaleString()}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Revenue minus expenses
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">${outstanding.toLocaleString()}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              Unpaid invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-blue-600" />
            <span>Revenue vs Expenses</span>
          </CardTitle>
          <CardDescription>Monthly financial performance comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="profit" fill="#3B82F6" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs for different financial modules */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Invoices</h3>
              <p className="text-sm text-gray-600">Manage your customer invoices and payments</p>
            </div>
            <InvoiceDialog mode="create" />
          </div>
          <AdvancedDataTable
            data={invoices}
            columns={invoiceColumns}
            title="Invoices"
            description="Manage your customer invoices and payments"
            searchPlaceholder="Search invoices by number, client, status..."
            actions={invoiceActions}
            defaultPageSize={10}
          />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Expenses</h3>
              <p className="text-sm text-gray-600">Track and manage business expenses</p>
            </div>
            <ExpenseDialog mode="create" />
          </div>
          <AdvancedDataTable
            data={expenses}
            columns={expenseColumns}
            title="Expenses"
            description="Track and manage business expenses"
            searchPlaceholder="Search expenses by number, category, vendor..."
            actions={expenseActions}
            defaultPageSize={10}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Transactions</h3>
              <p className="text-sm text-gray-600">View and manage all financial transactions</p>
            </div>
            <TransactionDialog mode="create" />
          </div>
          <AdvancedDataTable
            data={transactions}
            columns={transactionColumns}
            title="Transactions"
            description="View and manage all financial transactions"
            searchPlaceholder="Search transactions by type, description, category..."
            actions={transactionActions}
            defaultPageSize={10}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Profit & Loss Statement</CardTitle>
                <CardDescription>Monthly P&L report</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Balance Sheet</CardTitle>
                <CardDescription>Current financial position</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow Statement</CardTitle>
                <CardDescription>Cash inflows and outflows</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
