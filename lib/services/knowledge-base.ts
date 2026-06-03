import pdf from 'pdf-parse';
import * as cheerio from 'cheerio';
import axios from 'axios';
import prisma from '@/lib/db/prisma';
import { chunkText } from '@/lib/utils';
import { storeEmbeddings } from './embeddings';

/**
 * Process PDF file and extract text
 */
export async function processPDF(buffer: Buffer, userId: string, filename: string) {
  try {
    console.log('Starting PDF processing for:', filename);
    console.log('Buffer size:', buffer.length);

    // Parse PDF
    console.log('Parsing PDF...');
    const data = await pdf(buffer);
    let text = data.text;
    console.log('PDF parsed successfully. Text length:', text.length, 'Pages:', data.numpages);

    // Sanitize text: remove null bytes and invalid UTF-8 characters
    text = text
      .replace(/\0/g, '') // Remove null bytes
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters except newlines and tabs
      .trim();

    console.log('Text sanitized. Clean text length:', text.length);

    // Validate extracted text
    if (!text || text.trim().length === 0) {
      throw new Error('No text content extracted from PDF');
    }

    // Create document record
    console.log('Creating document record in database...');
    const document = await prisma.document.create({
      data: {
        userId,
        name: filename,
        type: 'PDF',
        content: text,
        size: buffer.length,
        metadata: {
          pages: data.numpages,
          info: data.info,
        },
      },
    });
    console.log('Document created with ID:', document.id);

    // Chunk the text
    console.log('Chunking text...');
    const chunks = chunkText(text, 1000, 200);
    console.log('Created', chunks.length, 'chunks');

    const chunksWithMetadata = chunks.map((chunk, index) => ({
      content: chunk,
      metadata: {
        chunkIndex: index,
        totalChunks: chunks.length,
        source: filename,
      },
    }));

    // Generate and store embeddings
    console.log('Generating embeddings...');
    await storeEmbeddings(document.id, chunksWithMetadata);
    console.log('Embeddings stored successfully');

    // Update analytics
    await updateUserAnalytics(userId, 'documentsAdded', 1);

    console.log('PDF processing completed successfully');
    return document;
  } catch (error: any) {
    console.error('❌ Error processing PDF:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to process PDF file: ${error.message}`);
  }
}

/**
 * Process URL and extract content
 */
export async function processURL(url: string, userId: string) {
  try {
    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AICustomerSupport/1.0)',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove script and style elements
    $('script, style, nav, footer, header').remove();

    // Extract text content
    const title = $('title').text() || 'Untitled';
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

    if (!bodyText) {
      throw new Error('No content found on the page');
    }

    // Create document record
    const document = await prisma.document.create({
      data: {
        userId,
        name: title,
        type: 'URL',
        url,
        content: bodyText,
        metadata: {
          fetchedAt: new Date().toISOString(),
          url,
        },
      },
    });

    // Chunk the text
    const chunks = chunkText(bodyText, 1000, 200);
    const chunksWithMetadata = chunks.map((chunk, index) => ({
      content: chunk,
      metadata: {
        chunkIndex: index,
        totalChunks: chunks.length,
        source: url,
        title,
      },
    }));

    // Generate and store embeddings
    await storeEmbeddings(document.id, chunksWithMetadata);

    // Update analytics
    await updateUserAnalytics(userId, 'documentsAdded', 1);

    return document;
  } catch (error) {
    console.error('Error processing URL:', error);
    throw new Error('Failed to process URL');
  }
}

/**
 * Process plain text content
 */
export async function processText(text: string, userId: string, name: string) {
  try {
    if (!text || text.trim().length < 10) {
      throw new Error('Text content is too short');
    }

    // Create document record
    const document = await prisma.document.create({
      data: {
        userId,
        name,
        type: 'TEXT',
        content: text,
        size: text.length,
        metadata: {
          createdAt: new Date().toISOString(),
        },
      },
    });

    // Chunk the text
    const chunks = chunkText(text, 1000, 200);
    const chunksWithMetadata = chunks.map((chunk, index) => ({
      content: chunk,
      metadata: {
        chunkIndex: index,
        totalChunks: chunks.length,
        source: name,
      },
    }));

    // Generate and store embeddings
    await storeEmbeddings(document.id, chunksWithMetadata);

    // Update analytics
    await updateUserAnalytics(userId, 'documentsAdded', 1);

    return document;
  } catch (error) {
    console.error('Error processing text:', error);
    throw new Error('Failed to process text content');
  }
}

/**
 * Get all documents for a user
 */
export async function getUserDocuments(userId: string) {
  try {
    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        type: true,
        url: true,
        size: true,
        createdAt: true,
        _count: {
          select: { embeddings: true },
        },
      },
    });

    return documents;
  } catch (error) {
    console.error('Error fetching user documents:', error);
    throw new Error('Failed to fetch documents');
  }
}

/**
 * Delete a document and its embeddings
 */
export async function deleteDocument(documentId: string, userId: string) {
  try {
    // Verify ownership
    const document = await prisma.document.findFirst({
      where: { id: documentId, userId },
    });

    if (!document) {
      throw new Error('Document not found or unauthorized');
    }

    // Delete document (embeddings will cascade)
    await prisma.document.delete({
      where: { id: documentId },
    });

    // Update analytics
    await updateUserAnalytics(userId, 'documentsAdded', -1);

    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document');
  }
}

/**
 * Helper function to update user analytics
 */
async function updateUserAnalytics(
  userId: string,
  field: 'conversationCount' | 'messageCount' | 'tokenCount' | 'documentsAdded',
  increment: number
) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analytics = await prisma.usageAnalytics.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    });

    if (analytics) {
      await prisma.usageAnalytics.update({
        where: { id: analytics.id },
        data: {
          [field]: {
            increment,
          },
        },
      });
    } else {
      await prisma.usageAnalytics.create({
        data: {
          userId,
          date: today,
          [field]: increment > 0 ? increment : 0,
        },
      });
    }
  } catch (error) {
    console.error('Error updating analytics:', error);
  }
}

export { updateUserAnalytics };
