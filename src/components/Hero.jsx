import { RESUME_URL } from "../data/portfolio";
import Terminal from "./Terminal";

// Landing / above-the-fold section. Two-column on desktop: a human-first
// intro (mono kicker, oversized serif name, positioning line, CTAs) beside
// the signature terminal panel. Collapses to a single column on mobile.
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__intro-col">
          <p className="hero__kicker mono-label">
            <span className="hero__status-dot" aria-hidden="true" />
            Software Engineer · Backend + AI
          </p>

          <h1 className="hero__title">Sudhanraja&nbsp;S</h1>

          <p className="hero__lead">
            I build production software end-to-end — REST APIs and backend
            architecture with Java, Spring Boot, Python &amp; FastAPI, plus
            AI-powered features using LLMs and RAG. Currently a Software Engineer
            at OASYS Cybernetics, expanding into AI engineering.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View Work
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={RESUME_URL}
              className="btn btn--text"
              download="Sudhanraja-S-Resume.pdf"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="hero__term-col">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

export default Hero;
