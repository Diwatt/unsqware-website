import { LINKS } from "./shared";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span>© {new Date().getFullYear()} UNSQWARE — Nantes</span>
        <span className="footer__links">
          <a href={LINKS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={LINKS.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={LINKS.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        </span>
      </div>
    </footer>
  );
}
