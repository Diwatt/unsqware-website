// ════════════════════════════════════════════════════════════════════
//  BAND CONTENT — editable without technical knowledge
// ════════════════════════════════════════════════════════════════════
//  Only edit the text inside double quotes " ".
//  ⚠ Do not remove commas, curly braces { } or square brackets [ ].
//  After editing, restart the site to see the changes.

// ── The musicians ──────────────────────────────────────────────────
//  They display in list order (you can add, remove or reorder
//  the { ... } blocks).
//    name   : the musician's name
//    roleFr : what they play (French version of the site)
//    roleEn : the English version of the role
//    photo  : the photo file (in the public/images/ folder)
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

// ── The influences ─────────────────────────────────────────────────
//  Displayed separated by "/". One entry per line, in quotes,
//  with a trailing comma (except after the last one).
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
