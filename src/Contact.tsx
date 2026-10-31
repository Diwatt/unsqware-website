import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EMAIL, SectionTag, mailto } from "./shared";

// Clipboard API indisponible en contexte non sécurisé : repli sur execCommand.
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const area = document.createElement("textarea");
    area.value = EMAIL;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    await copyEmail();
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner container">
        <SectionTag label={t("contact.tag")} shape={4} inverted />
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
