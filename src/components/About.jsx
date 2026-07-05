import Section from "./Section";
import ProfilePhoto from "./ProfilePhoto";
import { useReveal } from "../hooks/useReveal";

// Portrait, short professional bio, and quick highlight stats.
function About() {
  const ref = useReveal();

  return (
    <Section id="about" eyebrow="About" title="Profile">
      <div className="about reveal" ref={ref}>
        <ProfilePhoto />

        <div className="about__content">
          <div className="about__text">
            <p>
              I'm a Software Engineer at OASYS Cybernetics, where I ship
              production features end-to-end — designing REST APIs and backend
              architecture with Java, Spring Boot, Python, and FastAPI, and
              building the interfaces on top of them with React.
            </p>
            <p>
              I'm expanding into AI engineering through hands-on work: applying
              Large Language Models and Retrieval-Augmented Generation to
              real problems, from a Gemini-powered finance advisor to a
              document-grounded RAG chatbot. With a B.Tech in AI &amp; Data
              Science, I bring an analytical approach and care about clean,
              scalable, maintainable code.
            </p>
          </div>

          <ul className="about__stats" aria-label="Highlights">
            <li>
              <span className="about__stat-value">OASYS</span>
              <span className="about__stat-label">Cybernetics Pvt Ltd</span>
            </li>
            <li>
              <span className="about__stat-value">Backend</span>
              <span className="about__stat-label">Java · Spring · FastAPI</span>
            </li>
            <li>
              <span className="about__stat-value">AI / LLM</span>
              <span className="about__stat-label">RAG · LangChain · Gemini</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default About;
