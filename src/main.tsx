import React from "react";
import ReactDOM from "react-dom/client";
import i18n, { type Lang } from "./i18n";
import App from "./App";
import { LanguagePreference } from "./services/LanguagePreference";
import "./index.scss";

const root = document.getElementById("root");
if (!root) throw new Error("main: #root element is missing from index.html");

const preference = new LanguagePreference();
const pageLang: Lang = document.documentElement.lang === "en" ? "en" : "fr";
const storedLang = preference.getStored();
// In production #root holds the pre-rendered page; in dev only the placeholder comment.
const isPrerendered = root.firstElementChild !== null;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (isPrerendered && storedLang && storedLang !== pageLang) {
  // An explicit FR/EN choice wins: open the pre-rendered page in that language.
  window.location.replace(preference.getPath(storedLang));
} else if (isPrerendered) {
  // Same language as the static HTML: React takes it over instead of redrawing it.
  i18n.changeLanguage(pageLang).then(() => ReactDOM.hydrateRoot(root, app));
} else {
  i18n.changeLanguage(storedLang ?? pageLang).then(() => ReactDOM.createRoot(root).render(app));
}
