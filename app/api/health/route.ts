import { NextResponse } from "next/server";

import { getHealthPayload } from "@/lib/health";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export function GET() {
  logger.info({ route: "/api/health" }, "Health check requested");
  return NextResponse.json(getHealthPayload());
}
