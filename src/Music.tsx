import { useTranslation } from "react-i18next";
import { SectionTag, ArrowUpRight, LINKS } from "./shared";
import { VideoEmbed } from "./VideoEmbed";

const platforms = [
  { href: LINKS.spotify, label: "Spotify" },
  { href: LINKS.soundcloud, label: "SoundCloud" },
  { href: LINKS.youtube, label: "YouTube" },
];

const tracks = [
  { n: "01", title: "Abandon me", length: "05:35" },
  { n: "02", title: "Find the Meaning", length: "05:45" },
];

// Music and video in one compact block: the Totem Live Session player, its tracks, then where to listen.
export function Music() {
  const { t } = useTranslation();

  return (
    <section id="musique" className="music">
      <div className="music__inner container">
        <SectionTag label={t("music.tag")} inverted />

        <div className="music__row">
          <div className="music__video">
            <VideoEmbed
              id="I4tQ71Z90Hw"
              title="Totem Live Session"
              poster="/images/session-salle.jpg"
              playLabel={t("music.play")}
            />
          </div>

          <div className="music__info">
            <span className="mono-label">Live session · 2025</span>
            <h2 className="music__title">Totem Live Session</h2>
            <p className="music__place">{t("music.totemPlace")}</p>
            <ol className="tracks">
              {tracks.map((tr) => (
                <li key={tr.n}>
                  <span>
                    <span className="tracks__n">{tr.n}</span> {tr.title}
                  </span>
                  <span className="tracks__len">{tr.length}</span>
                </li>
              ))}
            </ol>
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

        <p className="music__ep">{t("hero.ep")}</p>
      </div>
    </section>
  );
}
