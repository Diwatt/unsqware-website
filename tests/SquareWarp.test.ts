import { describe, expect, it } from "vitest";

import { SquareWarp } from "../src/services/SquareWarp";

describe("SquareWarp.getAmplitude", () => {
  it("grows with the scroll position", () => {
    expect(new SquareWarp(0).getAmplitude()).toBeCloseTo(1.5);
    expect(new SquareWarp(1000).getAmplitude()).toBeCloseTo(4);
  });

  it("is capped at 5", () => {
    expect(new SquareWarp(4000).getAmplitude()).toBe(5);
  });
});

describe("SquareWarp.getRotationDeg", () => {
  it("is zero at the top of the page", () => {
    expect(new SquareWarp(0).getRotationDeg()).toBeCloseTo(0);
  });

  it("oscillates with the scroll position", () => {
    expect(new SquareWarp(180).getRotationDeg()).toBeCloseTo(7.8294, 3);
  });
});

describe("SquareWarp.getMainPoints", () => {
  it("warps the base square from the scroll-derived time and amplitude", () => {
    expect(new SquareWarp(0).getMainPoints()).toBe("4.00,5.50 27.49,3.11 25.62,25.57 2.61,27.41");
  });
});

describe("SquareWarp.getEchoPoints", () => {
  it("applies a different phase and amplitude than the main square", () => {
    expect(new SquareWarp(0).getEchoPoints()).toBe("5.32,2.05 24.40,5.13 25.09,26.60 5.83,24.15");
  });
});
