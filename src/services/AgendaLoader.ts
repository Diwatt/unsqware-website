import { demoEvents } from "../data/dates-demo";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarEventParser } from "./CalendarEventParser";
import type { Gig } from "./Gig";
import { GoogleAgendaClient } from "./GoogleAgendaClient";

// Loads the gigs to display: the parsed demo dates when the Google
// credentials are missing, the Calendar API otherwise. Both payloads go
// through the same CalendarEvent ingestion; any failure rejects.
export class AgendaLoader {
  constructor(
    private readonly client: GoogleAgendaClient,
    private readonly parser: CalendarEventParser,
    // Injectable for tests; defaults to the demo dates payload.
    private readonly demoPayloads: unknown[] = demoEvents,
  ) {}

  // Gigs computed at first render: the demo dates when the credentials
  // are missing, an empty list otherwise — the API fetch replaces them
  // once it succeeds.
  public initialGigs(): Gig[] {
    return this.client.isConfigured() ? [] : this.parsePayloads(this.demoPayloads);
  }

  // Fetches the upcoming gigs from Google Calendar. Without credentials,
  // resolves to the demo dates without any network call.
  // @throws Error on network, HTTP or payload failure.
  public async fetchUpcoming(): Promise<Gig[]> {
    if (!this.client.isConfigured()) return this.initialGigs();

    return this.parsePayloads(await this.client.fetchEvents());
  }

  private parsePayloads(payloads: unknown[]): Gig[] {
    return this.parser.parseAll(payloads.map((raw) => new CalendarEvent(raw)));
  }
}
