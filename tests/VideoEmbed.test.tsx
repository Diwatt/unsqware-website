import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { VideoEmbed } from "../src/VideoEmbed";

describe("VideoEmbed", () => {
  it("loads the YouTube player only on click (lazy embed)", async () => {
    await renderFr(
      <VideoEmbed id="I4tQ71Z90Hw" title="Totem Live Session" poster="/images/session-salle.jpg" playLabel="Lire" />,
    );

    // Before the click: a clickable poster, no iframe
    expect(document.querySelector("iframe")).toBeNull();
    const poster = screen.getByRole("button", { name: "Lire : Totem Live Session" });

    fireEvent.click(poster);
    const iframe = await screen.findByTitle("Totem Live Session");
    expect(iframe.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/I4tQ71Z90Hw?autoplay=1");
  });

  it("uses the wide poster variant when asked", async () => {
    await renderFr(
      <VideoEmbed id="I4tQ71Z90Hw" title="Totem Live Session" poster="/images/session-salle.jpg" playLabel="Lire" wide />,
    );

    expect(screen.getByRole("button").getAttribute("class")).toBe("video video--wide");
  });
});
