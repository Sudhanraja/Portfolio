import Section from "./Section";
import { EXPERIENCE } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

// Editorial timeline of professional experience, sourced from EXPERIENCE.
function Experience() {
  const ref = useReveal();

  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" alt>
      <ol className="exp reveal" ref={ref}>
        {EXPERIENCE.map((job) => (
          <li key={`${job.company}-${job.role}`} className="exp__item">
            <div className="exp__meta">
              <span className="exp__period mono-label">{job.period}</span>
            </div>

            <div className="exp__body">
              <h3 className="exp__role">{job.role}</h3>
              <p className="exp__company">
                {job.company}
                <span className="exp__location"> — {job.location}</span>
              </p>

              <ul className="exp__points">
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
