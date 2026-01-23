import Image from "next/image";

import { SiteShell } from "@/app/components/SiteShell";
import { type EventItem, formatDate, getJsonSafe } from "@/lib/api/content";

const fallbackImage =
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80";

export default async function ToursPage() {
  const eventsResult = await getJsonSafe<EventItem>("/api/events?when=upcoming");
  const tours = eventsResult.data.items;

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Tour Radar</span>
              <h1>Upcoming events and tours</h1>
              <p className="muted">All upcoming events published in the CMS appear here.</p>
              {eventsResult.error ? (
                <p className="muted">Live data unavailable: {eventsResult.error}</p>
              ) : null}
            </div>
          </div>
          <div className="grid-3">
            {tours.map((tour) => (
              <article className="card tour-card" key={tour.id}>
                <Image src={tour.imageUrl ?? fallbackImage} alt={tour.title} width={640} height={480} />
                <div className="tour-body">
                  <h3>{tour.title}</h3>
                  <p className="muted">{tour.city ?? "TBA"}</p>
                  <p className="muted">{tour.venue ?? "Venue to be announced"}</p>
                  <div className="tour-footer">
                    <span className="pill pill-outline">
                      {formatDate(tour.startsAt) || "Upcoming"}
                    </span>
                    {tour.ticketUrl ? (
                      <a className="btn btn-secondary" href={tour.ticketUrl} target="_blank" rel="noreferrer">
                        Tickets
                      </a>
                    ) : (
                      <span className="muted">Tickets TBD</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
