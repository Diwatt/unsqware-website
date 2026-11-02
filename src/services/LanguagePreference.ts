import type { Lang } from "../i18n";

/**
 * The language a visitor explicitly picked with the FR/EN switch, and the
 * pre-rendered page that serves each language. Only an explicit choice is
 * stored: never the browser language, so crawlers always get the page they asked for.
 */
export class LanguagePreference {
  public static readonly STORAGE_KEY = "unsqware-lang";

  // Storage is read lazily: merely touching localStorage can throw (privacy modes, server pre-render).
  constructor(private readonly getStorage: () => Storage = () => globalThis.localStorage) {}

  public getPath(lang: Lang): string {
    return lang === "en" ? "/en/" : "/";
  }

  public getStored(): Lang | undefined {
    try {
      const value = this.getStorage().getItem(LanguagePreference.STORAGE_KEY);
      return value === "fr" || value === "en" ? value : undefined;
    } catch {
      return undefined;
    }
  }

  public store(lang: Lang): void {
    try {
      this.getStorage().setItem(LanguagePreference.STORAGE_KEY, lang);
    } catch {
      // Storage unavailable: the choice only lasts for this visit.
    }
  }
}
