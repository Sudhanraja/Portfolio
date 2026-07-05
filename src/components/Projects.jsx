import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/portfolio";

// Responsive grid of project cards, sourced from the PROJECTS data array.
function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected Work" alt>
      <div className="projects">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} number={i + 1} {...project} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
