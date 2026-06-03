'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  _count: {
    messages: number;
  };
}

interface ChatSidebarProps {
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number; // Add this to trigger refresh from parent
}

export function ChatSidebar({
  currentConversationId,
  onSelectConversation,
  onNewChat,
  refreshTrigger,
}: ChatSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, [refreshTrigger]); // Refresh when trigger changes

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/chat/conversations');
      const data = await res.json();

      if (data.success) {
        setConversations(data.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load conversations',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!confirm('Are you sure you want to delete this conversation?')) {
      return;
    }

    try {
      setDeleting(id);
      const res = await fetch(`/api/chat/conversations/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Conversation deleted',
        });
        setConversations(conversations.filter((c) => c.id !== id));

        // If deleted conversation was active, start new chat
        if (currentConversationId === id) {
          onNewChat();
        }
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to delete conversation',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL conversations? This cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);

      // Delete all conversations
      const deletePromises = conversations.map((conv) =>
        fetch(`/api/chat/conversations/${conv.id}`, { method: 'DELETE' })
      );

      await Promise.all(deletePromises);

      toast({
        title: 'Success',
        description: 'All conversations deleted',
      });

      setConversations([]);
      onNewChat();
    } catch (error) {
      console.error('Error deleting all conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete all conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full border-r bg-muted/10">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <Button onClick={onNewChat} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>

        {conversations.length > 0 && (
          <Button
            onClick={handleDeleteAll}
            variant="outline"
            className="w-full gap-2 text-destructive hover:text-destructive"
            disabled={loading}
          >
            <Trash2 className="h-4 w-4" />
            Clear All History
          </Button>
        )}
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  'group relative rounded-lg transition-colors border',
                  currentConversationId === conversation.id
                    ? 'bg-accent border-primary/50'
                    : 'bg-background border-transparent hover:border-border'
                )}
              >
                <div
                  onClick={() => onSelectConversation(conversation.id)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {conversation._count.messages} messages • {formatDate(conversation.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Delete Button - Always Visible */}
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground border border-border"
                    onClick={(e) => handleDelete(conversation.id, e)}
                    disabled={deleting === conversation.id}
                    title="Delete conversation"
                  >
                    {deleting === conversation.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      {conversations.length > 0 && (
        <div className="p-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
