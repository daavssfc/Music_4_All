import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { eventListItemSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const eventsQuerySchema = z.object({
  artist: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  when: z.enum(["upcoming", "past", "all"]).optional(),
  q: z.string().min(1).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const filters = eventsQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, unknown> = {
    offset: pagination.offset,
    limit: pagination.limit,
    now: new Date().toISOString()
  };

  if (filters.artist) {
    params.artist = filters.artist;
  }
  if (filters.city) {
    params.city = `${filters.city}*`;
  }
  if (filters.country) {
    params.country = `${filters.country}*`;
  }
  if (filters.q) {
    params.query = `${filters.q}*`;
  }

  const whenFilter =
    filters.when === "past"
      ? "dateTime(startsAt) < dateTime($now)"
      : filters.when === "upcoming"
        ? "dateTime(startsAt) >= dateTime($now)"
        : "true";

  const query = `{
    "items": *[
      _type == "event" && (!defined(status) || status == "published")
      && ${whenFilter}
      && (!defined($artist) || count(artists[]-> [slug.current == $artist]) > 0)
      && (!defined($city) || city match $city)
      && (!defined($country) || country match $country)
      && (!defined($query) || title match $query || venue match $query || pt::text(description) match $query)
    ]
    | order(startsAt asc)
    [$offset...$offset + $limit] {
      "id": _id,
      title,
      "slug": slug.current,
      "venue": coalesce(venue, null),
      "city": coalesce(city, null),
      "country": coalesce(country, null),
      "startsAt": coalesce(startsAt, null),
      "ticketUrl": coalesce(ticketUrl, null),
      "imageUrl": coalesce(image.asset->url, null),
      "artists": coalesce(artists[]->{name, "slug": slug.current}, null)
    },
    "total": count(*[
      _type == "event" && (!defined(status) || status == "published")
      && ${whenFilter}
      && (!defined($artist) || count(artists[]-> [slug.current == $artist]) > 0)
      && (!defined($city) || city match $city)
      && (!defined($country) || country match $country)
      && (!defined($query) || title match $query || venue match $query || pt::text(description) match $query)
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(eventListItemSchema).parse(response);

  return NextResponse.json(parsed);
}
