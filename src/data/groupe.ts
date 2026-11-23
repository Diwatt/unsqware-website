// ════════════════════════════════════════════════════════════════════
//  BAND CONTENT — editable without technical knowledge
// ════════════════════════════════════════════════════════════════════
//  Only edit the text inside double quotes " ".
//  ⚠ Do not remove commas, curly braces { } or square brackets [ ].
//  After editing, restart the site to see the changes.

// ── The musicians ──────────────────────────────────────────────────
//  Listed under the group photo (src/data/photos.ts → bandPhoto), in
//  the order they stand on it, from left to right.
//    name   : the musician's name
//    roleFr : what they play (French version of the site)
//    roleEn : the English version of the role
export const members = [
  { name: "Fabien Maurin", roleFr: "Guitare", roleEn: "Guitar" },
  { name: "Victor Pavel", roleFr: "Piano · claviers", roleEn: "Piano · keys" },
  { name: "Charles Demay", roleFr: "Batterie", roleEn: "Drums" },
  { name: "Florian Roy", roleFr: "Basse · contrebasse · compos", roleEn: "Bass · double bass · writing" },
];

// ── The influences ─────────────────────────────────────────────────
//  Displayed separated by "/". One entry per line, in quotes,
//  with a trailing comma (except after the last one).
export const influences = [
  "Aaron Parks",
  "The Cinematic Orchestra",
  "Avishai Cohen",
  "Julien Lourau",
  "Gogo Penguin",
  "Snarky Puppy",
  "Nate Smith",
  "Ryo Miyachi",
  "Foehn Trio",
];
