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

  it("uses the EPK hook line, without the founding year", async () => {
    await renderFr(<Hero />);

    expect(screen.getByText("Jazz hybride — Nantes")).toBeDefined();
    expect(screen.getByText(/À la croisée du jazz moderne, du rock et de la musique progressive/)).toBeDefined();
    expect(screen.queryByText(/2021|MYT|Matute/)).toBeNull();
  });

  it("shows the EPK cover photo of the striped wall", async () => {
    await renderFr(<Hero />);

    const photo = screen.getByRole("img", { name: /mur peint de rayures/ });
    expect(photo.getAttribute("src")).toBe("/images/hero-groupe-mur-raye.webp");
    // The hero photo is the largest visible element: it loads first.
    expect(photo.getAttribute("fetchpriority")).toBe("high");
  });

  it("links to the band's social profiles", async () => {
    await renderFr(<Hero />);

    expect(screen.getByRole("link", { name: "Instagram ↗" }).getAttribute("href")).toBe(LINKS.instagram);
    expect(screen.getByRole("link", { name: "YouTube ↗" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.getByRole("link", { name: "Facebook ↗" }).getAttribute("href")).toBe(LINKS.facebook);
  });

  it("no longer has the scrolling titles banner", async () => {
    await renderFr(<Hero />);

    expect(document.querySelector(".marquee")).toBeNull();
  });
});
