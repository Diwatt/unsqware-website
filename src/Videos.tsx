import { useTranslation } from "react-i18next";
import { LINKS, SectionTag } from "./shared";
import { VideoEmbed } from "./VideoEmbed";

const tracks = [
  { n: "01", title: "Abandon me", length: "05:51" },
  { n: "02", title: "Find the Meaning", length: "11:26" },
];

const sessions = [
  { id: "fnWz1XvpyhY", title: "Evoli", poster: "/images/evoli.jpg" },
  { id: "_bv-08V_kk4", title: "Algebra", poster: "/images/algebra.jpg" },
];

export function Videos() {
  const { t } = useTranslation();

  return (
    <section id="videos" className="section container">
      <div className="section__head">
        <div>
          <SectionTag label={t("videos.tag")} shape={1} />
          <h2 className="h2">{t("videos.title")}</h2>
        </div>
        <a href={LINKS.youtube} className="mono-link" target="_blank" rel="noreferrer">
          {t("videos.channel")}
        </a>
      </div>

      <VideoEmbed id="I4tQ71Z90Hw" title="Totem Live Session" poster="/images/totem.jpg" playLabel={t("videos.play")} wide />

      <div className="totem">
        <div className="totem__info">
          <h3 className="totem__title">Totem Live Session</h3>
          <p>{t("videos.totemPlace")}</p>
        </div>
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

      <div className="sessions">
        {sessions.map((s) => (
          <div key={s.id} className="session">
            <VideoEmbed id={s.id} title={`${s.title} — studio session`} poster={s.poster} playLabel={t("videos.play")} />
            <div className="session__meta">
              <span className="session__title">{s.title}</span>
              <span className="mono-label">{t("videos.studio")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
