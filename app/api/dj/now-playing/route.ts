import { NextResponse } from "next/server";
import { z } from "zod";
import { getSanityUser } from "@/lib/sanity/auth";
import { platformSchema } from "@/lib/players/types";
import { upsertPlayerState } from "@/lib/players/state";

const bodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("set-fallback"),
    platform: platformSchema,
    url: z.string().url()
  }),
  z.object({
    action: z.literal("set-live"),
    platform: platformSchema,
    url: z.string().url()
  }),
  z.object({
    action: z.literal("end-live")
  })
]);

const getTokenFromHeader = (header: string | null) => {
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token.trim();
};

export async function POST(request: Request) {
  const token = getTokenFromHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json({ error: "Missing authorization token." }, { status: 401 });
  }

  const sanityUser = await getSanityUser(token);
  if (!sanityUser) {
    return NextResponse.json({ error: "Invalid Sanity token." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updatedBy = sanityUser.email || sanityUser.displayName || sanityUser.id || "sanity-user";
  const payload = parsed.data;

  try {
    const state = await upsertPlayerState(
      payload.action === "set-fallback"
        ? {
            fallback_platform: payload.platform,
            fallback_url: payload.url,
            updated_by: updatedBy
          }
        : payload.action === "set-live"
          ? {
              mode: "live",
              live_platform: payload.platform,
              live_url: payload.url,
              updated_by: updatedBy
            }
          : {
              mode: "fallback",
              updated_by: updatedBy
            }
    );

    return NextResponse.json({ state });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update player state.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
