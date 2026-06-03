import { z } from 'zod';

// Auth Validation
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Chat Validation
export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(5000, 'Message too long'),
  conversationId: z.string().optional(),
});

// Knowledge Base Validation
export const documentUploadSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.enum(['PDF', 'URL', 'TEXT']),
  content: z.string().optional(),
  url: z.string().url('Invalid URL').optional(),
}).refine(
  (data) => {
    if (data.type === 'URL') return !!data.url;
    if (data.type === 'TEXT') return !!data.content;
    return true;
  },
  {
    message: 'Content or URL required based on document type',
  }
);

export const urlSchema = z.string().url('Invalid URL format');

export const textSchema = z.string().min(10, 'Text must be at least 10 characters');

// User Validation
export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .optional(),
});

// Pagination Validation
export const paginationSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// File Upload Validation
export const fileUploadSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
  size: z.number().max(10485760, 'File size must be less than 10MB'),
});

// Conversation Validation
export const createConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
});

export const updateConversationSchema = z.object({
  title: z.string().min(1).max(200),
});

// Helper function to validate and parse data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}
