import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface SalesLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: string;
  value: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface SalesLeadInsert {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  value?: number;
  notes?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface CustomerInsert {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export const useSalesLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: salesLeads = [], isLoading } = useQuery({
    queryKey: ['sales-leads'],
    queryFn: async () => {
      try {
        const response = await apiClient.getSalesLeads();
        return response || [];
      } catch (error) {
        console.error("Error fetching sales leads:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createSalesLead = useMutation({
    mutationFn: async (lead: SalesLeadInsert) => {
      if (!user) throw new Error('User not authenticated');

      return await apiClient.createSalesLead(lead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-leads'] });
      toast({ title: "Success", description: "Sales lead created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateSalesLead = useMutation({
    mutationFn: async ({ id, ...lead }: Partial<SalesLead> & { id: string }) => {
      return await apiClient.updateSalesLead(id, lead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-leads'] });
      toast({ title: "Success", description: "Sales lead updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteSalesLead = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteSalesLead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-leads'] });
      toast({ title: "Success", description: "Sales lead deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    salesLeads,
    leads: salesLeads, // alias for backward compatibility
    isLoading,
    createSalesLead: createSalesLead.mutate,
    createLead: createSalesLead.mutate, // alias for backward compatibility
    updateSalesLead: updateSalesLead.mutate,
    updateLead: updateSalesLead.mutate, // alias for backward compatibility
    deleteSalesLead: deleteSalesLead.mutate,
    deleteLead: deleteSalesLead.mutate, // alias for backward compatibility
  };
};

export const useCustomers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      try {
        const response = await apiClient.getCustomers();
        return response || [];
      } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createCustomer = useMutation({
    mutationFn: async (customer: CustomerInsert) => {
      if (!user) throw new Error('User not authenticated');

      return await apiClient.createCustomer(customer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({ title: "Success", description: "Customer created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateCustomer = useMutation({
    mutationFn: async ({ id, ...customer }: Partial<Customer> & { id: string }) => {
      return await apiClient.updateCustomer(id, customer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({ title: "Success", description: "Customer updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({ title: "Success", description: "Customer deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    customers,
    isLoading,
    createCustomer: createCustomer.mutate,
    updateCustomer: updateCustomer.mutate,
    deleteCustomer: deleteCustomer.mutate,
  };
};

// Add the missing export that Reports.tsx is looking for
export const useSales = () => {
  const salesLeads = useSalesLeads();
  const customers = useCustomers();

  return {
    salesLeads: salesLeads.salesLeads,
    leads: salesLeads.leads,
    isLoading: salesLeads.isLoading,
    createSalesLead: salesLeads.createSalesLead,
    createLead: salesLeads.createLead,
    updateSalesLead: salesLeads.updateSalesLead,
    updateLead: salesLeads.updateLead,
    deleteSalesLead: salesLeads.deleteSalesLead,
    deleteLead: salesLeads.deleteLead,
    customers: customers.customers,
    createCustomer: customers.createCustomer,
    updateCustomer: customers.updateCustomer,
    deleteCustomer: customers.deleteCustomer,
  };
};
