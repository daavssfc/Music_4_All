import { SiteShell } from "@/app/components/SiteShell";

const storeItems = [
  {
    title: "Membership",
    description: "Unlock early access to reviews, playlists, and editorial drops."
  },
  {
    title: "Merchandise",
    description: "Branded apparel and collectibles curated for superfans."
  },
  {
    title: "Tickets",
    description: "Affiliate-ready ticket links pulled from tour listings."
  }
];

export default function StorePage() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Store</span>
              <h1>Commerce and membership touchpoints</h1>
              <p className="muted">
                This page is ready to connect to commerce partners or subscription tooling.
              </p>
            </div>
          </div>
          <div className="grid-3">
            {storeItems.map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
