import { useTranslation } from "react-i18next";
import { LINKS, SectionTag } from "./shared";

export function Socials() {
  const { t } = useTranslation();
  const networks = [
    { key: "instagram", name: "Instagram", href: LINKS.instagram, desc: t("socials.instagram") },
    { key: "youtube", name: "YouTube", href: LINKS.youtube, desc: t("socials.youtube") },
    { key: "facebook", name: "Facebook", href: LINKS.facebook, desc: t("socials.facebook") },
    { key: "soundcloud", name: "SoundCloud", href: LINKS.soundcloud, desc: t("socials.soundcloud") },
  ];

  return (
    <section id="reseaux" className="section container">
      <div className="section__head">
        <div>
          <SectionTag label={t("socials.tag")} shape={3} />
          <h2 className="h2">{t("socials.title")}</h2>
        </div>
        <p className="socials__text">{t("socials.text")}</p>
      </div>

      <div className="socials">
        {networks.map((n) => (
          <a
            key={n.key}
            href={n.href}
            className={n.key === "instagram" ? "social social--featured" : "social"}
            target="_blank"
            rel="noreferrer"
          >
            <span className={`icon icon--${n.key}`} aria-hidden="true" />
            <span>
              <span className="social__name">{n.name}</span>
              <span className="social__desc">{n.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
