import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  id: string;
  name: string;
  period: string;
  data: Record<string, unknown>;
  created_at: string;
}

interface SalesReport {
  total_sales: number;
  sales_by_period: { period: string; amount: number }[];
  sales_by_category: { category: string; amount: number }[];
  conversion_rate: number;
}

interface FinanceReport {
  revenue: number;
  expenses: number;
  profit: number;
  cash_flow: { period: string; inflow: number; outflow: number }[];
}

interface InventoryReport {
  total_items: number;
  low_stock_items: number;
  inventory_value: number;
  turnover_rate: number;
  item_movements: { item: string; quantity: number; direction: 'in' | 'out' }[];
}

interface HRReport {
  total_employees: number;
  departments: { name: string; count: number }[];
  hiring_trend: { period: string; count: number }[];
}

export const useReports = () => {
  const { toast } = useToast();

  const { data: reports = {}, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      return await apiClient.get('/reports/');
    },
  });

  const getSalesReport = async (period: string = 'month') => {
    try {
      return await apiClient.get(`/reports/sales?period=${period}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return null;
    }
  };

  const getFinanceReport = async (period: string = 'month') => {
    try {
      return await apiClient.get(`/reports/finance?period=${period}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return null;
    }
  };

  const getInventoryReport = async () => {
    try {
      return await apiClient.get('/reports/inventory');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return null;
    }
  };

  const getHRReport = async (period: string = 'month') => {
    try {
      return await apiClient.get(`/reports/human-resources?period=${period}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return null;
    }
  };

  const getCustomReport = async (params: Record<string, string | number | boolean>) => {
    try {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      
      return await apiClient.get(`/reports/custom?${queryString}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return null;
    }
  };

  const exportReport = async (reportType: string, format: 'pdf' | 'csv' | 'excel', params: Record<string, string | number | boolean> = {}) => {
    try {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      
      const response = await apiClient.get(`/reports/${reportType}/export?format=${format}&${queryString}`, { 
        responseType: 'blob' 
      });
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast({ title: "Success", description: `Report exported successfully as ${format.toUpperCase()}` });
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return false;
    }
  };

  return {
    reports,
    isLoading,
    getSalesReport,
    getFinanceReport,
    getInventoryReport,
    getHRReport,
    getCustomReport,
    exportReport,
  };
};
