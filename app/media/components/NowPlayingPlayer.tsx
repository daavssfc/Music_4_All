"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlayerState } from "@/lib/players/types";
import { buildEmbedUrl, resolveActiveSource } from "@/lib/players/embeds";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

const formatPlatform = (platform: string | null) => {
  if (!platform) return "Unknown";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
};

type NowPlayingPlayerProps = {
  initialState: PlayerState | null;
  supabaseUrl: string | null;
  supabaseAnonKey: string | null;
  errorMessage?: string | null;
};

export const NowPlayingPlayer = ({
  initialState,
  supabaseUrl,
  supabaseAnonKey,
  errorMessage
}: NowPlayingPlayerProps) => {
  const [state, setState] = useState<PlayerState | null>(initialState);
  const [status, setStatus] = useState<string | null>(errorMessage ?? null);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createBrowserSupabaseClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus((current) => current ?? "Supabase realtime is not configured.");
      return;
    }

    if (!supabase) return undefined;

    const channel = (supabase as unknown as { channel: (...args: unknown[]) => any })
      .channel("player-state")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "player_state" },
        (payload: { new: PlayerState }) => {
          setStatus(null);
          setState(payload.new as PlayerState);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, supabaseAnonKey, supabaseUrl]);

  const active = resolveActiveSource(state);
  const embedUrl =
    active.platform && active.url ? buildEmbedUrl(active.platform, active.url) : null;

  return (
    <div className="card" style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <h2>Now Playing</h2>
        <p className="muted">
          {active.mode === "live" ? "Live DJ session" : "Fallback playlist"}
        </p>
        {status ? <p className="muted">{status}</p> : null}
      </div>

      {embedUrl ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={embedUrl}
            title="Music 4 All player"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: "16px"
            }}
          />
        </div>
      ) : (
        <div className="muted">
          <p>No player source has been configured yet.</p>
          <p>Add a fallback playlist or start a live session in the DJ panel.</p>
        </div>
      )}

      <div className="grid-3">
        <div>
          <p className="muted">Mode</p>
          <strong>{active.mode === "live" ? "Live" : "Fallback"}</strong>
        </div>
        <div>
          <p className="muted">Platform</p>
          <strong>{formatPlatform(active.platform)}</strong>
        </div>
        <div>
          <p className="muted">Updated</p>
          <strong>{state?.updated_at ? new Date(state.updated_at).toLocaleString() : "-"}</strong>
        </div>
      </div>
    </div>
  );
};
