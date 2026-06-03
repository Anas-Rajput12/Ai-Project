import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db/prisma';
import { generateStreamingChatCompletion, estimateTokenCount } from '@/lib/services/openai';
import { retrieveContext, getDocumentSources } from '@/lib/services/embeddings';
import { updateUserAnalytics } from '@/lib/services/knowledge-base';
import { chatMessageSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    console.log('=== Chat API called ===');
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log('Unauthorized: No session');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Session user:', session.user.id);

    const body = await req.json();
    console.log('Request body:', body);

    const validation = chatMessageSchema.safeParse(body);

    if (!validation.success) {
      console.error('Validation failed:', validation.error.errors);
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { message, conversationId } = validation.data;
    const userId = session.user.id;

    console.log('Processing message:', { message, conversationId, userId });

    // Get or create conversation
    let conversation;
    if (conversationId) {
      console.log('Fetching existing conversation:', conversationId);
      conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });

      if (!conversation) {
        console.error('Conversation not found:', conversationId);
        return NextResponse.json(
          { success: false, error: 'Conversation not found' },
          { status: 404 }
        );
      }
      console.log('Conversation found with', conversation.messages.length, 'messages');
    } else {
      console.log('Creating new conversation');
      conversation = await prisma.conversation.create({
        data: {
          userId,
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        },
        include: { messages: true },
      });
      console.log('New conversation created:', conversation.id);

      // Update analytics for new conversation
      await updateUserAnalytics(userId, 'conversationCount', 1);
    }

    // Save user message
    console.log('Saving user message...');
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'USER',
        content: message,
      },
    });
    console.log('User message saved');

    // Get context from knowledge base using RAG
    console.log('Retrieving context from knowledge base...');
    let context = '';
    let sources: any[] = [];

    try {
      context = await retrieveContext(message, userId, 5);
      console.log('Context retrieved, length:', context.length);

      console.log('Getting document sources...');
      sources = await getDocumentSources(message, userId);
      console.log('Sources retrieved:', sources.length);
    } catch (error) {
      console.error('Error retrieving context/sources (continuing without RAG):', error);
      // Continue without RAG if it fails
      context = '';
      sources = [];
    }

    // Build conversation history
    console.log('Building conversation history...');
    const conversationHistory = conversation.messages.slice(-10).map((msg) => ({
      role: msg.role.toLowerCase() as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));
    console.log('Conversation history built:', conversationHistory.length, 'messages');

    // System prompt with RAG context
    const systemPrompt = context
      ? `You are a helpful AI customer support assistant. Answer questions based ONLY on the following knowledge base context. If the answer is not in the context, politely say you don't have that information.

Context from knowledge base:
${context}

Instructions:
- Only use information from the context above
- Be concise and helpful
- If you're unsure or the information isn't in the context, admit it
- Maintain a professional and friendly tone`
      : `You are a helpful AI customer support assistant. Currently, there is no knowledge base available. Politely inform the user that they need to upload knowledge base documents first to get specific information, but you can still help with general questions.`;

    console.log('System prompt prepared, length:', systemPrompt.length);

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message },
    ];

    console.log('Calling OpenAI API...');
    // Generate streaming response
    const stream = await generateStreamingChatCompletion(messages);
    console.log('OpenAI stream started');

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    let fullResponse = '';

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              fullResponse += content;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }

          // Save assistant message
          const tokenCount = estimateTokenCount(fullResponse);
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: 'ASSISTANT',
              content: fullResponse,
              sources: sources.length > 0 ? sources : null,
              tokenCount,
            },
          });

          // Update analytics
          await updateUserAnalytics(userId, 'messageCount', 2); // User + Assistant
          await updateUserAnalytics(userId, 'tokenCount', tokenCount);

          // Send completion event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                conversationId: conversation.id,
                sources,
              })}\n\n`
            )
          );

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'error',
                error: 'Failed to generate response',
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
