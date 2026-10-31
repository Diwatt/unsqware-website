// Shared constants, helpers and small components: mixing non-component
// and component exports is intentional here, so the react-refresh rule is ignored.
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";

import { WarpedShape } from "./services/WarpedShape";

export const EMAIL = "unsqwaremusique@gmail.com";

export const LINKS = {
  instagram: "https://www.instagram.com/unsqware",
  youtube: "https://www.youtube.com/@unsqware",
  facebook: "https://www.facebook.com/unsqwaremusique",
  soundcloud: "https://soundcloud.com/unsqware-musique",
  spotify: "https://open.spotify.com/artist/1gAWrCVQilgg6uzjN1CmMw",
};

export const mailto = (subject?: string) =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

type SectionTagProps = { label: string; inverted?: boolean };

export function SectionTag({ label, inverted }: SectionTagProps) {
  // One random warp per mounted tag: stable on screen, different on
  // every page load.
  const [clipPath] = useState(() => new WarpedShape().getClipPath());

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
