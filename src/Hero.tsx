import { useTranslation } from "react-i18next";
import { LINKS, PlayIcon } from "./shared";

export function Hero() {
  const { t } = useTranslation();
  const marquee = t("marquee", { returnObjects: true }) as string[];
  // Séquence répétée pour la boucle du marquee. Les traductions peuvent
  // contenir des doublons : on précalcule un id stable par occurrence
  // plutôt que d'utiliser l'index comme clé.
  const track = [...marquee, ...marquee, ...marquee, ...marquee].map((word, i) => ({
    id: `${i}-${word}`,
    word,
  }));

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
              <a href="#videos" className="btn btn--ghost">
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
            <img src="/images/group.jpg" alt={t("hero.photoAlt")} width={1800} height={1350} />
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
