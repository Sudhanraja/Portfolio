import Section from "./Section";
import { SOCIALS } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

// Contact section listing ways to reach out, sourced from SOCIALS.
function Contact() {
  const ref = useReveal();

  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" center>
      <p className="contact__lead">
        I'm always open to discussing new projects, engineering roles, or
        opportunities to collaborate. Reach out through any of the channels below.
      </p>

      <ul className="contact__list reveal" ref={ref}>
        {SOCIALS.map((social) => (
          <li key={social.label} className="contact__item">
            <a
              href={social.href}
              className="contact__link"
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact__label mono-label">{social.label}</span>
              <span className="contact__handle">{social.handle}</span>
              <span className="contact__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Contact;
