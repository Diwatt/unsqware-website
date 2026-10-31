import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { SectionTag, PlayIcon } from "../src/shared";

describe("SectionTag", () => {
  it("affiche son libellé dans la face avant", async () => {
    await renderFr(<SectionTag label="04 — Sur scène" shape={2} />);

    expect(screen.getByText("04 — Sur scène")).toBeDefined();
    // Deux tranches en relief + la face, toutes déformées par le même clip-path
    expect(document.querySelectorAll(".tag__depth").length).toBe(2);
    expect(document.querySelector(".tag__face")).toBeDefined();
  });
});

describe("PlayIcon", () => {
  it("est décoratif et masqué aux lecteurs d'écran", async () => {
    await renderFr(<PlayIcon />);

    const icon = document.querySelector(".icon--play") as HTMLElement | null;
    expect(icon?.getAttribute("aria-hidden")).toBe("true");
  });
});
