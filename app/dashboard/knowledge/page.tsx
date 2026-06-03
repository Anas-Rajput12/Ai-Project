'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  Link as LinkIcon,
  FileText,
  Trash2,
  Loader2,
  File,
  Globe,
  Clock,
  Database
} from 'lucide-react';
import { formatBytes, formatRelativeTime } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  url?: string;
  size?: number;
  createdAt: string;
  _count: {
    embeddings: number;
  };
}

export default function KnowledgeBasePage() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadType, setUploadType] = useState<'PDF' | 'URL' | 'TEXT'>('PDF');
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [urlInput, setUrlInput] = useState('');
  const [textName, setTextName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/knowledge');
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

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', selectedFile.name);

      const response = await fetch('/api/knowledge', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'PDF uploaded and processed successfully',
        });
        setSelectedFile(null);
        fetchDocuments();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to upload PDF',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload PDF',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlUpload = async () => {
    if (!urlInput) return;

    setIsUploading(true);
    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'URL',
          url: urlInput,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'URL content extracted and processed successfully',
        });
        setUrlInput('');
        fetchDocuments();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to process URL',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process URL',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextUpload = async () => {
    if (!textName || !textContent) return;

    setIsUploading(true);
    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TEXT',
          name: textName,
          content: textContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Text content processed successfully',
        });
        setTextName('');
        setTextContent('');
        fetchDocuments();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to process text',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process text',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/knowledge/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Document deleted successfully',
        });
        fetchDocuments();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to delete document',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      });
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

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Upload and manage documents to train your AI assistant
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Upload Content</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Add PDFs, website URLs, or text content to your knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Type Selection */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={uploadType === 'PDF' ? 'default' : 'outline'}
              onClick={() => setUploadType('PDF')}
              className="gap-2 flex-1 sm:flex-initial"
              size="sm"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden xs:inline">PDF File</span>
              <span className="xs:hidden">PDF</span>
            </Button>
            <Button
              variant={uploadType === 'URL' ? 'default' : 'outline'}
              onClick={() => setUploadType('URL')}
              className="gap-2 flex-1 sm:flex-initial"
              size="sm"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="hidden xs:inline">Website URL</span>
              <span className="xs:hidden">URL</span>
            </Button>
            <Button
              variant={uploadType === 'TEXT' ? 'default' : 'outline'}
              onClick={() => setUploadType('TEXT')}
              className="gap-2 flex-1 sm:flex-initial"
              size="sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden xs:inline">Plain Text</span>
              <span className="xs:hidden">Text</span>
            </Button>
          </div>

          {/* PDF Upload */}
          {uploadType === 'PDF' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-4 md:p-8 text-center">
                <Upload className="h-8 w-8 md:h-12 md:w-12 mx-auto text-muted-foreground mb-4" />
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="max-w-xs mx-auto text-sm"
                />
                {selectedFile && (
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 break-all">
                    Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})
                  </p>
                )}
              </div>
              <Button
                onClick={handleFileUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
                size="sm"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Upload PDF'
                )}
              </Button>
            </div>
          )}

          {/* URL Upload */}
          {uploadType === 'URL' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button
                onClick={handleUrlUpload}
                disabled={!urlInput || isUploading}
                className="w-full"
                size="sm"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Extract & Upload'
                )}
              </Button>
            </div>
          )}

          {/* Text Upload */}
          {uploadType === 'TEXT' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="textName" className="text-sm">Document Name</Label>
                <Input
                  id="textName"
                  placeholder="e.g., Product Information"
                  value={textName}
                  onChange={(e) => setTextName(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textContent" className="text-sm">Content</Label>
                <Textarea
                  id="textContent"
                  placeholder="Paste your content here..."
                  className="min-h-[150px] md:min-h-[200px] text-sm"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
              <Button
                onClick={handleTextUpload}
                disabled={!textName || !textContent || isUploading}
                className="w-full"
                size="sm"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Upload Text'
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Database className="h-4 w-4 md:h-5 md:w-5" />
            Your Documents ({documents.length})
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Manage your uploaded knowledge base documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm md:text-base">No documents uploaded yet</p>
              <p className="text-xs md:text-sm">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-accent transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    {getIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm md:text-base truncate">{doc.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(doc.createdAt)}
                        </span>
                        {doc.size && <span>{formatBytes(doc.size)}</span>}
                        <span>{doc._count.embeddings} chunks</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                    className="self-end sm:self-center"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
