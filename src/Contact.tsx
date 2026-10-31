import copy from "copy-to-clipboard";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { contactPhoto } from "./data/photos";
import { CopyFeedbackController } from "./services/CopyFeedbackController";
import { EMAIL, SectionTag, mailto } from "./shared";

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const feedback = useMemo(() => new CopyFeedbackController(setCopied), []);

  useEffect(() => () => feedback.dispose(), [feedback]);

  // The confirmation only shows on an actual copy: copy-to-clipboard
  // resolves false when every strategy failed.
  const handleCopy = async () => {
    if (await copy(EMAIL)) feedback.confirm();
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner container">
        <div className="contact__head">
          <div className="contact__intro">
            <SectionTag label={t("contact.tag")} inverted />
            <h2 className="contact__title">{t("contact.title")}</h2>
            <p className="contact__text">{t("contact.text")}</p>
            <div className="contact__email-row">
              <a href={mailto()} className="contact__email">
                {EMAIL}
              </a>
              <button type="button" className="contact__copy" onClick={handleCopy} aria-live="polite">
                <span className="icon icon--copy" aria-hidden="true" />
                {copied ? t("contact.copied") : t("contact.copy")}
              </button>
            </div>
          </div>
          <img className="contact__photo" src={contactPhoto.photo} alt={t(contactPhoto.alt)} loading="lazy" />
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
          <a href="/UNSQWARE-plaquette-2026.pdf" download target="_blank" rel="noopener noreferrer">
            <span className="mono-label">{t("contact.kit")}</span>
            <span className="contact__link-title">{t("contact.download")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
