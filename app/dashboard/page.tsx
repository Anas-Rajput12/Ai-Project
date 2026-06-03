'use client';

import { useSession } from 'next-auth/react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Here&apos;s an overview of your AI customer support platform
          </p>
        </div>
        <Link href="/dashboard/chat">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <MessageSquare className="h-5 w-5" />
            Start Chat
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      {session?.user?.role === 'ADMIN' && (
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Analytics Overview</h2>
          <StatsCards />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/chat">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                Start Chatting
              </CardTitle>
              <CardDescription>
                Have a conversation with your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get instant answers from your knowledge base using AI-powered responses
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/knowledge">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Manage Knowledge
              </CardTitle>
              <CardDescription>
                Upload and organize your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add PDFs, URLs, or text to train your AI assistant
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              AI-Powered
            </CardTitle>
            <CardDescription>
              Powered by GPT-4o
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced RAG technology for accurate, context-aware responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Follow these steps to set up your AI assistant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base">Upload Knowledge Base</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Add PDFs, URLs, or text documents to train your AI assistant with your business information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base">Start Chatting</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Begin conversations and get AI-powered answers based on your knowledge base
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base">Monitor Performance</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Track usage, conversations, and AI performance through the analytics dashboard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
