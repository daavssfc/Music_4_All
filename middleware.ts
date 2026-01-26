import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

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

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const { windowMs, max } = getRateLimitConfig();
  const clientId = getClientId(request);

  const result = await rateLimit(clientId, { windowMs, max });

  if (!result.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded." },
      {
        status: 429,
        headers: {
          "Retry-After": (result.retryAfter ?? 60).toString()
        }
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"]
};
