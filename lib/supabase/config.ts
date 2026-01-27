export const getSupabasePublicConfig = () => {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return { url: null, anonKey: null };
  }

  return { url, anonKey };
};
