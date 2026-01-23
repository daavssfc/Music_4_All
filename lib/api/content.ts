import { headers } from "next/headers";

type PageInfo = {
  total: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  pageInfo: PageInfo;
};

export type ReviewItem = {
  id: string;
  title: string;
  rating: number | null;
  excerpt: string | null;
  publishedAt: string | null;
  album: {
    title: string;
    coverImageUrl: string | null;
    artists: { name: string; slug: string }[] | null;
  } | null;
};

export type PostItem = {
  id: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
};

export type EventItem = {
  id: string;
  title: string;
  city: string | null;
  startsAt: string | null;
  venue?: string | null;
  ticketUrl?: string | null;
  imageUrl?: string | null;
};

export type ArtistItem = {
  id: string;
  name: string;
  imageUrl?: string | null;
};

export type FetchResult<T> = {
  data: PaginatedResponse<T>;
  error: string | null;
};

const buildBaseUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "";
  }
  return `${protocol}://${host}`;
};

const emptyResponse = <T,>(): PaginatedResponse<T> => ({
  items: [],
  pageInfo: { total: 0 }
});

export const getJsonSafe = async <T,>(path: string): Promise<FetchResult<T>> => {
  const baseUrl = buildBaseUrl();
  const url = baseUrl ? `${baseUrl}${path}` : path;
  try {
    const response = await fetch(url, { next: { revalidate: 30 } });
    if (!response.ok) {
      const text = await response.text();
      return { data: emptyResponse<T>(), error: text || `Request failed: ${response.status}` };
    }
    return { data: (await response.json()) as PaginatedResponse<T>, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { data: emptyResponse<T>(), error: message };
  }
};

export const formatDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};
