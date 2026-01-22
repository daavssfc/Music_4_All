import { describe, expect, it } from "vitest";

import { escapeHtml, portableTextToPlainText } from "@/lib/security/sanitize";

describe("escapeHtml", () => {
  it("escapes special characters", () => {
    expect(escapeHtml("<script>alert('x')</script>")).toBe(
      "&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;"
    );
  });
});

describe("portableTextToPlainText", () => {
  it("extracts plain text from blocks", () => {
    const blocks = [
      { _type: "block", children: [{ text: "Hello " }, { text: "world" }] },
      { _type: "block", children: [{ text: "<b>bold</b>" }] }
    ];

    expect(portableTextToPlainText(blocks)).toBe("Hello world\n&lt;b&gt;bold&lt;/b&gt;");
  });

  it("returns empty string for invalid input", () => {
    expect(portableTextToPlainText(null)).toBe("");
  });
});
