import { useTranslation } from "react-i18next";
import { SectionTag } from "./shared";
import { influences } from "./data/groupe";
import { studioPhotos } from "./data/photos";

// Second half of the EPK bio: the photo grid, the band's story from the stage to the EP, and its influences.
export function StudioLive() {
  const { t } = useTranslation();

  return (
    <section id="studio" className="section container studio">
      <SectionTag label={t("studio.tag")} />

      <div className="studio__grid">
        {studioPhotos.map((p) => (
          <img key={p.photo} src={p.photo} alt={t(p.alt)} loading="lazy" />
        ))}
      </div>

      <div className="studio__text">
        <p>{t("studio.p1")}</p>
        <p>{t("studio.p2")}</p>
        <p>{t("studio.p3")}</p>
        <p>{t("studio.p4")}</p>
        <p className="studio__closing">{t("studio.closing")}</p>
      </div>

      <div className="influences">
        <span className="mono-label">{t("studio.influences")}</span>
        <p>{influences.join(" / ")}</p>
      </div>
    </section>
  );
}
