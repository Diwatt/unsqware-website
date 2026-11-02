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

    const fr = screen.getByRole("link", { name: "FR" });
    const en = screen.getByRole("link", { name: "EN" });
    expect(fr.getAttribute("aria-current")).toBe("page");
    expect(en.getAttribute("aria-current")).toBeNull();

    fireEvent.click(en);
    expect(en.getAttribute("aria-current")).toBe("page");
    expect(fr.getAttribute("aria-current")).toBeNull();
    // The link label follows the active language
    expect(screen.getByRole("link", { name: "The band" })).toBeDefined();
  });

  it("links the language switch to the pre-rendered pages and updates the address", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    expect(screen.getByRole("link", { name: "FR" }).getAttribute("href")).toBe("/");
    const en = screen.getByRole("link", { name: "EN" });
    expect(en.getAttribute("href")).toBe("/en/");

    fireEvent.click(en);
    expect(window.location.pathname).toBe("/en/");
    fireEvent.click(screen.getByRole("link", { name: "FR" }));
    expect(window.location.pathname).toBe("/");
  });

  it("remembers the visitor's explicit language choice", async () => {
    stubIntersectionObserver();
    stubMatchMedia();
    await renderFr(<Navbar />);

    fireEvent.click(screen.getByRole("link", { name: "EN" }));
    expect(localStorage.getItem("unsqware-lang")).toBe("en");
  });
});
