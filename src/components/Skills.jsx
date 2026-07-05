import Section from "./Section";
import { SKILLS } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

// Grouped skill rows rendered from the SKILLS data array.
function Skills() {
  const ref = useReveal();

  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit">
      <div className="skills reveal" ref={ref}>
        {SKILLS.map((group) => (
          <article key={group.group} className="skills__row">
            <h3 className="skills__group mono-label">{group.group}</h3>
            <ul className="skills__list">
              {group.items.map((item) => (
                <li key={item} className="skills__chip">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
