import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Hero } from "../src/Hero";
import { LINKS } from "../src/shared";

describe("Hero", () => {
  it("affiche le titre, le badge EP et les deux appels à l'action", async () => {
    await renderFr(<Hero />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("UNSQWARE");
    expect(screen.getByText("Premier EP — début 2027")).toBeDefined();
    expect(screen.getByRole("link", { name: /Faire jouer UNSQWARE/ }).getAttribute("href")).toBe("#contact");
    expect(screen.getByRole("link", { name: /Voir la Totem Live Session/ }).getAttribute("href")).toBe("#videos");
  });

  it("renvoie vers les réseaux du groupe", async () => {
    await renderFr(<Hero />);

    expect(screen.getByRole("link", { name: "Instagram ↗" }).getAttribute("href")).toBe(LINKS.instagram);
    expect(screen.getByRole("link", { name: "YouTube ↗" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.getByRole("link", { name: "Facebook ↗" }).getAttribute("href")).toBe(LINKS.facebook);
  });

  it("affiche le bandeau défilant en décoratif", async () => {
    await renderFr(<Hero />);

    const marquee = document.querySelector(".marquee");
    expect(marquee?.getAttribute("aria-hidden")).toBe("true");
    expect(marquee?.textContent).toContain("EP début 2027");
  });
});
