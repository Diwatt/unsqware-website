import { afterEach, describe, expect, it, vi } from "vitest";

import { GoogleAgendaClient, type AgendaConfig } from "../src/services/GoogleAgendaClient";

afterEach(() => {
  vi.unstubAllGlobals();
});

const config: AgendaConfig = {
  calendarId: "abc@group.calendar.google.com",
  apiKey: "KEY123",
  tag: "[GIG]",
};

describe("GoogleAgendaClient.buildEventsUrl", () => {
  it("builds the API URL with the expected params", () => {
    const url = new GoogleAgendaClient(config).buildEventsUrl(new Date("2026-10-30T12:00:00.000Z"));
    expect(url).toBe(
      "https://www.googleapis.com/calendar/v3/calendars/abc%40group.calendar.google.com/events" +
        "?key=KEY123&singleEvents=true&orderBy=startTime&maxResults=20" +
        "&timeMin=2026-10-30T12%3A00%3A00.000Z",
    );
  });
});

describe("GoogleAgendaClient.fetchEvents", () => {
  it("returns the API items", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [{ id: "a" }] }) });
    vi.stubGlobal("fetch", fetchMock);

    const items = await new GoogleAgendaClient(config).fetchEvents();
    expect(items).toStrictEqual([{ id: "a" }]);
    expect(fetchMock.mock.calls[0][0]).toContain("calendars/abc%40group.calendar.google.com/events?");
  });

  it("returns an empty list when the response has no items", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
    expect(await new GoogleAgendaClient(config).fetchEvents()).toStrictEqual([]);
  });

  it("rejects on an HTTP failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    await expect(new GoogleAgendaClient(config).fetchEvents()).rejects.toThrow("Google Calendar HTTP 403");
  });
});

describe("GoogleAgendaClient.isConfigured", () => {
  it("rejects an empty or placeholder config", () => {
    expect(new GoogleAgendaClient({ calendarId: "", apiKey: "", tag: "[GIG]" }).isConfigured()).toBe(false);
    expect(
      new GoogleAgendaClient({ calendarId: "VOTRE_ID_ICI", apiKey: "KEY", tag: "[GIG]" }).isConfigured(),
    ).toBe(false);
    expect(
      new GoogleAgendaClient({ calendarId: "abc@group.calendar.google.com", apiKey: "", tag: "[GIG]" }).isConfigured(),
    ).toBe(false);
  });

  it("accepts a filled-in config", () => {
    expect(new GoogleAgendaClient(config).isConfigured()).toBe(true);
  });
});
