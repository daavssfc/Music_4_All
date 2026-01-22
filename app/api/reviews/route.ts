import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { reviewListItemSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const reviewsQuerySchema = z.object({
  tag: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  ratingMin: z.coerce.number().min(0).max(10).optional(),
  ratingMax: z.coerce.number().min(0).max(10).optional(),
  q: z.string().min(1).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const filters = reviewsQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, unknown> = {
    offset: pagination.offset,
    limit: pagination.limit
  };

  if (filters.tag) {
    params.tag = filters.tag;
  }
  if (filters.genre) {
    params.genre = filters.genre;
  }
  if (filters.artist) {
    params.artist = filters.artist;
  }
  if (filters.ratingMin !== undefined) {
    params.ratingMin = filters.ratingMin;
  }
  if (filters.ratingMax !== undefined) {
    params.ratingMax = filters.ratingMax;
  }
  if (filters.q) {
    params.query = `${filters.q}*`;
  }
  if (filters.year) {
    params.yearStart = `${filters.year}-01-01T00:00:00.000Z`;
    params.yearEnd = `${filters.year + 1}-01-01T00:00:00.000Z`;
  }

  const query = `{
    "items": *[
      _type == "review" && status == "published"
      && (!defined($tag) || count(tags[]-> [slug.current == $tag]) > 0)
      && (!defined($genre) || count(tags[]-> [slug.current == $genre && type == "genre"]) > 0)
      && (!defined($artist) || count(album->artists[]-> [slug.current == $artist]) > 0)
      && (!defined($ratingMin) || rating >= $ratingMin)
      && (!defined($ratingMax) || rating <= $ratingMax)
      && (!defined($yearStart) || (publishedAt >= $yearStart && publishedAt < $yearEnd))
      && (!defined($query) || title match $query || excerpt match $query || pt::text(body) match $query)
    ]
    | order(publishedAt desc)
    [$offset...$offset + $limit] {
      "id": _id,
      title,
      "slug": slug.current,
      "rating": coalesce(rating, null),
      "excerpt": coalesce(excerpt, null),
      "publishedAt": coalesce(publishedAt, null),
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
      "tags": coalesce(tags[]->{name, "slug": slug.current, type}, null)
    },
    "total": count(*[
      _type == "review" && status == "published"
      && (!defined($tag) || count(tags[]-> [slug.current == $tag]) > 0)
      && (!defined($genre) || count(tags[]-> [slug.current == $genre && type == "genre"]) > 0)
      && (!defined($artist) || count(album->artists[]-> [slug.current == $artist]) > 0)
      && (!defined($ratingMin) || rating >= $ratingMin)
      && (!defined($ratingMax) || rating <= $ratingMax)
      && (!defined($yearStart) || (publishedAt >= $yearStart && publishedAt < $yearEnd))
      && (!defined($query) || title match $query || excerpt match $query || pt::text(body) match $query)
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(reviewListItemSchema).parse(response);

  return NextResponse.json(parsed);
}
