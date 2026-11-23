import type { Lang } from "../i18n";

// Formats gig dates and times with Intl, normalizing the non-breaking
// spaces it emits (U+00A0 / U+202F depending on the engine) to plain
// spaces for identical rendering everywhere.
export class GigFormatter {
  constructor(private readonly lang: Lang) {}

  // "5 déc." / "Dec 5"
  public date(date: Date): string {
    return this.format(date, { day: "numeric", month: "short" });
  }

  // "2026-02-06" → "06/02/26", the EPK agenda format, in both languages.
  // @throws Error when the day is not written as YYYY-MM-DD.
  public numericDay(isoDay: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDay);
    if (!match) throw new Error(`GigFormatter: "${isoDay}" is not a YYYY-MM-DD day`);
    const [, year, month, day] = match;

    return `${day}/${month}/${year.slice(2)}`;
  }

  // "20:30" (24h clock)
  public time(date: Date): string {
    return this.format(date, { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  private format(date: Date, options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.lang, options).format(date).replace(/[\u00A0\u202F]/g, " ");
  }
}
