import { describe, expect, it } from "vitest";

import { WarpedShape } from "../src/services/WarpedShape";

describe("WarpedShape.getClipPath", () => {
  it("keeps a perfect square when the random source always returns 0.5", () => {
    expect(new WarpedShape(() => 0.5).getClipPath()).toBe("polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)");
  });

  it("jitters each corner within the hand-drawn bounds, clamped to the square", () => {
    const sequence = [0, 1, 0, 1, 0, 1, 0, 1];
    let call = 0;
    const rng = () => sequence[call++];

    expect(new WarpedShape(rng).getClipPath()).toBe("polygon(0% 14%, 95% 14%, 95% 100%, 0% 100%)");
  });

  it("produces a 4-point polygon by default", () => {
    expect(new WarpedShape().getClipPath()).toMatch(/^polygon\(\d+% \d+%(, \d+% \d+%){3}\)$/);
  });
});
