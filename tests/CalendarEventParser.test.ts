import { describe, expect, it } from "vitest";

import { CalendarEvent } from "../src/services/CalendarEvent";
import { CalendarEventParser } from "../src/services/CalendarEventParser";
import { Gig } from "../src/services/Gig";

// Events in the format returned by the Google Calendar v3 API (fields used
// by the site), modeled on the band's real calendar events.
const brewklyn = new CalendarEvent({
  id: "evt-brewklyn",
  summary: "[GIG] Le Brewklyn",
  location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
  start: { dateTime: "2026-11-12T18:00:00+01:00" },
});

const chezMaurice = new CalendarEvent({
  id: "evt-chez-maurice",
  summary: "[GIG] Chez Maurice",
  location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
  description: "avec le collectif https://example.com/billets",
  start: { date: "2026-12-05" },
});

const parser = new CalendarEventParser("[GIG]");

describe("CalendarEventParser.parse (tag filtering)", () => {
  const event = (summary: string): CalendarEvent =>
    new CalendarEvent({ id: "x", summary, start: { date: "2026-12-05" } });

  it("keeps only titles starting with the tag", () => {
    expect(parser.parse(event("[GIG] Chez Maurice"))).not.toBeNull();
    expect(parser.parse(event("Répétition quartet"))).toBeNull();
    expect(parser.parse(event("Le tag apparaît après [GIG]"))).toBeNull();
  });

  it("ignores the tag case", () => {
    expect(parser.parse(event("[gig] Festival Jazz"))).not.toBeNull();
  });

  it("strips the tag from the title, whatever the marker", () => {
    const emoji = new CalendarEventParser("🎵");
    const gig = emoji.parse(
      new CalendarEvent({
        id: "x",
        summary: "🎵 Chez Maurice",
        location: "Chez Maurice, Nantes",
        start: { date: "2026-12-05" },
      }),
    );
    expect(gig?.name).toBe("Chez Maurice");
  });
});

describe("CalendarEventParser.parse (full gigs)", () => {
  it("uses the location field for venue and city, the title for the name", () => {
    expect(parser.parse(brewklyn)).toStrictEqual(
      new Gig({
        id: "evt-brewklyn",
        start: new Date("2026-11-12T18:00:00+01:00"),
        allDay: false,
        name: "Le Brewklyn",
        venue: "BREWKLYN",
        city: "Rennes",
        details: undefined,
        ticketsUrl: undefined,
      }),
    );
  });

  it("all-day at local midnight + description with a link", () => {
    expect(parser.parse(chezMaurice)).toStrictEqual(
      new Gig({
        id: "evt-chez-maurice",
        start: new Date(2026, 11, 5),
        allDay: true,
        name: "Chez Maurice",
        venue: "Chez Maurice",
        city: "Nantes",
        details: "avec le collectif",
        ticketsUrl: "https://example.com/billets",
      }),
    );
  });

  it("without a location field, falls back to the \"Venue — City\" title", () => {
    const gig = parser.parse(
      new CalendarEvent({
        id: "x",
        summary: "[GIG] Le Ferrailleur — Nantes",
        start: { date: "2027-01-15" },
      }),
    );
    expect(gig).toStrictEqual(
      new Gig({
        id: "x",
        start: new Date(2027, 0, 15),
        allDay: true,
        name: undefined,
        venue: "Le Ferrailleur",
        city: "Nantes",
        details: undefined,
        ticketsUrl: undefined,
      }),
    );
  });

  it("returns null for an event without the tag", () => {
    expect(
      parser.parse(new CalendarEvent({ id: "y", summary: "Répétition", start: { date: "2026-12-06" } })),
    ).toBeNull();
  });
});

describe("CalendarEventParser.parse (geocoded location field)", () => {
  const venueCity = (location: string) => {
    const gig = parser.parse(
      new CalendarEvent({
        id: "x",
        summary: "[GIG] Nom d'event",
        location,
        start: { date: "2026-12-05" },
      }),
    );
    return { venue: gig?.venue, city: gig?.city };
  };

  it("venue = 1st part, city = the part with the postal code", () => {
    expect(venueCity("BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France")).toEqual({
      venue: "BREWKLYN",
      city: "Rennes",
    });
  });

  it("handles short addresses with a postal code", () => {
    expect(venueCity("Chez Maurice, 14 Cr Sully, 44000 Nantes, France")).toEqual({
      venue: "Chez Maurice",
      city: "Nantes",
    });
  });

  it("hand-typed location without postal code: city = 1st digit-free part", () => {
    expect(venueCity("Le Ferrailleur, Nantes")).toEqual({ venue: "Le Ferrailleur", city: "Nantes" });
  });

  it("location with no usable city: empty city", () => {
    expect(venueCity("Salle des Fêtes")).toEqual({ venue: "Salle des Fêtes", city: "" });
  });

  it("empty location: equivalent to an absent field (falls back to the title)", () => {
    const gig = parser.parse(
      new CalendarEvent({ id: "x", summary: "[GIG] Chez Maurice", location: "", start: { date: "2026-12-05" } }),
    );
    expect(gig).toMatchObject({ venue: "Chez Maurice", city: "" });
  });
});

describe("CalendarEventParser.parse (no location field: \"Venue — City\" title)", () => {
  const venueCity = (summary: string) => {
    const gig = parser.parse(new CalendarEvent({ id: "x", summary, start: { date: "2026-12-05" } }));
    return { venue: gig?.venue, city: gig?.city };
  };

  it("splits on an em dash", () => {
    expect(venueCity("[GIG] Le Brewklyn — Rennes")).toEqual({ venue: "Le Brewklyn", city: "Rennes" });
  });

  it("splits on a plain dash", () => {
    expect(venueCity("[GIG] Chez Maurice - Nantes")).toEqual({ venue: "Chez Maurice", city: "Nantes" });
  });

  it("only uses a dash in the middle of the title", () => {
    expect(venueCity("[GIG] L'Atelier - Bar - Lyon")).toEqual({ venue: "L'Atelier", city: "Bar - Lyon" });
  });

  it("puts everything in the venue when there is no dash", () => {
    expect(venueCity("[GIG] Festival Jazz à Vienne")).toEqual({
      venue: "Festival Jazz à Vienne",
      city: "",
    });
  });

  it("ignores a dash at the start of the title", () => {
    expect(venueCity("[GIG] — Soirée surprise")).toEqual({ venue: "Soirée surprise", city: "" });
  });
});

describe("CalendarEvent.parseAll", () => {
  it("filters out non-gigs, sorts by ascending date and does not mutate the input", () => {
    const input = [
      chezMaurice,
      brewklyn,
      new CalendarEvent({ id: "y", summary: "Répétition", start: { date: "2026-12-06" } }),
    ];
    const gigs = parser.parseAll(input);

    expect(gigs.map((g) => g.id)).toEqual(["evt-brewklyn", "evt-chez-maurice"]);
    // The input array keeps its original order.
    expect(input.map((e) => e.id)).toEqual(["evt-chez-maurice", "evt-brewklyn", "y"]);
  });
});
