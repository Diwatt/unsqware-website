import { describe, expect, it } from "vitest";

import { Gig } from "../src/services/Gig";
import { GigEventMarkup } from "../src/services/GigEventMarkup";

function gig(overrides: Partial<ConstructorParameters<typeof Gig>[0]> = {}): Gig {
  return new Gig({
    allDay: false,
    city: "Nantes",
    details: undefined,
    end: new Date("2026-12-05T23:30:00Z"),
    id: "g1",
    name: "Chez Maurice",
    start: new Date("2026-12-05T19:30:00Z"),
    ticketsUrl: undefined,
    venue: "Chez Maurice, 14 Cr Sully",
    ...overrides,
  });
}

function parse(gigs: Gig[], markup = new GigEventMarkup()): Record<string, unknown>[] {
  return JSON.parse(markup.toJsonLd(gigs));
}

describe("GigEventMarkup.toJsonLd", () => {
  it("describes a timed gig as a MusicEvent performed by the band", () => {
    const [event] = parse([gig({ details: "avec le collectif" })]);

    expect(event["@type"]).toBe("MusicEvent");
    expect(event.name).toBe("UNSQWARE — Chez Maurice");
    expect(event.description).toBe("avec le collectif");
    expect(event.startDate).toBe("2026-12-05T19:30:00.000Z");
    expect(event.endDate).toBe("2026-12-05T23:30:00.000Z");
    expect(event.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(event.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
    expect(event.image).toBe("https://unsqwa.re/images/groupe-vitre.jpg");
    expect(event.location).toStrictEqual({
      "@type": "Place",
      name: "Chez Maurice",
      address: { "@type": "PostalAddress", addressLocality: "Nantes" },
    });
    expect(event.performer).toStrictEqual({ "@type": "MusicGroup", name: "UNSQWARE", url: "https://unsqwa.re/" });
    expect(event.organizer).toStrictEqual({ "@type": "Organization", name: "UNSQWARE", url: "https://unsqwa.re/" });
    expect(event.url).toBe("https://unsqwa.re/#scene");
  });

  it("uses the date alone for an all-day gig, on start and end alike", () => {
    const [event] = parse([gig({ allDay: true, start: new Date(2026, 10, 12), end: new Date(2026, 10, 12) })]);

    expect(event.startDate).toBe("2026-11-12");
    expect(event.endDate).toBe("2026-11-12");
  });

  it("falls back to the venue when the gig has no name", () => {
    const [event] = parse([gig({ name: undefined })]);

    expect(event.name).toBe("UNSQWARE — Chez Maurice, 14 Cr Sully");
  });

  it("falls back to a band description when the gig carries no details", () => {
    const [event] = parse([gig()]);

    expect(event.description).toBe(
      "Concert du quartet UNSQWARE — jazz moderne et progressif, la rondeur du jazz et l'énergie du rock.",
    );
  });

  it("describes the gig in english when built for english", () => {
    const [event] = parse([gig()], new GigEventMarkup("en"));

    expect(event.description).toBe(
      "Live show by the UNSQWARE quartet — modern progressive jazz, groove meets rock energy.",
    );
  });

  it("links the offer to the tickets page when there is one, to the event page otherwise", () => {
    const [withTickets, withoutTickets] = parse([
      gig({ ticketsUrl: "https://example.com/billets" }),
      gig({ id: "g2" }),
    ]);

    expect(withTickets.offers).toStrictEqual({ "@type": "Offer", url: "https://example.com/billets" });
    expect(withoutTickets.offers).toStrictEqual({ "@type": "Offer", url: "https://unsqwa.re/#scene" });
  });

  it("escapes < so the JSON cannot close its script tag", () => {
    const json = new GigEventMarkup().toJsonLd([gig({ name: "</script><b>" })]);

    expect(json).not.toContain("</script>");
    expect(JSON.parse(json)[0].name).toBe("UNSQWARE — </script><b>");
  });
});
