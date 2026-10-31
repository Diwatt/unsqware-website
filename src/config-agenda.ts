// ════════════════════════════════════════════════════════════════════
//  GIG AGENDA — connection to the band's Google Calendar
// ════════════════════════════════════════════════════════════════════
//  The site automatically displays calendar events whose TITLE starts
//  with the "tag" marker below. For a gig date:
//
//  • TITLE       : [GIG] Event name — displayed large
//  • LOCATION    : the venue — let Google complete the address, it
//                  geocodes on its own (e.g. "Chez Maurice, 14 Cr Sully,
//                  44000 Nantes, France"). The city shows on the right
//                  of the line, the venue in small if the title doesn't already say it.
//  • DESCRIPTION : details (e.g. "with the Machin collective"); if it
//                  contains a link, it becomes the "Tickets" button.
//
//  PRIVACY RULE (in the calendar settings):
//  • Calendar shared publicly + "Default visibility of events" = Private.
//  • Rehearsals and appointments: nothing to do, they are invisible to the public from the start.
//  • Gig date: event visibility = "Public" + [GIG] title.
//  A forgotten event = missing from the site; it never leaks.
//
//  CREDENTIALS (the repo is public, the key is NOT in the code):
//  copy .env.example to .env.local and fill in the calendar ID and
//  API key there. In production, these are build-time variables.
//  Without these values (dev, tests), the site displays the demo dates
//  (raw payload in data/dates-demo.ts).

export const agenda = {
  // Google Calendar ID: in calendar.google.com → calendar settings
  // → "Integrate calendar" → "Calendar ID".
  calendarId: import.meta.env.VITE_CALENDAR_ID ?? "",

  // Google API key (console.cloud.google.com → APIs & Services → Credentials),
  // restricted to the Calendar API + the site's referrers.
  apiKey: import.meta.env.VITE_CALENDAR_API_KEY ?? "",

  // Marker for events to display on the site (title prefix).
  tag: "[GIG]",
};
