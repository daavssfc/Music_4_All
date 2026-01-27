import { NextResponse } from "next/server";
import { getSanityClient } from "@/lib/sanity/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type ReviewItem = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const renderItem = (item: ReviewItem) => {
  const url = `${baseUrl}/reviews/${item.slug}`;
  const pubDate = item.publishedAt || item.updatedAt;
  const description = item.excerpt ? `<description>${escapeXml(item.excerpt)}</description>` : "";

  return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      ${pubDate ? `<pubDate>${new Date(pubDate).toUTCString()}</pubDate>` : ""}
      ${description}
    </item>
  `;
};

export async function GET() {
  let items: ReviewItem[] = [];

  try {
    items = await getSanityClient().fetch<ReviewItem[]>(
      `*[_type == "review" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc)[0...50]{
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "updatedAt": _updatedAt
      }`
    );
  } catch {
    items = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Music 4 All Reviews</title>
      <link>${escapeXml(`${baseUrl}/reviews`)}</link>
      <description>Latest reviews from Music 4 All.</description>
      ${items.map(renderItem).join("")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
