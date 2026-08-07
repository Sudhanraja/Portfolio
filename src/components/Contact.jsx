import { useState } from "react";
import Section from "./Section";
import Select from "./Select";
import { SOCIALS, EMAIL } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

const PURPOSE_OPTIONS = ["Job Opportunity", "Freelance Project"];

// Two clear paths (hire vs. freelance) plus a contact form and quick-contact
// buttons. The form has no backend — Submit opens the visitor's email client
// pre-filled via a mailto: link, so nothing secret ships in the frontend.
function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
  });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const purpose = form.purpose || "General enquiry";
    const subject = `[${purpose}] Portfolio enquiry from ${form.name || "someone"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Purpose: ${purpose}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" center>
      <p className="contact__lead">
        Whether you're hiring for a role or have a project in mind, I'd love to
        hear from you.
      </p>

      <div className="contact__paths">
        <div className="contact__path">
          <h3 className="contact__path-title">Looking to hire me for a role?</h3>
          <p className="contact__path-text">
            I'm open to Software Engineer, Backend, and AI Engineer positions.
            Send a note or grab my resume — I'll get back to you quickly.
          </p>
        </div>
        <div className="contact__path">
          <h3 className="contact__path-title">Have a freelance project in mind?</h3>
          <p className="contact__path-text">
            Full-stack builds, backend APIs, or AI/RAG apps — tell me what you
            need and I'll help you scope and ship it.
          </p>
        </div>
      </div>

      <form className="contact__form reveal" ref={ref} onSubmit={handleSubmit}>
        <div className="contact__field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
          />
        </div>

        <div className="contact__field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
          />
        </div>

        <div className="contact__field">
          <label htmlFor="cf-purpose">Contact purpose</label>
          <Select
            id="cf-purpose"
            value={form.purpose}
            placeholder="Select an option"
            options={PURPOSE_OPTIONS}
            onChange={(v) => setForm((f) => ({ ...f, purpose: v }))}
          />
        </div>

        <div className="contact__field">
          <label htmlFor="cf-message">Project requirement or message</label>
          <textarea
            id="cf-message"
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            placeholder="Tell me about the role or project…"
          />
        </div>

        <button type="submit" className="btn btn--primary contact__submit">
          Send Message
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="contact__divider" aria-hidden="true">
        <span>or reach me directly</span>
      </div>

      <ul className="contact__buttons" aria-label="Direct contact links">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className="contact__button"
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact__button-label">{social.label}</span>
              <span className="contact__button-handle">{social.handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Contact;
