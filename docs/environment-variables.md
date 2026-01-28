# Environment Variables

This document describes all environment variables used in the Music_4_All application.

## Required Variables

### Application

- `NEXT_PUBLIC_BASE_URL` - Public base URL for the application (e.g., `https://music4all.com`)
  - Used for server-side fetches and SEO
  - Should be set in production

### Sanity CMS

#### Public Variables (exposed to the browser)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (format: `YYYY-MM-DD`, e.g., `2024-01-01`)

#### Server-only Variables
- `SANITY_PROJECT_ID` - Server-side Sanity project ID
- `SANITY_DATASET` - Server-side dataset name
- `SANITY_API_VERSION` - Server-side API version
- `SANITY_READ_TOKEN` - Optional read token for private datasets
- `SANITY_ORG_ID` - Optional organization ID for CLI operations

## Health check

`GET /api/health` returns `env.ok=false` and lists missing variables if required values are not set.

## Optional Variables

### Rate Limiting

- `RATE_LIMIT_WINDOW_MS` - Time window in milliseconds (default: `60000` = 1 minute)
- `RATE_LIMIT_MAX` - Maximum requests per window (default: `120`)
- `REDIS_URL` - Redis connection URL for distributed rate limiting
  - **Production**: Highly recommended to use Redis (e.g., Upstash, Redis Cloud)
  - **Development**: Can use in-memory store
  - **Format**: `redis://host:port` or `rediss://host:port` (SSL)
  - **Example**: `rediss://default:password@us1-humble-dodo-12345.upstash.io:6379`

### Revalidation

- `REVALIDATION_TOKEN` - Secret token for webhook-based revalidation
  - Used to securely trigger on-demand revalidation from Sanity webhooks
  - Should be a strong random string in production

### Node Environment

- `NODE_ENV` - Node environment (`development`, `production`, `test`)
  - Usually set automatically by your hosting platform
  - Affects logging, error handling, and optimizations

## Setting Up Environment Variables

### Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in required values in `.env.local`

3. Never commit `.env.local` to version control

### Production

Set environment variables in your hosting platform:

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate values
3. Specify environment (Production, Preview, Development)

#### Docker
1. Create `.env.production` file (add to `.gitignore`)
2. Use `--env-file` flag:
   ```bash
   docker run --env-file .env.production your-image
   ```

#### Kubernetes
Use ConfigMaps for non-sensitive data and Secrets for sensitive data:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: music4all-secrets
type: Opaque
stringData:
  SANITY_READ_TOKEN: "your-token"
  REDIS_URL: "your-redis-url"
```

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use different values** for development and production
3. **Rotate secrets regularly**, especially:
   - `SANITY_READ_TOKEN`
   - `REVALIDATION_TOKEN`
4. **Use secret management** in production (AWS Secrets Manager, Vault, etc.)
5. **Prefix public variables** with `NEXT_PUBLIC_` only if they need browser access
6. **Validate environment variables** at application startup

## Validation

The application validates critical environment variables at startup. If required variables are missing, the application will log warnings or fail to start depending on the severity.

## Examples

### Development `.env.local`
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=120
```

### Production (example)
```env
NEXT_PUBLIC_BASE_URL=https://music4all.com
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=sk_prod_xxxxxxxxxxxxxxxxxxxxxx
REVALIDATION_TOKEN=super-secret-webhook-token-xyz123
REDIS_URL=rediss://default:password@region.upstash.io:6379
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
```
