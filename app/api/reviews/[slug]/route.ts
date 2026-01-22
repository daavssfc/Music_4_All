import { NextResponse } from "next/server";

import { reviewDetailSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

interface ReviewParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: ReviewParams) {
  const query = `*[
    _type == "review" && status == "published" && slug.current == $slug
  ][0]{
    "id": _id,
    title,
    "slug": slug.current,
    "rating": coalesce(rating, null),
    "excerpt": coalesce(excerpt, null),
    "publishedAt": coalesce(publishedAt, null),
    "body": coalesce(body, null),
    "album": album->{
      title,
      "slug": slug.current,
      "releaseDate": coalesce(releaseDate, null),
      "label": coalesce(label, null),
      "coverImageUrl": coalesce(coverImage.asset->url, null),
      "artists": coalesce(artists[]->{name, "slug": slug.current}, null)
    },
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

  const data = await getSanityClient().fetch<unknown>(query, { slug: params.slug });

  if (!data) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const parsed = reviewDetailSchema.parse(data);

  return NextResponse.json(parsed);
}
