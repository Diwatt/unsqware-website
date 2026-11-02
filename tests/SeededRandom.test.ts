import { describe, expect, it } from "vitest";

import { SeededRandom } from "../src/services/SeededRandom";

function sequence(seed: string, length = 5): number[] {
  const random = new SeededRandom(seed);
  return Array.from({ length }, () => random.next());
}

describe("SeededRandom.next", () => {
  it("yields the same sequence for the same seed", () => {
    expect(sequence("01 — Le groupe")).toStrictEqual(sequence("01 — Le groupe"));
  });

  it("yields a different sequence for another seed", () => {
    expect(sequence("01 — Le groupe")).not.toStrictEqual(sequence("02 — Musique"));
  });

  it("stays within [0, 1)", () => {
    for (const value of sequence("05 — Contact", 200)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
