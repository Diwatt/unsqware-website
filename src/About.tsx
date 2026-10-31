import { useTranslation } from "react-i18next";
import { SectionTag } from "./shared";
import { influences, members } from "./config-groupe";

export function About() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "fr") as "fr" | "en";

  return (
    <>
      <section id="groupe" className="section container">
        <div className="about__head">
          <div className="about__title">
            <SectionTag label={t("band.tag")} shape={0} />
            <h2 className="h2">{t("band.title")}</h2>
          </div>
          <div className="about__text">
            <p className="about__intro">{t("band.intro")}</p>
            <p>{t("band.p1")}</p>
            <p>{t("band.p2")}</p>
          </div>
        </div>

        <div className="members">
          {members.map((m) => (
            <article key={m.name} className="member">
              <img src={m.photo} alt={`${t("band.portrait")} ${m.name}`} width={900} height={1200} loading="lazy" />
              <div>
                <h3 className="member__name">{m.name}</h3>
                <p className="member__role">{lang === "fr" ? m.roleFr : m.roleEn}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="influences">
          <span className="mono-label">{t("band.influences")}</span>
          <p>{influences.join(" / ")}</p>
        </div>
      </section>

      <div className="photo-band">
        <img src="/images/live-guitare.jpg" alt={t("photos.guitar")} loading="lazy" />
        <img src="/images/live-jour.jpg" alt={t("photos.daylight")} loading="lazy" className="photo-band__wide" />
        <img src="/images/guitare-rouge.jpg" alt={t("photos.redGuitar")} loading="lazy" />
      </div>
    </>
  );
}
