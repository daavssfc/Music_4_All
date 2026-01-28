import { checkRequiredEnv } from "@/lib/env";

export const getHealthPayload = () => {
  const envCheck = checkRequiredEnv();

  return {
    status: envCheck.ok ? "ok" : "degraded",
    service: "music-4-all",
    timestamp: new Date().toISOString(),
    env: envCheck
  };
};
