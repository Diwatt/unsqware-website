import { describe, expect, it } from "vitest";

import { CalendarEvent } from "../src/services/CalendarEvent";

// The constructor ingests an untrusted Google Calendar v3 API payload and
// validates the fields the site uses; invalid payloads throw.
describe("CalendarEvent (Google ingestion)", () => {
  it("keeps the API payload fields, with a flattened start", () => {
    const event = new CalendarEvent({
      id: "evt-1",
      summary: "[GIG] Le Brewklyn",
      location: "BREWKLYN, Rennes, France",
      description: "avec le collectif",
      start: { date: "2026-11-12", timeZone: "Europe/Paris" },
    });

    expect(event.id).toBe("evt-1");
    expect(event.summary).toBe("[GIG] Le Brewklyn");
    expect(event.location).toBe("BREWKLYN, Rennes, France");
    expect(event.description).toBe("avec le collectif");
    expect(event.startDate).toBe("2026-11-12");
    expect(event.startDateTime).toBeUndefined();
  });

  it("defaults the optional fields to undefined", () => {
    const event = new CalendarEvent({
      id: "evt-1",
      summary: "[GIG] Chez Maurice",
      start: { dateTime: "2026-12-05T20:30:00+01:00" },
    });

    expect(event.location).toBeUndefined();
    expect(event.description).toBeUndefined();
    expect(event.startDate).toBeUndefined();
    expect(event.startDateTime).toBe("2026-12-05T20:30:00+01:00");
  });

  it("throws on a payload that is not an object", () => {
    expect(() => new CalendarEvent("nope")).toThrow("CalendarEvent: payload must be an object");
  });

  it("throws on a missing id", () => {
    expect(() => new CalendarEvent({ summary: "[GIG] Chez Maurice", start: { date: "2026-12-05" } })).toThrow(
      'CalendarEvent: "id" is required',
    );
  });

  it("throws on a missing summary", () => {
    expect(() => new CalendarEvent({ id: "evt-1", start: { date: "2026-12-05" } })).toThrow(
      'CalendarEvent: "summary" is required',
    );
  });

  it("throws on a mistyped optional field", () => {
    expect(() => new CalendarEvent({ id: "evt-1", summary: "s", location: 42, start: { date: "2026-12-05" } })).toThrow(
      'CalendarEvent: "location" must be a string',
    );
  });

  it("throws on a missing start", () => {
    expect(() => new CalendarEvent({ id: "evt-1", summary: "[GIG] Chez Maurice" })).toThrow(
      'CalendarEvent: "start" must be an object with a date or a dateTime',
    );
  });

  it("throws on a start without date or dateTime", () => {
    expect(() => new CalendarEvent({ id: "evt-1", summary: "s", start: { timeZone: "Europe/Paris" } })).toThrow(
      'CalendarEvent: "start" needs a date or a dateTime',
    );
  });
});

describe("CalendarEvent.isSamePlace", () => {
  it("recognizes the same venue despite case and article", () => {
    expect(CalendarEvent.isSamePlace("Le Brewklyn", "BREWKLYN")).toBe(true);
    expect(CalendarEvent.isSamePlace("Chez Maurice", "Chez Maurice")).toBe(true);
  });

  it("tells an event name apart from a different venue", () => {
    expect(CalendarEvent.isSamePlace("Soirée Clash", "Le Ferrailleur")).toBe(false);
  });
});
