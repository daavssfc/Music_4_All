import { NextResponse } from "next/server";
import { z } from "zod";

import { buildPageInfo, getPagination } from "@/lib/api/pagination";
import { paginatedResponseSchema } from "@/lib/contracts/common";
import { tagListItemSchema } from "@/lib/contracts/models";
import { getSanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";

const tagsQuerySchema = z.object({
  type: z.enum(["genre", "topic"]).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = getPagination(searchParams);
  const filters = tagsQuerySchema.parse(Object.fromEntries(searchParams.entries()));

  const params: Record<string, unknown> = {
    offset: pagination.offset,
    limit: pagination.limit
  };

  if (filters.type) {
    params.type = filters.type;
  }

  const query = `{
    "items": *[
      _type == "tag"
      && (!defined($type) || type == $type)
    ]
    | order(name asc)
    [$offset...$offset + $limit] {
      "id": _id,
      name,
      "slug": slug.current,
      type
    },
    "total": count(*[
      _type == "tag"
      && (!defined($type) || type == $type)
    ])
  }`;

  const data = await getSanityClient().fetch<{ items: unknown[]; total: number }>(query, params);
  const response = {
    items: data.items ?? [],
    pageInfo: buildPageInfo(pagination.limit, pagination.offset, data.total ?? 0)
  };

  const parsed = paginatedResponseSchema(tagListItemSchema).parse(response);

  return NextResponse.json(parsed);
}
