import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { StudioLive } from "../src/StudioLive";

describe("StudioLive", () => {
  it("shows the six studio and live photos", async () => {
    await renderFr(<StudioLive />);

    const sources = [...document.querySelectorAll(".studio__grid img")].map((img) => img.getAttribute("src"));
    expect(sources).toHaveLength(6);
    expect(sources).toContain("/images/live-scene-2024.webp");
    expect(sources).toContain("/images/studio-batiskaf-batterie.webp");
  });

  it("tells the story from Batiskaf to the EP and highlights the closing line", async () => {
    await renderFr(<StudioLive />);

    expect(screen.getByText(/donne naissance au titre Evoli/)).toBeDefined();
    expect(screen.getByText(/Franck Martin à Rennes/)).toBeDefined();
    expect(screen.getByText(/fait de l'imprévu son terrain d'expression/).className).toBe("studio__closing");
  });

  it("lists the new influences, without MYT or Louis Matute", async () => {
    await renderFr(<StudioLive />);

    const influences = screen.getByText(/Aaron Parks \/ The Cinematic Orchestra \/ Avishai Cohen/);
    expect(influences.textContent).toContain("Julien Lourau");
    expect(influences.textContent).not.toMatch(/MYT|Matute/);
  });
});
