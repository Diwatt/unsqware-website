# Mise à jour du site unsqwa.re — brief pour la prochaine session

> Prompt à donner tel quel au début du nouveau fil, avec le dossier `unsqware-website` connecté.
> Tout ce qu'il faut est dans `site-update/` (ce dossier). Préparé le 23/11/2026.

## Objectif

Le groupe trouve l'EPK 2027 plus réussi que le site. **Faire du site la version web de l'EPK** : mêmes couleurs, mêmes photos, même contenu, même ton. Les maquettes de référence sont les 6 pages de `assets/epk/page-1.png` à `page-6.png` (et le PDF `assets/epk/UNSQWARE-EPK-2027.pdf`).

On garde ce qui fonctionne déjà : one-page à ancres, bilingue FR/EN (react-i18next), agenda Google pour les dates à venir, pré-rendu SEO (`scripts/prerender.tsx`), sitemap. **Le domaine reste `https://unsqwa.re/`** (ne pas passer sur unsqware.com : c'était une erreur dans les retours).

Repères dans le code : `CONTENT.md` (contenu de référence), `src/locales/fr.json` / `en.json` (textes), `src/data/groupe.ts` (musiciens, influences), `src/data/photos.ts`, `src/data/marquee.ts`, `src/styles/_base.scss` (tokens), `index.html` (head, OG, JSON-LD), `scripts/prerender.tsx` (constante `EN_HEAD`).

## Liste des changements demandés par le groupe

1. **Couleurs** : remplacer le bloc `:root` de `src/styles/_base.scss` par `assets/tokens.scss`. Le violet et le lavande disparaissent partout (chercher aussi les couleurs en dur, `theme-color` dans `index.html` et `site.webmanifest`).
2. **Polices** : inchangées (Big Shoulders Display 800, Instrument Sans, JetBrains Mono), déjà utilisées par l'EPK.
3. **Supprimer la banderole qui défile** (titres en marquee) : composant + `src/data/marquee.ts` + styles. Le groupe ne l'aime pas du tout.
4. **Icône d'onglet** : remplacer les favicons de `public/` par ceux de `assets/favicon/` (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`). Source : `logo-unsqware-black-trimmed.png` (le nouveau logo « unsqware JAZZ. PROG. », noir sur transparent).
   - Attention : en 16 px le logo est illisible et, noir, il disparaît sur un onglet en thème sombre. Proposer au groupe soit `logo-unsqware-white.png` via `<link rel="icon" media="(prefers-color-scheme: dark)">`, soit une icône simplifiée (carré seul). Les icônes 180/192/512 sont déjà sur fond clair (#e8e8e6) ; `variante-sombre-512x512.png` existe en blanc sur fond nuit.
5. **Titre de l'onglet** : `UNSQWARE - Jazz Prog` (FR et EN : `<title>` dans `index.html` et dans `EN_HEAD`). Adapter `og:title` / `twitter:title` en cohérence.
6. **Hero** :
   - Enlever « depuis 2021 » : `hero.kicker` devient « Jazz hybride — Nantes » (EN : « Hybrid jazz — Nantes »).
   - Nouvelle accroche (`hero.lede`) : voir `content/contenu-epk.json` → `accroche_fr`. Traduire pour l'EN.
   - Supprimer `hero.sub` (qui cite MYT et Louis Matute) ou le remplacer par les nouvelles influences.
   - Photo principale : `assets/photos/hero-groupe-mur-raye.(webp|jpg)` (portrait 2:3, visages vers 40 % de la hauteur ; même photo que la couverture de l'EPK).
7. **Bio longue** comme dans l'EPK (pages 2 et 3) : texte dans `content/bio-longue-fr.md` (8 paragraphes, le dernier est une phrase de conclusion à mettre en valeur). Écrire la version EN (il n'existe qu'une bio courte EN, dans `content/bios-courtes.md`, à utiliser comme base de ton).
   - Le groupe est désormais présenté comme **formé à Nantes en 2022** (et non fin 2021) : corriger partout (locales, `CONTENT.md`, JSON-LD `foundingDate` s'il existe).
   - La bio ne cite plus qu'**Evoli** pour la session Batiskaf (Algebra n'est plus mis en avant).
8. **Influences** (partout, `src/data/groupe.ts`, locales, meta, JSON-LD, `CONTENT.md`) : Aaron Parks, The Cinematic Orchestra, Avishai Cohen, Julien Lourau, Gogo Penguin, Snarky Puppy, Nate Smith, Ryo Miyachi, Foehn Trio. **Plus aucune mention de MYT ni de Louis Matute** (faire un `grep -ri "MYT\|Matute"` final, `dist/` compris après build).
9. **Photos** : enlever les photos du ZAW et utiliser celles de `assets/photos/` :
   - Vérifié : `public/images/live-jour.webp` vient du shooting ZAW (`_DSF4509`). `scene-vue-haut.webp` semble aussi venir du ZAW. Vérifier `scene-batterie.webp` et `scene-guitare.webp` en les comparant à `Unsqware/4-Medias/Photos/Shooting Zaw` (demander l'accès au dossier si besoin) et les retirer si c'est le cas.
   - Photos de groupe du nouveau shooting (sélection validée, sans têtes bizarres ni plongées déformées) : `groupe-grue-32`, `groupe-graff-34`, `groupe-graff-37`, `groupe-graff-13`, `groupe-mur-raye-41`, `groupe-grue-26`, plus `hero-groupe-mur-raye`.
   - Photo de groupe du shooting MDS (remplace le ZAW dans l'EPK page 5) : `groupe-violet-mds`.
   - Live & studio : `live-scene-2024`, `live-guitare-bleue`, `studio-mds-salle`, `studio-mds-salle-2`, `studio-batiskaf-batterie`, `studio-batiskaf-basse`, `studio-batiskaf-guitare` (ces trois dernières sont petites : 1080 px, à ne pas afficher en grand).
   - Chaque photo existe en `.webp` (à utiliser) et `.jpg` (repli / og:image). Mettre à jour les `alt` dans les locales.
   - **Portraits individuels** : le nouveau shooting n'a que des photos de groupe. Sous `groupe-graff-34`, les musiciens sont de gauche à droite : **Fabien, Victor, Charles, Florian** (comme dans l'EPK). Demander au groupe s'il garde les anciens portraits (`florian.jpg`, etc.) ou s'il les remplace par cette photo légendée.
   - `og:image` : régénérer `og-image.jpg` (1200×630) à partir de `groupe-grue-32`.
10. **Section Sur scène** : ajouter, en plus de l'agenda Google (dates à venir), le **Parcours** et l'**Agenda 2026** de l'EPK (page 5). Données dans `content/contenu-epk.json` (`parcours`, `agenda_2026`) → créer `src/data/parcours.ts` éditable sans compétences techniques, comme `groupe.ts`.
11. **Musique** : texte de la Totem Live Session (`totem_fr`) et encart « Premier EP » (`ep_fr` : enregistrement avec Franck Martin, Ezurlie Magic Studio, Rennes). Ne pas lister les titres de l'EP. Retirer SoundCloud de la section musique (comme dans l'EPK) ; demander au groupe s'il le garde dans « Réseaux ».
12. **Contact** : ne plus écrire que le groupe répond lui-même sans agence. Ajouter le téléphone de Florian et Charles si le groupe le souhaite (voir `contacts`). Le lien « Dossier de presse [à venir] » devient un téléchargement de l'EPK : copier `assets/epk/UNSQWARE-EPK-2027.pdf` dans `public/` et supprimer l'ancienne `UNSQWARE-plaquette-2026.pdf`.
13. **CONTENT.md** : le mettre à jour pour refléter tout ce qui précède (il sert de référence au groupe).

## Points à confirmer avec le groupe au début du fil

- Portraits individuels : garder les anciens ou photo de groupe légendée (point 9).
- Favicon : logo complet ou icône simplifiée (point 4).
- SoundCloud dans « Réseaux » (point 11) ; téléphones visibles sur le site (point 12).

## Vérifications avant de livrer

- `pnpm build` passe (tsc + build client + pré-rendu FR/EN), `pnpm test` si présent.
- `dist/index.html` et `dist/en/index.html` : titre « UNSQWARE - Jazz Prog », nouvelles meta, aucune trace de MYT / Matute / 2021 / violet.
- Captures Playwright desktop et mobile (deviceScaleFactor 2) de chaque section, comparées aux pages de l'EPK.
- Poids des images raisonnable (`loading="lazy"` hors hero, `width`/`height` pour éviter les sauts de mise en page).
- Ne pas committer ni pousser sans l'accord de Florian.
