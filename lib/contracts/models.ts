import { z } from "zod";

import { imageUrlSchema, slugSchema } from "./common";

export const tagSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  type: z.enum(["genre", "topic"])
});

export const tagListItemSchema = tagSchema.extend({
  id: z.string()
});

export const authorSchema = z.object({
  name: z.string(),
  handle: z.string(),
  slug: slugSchema,
  role: z.enum(["admin", "editor", "reviewer"]),
  avatarUrl: imageUrlSchema
});

const artistBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: slugSchema,
  imageUrl: imageUrlSchema
});

export const artistListItemSchema = artistBaseSchema.extend({
  bio: z.array(z.unknown()).nullable().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url()
      })
    )
    .nullable()
    .optional()
});

export const artistDetailSchema = artistBaseSchema.extend({
  bio: z.array(z.unknown()).nullable(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url()
      })
    )
    .nullable()
});

export const albumSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  releaseDate: z.string().nullable(),
  label: z.string().nullable(),
  coverImageUrl: imageUrlSchema,
  artists: z
    .array(
      z.object({
        name: z.string(),
        slug: slugSchema
      })
    )
    .nullable()
});

export const seoSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: imageUrlSchema
});

export const reviewListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: slugSchema,
  rating: z.number().nullable(),
  excerpt: z.string().nullable(),
  publishedAt: z.string().nullable(),
  album: albumSchema.nullable(),
  author: authorSchema.nullable(),
  tags: z.array(tagSchema).nullable()
});

export const reviewDetailSchema = reviewListItemSchema.extend({
  body: z.array(z.unknown()).nullable(),
  seo: seoSchema.nullable()
});

export const postListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: slugSchema,
  excerpt: z.string().nullable(),
  publishedAt: z.string().nullable(),
  author: authorSchema.nullable(),
  tags: z.array(tagSchema).nullable()
});

export const postDetailSchema = postListItemSchema.extend({
  body: z.array(z.unknown()).nullable(),
  seo: seoSchema.nullable()
});

export const eventListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: slugSchema,
  venue: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  startsAt: z.string().nullable(),
  ticketUrl: z.string().url().nullable(),
  imageUrl: imageUrlSchema,
  artists: z
    .array(
      z.object({
        name: z.string(),
        slug: slugSchema
      })
    )
    .nullable()
});

export const eventDetailSchema = eventListItemSchema.extend({
  description: z.array(z.unknown()).nullable(),
  seo: seoSchema.nullable()
});

export const searchResultSchema = z.object({
  id: z.string(),
  type: z.enum(["review", "post", "event", "artist"]),
  title: z.string(),
  slug: slugSchema,
  route: z.string(),
  excerpt: z.string().nullable(),
  publishedAt: z.string().nullable(),
  startsAt: z.string().nullable(),
  imageUrl: imageUrlSchema
});

export const tagAggregationSchema = tagListItemSchema.extend({
  reviewCount: z.number(),
  postCount: z.number()
});

export const artistAggregationSchema = artistListItemSchema.extend({
  reviewCount: z.number(),
  eventCount: z.number()
});
