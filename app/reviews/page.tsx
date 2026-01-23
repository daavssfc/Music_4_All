import Image from "next/image";

import { SiteShell } from "@/app/components/SiteShell";
import { type ReviewItem, formatDate, getJsonSafe } from "@/lib/api/content";

const fallbackImage =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80";

export default async function ReviewsPage() {
  const reviewsResult = await getJsonSafe<ReviewItem>("/api/reviews");
  const reviews = reviewsResult.data.items;

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Reviews</span>
              <h1>Album reviews that guide the community</h1>
              <p className="muted">
                Pulling the latest published reviews directly from the CMS for instant publication.
              </p>
              {reviewsResult.error ? (
                <p className="muted">Live data unavailable: {reviewsResult.error}</p>
              ) : null}
            </div>
          </div>
          <div className="grid-3">
            {reviews.map((review) => (
              <article className="card review-card" key={review.id}>
                <div className="media">
                  <Image
                    src={review.album?.coverImageUrl ?? fallbackImage}
                    alt={`${review.title} cover`}
                    width={640}
                    height={640}
                  />
                  {review.rating !== null ? <span className="badge">{review.rating}</span> : null}
                </div>
                <h3>{review.title}</h3>
                <p className="muted">{review.album?.artists?.[0]?.name ?? "Unknown artist"}</p>
                <p className="muted">{formatDate(review.publishedAt) || "Recently published"}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
