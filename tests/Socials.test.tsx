import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Socials } from "../src/Socials";
import { LINKS } from "../src/shared";

describe("Socials", () => {
  it("links to the band's three social profiles, without SoundCloud", async () => {
    await renderFr(<Socials />);

    // A link's accessible name combines the network name + description
    const expected = [
      [/^Instagram/, LINKS.instagram],
      [/^YouTube/, LINKS.youtube],
      [/^Facebook/, LINKS.facebook],
    ] as const;
    for (const [name, href] of expected) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
    }
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.queryByText(/c'est sur nos réseaux que tout se passe/)).toBeNull();
  });

  it("features Instagram", async () => {
    await renderFr(<Socials />);

    const instagram = screen.getByRole("link", { name: /^Instagram/ });
    expect(instagram.className).toContain("social--featured");
    expect(screen.getByText("@unsqware · extraits, coulisses, dates")).toBeDefined();
  });
});
