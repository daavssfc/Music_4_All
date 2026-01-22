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
  rating: number | null;
  album: {
    title: string;
    coverImageUrl: string | null;
    artists: { name: string; slug: string }[] | null;
  } | null;
};

type PostItem = {
  id: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
};

type EventItem = {
  id: string;
  title: string;
  city: string | null;
  startsAt: string | null;
};

type ArtistItem = {
  id: string;
  name: string;
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

const highlights = [
  {
    title: "Latest Album Review",
    description: "Deep dives into the records shaping culture right now.",
    icon: "🎧"
  },
  {
    title: "Breaking Music News",
    description: "Stay ahead with daily industry updates and artist drops.",
    icon: "⚡"
  },
  {
    title: "Upcoming Tours",
    description: "Track global dates, tickets, and venue details.",
    icon: "🗓️"
  }
];

const fallbackImage =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80";

export default async function HomePage() {
  const [reviewsResult, newsResult, eventsResult, artistsResult] = await Promise.all([
    getJsonSafe<ReviewItem>("/api/reviews"),
    getJsonSafe<PostItem>("/api/news"),
    getJsonSafe<EventItem>("/api/events?when=upcoming"),
    getJsonSafe<ArtistItem>("/api/artists")
  ]);

  const reviews = reviewsResult.data.items.slice(0, 4);
  const news = newsResult.data.items.slice(0, 3);
  const tours = eventsResult.data.items.slice(0, 3);
  const artists = artistsResult.data.items.slice(0, 3);

  return (
    <main className="page">
      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo">Music4All</div>
          <nav className="nav-links" aria-label="Primary">
            <a href="#reviews">Reviews</a>
            <a href="#news">News</a>
            <a href="#tours">Tours</a>
            <a href="#artists">Artists</a>
            <a href="#about">About</a>
          </nav>
          <button className="btn btn-primary">Explore Music</button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="pill">Music Platform</span>
            <h1>Everything Music. One Place.</h1>
            <p className="muted">
              Music4All delivers premium album reviews, breaking music news, and tour
              intelligence curated for true fans.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg">Start Listening</button>
              <button className="btn btn-secondary btn-lg">View Reviews</button>
            </div>
            <div className="hero-metrics">
              <div>
                <h3>{reviewsResult.data.pageInfo.total}</h3>
                <p className="muted">Published reviews</p>
              </div>
              <div>
                <h3>{eventsResult.data.pageInfo.total}</h3>
                <p className="muted">Upcoming tours</p>
              </div>
              <div>
                <h3>{artistsResult.data.pageInfo.total}</h3>
                <p className="muted">Artists tracked</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <img src={fallbackImage} alt="Futuristic music collage" />
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container card-grid">
          {highlights.map((item) => (
            <article className="card" key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Latest Reviews</span>
              <h2>Album reviews that cut through the noise</h2>
              {reviewsResult.error ? (
                <p className="muted">Live data unavailable: {reviewsResult.error}</p>
              ) : null}
            </div>
            <button className="btn btn-ghost">View all</button>
          </div>
          <div className="grid-4">
            {reviews.map((review) => (
              <article className="card review-card" key={review.id}>
                <div className="media">
                  <img src={review.album?.coverImageUrl ?? fallbackImage} alt={`${review.title} cover`} />
                  {review.rating !== null ? <span className="badge">{review.rating}</span> : null}
                </div>
                <h3>{review.title}</h3>
                <p className="muted">{review.album?.artists?.[0]?.name ?? "Unknown artist"}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="section alt">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Newsroom</span>
              <h2>Inside the music industry</h2>
              {newsResult.error ? (
                <p className="muted">Live data unavailable: {newsResult.error}</p>
              ) : null}
            </div>
            <button className="btn btn-ghost">Browse news</button>
          </div>
          <div className="list">
            {news.map((item) => (
              <article className="list-item" key={item.id}>
                <div>
                  <p className="tag">News</p>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.excerpt ?? "Latest update from the newsroom."}</p>
                </div>
                <span className="meta">{formatDate(item.publishedAt) || "Just now"}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Tour Radar</span>
              <h2>Upcoming concerts and tours</h2>
              {eventsResult.error ? (
                <p className="muted">Live data unavailable: {eventsResult.error}</p>
              ) : null}
            </div>
            <button className="btn btn-ghost">All dates</button>
          </div>
          <div className="grid-3">
            {tours.map((tour) => (
              <article className="card tour-card" key={tour.id}>
                <img src={fallbackImage} alt={tour.title} />
                <div className="tour-info">
                  <h3>{tour.title}</h3>
                  <p className="muted">{tour.city ?? "TBA"}</p>
                  <p className="date">{formatDate(tour.startsAt) || "Upcoming"}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="artists" className="section alt">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Featured Artists</span>
              <h2>Meet the creators shaping new sounds</h2>
              {artistsResult.error ? (
                <p className="muted">Live data unavailable: {artistsResult.error}</p>
              ) : null}
            </div>
            <button className="btn btn-ghost">View artists</button>
          </div>
          <div className="grid-3">
            {artists.map((artist) => (
              <article className="card artist-card" key={artist.id}>
                <img src={fallbackImage} alt={artist.name} />
                <h3>{artist.name}</h3>
                <p className="muted">Artist profile</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container about">
          <div>
            <span className="label">About Music4All</span>
            <h2>Built for fans and tastemakers</h2>
            <p className="muted">
              This minimal homepage renders live content from the CMS while keeping the
              existing look and feel. The design can be swapped later without changing the
              data contracts.
            </p>
          </div>
          <button className="btn btn-primary btn-lg">Get in touch</button>
        </div>
      </section>
    </main>
  );
}
