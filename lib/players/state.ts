import type { PlayerState } from "@/lib/players/types";
import { playerStateSchema } from "@/lib/players/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const PLAYER_STATE_ID = "00000000-0000-0000-0000-000000000001";

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
    const { data, error } = await supabase
      .from("player_state")
      .select("*")
      .eq("id", PLAYER_STATE_ID)
      .maybeSingle();

    if (error) {
      return { state: null, error: error.message };
    }

    return { state: normalizePlayerState(data), error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { state: null, error: message };
  }
};

export const upsertPlayerState = async (payload: Partial<PlayerState>) => {
  const supabase = getSupabaseServerClient();
  const { data: existing, error } = await supabase
    .from("player_state")
    .select("*")
    .eq("id", PLAYER_STATE_ID)
    .maybeSingle();

  if (error && !existing) {
    throw new Error(error.message);
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
    .from("player_state")
    .upsert(next)
    .select("*")
    .single();

  if (upsertError) {
    throw new Error(upsertError.message);
  }

  return normalizePlayerState(data);
};
