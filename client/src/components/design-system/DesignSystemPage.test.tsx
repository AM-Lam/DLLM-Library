import { describe, expect, it } from "vitest";
import { designSystemNavSections } from "./DesignSystemPage";

describe("designSystemNavSections", () => {
  it("includes the full v2 foundation and component navigation set", () => {
    const ids = designSystemNavSections.flatMap((section) => section.items.map((item) => item.id));

    expect(ids).toEqual(
      expect.arrayContaining([
        "governing",
        "colours",
        "tokens",
        "typography",
        "type-tokens",
        "radius-tokens",
        "spacing-tokens",
        "status-chip",
        "category-chip",
        "book-card",
      ]),
    );

    expect(ids).toHaveLength(10);
  });
});
