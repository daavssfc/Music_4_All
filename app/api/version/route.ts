import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    name: "music-4-all",
    version: "0.1.0"
  });
}
