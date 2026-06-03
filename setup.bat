@echo off
REM AI Customer Support SaaS - Quick Setup Script for Windows
REM This script helps you set up the project quickly

echo 🚀 AI Customer Support SaaS - Quick Setup
echo ==========================================
echo.

REM Check Node.js version
echo 📦 Checking Node.js version...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed
    echo    Please install Node.js 18 or higher from https://nodejs.org
    exit /b 1
)
echo ✅ Node.js version OK
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Check for .env file
if not exist .env (
    echo ⚙️  Creating .env file from template...
    copy .env.example .env >nul
    echo ✅ .env file created
    echo.
    echo ⚠️  IMPORTANT: Edit .env file with your configuration:
    echo    - DATABASE_URL: Your PostgreSQL connection string
    echo    - NEXTAUTH_SECRET: Generate with: openssl rand -base64 32
    echo    - OPENAI_API_KEY: Your OpenAI API key
    echo.
    pause
) else (
    echo ✅ .env file already exists
)
echo.

REM Setup database
echo 🗄️  Setting up database...
echo    Running Prisma generate...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma client
    exit /b 1
)
echo ✅ Prisma client generated
echo.

echo    Pushing database schema...
call npx prisma db push
if %errorlevel% neq 0 (
    echo ❌ Failed to push database schema
    echo    Please check your DATABASE_URL in .env
    exit /b 1
)
echo ✅ Database schema pushed
echo.

REM Seed database
set /p SEED="🌱 Do you want to seed the database with demo data? (y/n) "
if /i "%SEED%"=="y" (
    echo    Seeding database...
    call npm run db:seed
    if %errorlevel% equ 0 (
        echo ✅ Database seeded
        echo.
        echo 📝 Demo accounts created:
        echo    Admin: admin@example.com / admin123
        echo    User:  user@example.com / user123
    ) else (
        echo ⚠️  Failed to seed database (optional)
    )
)
echo.

REM Build check
echo 🔨 Running build check...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    echo    Please check for errors above
    exit /b 1
)
echo ✅ Build successful
echo.

echo ==========================================
echo ✨ Setup complete! You're ready to go!
echo ==========================================
echo.
echo 📚 Next steps:
echo    1. Start development server: npm run dev
echo    2. Open http://localhost:3000
echo    3. Login with demo account or register new
echo    4. Upload documents to knowledge base
echo    5. Start chatting!
echo.
echo 📖 Documentation:
echo    - README.md: Complete guide
echo    - DEPLOYMENT.md: Deploy to production
echo    - CONTRIBUTING.md: Contribute to project
echo.
echo 🎉 Happy coding!
pause
