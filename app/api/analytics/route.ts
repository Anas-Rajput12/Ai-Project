import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const [
      totalUsers,
      totalConversations,
      totalMessages,
      totalDocuments,
      recentAnalytics,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.conversation.count(),
      prisma.message.count(),
      prisma.document.count(),
      prisma.usageAnalytics.findMany({
        orderBy: { date: 'desc' },
        take: 30,
      }),
    ]);

    // Calculate active users (users with activity in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeUsers = await prisma.usageAnalytics.groupBy({
      by: ['userId'],
      where: {
        date: {
          gte: sevenDaysAgo,
        },
      },
      _count: {
        userId: true,
      },
    });

    // Calculate total tokens
    const totalTokensResult = await prisma.usageAnalytics.aggregate({
      _sum: {
        tokenCount: true,
      },
    });

    const totalTokens = totalTokensResult._sum.tokenCount || 0;

    // Prepare analytics data for charts
    const analyticsData = recentAnalytics.map((item) => ({
      date: item.date.toISOString().split('T')[0],
      conversations: item.conversationCount,
      messages: item.messageCount,
      tokens: item.tokenCount,
    }));

    const stats = {
      totalUsers,
      totalConversations,
      totalMessages,
      activeUsers: activeUsers.length,
      totalDocuments,
      totalTokens,
    };

    return NextResponse.json({
      success: true,
      data: {
        stats,
        analytics: analyticsData,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
