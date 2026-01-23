import { SiteShell } from "@/app/components/SiteShell";
import { type ArtistItem, getJsonSafe } from "@/lib/api/content";

const fallbackImage =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80";

export default async function ArtistsPage() {
  const artistsResult = await getJsonSafe<ArtistItem>("/api/artists");
  const artists = artistsResult.data.items;

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Artists</span>
              <h1>Profiles for the artists we track</h1>
              <p className="muted">Each profile connects to reviews, events, and news coverage.</p>
              {artistsResult.error ? (
                <p className="muted">Live data unavailable: {artistsResult.error}</p>
              ) : null}
            </div>
          </div>
          <div className="grid-3">
            {artists.map((artist) => (
              <article className="card artist-card" key={artist.id}>
                <img src={artist.imageUrl ?? fallbackImage} alt={artist.name} />
                <h3>{artist.name}</h3>
                <p className="muted">Artist profile from the CMS.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
