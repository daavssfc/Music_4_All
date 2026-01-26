/**
 * Production-ready rate limiting with Redis support
 * Falls back to in-memory for development
 */

interface RateLimitResult {
  success: boolean;
  retryAfter?: number;
}

interface RateLimitStore {
  get(key: string): Promise<{ count: number; resetAt: number } | null>;
  set(key: string, value: { count: number; resetAt: number }): Promise<void>;
}

/**
 * In-memory store for development
 * WARNING: This will not work correctly across multiple instances
 */
class InMemoryStore implements RateLimitStore {
  private store = new Map<string, { count: number; resetAt: number }>();

  async get(key: string) {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: { count: number; resetAt: number }) {
    this.store.set(key, value);
  }
}

/**
 * Redis store for production
 * Requires REDIS_URL environment variable
 *
 * Example with Upstash:
 * REDIS_URL=rediss://default:password@region.upstash.io:6379
 */
class RedisStore implements RateLimitStore {
  private redis: any;

  constructor() {
    // Lazy load Redis client only if REDIS_URL is set
    if (process.env.REDIS_URL) {
      try {
        // Using ioredis for better TypeScript support
        // Install with: pnpm add ioredis
        const Redis = require("ioredis");
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
          lazyConnect: true
        });
      } catch (error) {
        console.warn("Redis client not available, falling back to in-memory store");
        console.warn("To use Redis, install ioredis: pnpm add ioredis");
      }
    }
  }

  async get(key: string) {
    if (!this.redis) return null;

    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async set(key: string, value: { count: number; resetAt: number }) {
    if (!this.redis) return;

    try {
      const ttl = Math.ceil((value.resetAt - Date.now()) / 1000);
      if (ttl > 0) {
        await this.redis.setex(key, ttl, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Redis set error:", error);
    }
  }
}

// Singleton store instance
let storeInstance: RateLimitStore | null = null;

function getStore(): RateLimitStore {
  if (!storeInstance) {
    if (process.env.REDIS_URL) {
      console.log("Using Redis rate limit store");
      storeInstance = new RedisStore();
    } else {
      console.warn(
        "No REDIS_URL configured - using in-memory rate limiting. " +
        "This will NOT work correctly in production with multiple instances!"
      );
      storeInstance = new InMemoryStore();
    }
  }
  return storeInstance;
}

export interface RateLimitOptions {
  windowMs?: number;
  max?: number;
}

export async function rateLimit(
  identifier: string,
  options?: RateLimitOptions
): Promise<RateLimitResult> {
  const windowMs = options?.windowMs ?? 60000; // 1 minute default
  const max = options?.max ?? 120; // 120 requests per window

  const store = getStore();
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  const current = await store.get(key);

  if (!current || now > current.resetAt) {
    await store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (current.count >= max) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    return { success: false, retryAfter };
  }

  current.count += 1;
  await store.set(key, current);

  return { success: true };
}
