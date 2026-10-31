import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr, stubFetch, stubIntersectionObserver, stubMatchMedia } from "./helpers";
import App from "../src/App";

describe("App", () => {
  it("monte toutes les sections dans l'ordre et passe la page en français", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    stubFetch({ items: [] });
    await renderFr(<App />);

    for (const id of ["accueil", "groupe", "musique", "videos", "scene", "reseaux", "contact"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
    expect(screen.getByRole("heading", { name: "Prochaines dates" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "Écrivez-nous" })).toBeDefined();
    expect(document.documentElement.lang).toBe("fr");
  });
});
