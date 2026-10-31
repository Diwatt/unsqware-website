import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr, stubFetch, stubIntersectionObserver, stubMatchMedia } from "./helpers";
import App from "../src/App";

describe("App", () => {
  it("mounts every section in order and sets the page to French", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    stubFetch({ items: [] });
    await renderFr(<App />);

    for (const id of ["accueil", "groupe", "musique", "scene", "reseaux", "contact"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
    expect(screen.getByRole("heading", { name: "Prochaines dates" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "Écrivez-nous" })).toBeDefined();
    expect(document.documentElement.lang).toBe("fr");
  });
});
