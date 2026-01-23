import { SiteShell } from "@/app/components/SiteShell";

const mediaSections = [
  {
    title: "Video sessions",
    description: "Short-form studio performances and interviews ready for embeds."
  },
  {
    title: "Photo essays",
    description: "Editorial coverage for tours, festivals, and behind-the-scenes stories."
  },
  {
    title: "Playlists",
    description: "Curated listening guides tied to reviews, tours, and news cycles."
  }
];

export default function MediaPage() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Media</span>
              <h1>Media library for the Music 4 All brand</h1>
              <p className="muted">
                This is a placeholder for video, photo, and playlist integrations.
              </p>
            </div>
          </div>
          <div className="grid-3">
            {mediaSections.map((section) => (
              <div className="card" key={section.title}>
                <h3>{section.title}</h3>
                <p className="muted">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
