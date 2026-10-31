import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

// The module mocks apply to the whole file: they simulate a config
// WITHOUT credentials to test demo mode (sample dates).
// The API-backed tests (with stubbed fetch) live in Gigs.test.tsx.
vi.mock("../src/config-agenda", () => ({
  agenda: { calendarId: "", apiKey: "", tag: "[GIG]" },
}));

vi.mock("../src/data/dates-demo", () => ({
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

describe("Gigs (demo mode)", () => {
  it("renders the sample dates without calling the API", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    await renderFr(<Gigs />);

    expect(await screen.findByText("Le Brewklyn")).toBeDefined();
    expect(screen.getByText("Chez Maurice")).toBeDefined();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
