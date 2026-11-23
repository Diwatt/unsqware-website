import copy from "copy-to-clipboard";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { contactPhoto } from "./data/photos";
import { CopyFeedbackController } from "./services/CopyFeedbackController";
import { EMAIL, LINKS, SectionTag, mailto } from "./shared";

// Page 6 of the EPK: the booking call, the contact rows, the set formats and the press kit download.
export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const feedback = useMemo(() => new CopyFeedbackController(setCopied), []);
  const rows = [
    { label: t("contact.site"), href: "https://unsqwa.re/", value: "unsqwa.re" },
    { label: "Instagram", href: LINKS.instagram, value: "@unsqware" },
    { label: "Facebook", href: LINKS.facebook, value: "unsqwaremusique" },
    { label: "YouTube", href: LINKS.youtube, value: "@unsqware" },
  ];

  useEffect(() => () => feedback.dispose(), [feedback]);

  // The confirmation only shows on an actual copy: copy-to-clipboard
  // resolves false when every strategy failed.
  const handleCopy = async () => {
    if (await copy(EMAIL)) feedback.confirm();
  };

  return (
    <section id="contact" className="contact">
      <img
        className="contact__banner"
        src={contactPhoto.photo}
        srcSet={`${contactPhoto.photoSmall} 1200w, ${contactPhoto.photo} ${contactPhoto.width}w`}
        sizes="100vw"
        alt={t(contactPhoto.alt)}
        loading="lazy"
      />
      <div className="section container">
        <SectionTag label={t("contact.tag")} />
        <h2 className="h2 contact__title">{t("contact.title")}</h2>
        <p className="contact__text">{t("contact.text")}</p>

        <div className="contact__body">
          <ul className="contact__rows">
            <li>
              <span className="mono-label">{t("contact.email")}</span>
              <span className="contact__email">
                <a href={mailto()}>{EMAIL}</a>
                <button type="button" className="contact__copy" onClick={handleCopy} aria-live="polite">
                  <span className="icon icon--copy" aria-hidden="true" />
                  {copied ? t("contact.copied") : t("contact.copy")}
                </button>
              </span>
            </li>
            {rows.map((row) => (
              <li key={row.label}>
                <span className="mono-label">{row.label}</span>
                <a href={row.href} target="_blank" rel="noreferrer">
                  {row.value}
                </a>
              </li>
            ))}
          </ul>

          <div className="card contact__formats">
            <span className="mono-label card__kicker">{t("contact.formatsTitle")}</span>
            <p>{t("contact.formatsText")}</p>
          </div>
        </div>

        <div className="contact__links">
          <a href={mailto(t("live.mailSubject"))}>
            <span className="mono-label">{t("contact.promoters")}</span>
            <span className="contact__link-title">{t("contact.suggest")}</span>
          </a>
          <a href={mailto(t("contact.pressSubject"))}>
            <span className="mono-label">{t("contact.press")}</span>
            <span className="contact__link-title">{t("contact.interview")}</span>
          </a>
          <a href="/UNSQWARE-EPK-2027.pdf" download target="_blank" rel="noopener noreferrer">
            <span className="mono-label">{t("contact.kit")}</span>
            <span className="contact__link-title">{t("contact.download")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
