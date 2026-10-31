import { useState } from "react";
import { PlayIcon } from "./shared";

type Props = {
  id: string;
  title: string;
  poster: string;
  playLabel: string;
  wide?: boolean;
};

// Affiche la vignette ; le lecteur YouTube (sans cookies) ne se charge qu'au clic.
export function VideoEmbed({ id, title, poster, playLabel, wide }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video video--playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={wide ? "video video--wide" : "video"}
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel} : ${title}`}
    >
      <img src={poster} alt="" loading="lazy" />
      <span className={wide ? "video__play video__play--big" : "video__play"}>
        <PlayIcon size={wide ? 28 : 20} />
      </span>
    </button>
  );
}
