import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Footer } from "../src/Footer";
import { LINKS } from "../src/shared";

describe("Footer", () => {
  it("renders the current-year copyright and the social links", async () => {
    await renderFr(<Footer />);

    expect(screen.getByText(`© ${new Date().getFullYear()} UNSQWARE — Nantes`)).toBeDefined();

    const links = [
      ["Instagram", LINKS.instagram],
      ["Facebook", LINKS.facebook],
      ["YouTube", LINKS.youtube],
      ["SoundCloud", LINKS.soundcloud],
    ] as const;
    for (const [name, href] of links) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
    }
  });
});
