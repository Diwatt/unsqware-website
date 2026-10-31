import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { SectionTag, PlayIcon } from "../src/shared";

describe("SectionTag", () => {
  it("renders its label in the front face", async () => {
    await renderFr(<SectionTag label="04 — Sur scène" />);

    expect(screen.getByText("04 — Sur scène")).toBeDefined();
    // Two 3D slices + the face, all warped by the same random clip-path
    expect(document.querySelectorAll(".tag__depth").length).toBe(2);
    const face = document.querySelector(".tag__face") as HTMLElement | null;
    expect(face).toBeDefined();
    expect(face?.style.clipPath).toMatch(/^polygon\(/);
  });

  it("inverts the colors when inverted is set", async () => {
    await renderFr(<SectionTag label="06 — Contact" inverted />);

    const tag = screen.getByText("06 — Contact").closest("p");
    expect(tag?.getAttribute("class")).toBe("tag tag--inverted");
  });
});

describe("PlayIcon", () => {
  it("is decorative and hidden from screen readers", async () => {
    await renderFr(<PlayIcon />);

    const icon = document.querySelector(".icon--play") as HTMLElement | null;
    expect(icon?.getAttribute("aria-hidden")).toBe("true");
  });
});
