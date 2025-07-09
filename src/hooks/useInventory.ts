import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit_price: number;
  supplier: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface InventoryItemInsert {
  name: string;
  category: string;
  stock: number;
  unit_price: number;
  supplier: string;
  status: string;
}

export const useInventory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: inventoryItems = [], isLoading } = useQuery({
    queryKey: ['inventory-items'],
    queryFn: async () => {
      try {
        const response = await apiClient.getInventoryItems();
        return response || [];
      } catch (error) {
        console.error("Error fetching inventory items:", error);
        return [];
      }
    },
    enabled: !!user,
  });

  const createInventoryItem = useMutation({
    mutationFn: async (item: InventoryItemInsert) => {
      if (!user) throw new Error('User not authenticated');
      return await apiClient.createInventoryItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      toast({ title: "Success", description: "Inventory item created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateInventoryItem = useMutation({
    mutationFn: async ({ id, ...item }: Partial<InventoryItem> & { id: string }) => {
      return await apiClient.updateInventoryItem(id, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      toast({ title: "Success", description: "Inventory item updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteInventoryItem = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteInventoryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      toast({ title: "Success", description: "Inventory item deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    inventoryItems,
    isLoading,
    createInventoryItem: createInventoryItem.mutate,
    updateInventoryItem: updateInventoryItem.mutate,
    deleteInventoryItem: deleteInventoryItem.mutate,
  };
};


