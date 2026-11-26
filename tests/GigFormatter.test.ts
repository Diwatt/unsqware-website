import { describe, expect, it } from "vitest";

import { GigFormatter } from "../src/services/GigFormatter";

describe("GigFormatter.numericDate", () => {
  it("writes the local day of a date as DD/MM/YY in both languages", () => {
    expect(new GigFormatter("fr").numericDate(new Date(2026, 11, 5, 20, 30))).toBe("05/12/26");
    expect(new GigFormatter("en").numericDate(new Date(2027, 0, 9))).toBe("09/01/27");
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
