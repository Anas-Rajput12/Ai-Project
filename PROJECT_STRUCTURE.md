# Project Structure

Complete folder and file structure of the AI Customer Support SaaS platform.

```
ai-customer-support-saas/
│
├── app/                                    # Next.js App Router
│   ├── api/                                # API Routes
│   │   ├── auth/                           # Authentication endpoints
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts                # NextAuth handler
│   │   │   ├── register/
│   │   │   │   └── route.ts                # User registration
│   │   │   └── login/                      # Login endpoint
│   │   ├── chat/                           # Chat endpoints
│   │   │   ├── route.ts                    # Send message (streaming)
│   │   │   └── conversations/
│   │   │       ├── route.ts                # List/create conversations
│   │   │       └── [id]/
│   │   │           └── route.ts            # Get/update/delete conversation
│   │   ├── knowledge/                      # Knowledge base endpoints
│   │   │   ├── route.ts                    # Upload/list documents
│   │   │   └── [id]/
│   │   │       └── route.ts                # Get/delete document
│   │   ├── analytics/
│   │   │   └── route.ts                    # Dashboard statistics
│   │   └── users/                          # User endpoints
│   │       ├── route.ts                    # List users (admin)
│   │       └── profile/
│   │           └── route.ts                # Get/update profile
│   │
│   ├── auth/                               # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx                    # Login page
│   │   └── register/
│   │       └── page.tsx                    # Registration page
│   │
│   ├── dashboard/                          # Dashboard pages
│   │   ├── layout.tsx                      # Dashboard layout
│   │   ├── page.tsx                        # Dashboard home
│   │   ├── chat/
│   │   │   └── page.tsx                    # Chat interface page
│   │   └── knowledge/
│   │       └── page.tsx                    # Knowledge base management
│   │
│   ├── (marketing)/                        # Marketing pages group
│   │
│   ├── layout.tsx                          # Root layout
│   ├── page.tsx                            # Landing page
│   ├── globals.css                         # Global styles
│   ├── loading.tsx                         # Global loading state
│   ├── error.tsx                           # Global error handler
│   └── not-found.tsx                       # 404 page
│
├── components/                             # React components
│   ├── ui/                                 # Shadcn UI components
│   │   ├── button.tsx                      # Button component
│   │   ├── card.tsx                        # Card components
│   │   ├── input.tsx                       # Input component
│   │   ├── textarea.tsx                    # Textarea component
│   │   ├── label.tsx                       # Label component
│   │   ├── toast.tsx                       # Toast notification
│   │   └── toaster.tsx                     # Toast container
│   │
│   ├── chat/                               # Chat components
│   │   └── chat-interface.tsx              # Main chat UI
│   │
│   ├── dashboard/                          # Dashboard components
│   │   └── stats-cards.tsx                 # Statistics cards
│   │
│   ├── knowledge/                          # Knowledge base components
│   │
│   └── layout/                             # Layout components
│       ├── providers.tsx                   # Context providers
│       └── dashboard-nav.tsx               # Dashboard navigation
│
├── lib/                                    # Utility libraries
│   ├── db/                                 # Database
│   │   └── prisma.ts                       # Prisma client
│   │
│   ├── services/                           # Business logic
│   │   ├── openai.ts                       # OpenAI integration
│   │   ├── embeddings.ts                   # Vector operations
│   │   └── knowledge-base.ts               # Document processing
│   │
│   ├── utils/                              # Helper functions
│   │   └── index.ts                        # Utility functions
│   │
│   └── validations/                        # Input validation
│       └── index.ts                        # Zod schemas
│
├── hooks/                                  # Custom React hooks
│   └── use-toast.ts                        # Toast hook
│
├── types/                                  # TypeScript types
│   ├── index.ts                            # Global types
│   └── next-auth.d.ts                      # NextAuth types
│
├── prisma/                                 # Database
│   ├── schema.prisma                       # Database schema
│   └── seed.ts                             # Database seeding
│
├── public/                                 # Static assets
│   ├── images/                             # Images
│   └── icons/                              # Icons
│
├── .github/                                # GitHub configuration
│   └── workflows/                          # GitHub Actions
│
├── node_modules/                           # Dependencies (gitignored)
│
├── .next/                                  # Next.js build (gitignored)
│
├── Configuration Files
├── .env                                    # Environment variables (gitignored)
├── .env.example                            # Environment template
├── .eslintrc.json                          # ESLint configuration
├── .gitignore                              # Git ignore rules
├── middleware.ts                           # Next.js middleware
├── next.config.js                          # Next.js configuration
├── next-env.d.ts                           # Next.js types
├── package.json                            # Dependencies
├── package-lock.json                       # Dependency lock
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.ts                      # Tailwind configuration
├── tsconfig.json                           # TypeScript configuration
├── vercel.json                             # Vercel deployment config
│
├── Scripts
├── setup.sh                                # Unix setup script
├── setup.bat                               # Windows setup script
│
└── Documentation
    ├── README.md                           # Main documentation
    ├── CHANGELOG.md                        # Version history
    ├── CONTRIBUTING.md                     # Contribution guide
    ├── DEPLOYMENT.md                       # Deployment guide
    ├── LICENSE                             # MIT License
    ├── SECURITY.md                         # Security policy
    └── PROJECT_STRUCTURE.md                # This file
```

## Key Directories Explained

### `/app` - Application Code
Next.js 15 App Router directory containing all pages and API routes.

### `/components` - React Components
Reusable UI components organized by feature.

### `/lib` - Business Logic
Core application logic, services, and utilities.

### `/hooks` - Custom Hooks
React hooks for shared stateful logic.

### `/types` - Type Definitions
TypeScript type definitions and interfaces.

### `/prisma` - Database
Prisma schema and database utilities.

## File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Components**: `PascalCase.tsx` (e.g., `ChatInterface.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `camelCase.ts` or `PascalCase.ts`

## Import Paths

The project uses TypeScript path aliases:

```typescript
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from '@/components/ui/button'

// Other aliases
@/components/*
@/lib/*
@/hooks/*
@/types/*
```

## Environment Variables

See `.env.example` for required environment variables:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Application URL
- `OPENAI_API_KEY` - OpenAI API key

## Build Output

When you run `npm run build`, Next.js creates:
- `.next/` - Optimized production build
- `.next/cache/` - Build cache
- `.next/server/` - Server-side code
- `.next/static/` - Static assets

## Database Files

Prisma generates:
- `node_modules/.prisma/client/` - Prisma Client
- `prisma/migrations/` - Migration history (if using migrations)

---

**Last Updated**: 2024-06-02
