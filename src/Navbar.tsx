import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { type Lang } from "./i18n";

const SECTION_IDS = ["groupe", "musique", "videos", "scene", "reseaux", "contact"];

// Souligne le lien de la section actuellement au centre de l'écran.
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.5] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return y;
}

// Le carré se déforme avec le scroll : chaque coin dérive sur sa propre sinusoïde.
function squarePoints(t: number, amp: number, phase: number) {
  const base = [
    [4, 4],
    [26, 4],
    [26, 26],
    [4, 26],
  ];
  return base
    .map(([x, y], i) => {
      const k = i * 1.7 + phase;
      const dx = Math.sin(t * (1 + i * 0.23) + k) * amp;
      const dy = Math.cos(t * (1.2 - i * 0.17) + k * 1.3) * amp;
      return `${(x + dx).toFixed(2)},${(y + dy).toFixed(2)}`;
    })
    .join(" ");
}

function MorphingSquare() {
  const y = useScrollY();
  const t = y / 180;
  const amp = Math.min(5, 1.5 + y / 400);

  return (
    <svg
      className="logo__mark"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      aria-hidden="true"
      style={{ transform: `rotate(${(Math.sin(t * 0.45) * 18).toFixed(2)}deg)` }}
    >
      <polygon className="logo__echo" points={squarePoints(t * 0.8, amp * 1.3, 2.4)} />
      <polygon className="logo__main" points={squarePoints(t, amp, 0)} />
    </svg>
  );
}

function LangToggle() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "fr") as Lang;
  const options: Lang[] = ["fr", "en"];
  return (
    <span className="lang" role="group" aria-label={t("nav.language")}>
      {options.map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => i18n.changeLanguage(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </span>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const close = () => setOpen(false);

  const links = useMemo(
    () => [
      { id: "groupe", label: t("nav.band") },
      { id: "musique", label: t("nav.music") },
      { id: "videos", label: t("nav.videos") },
      { id: "scene", label: t("nav.live") },
      { id: "reseaux", label: t("nav.socials") },
    ],
    [t]
  );

  return (
    <header className="nav">
      <nav className="nav__inner container" aria-label={t("nav.main")}>
        <a href="#accueil" className="logo" onClick={close}>
          <MorphingSquare />
          <span className="logo__word">UNSQWARE</span>
        </a>

        <div className={open ? "nav__links is-open" : "nav__links"}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "nav__link is-active" : "nav__link"}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav__cta" onClick={close}>
            {t("nav.contact")}
          </a>
          <LangToggle />
        </div>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </nav>
    </header>
  );
}
