import { useState } from "react";
import { NAME, NAV_LINKS } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

// Sun / moon glyphs for the theme toggle.
function ThemeIcon({ theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <line x1="12" y1="2.5" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="21.5" y2="12" />
          <line x1="5.1" y1="5.1" x2="6.8" y2="6.8" />
          <line x1="17.2" y1="17.2" x2="18.9" y2="18.9" />
          <line x1="5.1" y1="18.9" x2="6.8" y2="17.2" />
          <line x1="17.2" y1="6.8" x2="18.9" y2="5.1" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M20 14.5A8 8 0 0 1 9.5 4a0.5 0.5 0 0 0-0.7-0.6A9 9 0 1 0 20.6 15.2a0.5 0.5 0 0 0-0.6-0.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Sticky top navigation with active-section tracking. Collapses to a
// toggle-able menu on small screens.
function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={closeMenu} aria-label={`${NAME} — home`}>
          <span className="navbar__brand-text">
            <span className="navbar__brand-name">{NAME}</span>
            <span className="navbar__brand-role">Software Engineer</span>
          </span>
        </a>

        <div className="navbar__right">
          <ul className={`navbar__menu ${open ? "navbar__menu--open" : ""}`}>
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={active === id ? "is-active" : ""}
                    aria-current={active === id ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="navbar__controls">
            <button
              type="button"
              className="navbar__theme"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <ThemeIcon theme={theme} />
            </button>

            <button
              type="button"
              className="navbar__toggle"
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navbar__toggle-bar" />
              <span className="navbar__toggle-bar" />
              <span className="navbar__toggle-bar" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
