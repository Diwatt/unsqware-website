import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Music } from "../src/Music";
import { LINKS } from "../src/shared";

describe("Music", () => {
  it("is the releases section, tagged without a number", async () => {
    await renderFr(<Music />);

    expect(document.querySelector("section")?.id).toBe("sorties");
    expect(document.querySelector(".tag__face")?.textContent).toBe("Sorties");
  });

  it("embeds the Totem Live Session with its EPK text", async () => {
    await renderFr(<Music />);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Totem Live Session");
    expect(screen.getByText(/Dans cette live session publiée en 2025/)).toBeDefined();
    const poster = screen.getByRole("button", { name: "Lire la vidéo : Totem Live Session" });
    expect(poster.querySelector("img")?.getAttribute("src")).toBe("/images/studio-mds-salle-2.webp");
  });

  it("lists the two session tracks with their duration", async () => {
    await renderFr(<Music />);

    expect(screen.getByText("Abandon me")).toBeDefined();
    expect(screen.getByText("Find the Meaning")).toBeDefined();
    expect(screen.getByText("05:35")).toBeDefined();
    expect(screen.getByText("05:45")).toBeDefined();
  });

  it("announces the debut EP recorded with Franck Martin", async () => {
    await renderFr(<Music />);

    expect(screen.getByRole("heading", { name: "Premier EP" })).toBeDefined();
    expect(screen.getByText("À paraître · début 2027")).toBeDefined();
    expect(screen.getByText(/Ezurlie Magic Studio/)).toBeDefined();
  });

  it("presents Evoli and where to listen, without SoundCloud", async () => {
    await renderFr(<Music />);

    expect(screen.getByRole("heading", { name: "Evoli" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Page artiste" }).getAttribute("href")).toBe(LINKS.spotify);
    expect(screen.getByRole("link", { name: "@unsqware" }).getAttribute("href")).toBe(LINKS.youtube);
    expect(screen.queryByText(/SoundCloud/)).toBeNull();
  });
});
