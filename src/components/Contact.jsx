import { useState } from "react";
import Section from "./Section";
import { SOCIALS, FORMSPREE_ENDPOINT } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

// A contact form plus quick-contact buttons. Submissions post directly to
// Formspree, which relays them to the site owner's inbox — no custom backend.
function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" center>
      <p className="contact__lead">
        Whether you're hiring for a role or just want to connect, I'd love to
        hear from you.
      </p>

      <form className="contact__form reveal" ref={ref} onSubmit={handleSubmit}>
        <div className="contact__field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
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
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
          />
        </div>

        <div className="contact__field">
          <label htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            placeholder="Tell me about the role or your message…"
          />
        </div>

        <button
          type="submit"
          className="btn btn--primary contact__submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
          <span aria-hidden="true">→</span>
        </button>

        {status === "sent" && (
          <div className="contact__banner contact__banner--ok" role="status">
            <span className="contact__banner-icon" aria-hidden="true">✓</span>
            <span>
              Message sent — thanks for reaching out. I'll get back to you soon.
            </span>
          </div>
        )}
        {status === "error" && (
          <div className="contact__banner contact__banner--error" role="alert">
            <span className="contact__banner-icon" aria-hidden="true">!</span>
            <span>
              Something went wrong. Please try again or email me directly below.
            </span>
          </div>
        )}
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
