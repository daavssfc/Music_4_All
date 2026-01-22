import { NextResponse } from "next/server";

import { eventDetailSchema } from "@/lib/contracts/models";
import { sanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

interface EventParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: EventParams) {
  const query = `*[
    _type == "event" && status == "published" && slug.current == $slug
  ][0]{
    "id": _id,
    title,
    "slug": slug.current,
    "venue": coalesce(venue, null),
    "city": coalesce(city, null),
    "country": coalesce(country, null),
    "startsAt": coalesce(startsAt, null),
    "ticketUrl": coalesce(ticketUrl, null),
    "description": coalesce(description, null),
    "imageUrl": coalesce(image.asset->url, null),
    "artists": coalesce(artists[]->{name, "slug": slug.current}, null),
    "seo": {
      "title": coalesce(seo.title, null),
      "description": coalesce(seo.description, null),
      "imageUrl": coalesce(seo.image.asset->url, null)
    }
  }`;

  const data = await sanityClient.fetch<unknown>(query, { slug: params.slug });

  if (!data) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const parsed = eventDetailSchema.parse(data);

  return NextResponse.json(parsed);
}
