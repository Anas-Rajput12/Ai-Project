#!/bin/bash

# AI Customer Support SaaS - Quick Setup Script
# This script helps you set up the project quickly

echo "🚀 AI Customer Support SaaS - Quick Setup"
echo "=========================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version OK: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your configuration:"
    echo "   - DATABASE_URL: Your PostgreSQL connection string"
    echo "   - NEXTAUTH_SECRET: Generate with: openssl rand -base64 32"
    echo "   - OPENAI_API_KEY: Your OpenAI API key"
    echo ""
    read -p "Press Enter to continue after updating .env file..."
else
    echo "✅ .env file already exists"
fi
echo ""

# Setup database
echo "🗄️  Setting up database..."
echo "   Running Prisma generate..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
echo "✅ Prisma client generated"
echo ""

echo "   Pushing database schema..."
npx prisma db push
if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    echo "   Please check your DATABASE_URL in .env"
    exit 1
fi
echo "✅ Database schema pushed"
echo ""

# Seed database
read -p "🌱 Do you want to seed the database with demo data? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "   Seeding database..."
    npm run db:seed
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded"
        echo ""
        echo "📝 Demo accounts created:"
        echo "   Admin: admin@example.com / admin123"
        echo "   User:  user@example.com / user123"
    else
        echo "⚠️  Failed to seed database (optional)"
    fi
fi
echo ""

# Build check
echo "🔨 Running build check..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    echo "   Please check for errors above"
    exit 1
fi
echo "✅ Build successful"
echo ""

echo "=========================================="
echo "✨ Setup complete! You're ready to go!"
echo "=========================================="
echo ""
echo "📚 Next steps:"
echo "   1. Start development server: npm run dev"
echo "   2. Open http://localhost:3000"
echo "   3. Login with demo account or register new"
echo "   4. Upload documents to knowledge base"
echo "   5. Start chatting!"
echo ""
echo "📖 Documentation:"
echo "   - README.md: Complete guide"
echo "   - DEPLOYMENT.md: Deploy to production"
echo "   - CONTRIBUTING.md: Contribute to project"
echo ""
echo "🎉 Happy coding!"
