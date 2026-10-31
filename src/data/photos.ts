// ════════════════════════════════════════════════════════════════════
//  PHOTOS — editable without technical knowledge
// ════════════════════════════════════════════════════════════════════
//  Only edit the file names inside double quotes " ".
//  ⚠ Do not remove commas, curly braces { } or square brackets [ ].
//    photo : the photo file (in the public/images/ folder)
//    alt   : the description key, its text lives in src/locales/*.json
//            under "photos" (French and English versions)

// ── "Sur scène" section: the blurred concert photos behind the dates ──
//  Purely decorative, so no description: the first one is the widest.
export const stagePhotos = ["/images/scene-vue-haut.jpg", "/images/scene-batterie.jpg", "/images/scene-guitare.jpg"];

// ── "Contact" section: the group photo ────────────────────────────
export const contactPhoto = { photo: "/images/groupe-mur.jpg", alt: "photos.groupWall" } as const;
