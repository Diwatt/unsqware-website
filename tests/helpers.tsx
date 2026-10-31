import { cleanup, render, type RenderResult } from "@testing-library/react";
import { afterEach, vi, type Mock } from "vitest";
import type { ReactElement } from "react";

import i18n from "../src/i18n";

// Sans ça, Testing Library ne se démonte pas entre les tests (pas de
// afterEach global quand vitest globals est désactivé).
afterEach(() => {
  cleanup();
  localStorage.removeItem("unsqware-lang");
  vi.unstubAllGlobals();
});

// Les composants utilisent useTranslation : on fige la langue du rendu
// (la détection i18n du navigateur serait aléatoire sous jsdom).
export async function renderFr(ui: ReactElement): Promise<RenderResult> {
  await i18n.changeLanguage("fr");
  return render(ui);
}

// Absent de jsdom ; utilisé par le scrollspy et le logo de la Navbar.
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

// Absent de jsdom également ; la Navbar l'interroge pour désactiver
// l'animation au scroll sous prefers-reduced-motion.
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
