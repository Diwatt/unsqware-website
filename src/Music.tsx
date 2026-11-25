import { useTranslation } from "react-i18next";
import { SectionTag, LINKS } from "./shared";
import { totemPoster } from "./data/photos";
import { VideoEmbed } from "./VideoEmbed";

const tracks = [
  { n: "01", title: "Abandon me", length: "05:35" },
  { n: "02", title: "Find the Meaning", length: "05:45" },
];

// Page 4 of the EPK: the Totem Live Session, then the upcoming EP and Evoli with where to listen.
export function Music() {
  const { t } = useTranslation();
  const platforms = [
    { href: LINKS.spotify, label: "Spotify", value: t("music.artistPage") },
    { href: LINKS.youtube, label: "YouTube", value: "@unsqware" },
  ];

  return (
    <section id="sorties" className="section container music">
      <SectionTag label={t("music.tag")} />
      <h2 className="h2 music__title">{t("music.title")}</h2>

      <div className="music__row">
        <div className="music__video">
          <VideoEmbed id="I4tQ71Z90Hw" title="Totem Live Session" poster={totemPoster} playLabel={t("music.play")} />
        </div>

        <div className="music__info">
          <p>{t("music.totemText")}</p>
          <p className="mono-label music__place">{t("music.totemPlace")}</p>
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

      <div className="music__cards">
        <div className="card card--ep">
          <span className="mono-label card__kicker">{t("music.epKicker")}</span>
          <h3 className="card__title">{t("music.epTitle")}</h3>
          <p>{t("music.epText")}</p>
        </div>

        <div className="music__evoli">
          <div className="card">
            <span className="mono-label card__kicker">{t("music.evoliKicker")}</span>
            <h3 className="card__title">Evoli</h3>
            <p>{t("music.evoliText")}</p>
          </div>
          <ul className="platforms">
            {platforms.map((p) => (
              <li key={p.label}>
                <span className="mono-label">{p.label}</span>
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
