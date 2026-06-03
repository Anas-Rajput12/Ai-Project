'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChatInterface } from '@/components/chat/chat-interface';
import { ChatSidebar } from '@/components/chat/chat-sidebar';
import { MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [refreshSidebar, setRefreshSidebar] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewChat = () => {
    setConversationId(undefined);
    setIsSidebarOpen(false); // Close mobile sidebar
  };

  const handleSelectConversation = (id: string) => {
    setConversationId(id);
    setIsSidebarOpen(false); // Close mobile sidebar
  };

  const handleConversationCreated = (id: string) => {
    setConversationId(id);
    setRefreshSidebar((prev) => prev + 1); // Trigger sidebar refresh
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Ask questions and get answers from your knowledge base
          </p>
        </div>

        {/* Mobile Sidebar Toggle */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[300px]">
            <ChatSidebar
              currentConversationId={conversationId}
              onSelectConversation={handleSelectConversation}
              onNewChat={handleNewChat}
              refreshTrigger={refreshSidebar}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Chat Area with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-250px)] md:h-[calc(100vh-220px)]">
        {/* Desktop Sidebar */}
        <Card className="overflow-hidden hidden lg:block">
          <ChatSidebar
            currentConversationId={conversationId}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            refreshTrigger={refreshSidebar}
          />
        </Card>

        {/* Chat Interface */}
        <Card className="flex flex-col overflow-hidden">
          <ChatInterface
            conversationId={conversationId}
            onConversationCreated={handleConversationCreated}
          />
        </Card>
      </div>

      {/* Pro Tip */}
      <div className="glass rounded-lg p-3 md:p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-xs md:text-sm">Pro Tip</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              The AI assistant will only answer based on your uploaded knowledge base.
              Make sure to add relevant documents in the Knowledge Base section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
