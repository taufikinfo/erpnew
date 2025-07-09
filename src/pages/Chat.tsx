
import React from 'react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { PageContainer, PageHeader, PageContent } from '@/components/layout/PageContainer';

const Chat: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Team Chat"
        description="Connect and collaborate with your team in real-time"
      />

      <PageContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ChatSidebar />
          </div>
          <div className="lg:col-span-2">
            <ChatWindow />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default Chat;
