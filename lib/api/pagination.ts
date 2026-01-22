import { z } from "zod";

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
});

export type PaginationInput = z.input<typeof paginationSchema>;
export type Pagination = z.output<typeof paginationSchema>;

export const getPagination = (searchParams: URLSearchParams): Pagination => {
  const params = Object.fromEntries(searchParams.entries());
  return paginationSchema.parse(params);
};

export const buildPageInfo = (limit: number, offset: number, total: number) => ({
  limit,
  offset,
  total,
  hasMore: offset + limit < total
});
