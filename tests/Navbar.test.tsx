import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr, stubIntersectionObserver, stubMatchMedia } from "./helpers";
import { Navbar } from "../src/Navbar";

describe("Navbar", () => {
  it("offers anchors for every section + contact", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    const expected = [
      ["Le groupe", "#groupe"],
      ["Musique", "#musique"],
      ["Sur scène", "#scene"],
      ["Réseaux", "#reseaux"],
      ["Nous contacter", "#contact"],
    ] as const;
    for (const [name, href] of expected) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toBe(href);
    }
  });

  it("renders the logo link with the logo class for navbar styling", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    expect(screen.getByRole("link", { name: "UNSQWARE" }).getAttribute("class")).toBe("logo");
  });

  it("opens and closes the mobile menu", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    const burger = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(burger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(burger);
    expect(screen.getByRole("button", { name: "Fermer le menu" }).getAttribute("aria-expanded")).toBe("true");
  });

  it("toggles the language FR ↔ EN", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    const fr = screen.getByRole("button", { name: "FR" });
    const en = screen.getByRole("button", { name: "EN" });
    expect(fr.getAttribute("aria-pressed")).toBe("true");
    expect(en.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(en);
    expect(en.getAttribute("aria-pressed")).toBe("true");
    expect(fr.getAttribute("aria-pressed")).toBe("false");
    // The link label follows the active language
    expect(screen.getByRole("link", { name: "The band" })).toBeDefined();
  });
});
