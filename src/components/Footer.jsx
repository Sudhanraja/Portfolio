import { NAME, SOCIALS } from "../data/portfolio";

// Footer with brand, quick social links, and attribution.
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">{NAME}</span>
        <ul className="footer__socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="mono-label"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="footer__meta mono-label">© {year} — Built with React</span>
      </div>
    </footer>
  );
}

export default Footer;
