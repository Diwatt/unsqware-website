// ════════════════════════════════════════════════════════════════════
//  AGENDA DES DATES — connexion au Google Calendar du groupe
// ════════════════════════════════════════════════════════════════════
//  Le site affiche automatiquement les events de l'agenda dont le TITRE
//  commence par le marqueur « tag » ci-dessous. Pour une date de concert :
//
//  • TITRE       : [GIG] Nom de l'event — affiché en grand
//  • LIEU        : la salle — laisse Google compléter l'adresse, elle se
//                  géocode toute seule (ex. « Chez Maurice, 14 Cr Sully,
//                  44000 Nantes, France »). La ville s'affiche à droite de
//                  la ligne, la salle en petit si le titre ne la dit pas déjà.
//  • DESCRIPTION : détails (ex. « avec le collectif Machin ») ; si elle
//                  contient un lien, il devient le bouton « Tickets ».
//
//  RÈGLE DE CONFIDENTIALITÉ (dans les réglages de l'agenda) :
//  • Agenda partagé en public + « Visibilité par défaut des événements » = Privé.
//  • Répètes et rendez-vous : rien à faire, ils naissent invisibles du public.
//  • Date de concert : visibilité de l'event = « Public » + titre [GIG].
//  Un event oublié = il manque sur le site ; il ne fuite jamais.
//
//  IDENTIFIANTS (le dépôt est public, la clé n'est PAS dans le code) :
//  copiez .env.example vers .env.local et remplissez-y l'ID d'agenda et
//  la clé API. En production, ce sont des variables du build.
//  Sans ces valeurs (dev, tests), le site affiche les dates d'exemple.

export const agenda = {
  // ID de l'agenda Google : dans calendar.google.com → réglages de l'agenda
  // → « Intégrer l'agenda » → « ID de l'agenda ».
  calendarId: import.meta.env.VITE_CALENDAR_ID ?? "",

  // Clé API Google (console.cloud.google.com → APIs & Services → Identifiants),
  // restreinte à l'API Calendar + aux référents du site.
  apiKey: import.meta.env.VITE_CALENDAR_API_KEY ?? "",

  // Marqueur des events à afficher sur le site (préfixe du titre).
  tag: "[GIG]",
};

// Dates d'exemple affichées tant que les identifiants ne sont pas renseignés.
export const demoEvents = [
  {
    id: "demo-brewklyn",
    summary: "[GIG] Le Brewklyn",
    location: "BREWKLYN, 8 Rue Nicolas Joseph Cugnot, 35000 Rennes, France",
    start: { date: "2026-11-12" },
  },
  {
    id: "demo-chez-maurice",
    summary: "[GIG] Chez Maurice",
    location: "Chez Maurice, 14 Cr Sully, 44000 Nantes, France",
    description: "avec le collectif",
    start: { dateTime: "2026-12-05T20:30:00+01:00" },
  },
];
