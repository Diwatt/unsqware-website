import { afterEach, describe, expect, it, vi } from "vitest";

import { AgendaLoader } from "../src/services/AgendaLoader";
import { CalendarEventParser } from "../src/services/CalendarEventParser";
import { GoogleAgendaClient } from "../src/services/GoogleAgendaClient";
import { Gig } from "../src/services/Gig";

const parser = new CalendarEventParser("[GIG]");
const demoPayloads = [
  {
    id: "demo-1",
    summary: "[GIG] Le Brewklyn",
    location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
    start: { date: "2026-12-05" },
  },
  {
    id: "demo-2",
    summary: "Répétition",
    start: { date: "2026-12-06" },
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("AgendaLoader.initialGigs", () => {
  it("parses the demo payloads when the credentials are missing", () => {
    const client = new GoogleAgendaClient({ calendarId: "", apiKey: "", tag: "[GIG]" });
    const gigs = new AgendaLoader(client, parser, demoPayloads).initialGigs();

    expect(gigs).toStrictEqual([
      new Gig({
        id: "demo-1",
        start: new Date(2026, 11, 5),
        allDay: true,
        name: "Le Brewklyn",
        venue: "BREWKLYN",
        city: "Rennes",
        details: undefined,
        ticketsUrl: undefined,
      }),
    ]);
  });

  it("returns an empty list when the credentials are set (the API fetch takes over)", () => {
    const client = new GoogleAgendaClient({ calendarId: "abc@group.calendar.google.com", apiKey: "KEY", tag: "[GIG]" });
    expect(new AgendaLoader(client, parser, demoPayloads).initialGigs()).toStrictEqual([]);
  });
});

describe("AgendaLoader.fetchUpcoming", () => {
  it("resolves to the demo dates without any network call when the credentials are missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const client = new GoogleAgendaClient({ calendarId: "", apiKey: "", tag: "[GIG]" });

    const gigs = await new AgendaLoader(client, parser, demoPayloads).fetchUpcoming();
    expect(gigs.map((gig) => gig.id)).toStrictEqual(["demo-1"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches, ingests and parses the Google payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          items: [
            { id: "a", summary: "[GIG] Chez Maurice", start: { date: "2026-12-05" } },
            { id: "b", summary: "Répétition", start: { date: "2026-12-06" } },
          ],
        }),
      }),
    );
    const client = new GoogleAgendaClient({ calendarId: "abc@group.calendar.google.com", apiKey: "KEY", tag: "[GIG]" });

    const gigs = await new AgendaLoader(client, parser, []).fetchUpcoming();
    expect(gigs.map((gig) => gig.id)).toStrictEqual(["a"]);
  });

  it("rejects on an HTTP failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    const client = new GoogleAgendaClient({ calendarId: "abc@group.calendar.google.com", apiKey: "KEY", tag: "[GIG]" });

    await expect(new AgendaLoader(client, parser, []).fetchUpcoming()).rejects.toThrow("Google Calendar HTTP 403");
  });

  it("rejects when a payload item fails the CalendarEvent ingestion", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [{ id: "x" }] }) }));
    const client = new GoogleAgendaClient({ calendarId: "abc@group.calendar.google.com", apiKey: "KEY", tag: "[GIG]" });

    await expect(new AgendaLoader(client, parser, []).fetchUpcoming()).rejects.toThrow(
      'CalendarEvent: "summary" is required',
    );
  });
});
