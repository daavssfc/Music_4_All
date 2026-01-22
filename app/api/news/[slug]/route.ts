import { NextResponse } from "next/server";

import { postDetailSchema } from "@/lib/contracts/models";
import { sanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

interface PostParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: PostParams) {
  const query = `*[
    _type == "post" && status == "published" && slug.current == $slug
  ][0]{
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, null),
    "publishedAt": coalesce(publishedAt, null),
    "body": coalesce(body, null),
    "author": author->{
      name,
      handle,
      "slug": slug.current,
      role,
      "avatarUrl": coalesce(avatar.asset->url, null)
    },
    "tags": coalesce(tags[]->{name, "slug": slug.current, type}, null),
    "seo": {
      "title": coalesce(seo.title, null),
      "description": coalesce(seo.description, null),
      "imageUrl": coalesce(seo.image.asset->url, null)
    }
  }`;

  const data = await sanityClient.fetch<unknown>(query, { slug: params.slug });

  if (!data) {
    return NextResponse.json({ error: "News post not found" }, { status: 404 });
  }

  const parsed = postDetailSchema.parse(data);

  return NextResponse.json(parsed);
}
