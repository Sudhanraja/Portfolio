import { useReveal } from "../hooks/useReveal";
import Carousel from "./Carousel";

// Single project case study. Text on one side, an optional screenshot carousel
// on the other. Renders a tagline, the problem it solves, how it works, and the
// key technical decisions — kept separate so the Projects grid stays declarative.
function ProjectCard({
  number,
  title,
  tagline,
  problem,
  description,
  highlights,
  tech,
  images,
  repo,
  demo,
}) {
  const ref = useReveal();
  const hasMedia = Array.isArray(images) && images.length > 0;

  return (
    <article className={`project reveal ${hasMedia ? "project--with-media" : ""}`} ref={ref}>
      <div className="project__info">
        <div className="project__top">
          <span className="project__number mono-label">
            {String(number).padStart(2, "0")}
          </span>
          <div className="project__links">
            {repo && (
              <a href={repo} target="_blank" rel="noreferrer" className="project__link">
                Code ↗
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="project__link">
                Live ↗
              </a>
            )}
          </div>
        </div>

        <h3 className="project__title">{title}</h3>
        {tagline && <p className="project__tagline mono-label">{tagline}</p>}

        {problem && (
          <p className="project__problem">
            <span className="project__problem-label">The problem — </span>
            {problem}
          </p>
        )}

        <p className="project__desc">{description}</p>

        {Array.isArray(highlights) && highlights.length > 0 && (
          <ul className="project__highlights">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        <ul className="project__tech">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      {hasMedia && (
        <div className="project__media">
          <Carousel images={images} title={title} />
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
