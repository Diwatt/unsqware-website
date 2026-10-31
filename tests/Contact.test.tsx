import copy from "copy-to-clipboard";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Contact } from "../src/Contact";
import { EMAIL } from "../src/shared";

// The real library needs a working clipboard/execCommand; the component
// contract under test is the call and the feedback gating.
vi.mock("copy-to-clipboard", () => ({ default: vi.fn(() => true) }));

describe("Contact", () => {
  it("renders the clickable email address and the request links", async () => {
    await renderFr(<Contact />);

    const email = screen.getByRole("link", { name: EMAIL });
    expect(email.getAttribute("href")).toBe(`mailto:${EMAIL}`);
    expect(
      screen.getByRole("link", { name: /Programmateurs/ }).getAttribute("href"),
    ).toBe(`mailto:${EMAIL}?subject=${encodeURIComponent("Concert UNSQWARE")}`);
    expect(screen.getByText("Dossier de presse [à venir]")).toBeDefined();
  });

  it("shows the group photo next to the address", async () => {
    await renderFr(<Contact />);

    const photo = screen.getByRole("img", { name: "Les quatre musiciens devant un mur gris, en plein jour" });
    expect(photo.getAttribute("src")).toBe("/images/groupe-mur.jpg");
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
