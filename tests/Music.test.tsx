import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Music } from "../src/Music";
import { LINKS } from "../src/shared";

describe("Music", () => {
  it("met en avant la Totem Live Session avec un lien YouTube", async () => {
    await renderFr(<Music />);

    expect(screen.getByText("Totem")).toBeDefined();
    expect(screen.getByText(/captés à La Maison du Son/)).toBeDefined();
    expect(
      screen.getByRole("link", { name: /Regarder sur YouTube/ }).getAttribute("href"),
    ).toBe("https://www.youtube.com/watch?v=I4tQ71Z90Hw");
  });

  it("annonce le premier EP début 2027", async () => {
    await renderFr(<Music />);

    // Le titre EP est rendu en deux lignes séparées par un <br />
    const epTitle = document.querySelector(".music__ep-title");
    expect(epTitle?.textContent).toContain("Premier EP");
    expect(epTitle?.textContent).toContain("début 2027");
    expect(screen.getByText(/attendu début 2027/)).toBeDefined();
  });

  it("donne accès aux plateformes d'écoute", async () => {
    await renderFr(<Music />);

    // Noms exacts : « YouTube » (plateforme) ≠ « Regarder sur YouTube » (Totem)
    expect(screen.getByRole("link", { name: "Spotify" }).getAttribute("href")).toBe(LINKS.spotify);
    expect(screen.getByRole("link", { name: "Deezer" }).getAttribute("href")).toBe(LINKS.deezer);
    expect(screen.getByRole("link", { name: "YouTube" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.getByRole("link", { name: "SoundCloud" }).getAttribute("href")).toBe(LINKS.soundcloud);
  });
});
