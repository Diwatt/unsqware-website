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

  // "20:30" (24h clock)
  public time(date: Date): string {
    return this.format(date, { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  private format(date: Date, options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.lang, options).format(date).replace(/[\u00A0\u202F]/g, " ");
  }
}
