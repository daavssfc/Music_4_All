# Warnings Log

This file tracks non-blocking warnings observed during local checks so they are
not forgotten and can be addressed deliberately.

## Active warnings

### 1) `REDIS_URL` not configured (rate limiting)

**Message:**
`No REDIS_URL configured - using in-memory rate limiting. This will NOT work correctly in production with multiple instances!`

**Impact:** Production rate limiting will not scale across multiple instances.

**Fix:** Set `REDIS_URL` in production (Upstash, Vercel KV, or other Redis provider).

### 2) Vite CJS Node API deprecation warning

**Message:**
`The CJS build of Vite's Node API is deprecated.`

**Impact:** No immediate breakage, but tooling will likely need upgrades.

**Fix:** Upgrade Vite/Vitest when the dependency tree supports the ESM Node API.
