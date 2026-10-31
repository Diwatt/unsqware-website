# UNSQWARE — site du quartet

Site one-page du quartet jazz hybride UNSQWARE (Nantes) : présentation du groupe, musique, vidéos, **dates de concerts branchées sur Google Calendar**, réseaux et contact.

**Stack** : React 18 · TypeScript · Vite · Sass · i18next (fr/en) · Vitest + Testing Library · GitHub Actions.

## Démarrage

```bash
pnpm install
pnpm dev        # http://localhost:3001
```

## Commandes

| Commande | Rôle |
|---|---|
| `pnpm dev` | serveur de dev (port 3001) |
| `pnpm test` | suite Vitest (54 tests, jsdom) |
| `pnpm lint` | ESLint, zéro warning toléré |
| `pnpm build` | `tsc` + build Vite + prerender FR/EN + sitemap dans `dist/` |

## Modifier le contenu sans coder

- **Membres, influences** : `src/config-groupe.ts` (commenté en français)
- **Textes du site (fr/en)** : `src/locales/fr.json` et `en.json`
- **Référentiel éditorial** : `CONTENT.md`

## Dates de concerts (Google Calendar)

Le site lit automatiquement un agenda Google : tout event dont le **titre commence par `[GIG]`** apparaît dans « Prochaines dates ».

- **Titre** : `[GIG] Nom de l'event` · **Lieu** : la salle (laisser Google compléter l'adresse, elle se géocode) · **Description** : détails + un lien → bouton « Tickets »
- **Confidentialité** : agenda partagé en public avec *visibilité par défaut = Privé* — les répètes naissent invisibles ; seuls les events `[GIG]` passés en visibilité « Public » apparaissent. Un oubli = une date manquante, jamais une fuite.

Les identifiants ne sont pas dans le dépôt : copier `.env.example` vers `.env.local` et renseigner `VITE_CALENDAR_ID` + `VITE_CALENDAR_API_KEY` (clé restreinte à l'API Calendar + aux référents du site). En production, ce sont des variables de build. Sans ces valeurs, le site affiche des dates d'exemple. Détails dans `src/config-agenda.ts`.

## Tests & CI

`tests/` contient la logique pure de l'agenda et le rendu de tous les composants (helper `renderFr`, i18n réel). La CI GitHub Actions (`ci.yml`) enchaîne lint → tests → build sur `main` et `dev`.

## Déploiement

Vercel — build `pnpm build`, sortie `dist`, variables `VITE_CALENDAR_*` à renseigner dans les réglages du projet. Production sur `main`, previews sur les branches/PRs.
