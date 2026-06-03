import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicNav } from '@/components/layout/public-nav';

export default function AboutPage() {
  return (
    <>
      <PublicNav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About AI Customer Support</h1>
            <p className="text-xl text-muted-foreground">
              Building the future of customer support with AI technology
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                We believe that every business deserves access to world-class customer support,
                powered by cutting-edge AI technology. Our platform makes it easy for companies
                of all sizes to provide instant, accurate, and helpful support to their customers
                24/7.
              </p>
              <p className="text-muted-foreground">
                By combining GPT-4o&apos;s advanced language understanding with RAG (Retrieval-Augmented
                Generation) technology, we ensure that AI responses are always grounded in your
                actual business knowledge, not hallucinated information.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize AI-powered customer support, making enterprise-grade technology
                  accessible to businesses of all sizes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Innovation in AI technology</li>
                  <li>• Customer-first approach</li>
                  <li>• Security and privacy</li>
                  <li>• Continuous improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">What Makes Us Different</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">RAG Technology</h3>
                  <p className="text-muted-foreground">
                    Unlike generic chatbots, our AI only answers from your uploaded knowledge base,
                    ensuring accurate and relevant responses every time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Easy Setup</h3>
                  <p className="text-muted-foreground">
                    Upload PDFs, paste URLs, or add text content. Our system automatically processes
                    and indexes your knowledge for instant retrieval.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Production-Ready</h3>
                  <p className="text-muted-foreground">
                    Built with enterprise-grade security, scalability, and reliability from day one.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
