# UNSQWARE — Contenu du site

> Site **one-page scroll** (inspiré de foehn-music.com) : navigation par ancres + scrollspy.
> Dernière mise à jour : 2026-10-30.

## Structure de la page (validée)

| # | Section (ancre) | Contenu |
|---|---|---|
| 1 | **Accueil** (`#accueil`) | photo de groupe + pitch · CTA « Faire jouer UNSQWARE » + « Voir la Totem Live Session » · liens réseaux |
| 2 | **Le groupe** (`#groupe`) | bio + portraits des 4 musiciens + influences, puis bandeau de photos live |
| 3 | **Musique** (`#musique`) | **Totem Live Session** en vedette · EP début 2027 · plateformes |
| 4 | **Vidéos** (`#videos`) | Totem Live Session (grand format) + Evoli / Algebra studio sessions |
| 5 | **Sur scène** (`#scene`) | dates à venir + appel aux programmateurs + parcours 2021→2027 |
| 6 | **Réseaux** (`#reseaux`) | Instagram, YouTube, Facebook, SoundCloud |
| 7 | **Contact** (`#contact`) | email du groupe (contact direct, pas d'agence de booking) |

Mise en avant : **le contact** et **la Totem Live Session** uniquement (pas Evoli).
Site bilingue **FR / EN** : les textes sont dans `src/locales/fr.json` et `src/locales/en.json` (via react-i18next, config dans `src/i18n.ts`) ; les musiciens et les influences sont dans `src/config-groupe.ts` (fichiers éditables sans compétences techniques).
Design : maquette V4 « douce » du canevas Design (https://claude.ai/artifact/W34iPEagkDDxTjpVKTPmJ8).

Fichiers sections : `src/Hero.tsx`, `src/About.tsx`, `src/Music.tsx`, `src/Videos.tsx`, `src/Gigs.tsx`, `src/Socials.tsx`, `src/Contact.tsx` (assemblés dans `src/App.tsx`, menu dans `src/Navbar.tsx`). Photos dans `public/images/` (tirées du Drive du groupe).

---

## Identité

- **Nom** : UNSQWARE
- **Genre** : Jazz Hybride — jazz moderne & progressif, instrumental
- **Ville** : Nantes, France
- **Formé** : fin 2021
- **Signature visuelle** : un carré / cube qui se déforme (présent dans la Totem Live Session)
- **Pitch court** (réseaux) : « ⚡ JAZZ PROG ⚡ » / « JAZZ HYBRIDE »

## Bio officielle

> UNSQWARE est un quartet instrumental nantais formé fin 2021 dont l'univers sonore se démarque par une esthétique **jazz moderne et progressive**. Forts d'une expérience musicale étendue, les quatre musiciens créent des atmosphères envoûtantes où la rondeur du jazz rencontre l'énergie du rock et des sons saturés. Dans la lignée de **Aaron Parks**, **MYT** ou **Louis Matute**, chaque morceau est une exploration où composition et improvisation se mêlent dans une expérience musicale originale et surprenante.

### Bio longue / historique

Le quartet se produit pour la première fois fin 2022 à Nantes avant de saisir plusieurs opportunités en 2023 sur la scène nantaise (Conservatoire de Nantes, Festival d'été ACCOORD, Festival Bar-Bars...). En 2024, le groupe a notamment l'occasion de présenter ses compositions sur le **festival OFF du Printemps de Bourges**. Il fait également partie de la short-list pour la scène **Talents Jazz des Rendez-vous de l'Erdre**.

En parallèle, une session d'enregistrement studio est réalisée en février 2024 au Batiskaf à Nantes. Deux morceaux sont enregistrés et disponibles sur toutes les plateformes : **Evoli** et **Algebra**.

En 2025, le groupe se concentre sur le travail de nouvelles compositions et sur la captation d'une live session pour deux d'entre elles (**Totem Live Session**). L'accent est mis sur une dynamique rock et progressive tout en proposant une interaction visuelle au format vidéo faisant écho au nom du groupe : un carré ou cube qui se déforme. Le résultat est disponible sur YouTube depuis septembre 2025.

Par la suite, l'ambition des musiciens est de continuer à éprouver et affiner leurs compositions par le jeu live en visant des salles de renommée et des festivals. En parallèle, l'objectif est d'enregistrer un EP et de le diffuser au **début 2027**.

### Complément EasyZic

Le groupe est créé fin 2021 par Florian Roy (basse/contrebasse) et Charles Demay (batterie) avec la volonté de proposer des compositions originales influencées par Aaron Parks, MYT, Louis Matute, Gogo Penguin, Snarky Puppy... Le groupe est rejoint par Fabien Maurin (guitare jazz, formation au CIM/Paris) pour renforcer la présence mélodique et ouvrir la porte à de nouveaux arrangements.

## Les musiciens

| Nom | Instrument |
|---|---|
| Florian Roy | Basse, contrebasse, compositions |
| Charles Demay | Batterie |
| Fabien Maurin | Guitare (formé au CIM, Paris) |
| Victor Pavel | Piano, claviers |

## Influences

Aaron Parks, MYT, Louis Matute, Gogo Penguin, Snarky Puppy, Nate Smith, Ryo Miyachi, Foehn Trio

## Chronologie (pour la page Concerts)

| Année | Événement |
|---|---|
| 2021 | Création du groupe (Florian Roy & Charles Demay) |
| Fin 2022 | Premier concert à Nantes |
| 2023 | Conservatoire de Nantes · Festival d'été ACCOORD · Festival Bar-Bars |
| Fév. 2024 | Session studio au Batiskaf (Nantes) |
| 2024 | Festival OFF du Printemps de Bourges · short-list Talents Jazz des Rendez-vous de l'Erdre |
| Sept. 2025 | Sortie Totem Live Session sur YouTube |
| Début 2027 | Sortie de l'EP (à venir) |

## Discographie

### Single mis en avant
- **Evoli** — enregistré au Batiskaf (fév. 2024), écoute via la page artiste Spotify
  ( Algebra reste visible en studio session vidéo, non mis en avant sur demande de Florian )

### Totem Live Session (sept. 2025, captée à La Maison du Son, Port-Saint-Père)
- Abandon me (05:51)
- Find the Meaning (11:26)

### Autres titres connus
- Personne (live, SoundCloud 2023 + vidéo YouTube)
- Keep Running (vidéo YouTube — à confirmer)
- Totem

## Vidéos YouTube (embeds existants dans le code)

| Titre | ID YouTube |
|---|---|
| Totem Live Session | `I4tQ71Z90Hw` |
| Evoli (Studio session) | `fnWz1XvpyhY` |
| Algebra (Studio session) | `_bv-08V_kk4` |
| Personne | `IdZXIpnT_S8` |
| Keep Running (?) | `LILiicvfQ08` |

## Liens / plateformes

| Plateforme | URL |
|---|---|
| YouTube | https://www.youtube.com/@unsqware |
| Instagram | https://www.instagram.com/unsqware |
| Facebook | https://www.facebook.com/unsqwaremusique |
| SoundCloud | https://soundcloud.com/unsqware-musique |
| Spotify | https://open.spotify.com/artist/1gAWrCVQilgg6uzjN1CmMw |
| Deezer | https://www.deezer.com/fr/artist/291754311 |
| Linktree | https://linktr.ee/unsqware |

## Contact

- **Email groupe** : unsqwaremusique@gmail.com
- Pas d'agence de booking : la collaboration avec Wonderland Music s'arrête, tout passe par l'email du groupe.

## À compléter par le groupe

- [x] Photos HD (portraits, live) — intégrées depuis le Drive
- [ ] Dates de concerts à venir
- [ ] Confirmation du titre « Keep Running » (vidéo `LILiicvfQ08`)
- [ ] Logo / visuels haute résolution
- [ ] Rider technique (pour la section EPK)
- [ ] Lien Spotify direct des singles Evoli / Algebra

---

## SEO (pré-rendu automatisé, 2026-10-30)

Domaine canonique : **https://unsqwa.re/** — `unsqware.com` et `unsqware.fr` doivent être redirigés en **301** vers lui (réglage chez le registrar, pas dans le code).

Le HTML statique (FR + EN) est **généré à chaque build depuis l'app React elle-même** — aucun contenu dupliqué à maintenir. `pnpm build` enchaîne : `tsc` → build client → build SSR + génération (`scripts/prerender.tsx`, compilé puis exécuté en Node) :

| Sortie | Contenu |
|---|---|
| `dist/index.html` | page FR (https://unsqwa.re/) : contenu pré-rendu, lu par les moteurs / sans JS, remplacé par React au montage |
| `dist/en/index.html` | page EN (https://unsqwa.re/en/) : contenu + métadonnées traduites (canonical, og:locale…) |
| `dist/sitemap.xml` | les deux URL + hreflang + `lastmod` = date du build |

Points de repère :
- **Textes** : `src/locales/fr.json` et `src/locales/en.json` restent la source unique — modifie-les, le build régénère tout.
- **Balises head** (canonical, OG, Twitter, JSON-LD) : dans `index.html` ; les textes EN du head sont dans `scripts/prerender.tsx` (constante `EN_HEAD`).
- **Langue côté navigateur** : détection `localStorage` → `path` (la page /en/ reste EN) → `navigateur` → fallback `fr`.
- **En dev** (`pnpm dev`), la page est vide avant le montage React — normal, le pré-rendu n'existe qu'au build.

Côté hébergeur (Vercel ou équivalent) : commande de build `pnpm build`, dossier de sortie `dist` — le pré-rendu repart à chaque déploiement automatiquement.

À faire une fois déployé :
1. **Google Search Console** : déclarer `unsqwa.re`, soumettre `https://unsqwa.re/sitemap.xml`.
2. **Backlinks** : mettre à jour Linktree et les bio Instagram / YouTube / Facebook / SoundCloud / EasyZic pour pointer vers `https://unsqwa.re/`.
