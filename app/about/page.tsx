import { SiteShell } from "@/app/components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container two-col">
          <div>
            <span className="label">About</span>
            <h1>Music 4 All is a modern music publication.</h1>
            <p className="muted">
              This project is built to keep editorial, news, and tour coverage synced to a headless
              CMS. The UI can evolve without touching the API contracts.
            </p>
          </div>
          <div className="about-card">
            <h3>What we publish</h3>
            <ul className="muted list">
              <li>Album reviews and ratings with structured metadata.</li>
              <li>News posts with tags, authors, and publish dates.</li>
              <li>Tour and event listings for upcoming shows.</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
