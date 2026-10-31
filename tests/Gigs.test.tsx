import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

// Fake credentials: the Google request is stubbed in every test, the real
// key only lives in .env.local (never in the repository).
vi.mock("../src/config-agenda", () => ({
  agenda: { calendarId: "test@group.calendar.google.com", apiKey: "TEST_KEY", tag: "[GIG]" },
}));

import { renderFr, stubFetch } from "./helpers";
import { Gigs } from "../src/Gigs";

const agendaItems = [
  {
    id: "evt-brewklyn",
    summary: "[GIG] Le Brewklyn",
    location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
    start: { dateTime: "2026-11-12T18:00:00+01:00" },
  },
  {
    id: "evt-repete",
    summary: "Répète",
    start: { date: "2026-11-18" },
  },
  {
    id: "evt-chez-maurice",
    summary: "[GIG] Chez Maurice",
    location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
    description: "avec le collectif https://example.com/billets",
    start: { date: "2026-12-05" },
  },
];

describe("Gigs", () => {
  it("renders only the [GIG] events from the agenda, sorted by date", async () => {
    stubFetch({ items: agendaItems });
    await renderFr(<Gigs />);

    expect(await screen.findByText("Le Brewklyn")).toBeDefined();
    expect(screen.getByText("Chez Maurice")).toBeDefined();
    expect(screen.getByText("12 nov.")).toBeDefined();
    expect(screen.getByText("5 déc.")).toBeDefined();
    expect(screen.getByText("Rennes")).toBeDefined();
    expect(screen.getByText("Nantes")).toBeDefined();
    // The untagged event is not rendered
    expect(screen.queryByText("Répète")).toBeNull();
  });

  it("renders the time, details and tickets link from the description", async () => {
    stubFetch({ items: agendaItems });
    await renderFr(<Gigs />);

    // Brewklyn has a time, Chez Maurice is all-day with a description
    expect(await screen.findByText("18:00")).toBeDefined();
    expect(screen.getByText("avec le collectif")).toBeDefined();
    const tickets = await screen.findByRole("link", { name: "Tickets" });
    expect(tickets.getAttribute("href")).toBe("https://example.com/billets");
  });

  it("puts the concert photos in a decorative background, without a timeline", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    const backdrop = document.querySelector(".live__backdrop");
    expect(backdrop?.getAttribute("aria-hidden")).toBe("true");
    const sources = [...(backdrop?.querySelectorAll("img") ?? [])].map((img) => img.getAttribute("src"));
    expect(sources).toEqual(["/images/scene-vue-haut.jpg", "/images/scene-batterie.jpg", "/images/scene-guitare.jpg"]);
    expect(screen.queryByRole("img")).toBeNull();
    expect(document.querySelector(".timeline")).toBeNull();
  });

  it("falls back to the announcement when the agenda is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Google Calendar HTTP 403")),
    );
    await renderFr(<Gigs />);

    expect(
      await screen.findByText(/Les nouvelles dates sont annoncées d'abord sur/),
    ).toBeDefined();
    expect(document.querySelector(".dates")).toBeNull();
  });
});
