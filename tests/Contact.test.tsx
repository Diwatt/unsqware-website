import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Contact } from "../src/Contact";
import { EMAIL } from "../src/shared";

describe("Contact", () => {
  it("affiche l'adresse email cliquable et les demandes types", async () => {
    await renderFr(<Contact />);

    const email = screen.getByRole("link", { name: EMAIL });
    expect(email.getAttribute("href")).toBe(`mailto:${EMAIL}`);
    expect(
      screen.getByRole("link", { name: /Programmateurs/ }).getAttribute("href"),
    ).toBe(`mailto:${EMAIL}?subject=${encodeURIComponent("Concert UNSQWARE")}`);
    expect(screen.getByText("Dossier de presse [à venir]")).toBeDefined();
  });

  it("copie l'adresse au clic et confirme deux secondes", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    await renderFr(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Copier l'adresse" }));

    expect(await screen.findByText("Adresse copiée ✓")).toBeDefined();
    expect(writeText).toHaveBeenCalledWith(EMAIL);
  });
});
