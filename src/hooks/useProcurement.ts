import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Supplier {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  contact_person: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface PurchaseOrder {
  id: string;
  supplier_id: string | null;
  po_number: string;
  status: string;
  order_date: string;
  expected_delivery: string | null;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface SupplierInsert {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  contact_person?: string;
}

interface PurchaseOrderInsert {
  supplier_id?: string;
  po_number: string;
  status: string;
  order_date: string;
  expected_delivery?: string;
  total_amount: number;
  notes?: string;
}

export type { Supplier, PurchaseOrder, SupplierInsert, PurchaseOrderInsert };

export const useVendors = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      try {
        const response = await apiClient.getVendors();
        return response || [];
      } catch (error) {
        console.error("Error fetching vendors:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createVendor = useMutation({
    mutationFn: async (vendor: SupplierInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.createVendor(vendor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: "Success", description: "Vendor created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateVendor = useMutation({
    mutationFn: async ({ id, ...vendor }: Partial<Supplier> & { id: string }) => {
      return await apiClient.updateVendor(id, vendor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: "Success", description: "Vendor updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteVendor = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteVendor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: "Success", description: "Vendor deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    vendors,
    isLoading,
    createVendor: createVendor.mutate,
    updateVendor: updateVendor.mutate,
    deleteVendor: deleteVendor.mutate,
  };
};

export const useSuppliers = () => {
  const { vendors, isLoading, createVendor, updateVendor, deleteVendor } = useVendors();
  
  return {
    suppliers: vendors, // Map vendors to suppliers for naming consistency
    isLoading,
    createSupplier: createVendor,
    updateSupplier: updateVendor,
    deleteSupplier: deleteVendor,
  };
};

export const usePurchaseOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: purchaseOrders = [], isLoading } = useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async () => {
      try {
        const response = await apiClient.getPurchaseOrders();
        return response || [];
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createPurchaseOrder = useMutation({
    mutationFn: async (order: PurchaseOrderInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.createPurchaseOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast({ title: "Success", description: "Purchase order created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updatePurchaseOrder = useMutation({
    mutationFn: async ({ id, ...order }: Partial<PurchaseOrder> & { id: string }) => {
      return await apiClient.updatePurchaseOrder(id, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast({ title: "Success", description: "Purchase order updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deletePurchaseOrder = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deletePurchaseOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast({ title: "Success", description: "Purchase order deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    purchaseOrders,
    isLoading,
    createPurchaseOrder: createPurchaseOrder.mutate,
    updatePurchaseOrder: updatePurchaseOrder.mutate,
    deletePurchaseOrder: deletePurchaseOrder.mutate,
  };
};

export const useProcurement = () => {
  const vendors = useVendors();
  const purchaseOrders = usePurchaseOrders();

  return {
    vendors: vendors.vendors,
    suppliers: vendors.vendors, // Add suppliers alias for backward compatibility
    purchaseOrders: purchaseOrders.purchaseOrders,
    isLoading: vendors.isLoading || purchaseOrders.isLoading,
    createVendor: vendors.createVendor,
    updateVendor: vendors.updateVendor,
    deleteVendor: vendors.deleteVendor,
    createSupplier: vendors.createVendor, // Add supplier aliases
    updateSupplier: vendors.updateVendor,
    deleteSupplier: vendors.deleteVendor,
    createPurchaseOrder: purchaseOrders.createPurchaseOrder,
    updatePurchaseOrder: purchaseOrders.updatePurchaseOrder,
    deletePurchaseOrder: purchaseOrders.deletePurchaseOrder,
  };
};
