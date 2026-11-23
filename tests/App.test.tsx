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

    const ids = [...document.querySelectorAll("main section[id]")].map((section) => section.id);
    expect(ids).toStrictEqual(["accueil", "groupe", "studio", "musique", "scene", "reseaux", "contact"]);
    expect(screen.getByRole("heading", { name: "Prochaines dates" })).toBeDefined();
    expect(screen.getByRole("heading", { name: "Faire jouer UNSQWARE" })).toBeDefined();
    expect(document.documentElement.lang).toBe("fr");
  });
});
