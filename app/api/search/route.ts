import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { searchResultSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.enum(["review", "post", "event", "artist", "all"]).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const { q, type } = searchQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, string | number> = {
    offset: pagination.offset,
    limit: pagination.limit,
    search: `${q}*`
  };

  const typeFilter =
    type && type !== "all"
      ? `_type == "${type}"`
      : `_type in ["review", "post", "event", "artist"]`;

  const query = `{
    "items": *[
      ${typeFilter}
      && (
        (_type == "review" && status == "published" && (title match $search || excerpt match $search || pt::text(body) match $search))
        || (_type == "post" && status == "published" && (title match $search || excerpt match $search || pt::text(body) match $search))
        || (_type == "event" && status == "published" && (title match $search || venue match $search || pt::text(description) match $search))
        || (_type == "artist" && (name match $search || pt::text(bio) match $search))
      )
    ]
    | order(publishedAt desc, startsAt asc, name asc)
    [$offset...$offset + $limit] {
      "id": _id,
      "type": _type,
      "title": coalesce(title, name),
      "slug": slug.current,
      "route": select(
        _type == "review" => "/reviews/" + slug.current,
        _type == "post" => "/news/" + slug.current,
        _type == "event" => "/events/" + slug.current,
        _type == "artist" => "/artists/" + slug.current
      ),
      "excerpt": coalesce(excerpt, null),
      "publishedAt": coalesce(publishedAt, null),
      "startsAt": coalesce(startsAt, null),
      "imageUrl": select(
        _type == "review" => coalesce(album->coverImage.asset->url, null),
        _type == "post" => coalesce(seo.image.asset->url, null),
        _type == "event" => coalesce(image.asset->url, null),
        _type == "artist" => coalesce(image.asset->url, null)
      )
    },
    "total": count(*[
      ${typeFilter}
      && (
        (_type == "review" && status == "published" && (title match $search || excerpt match $search || pt::text(body) match $search))
        || (_type == "post" && status == "published" && (title match $search || excerpt match $search || pt::text(body) match $search))
        || (_type == "event" && status == "published" && (title match $search || venue match $search || pt::text(description) match $search))
        || (_type == "artist" && (name match $search || pt::text(bio) match $search))
      )
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(searchResultSchema).parse(response);

  return NextResponse.json(parsed);
}
