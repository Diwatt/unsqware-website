import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MorphingSquare } from "./components/MorphingSquare";
import type { Lang } from "./i18n";

const SECTION_IDS = [
	"groupe",
	"musique",
	"scene",
	"reseaux",
	"contact",
];

// Highlight the link of the section currently at the center of the screen.
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
			{ rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.5] },
		);

		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [ids]);

	return active;
}

function LangToggle() {
	const { t, i18n } = useTranslation();
	const lang = (i18n.resolvedLanguage ?? "fr") as Lang;
	const options: Lang[] = ["fr", "en"];
	return (
		<fieldset className="lang" aria-label={t("nav.language")}>
			{options.map((l) => (
				<button
					key={l}
					type="button"
					aria-pressed={lang === l}
					onClick={() => i18n.changeLanguage(l)}
				>
					{l.toUpperCase()}
				</button>
			))}
		</fieldset>
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
			{ id: "scene", label: t("nav.live") },
			{ id: "reseaux", label: t("nav.socials") },
		],
		[t],
	);

	return (
		<header className="nav">
			<nav className="nav__inner container" aria-label={t("nav.main")}>
				{/* biome-ignore lint/a11y/useValidAnchor: in-page navigation to the hero section */}
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
					{/* biome-ignore lint/a11y/useValidAnchor: in-page navigation to the contact section */}
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
