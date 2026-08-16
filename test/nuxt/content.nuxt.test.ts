import { describe, expect, it } from "vitest";
import { aboutData, profileLinks } from "../../app/constants/about";
import { projects } from "../../app/constants/projects";

describe("portfolio content", () => {
  it("has a profile name and GitHub profile link", () => {
    expect(aboutData.name).toBe("Solomon Olatunji");
    expect(profileLinks.find((link) => link.icon === "github")?.href).toContain("github.com");
  });

  it("keeps every project link usable", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(
      projects.every((project) => project.links.every((link) => link.href.startsWith("http")))
    ).toBe(true);
  });
});
