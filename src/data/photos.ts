// ════════════════════════════════════════════════════════════════════
//  PHOTOS — editable without technical knowledge
// ════════════════════════════════════════════════════════════════════
//  Only edit the file names inside double quotes " ".
//  ⚠ Do not remove commas, curly braces { } or square brackets [ ].
//    photo : the photo file (in the public/images/ folder)
//    alt   : the description key, its text lives in src/locales/*.json
//    width / height : the photo's size in pixels (avoids layout jumps)
//    photoSmall     : a 1200 px wide copy, loaded by phones instead of the full photo

// ── Top of the page: the main group photo (portrait) ──────────────
export const heroPhoto = { photo: "/images/hero-groupe-mur-raye.webp", width: 1200, height: 1800 } as const;

// ── "Le groupe": the group photo with the names underneath ────────
//  The musicians' order lives in src/data/groupe.ts (left to right).
export const bandPhoto = {
  photo: "/images/groupe-graff-34.webp",
  photoSmall: "/images/groupe-graff-34-1200.webp",
  width: 2000,
  height: 1333,
} as const;

// ── "Sorties": the poster shown before the Totem video plays ──────
export const totemPoster = "/images/studio-mds-salle-2.webp";

// ── "Agenda": three playing photos side by side, above the section ─
//  focus : the part of the photo that must stay visible when it is cropped
//          ("50% 30%" = centered horizontally, near the top).
export const playPhotos = [
  { photo: "/images/jeu-basse-studio.webp", alt: "photos.playBass", focus: "30% 30%" },
  { photo: "/images/jeu-guitare-scene.webp", alt: "photos.playGuitar", focus: "55% 35%" },
  { photo: "/images/jeu-trio-scene.webp", alt: "photos.playStage", focus: "50% 35%" },
] as const;

// ── "Contact": the full-width photo at the top of the section ─────
//  Full-width photos need the full resolution (2000 px or more) to stay sharp.
export const contactPhoto = {
  photo: "/images/groupe-graff-37.webp",
  photoSmall: "/images/groupe-graff-37-1200.webp",
  width: 2000,
  alt: "photos.graffBanner",
} as const;
