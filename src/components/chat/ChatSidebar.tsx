
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, Avatar as AvatarUI, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Circle } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

export const ChatSidebar: React.FC = () => {
  const { messages, typingUsers, currentUserName } = useChat();

  // Get unique users from messages
  const activeUsers = React.useMemo(() => {
    const userMap = new Map();
    
    // Add current user
    userMap.set(currentUserName, {
      name: currentUserName,
      isCurrentUser: true,
      lastActive: new Date()
    });

    // Add users from messages
    messages.forEach(message => {
      if (!userMap.has(message.user_name)) {
        userMap.set(message.user_name, {
          name: message.user_name,
          isCurrentUser: false,
          lastActive: new Date(message.created_at)
        });
      } else {
        const existing = userMap.get(message.user_name);
        const messageTime = new Date(message.created_at);
        if (messageTime > existing.lastActive) {
          existing.lastActive = messageTime;
        }
      }
    });

    return Array.from(userMap.values()).sort((a, b) => {
      if (a.isCurrentUser) return -1;
      if (b.isCurrentUser) return 1;
      return b.lastActive.getTime() - a.lastActive.getTime();
    });
  }, [messages, currentUserName]);

  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Active Users
          <Badge variant="secondary" className="ml-auto">
            {activeUsers.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {activeUsers.map((user) => {
              const isTyping = typingUsers.some(t => t.user_name === user.name);
              const initials = user.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={user.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <Circle
                      className={`absolute -bottom-1 -right-1 h-3 w-3 border-2 border-background rounded-full ${
                        user.isCurrentUser || isTyping
                          ? 'fill-green-500 text-green-500'
                          : 'fill-gray-400 text-gray-400'
                      }`}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="text-xs text-muted-foreground ml-1">(You)</span>
                      )}
                    </p>
                    {isTyping && (
                      <p className="text-xs text-muted-foreground">typing...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
