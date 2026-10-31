import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { About } from "../src/About";

describe("About", () => {
  it("affiche les quatre musiciens avec leur rôle en français", async () => {
    await renderFr(<About />);

    expect(screen.getByText("Florian Roy")).toBeDefined();
    expect(screen.getByText("Basse · contrebasse · compos")).toBeDefined();
    expect(screen.getByText("Charles Demay")).toBeDefined();
    expect(screen.getByText("Batterie")).toBeDefined();
    expect(screen.getByText("Fabien Maurin")).toBeDefined();
    expect(screen.getByText("Victor Pavel")).toBeDefined();

    const members = document.querySelectorAll(".member");
    expect(members.length).toBe(4);
  });

  it("liste les influences séparées par des slashes", async () => {
    await renderFr(<About />);

    const influences = screen.getByText(/Aaron Parks \/ MYT/);
    expect(influences.textContent).toContain("Gogo Penguin");
    expect(influences.textContent).toContain("Foehn Trio");
  });

  it("présente les portraits avec un attribut alt explicite", async () => {
    await renderFr(<About />);

    expect(screen.getByAltText("Portrait de Florian Roy")).toBeDefined();
    expect(screen.getByAltText("Portrait de Victor Pavel")).toBeDefined();
  });
});
