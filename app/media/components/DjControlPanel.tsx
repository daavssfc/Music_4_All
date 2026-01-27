"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { PlayerState } from "@/lib/players/types";
import { platformSchema } from "@/lib/players/types";
import { buildEmbedUrl, resolveActiveSource } from "@/lib/players/embeds";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

const platformOptions = platformSchema.options;

type DjControlPanelProps = {
  initialState: PlayerState | null;
  supabaseUrl: string | null;
  supabaseAnonKey: string | null;
  errorMessage?: string | null;
};

export const DjControlPanel = ({
  initialState,
  supabaseUrl,
  supabaseAnonKey,
  errorMessage
}: DjControlPanelProps) => {
  const [state, setState] = useState<PlayerState | null>(initialState);
  const [token, setToken] = useState<string>("");
  const [fallbackPlatform, setFallbackPlatform] = useState("youtube");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [livePlatform, setLivePlatform] = useState("youtube");
  const [liveUrl, setLiveUrl] = useState("");
  const [message, setMessage] = useState<string | null>(errorMessage ?? null);
  const [busy, setBusy] = useState(false);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createBrowserSupabaseClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  useEffect(() => {
    const stored = window.localStorage.getItem("djSanityToken");
    if (stored) {
      setToken(stored);
    }
  }, []);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setMessage((current) => current ?? "Supabase realtime is not configured.");
      return;
    }

    if (!supabase) return undefined;

    const channel = (supabase as unknown as { channel: (...args: unknown[]) => any })
      .channel("player-state-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "player_state" },
        (payload: { new: PlayerState }) => {
          setState(payload.new as PlayerState);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, supabaseAnonKey, supabaseUrl]);

  useEffect(() => {
    if (!state) return;
    if (state.fallback_platform) {
      setFallbackPlatform(state.fallback_platform);
    }
    if (state.fallback_url) {
      setFallbackUrl(state.fallback_url);
    }
    if (state.live_platform) {
      setLivePlatform(state.live_platform);
    }
    if (state.live_url) {
      setLiveUrl(state.live_url);
    }
  }, [state]);

  const saveToken = (value: string) => {
    setToken(value);
    window.localStorage.setItem("djSanityToken", value);
  };

  const request = async (payload: Record<string, unknown>) => {
    if (!token) {
      setMessage("Enter your Sanity token to continue.");
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      const response = await fetch("/api/dj/now-playing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { error?: string; state?: PlayerState };
      if (!response.ok) {
        setMessage(data.error || "Update failed.");
        return;
      }

      setState(data.state ?? null);
      setMessage("Update saved.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Update failed.";
      setMessage(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleFallbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    request({ action: "set-fallback", platform: fallbackPlatform, url: fallbackUrl });
  };

  const handleLiveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    request({ action: "set-live", platform: livePlatform, url: liveUrl });
  };

  const handleEndLive = () => {
    request({ action: "end-live" });
  };

  const active = resolveActiveSource(state);
  const embedUrl =
    active.platform && active.url ? buildEmbedUrl(active.platform, active.url) : null;

  return (
    <div className="grid-3" style={{ alignItems: "start" }}>
      <div className="card" style={{ gridColumn: "span 2" }}>
        <h2>DJ Control</h2>
        <p className="muted">
          Use your Sanity user token to update the fallback playlist or go live.
        </p>

        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
          <label>
            <span className="muted">Sanity user token</span>
            <input
              type="password"
              value={token}
              onChange={(event) => saveToken(event.target.value)}
              placeholder="Paste your Sanity token"
              style={{ width: "100%" }}
            />
          </label>
        </div>

        {message ? <p className="muted">{message}</p> : null}

        <form onSubmit={handleFallbackSubmit} style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem" }}>
          <h3>Fallback playlist (offline mode)</h3>
          <label>
            <span className="muted">Platform</span>
            <select
              value={fallbackPlatform}
              onChange={(event) => setFallbackPlatform(event.target.value)}
            >
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="muted">Playlist URL</span>
            <input
              type="url"
              required
              value={fallbackUrl}
              onChange={(event) => setFallbackUrl(event.target.value)}
              placeholder="https://open.spotify.com/playlist/..."
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={busy}>
            Save fallback playlist
          </button>
        </form>

        <form onSubmit={handleLiveSubmit} style={{ marginTop: "2rem", display: "grid", gap: "0.75rem" }}>
          <h3>Live DJ override</h3>
          <label>
            <span className="muted">Platform</span>
            <select value={livePlatform} onChange={(event) => setLivePlatform(event.target.value)}>
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="muted">Track or playlist URL</span>
            <input
              type="url"
              required
              value={liveUrl}
              onChange={(event) => setLiveUrl(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </label>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn btn-primary" type="submit" disabled={busy}>
              Go live
            </button>
            <button className="btn btn-ghost" type="button" onClick={handleEndLive} disabled={busy}>
              End live session
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Current output</h3>
        <p className="muted">{active.mode === "live" ? "Live DJ" : "Fallback"}</p>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Now playing preview"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ width: "100%", height: "280px", border: 0, borderRadius: "16px" }}
          />
        ) : (
          <p className="muted">No player configured yet.</p>
        )}
      </div>
    </div>
  );
};
