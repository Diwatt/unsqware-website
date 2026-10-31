import { describe, expect, it } from "vitest";

import {
  buildEventsUrl,
  formatGigDate,
  formatGigTime,
  isConfigured,
  isGigEvent,
  isSamePlace,
  mapCalendarEvent,
  parseLocation,
  parseVenueCity,
  sortGigs,
  stripTag,
  type AgendaConfig,
  type CalendarEvent,
} from "../src/gigs-agenda";

// Événements au format renvoyé par l'API Google Calendar v3 (champs utilisés),
// calqués sur les vrais events de l'agenda du groupe.
const brewklyn: CalendarEvent = {
  id: "evt-brewklyn",
  summary: "[GIG] Le Brewklyn",
  location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
  start: { dateTime: "2026-11-12T18:00:00+01:00" },
};

const chezMaurice: CalendarEvent = {
  id: "evt-chez-maurice",
  summary: "[GIG] Chez Maurice",
  location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
  description: "avec le collectif https://example.com/billets",
  start: { date: "2026-12-05" },
};

describe("isGigEvent", () => {
  it("garde uniquement les titres qui commencent par le tag", () => {
    expect(isGigEvent("[GIG] Chez Maurice", "[GIG]")).toBe(true);
    expect(isGigEvent("Répétition quartet", "[GIG]")).toBe(false);
    expect(isGigEvent("Le tag apparaît après [GIG]", "[GIG]")).toBe(false);
  });

  it("ignore la casse du tag", () => {
    expect(isGigEvent("[gig] Festival Jazz", "[GIG]")).toBe(true);
  });
});

describe("stripTag", () => {
  it("retire le tag et les espaces", () => {
    expect(stripTag("[GIG] Le Brewklyn", "[GIG]")).toBe("Le Brewklyn");
  });

  it("marche avec n'importe quel marqueur", () => {
    expect(stripTag("🎵 Chez Maurice", "🎵")).toBe("Chez Maurice");
  });
});

describe("parseLocation", () => {
  it("salle = 1re partie, ville = la partie avec code postal", () => {
    expect(parseLocation("BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France")).toEqual({
      venue: "BREWKLYN",
      city: "Rennes",
    });
  });

  it("gère les adresses courtes avec code postal", () => {
    expect(parseLocation("Chez Maurice, 14 Cr Sully, 44000 Nantes, France")).toEqual({
      venue: "Chez Maurice",
      city: "Nantes",
    });
  });

  it("lieu saisi à la main sans code postal : ville = 1re partie sans chiffres", () => {
    expect(parseLocation("Le Ferrailleur, Nantes")).toEqual({
      venue: "Le Ferrailleur",
      city: "Nantes",
    });
  });

  it("lieu sans ville exploitable : ville vide", () => {
    expect(parseLocation("Salle des Fêtes")).toEqual({ venue: "Salle des Fêtes", city: "" });
  });

  it("lieu vide : rien", () => {
    expect(parseLocation("")).toEqual({ venue: "", city: "" });
  });
});

describe("parseVenueCity (repli sans champ lieu : titre « Lieu — Ville »)", () => {
  it("sépare sur un tiret cadratin", () => {
    expect(parseVenueCity("Le Brewklyn — Rennes")).toEqual({ venue: "Le Brewklyn", city: "Rennes" });
  });

  it("sépare sur un tiret simple", () => {
    expect(parseVenueCity("Chez Maurice - Nantes")).toEqual({ venue: "Chez Maurice", city: "Nantes" });
  });

  it("utilise un tiret au milieu du titre uniquement", () => {
    expect(parseVenueCity("L'Atelier - Bar - Lyon")).toEqual({ venue: "L'Atelier", city: "Bar - Lyon" });
  });

  it("met tout dans le lieu si pas de tiret", () => {
    expect(parseVenueCity("Festival Jazz à Vienne")).toEqual({ venue: "Festival Jazz à Vienne", city: "" });
  });

  it("ignore un tiret en début de titre", () => {
    expect(parseVenueCity("— Soirée surprise")).toEqual({ venue: "Soirée surprise", city: "" });
  });
});

describe("isSamePlace", () => {
  it("reconnaît la même salle malgré la casse et l'article", () => {
    expect(isSamePlace("Le Brewklyn", "BREWKLYN")).toBe(true);
    expect(isSamePlace("Chez Maurice", "Chez Maurice")).toBe(true);
  });

  it("distingue un nom d'event d'une salle différente", () => {
    expect(isSamePlace("Soirée Clash", "Le Ferrailleur")).toBe(false);
  });
});

