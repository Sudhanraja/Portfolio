import { useReveal } from "../hooks/useReveal";

// Reusable section wrapper: a terminal-path eyebrow (e.g. ~/about), a serif
// title, and a scroll-triggered reveal. Keeps individual sections focused on
// content. The eyebrow marker echoes the site's terminal motif — it labels the
// section rather than implying a numbered sequence of steps.
function Section({ id, title, eyebrow, alt = false, center = false, children }) {
  const ref = useReveal();
  const path = eyebrow ? `~/${eyebrow.toLowerCase()}` : null;

  return (
    <section id={id} className={`section ${alt ? "section--alt" : ""}`}>
      <div className="section__inner">
        {(eyebrow || title) && (
          <header
            ref={ref}
            className={`section__head reveal ${center ? "section__head--center" : ""}`}
          >
            {path && (
              <span className="section__eyebrow mono-label">
                <span className="section__eyebrow-mark" aria-hidden="true">
                  ▸{" "}
                </span>
                {path}
              </span>
            )}
            {title && <h2 className="section__title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
