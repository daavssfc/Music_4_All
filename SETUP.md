# Setup Instructions

Follow these steps to complete the setup after the DevOps improvements:

## 1. Enable pnpm

Since your project uses pnpm, you need to enable it via corepack (recommended method):

```bash
sudo corepack enable
```

This will enable pnpm globally on your system.

## 2. Install Dependencies

```bash
pnpm install
```

This will:
- Install all project dependencies
- Generate the `pnpm-lock.yaml` file (CRITICAL - this needs to be committed)
- Install the new dependencies (ioredis, husky)

## 3. Commit the Lock File

After `pnpm install`, you'll have a new `pnpm-lock.yaml` file:

```bash
git add pnpm-lock.yaml
git commit -m "chore: add pnpm-lock.yaml for reproducible builds"
git push origin main
```

**This is critical** - without this file, the CI improvements won't work properly.

## 4. Set Up Husky (Pre-commit Hooks)

```bash
pnpm prepare
```

This will initialize Husky and set up the pre-commit hooks. From now on, every commit will automatically:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Run `pnpm test`

If any of these fail, the commit will be blocked.

## 5. Enable Renovate (Optional but Recommended)

1. Go to https://github.com/apps/renovate
2. Click "Install"
3. Select your repository (`Music_4_All`)
4. Authorize the app

Renovate will now automatically create PRs for dependency updates.

## 6. Set Up Redis for Production (When Deploying)

The rate limiting now supports Redis for production deployments. You have two options:

### Option A: Upstash (Recommended - Free Tier Available)
1. Go to https://upstash.com/
2. Create a Redis database
3. Copy the connection URL
4. Add to your environment variables: `REDIS_URL=rediss://...`

### Option B: Vercel KV (If deploying to Vercel)
1. In Vercel dashboard, go to Storage → KV
2. Create a database
3. Connect it to your project
4. Vercel will automatically add the `REDIS_URL` environment variable

### Option C: Self-hosted Redis
```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Then set
REDIS_URL=redis://localhost:6379
```

## 7. Test Everything

```bash
# Run tests
pnpm test

# Run type checking
pnpm typecheck

# Build the project
pnpm build

# Try Docker build (optional)
docker build -t music4all:test .
```

## 8. Verify CI/CD

The next time you push to GitHub or open a PR, the CI pipeline will:
- Install dependencies with caching (faster)
- Use frozen lockfile (reproducible builds)
- Run lint, typecheck, tests, and build
- Run e2e tests

## Troubleshooting

### "pnpm: command not found"
Run: `sudo corepack enable`

### Pre-commit hooks not running
Run: `pnpm prepare` and make sure `.husky/pre-commit` is executable

### CI failing on "frozen-lockfile"
Make sure you committed `pnpm-lock.yaml` (step 3)

### Rate limiting not working in production
Make sure `REDIS_URL` is set in your production environment

## What's Different Now?

| Before | After |
|--------|-------|
| ❌ No lockfile | ✅ `pnpm-lock.yaml` committed |
| ❌ In-memory rate limiting | ✅ Redis-based (production-ready) |
| ❌ No Docker support | ✅ Multi-stage Dockerfile |
| ❌ No pre-commit checks | ✅ Automated lint/typecheck/test |
| ❌ Manual dependency updates | ✅ Renovate automation |
| ❌ Slow CI builds | ✅ Cached pnpm dependencies |

## Next Steps

1. Complete steps 1-4 above
2. Review the documentation in `/docs`:
   - `docs/devops-improvements.md` - Full summary of changes
   - `docs/deployment.md` - How to deploy to various platforms
   - `docs/environment-variables.md` - Environment setup guide
3. When ready to deploy, follow the deployment guide

---

**Need help?** Check the docs or review the commit message for details on all changes.
