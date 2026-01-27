import type { PlayerState } from "@/lib/players/types";
import { playerStateSchema } from "@/lib/players/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const PLAYER_STATE_ID = "00000000-0000-0000-0000-000000000001";
const DEFAULT_TABLE = process.env.PLAYER_STATE_TABLE || "player_state";
const FALLBACK_TABLE = "now_playing";

const isTableMissingError = (message: string) =>
  message.includes("Could not find the table") ||
  message.includes("relation") ||
  message.toLowerCase().includes("does not exist");

export type PlayerStateResult = {
  state: PlayerState | null;
  error: string | null;
};

const normalizePlayerState = (state: unknown) => {
  const parsed = playerStateSchema.safeParse(state);
  return parsed.success ? parsed.data : null;
};

export const fetchPlayerState = async (): Promise<PlayerStateResult> => {
  try {
    const supabase = getSupabaseServerClient();
    const tables = [DEFAULT_TABLE, FALLBACK_TABLE].filter(
      (value, index, list) => list.indexOf(value) === index
    );

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", PLAYER_STATE_ID)
        .maybeSingle();

      if (error) {
        if (isTableMissingError(error.message)) {
          continue;
        }
        return { state: null, error: error.message };
      }

      if (data) {
        return { state: normalizePlayerState(data), error: null };
      }

      const { data: latest, error: latestError } = await supabase
        .from(table)
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestError) {
        if (isTableMissingError(latestError.message)) {
          continue;
        }
        return { state: null, error: latestError.message };
      }

      if (latest) {
        return { state: normalizePlayerState(latest), error: null };
      }
    }

    return {
      state: null,
      error: `Could not find the table '${DEFAULT_TABLE}' in the schema cache.`
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { state: null, error: message };
  }
};

export const upsertPlayerState = async (payload: Partial<PlayerState>) => {
  const supabase = getSupabaseServerClient();
  const tables = [DEFAULT_TABLE, FALLBACK_TABLE].filter(
    (value, index, list) => list.indexOf(value) === index
  );

  let existing: PlayerState | null = null;
  let activeTable = DEFAULT_TABLE;

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", PLAYER_STATE_ID)
      .maybeSingle();

    if (error) {
      if (isTableMissingError(error.message)) {
        continue;
      }
      throw new Error(error.message);
    }

    if (data) {
      activeTable = table;
      existing = data as PlayerState | null;
      break;
    }

    const { data: latest, error: latestError } = await supabase
      .from(table)
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestError) {
      if (isTableMissingError(latestError.message)) {
        continue;
      }
      throw new Error(latestError.message);
    }

    if (latest) {
      activeTable = table;
      existing = latest as PlayerState | null;
      break;
    }
  }

  const row = existing ?? {
    id: PLAYER_STATE_ID,
    mode: "fallback",
    fallback_platform: null,
    fallback_url: null,
    live_platform: null,
    live_url: null
  };

  const next = {
    ...row,
    ...payload
  };

  const { data, error: upsertError } = await supabase
    .from(activeTable)
    .upsert(next)
    .select("*")
    .single();

  if (upsertError) {
    throw new Error(upsertError.message);
  }

  return normalizePlayerState(data);
};
