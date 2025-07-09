import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ProductionOrder {
  id: string;
  order_number: string;
  product_name: string;
  quantity: number;
  status: string;
  start_date: string;
  end_date: string | null;
  priority: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface WorkStation {
  id: string;
  name: string;
  location: string;
  capacity: number;
  status: string;
  maintenance_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface ProductionOrderInsert {
  order_number: string;
  product_name: string;
  quantity: number;
  status: string;
  start_date: string;
  end_date?: string;
  priority: string;
  notes?: string;
}

interface WorkStationInsert {
  name: string;
  location: string;
  capacity: number;
  status: string;
  maintenance_date?: string;
  notes?: string;
}

interface WorkOrder {
  id: string;
  work_order_id: string;
  product: string;
  quantity: number;
  status: string;
  start_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface WorkOrderInsert {
  work_order_id: string;
  product: string;
  quantity: number;
  status: string;
  start_date: string;
  due_date: string;
}

interface WorkOrderUpdate {
  work_order_id?: string;
  product?: string;
  quantity?: number;
  status?: string;
  start_date?: string;
  due_date?: string;
}

export const useProductionOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: productionOrders = [], isLoading } = useQuery({
    queryKey: ['production-orders'],
    queryFn: async () => {
      return await apiClient.get('/production-orders/');
    },
  });

  const createProductionOrder = useMutation({
    mutationFn: async (order: ProductionOrderInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.post('/production-orders/', {
        ...order,
        created_by: user.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['production-orders'] });
      toast({ title: "Success", description: "Production order created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateProductionOrder = useMutation({
    mutationFn: async ({ id, ...order }: Partial<ProductionOrder> & { id: string }) => {
      return await apiClient.put(`/production-orders/${id}`, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['production-orders'] });
      toast({ title: "Success", description: "Production order updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteProductionOrder = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/production-orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['production-orders'] });
      toast({ title: "Success", description: "Production order deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    productionOrders,
    isLoading,
    createProductionOrder: createProductionOrder.mutate,
    updateProductionOrder: updateProductionOrder.mutate,
    deleteProductionOrder: deleteProductionOrder.mutate,
  };
};

export const useWorkStations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: workStations = [], isLoading } = useQuery({
    queryKey: ['work-stations'],
    queryFn: async () => {
      return await apiClient.get('/work-stations/');
    },
  });

  const createWorkStation = useMutation({
    mutationFn: async (station: WorkStationInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.post('/work-stations/', {
        ...station,
        created_by: user.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-stations'] });
      toast({ title: "Success", description: "Work station created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateWorkStation = useMutation({
    mutationFn: async ({ id, ...station }: Partial<WorkStation> & { id: string }) => {
      return await apiClient.put(`/work-stations/${id}`, station);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-stations'] });
      toast({ title: "Success", description: "Work station updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteWorkStation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/work-stations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-stations'] });
      toast({ title: "Success", description: "Work station deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    workStations,
    isLoading,
    createWorkStation: createWorkStation.mutate,
    updateWorkStation: updateWorkStation.mutate,
    deleteWorkStation: deleteWorkStation.mutate,
  };
};

export const useWorkOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: workOrders = [], isLoading } = useQuery({
    queryKey: ['work-orders'],
    queryFn: async () => {
      try {
        const response = await apiClient.getWorkOrders();
        return response.items || response || [];
      } catch (error) {
        console.error("Error fetching work orders:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createWorkOrder = useMutation({
    mutationFn: async (workOrder: WorkOrderInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.createWorkOrder(workOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      toast({ title: "Success", description: "Work order created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateWorkOrder = useMutation({
    mutationFn: async ({ id, ...workOrder }: WorkOrderUpdate & { id: string }) => {
      return await apiClient.updateWorkOrder(id, workOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      toast({ title: "Success", description: "Work order updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteWorkOrder = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteWorkOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      toast({ title: "Success", description: "Work order deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    workOrders,
    isLoading,
    createWorkOrder: createWorkOrder.mutate,
    updateWorkOrder: updateWorkOrder.mutate,
    deleteWorkOrder: deleteWorkOrder.mutate,
    isCreating: createWorkOrder.isPending,
    isUpdating: updateWorkOrder.isPending,
    isDeleting: deleteWorkOrder.isPending,
  };
};

export const useManufacturing = () => {
  const productionOrders = useProductionOrders();
  const workStations = useWorkStations();
  const workOrders = useWorkOrders();

  return {
    productionOrders: productionOrders.productionOrders,
    workStations: workStations.workStations,
    workOrders: workOrders.workOrders,
    isLoading: productionOrders.isLoading || workStations.isLoading || workOrders.isLoading,
    createProductionOrder: productionOrders.createProductionOrder,
    updateProductionOrder: productionOrders.updateProductionOrder,
    deleteProductionOrder: productionOrders.deleteProductionOrder,
    createWorkStation: workStations.createWorkStation,
    updateWorkStation: workStations.updateWorkStation,
    deleteWorkStation: workStations.deleteWorkStation,
    createWorkOrder: workOrders.createWorkOrder,
    updateWorkOrder: workOrders.updateWorkOrder,
    deleteWorkOrder: workOrders.deleteWorkOrder,
  };
};
