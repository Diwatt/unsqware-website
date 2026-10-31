import { useTranslation } from "react-i18next";
import { marqueeWords } from "./data/marquee";
import { LINKS, PlayIcon } from "./shared";

export function Hero() {
  const { t } = useTranslation();
  // Six copies of the titles: the -50% loop needs a half wider than any
  // viewport to stay seamless.
  const track = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map(
    (word, i) => ({ id: `${i}-${word}`, word }),
  );

  return (
    <>
      <section className="hero container" id="accueil">
        <div className="hero__meta">
          <span>{t("hero.kicker")}</span>
          <span className="hero__ep">{t("hero.ep")}</span>
        </div>

        <div className="hero__row">
          <div className="hero__text">
            <p className="hero__lede">{t("hero.lede")}</p>
            <p className="hero__sub">{t("hero.sub")}</p>
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
            <img src="/images/groupe-vitre.jpg" alt={t("hero.photoAlt")} width={1800} height={1350} />
          </div>
        </div>

        <h1 className="hero__title">
          UNSQ<span>WARE</span>
        </h1>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {track.map((item) => (
            <span key={item.id}>{item.word} ◼</span>
          ))}
        </div>
      </div>
    </>
  );
}
