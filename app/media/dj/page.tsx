import { SiteShell } from "@/app/components/SiteShell";
import { DjControlPanel } from "@/app/media/components/DjControlPanel";
import { fetchPlayerState } from "@/lib/players/state";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export default async function DjPage() {
  const { state, error } = await fetchPlayerState();
  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabasePublicConfig();

  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="label">DJ</span>
              <h1>Live control room</h1>
              <p className="muted">
                Update the fallback playlist or take over the live session in real time.
              </p>
            </div>
          </div>
          <DjControlPanel
            initialState={state}
            supabaseUrl={supabaseUrl}
            supabaseAnonKey={supabaseAnonKey}
            errorMessage={error}
          />
        </div>
      </section>
    </SiteShell>
  );
}
