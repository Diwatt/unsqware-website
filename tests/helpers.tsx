import { cleanup, render, type RenderResult } from "@testing-library/react";
import { afterEach, vi, type Mock } from "vitest";
import type { ReactElement } from "react";

import i18n from "../src/i18n";

// Without this, Testing Library does not unmount between tests (no
// global afterEach when vitest globals is disabled).
afterEach(() => {
  cleanup();
  localStorage.removeItem("unsqware-lang");
  vi.unstubAllGlobals();
});

// Components use useTranslation: we pin the render language
// (browser i18n detection would be random under jsdom).
export async function renderFr(ui: ReactElement): Promise<RenderResult> {
  await i18n.changeLanguage("fr");
  return render(ui);
}

// Missing from jsdom; used by the scrollspy and the Navbar logo.
export function stubIntersectionObserver(): void {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
}

// Missing from jsdom as well; the Navbar queries it to disable
// scroll animation under prefers-reduced-motion.
export function stubMatchMedia(matches = false): void {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

export function stubFetch(body: unknown): Mock {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => body });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
