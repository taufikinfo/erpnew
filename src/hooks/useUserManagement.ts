import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  job_title: string | null;
  bio: string | null;
  status: 'active' | 'inactive' | 'suspended';
  last_login: string | null;
  account_locked: boolean;
  user_roles?: Array<{ role: 'admin' | 'moderator' | 'user' }>;
  created_at: string;
}

interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  job_title?: string;
  bio?: string;
}

export const useUserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Check if current user has admin role
  const isAdmin = user && (
    user.email === 'admin@erpnew.com' || 
    (user.job_title?.toLowerCase().includes('admin')) ||
    (user.job_title?.toLowerCase().includes('administrator'))
  );

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!isAdmin) {
        return [];
      }
      return await apiClient.getUsers();
    },
    enabled: !!isAdmin, // Only run the query if the user is an admin
  });

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      if (!isAdmin) {
        return [];
      }
      // For now, return mock roles since we don't have a roles endpoint
      return [
        { id: 'admin', name: 'Admin' },
        { id: 'moderator', name: 'Moderator' },
        { id: 'user', name: 'User' }
      ];
    },
    enabled: !!isAdmin, // Only run the query if the user is an admin
  });

  const resetUserPassword = useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: string; newPassword: string }) => {
      setIsResettingPassword(true);
      try {
        return await apiClient.resetUserPassword(userId, newPassword);
      } finally {
        setIsResettingPassword(false);
      }
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Password reset successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: 'active' | 'inactive' | 'suspended' }) => {
      setIsUpdatingStatus(true);
      try {
        return await apiClient.updateUserStatus(userId, status);
      } finally {
        setIsUpdatingStatus(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "Success", description: "User status updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateUserProfile = useMutation({
    mutationFn: async ({ userId, profileData }: { userId: string; profileData: UserProfileUpdate }) => {
      setIsUpdatingProfile(true);
      try {
        return await apiClient.updateUserProfile(userId, profileData);
      } finally {
        setIsUpdatingProfile(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "Success", description: "User profile updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      setIsDeletingUser(true);
      try {
        return await apiClient.deleteUser(userId);
      } finally {
        setIsDeletingUser(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "Success", description: "User deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const unlockUserAccount = useMutation({
    mutationFn: async (userId: string) => {
      return await apiClient.unlockUserAccount(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "Success", description: "User account unlocked successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Helper function for admin actions
  const adminActions = {
    resetPassword: (userId: string, newPassword: string) => resetUserPassword.mutate({ userId, newPassword }),
    updateStatus: (userId: string, status: 'active' | 'inactive' | 'suspended') => updateUserStatus.mutate({ userId, status }),
    updateProfile: (userId: string, profileData: UserProfileUpdate) => updateUserProfile.mutate({ userId, profileData }),
    deleteUser: (userId: string) => deleteUser.mutate(userId),
    unlockAccount: (userId: string) => unlockUserAccount.mutate(userId),
  };

  return {
    users,
    roles,
    usersLoading,
    rolesLoading,
    isAdmin,
    adminActions,
    resetUserPassword: resetUserPassword.mutate,
    updateUserStatus: updateUserStatus.mutate,
    updateUserProfile: updateUserProfile.mutate,
    deleteUser: deleteUser.mutate,
    unlockUserAccount: unlockUserAccount.mutate,
    isResettingPassword,
    isUpdatingStatus,
    isUpdatingProfile,
    isDeletingUser,
  };
};
