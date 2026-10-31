// Ingests one Google Calendar v3 API event. The API payload is untrusted:
// the constructor validates the fields the site uses and throws on
// anything unusable.
type CalendarEventStart = { date: string | undefined; dateTime: string | undefined };

export class CalendarEvent {
  public readonly description: string | undefined;
  public readonly id: string;
  public readonly location: string | undefined;
  public readonly startDate: string | undefined;
  public readonly startDateTime: string | undefined;
  public readonly summary: string;

  // @throws Error when the payload is not a usable calendar event.
  constructor(raw: unknown) {
    if (!CalendarEvent.isRecord(raw)) throw new Error("CalendarEvent: payload must be an object");

    this.id = CalendarEvent.requireString(raw, "id");
    this.summary = CalendarEvent.requireString(raw, "summary");
    this.location = CalendarEvent.optionalString(raw, "location");
    this.description = CalendarEvent.optionalString(raw, "description");

    const start = CalendarEvent.readStart(raw);
    this.startDate = start.date;
    this.startDateTime = start.dateTime;
  }

  // "Le Brewklyn" (title) and "BREWKLYN" (geocoded venue) mean the same
  // thing: comparison insensitive to case, accents and punctuation,
  // by inclusion in either direction.
  public static isSamePlace(a: string, b: string): boolean {
    const na = CalendarEvent.normalizePlace(a);
    const nb = CalendarEvent.normalizePlace(b);

    return na.length > 0 && nb.length > 0 && (na.includes(nb) || nb.includes(na));
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }

  private static normalizePlace(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  private static optionalString(record: Record<string, unknown>, field: string): string | undefined {
    const value = record[field];
    if (value === undefined) return undefined;
    if (typeof value !== "string") throw new Error(`CalendarEvent: "${field}" must be a string`);

    return value;
  }

  private static readStart(raw: Record<string, unknown>): CalendarEventStart {
    if (!CalendarEvent.isRecord(raw.start)) {
      throw new Error('CalendarEvent: "start" must be an object with a date or a dateTime');
    }

    const date = CalendarEvent.optionalString(raw.start, "date");
    const dateTime = CalendarEvent.optionalString(raw.start, "dateTime");
    if (!date && !dateTime) throw new Error('CalendarEvent: "start" needs a date or a dateTime');

    return { date, dateTime };
  }

  private static requireString(record: Record<string, unknown>, field: string): string {
    const value = CalendarEvent.optionalString(record, field);
    if (value === undefined) throw new Error(`CalendarEvent: "${field}" is required`);

    return value;
  }
}
