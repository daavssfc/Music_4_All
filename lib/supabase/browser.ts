import { createClient } from "@supabase/supabase-js";

export const createBrowserSupabaseClient = (url: string, anonKey: string) => {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false
    }
  });
};
