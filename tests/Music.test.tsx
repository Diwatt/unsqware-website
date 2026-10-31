import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Music } from "../src/Music";
import { LINKS } from "../src/shared";

describe("Music", () => {
  it("renders its section tag as an inverted warped square on the accent background", async () => {
    await renderFr(<Music />);

    const tag = screen.getByText("02 — Musique").closest("p");
    expect(tag?.getAttribute("class")).toBe("tag tag--inverted");
  });

  it("embeds the Totem Live Session player with the session room as poster", async () => {
    await renderFr(<Music />);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Totem Live Session");
    const poster = screen.getByRole("button", { name: "Lire la vidéo : Totem Live Session" });
    expect(poster.querySelector("img")?.getAttribute("src")).toBe("/images/session-salle.jpg");
  });

  it("lists the two session tracks with their duration", async () => {
    await renderFr(<Music />);

    expect(screen.getByText("Abandon me")).toBeDefined();
    expect(screen.getByText("Find the Meaning")).toBeDefined();
    expect(screen.getByText("05:35")).toBeDefined();
    expect(screen.getByText("05:45")).toBeDefined();
    expect(screen.getByText(/Captée à La Maison du Son/)).toBeDefined();
  });

  it("mentions the upcoming EP in the section footer", async () => {
    await renderFr(<Music />);

    expect(screen.getByText("Premier EP — début 2027").getAttribute("class")).toBe("music__ep");
  });

  it("links to the streaming platforms", async () => {
    await renderFr(<Music />);

    expect(screen.getByRole("link", { name: "Spotify" }).getAttribute("href")).toBe(LINKS.spotify);
    expect(screen.getByRole("link", { name: "YouTube" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.getByRole("link", { name: "SoundCloud" }).getAttribute("href")).toBe(LINKS.soundcloud);
  });
});
