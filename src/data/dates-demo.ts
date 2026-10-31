// ════════════════════════════════════════════════════════════════════
//  DEMO GIG DATES — displayed while the Google credentials are not set
// ════════════════════════════════════════════════════════════════════
//  Same fields as a Google Calendar API event, and validated the same
//  way when the site loads them: the TITLE must start with the "[GIG]"
//  tag (see config-agenda.ts).
//  • LOCATION    : the venue — e.g. "Chez Maurice, 14 Cr Sully,
//                  44000 Nantes, France".
//  • DESCRIPTION : details ("avec le collectif"); a link becomes the
//                  "Tickets" button.

export const demoEvents = [
  {
    id: "demo-brewklyn",
    summary: "[GIG] Le Brewklyn",
    location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
    start: { date: "2026-11-12" },
  },
  {
    id: "demo-chez-maurice",
    summary: "[GIG] Chez Maurice",
    location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
    description: "avec le collectif",
    start: { dateTime: "2026-12-05T20:30:00+01:00" },
  },
];
