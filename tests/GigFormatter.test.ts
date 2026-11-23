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

describe("GigFormatter.numericDay", () => {
  it("writes a YYYY-MM-DD day as DD/MM/YY in both languages", () => {
    expect(new GigFormatter("fr").numericDay("2026-02-06")).toBe("06/02/26");
    expect(new GigFormatter("en").numericDay("2026-12-05")).toBe("05/12/26");
  });

  it("rejects a day written in another format", () => {
    expect(() => new GigFormatter("fr").numericDay("06/02/2026")).toThrow('"06/02/2026" is not a YYYY-MM-DD day');
  });
});

describe("GigFormatter.time", () => {
  it("gives the time in 24-hour format", () => {
    const at2030 = new Date(2026, 10, 21, 20, 30);
    expect(new GigFormatter("fr").time(at2030)).toBe("20:30");
    expect(new GigFormatter("en").time(at2030)).toBe("20:30");
  });
});
