import prisma from '@/lib/db/prisma';
import { generateEmbedding } from './openai';
import { calculateCosineSimilarity } from '@/lib/utils';
import { VectorSearchResult } from '@/types';

/**
 * Store document embeddings
 */
export async function storeEmbeddings(
  documentId: string,
  chunks: Array<{ content: string; metadata?: any }>
) {
  try {
    const embeddings = [];

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.content);

      embeddings.push({
        documentId,
        content: chunk.content,
        embedding: embedding,
        metadata: chunk.metadata || {},
      });
    }

    // Store all embeddings
    await prisma.embedding.createMany({
      data: embeddings,
    });

    return embeddings.length;
  } catch (error) {
    console.error('Error storing embeddings:', error);
    throw new Error('Failed to store embeddings');
  }
}

/**
 * Search for similar content using vector similarity
 */
export async function searchSimilarContent(
  query: string,
  userId: string,
  limit: number = 5,
  minSimilarity: number = 0.5  // Lowered from 0.7 to 0.5 for better recall
): Promise<VectorSearchResult[]> {
  try {
    console.log('searchSimilarContent called:', { query, userId, limit, minSimilarity });

    // Generate embedding for the query
    console.log('Generating embedding for query...');
    const queryEmbedding = await generateEmbedding(query);
    console.log('Query embedding generated, length:', queryEmbedding.length);

    // Get all embeddings for user's documents
    console.log('Fetching embeddings for user documents...');
    const embeddings = await prisma.embedding.findMany({
      where: {
        document: {
          userId: userId,
        },
      },
      include: {
        document: true,
      },
    });
    console.log('Embeddings fetched:', embeddings.length);

    if (embeddings.length === 0) {
      console.log('⚠️  No embeddings found for user:', userId);
      return [];
    }

    // Calculate similarities
    const results: VectorSearchResult[] = [];

    for (const embedding of embeddings) {
      if (!embedding.document) {
        console.log('Skipping embedding without document:', embedding.id);
        continue;
      }

      const docEmbedding = embedding.embedding as number[];
      const similarity = calculateCosineSimilarity(queryEmbedding, docEmbedding);

      console.log(`Similarity for "${embedding.document.name}": ${similarity.toFixed(3)}`);

      if (similarity >= minSimilarity) {
        results.push({
          documentId: embedding.documentId,
          embeddingId: embedding.id,
          content: embedding.content,
          similarity,
          metadata: embedding.metadata as any,
        });
      }
    }

    // Sort by similarity and limit results
    results.sort((a, b) => b.similarity - a.similarity);
    console.log('Search results:', results.length, 'results found above', minSimilarity, 'threshold');

    if (results.length > 0) {
      console.log('Top result similarity:', results[0].similarity.toFixed(3));
    }

    return results.slice(0, limit);
  } catch (error) {
    console.error('Error in searchSimilarContent:', error);
    throw error;
  }
}

/**
 * Retrieve context for RAG
 */
export async function retrieveContext(
  query: string,
  userId: string,
  maxResults: number = 5
): Promise<string> {
  try {
    const results = await searchSimilarContent(query, userId, maxResults);

    if (results.length === 0) {
      return '';
    }

    // Combine all relevant content
    const context = results
      .map((result, index) => `[Source ${index + 1}]: ${result.content}`)
      .join('\n\n');

    return context;
  } catch (error) {
    console.error('Error retrieving context:', error);
    throw new Error('Failed to retrieve context');
  }
}

/**
 * Get document sources from search results
 */
export async function getDocumentSources(
  query: string,
  userId: string
): Promise<Array<{ documentId: string; documentName: string; content: string; similarity: number }>> {
  try {
    const results = await searchSimilarContent(query, userId);

    // Get document details
    const sources = await Promise.all(
      results.map(async (result) => {
        const document = await prisma.document.findUnique({
          where: { id: result.documentId },
          select: { id: true, name: true },
        });

        return {
          documentId: result.documentId,
          documentName: document?.name || 'Unknown Document',
          content: result.content,
          similarity: result.similarity,
        };
      })
    );

    return sources;
  } catch (error) {
    console.error('Error getting document sources:', error);
    return [];
  }
}
