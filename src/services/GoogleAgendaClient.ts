// Band agenda settings; the values come from config-agenda.ts
// (env variables, see .env.example).
export type AgendaConfig = {
  calendarId: string;
  apiKey: string;
  tag: string;
};

// Thin read-only Google Calendar v3 client for the band's public agenda.
export class GoogleAgendaClient {
  constructor(private readonly config: AgendaConfig) {}

  public buildEventsUrl(now: Date): string {
    const params = new URLSearchParams({
      key: this.config.apiKey,
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "20",
      timeMin: now.toISOString(),
    });
    return `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.config.calendarId)}/events?${params}`;
  }

  // Fetches the upcoming events from the Calendar API. The payload stays
  // untyped here: the CalendarEvent ingestion validates it downstream.
  // @throws Error on HTTP failure.
  public async fetchEvents(): Promise<unknown[]> {
    const response = await fetch(this.buildEventsUrl(new Date()));
    if (!response.ok) throw new Error(`Google Calendar HTTP ${response.status}`);
    const data: { items?: unknown[] } = await response.json();

    return data.items ?? [];
  }

  // The API key lives in the front end (public read-only calendar), we only fetch
  // if it has actually been set: "VOTRE…" = unfilled sample config.
  public isConfigured(): boolean {
    const calendarId = this.config.calendarId.trim();
    return (
      calendarId.length > 0 &&
      !calendarId.toUpperCase().includes("VOTRE") &&
      this.config.apiKey.trim().length > 0
    );
  }
}
