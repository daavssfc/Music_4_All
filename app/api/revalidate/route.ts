import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface RevalidatePayload {
  secret?: string;
  paths?: string[];
}

export async function POST(request: Request) {
  const token = process.env.REVALIDATION_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Revalidation token not configured." }, { status: 500 });
  }

  let payload: RevalidatePayload;

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload.secret || payload.secret !== token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const paths = payload.paths?.filter((path) => typeof path === "string") ?? [];
  const uniquePaths = Array.from(new Set(paths));

  uniquePaths.forEach((path) => {
    revalidatePath(path);
  });

  return NextResponse.json({
    revalidated: true,
    paths: uniquePaths
  });
}
