type EnvCheckResult = {
  ok: boolean;
  missing: string[];
};

const requiredEnv = [
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_PROJECT_ID",
  "SANITY_DATASET",
  "SANITY_API_VERSION"
];

export const checkRequiredEnv = (): EnvCheckResult => {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  return {
    ok: missing.length === 0,
    missing
  };
};
