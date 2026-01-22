import { describe, expect, it, vi } from "vitest";

const createRequest = (path: string, headers: Record<string, string> = {}) =>
  ({
    nextUrl: { pathname: path },
    headers: {
      get: (key: string) => headers[key.toLowerCase()] ?? null
    },
    ip: "127.0.0.1"
  }) as never;

describe("rate limit middleware", () => {
  it("allows requests under the limit", async () => {
    const { middleware } = await import("../middleware");

    const request = createRequest("/api/health", { "x-forwarded-for": "1.2.3.4" });
    const response = middleware(request);
    expect(response.status).toBeUndefined();
  });

  it("blocks requests over the limit", async () => {
    vi.stubEnv("RATE_LIMIT_MAX", "1");
    vi.stubEnv("RATE_LIMIT_WINDOW_MS", "60000");

    const { middleware } = await import("../middleware");
    const request = createRequest("/api/health", { "x-forwarded-for": "5.6.7.8" });

    middleware(request);
    const response = middleware(request);

    expect(response.status).toBe(429);

    vi.unstubAllEnvs();
  });
});
