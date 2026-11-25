import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import i18n from "../src/i18n";
import { renderFr } from "./helpers";
import { About } from "../src/About";

describe("About", () => {
  it("opens with the EPK bio, formed in Nantes in 2022", async () => {
    await renderFr(<About />);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Un carré qui se déforme");
    expect(screen.getByText(/Formé à Nantes en 2022/)).toBeDefined();
    expect(screen.queryByText(/2021/)).toBeNull();
  });

  it("captions the group photo with the musicians from left to right", async () => {
    await renderFr(<About />);

    const photo = screen.getByRole("img", { name: /devant un mur de graffitis/ });
    expect(photo.getAttribute("src")).toBe("/images/groupe-graff-34.webp");
    expect(photo.getAttribute("srcset")).toBe(
      "/images/groupe-graff-34-1200.webp 1200w, /images/groupe-graff-34.webp 2000w",
    );
    const names = [...document.querySelectorAll(".band-photo__name")].map((el) => el.textContent);
    expect(names).toStrictEqual(["Fabien Maurin", "Victor Pavel", "Charles Demay", "Florian Roy"]);
    expect(screen.getByText("De gauche à droite")).toBeDefined();
  });

  it("lists the influences right after the group photo", async () => {
    await renderFr(<About />);

    const box = document.querySelector(".band-photo + .influences");
    expect(box?.textContent).toContain("Aaron Parks / The Cinematic Orchestra / Avishai Cohen");
  });

  it("shows each musician's role in English on the English page", async () => {
    await renderFr(<About />);
    await i18n.changeLanguage("en");

    expect(await screen.findByText("Piano · keys")).toBeDefined();
  });
});
