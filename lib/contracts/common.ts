import { z } from "zod";

export const pageInfoSchema = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  hasMore: z.boolean()
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    pageInfo: pageInfoSchema
  });

export const imageUrlSchema = z.string().url().nullable();

export const slugSchema = z.string().min(1);
