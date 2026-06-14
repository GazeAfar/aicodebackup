import { describe, expect, it } from "vitest";
import { resolveLanguage, t } from "../src/i18n/index.js";
import { messages } from "../src/i18n/messages.js";

describe("i18n", () => {
  it("keeps zh-CN keys aligned with English keys", () => {
    expect(Object.keys(messages["zh-CN"]).sort()).toEqual(Object.keys(messages.en).sort());
  });

  it("falls back to English for unsupported languages", () => {
    expect(resolveLanguage("fr")).toBe("en");
    expect(resolveLanguage(undefined)).toBe("en");
  });

  it("interpolates values", () => {
    expect(t("en", "backup.commitMessage", { timestamp: "2026-06-14 10:30:00" })).toBe(
      "Backup: 2026-06-14 10:30:00",
    );
  });
});
