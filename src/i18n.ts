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
    // React échappe déjà le contenu ; "fr-FR" est résolu en "fr" via supportedLngs.
    interpolation: { escapeValue: false },
    // Même comportement que l'ancienne implémentation : langue mémorisée, sinon navigateur, sinon français.
    // "path" : la page /en/ (pré-rendue en anglais) reste en anglais faute de préférence mémorisée.
    detection: {
      order: ["localStorage", "path", "navigator"],
      lookupLocalStorage: "unsqware-lang",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

// Clés de traduction typées : t("nav.band") est autocomplété, une clé inconnue est une erreur TS.
declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof fr;
    };
  }
}

export default i18n;
