import { z } from "zod";

export const platformSchema = z.enum(["youtube", "spotify", "soundcloud"]);
export type Platform = z.infer<typeof platformSchema>;

export const modeSchema = z.enum(["fallback", "live"]);
export type PlayerMode = z.infer<typeof modeSchema>;

export const playerStateSchema = z.object({
  id: z.string(),
  mode: modeSchema,
  fallback_platform: platformSchema.nullable(),
  fallback_url: z.string().nullable(),
  live_platform: platformSchema.nullable(),
  live_url: z.string().nullable(),
  started_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional()
});

export type PlayerState = z.infer<typeof playerStateSchema>;

export type ActiveSource = {
  mode: PlayerMode;
  platform: Platform | null;
  url: string | null;
  startedAt: string | null;
};
