import { describe, expect, it } from "vitest";

import { GigFormatter } from "../src/services/GigFormatter";

describe("GigFormatter.date", () => {
  it("formats French day + short month, without a non-breaking space", () => {
    const formatter = new GigFormatter("fr");
    expect(formatter.date(new Date(2026, 11, 5))).toBe("5 déc.");
    expect(formatter.date(new Date(2026, 10, 21))).toBe("21 nov.");
  });

  it("formats English", () => {
    expect(new GigFormatter("en").date(new Date(2026, 11, 5))).toBe("Dec 5");
  });
});

describe("GigFormatter.time", () => {
  it("gives the time in 24-hour format", () => {
    const at2030 = new Date(2026, 10, 21, 20, 30);
    expect(new GigFormatter("fr").time(at2030)).toBe("20:30");
    expect(new GigFormatter("en").time(at2030)).toBe("20:30");
  });
});
