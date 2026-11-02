import { describe, expect, it } from "vitest";

import { Gig } from "../src/services/Gig";
import { GigEventMarkup } from "../src/services/GigEventMarkup";

function gig(overrides: Partial<ConstructorParameters<typeof Gig>[0]> = {}): Gig {
  return new Gig({
    allDay: false,
    city: "Nantes",
    details: undefined,
    id: "g1",
    name: "Chez Maurice",
    start: new Date("2026-12-05T19:30:00Z"),
    ticketsUrl: undefined,
    venue: "Chez Maurice, 14 Cr Sully",
    ...overrides,
  });
}

function parse(gigs: Gig[]): Record<string, unknown>[] {
  return JSON.parse(new GigEventMarkup().toJsonLd(gigs));
}

describe("GigEventMarkup.toJsonLd", () => {
  it("describes a timed gig as a MusicEvent performed by the band", () => {
    const [event] = parse([gig()]);

    expect(event["@type"]).toBe("MusicEvent");
    expect(event.name).toBe("UNSQWARE — Chez Maurice");
    expect(event.startDate).toBe("2026-12-05T19:30:00.000Z");
    expect(event.location).toStrictEqual({
      "@type": "Place",
      name: "Chez Maurice",
      address: { "@type": "PostalAddress", addressLocality: "Nantes" },
    });
    expect(event.performer).toStrictEqual({ "@type": "MusicGroup", name: "UNSQWARE", url: "https://unsqwa.re/" });
  });

  it("uses the date alone for an all-day gig", () => {
    const [event] = parse([gig({ allDay: true, start: new Date(2026, 10, 12) })]);

    expect(event.startDate).toBe("2026-11-12");
  });

  it("falls back to the venue when the gig has no name", () => {
    const [event] = parse([gig({ name: undefined })]);

    expect(event.name).toBe("UNSQWARE — Chez Maurice, 14 Cr Sully");
  });

  it("adds a ticket offer only when a tickets link exists", () => {
    const [withTickets, withoutTickets] = parse([
      gig({ ticketsUrl: "https://example.com/billets" }),
      gig({ id: "g2" }),
    ]);

    expect(withTickets.offers).toStrictEqual({ "@type": "Offer", url: "https://example.com/billets" });
    expect(withoutTickets.offers).toBeUndefined();
  });

  it("escapes < so the JSON cannot close its script tag", () => {
    const json = new GigEventMarkup().toJsonLd([gig({ name: "</script><b>" })]);

    expect(json).not.toContain("</script>");
    expect(JSON.parse(json)[0].name).toBe("UNSQWARE — </script><b>");
  });
});
