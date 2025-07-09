
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface Invoice {
  issue_date: string;
  amount: number;
  status: string;
}

interface Employee {
  department: string;
}

interface ApiResponse<T> {
  items: T[];
  total: number;
}

export const useDashboardStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return await apiClient.getDashboardStats();
    },
  });

  return { stats, isLoading };
};

export const useDashboardChartData = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: async () => {
      // Get data from our API
      const invoices = await apiClient.getInvoices() as ApiResponse<Invoice>;
      const employees = await apiClient.getEmployees() as ApiResponse<Employee>;

      // Process sales data by month
      const salesByMonth = invoices.items?.reduce((acc: Array<{month: string, sales: number, orders: number}>, invoice: Invoice) => {
        const month = new Date(invoice.issue_date).toLocaleDateString('en-US', { month: 'short' });
        const existing = acc.find(item => item.month === month);
        if (existing) {
          existing.sales += Number(invoice.amount || 0);
          existing.orders += 1;
        } else {
          acc.push({
            month,
            sales: Number(invoice.amount || 0),
            orders: 1
          });
        }
        return acc;
      }, []) || [];

      // Process department distribution
      const departmentData = employees.items?.reduce((acc: Array<{name: string, value: number}>, emp: Employee) => {
        const existing = acc.find(d => d.name === emp.department);
        if (existing) {
          existing.value++;
        } else {
          acc.push({ name: emp.department, value: 1 });
        }
        return acc;
      }, []) || [];

      return {
        salesData: salesByMonth,
        departmentData
      };
    },
  });

  return { chartData, isLoading };
};
