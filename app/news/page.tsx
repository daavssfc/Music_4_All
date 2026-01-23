import { SiteShell } from "@/app/components/SiteShell";
import { type PostItem, formatDate, getJsonSafe } from "@/lib/api/content";

export default async function NewsPage() {
  const newsResult = await getJsonSafe<PostItem>("/api/news");
  const news = newsResult.data.items;

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Newsroom</span>
              <h1>Breaking music news and editorial updates</h1>
              <p className="muted">
                Latest stories, pulled straight from Sanity to keep the newsroom fresh.
              </p>
              {newsResult.error ? <p className="muted">Live data unavailable: {newsResult.error}</p> : null}
            </div>
          </div>
          <div className="stack">
            {news.map((item) => (
              <article className="card news-card" key={item.id}>
                <p className="label">News</p>
                <h3>{item.title}</h3>
                <p className="muted">{item.excerpt ?? "Latest update from the newsroom."}</p>
                <p className="muted">{formatDate(item.publishedAt) || "Just now"}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
