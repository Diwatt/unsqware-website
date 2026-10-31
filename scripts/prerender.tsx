// Pré-rendu du site : génère le HTML statique (FR + EN) depuis l'app React elle-même.
// Chaîné par `pnpm build` :
//   1. `vite build --ssr scripts/prerender.tsx --outDir .prerender` compile ce fichier
//   2. `node .prerender/prerender.js` l'exécute en Node (imports node: externalisés par Vite)
// Sorties :
//   - dist/index.html    → page FR (https://unsqwa.re/)
//   - dist/en/index.html → page EN (https://unsqwa.re/en/)
//   - dist/sitemap.xml   → les deux URL + hreflang + lastmod = date du build
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import i18n from "../src/i18n";

type Lang = "fr" | "en";

const DOMAIN = "https://unsqwa.re";
const PLACEHOLDER = "<!--APP_HTML-->";

// Chaînes du <head> du template (FR) et leurs versions EN pour la page /en/.
const FR_HEAD = {
  title: "UNSQWARE — Quartet jazz hybride · Nantes",
  metaDescription:
    "UNSQWARE — quartet instrumental nantais, jazz moderne et progressif. Totem Live Session, dates de concerts, réseaux et contact direct du groupe.",
  ogDescription:
    "Quartet instrumental nantais : jazz moderne et progressif. Totem Live Session, prochaines dates et contact direct du groupe.",
  ogImageAlt: "Les quatre musiciens d'UNSQWARE devant un mur éclairé de violet",
};
const EN_HEAD = {
  title: "UNSQWARE — Hybrid jazz quartet · Nantes, France",
  metaDescription:
    "UNSQWARE — instrumental quartet from Nantes, France, playing modern and progressive jazz. Totem Live Session, upcoming shows and direct contact with the band.",
  ogDescription:
    "Instrumental quartet from Nantes, France: modern, progressive jazz. Totem Live Session, upcoming shows and direct contact with the band.",
  ogImageAlt: "The four members of UNSQWARE against a purple-lit wall",
};

// Remplace `needle` et fait échouer le build s'il est introuvable :
// évite de déployer une page EN à moitié traduite après une retouche du template.
function replaceStrict(html: string, needle: string, replacement: string, label: string): string {
  if (!html.includes(needle)) {
    throw new Error(`prerender: introuvable dans le template (${label})`);
  }
  return html.replaceAll(needle, replacement);
}

// Rendus séquentiels côté appelant : un seul singleton i18n, les rendre en
// parallèle ferait s'entrecroiser les changeLanguage et mélanger les langues.
async function renderStatic(lang: Lang): Promise<string> {
  await i18n.changeLanguage(lang);
  return renderToStaticMarkup(<App />);
}

async function main(): Promise<void> {
  // `pnpm build` s'exécute depuis la racine du projet.
  const dist = path.join(process.cwd(), "dist");
  const today = new Date().toISOString().slice(0, 10);

  const template = await readFile(path.join(dist, "index.html"), "utf8");
  if (!template.includes(PLACEHOLDER)) {
    throw new Error("prerender: placeholder <!--APP_HTML--> absent de dist/index.html");
  }

  const frHtml = await renderStatic("fr");
  const enHtml = await renderStatic("en");

  // ── Page FR (racine) : le template est déjà en FR ──
  await writeFile(path.join(dist, "index.html"), template.replace(PLACEHOLDER, frHtml));

  // ── Page EN (/en/) : mêmes balises, contenu et métadonnées en anglais ──
  let enPage = template.replace(PLACEHOLDER, enHtml);
  enPage = replaceStrict(enPage, '<html lang="fr">', '<html lang="en">', "lang");
  enPage = replaceStrict(
    enPage,
    '<link rel="canonical" href="https://unsqwa.re/" />',
    `<link rel="canonical" href="${DOMAIN}/en/" />`,
    "canonical"
  );
  enPage = replaceStrict(
    enPage,
    '<meta property="og:url" content="https://unsqwa.re/" />',
    `<meta property="og:url" content="${DOMAIN}/en/" />`,
    "og:url"
  );
  enPage = replaceStrict(
    enPage,
    '<meta property="og:locale:alternate" content="en_US" />',
    '<meta property="og:locale:alternate" content="fr_FR" />',
    "og:locale:alternate"
  );
  enPage = replaceStrict(
    enPage,
    '<meta property="og:locale" content="fr_FR" />',
    '<meta property="og:locale" content="en_US" />',
    "og:locale"
  );
  enPage = replaceStrict(enPage, FR_HEAD.title, EN_HEAD.title, "titre");
  enPage = replaceStrict(enPage, FR_HEAD.metaDescription, EN_HEAD.metaDescription, "meta description");
  enPage = replaceStrict(enPage, FR_HEAD.ogDescription, EN_HEAD.ogDescription, "og:description");
  enPage = replaceStrict(enPage, FR_HEAD.ogImageAlt, EN_HEAD.ogImageAlt, "og:image:alt");

  await mkdir(path.join(dist, "en"), { recursive: true });
  await writeFile(path.join(dist, "en/index.html"), enPage);

  // ── Sitemap : les deux URL, hreflang inclus, lastmod = date du build ──
  const alternates = `    <xhtml:link rel="alternate" hreflang="fr" href="${DOMAIN}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
${alternates}  </url>
  <url>
    <loc>${DOMAIN}/en/</loc>
    <lastmod>${today}</lastmod>
${alternates}  </url>
</urlset>
`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);

  console.log(`prerender ✓  dist/index.html (FR) · dist/en/index.html (EN) · sitemap.xml (${today})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
