// Site pre-rendering: generates the static HTML (FR + EN) from the React app itself.
// Chained by `pnpm build`:
//   1. `vite build --ssr scripts/prerender.tsx --outDir .prerender` compiles this file
//   2. `node .prerender/prerender.js` runs it in Node (node: imports externalized by Vite)
// Outputs:
//   - dist/index.html    → FR page (https://unsqwa.re/)
//   - dist/en/index.html → EN page (https://unsqwa.re/en/)
//   - dist/sitemap.xml   → both URLs + hreflang + lastmod = build date
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import i18n from "../src/i18n";

type Lang = "fr" | "en";

const DOMAIN = "https://unsqwa.re";
const PLACEHOLDER = "<!--APP_HTML-->";

// <head> strings of the (FR) template and their EN versions for the /en/ page.
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

// Replaces `needle` and fails the build if it cannot be found:
// avoids deploying a half-translated EN page after a template edit.
function replaceStrict(html: string, needle: string, replacement: string, label: string): string {
  if (!html.includes(needle)) {
    throw new Error(`prerender: not found in template (${label})`);
  }
  return html.replaceAll(needle, replacement);
}

// Renders are sequential at the call site: a single i18n singleton, rendering
// them in parallel would interleave changeLanguage calls and mix languages.
async function renderStatic(lang: Lang): Promise<string> {
  await i18n.changeLanguage(lang);
  return renderToStaticMarkup(<App />);
}

async function main(): Promise<void> {
  // `pnpm build` runs from the project root.
  const dist = path.join(process.cwd(), "dist");
  const today = new Date().toISOString().slice(0, 10);

  const template = await readFile(path.join(dist, "index.html"), "utf8");
  if (!template.includes(PLACEHOLDER)) {
    throw new Error("prerender: <!--APP_HTML--> placeholder missing from dist/index.html");
  }

  const frHtml = await renderStatic("fr");
  const enHtml = await renderStatic("en");

  // ── FR page (root): the template is already in FR ──
  await writeFile(path.join(dist, "index.html"), template.replace(PLACEHOLDER, frHtml));

  // ── EN page (/en/): same tags, content and metadata in English ──
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

  // ── Sitemap: both URLs, hreflang included, lastmod = build date ──
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
