import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db/prisma';
import { generateEmbedding } from '@/lib/services/openai';

export async function GET(req: NextRequest) {
  const results: any = {
    session: null,
    database: null,
    openai: null,
    documents: null,
  };

  try {
    // Test 1: Session
    console.log('Testing session...');
    const session = await getServerSession(authOptions);
    results.session = session ? { userId: session.user?.id, email: session.user?.email } : 'No session';

    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Not authenticated', results });
    }

    const userId = session.user.id;

    // Test 2: Database connection
    console.log('Testing database...');
    const userCount = await prisma.user.count();
    results.database = `Connected (${userCount} users)`;

    // Test 3: User documents
    console.log('Testing user documents...');
    const documents = await prisma.document.findMany({
      where: { userId },
      select: { id: true, name: true },
    });
    results.documents = `${documents.length} documents found`;

    // Test 4: OpenAI API
    console.log('Testing OpenAI API...');
    const embedding = await generateEmbedding('test');
    results.openai = `Working (embedding length: ${embedding.length})`;

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      results
    }, { status: 500 });
  }
}
