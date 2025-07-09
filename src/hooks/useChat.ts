import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface TypingIndicator {
  id: string;
  user_id: string;
  user_name: string;
  is_typing: boolean;
  created_at: string;
  updated_at: string;
}

export const useChat = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      return await apiClient.getChatMessages();
    },
    refetchInterval: 2000, // Poll for new messages every 2 seconds
    enabled: !!user, // Only fetch if user is logged in
  });

  // Fetch typing indicators
  const { data: typingUsers = [] } = useQuery({
    queryKey: ['typing-indicators'],
    queryFn: async () => {
      return await apiClient.getTypingIndicators();
    },
    refetchInterval: 1000, // Poll for typing indicators every second
    enabled: !!user, // Only fetch if user is logged in
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiClient.sendChatMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update typing indicator mutation
  const updateTypingMutation = useMutation({
    mutationFn: async (isTyping: boolean) => {
      return await apiClient.updateTypingIndicator(isTyping);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['typing-indicators'] });
    },
    onError: (error: Error) => {
      console.error('Failed to update typing indicator:', error);
    },
  });

  // Send message function
  const sendMessage = async (content: string) => {
    if (!user) {
      toast({ title: "Error", description: "Please log in to send messages", variant: "destructive" });
      return;
    }
    await sendMessageMutation.mutateAsync(content);
  };

  // Update typing status function
  const updateTypingStatus = (isTyping: boolean) => {
    if (!user) return;
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Update typing status
    updateTypingMutation.mutate(isTyping);

    // If starting to type, set timeout to auto-stop
    if (isTyping) {
      const timeout = setTimeout(() => {
        updateTypingMutation.mutate(false);
      }, 3000);
      setTypingTimeout(timeout);
    }
  };

  // Get current user's display name
  const currentUserName = user ? 
    (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email) : 
    'Unknown User';

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return {
    messages: messages as Message[],
    typingUsers: typingUsers as TypingIndicator[],
    isLoading,
    sendMessage,
    updateTypingStatus,
    currentUserName,
    isSending: sendMessageMutation.isPending,
  };
};
