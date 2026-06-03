import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MessageSquare,
  Zap,
  Shield,
  BarChart,
  Database,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PublicNav } from '@/components/layout/public-nav';

export default function HomePage() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description: 'ChatGPT-style interface with streaming responses and context-aware conversations',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'RAG Technology',
      description: 'Upload PDFs, URLs, or text to train your AI with your business knowledge',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Real-time Responses',
      description: 'Lightning-fast streaming responses powered by GPT-4o',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Role-based access, authentication, and data protection',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track usage, conversations, and performance metrics',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Sparkles,
      title: 'Source Citations',
      description: 'See exactly which documents the AI used to answer questions',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  const benefits = [
    '24/7 automated customer support',
    'Reduce support ticket volume',
    'Instant accurate answers',
    'Easy knowledge base management',
    'Scalable architecture',
    'Multi-format support (PDF, URL, Text)',
  ];

  return (
    <div className="min-h-screen">
      <PublicNav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Powered by GPT-4o
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="gradient-primary bg-clip-text text-transparent">
                AI Customer Support
              </span>
              <br />
              That Actually Works
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your customer support with an AI chatbot trained on your business knowledge.
              Get instant, accurate answers 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Login
                </Button>
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Trusted by businesses worldwide</p>
              <div className="flex items-center justify-center gap-8 opacity-50">
                <div className="h-8 w-24 bg-muted rounded"></div>
                <div className="h-8 w-24 bg-muted rounded"></div>
                <div className="h-8 w-24 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Production-ready features for enterprise customer support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} w-fit mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-50/50 dark:from-primary/5 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built with modern technologies and best practices to deliver
                a reliable, scalable customer support solution.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Simple Pricing</CardTitle>
                <CardDescription>Start free, scale as you grow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold">$0</div>
                  <p className="text-muted-foreground">Free to start</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Unlimited conversations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">50 documents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">GPT-4o powered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Analytics dashboard</span>
                  </li>
                </ul>
                <Link href="/auth/register">
                  <Button className="w-full" size="lg">
                    Get Started Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="glass border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Customer Support?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses using AI to provide better,
                faster customer support.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade AI customer support platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/auth/register" className="hover:text-primary transition-colors">Get Started</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="https://github.com/Anas-Rajput12" className="hover:text-primary transition-colors" target="_blank">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 AI Customer Support. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
