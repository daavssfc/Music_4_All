import { NextResponse } from "next/server";

import { tagListItemSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

interface TagParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: TagParams) {
  const query = `*[_type == "tag" && slug.current == $slug][0]{
    "id": _id,
    name,
    "slug": slug.current,
    type
  }`;

  const data = await getSanityClient().fetch<unknown>(query, { slug: params.slug });

  if (!data) {
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });
  }

  const parsed = tagListItemSchema.parse(data);

  return NextResponse.json(parsed);
}
