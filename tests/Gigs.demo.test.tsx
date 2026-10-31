import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

// Le mock de module s'applique à tout le fichier : ici on simule une
// config SANS identifiants pour tester le mode démo (dates d'exemple).
// Les tests qui branchent l'API (avec fetch stubbé) vivent dans Gigs.test.tsx.
vi.mock("../src/config-agenda", () => ({
  agenda: { calendarId: "", apiKey: "", tag: "[GIG]" },
  demoEvents: [
    {
      id: "demo-1",
      summary: "[GIG] Le Brewklyn",
      location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
      start: { dateTime: "2026-11-12T18:00:00+01:00" },
    },
    {
      id: "demo-2",
      summary: "[GIG] Chez Maurice",
      location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
      start: { date: "2026-12-05" },
    },
  ],
}));

import { renderFr } from "./helpers";
import { Gigs } from "../src/Gigs";

describe("Gigs (mode démo)", () => {
  it("affiche les dates d'exemple sans appeler l'API", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    await renderFr(<Gigs />);

    expect(await screen.findByText("Le Brewklyn")).toBeDefined();
    expect(screen.getByText("Chez Maurice")).toBeDefined();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
