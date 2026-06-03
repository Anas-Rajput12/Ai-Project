'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Trash2, Eye, Calendar } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  _count: {
    messages: number;
  };
  messages: Array<{
    content: string;
    createdAt: string;
  }>;
}

export default function AdminConversationsPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchAllConversations();
    }
  }, [session]);

  const fetchAllConversations = async () => {
    try {
      const response = await fetch('/api/admin/conversations');
      const data = await response.json();

      if (data.success) {
        setConversations(data.data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Admin access required</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All User Conversations</h1>
        <p className="text-muted-foreground mt-2">
          View and manage conversations from all users
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversations ({conversations.length})
          </CardTitle>
          <CardDescription>
            All conversations across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{conv.title}</h4>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {conv.user.name || conv.user.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatRelativeTime(conv.createdAt)}
                      </span>
                      <span>{conv._count.messages} messages</span>
                    </div>
                    {conv.messages[0] && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {conv.messages[0].content}
                      </p>
                    )}
                  </div>
                  <Link href={`/dashboard/admin/conversations/${conv.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
