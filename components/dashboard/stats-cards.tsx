'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import {
  Users,
  MessageSquare,
  FileText,
  Activity,
  TrendingUp,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();

      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      description: 'Registered users',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Conversations',
      value: stats?.totalConversations || 0,
      icon: MessageSquare,
      description: 'Total conversations',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: FileText,
      description: 'Messages exchanged',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: Activity,
      description: 'Last 7 days',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Documents',
      value: stats?.totalDocuments || 0,
      icon: Database,
      description: 'Knowledge base items',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'AI Tokens',
      value: stats?.totalTokens || 0,
      icon: TrendingUp,
      description: 'Tokens consumed',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-3 md:h-4 bg-muted rounded w-20 md:w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 md:h-8 bg-muted rounded w-12 md:w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                <div className={cn(
                  'p-1.5 md:p-2 rounded-lg bg-gradient-to-br',
                  stat.gradient
                )}>
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                </div>
                {stat.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {stat.value.toLocaleString()}
                </CardTitle>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
