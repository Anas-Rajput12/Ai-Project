import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserDocuments, processPDF, processURL, processText } from '@/lib/services/knowledge-base';

export async function GET(req: NextRequest) {
  try {
    console.log('=== Knowledge API GET called ===');
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log('Knowledge GET: No session/user');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Knowledge GET: Fetching documents for user:', session.user.id);
    const documents = await getUserDocuments(session.user.id);
    console.log('Knowledge GET: Documents fetched:', documents.length);

    return NextResponse.json({
      success: true,
      data: documents,
    });
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contentType = req.headers.get('content-type') || '';

    // Handle multipart form data (file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      const name = formData.get('name') as string;

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }

      // Check file type
      if (file.type !== 'application/pdf') {
        return NextResponse.json(
          { success: false, error: 'Only PDF files are supported' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = name || file.name;

      const document = await processPDF(buffer, session.user.id, filename);

      return NextResponse.json({
        success: true,
        data: document,
        message: 'PDF uploaded and processed successfully',
      });
    }

    // Handle JSON data (URL or text)
    const body = await req.json();
    const { type, url, content, name } = body;

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Document type is required' },
        { status: 400 }
      );
    }

    let document;

    if (type === 'URL') {
      if (!url) {
        return NextResponse.json(
          { success: false, error: 'URL is required' },
          { status: 400 }
        );
      }
      document = await processURL(url, session.user.id);
    } else if (type === 'TEXT') {
      if (!content || !name) {
        return NextResponse.json(
          { success: false, error: 'Content and name are required' },
          { status: 400 }
        );
      }
      document = await processText(content, session.user.id, name);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid document type' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Document processed successfully',
    });
  } catch (error: any) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
