import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

// Identifiants factices : la requête vers Google est stubbée dans chaque
// test, la vraie clé ne vit que dans .env.local (jamais dans le dépôt).
vi.mock("../src/config-agenda", () => ({
  agenda: { calendarId: "test@group.calendar.google.com", apiKey: "TEST_KEY", tag: "[GIG]" },
  demoEvents: [],
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
  it("affiche uniquement les events [GIG] de l'agenda, triés par date", async () => {
    stubFetch({ items: agendaItems });
    await renderFr(<Gigs />);

    expect(await screen.findByText("Le Brewklyn")).toBeDefined();
    expect(screen.getByText("Chez Maurice")).toBeDefined();
    expect(screen.getByText("12 nov.")).toBeDefined();
    expect(screen.getByText("5 déc.")).toBeDefined();
    expect(screen.getByText("Rennes")).toBeDefined();
    expect(screen.getByText("Nantes")).toBeDefined();
    // L'event sans tag n'est pas affiché
    expect(screen.queryByText("Répète")).toBeNull();
  });

  it("affiche l'heure, les détails et le lien billetterie de la description", async () => {
    stubFetch({ items: agendaItems });
    await renderFr(<Gigs />);

    // Brewklyn a une heure, Chez Maurice est journée entière avec une description
    expect(await screen.findByText("18:00")).toBeDefined();
    expect(screen.getByText("avec le collectif")).toBeDefined();
    const tickets = await screen.findByRole("link", { name: "Tickets" });
    expect(tickets.getAttribute("href")).toBe("https://example.com/billets");
  });

  it("retombe sur l'annonce si l'agenda est injoignable", async () => {
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
