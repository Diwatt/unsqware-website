import type { CalendarEvent } from "./CalendarEvent";
import { Gig } from "./Gig";

// Venue and city, parsed from the geocoded "location" field or the "Venue — City" title.
type VenueCity = { venue: string; city: string };

// Parses Google Calendar events into displayable gigs: filtering by the [GIG]
// tag, title/location parsing, description cleanup, date normalization.
export class CalendarEventParser {
  constructor(private readonly tag: string) {}

  // Returns null for events that are not tagged gigs.
  public parse(event: CalendarEvent): Gig | null {
    if (!this.isGigEvent(event.summary)) return null;

    const start = this.parseStart(event.startDate, event.startDateTime);

    const description = event.description ?? "";
    const ticketsUrl = this.extractUrl(description);
    const title = this.stripTag(event.summary);
    const location = event.location?.trim();
    const place = location ? this.parseLocation(location) : this.parseVenueCity(title);

    return new Gig({
      id: event.id,
      start: start.at,
      allDay: start.allDay,
      name: location ? title : undefined,
      venue: place.venue,
      city: place.city,
      details: this.cleanDetails(description, ticketsUrl) || undefined,
      ticketsUrl,
    });
  }

  // Parses the events, drops non-gig ones and sorts by ascending start date,
  // without mutating the input array.
  public parseAll(events: CalendarEvent[]): Gig[] {
    return events
      .map((event) => this.parse(event))
      .filter((gig): gig is Gig => gig !== null)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  // Description without the tickets URL, whitespace collapsed.
  private cleanDetails(description: string, ticketsUrl: string | undefined): string {
    return description
      .replace(ticketsUrl ?? "", "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  private extractUrl(description: string): string | undefined {
    return description.match(/https?:\/\/\S+/)?.[0];
  }

  private isGigEvent(summary: string): boolean {
    return summary.trimStart().toLowerCase().startsWith(this.tag.toLowerCase());
  }

  private parseStart(startDate: string | undefined, startDateTime: string | undefined): { at: Date; allDay: boolean } {
    return startDateTime
      ? { at: new Date(startDateTime), allDay: false }
      : { at: this.parseAllDayDate(startDate ?? ""), allDay: true };
  }

  // An all-day event ("date" alone) is parsed at LOCAL midnight:
  // "new Date("2026-12-05")" would read it as UTC and could shift a day.
  private parseAllDayDate(date: string): Date {
    const [y, m, d] = date.split("-").map(Number);

    return new Date(y, (m ?? 1) - 1, d ?? 1);
  }

  // Google "Location" field, usually geocoded:
  // "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France".
  // Venue = 1st part; city = the part with the postal code, otherwise the
  // 1st digit-free part after the venue.
  private parseLocation(location: string): VenueCity {
    const segments = location
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (segments.length === 0) return { venue: "", city: "" };
    const [venue, ...rest] = segments;
    const fromPostalCode = rest.map((s) => s.match(/^\d{4,5}\s+(.+)$/)?.[1]).find(Boolean);
    const city = (fromPostalCode ?? rest.find((s) => !/\d/.test(s)) ?? "").trim();

    return { venue, city };
  }

  // Title "Venue — City" (or "Venue - City"), as a fallback when the event
  // has no location field. Everything before the first dash surrounded by
  // spaces is the venue; "Bar - Lyon" stays a whole city.
  private parseVenueCity(rest: string): VenueCity {
    // Decorative dash at the start of a title ("[GIG] — Surprise night"): ignored.
    const cleaned = rest.replace(/^\s*[—–-]\s*/, "");
    const match = cleaned.match(/\s[—–-]\s/);
    if (!match || match.index === undefined) {
      return { venue: cleaned, city: "" };
    }

    return {
      venue: cleaned.slice(0, match.index).trim(),
      city: cleaned.slice(match.index + match[0].length).trim(),
    };
  }

  // Assumes a gig-tagged summary: map() already filtered it.
  private stripTag(summary: string): string {
    return summary.trim().slice(this.tag.length).trim();
  }
}
