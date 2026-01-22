import { NextResponse } from "next/server";

import { artistDetailSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

interface ArtistParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: ArtistParams) {
  const query = `*[_type == "artist" && slug.current == $slug][0]{
    "id": _id,
    name,
    "slug": slug.current,
    "imageUrl": coalesce(image.asset->url, null),
    "bio": coalesce(bio, null),
    "links": coalesce(links, null)
  }`;

  const data = await getSanityClient().fetch<unknown>(query, { slug: params.slug });

  if (!data) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 });
  }

  const parsed = artistDetailSchema.parse(data);

  return NextResponse.json(parsed);
}