describe("mapCalendarEvent", () => {
  it("utilise le champ lieu pour la salle et la ville, le titre pour le nom", () => {
    const gig = mapCalendarEvent(brewklyn, "[GIG]");
    expect(gig).toEqual({
      id: "evt-brewklyn",
      start: new Date("2026-11-12T18:00:00+01:00"),
      allDay: false,
      name: "Le Brewklyn",
      venue: "BREWKLYN",
      city: "Rennes",
      details: undefined,
      ticketsUrl: undefined,
    });
  });

  it("journée entière à minuit local + description avec lien", () => {
    const gig = mapCalendarEvent(chezMaurice, "[GIG]");
    expect(gig).toEqual({
      id: "evt-chez-maurice",
      start: new Date(2026, 11, 5),
      allDay: true,
      name: "Chez Maurice",
      venue: "Chez Maurice",
      city: "Nantes",
      details: "avec le collectif",
      ticketsUrl: "https://example.com/billets",
    });
  });

  it("sans champ lieu, retombe sur le titre « Lieu — Ville »", () => {
    const gig = mapCalendarEvent(
      { id: "x", summary: "[GIG] Le Ferrailleur — Nantes", start: { date: "2027-01-15" } },
      "[GIG]",
    );
    expect(gig).toEqual({
      id: "x",
      start: new Date(2027, 0, 15),
      allDay: true,
      name: undefined,
      venue: "Le Ferrailleur",
      city: "Nantes",
      details: undefined,
      ticketsUrl: undefined,
    });
  });

  it("renvoie null pour un event sans le tag", () => {
    expect(
      mapCalendarEvent({ id: "y", summary: "Répétition", start: { date: "2026-12-06" } }, "[GIG]"),
    ).toBeNull();
  });
});

describe("sortGigs", () => {
  it("trie par date croissante sans muter l'entrée", () => {
    const a = mapCalendarEvent(chezMaurice, "[GIG]")!;
    const b = mapCalendarEvent(brewklyn, "[GIG]")!;
    const sorted = sortGigs([a, b]);
    expect(sorted).toEqual([b, a]);
    expect(sorted).not.toBe([a, b]);
  });
});

describe("buildEventsUrl", () => {
  it("construit l'URL de l'API avec les params attendus", () => {
    const config: AgendaConfig = {
      calendarId: "abc@group.calendar.google.com",
      apiKey: "KEY123",
      tag: "[GIG]",
    };
    const url = buildEventsUrl(config, new Date("2026-10-30T12:00:00.000Z"));
    expect(url).toBe(
      "https://www.googleapis.com/calendar/v3/calendars/abc%40group.calendar.google.com/events" +
        "?key=KEY123&singleEvents=true&orderBy=startTime&maxResults=20" +
        "&timeMin=2026-10-30T12%3A00%3A00.000Z",
    );
  });
});

describe("isConfigured", () => {
  it("refuse une config vide ou en placeholder", () => {
    expect(isConfigured({ calendarId: "", apiKey: "", tag: "[GIG]" })).toBe(false);
    expect(isConfigured({ calendarId: "VOTRE_ID_ICI", apiKey: "KEY", tag: "[GIG]" })).toBe(false);
    expect(isConfigured({ calendarId: "abc@group.calendar.google.com", apiKey: "", tag: "[GIG]" })).toBe(false);
  });

  it("accepte une config remplie", () => {
    expect(isConfigured({ calendarId: "abc@group.calendar.google.com", apiKey: "KEY", tag: "[GIG]" })).toBe(true);
  });
});

describe("formatGigDate", () => {
  it("formate en français jour + mois court, sans espace insécable", () => {
    expect(formatGigDate(new Date(2026, 11, 5), "fr")).toBe("5 déc.");
    expect(formatGigDate(new Date(2026, 10, 21), "fr")).toBe("21 nov.");
  });

  it("formate en anglais", () => {
    expect(formatGigDate(new Date(2026, 11, 5), "en")).toBe("Dec 5");
  });
});

describe("formatGigTime", () => {
  it("donne l'heure au format 24h", () => {
    expect(formatGigTime(new Date(2026, 10, 21, 20, 30), "fr")).toBe("20:30");
    expect(formatGigTime(new Date(2026, 10, 21, 20, 30), "en")).toBe("20:30");
  });
});
