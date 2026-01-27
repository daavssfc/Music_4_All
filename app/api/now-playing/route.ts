import { NextResponse } from "next/server";
import { fetchPlayerState } from "@/lib/players/state";
import { buildEmbedUrl, resolveActiveSource } from "@/lib/players/embeds";

export async function GET() {
  const { state, error } = await fetchPlayerState();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const active = resolveActiveSource(state);
  const embedUrl =
    active.platform && active.url ? buildEmbedUrl(active.platform, active.url) : null;

  return NextResponse.json(
    {
      state,
      active,
      embedUrl
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
