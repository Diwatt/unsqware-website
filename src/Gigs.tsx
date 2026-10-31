import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { agenda, demoEvents } from "./config-agenda";
import {
  buildEventsUrl,
  formatGigDate,
  formatGigTime,
  isConfigured,
  isSamePlace,
  mapCalendarEvent,
  sortGigs,
  type CalendarEvent,
  type Gig,
} from "./gigs-agenda";
import { LINKS, SectionTag, mailto } from "./shared";

// Dates à afficher : agenda Google si les identifiants sont renseignés
// (variables VITE_CALENDAR_*, voir .env.example), sinon dates d'exemple.
// En cas d'échec (réseau, clé, quota) on reste silencieusement sur une liste
// vide : la section retombe sur l'annonce Instagram/Facebook, comme avant.
function useUpcomingGigs(): Gig[] {
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    const toGigs = (events: CalendarEvent[]) =>
      sortGigs(
        events
          .map((e) => mapCalendarEvent(e, agenda.tag))
          .filter((g): g is Gig => g !== null),
      );

    if (!isConfigured(agenda)) {
      setGigs(toGigs(demoEvents));
      return;
    }

    let cancelled = false;
    fetch(buildEventsUrl(agenda, new Date()))
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`Google Calendar HTTP ${res.status}`)),
      )
      .then((data: { items?: CalendarEvent[] }) => {
        if (!cancelled) setGigs(toGigs(data.items ?? []));
      })
      .catch((err) => console.warn("[agenda] dates indisponibles", err));

    return () => {
      cancelled = true;
    };
  }, []);

  return gigs;
}

export function Gigs() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "fr";
  const upcoming = useUpcomingGigs();
  const timeline = t("live.timeline", { returnObjects: true }) as { year: string; text: string }[];

  return (
    <section id="scene" className="live">
      <div className="section container">
        <SectionTag label={t("live.tag")} shape={2} />
        <h2 className="h2 live__title">{t("live.title")}</h2>

        {upcoming.length > 0 && (
          <ul className="dates">
            {upcoming.map((g) => {
              const time = g.allDay ? undefined : formatGigTime(g.start, lang);
              // La salle géocodée (champ lieu) ne s'affiche que si le titre ne la dit pas déjà.
              const venueLabel = g.name && g.venue && !isSamePlace(g.name, g.venue) ? g.venue : undefined;
              const meta = [time, venueLabel, g.details].filter(Boolean).join(" · ");
              return (
                <li key={g.id}>
                  <time className="dates__date" dateTime={g.start.toISOString()}>
                    {formatGigDate(g.start, lang)}
                  </time>
                  <span className="dates__venue">
                    {g.name ?? g.venue}
                    {meta && <span className="dates__meta">{meta}</span>}
                  </span>
                  {g.city && <span className="dates__city">{g.city}</span>}
                  {g.ticketsUrl && (
                    <a href={g.ticketsUrl} className="btn btn--ghost btn--small" target="_blank" rel="noreferrer">
                      Tickets
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <p className="live__announce">
          {t("live.announce")}{" "}
          <a href={LINKS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>{" "}
          {t("live.and")}{" "}
          <a href={LINKS.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          .
        </p>

        <div className="callout">
          <div>
            <p className="callout__title">{t("live.callTitle")}</p>
            <p className="callout__text">{t("live.callText")}</p>
          </div>
          <a href={mailto(t("live.mailSubject"))} className="btn btn--accent">
            {t("live.callCta")}
          </a>
        </div>

        <h3 className="mono-label live__timeline-title">{t("live.timelineTitle")}</h3>
        <ol className="timeline">
          {timeline.map((e, i) => (
            <li key={e.year} className={i === timeline.length - 1 ? "is-next" : undefined}>
              <span className="timeline__year">{e.year}</span>
              <p>{e.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
