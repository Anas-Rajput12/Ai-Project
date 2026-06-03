'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, File, Globe, FileText, User, Calendar } from 'lucide-react';
import { formatBytes, formatRelativeTime } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  url?: string;
  size?: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  _count: {
    embeddings: number;
  };
}

export default function AdminDocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchAllDocuments();
    }
  }, [session]);

  const fetchAllDocuments = async () => {
    try {
      const response = await fetch('/api/admin/documents');
      const data = await response.json();

      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <File className="h-5 w-5 text-red-500" />;
      case 'URL':
        return <Globe className="h-5 w-5 text-blue-500" />;
      case 'TEXT':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5" />;
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
        <h1 className="text-3xl font-bold tracking-tight">All Knowledge Base Documents</h1>
        <p className="text-muted-foreground mt-2">
          View documents uploaded by all users
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Documents ({documents.length})
          </CardTitle>
          <CardDescription>
            All uploaded documents across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getIcon(doc.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {doc.user.name || doc.user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatRelativeTime(doc.createdAt)}
                        </span>
                        {doc.size && <span>{formatBytes(doc.size)}</span>}
                        <span>{doc._count.embeddings} chunks</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                    {doc.type}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
