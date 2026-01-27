import type { MetadataRoute } from "next";
import { getSanityClient } from "@/lib/sanity/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type SlugItem = {
  slug: string;
  updatedAt: string;
};

const fetchSlugs = async (query: string): Promise<SlugItem[]> => {
  try {
    return await getSanityClient().fetch<SlugItem[]>(query);
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [reviews, news, events, artists] = await Promise.all([
    fetchSlugs(
      '*[_type == "review" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }'
    ),
    fetchSlugs(
      '*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }'
    ),
    fetchSlugs(
      '*[_type == "event" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }'
    ),
    fetchSlugs(
      '*[_type == "artist" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }'
    )
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/news`, lastModified: new Date() },
    { url: `${baseUrl}/events`, lastModified: new Date() },
    { url: `${baseUrl}/artists`, lastModified: new Date() },
    { url: `${baseUrl}/media`, lastModified: new Date() },
    { url: `${baseUrl}/tours`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() }
  ];

  const mapSlugs = (items: SlugItem[], prefix: string) =>
    items.map((item) => ({
      url: `${baseUrl}/${prefix}/${item.slug}`,
      lastModified: new Date(item.updatedAt)
    }));

  return [
    ...staticRoutes,
    ...mapSlugs(reviews, "reviews"),
    ...mapSlugs(news, "news"),
    ...mapSlugs(events, "events"),
    ...mapSlugs(artists, "artists")
  ];
}
