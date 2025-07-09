import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  job_title: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileUpdate {
  first_name?: string;
  last_name?: string;
  avatar_url?: string | null;
  phone?: string;
  job_title?: string;
  bio?: string;
}

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

interface UserPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  project_updates: boolean;
  task_assignments: boolean;
  system_maintenance: boolean;
  dark_mode: boolean;
  compact_view: boolean;
  language: string;
  timezone: string;
}

export const useProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!user) return null;
      return await apiClient.getCurrentProfile() as UserProfile;
    },
    enabled: !!user,
  });

  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      if (!user) return null;
      return await apiClient.getNotificationPreferences() as UserPreferences;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: ProfileUpdate) => {
      setIsUpdatingProfile(true);
      try {
        return await apiClient.updateCurrentProfile(profileData);
      } finally {
        setIsUpdatingProfile(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: "Success", description: "Profile updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updatePassword = useMutation({
    mutationFn: async (passwordData: PasswordUpdate) => {
      setIsUpdatingPassword(true);
      try {
        return await apiClient.changePassword(passwordData.currentPassword, passwordData.newPassword);
      } finally {
        setIsUpdatingPassword(false);
      }
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Password updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updatePreferences = useMutation({
    mutationFn: async (preferencesData: Partial<UserPreferences>) => {
      setIsUpdatingPreferences(true);
      try {
        return await apiClient.updateNotificationPreferences(preferencesData);
      } finally {
        setIsUpdatingPreferences(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
      toast({ title: "Success", description: "Preferences updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return {
    profile,
    preferences,
    isLoading: profileLoading || preferencesLoading,
    updateProfile: updateProfile.mutate,
    updatePassword: updatePassword.mutate,
    updatePreferences: updatePreferences.mutate,
    isUpdatingProfile,
    isUpdatingPassword,
    isUpdatingPreferences,
  };
};
