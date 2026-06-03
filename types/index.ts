import { User, Conversation, Message, Document, Embedding, UsageAnalytics } from '@prisma/client';

// Auth Types
export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
  token?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: DocumentSource[];
  createdAt: Date;
}

export interface DocumentSource {
  documentId: string;
  documentName: string;
  content: string;
  similarity: number;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
}

// Knowledge Base Types
export interface UploadDocumentRequest {
  name: string;
  type: 'PDF' | 'URL' | 'TEXT';
  content?: string;
  url?: string;
  file?: File;
}

export interface DocumentWithEmbeddings extends Document {
  embeddings: Embedding[];
}

// Analytics Types
export interface DashboardStats {
  totalUsers: number;
  totalConversations: number;
  totalMessages: number;
  activeUsers: number;
  totalDocuments: number;
  totalTokens: number;
}

export interface AnalyticsData {
  date: string;
  conversations: number;
  messages: number;
  tokens: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Extended Types with Relations
export interface ConversationWithMessages extends Conversation {
  messages: Message[];
  user: User;
}

export interface UserWithRelations extends User {
  conversations: Conversation[];
  documents: Document[];
  analytics: UsageAnalytics[];
}

// Vector Search Types
export interface VectorSearchResult {
  documentId: string;
  embeddingId: string;
  content: string;
  similarity: number;
  metadata?: any;
}

// Streaming Types
export interface StreamMessage {
  type: 'token' | 'done' | 'error';
  content?: string;
  error?: string;
}
