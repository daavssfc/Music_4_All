import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { artistAggregationSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const artistAggQuerySchema = z.object({
  q: z.string().min(1).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const filters = artistAggQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, unknown> = {
    offset: pagination.offset,
    limit: pagination.limit
  };

  if (filters.q) {
    params.query = `${filters.q}*`;
  }

  const query = `{
    "items": *[
      _type == "artist"
      && (!defined($query) || name match $query || pt::text(bio) match $query)
    ]
    | order(name asc)
    [$offset...$offset + $limit] {
      "id": _id,
      name,
      "slug": slug.current,
      "imageUrl": coalesce(image.asset->url, null),
      "bio": coalesce(bio, null),
      "links": coalesce(links, null),
      "reviewCount": count(*[
        _type == "review" && status == "published"
        && count(album->artists[]-> [_id == ^._id]) > 0
      ]),
      "eventCount": count(*[
        _type == "event" && status == "published"
        && count(artists[]-> [_id == ^._id]) > 0
      ])
    },
    "total": count(*[
      _type == "artist"
      && (!defined($query) || name match $query || pt::text(bio) match $query)
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(artistAggregationSchema).parse(response);

  return NextResponse.json(parsed);
}
