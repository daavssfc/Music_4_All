import { headers } from "next/headers";

const buildBaseUrl = () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  if (!host) {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "";
  }
  return `${protocol}://${host}`;
};

type PageInfo = {
  total: number;
};

type PaginatedResponse<T> = {
  items: T[];
  pageInfo: PageInfo;
};

type ReviewItem = {
  id: string;
  title: string;
  slug: string;
  rating: number | null;
  excerpt: string | null;
  publishedAt: string | null;
  album: {
    title: string;
    slug: string;
    coverImageUrl: string | null;
    artists: { name: string; slug: string }[] | null;
  } | null;
  author: {
    name: string;
    handle: string;
    slug: string;
  } | null;
};

type PostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
};

type EventItem = {
  id: string;
  title: string;
  slug: string;
  venue: string | null;
  city: string | null;
  country: string | null;
  startsAt: string | null;
};

type ArtistItem = {
  id: string;
  name: string;
  slug: string;
};

type FetchResult<T> = {
  data: PaginatedResponse<T>;
  error: string | null;
};

const formatDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const emptyResponse = <T,>(): PaginatedResponse<T> => ({
  items: [],
  pageInfo: { total: 0 }
});

const getJsonSafe = async <T,>(path: string): Promise<FetchResult<T>> => {
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

export default async function HomePage() {
  const [reviewsResult, newsResult, eventsResult, artistsResult] = await Promise.all([
    getJsonSafe<ReviewItem>("/api/reviews"),
    getJsonSafe<PostItem>("/api/news"),
    getJsonSafe<EventItem>("/api/events?when=upcoming"),
    getJsonSafe<ArtistItem>("/api/artists")
  ]);

  return (
    <main className="page" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Music 4 All</h1>
        <p>Live content preview from Sanity + API routes.</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Latest Reviews ({reviewsResult.data.pageInfo.total})</h2>
        {reviewsResult.error ? <p style={{ color: "#b91c1c" }}>{reviewsResult.error}</p> : null}
        <ul>
          {reviewsResult.data.items.map((review) => (
            <li key={review.id} style={{ marginBottom: "1rem" }}>
              <strong>{review.title}</strong>
              {review.album ? ` — ${review.album.title}` : ""}
              {review.rating !== null ? ` (${review.rating})` : ""}
              <div style={{ color: "#666" }}>
                {review.author ? `By ${review.author.name}` : ""}
                {review.publishedAt ? ` · ${formatDate(review.publishedAt)}` : ""}
              </div>
              {review.excerpt ? <p>{review.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>News ({newsResult.data.pageInfo.total})</h2>
        {newsResult.error ? <p style={{ color: "#b91c1c" }}>{newsResult.error}</p> : null}
        <ul>
          {newsResult.data.items.map((post) => (
            <li key={post.id} style={{ marginBottom: "1rem" }}>
              <strong>{post.title}</strong>
              {post.publishedAt ? ` · ${formatDate(post.publishedAt)}` : ""}
              {post.excerpt ? <p>{post.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Upcoming Events ({eventsResult.data.pageInfo.total})</h2>
        {eventsResult.error ? <p style={{ color: "#b91c1c" }}>{eventsResult.error}</p> : null}
        <ul>
          {eventsResult.data.items.map((event) => (
            <li key={event.id} style={{ marginBottom: "1rem" }}>
              <strong>{event.title}</strong>
              {event.city ? ` · ${event.city}` : ""}
              {event.startsAt ? ` · ${formatDate(event.startsAt)}` : ""}
              <div style={{ color: "#666" }}>{event.venue}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Artists ({artistsResult.data.pageInfo.total})</h2>
        {artistsResult.error ? <p style={{ color: "#b91c1c" }}>{artistsResult.error}</p> : null}
        <ul>
          {artistsResult.data.items.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
