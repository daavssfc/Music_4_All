import type { ActiveSource, Platform, PlayerState } from "@/lib/players/types";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "www.music.youtube.com",
  "youtu.be"
]);
const SPOTIFY_HOSTS = new Set(["open.spotify.com", "play.spotify.com"]);
const SOUNDCLOUD_HOSTS = new Set([
  "soundcloud.com",
  "www.soundcloud.com",
  "m.soundcloud.com",
  "on.soundcloud.com"
]);

const normalizeUrl = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

const buildYouTubeEmbed = (input: URL) => {
  const list = input.searchParams.get("list");
  if (list) {
    return `https://www.youtube.com/embed/videoseries?list=${list}&loop=1`;
  }

  if (input.hostname === "youtu.be") {
    const id = input.pathname.replace("/", "").trim();
    if (id) {
      return `https://www.youtube.com/embed/${id}?loop=1&playlist=${id}`;
    }
  }

  const videoId = input.searchParams.get("v");
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}`;
  }

  const parts = input.pathname.split("/").filter(Boolean);
  const shortsIndex = parts.findIndex((part) => part === "shorts");
  if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
    const id = parts[shortsIndex + 1];
    return `https://www.youtube.com/embed/${id}?loop=1&playlist=${id}`;
  }

  return null;
};

const buildSpotifyEmbed = (input: URL) => {
  const parts = input.pathname.split("/").filter(Boolean);
  const [type, id] = parts;
  if (!type || !id) return null;
  return `https://open.spotify.com/embed/${type}/${id}`;
};

const buildSoundCloudEmbed = (input: URL) => {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(input.toString())}&auto_play=true&show_user=true&show_reposts=false&visual=true&continuous_play=true`;
};

export const buildEmbedUrl = (platform: Platform, url: string) => {
  const parsed = normalizeUrl(url);
  if (!parsed) return null;

  switch (platform) {
    case "youtube": {
      if (!YOUTUBE_HOSTS.has(parsed.hostname)) return null;
      return buildYouTubeEmbed(parsed);
    }
    case "spotify": {
      if (!SPOTIFY_HOSTS.has(parsed.hostname)) return null;
      return buildSpotifyEmbed(parsed);
    }
    case "soundcloud": {
      if (!SOUNDCLOUD_HOSTS.has(parsed.hostname)) return null;
      return buildSoundCloudEmbed(parsed);
    }
    default:
      return null;
  }
};

export const resolveActiveSource = (state: PlayerState | null): ActiveSource => {
  if (!state) {
    return { mode: "fallback", platform: null, url: null };
  }

  if (state.mode === "live" && state.live_platform && state.live_url) {
    return { mode: "live", platform: state.live_platform, url: state.live_url };
  }

  return { mode: "fallback", platform: state.fallback_platform, url: state.fallback_url };
};
