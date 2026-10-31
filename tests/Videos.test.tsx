import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { Videos } from "../src/Videos";
import { VideoEmbed } from "../src/VideoEmbed";
import { LINKS } from "../src/shared";

describe("Videos", () => {
  it("liste les deux titres de la session avec leur durée", async () => {
    await renderFr(<Videos />);

    expect(screen.getByText("Abandon me")).toBeDefined();
    expect(screen.getByText("Find the Meaning")).toBeDefined();
    expect(screen.getByText("05:51")).toBeDefined();
    expect(screen.getByText("11:26")).toBeDefined();
    expect(screen.getByRole("link", { name: /Toute la chaîne YouTube/ }).getAttribute("href")).toBe(
      LINKS.youtube,
    );
  });

  it("ne charge le lecteur YouTube qu'au clic (lazy embed)", async () => {
    await renderFr(<VideoEmbed id="I4tQ71Z90Hw" title="Totem Live Session" poster="/images/totem.jpg" playLabel="Lire" />);

    // Avant le clic : une vignette cliquable, pas d'iframe
    expect(document.querySelector("iframe")).toBeNull();
    const poster = screen.getByRole("button", { name: "Lire : Totem Live Session" });

    fireEvent.click(poster);
    const iframe = await screen.findByTitle("Totem Live Session");
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube-nocookie.com/embed/I4tQ71Z90Hw?autoplay=1",
    );
  });

  it("affiche les sessions studio en complément du Totem", async () => {
    await renderFr(<Videos />);

    expect(screen.getByText("Evoli")).toBeDefined();
    expect(screen.getByText("Algebra")).toBeDefined();
    const embeds = document.querySelectorAll("button.video");
    expect(embeds.length).toBe(3);
  });
});
