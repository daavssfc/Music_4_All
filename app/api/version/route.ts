import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export function GET() {
  logger.info({ route: "/api/version" }, "Version requested");
  return NextResponse.json({
    name: "music-4-all",
    version: "0.1.0"
  });
}
