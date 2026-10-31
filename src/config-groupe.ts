// ════════════════════════════════════════════════════════════════════
//  CONTENU DU GROUPE — modifiable sans connaissances techniques
// ════════════════════════════════════════════════════════════════════
//  Modifiez uniquement le texte entre guillemets " ".
//  ⚠ Ne supprimez pas les virgules, les accolades { } ni les crochets [ ].
//  Après modification, relancez le site pour voir les changements.

// ── Les musiciens ──────────────────────────────────────────────────
//  Ils s'affichent dans l'ordre de la liste (on peut ajouter, retirer
//  ou réordonner les blocs { ... }).
//    name   : le nom du musicien
//    roleFr : ce qu'il joue (version française du site)
//    roleEn : la version anglaise du rôle
//    photo  : le fichier photo (dans le dossier public/images/)
export const members = [
  {
    name: "Florian Roy",
    roleFr: "Basse · contrebasse · compos",
    roleEn: "Bass · double bass · writing",
    photo: "/images/florian.jpg",
  },
  {
    name: "Charles Demay",
    roleFr: "Batterie",
    roleEn: "Drums",
    photo: "/images/charles.jpg",
  },
  {
    name: "Fabien Maurin",
    roleFr: "Guitare",
    roleEn: "Guitar",
    photo: "/images/fabien.jpg",
  },
  {
    name: "Victor Pavel",
    roleFr: "Piano · claviers",
    roleEn: "Piano · keys",
    photo: "/images/victor.jpg",
  },
];

// ── Les influences ─────────────────────────────────────────────────
//  Affichées séparées par des « / ». Une entrée par ligne, entre
//  guillemets, avec une virgule à la fin (sauf après la dernière).
export const influences = [
  "Aaron Parks",
  "MYT",
  "Louis Matute",
  "Gogo Penguin",
  "Snarky Puppy",
  "Nate Smith",
  "Ryo Miyachi",
  "Foehn Trio",
];
