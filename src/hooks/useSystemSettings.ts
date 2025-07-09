import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

export interface SystemSettings {
  id: string;
  auto_backup: boolean;
  api_access: boolean;
  debug_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface SystemSettingsUpdate {
  auto_backup?: boolean;
  api_access?: boolean;
  debug_mode?: boolean;
}

export const useSystemSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: systemSettings, isLoading } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      return await apiClient.getSystemSettings();
    },
  });

  const updateSystemSettings = useMutation({
    mutationFn: async (settings: SystemSettingsUpdate) => {
      return await apiClient.updateSystemSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast({ title: 'Success', description: 'System settings updated.' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  return {
    systemSettings,
    isLoading,
    updateSystemSettings: updateSystemSettings.mutate,
    isUpdating: updateSystemSettings.isPending,
  };
};
