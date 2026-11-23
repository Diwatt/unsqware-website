import copy from "copy-to-clipboard";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Contact } from "../src/Contact";
import { EMAIL, LINKS } from "../src/shared";

// The real library needs a working clipboard/execCommand; the component
// contract under test is the call and the feedback gating.
vi.mock("copy-to-clipboard", () => ({ default: vi.fn(() => true) }));

describe("Contact", () => {
  it("renders the booking call, the clickable email address and the request links", async () => {
    await renderFr(<Contact />);

    expect(screen.getByRole("heading", { name: "Faire jouer UNSQWARE" })).toBeDefined();
    expect(screen.queryByText(/répond lui-même/)).toBeNull();
    const email = screen.getByRole("link", { name: EMAIL });
    expect(email.getAttribute("href")).toBe(`mailto:${EMAIL}`);
    expect(
      screen.getByRole("link", { name: /Programmateurs/ }).getAttribute("href"),
    ).toBe(`mailto:${EMAIL}?subject=${encodeURIComponent("Concert UNSQWARE")}`);
  });

  it("offers the EPK 2027 for download", async () => {
    await renderFr(<Contact />);

    const kit = screen.getByRole("link", { name: /Télécharger l'EPK/ });
    expect(kit.getAttribute("href")).toBe("/UNSQWARE-EPK-2027.pdf");
    expect(kit.hasAttribute("download")).toBe(true);
  });

  it("lists the site and social rows, and the set formats", async () => {
    await renderFr(<Contact />);

    expect(screen.getByRole("link", { name: "unsqwa.re" }).getAttribute("href")).toBe("https://unsqwa.re/");
    expect(screen.getByRole("link", { name: "unsqwaremusique" }).getAttribute("href")).toBe(LINKS.facebook);
    expect(screen.getByText(/Set de 30 min \(tremplin\)/)).toBeDefined();
  });

  it("opens with the group photo in front of the blue mural", async () => {
    await renderFr(<Contact />);

    const photo = screen.getByRole("img", { name: "Les quatre musiciens d'UNSQWARE devant une fresque bleue" });
    expect(photo.getAttribute("src")).toBe("/images/groupe-graff-37.webp");
    // Full width on screen: the full-resolution file is offered to large screens.
    expect(photo.getAttribute("srcset")).toBe(
      "/images/groupe-graff-37-1200.webp 1200w, /images/groupe-graff-37.webp 2000w",
    );
  });

  it("copies the address on click and confirms for two seconds", async () => {
    vi.mocked(copy).mockResolvedValue(true);
    await renderFr(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Copier l'adresse" }));

    expect(await screen.findByText("Adresse copiée ✓")).toBeDefined();
    expect(copy).toHaveBeenCalledWith(EMAIL);
  });

  it("does not show the copied feedback when the copy fails", async () => {
    vi.mocked(copy).mockResolvedValue(false);
    await renderFr(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Copier l'adresse" }));

    await screen.findByText("Copier l'adresse");
    expect(screen.queryByText("Adresse copiée ✓")).toBeNull();
  });
});
