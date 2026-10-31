import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Socials } from "../src/Socials";
import { LINKS } from "../src/shared";

describe("Socials", () => {
  it("renvoie vers les quatre réseaux du groupe", async () => {
    await renderFr(<Socials />);

    // Le nom accessible d'un lien combine nom du réseau + description
    const expected = [
      [/^Instagram/, LINKS.instagram],
      [/^YouTube/, LINKS.youtube],
      [/^Facebook/, LINKS.facebook],
      [/^SoundCloud/, LINKS.soundcloud],
    ] as const;
    for (const [name, href] of expected) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
    }
  });

  it("met Instagram en avant", async () => {
    await renderFr(<Socials />);

    const instagram = screen.getByRole("link", { name: /^Instagram/ });
    expect(instagram.className).toContain("social--featured");
    expect(screen.getByText("@unsqware · extraits, coulisses, dates")).toBeDefined();
  });
});
