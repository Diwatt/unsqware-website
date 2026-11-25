import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { agenda } from "./config-agenda";
import { agenda2026 } from "./data/agenda";
import { stagePhoto } from "./data/photos";
import { AgendaLoader } from "./services/AgendaLoader";
import { CalendarEvent } from "./services/CalendarEvent";
import { CalendarEventParser } from "./services/CalendarEventParser";
import type { Gig } from "./services/Gig";
import { GigEventMarkup } from "./services/GigEventMarkup";
import { GigFormatter } from "./services/GigFormatter";
import { GoogleAgendaClient } from "./services/GoogleAgendaClient";
import { SectionTag } from "./shared";

// Dates to display: Google Calendar if credentials are set
// (VITE_CALENDAR_* variables, see .env.example), otherwise demo dates in development only.
// On failure (network, key, quota) we silently end up with an empty list: only the 2026 shows remain.
function useUpcomingGigs(): Gig[] {
  // Demo dates are computed at first render (not in an effect): they are
  // deterministic when credentials are missing, and setting state
  // synchronously in an effect would cascade renders.
  const loader = useMemo(
    () => new AgendaLoader(new GoogleAgendaClient(agenda), new CalendarEventParser(agenda.tag), import.meta.env.DEV),
    [],
  );
  const [gigs, setGigs] = useState<Gig[]>(() => loader.initialGigs());

  useEffect(() => {
    let cancelled = false;
    loader
      .fetchUpcoming()
      .then((upcoming) => {
        if (!cancelled) setGigs(upcoming);
      })
      .catch((err) => console.warn("[agenda] dates unavailable", err));

    return () => {
      cancelled = true;
    };
  }, [loader]);

  return gigs;
}

export function Gigs() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "fr";
  const formatter = new GigFormatter(lang);
  const upcoming = useUpcomingGigs();
  const eventMarkup = useMemo(() => new GigEventMarkup(lang), [lang]);

  return (
    <section id="agenda" className="live">
      {upcoming.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventMarkup.toJsonLd(upcoming) }} />
      )}
      <img
        className="live__banner"
        src={stagePhoto.photo}
        srcSet={`${stagePhoto.photoSmall} 1200w, ${stagePhoto.photo} ${stagePhoto.width}w`}
        sizes="100vw"
        alt={t(stagePhoto.alt)}
        loading="lazy"
      />
      <div className="section container">
        <SectionTag label={t("live.tag")} />
        {upcoming.length > 0 && (
          <>
            <h2 className="h2 live__title">{t("live.title")}</h2>
            <ul className="dates">
              {upcoming.map((g) => {
                const time = g.allDay ? undefined : formatter.time(g.start);
                // The geocoded venue (location field) only shows if the title doesn't already say it.
                const venueLabel =
                  g.name && g.venue && !CalendarEvent.isSamePlace(g.name, g.venue) ? g.venue : undefined;
                const meta = [time, venueLabel, g.details].filter(Boolean).join(" · ");
                return (
                  <li key={g.id}>
                    <time className="dates__date" dateTime={g.start.toISOString()}>
                      {formatter.date(g.start)}
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
          </>
        )}

        <h3 className="h2 live__subtitle">{t("live.agendaTitle")}</h3>
        <ul className="agenda">
          {agenda2026.map((show) => (
            <li key={`${show.date}-${show.venue}`}>
              <time className="agenda__date" dateTime={show.date}>
                {formatter.numericDay(show.date)}
              </time>
              <span>
                {show.venue} ({show.city})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
