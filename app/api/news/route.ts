import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { postListItemSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const newsQuerySchema = z.object({
  tag: z.string().min(1).optional(),
  q: z.string().min(1).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const filters = newsQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, unknown> = {
    offset: pagination.offset,
    limit: pagination.limit
  };

  if (filters.tag) {
    params.tag = filters.tag;
  }
  if (filters.q) {
    params.query = `${filters.q}*`;
  }

  const query = `{
    "items": *[
      _type == "post" && (!defined(status) || status == "published")
      && (!defined($tag) || count(tags[]-> [slug.current == $tag]) > 0)
      && (!defined($query) || title match $query || excerpt match $query || pt::text(body) match $query)
    ]
    | order(publishedAt desc)
    [$offset...$offset + $limit] {
      "id": _id,
      title,
      "slug": slug.current,
      "excerpt": coalesce(excerpt, null),
      "publishedAt": coalesce(publishedAt, null),
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
      _type == "post" && (!defined(status) || status == "published")
      && (!defined($tag) || count(tags[]-> [slug.current == $tag]) > 0)
      && (!defined($query) || title match $query || excerpt match $query || pt::text(body) match $query)
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(postListItemSchema).parse(response);

  return NextResponse.json(parsed);
}
