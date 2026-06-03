# AI Customer Support Chatbot SaaS

A production-ready, enterprise-grade AI-powered customer support chatbot platform built with Next.js, TypeScript, OpenAI GPT-4o, and RAG (Retrieval-Augmented Generation) technology.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.19-2D3748)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991)

## 🌟 Features

### Core Features
- **AI Chat Assistant** - ChatGPT-style interface with real-time streaming responses
- **RAG Technology** - Upload PDFs, URLs, or text to train your AI with business knowledge
- **Knowledge Base Management** - Easy document upload and management system
- **Source Citations** - See which documents the AI used to answer questions
- **User Authentication** - Secure NextAuth-based authentication with role management
- **Admin Dashboard** - Comprehensive analytics and usage statistics
- **Dark/Light Mode** - Beautiful UI with theme switching
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Technical Features
- Vector embeddings for semantic search
- Streaming chat responses
- Rate limiting and security headers
- Input validation and sanitization
- PostgreSQL database with Prisma ORM
- Type-safe API routes
- Server-side rendering (SSR)
- Modern component architecture

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Radix UI** - Accessible components
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth** - Authentication
- **Prisma** - ORM and database toolkit
- **PostgreSQL** - Primary database
- **OpenAI API** - GPT-4o and embeddings

### Additional Libraries
- **Zod** - Schema validation
- **Bcryptjs** - Password hashing
- **Axios** - HTTP client
- **Cheerio** - Web scraping
- **pdf-parse** - PDF text extraction
- **date-fns** - Date utilities
- **Recharts** - Data visualization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or higher
- npm or yarn package manager
- PostgreSQL database (local or cloud)
- OpenAI API key

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-customer-support-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_support_saas?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key-here"

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Rate Limiting (requests per minute)
RATE_LIMIT_MAX=60

# Upload Limits
MAX_FILE_SIZE=10485760
MAX_FILES_PER_USER=50
```

#### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Set Up the Database

#### Option A: Using Local PostgreSQL

```bash
# Create database
createdb ai_support_saas

# Push schema to database
npm run db:push
```

#### Option B: Using Neon (Recommended for Production)

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update `DATABASE_URL` in `.env`
5. Run migrations:

```bash
npm run db:push
```

### 5. Seed the Database (Optional)

```bash
npm run db:seed
```

This creates demo users:
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 OpenAI API Setup

1. Create an account at [OpenAI](https://platform.openai.com)
2. Generate an API key from the [API Keys page](https://platform.openai.com/api-keys)
3. Add the key to your `.env` file as `OPENAI_API_KEY`
4. Ensure you have credits in your OpenAI account

**Note**: The application uses:
- `gpt-4o` for chat completions
- `text-embedding-3-small` for embeddings

## 📁 Project Structure

```
ai-customer-support-saas/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── chat/                 # Chat endpoints
│   │   ├── knowledge/            # Knowledge base endpoints
│   │   ├── analytics/            # Analytics endpoints
│   │   └── users/                # User management endpoints
│   ├── auth/                     # Auth pages (login, register)
│   ├── dashboard/                # Dashboard pages
│   │   ├── chat/                 # Chat interface
│   │   ├── knowledge/            # Knowledge base management
│   │   └── page.tsx              # Dashboard home
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   ├── chat/                     # Chat components
│   ├── dashboard/                # Dashboard components
│   ├── knowledge/                # Knowledge base components
│   └── layout/                   # Layout components
├── lib/                          # Utility libraries
│   ├── db/                       # Database client
│   ├── services/                 # Business logic
│   │   ├── openai.ts             # OpenAI integration
│   │   ├── embeddings.ts         # Vector operations
│   │   └── knowledge-base.ts     # Document processing
│   ├── utils/                    # Helper functions
│   └── validations/              # Zod schemas
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript types
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema
│   └── seed.ts                   # Database seeding
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware (auth, security)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🔒 Security Features

- **Authentication**: NextAuth with JWT strategy
- **Password Hashing**: Bcrypt with salt rounds
- **Rate Limiting**: 60 requests per minute per IP
- **Security Headers**: CSP, XSS protection, frame options
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Protection**: Prisma parameterized queries
- **CSRF Protection**: Built into NextAuth
- **Environment Variables**: Secure credential storage

## 📊 Database Schema

### Models

- **User** - User accounts with authentication
- **Conversation** - Chat conversations
- **Message** - Individual chat messages
- **Document** - Uploaded knowledge base documents
- **Embedding** - Vector embeddings for RAG
- **UsageAnalytics** - Usage tracking and statistics

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables for Production

Add these to your Vercel project settings:

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET` - Generated secret (use `openssl rand -base64 32`)
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - `production`

### Database Setup for Production

1. Create a Neon database
2. Copy connection string
3. Add to Vercel environment variables
4. Run migrations:

```bash
npx prisma migrate deploy
```

## 🎯 Usage Guide

### 1. Register an Account
- Navigate to `/auth/register`
- Create your account
- Login with credentials

### 2. Upload Knowledge Base
- Go to Dashboard → Knowledge Base
- Upload PDF files, URLs, or text content
- Wait for processing (creates embeddings)

### 3. Start Chatting
- Go to Dashboard → Chat
- Ask questions about your knowledge base
- AI will answer based only on uploaded content

### 4. Monitor Analytics (Admin)
- View dashboard statistics
- Track conversations and usage
- Monitor AI token consumption

## 📚 API Documentation

### Authentication

#### POST `/api/auth/register`
Register a new user

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

#### POST `/api/auth/login`
Login (handled by NextAuth)

### Chat

#### POST `/api/chat`
Send a message (streaming response)

```json
{
  "message": "What are your business hours?",
  "conversationId": "optional-conversation-id"
}
```

#### GET `/api/chat/conversations`
Get user conversations

#### GET `/api/chat/conversations/[id]`
Get specific conversation with messages

### Knowledge Base

#### POST `/api/knowledge`
Upload document (PDF, URL, or TEXT)

```json
{
  "type": "URL",
  "url": "https://example.com"
}
```

#### GET `/api/knowledge`
Get all user documents

#### DELETE `/api/knowledge/[id]`
Delete a document

### Analytics

#### GET `/api/analytics`
Get dashboard statistics (Admin only)

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Type Checking
npx tsc --noEmit         # Check TypeScript errors
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: "hsl(221.2 83.2% 53.3%)",
  // ... other colors
}
```

### Branding

1. Replace logo in `components/layout/dashboard-nav.tsx`
2. Update app name in `app/layout.tsx`
3. Change favicon in `public/`

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### OpenAI API Errors

- Check API key is valid
- Verify you have credits
- Check rate limits

### Build Errors

```bash
# Clear cache
rm -rf .next
npm run build
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@example.com

## 🙏 Acknowledgments

- OpenAI for GPT-4o API
- Vercel for hosting platform
- Shadcn for UI components
- Prisma for database toolkit

---

**Built with ❤️ for the modern web**
