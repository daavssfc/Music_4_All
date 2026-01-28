import { describe, expect, it } from "vitest";

import { getHealthPayload } from "@/lib/health";

describe("getHealthPayload", () => {
  it("returns an ok status with a timestamp when env is configured", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
    process.env.NEXT_PUBLIC_SANITY_API_VERSION = "2024-01-01";
    process.env.SANITY_PROJECT_ID = "test";
    process.env.SANITY_DATASET = "test";
    process.env.SANITY_API_VERSION = "2024-01-01";

    const payload = getHealthPayload();

    expect(payload.status).toBe("ok");
    expect(payload.service).toBe("music-4-all");
    expect(payload.timestamp).toEqual(expect.any(String));
  });
});
