import { SiteShell } from "@/app/components/SiteShell";
import { NowPlayingPlayer } from "@/app/media/components/NowPlayingPlayer";
import { fetchPlayerState } from "@/lib/players/state";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

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

export default async function MediaPage() {
  const { state, error } = await fetchPlayerState();
  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabasePublicConfig();

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">Media</span>
              <h1>Media library for the Music 4 All brand</h1>
              <p className="muted">
                Multi-platform player powered by Supabase realtime for live DJ sessions.
              </p>
            </div>
          </div>
          <NowPlayingPlayer
            initialState={state}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
            errorMessage={error}
          />
          <p className="muted" style={{ marginTop: "1.5rem" }}>
            DJs can update the live session in the <a href="/media/dj">DJ control room</a>.
          </p>
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
