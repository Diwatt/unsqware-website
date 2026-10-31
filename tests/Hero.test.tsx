import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Hero } from "../src/Hero";
import { LINKS } from "../src/shared";

describe("Hero", () => {
  it("renders the title, the EP badge and both calls to action", async () => {
    await renderFr(<Hero />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("UNSQWARE");
    expect(screen.getByText("Premier EP — début 2027")).toBeDefined();
    expect(screen.getByRole("link", { name: /Faire jouer UNSQWARE/ }).getAttribute("href")).toBe("#contact");
    expect(screen.getByRole("link", { name: /Voir la Totem Live Session/ }).getAttribute("href")).toBe("#musique");
  });

  it("shows the group photo behind the window", async () => {
    await renderFr(<Hero />);

    const photo = screen.getByRole("img", { name: /derrière une baie vitrée/ });
    expect(photo.getAttribute("src")).toBe("/images/groupe-vitre.jpg");
  });

  it("links to the band's social profiles", async () => {
    await renderFr(<Hero />);

    expect(screen.getByRole("link", { name: "Instagram ↗" }).getAttribute("href")).toBe(LINKS.instagram);
    expect(screen.getByRole("link", { name: "YouTube ↗" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.getByRole("link", { name: "Facebook ↗" }).getAttribute("href")).toBe(LINKS.facebook);
  });

  it("scrolls the new track titles in the decorative marquee", async () => {
    await renderFr(<Hero />);

    const marquee = document.querySelector(".marquee");
    expect(marquee?.getAttribute("aria-hidden")).toBe("true");
    expect(marquee?.textContent).toContain("Abondance");
    expect(marquee?.textContent).toContain("The Third is gentle");
  });
});
