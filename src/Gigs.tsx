import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { agenda } from "./config-agenda";
import { stagePhotos } from "./data/photos";
import { AgendaLoader } from "./services/AgendaLoader";
import { CalendarEvent } from "./services/CalendarEvent";
import { CalendarEventParser } from "./services/CalendarEventParser";
import type { Gig } from "./services/Gig";
import { GigFormatter } from "./services/GigFormatter";
import { GoogleAgendaClient } from "./services/GoogleAgendaClient";
import { LINKS, SectionTag, mailto } from "./shared";

// Dates to display: Google Calendar if credentials are set
// (VITE_CALENDAR_* variables, see .env.example), otherwise demo dates.
// On failure (network, key, quota) we silently end up with an empty
// list: the section falls back to the Instagram/Facebook announcement, as before.
function useUpcomingGigs(): Gig[] {
  // Demo dates are computed at first render (not in an effect): they are
  // deterministic when credentials are missing, and setting state
  // synchronously in an effect would cascade renders.
  const loader = useMemo(
    () => new AgendaLoader(new GoogleAgendaClient(agenda), new CalendarEventParser(agenda.tag)),
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

  return (
    <section id="scene" className="live">
      <div className="live__backdrop" aria-hidden="true">
        {stagePhotos.map((photo) => (
          <img key={photo} src={photo} alt="" loading="lazy" />
        ))}
      </div>
      <div className="section container">
        <SectionTag label={t("live.tag")} />
        <h2 className="h2 live__title">{t("live.title")}</h2>

        {upcoming.length > 0 && (
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
      </div>
    </section>
  );
}
