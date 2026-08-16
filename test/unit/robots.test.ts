import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("crawler configuration", () => {
  it("keeps a public robots.txt file", () => {
    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
  });
});
