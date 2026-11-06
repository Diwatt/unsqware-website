// A gig to display, derived from a tagged Google Calendar event.
export class Gig {
  public readonly allDay: boolean;
  public readonly city: string;
  public readonly details: string | undefined;
  public readonly end: Date;
  public readonly id: string;
  public readonly name: string | undefined;
  public readonly start: Date;
  public readonly ticketsUrl: string | undefined;
  public readonly venue: string;

  constructor(fields: {
    allDay: boolean;
    city: string;
    details: string | undefined;
    end: Date;
    id: string;
    name: string | undefined;
    start: Date;
    ticketsUrl: string | undefined;
    venue: string;
  }) {
    this.allDay = fields.allDay;
    this.city = fields.city;
    this.details = fields.details;
    this.end = fields.end;
    this.id = fields.id;
    this.name = fields.name;
    this.start = fields.start;
    this.ticketsUrl = fields.ticketsUrl;
    this.venue = fields.venue;
  }
}
