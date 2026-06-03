'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, MessageSquare } from 'lucide-react';
import { formatDateTime, cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: string;
  content: string;
  sources: any;
  createdAt: string;
}

interface ConversationDetail {
  id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  messages: Message[];
}

export default function AdminConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchConversation(params.id as string);
    }
  }, [params.id]);

  const fetchConversation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/conversations/${id}`);
      const data = await response.json();

      if (data.success) {
        setConversation(data.data);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!conversation) {
    return <div className="text-center py-12">Conversation not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{conversation.title}</h1>
          <p className="text-muted-foreground mt-1">
            Conversation Details
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversation.user.name}</div>
            <p className="text-xs text-muted-foreground">{conversation.user.email}</p>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded mt-2 inline-block">
              {conversation.user.role}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(conversation.createdAt).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(conversation.createdAt)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversation.messages.length}</div>
            <p className="text-xs text-muted-foreground">Total messages</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
          <CardDescription>Full message history for this conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'USER' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-4 space-y-2',
                    message.role === 'USER'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <span className="font-semibold">
                      {message.role === 'USER' ? conversation.user.name : 'AI Assistant'}
                    </span>
                    <span>{formatDateTime(message.createdAt)}</span>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.sources && Array.isArray(message.sources) && message.sources.length > 0 && (
                    <div className="text-xs pt-2 border-t border-border/50">
                      <p className="font-semibold mb-1">Sources:</p>
                      {message.sources.map((source: any, idx: number) => (
                        <p key={idx} className="opacity-70">
                          • {source.documentName}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
