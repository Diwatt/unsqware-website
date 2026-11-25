import { useTranslation } from "react-i18next";
import { SectionTag } from "./shared";
import { influences, members } from "./data/groupe";
import { bandPhoto } from "./data/photos";

export function About() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === "en";

  return (
    <section id="groupe" className="section container">
      <div className="about__head">
        <div className="about__title">
          <SectionTag label={t("band.tag")} />
          <h2 className="h2">{t("band.title")}</h2>
        </div>
        <div className="about__text">
          <p className="about__intro">{t("band.intro")}</p>
          <p>{t("band.p1")}</p>
          <p>{t("band.p2")}</p>
        </div>
      </div>

      <figure className="band-photo">
        <img
          src={bandPhoto.photo}
          srcSet={`${bandPhoto.photoSmall} 1200w, ${bandPhoto.photo} ${bandPhoto.width}w`}
          sizes="(min-width: 1320px) 1208px, 92vw"
          alt={t("band.photoAlt")}
          width={bandPhoto.width}
          height={bandPhoto.height}
          loading="lazy"
        />
        <figcaption>
          <ul className="band-photo__members">
            {members.map((m) => (
              <li key={m.name}>
                <span className="band-photo__name">{m.name}</span>
                <span className="band-photo__role">{isEnglish ? m.roleEn : m.roleFr}</span>
              </li>
            ))}
          </ul>
          <span className="mono-label band-photo__order">{t("band.leftToRight")}</span>
        </figcaption>
      </figure>

      <div className="influences">
        <span className="mono-label">{t("band.influences")}</span>
        <p>{influences.join(" / ")}</p>
      </div>
    </section>
  );
}
