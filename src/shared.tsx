// Constantes, helpers et petits composants partagés : le mélange d'exports
// non-composants et de composants est voulu ici, on ignore la règle react-refresh.
/* eslint-disable react-refresh/only-export-components */
export const EMAIL = "unsqwaremusique@gmail.com";

export const LINKS = {
  instagram: "https://www.instagram.com/unsqware",
  youtube: "https://www.youtube.com/@unsqware",
  facebook: "https://www.facebook.com/unsqwaremusique",
  soundcloud: "https://soundcloud.com/unsqware-musique",
  spotify: "https://open.spotify.com/artist/1gAWrCVQilgg6uzjN1CmMw",
  deezer: "https://www.deezer.com/fr/artist/291754311",
};

export const mailto = (subject?: string) =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

// Chaque étiquette de section a son propre carré déformé (fixe), avec une tranche en relief derrière.
const SHAPES = [
  "polygon(3% 14%, 100% 0%, 96% 100%, 0% 84%)",
  "polygon(0% 0%, 97% 12%, 100% 90%, 4% 100%)",
  "polygon(5% 6%, 98% 0%, 100% 100%, 0% 88%)",
  "polygon(0% 12%, 95% 0%, 100% 86%, 2% 100%)",
  "polygon(2% 0%, 100% 10%, 97% 92%, 0% 100%)",
];

type SectionTagProps = { label: string; shape: number; inverted?: boolean };

export function SectionTag({ label, shape, inverted }: SectionTagProps) {
  const clipPath = SHAPES[shape % SHAPES.length];
  return (
    <p className={inverted ? "tag tag--inverted" : "tag"}>
      <span className="tag__depth tag__depth--far" style={{ clipPath }} aria-hidden="true" />
      <span className="tag__depth tag__depth--near" style={{ clipPath }} aria-hidden="true" />
      <span className="tag__face" style={{ clipPath }}>
        {label}
      </span>
    </p>
  );
}

export function PlayIcon({ size = 14 }: { size?: number }) {
  return <span className="icon icon--play" style={{ width: size, height: size }} aria-hidden="true" />;
}

export function ArrowUpRight() {
  return <span className="icon icon--arrow-up-right" aria-hidden="true" />;
}
