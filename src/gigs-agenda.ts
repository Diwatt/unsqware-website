// ────────────────────────────────────────────────────────────────────
//  Lecture des dates de concert depuis un agenda Google Calendar.
//  La config (ID d'agenda, clé API, marqueur) vit dans config-agenda.ts.
//  Ce module contient la logique pure : filtrage par marqueur [GIG],
//  parsing du titre, mapping des events Google, tri et formatage.
// ────────────────────────────────────────────────────────────────────

export type Lang = "fr" | "en";

export type AgendaConfig = {
  calendarId: string;
  apiKey: string;
  tag: string;
};

// Sous-ensemble des champs de l'API Google Calendar v3 utilisés par le site.
export type CalendarEvent = {
  id: string;
  summary: string;
  location?: string;
  description?: string;
  start: { date?: string; dateTime?: string; timeZone?: string };
};

export type Gig = {
  id: string;
  start: Date;
  allDay: boolean;
  name?: string;
  venue: string;
  city: string;
  details?: string;
  ticketsUrl?: string;
};

export function isGigEvent(summary: string, tag: string): boolean {
  return summary.trimStart().toLowerCase().startsWith(tag.toLowerCase());
}

export function stripTag(summary: string, tag: string): string {
  if (!isGigEvent(summary, tag)) return summary.trim();
  return summary.trim().slice(tag.length).trim();
}

// Titre « Lieu — Ville » (ou « Lieu - Ville »), en repli quand l'event n'a
// pas de champ lieu. Tout avant le premier tiret entouré d'espaces est le
// lieu ; « Bar - Lyon » reste une ville entière.
export function parseVenueCity(rest: string): { venue: string; city: string } {
  // Tiret décoratif en début de titre (« [GIG] — Soirée surprise ») : ignoré.
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

// Champ « Lieu » de Google, généralement géocodé :
// « BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France ».
// Salle = 1re partie ; ville = la partie avec code postal, sinon la 1re
// partie sans chiffres après la salle.
export function parseLocation(location: string): { venue: string; city: string } {
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

// « Le Brewklyn » (titre) et « BREWKLYN » (salle géocodée) désignent la même
// chose : comparaison insensible à la casse, aux accents et à la ponctuation,
// par inclusion dans un sens ou l'autre.
export function isSamePlace(a: string, b: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const na = normalize(a);
  const nb = normalize(b);
  return na.length > 0 && nb.length > 0 && (na.includes(nb) || nb.includes(na));
}

// Un event journée entière (« date » seul) est parsé à minuit LOCAL :
// « new Date("2026-12-05") » le lirait en UTC et pourrait décaler d'un jour.
function parseAllDayDate(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function extractUrl(description: string): string | undefined {
  return description.match(/https?:\/\/\S+/)?.[0];
}

export function mapCalendarEvent(event: CalendarEvent, tag: string): Gig | null {
  if (!isGigEvent(event.summary ?? "", tag)) return null;

  const allDay = Boolean(event.start?.date) && !event.start?.dateTime;
  const start = allDay ? parseAllDayDate(event.start.date!) : new Date(event.start!.dateTime!);

  const description = event.description ?? "";
  const ticketsUrl = extractUrl(description);
  const details = description
    .replace(ticketsUrl ?? "", "")
    .replace(/\s{2,}/g, " ")
    .trim();
  const title = stripTag(event.summary, tag);
  const hasLocation = Boolean(event.location?.trim());
  const { venue, city } = hasLocation ? parseLocation(event.location!) : parseVenueCity(title);

  return {
    id: event.id,
    start,
    allDay,
    name: hasLocation ? title : undefined,
    venue,
    city,
    details: details || undefined,
    ticketsUrl,
  };
}

export function sortGigs(gigs: Gig[]): Gig[] {
  return [...gigs].sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function buildEventsUrl(config: AgendaConfig, now: Date): string {
  const params = new URLSearchParams({
    key: config.apiKey,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "20",
    timeMin: now.toISOString(),
  });
  return `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendarId)}/events?${params}`;
}

// La clé API vit dans le front (agenda public en lecture seule), on ne fetch
// que si elle a bien été renseignée : « VOTRE… » = config d'exemple non remplie.
export function isConfigured(config: AgendaConfig): boolean {
  const calendarId = config.calendarId.trim();
  return (
    calendarId.length > 0 &&
    !calendarId.toUpperCase().includes("VOTRE") &&
    config.apiKey.trim().length > 0
  );
}

// Les espaces insécables d'Intl (U+00A0 / U+202F selon les moteurs) sont
// normalisés en espace simple pour un rendu identique partout.
function formatIntl(date: Date, lang: Lang, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(lang, options).format(date).replace(/[\u00A0\u202F]/g, " ");
}

export function formatGigDate(date: Date, lang: Lang): string {
  return formatIntl(date, lang, { day: "numeric", month: "short" });
}

export function formatGigTime(date: Date, lang: Lang): string {
  return formatIntl(date, lang, { hour: "2-digit", minute: "2-digit", hour12: false });
}
