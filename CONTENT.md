# UNSQWARE — Contenu du site

> Site **one-page scroll** : navigation par ancres + scrollspy, bilingue FR / EN.
> Depuis novembre 2026, le site est **la version web de l'EPK 2027** : mêmes couleurs, mêmes photos, même contenu, même ton.
> Dernière mise à jour : 2026-11-25.

## Structure de la page

Les étiquettes de section n'ont pas de numéro : elles reprennent les libellés du menu.

| Section (ancre) | Contenu (page de l'EPK) |
|---|---|
| **Accueil** (`#accueil`) | photo du mur rayé (couverture EPK) · « Jazz prog — Nantes » · accroche · badge « Premier EP — début 2027 » · CTA « Faire jouer UNSQWARE » + « Voir la Totem Live Session » · liens réseaux |
| **Le groupe** (`#groupe`) | « Un carré qui se déforme » · bio (3 premiers paragraphes) · photo de groupe légendée (de gauche à droite : Fabien, Victor, Charles, Florian) · encadré des influences — EPK p. 2-3 |
| **Sorties** (`#sorties`) | lecteur **Totem Live Session** + texte + 2 titres · encadré « Premier EP » · encadré **Evoli** + Spotify / YouTube — EPK p. 4 |
| **Agenda** (`#agenda`) | photo de groupe MDS · dates à venir (agenda Google, titre « Prochaines dates » seulement s'il y en a) · **Agenda 2026** — EPK p. 5 |
| **Réseaux** (`#reseaux`) | Instagram, YouTube, Facebook |
| **Contact** (`#contact`) | photo devant la fresque bleue · « Faire jouer UNSQWARE » · email (copiable) · formats de set · presse · téléchargement de l'EPK — EPK p. 6 |

Le titre de l'onglet est **« UNSQWARE - Jazz Prog »** (FR et EN). Le favicon est le logo noir sur fond blanc.

## Où modifier quoi (sans compétences techniques)

| Contenu | Fichier |
|---|---|
| Tous les textes du site (FR / EN) | `src/locales/fr.json`, `src/locales/en.json` |
| Musiciens (ordre de la photo) et influences | `src/data/groupe.ts` |
| Agenda 2026 | `src/data/agenda.ts` |
| Choix des photos | `src/data/photos.ts` (fichiers dans `public/images/`) |
| Dates de concerts à venir | agenda Google (titre commençant par `[GIG]`) |
| Couleurs | `src/styles/_base.scss` (bloc `:root`) |

## Identité

- **Nom** : UNSQWARE
- **Genre** : jazz prog / jazz hybride — jazz moderne, rock et musique progressive, instrumental
- **Ville** : Nantes, France
- **Formé** : à Nantes en **2022**
- **Signature visuelle** : un carré qui se déforme (Totem Live Session, logo « unsqware JAZZ. PROG. »)
- **Couleurs (EPK 2027)** : fond gris-bleu nuit `#15191c`, texte `#e8e8e6`, ocre `#d69a4c` (accent), bleu canard `#5b8fa3` (accent secondaire)
- **Polices** : Big Shoulders Display (titres), Instrument Sans (texte), JetBrains Mono (étiquettes)

## Accroche

> À la croisée du jazz moderne, du rock et de la musique progressive, UNSQWARE façonne un univers instrumental singulier mêlant textures électriques, grooves organiques et envolées improvisées.

## Bio

La bio longue fait 8 paragraphes (source : Google Doc du groupe, novembre 2026). Seuls les 3 premiers sont sur le site, dans « Le groupe ». La section « Studio & live », qui portait la suite, a été retirée le 2026-11-25. La version anglaise a été écrite à partir de la bio courte EN. Sources dans `site-update/content/` (`bio-longue-fr.md`, `bios-courtes.md`).

Points clés : formé à Nantes en 2022 · session Batiskaf en 2024 (titre **Evoli**) · Totem Live Session en 2025 à La Maison du Son · en 2026, accompagnement par deux structures nantaises, Prun'Radio, Prog Night #1 à La Carrière, une quinzaine de concerts · premier EP de six titres enregistré avec Franck Martin à Rennes (Ezurlie Magic Studio, producteur de Namas), sortie début 2027.

## Les musiciens

| Nom | Instrument |
|---|---|
| Florian Roy | Basse, contrebasse, compositions |
| Charles Demay | Batterie |
| Fabien Maurin | Guitare (formé au CIM, Paris) |
| Victor Pavel | Piano, claviers |

## Influences

Aaron Parks, The Cinematic Orchestra, Avishai Cohen, Julien Lourau, Gogo Penguin, Snarky Puppy, Nate Smith, Ryo Miyachi, Foehn Trio

## Parcours (EPK uniquement, retiré du site)

| Année | Événement |
|---|---|
| 2022 | Création du groupe à Nantes |
| 2023 | Conservatoire de Nantes · Le Caboulot · Festival d'été ACCOORD · Le Poum Poum T'chak · Festival Bar-Bars |
| 2024 | Session studio au Batiskaf (Nantes) · Festival OFF du Printemps de Bourges · Short-list Talents Jazz des Rendez-vous de l'Erdre |
| 2025 | Totem Live Session, La Maison du Son (Port-Saint-Père) |
| 2026 | Une quinzaine de dates dans la métropole nantaise et les environs · Enregistrement de l'EP avec Franck Martin |
| Début 2027 | Premier EP |

L'agenda 2026 complet (12 dates) est dans `src/data/agenda.ts`.

## Musique

- **Totem Live Session** (2025, La Maison du Son, Port-Saint-Père) : Abandon me (05:35), Find the Meaning (05:45) — YouTube `I4tQ71Z90Hw`
- **Evoli** (studio Batiskaf, 2024) : disponible sur toutes les plateformes
- **Premier EP** : six titres, enregistré avec Franck Martin à Rennes, sortie début 2027 (titres non listés)

## Liens / plateformes

| Plateforme | URL |
|---|---|
| Site | https://unsqwa.re/ |
| YouTube | https://www.youtube.com/@unsqware |
| Instagram | https://www.instagram.com/unsqware |
| Facebook | https://www.facebook.com/unsqwaremusique |
| SoundCloud (plus affiché sur le site) | https://soundcloud.com/unsqware-musique |
| Spotify | https://open.spotify.com/artist/1gAWrCVQilgg6uzjN1CmMw |
| Linktree | https://linktr.ee/unsqware |

## Contact

- **Email** : unsqwaremusique@gmail.com
- **Formats** : set de 30 min (tremplin) · 45 min à 1 h · 2 × 45 min — fiche technique et plan de scène sur demande
- **Dossier de presse** : `public/UNSQWARE-EPK-2027.pdf` (téléchargeable depuis la section Contact)
- Les téléphones de Florian et Charles figurent dans l'EPK mais pas sur le site (à ajouter si le groupe le souhaite)

## Photos

Nouveau shooting de novembre 2026 (mur rayé, graff, grue) et shooting MDS. La grille de photos studio / live est partie avec la section « Studio & live ». Les photos du shooting ZAW ont été retirées. Les originaux (JPEG et WebP) sont dans `site-update/assets/photos/`.

---

## SEO

Domaine canonique : **https://unsqwa.re/** — unsqware.com, unsqware.fr, les variantes www et unsqware.vercel.app redirigent vers lui.

Le HTML statique (FR + EN) est **généré à chaque build depuis l'app React elle-même** : `pnpm build` enchaîne `tsc` → build client → build SSR + génération (`scripts/prerender.tsx`). React reprend ensuite ce HTML dans le navigateur (`hydrateRoot`).

| Sortie | Contenu |
|---|---|
| `dist/index.html` | page FR (https://unsqwa.re/) |
| `dist/en/index.html` | page EN (https://unsqwa.re/en/) : contenu + métadonnées traduites |
| `dist/sitemap.xml` | les deux URL + hreflang + `lastmod` = date du build |

Points de repère :
- **Balises head** (titre, OG, Twitter, JSON-LD) : dans `index.html` ; les textes EN du head sont dans `scripts/prerender.tsx` (constante `EN_HEAD`).
- **Concerts** : chaque date de l'agenda Google part aussi en données structurées « MusicEvent » pour Google.
- **IndexNow** : Bing et les autres moteurs sont prévenus automatiquement après chaque déploiement en production (`.github/workflows/indexnow.yml`).
- **En dev** (`pnpm dev`), la page est vide avant le montage React — normal, le pré-rendu n'existe qu'au build.
