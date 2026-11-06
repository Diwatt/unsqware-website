import type { Lang } from "../i18n";
import type { Gig } from "./Gig";

/**
 * Turns the upcoming gigs into schema.org MusicEvent structured data, so search
 * engines can list the band's concerts directly in their results.
 */
export class GigEventMarkup {
  private static readonly BAND_NAME = "UNSQWARE";
  // Last-resort description when the calendar event carries no details.
  private static readonly DEFAULT_DESCRIPTIONS: Record<Lang, string> = {
    fr: "Concert du quartet UNSQWARE — jazz moderne et progressif, la rondeur du jazz et l'énergie du rock.",
    en: "Live show by the UNSQWARE quartet — modern progressive jazz, groove meets rock energy.",
  };
  private static readonly EVENT_URL = "https://unsqwa.re/#scene";
  private static readonly GIG_IMAGE_URL = "https://unsqwa.re/images/groupe-vitre.jpg";
  private static readonly SITE_URL = "https://unsqwa.re/";

  constructor(private readonly lang: Lang = "fr") {}

  // JSON-LD string, safe to inline in a <script> tag ("<" is escaped).
  public toJsonLd(gigs: Gig[]): string {
    return JSON.stringify(gigs.map((gig) => this.toEvent(gig))).replace(/</g, "\\u003c");
  }

  private toEvent(gig: Gig): Record<string, unknown> {
    const place = gig.name ?? gig.venue;

    return {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      name: `${GigEventMarkup.BAND_NAME} — ${place}`,
      description: gig.details ?? GigEventMarkup.DEFAULT_DESCRIPTIONS[this.lang],
      startDate: gig.allDay ? this.toLocalDate(gig.start) : gig.start.toISOString(),
      endDate: gig.allDay ? this.toLocalDate(gig.end) : gig.end.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: GigEventMarkup.GIG_IMAGE_URL,
      location: {
        "@type": "Place",
        name: place,
        address: { "@type": "PostalAddress", addressLocality: gig.city },
      },
      offers: { "@type": "Offer", url: gig.ticketsUrl ?? GigEventMarkup.EVENT_URL },
      performer: { "@type": "MusicGroup", name: GigEventMarkup.BAND_NAME, url: GigEventMarkup.SITE_URL },
      organizer: { "@type": "Organization", name: GigEventMarkup.BAND_NAME, url: GigEventMarkup.SITE_URL },
      url: GigEventMarkup.EVENT_URL,
    };
  }

  // All-day gigs carry no time: the date alone, read in local time like the display.
  private toLocalDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${date.getFullYear()}-${month}-${day}`;
  }
}
