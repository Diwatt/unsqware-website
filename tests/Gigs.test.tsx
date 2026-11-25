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
    expect(screen.getByRole("heading", { name: "Prochaines dates" })).toBeDefined();
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

  it("publishes the gigs as MusicEvent structured data", async () => {
    stubFetch({ items: agendaItems });
    await renderFr(<Gigs />);
    await screen.findByText("Le Brewklyn");

    const script = document.querySelector('script[type="application/ld+json"]');
    const events = JSON.parse(script?.textContent ?? "[]");
    expect(events.map((e: { name: string }) => e.name)).toStrictEqual([
      "UNSQWARE — Le Brewklyn",
      "UNSQWARE — Chez Maurice",
    ]);
  });

  it("publishes no structured data when there is no upcoming gig", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it("opens with the MDS group photo, no longer with the ZAW shoot", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    expect(screen.getByRole("img", { name: /en lumière violette/ }).getAttribute("src")).toBe(
      "/images/groupe-violet-mds.webp",
    );
    expect(document.querySelector('img[src*="scene-"]')).toBeNull();
  });

  it("serves the full-width banner in full resolution, with a lighter copy for phones", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    const banner = screen.getByRole("img", { name: /en lumière violette/ });
    expect(banner.getAttribute("srcset")).toBe(
      "/images/groupe-violet-mds-1200.webp 1200w, /images/groupe-violet-mds.webp 2400w",
    );
    expect(banner.getAttribute("sizes")).toBe("100vw");
  });

  it("is the agenda section, without the timeline nor the call for dates", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    expect(document.querySelector("section")?.id).toBe("agenda");
    expect(document.querySelector(".tag__face")?.textContent).toBe("Agenda");
    expect(screen.queryByRole("heading", { name: "Parcours" })).toBeNull();
    expect(screen.queryByText(/Proposer une date/)).toBeNull();
  });

  it("lists the 2026 shows with their EPK date format", async () => {
    stubFetch({ items: [] });
    await renderFr(<Gigs />);

    expect(screen.getByRole("heading", { name: "Agenda 2026" })).toBeDefined();
    expect(document.querySelectorAll(".agenda li")).toHaveLength(12);
    expect(screen.getByText("06/02/26")).toBeDefined();
    expect(screen.getByText("Prog Night, La Carrière (Nantes)")).toBeDefined();
  });

  it("keeps only the 2026 shows when the agenda is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Google Calendar HTTP 403")),
    );
    await renderFr(<Gigs />);

    expect(await screen.findByRole("heading", { name: "Agenda 2026" })).toBeDefined();
    expect(screen.queryByRole("heading", { name: "Prochaines dates" })).toBeNull();
    expect(document.querySelector(".dates")).toBeNull();
    expect(screen.queryByText(/annoncées d'abord sur/)).toBeNull();
  });
});
