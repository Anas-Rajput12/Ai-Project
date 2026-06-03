# Quick Start Guide

Get your AI Customer Support SaaS up and running in 5 minutes!

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] Git installed ([Download](https://git-scm.com))
- [ ] A code editor (VS Code recommended)
- [ ] PostgreSQL database (or Neon account)
- [ ] OpenAI API account with credits

## 5-Minute Setup

### Step 1: Get the Code (30 seconds)

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-customer-support-saas
```

### Step 2: Run Setup Script (3 minutes)

#### On Mac/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

#### On Windows:
```bash
setup.bat
```

The script will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Create .env file
- ✅ Setup database
- ✅ Seed demo data
- ✅ Verify build

### Step 3: Configure Environment (1 minute)

Edit `.env` file with your credentials:

```env
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
OPENAI_API_KEY="sk-your-key"
```

#### Quick Config Help:

**Database URL**:
- Local: `postgresql://user:password@localhost:5432/ai_support`
- Neon: Get from [neon.tech](https://neon.tech) (free tier available)

**NextAuth Secret**:
```bash
openssl rand -base64 32
```

**OpenAI Key**:
- Get from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Step 4: Start Development (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Login

Use demo accounts created during setup:

**Admin Account**:
- Email: `admin@example.com`
- Password: `admin123`

**User Account**:
- Email: `user@example.com`
- Password: `user123`

## Your First Conversation

1. **Login** with demo account
2. **Go to Knowledge Base** (Dashboard → Knowledge Base)
3. **Upload a document**:
   - Try a PDF file
   - Or paste text content
   - Or add a website URL
4. **Start Chatting** (Dashboard → Chat)
5. **Ask questions** about your uploaded content

## Manual Setup (If Script Fails)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Seed Database (Optional)
```bash
npm run db:seed
```

### 5. Start Development
```bash
npm run dev
```

## Common Issues & Solutions

### Issue: "DATABASE_URL is not set"
**Solution**: Make sure your `.env` file exists and contains `DATABASE_URL`

### Issue: "OpenAI API error"
**Solution**: 
- Check your API key is correct
- Verify you have credits in OpenAI account
- Ensure no extra spaces in `.env`

### Issue: "Port 3000 already in use"
**Solution**: 
```bash
# Use different port
PORT=3001 npm run dev
```

### Issue: Database connection fails
**Solution**:
- Check DATABASE_URL format
- Ensure database server is running
- Test connection: `npx prisma db pull`

### Issue: Build errors
**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Next Steps

### Explore Features

1. **Dashboard**: View analytics and statistics
2. **Chat**: Test AI responses
3. **Knowledge Base**: Upload more documents
4. **Profile**: Update your account

### Customize

1. **Branding**: Change app name and colors
2. **Theme**: Modify Tailwind config
3. **Content**: Update landing page

### Deploy

Ready for production? See [DEPLOYMENT.md](DEPLOYMENT.md)

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open database viewer
npm run db:seed          # Seed demo data

# Code Quality
npm run lint             # Run linter
npx tsc --noEmit         # Check TypeScript
```

## Project Structure

```
Key folders:
├── app/              # Pages and API routes
├── components/       # React components
├── lib/             # Business logic
└── prisma/          # Database schema
```

Full structure: See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## Learning Resources

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Get Help

- 📖 Read [README.md](README.md) for full documentation
- 🐛 Report bugs on GitHub Issues
- 💬 Ask questions in Discussions
- 📧 Email support@example.com

## What's Next?

### Immediate (Today)
- [ ] Login and explore dashboard
- [ ] Upload your first document
- [ ] Have your first AI conversation
- [ ] Customize app branding

### Short-term (This Week)
- [ ] Add all your knowledge base content
- [ ] Test with real questions
- [ ] Invite team members
- [ ] Set up analytics tracking

### Long-term (This Month)
- [ ] Deploy to production
- [ ] Configure custom domain
- [ ] Set up monitoring
- [ ] Scale as needed

---

**Ready to build amazing AI customer support? Let's go! 🚀**
