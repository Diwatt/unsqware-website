import { useTranslation } from "react-i18next";
import { ArrowUpRight, LINKS, PlayIcon } from "./shared";

const platforms = [
  { href: LINKS.spotify, label: "Spotify" },
  { href: LINKS.deezer, label: "Deezer" },
  { href: LINKS.soundcloud, label: "SoundCloud" },
  { href: LINKS.youtube, label: "YouTube" },
];

export function Music() {
  const { t } = useTranslation();
  const epTitle = t("music.epTitle", { returnObjects: true }) as string[];

  return (
    <section id="musique" className="music">
      <div className="music__inner container">
        <p className="mono-label">{t("music.tag")}</p>

        <div className="music__row">
          <div className="music__feature">
            <img src="/images/totem.jpg" alt={t("music.totemAlt")} loading="lazy" />
            <div className="music__feature-text">
              <span className="mono-label">Live session · 2025</span>
              <h2 className="music__title">Totem</h2>
              <p>{t("music.totemDesc")}</p>
              <a href="https://www.youtube.com/watch?v=I4tQ71Z90Hw" className="btn btn--dark" target="_blank" rel="noreferrer">
                <PlayIcon />
                {t("music.watch")}
              </a>
            </div>
          </div>

          <div className="music__ep">
            <span className="mono-label">{t("music.epKicker")}</span>
            <p className="music__ep-title">
              {epTitle[0]}
              <br />
              {epTitle[1]}
            </p>
            <p>{t("music.epText")}</p>
          </div>
        </div>

        <div className="platforms">
          {platforms.map((p) => (
            <a key={p.label} href={p.href} target="_blank" rel="noreferrer">
              {p.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
