# Deployment Guide

This guide covers deploying your AI Customer Support SaaS to production.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Neon PostgreSQL account (free tier available)
- OpenAI API account with credits

## Step-by-Step Deployment

### 1. Prepare Your Database (Neon)

1. Go to [Neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy your connection string
4. It should look like:
   ```
   postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

### 3. Deploy to Vercel

#### Option A: Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `prisma generate && next build`
   - Output Directory: .next

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### 4. Configure Environment Variables

In Vercel dashboard → Your Project → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
OPENAI_API_KEY=sk-your-key
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
RATE_LIMIT_MAX=60
MAX_FILE_SIZE=10485760
MAX_FILES_PER_USER=50
```

#### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 5. Run Database Migrations

After deployment, run migrations:

```bash
# Install Vercel CLI if not installed
npm install -g vercel

# Link to your project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

Or use Vercel's terminal in the dashboard.

### 6. Seed the Database (Optional)

```bash
npm run db:seed
```

This creates demo accounts:
- admin@example.com / admin123
- user@example.com / user123

### 7. Verify Deployment

1. Visit your deployed URL
2. Test registration and login
3. Upload a test document
4. Try the chat interface
5. Check analytics dashboard (if admin)

## Custom Domain (Optional)

### Add Custom Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., support.yourdomain.com)
3. Configure DNS records as shown
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` environment variables
5. Redeploy

### DNS Configuration

Add these records to your DNS provider:

```
Type: A
Name: support (or @)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Environment-Specific Configuration

### Production

- Enable rate limiting
- Set `NODE_ENV=production`
- Use production database
- Enable error tracking (Sentry, etc.)
- Configure CDN for assets

### Staging

- Use separate database
- Lower rate limits for testing
- Enable debug logging
- Test new features before production

## Performance Optimization

### 1. Enable Caching

Vercel automatically caches:
- Static assets
- API routes (with proper headers)
- Page renders

### 2. Database Connection Pooling

Neon provides connection pooling automatically. Use the pooled connection string.

### 3. Image Optimization

Next.js optimizes images automatically. Use the `Image` component:

```typescript
import Image from 'next/image';

<Image src="/logo.png" width={200} height={50} alt="Logo" />
```

### 4. Bundle Size

Monitor bundle size:
```bash
npm run build
```

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics

### Error Tracking

Add Sentry (optional):

```bash
npm install @sentry/nextjs
```

Configure in `sentry.config.js`

### Logging

Use Vercel's log drain feature for centralized logging.

## Scaling Considerations

### Database

- Neon scales automatically
- Consider upgrading plan for more connections
- Enable read replicas for heavy loads

### API Routes

- Vercel serverless functions scale automatically
- Each function can handle ~1000 req/sec
- Consider edge functions for global deployment

### File Storage

For production, consider:
- AWS S3 for file storage
- Cloudflare R2
- Vercel Blob Storage

## Security in Production

### Essential Security Checklist

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables secured
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] CORS properly configured
- [ ] Database connection encrypted
- [ ] API keys rotated regularly
- [ ] Backup strategy in place

### Additional Security

1. **Web Application Firewall (WAF)**
   - Cloudflare (free tier available)
   - AWS WAF

2. **DDoS Protection**
   - Cloudflare
   - Vercel's built-in protection

3. **Secrets Management**
   - Vercel Environment Variables
   - AWS Secrets Manager
   - HashiCorp Vault

## Backup Strategy

### Database Backups

Neon provides automatic backups:
- Point-in-time restore
- Daily snapshots
- Configure retention period

### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

## Troubleshooting

### Build Failures

```bash
# Clear Vercel cache
vercel --force

# Check build logs
vercel logs
```

### Database Connection Issues

- Verify connection string
- Check SSL mode requirement
- Ensure IP whitelist (if applicable)
- Test connection locally:
  ```bash
  npx prisma db pull
  ```

### Environment Variables Not Working

- Redeploy after adding variables
- Check variable names (case-sensitive)
- Verify values don't have extra spaces
- Use Vercel CLI to verify:
  ```bash
  vercel env ls
  ```

### OpenAI API Errors

- Check API key validity
- Verify credit balance
- Monitor rate limits
- Check regional restrictions

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## Cost Estimation

### Free Tier Usage

- **Vercel**: 100GB bandwidth, 100 serverless functions
- **Neon**: 0.5 GB storage, 1 project
- **OpenAI**: Pay per token

### Scaling Costs

Typical monthly costs for 1000 users:
- Vercel Pro: $20/month
- Neon Pro: $19/month
- OpenAI: ~$50-200 (varies by usage)

**Total**: ~$90-240/month

## Support

For deployment issues:
- Check [Vercel docs](https://vercel.com/docs)
- Check [Neon docs](https://neon.tech/docs)
- Open an issue on GitHub
- Contact support@example.com

---

**Ready to deploy? Follow the steps above and you'll be live in minutes!**
