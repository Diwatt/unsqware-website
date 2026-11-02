import { afterEach, describe, expect, it } from "vitest";

import { LanguagePreference } from "../src/services/LanguagePreference";

afterEach(() => {
  localStorage.removeItem(LanguagePreference.STORAGE_KEY);
});

function brokenStorage(): Storage {
  throw new Error("SecurityError: storage disabled");
}

describe("LanguagePreference.getPath", () => {
  it("maps each language to its pre-rendered page", () => {
    const preference = new LanguagePreference();

    expect(preference.getPath("fr")).toBe("/");
    expect(preference.getPath("en")).toBe("/en/");
  });
});

describe("LanguagePreference.getStored", () => {
  it("returns the stored language", () => {
    localStorage.setItem(LanguagePreference.STORAGE_KEY, "en");

    expect(new LanguagePreference().getStored()).toBe("en");
  });

  it("ignores an unknown value", () => {
    localStorage.setItem(LanguagePreference.STORAGE_KEY, "de");

    expect(new LanguagePreference().getStored()).toBeUndefined();
  });

  it("returns nothing when the storage is unavailable", () => {
    expect(new LanguagePreference(brokenStorage).getStored()).toBeUndefined();
  });
});

describe("LanguagePreference.store", () => {
  it("remembers the chosen language", () => {
    new LanguagePreference().store("en");

    expect(localStorage.getItem(LanguagePreference.STORAGE_KEY)).toBe("en");
  });

  it("does not throw when the storage is unavailable", () => {
    expect(() => new LanguagePreference(brokenStorage).store("fr")).not.toThrow();
  });
});
