import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export type Lang = "fr" | "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    // React already escapes content; "fr-FR" resolves to "fr" via supportedLngs.
    interpolation: { escapeValue: false },
    // The page's <html lang> decides (set by the pre-render: / in French, /en/ in English), so
    // React can take over the static HTML as is; an explicit FR/EN choice is handled by
    // LanguagePreference in main.tsx and the Navbar, never cached automatically here.
    detection: {
      order: ["htmlTag"],
      caches: [],
    },
    react: { useSuspense: false },
  });

// Typed translation keys: t("nav.band") is autocompleted, an unknown key is a TS error.
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof fr;
    };
  }
}

export default i18n;
