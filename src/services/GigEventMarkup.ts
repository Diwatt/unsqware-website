import type { Gig } from "./Gig";

/**
 * Turns the upcoming gigs into schema.org MusicEvent structured data, so search
 * engines can list the band's concerts directly in their results.
 */
export class GigEventMarkup {
  private static readonly BAND_NAME = "UNSQWARE";
  private static readonly SITE_URL = "https://unsqwa.re/";

  // JSON-LD string, safe to inline in a <script> tag ("<" is escaped).
  public toJsonLd(gigs: Gig[]): string {
    return JSON.stringify(gigs.map((gig) => this.toEvent(gig))).replace(/</g, "\\u003c");
  }

  private toEvent(gig: Gig): Record<string, unknown> {
    const place = gig.name ?? gig.venue;
    const event: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      name: `${GigEventMarkup.BAND_NAME} — ${place}`,
      startDate: gig.allDay ? this.toLocalDate(gig.start) : gig.start.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: place,
        address: { "@type": "PostalAddress", addressLocality: gig.city },
      },
      performer: { "@type": "MusicGroup", name: GigEventMarkup.BAND_NAME, url: GigEventMarkup.SITE_URL },
      url: `${GigEventMarkup.SITE_URL}#scene`,
    };
    if (gig.ticketsUrl) event.offers = { "@type": "Offer", url: gig.ticketsUrl };

    return event;
  }

  // All-day gigs carry no time: the date alone, read in local time like the display.
  private toLocalDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${date.getFullYear()}-${month}-${day}`;
  }
}
