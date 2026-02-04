import { SiteShell } from "@/app/components/SiteShell";

export default function ContactsPage() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container two-col">
          <div>
            <span className="label">Contacts</span>
            <h1>Work with the Music 4 All editorial team.</h1>
            <p className="muted">
              Use this page to capture submissions, press inquiries, and partnership requests.
            </p>
          </div>
          <div className="card stack">
            <div>
              <strong>General inbox</strong>
              <p className="muted">hello@music4all.com</p>
            </div>
            <div>
              <strong>Press</strong>
              <p className="muted">press@music4all.com</p>
            </div>
            <div>
              <strong>Partnerships</strong>
              <p className="muted">partners@music4all.com</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
