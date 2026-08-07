import Section from "./Section";
import { SERVICES } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

// Freelance service offerings, sourced from the SERVICES data array. Rendered
// as a responsive grid of client-focused cards (no fixed pricing).
function Services() {
  const ref = useReveal();

  return (
    <Section id="services" eyebrow="Services" title="How I can help">
      <p className="services__lead">
        Available for freelance work — from full builds to focused fixes. Here's
        what I take on for clients and teams.
      </p>

      <ul className="services reveal" ref={ref}>
        {SERVICES.map((service) => (
          <li key={service.title} className="service-card">
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Services;
