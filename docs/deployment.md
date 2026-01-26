# Deployment Guide

This guide covers deploying Music_4_All to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel (Recommended)](#vercel-recommended)
- [Docker](#docker)
- [Other Platforms](#other-platforms)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:

1. ✅ A Sanity project set up (see Sanity Studio documentation)
2. ✅ Required environment variables documented (see `docs/environment-variables.md`)
3. ✅ Redis instance for production rate limiting (recommended)
4. ✅ All tests passing locally

## Vercel (Recommended)

Vercel is the easiest deployment platform for Next.js applications.

### First-Time Setup

1. **Install Vercel CLI**
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**

   Go to your project settings on Vercel dashboard:
   - Navigate to Settings → Environment Variables
   - Add all variables from `.env.example`
   - Use different values for Production, Preview, and Development

5. **Enable Vercel KV (Redis) for Rate Limiting** (Recommended)

   ```bash
   vercel env add REDIS_URL
   ```

   Or use the Vercel dashboard to add Vercel KV storage.

### Subsequent Deployments

Push to your `main` branch - Vercel will automatically deploy!

```bash
git push origin main
```

### Custom Domain

1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Docker

### Building the Image

```bash
docker build -t music4all:latest .
```

### Running Locally

```bash
docker run -p 3000:3000 \
  --env-file .env.production \
  music4all:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_BASE_URL=https://yourdomain.com
      - REDIS_URL=redis://redis:6379
    env_file:
      - .env.production
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

Run with:
```bash
docker-compose up -d
```

### Deploying to Container Platforms

#### AWS ECS/Fargate

1. Push image to ECR:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URL
   docker tag music4all:latest YOUR_ECR_URL/music4all:latest
   docker push YOUR_ECR_URL/music4all:latest
   ```

2. Create ECS task definition and service
3. Configure Application Load Balancer
4. Set up environment variables in task definition
5. Deploy using ECS CLI or AWS Console

#### Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/music4all

# Deploy
gcloud run deploy music4all \
  --image gcr.io/PROJECT_ID/music4all \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Digital Ocean App Platform

1. Connect your GitHub repository
2. Select Docker as build method
3. Configure environment variables
4. Deploy

## Other Platforms

### Netlify

While Vercel is recommended, you can deploy to Netlify:

1. Install Netlify CLI:
   ```bash
   pnpm add -g netlify-cli
   ```

2. Login and deploy:
   ```bash
   netlify login
   netlify deploy --prod
   ```

3. Configure environment variables in Netlify dashboard

### Railway

1. Connect GitHub repository to Railway
2. Add environment variables
3. Deploy automatically on push

### Render

1. Create new Web Service
2. Connect repository
3. Set build command: `pnpm install && pnpm build`
4. Set start command: `pnpm start`
5. Add environment variables

## Post-Deployment

### 1. Verify Deployment

Check these endpoints:

- `https://yourdomain.com` - Homepage loads
- `https://yourdomain.com/api/health` - Returns health status
- `https://yourdomain.com/api/version` - Returns version info

### 2. Set Up Monitoring

Recommended tools:

- **Error Tracking**: Sentry, Rollbar, or Bugsnag
- **Performance**: Vercel Analytics, New Relic, or DataDog
- **Uptime**: UptimeRobot, Pingdom, or Better Uptime
- **Logs**: Vercel Logs, CloudWatch, or Logtail

### 3. Configure Sanity Webhooks

Set up webhooks in Sanity Studio for automatic revalidation:

1. Go to Sanity project settings
2. Add webhook URL: `https://yourdomain.com/api/revalidate`
3. Add secret: Value of your `REVALIDATION_TOKEN`
4. Select events to trigger revalidation

### 4. Set Up CDN (if not using Vercel)

Configure CloudFlare, Fastly, or CloudFront for:
- Static asset caching
- DDoS protection
- SSL/TLS termination
- Geographic distribution

### 5. Security Checklist

- ✅ HTTPS enabled
- ✅ Security headers configured (already in `next.config.mjs`)
- ✅ Rate limiting active (verify Redis connection)
- ✅ Environment variables secured
- ✅ No secrets in client-side code
- ✅ CORS properly configured
- ✅ CSP headers tested

### 6. Performance Optimization

- ✅ Enable compression (gzip/brotli)
- ✅ Configure image optimization
- ✅ Set up CDN for static assets
- ✅ Monitor Core Web Vitals
- ✅ Review bundle size

### 7. Backup Strategy

- Database: Sanity handles this automatically
- Redis: Enable persistence if using self-hosted
- Backups: Consider automated snapshots

## Rollback Procedures

### Vercel
```bash
vercel rollback
```

Or use the Vercel dashboard to rollback to previous deployment.

### Docker

Keep previous images tagged:
```bash
docker tag music4all:latest music4all:v1.0.0
docker tag music4all:latest music4all:previous
```

To rollback:
```bash
docker-compose down
docker-compose up -d music4all:previous
```

## Troubleshooting

### Build Failures

- **Missing pnpm-lock.yaml**: Run `pnpm install` locally and commit the lockfile
- **TypeScript errors**: Run `pnpm typecheck` locally
- **Test failures**: Run `pnpm test` locally

### Runtime Errors

- **500 errors**: Check server logs for stack traces
- **Rate limiting issues**: Verify Redis connection
- **API errors**: Check Sanity credentials and network access

### Performance Issues

- **Slow response times**: Enable caching, check database queries
- **High memory usage**: Review Next.js build config, enable output: 'standalone'
- **Rate limit exceeded**: Adjust rate limit settings or upgrade Redis

## Support

For deployment issues:
1. Check GitHub Issues
2. Review Next.js deployment docs
3. Contact platform support (Vercel, AWS, etc.)
