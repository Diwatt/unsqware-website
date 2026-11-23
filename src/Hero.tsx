import { useTranslation } from "react-i18next";
import { heroPhoto } from "./data/photos";
import { LINKS, PlayIcon } from "./shared";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero container" id="accueil">
      <div className="hero__meta">
        <span className="hero__kicker">{t("hero.kicker")}</span>
        <span className="hero__ep">{t("hero.ep")}</span>
      </div>

      <div className="hero__row">
        <div className="hero__text">
          <p className="hero__lede">{t("hero.lede")}</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--accent">
              {t("hero.ctaContact")}
              <span className="icon icon--arrow-right" aria-hidden="true" />
            </a>
            <a href="#musique" className="btn btn--ghost">
              <PlayIcon />
              {t("hero.ctaTotem")}
            </a>
          </div>
          <div className="hero__follow">
            <span>{t("hero.follow")}</span>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={LINKS.youtube} target="_blank" rel="noreferrer">
              YouTube ↗
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
          </div>
        </div>

        <div className="hero__photo">
          <div className="hero__frame" aria-hidden="true" />
          <img
            src={heroPhoto.photo}
            alt={t("hero.photoAlt")}
            width={heroPhoto.width}
            height={heroPhoto.height}
            fetchPriority="high"
          />
        </div>
      </div>

      <h1 className="hero__title">
        UNSQ<span>WARE</span>
      </h1>
    </section>
  );
}
