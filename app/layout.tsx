import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Customer Support - Enterprise Chatbot SaaS',
  description: 'Production-ready AI-powered customer support chatbot platform with RAG capabilities',
  keywords: ['AI', 'Customer Support', 'Chatbot', 'SaaS', 'RAG', 'OpenAI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}</Providers>
      </body>
    </html>
  );
}
