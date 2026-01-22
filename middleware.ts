import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitState = new Map<string, { count: number; resetAt: number }>();

const getClientId = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.ip ?? "unknown";
};

const getRateLimitConfig = () => {
  const windowMs = Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10);
  const max = Number.parseInt(process.env.RATE_LIMIT_MAX || "120", 10);

  return {
    windowMs: Number.isFinite(windowMs) ? windowMs : 60000,
    max: Number.isFinite(max) ? max : 120
  };
};

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const { windowMs, max } = getRateLimitConfig();
  const clientId = getClientId(request);
  const now = Date.now();
  const current = rateLimitState.get(clientId);

  if (!current || now > current.resetAt) {
    rateLimitState.set(clientId, { count: 1, resetAt: now + windowMs });
    return NextResponse.next();
  }

  if (current.count >= max) {
    const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Rate limit exceeded." },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfterSeconds.toString()
        }
      }
    );
  }

  current.count += 1;
  rateLimitState.set(clientId, current);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"]
};
