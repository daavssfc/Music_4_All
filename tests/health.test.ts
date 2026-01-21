import { describe, expect, it } from "vitest";

import { getHealthPayload } from "@/lib/health";

describe("getHealthPayload", () => {
  it("returns an ok status with a timestamp", () => {
    const payload = getHealthPayload();

    expect(payload.status).toBe("ok");
    expect(payload.service).toBe("music-4-all");
    expect(payload.timestamp).toEqual(expect.any(String));
  });
});
