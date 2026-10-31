import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderFr } from "./helpers";
import { About } from "../src/About";

describe("About", () => {
  it("lists the influences separated by slashes", async () => {
    await renderFr(<About />);

    const influences = screen.getByText(/Aaron Parks \/ MYT/);
    expect(influences.textContent).toContain("Gogo Penguin");
    expect(influences.textContent).toContain("Foehn Trio");
  });
});
