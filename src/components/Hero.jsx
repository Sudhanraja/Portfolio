import { RESUME_URL, RESUME_DOWNLOAD_NAME } from "../data/portfolio";
import Terminal from "./Terminal";

// Landing / above-the-fold section. Two-column on desktop: a human-first
// intro (title, name, positioning line, CTAs, availability) beside the
// signature terminal panel. Collapses to a single column on mobile.
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__intro-col">
          <p className="hero__kicker mono-label">
            Software Engineer | Backend &amp; AI Developer
          </p>

          <h1 className="hero__title">Sudhanraja&nbsp;S</h1>

          <p className="hero__lead">
            I build secure backend systems, full-stack web applications, and
            AI-powered solutions using React, FastAPI, Python, PostgreSQL, and
            Generative AI.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View Projects
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn--text">
              Hire Me
            </a>
            <a
              href={RESUME_URL}
              className="btn btn--text"
              download={RESUME_DOWNLOAD_NAME}
            >
              Download Resume
            </a>
          </div>

          <p className="hero__availability">
            <span className="hero__status-dot" aria-hidden="true" />
            Open to new opportunities
          </p>
        </div>

        <div className="hero__term-col">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

export default Hero;
