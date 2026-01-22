const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => htmlEscapes[char]);

export const portableTextToPlainText = (blocks: unknown): string => {
  if (!Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") {
        return "";
      }

      const blockRecord = block as { _type?: string; children?: Array<{ text?: string }> };

      if (blockRecord._type !== "block" || !Array.isArray(blockRecord.children)) {
        return "";
      }

      return blockRecord.children.map((child) => (child?.text ? escapeHtml(child.text) : "")).join("");
    })
    .filter(Boolean)
    .join("\n");
};
