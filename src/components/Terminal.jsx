import { TERMINAL_SESSION } from "../data/portfolio";
import { useTypewriter } from "../hooks/useTypewriter";

// Signature element: a mock editor/terminal panel in the hero that types out a
// short, truthful session describing the stack and current focus. Reflects
// actual technical work (REST APIs, the FinPilot stack) rather than decoration.
// Reduced-motion users see the finished session immediately.
function Terminal() {
  const { rendered, done, prefersReduced } = useTypewriter(TERMINAL_SESSION);

  return (
    <div className="term" role="img" aria-label="Terminal session: software engineer at Oasys Cybernetics, focused on backend services, REST APIs and AI engineering; open to software, backend and AI engineer roles.">
      <div className="term__head" aria-hidden="true">
        <span className="term__dots">
          <span className="term__dot" />
          <span className="term__dot" />
          <span className="term__dot" />
        </span>
        <span className="term__file">sudhanraja — zsh</span>
      </div>

      <div className="term__body" aria-hidden="true">
        {rendered.map((line, i) => {
          if (!line.visible) return null;

          if (line.kind === "cmd") {
            const typing = !done && line.shown.length < line.text.length;
            return (
              <p key={i} className="term__line term__line--cmd">
                <span className="term__prompt">~ $</span>
                <span className="term__cmd">
                  {line.shown}
                  {typing && <span className="term__cursor" />}
                </span>
              </p>
            );
          }

          if (line.kind === "comment") {
            return (
              <p key={i} className="term__line term__line--comment">
                {line.text}
              </p>
            );
          }

          return (
            <p key={i} className="term__line term__line--out">
              {line.text}
            </p>
          );
        })}

        {/* Idle cursor once the session finishes (skipped for reduced motion). */}
        {done && !prefersReduced && (
          <p className="term__line term__line--cmd">
            <span className="term__prompt">~ $</span>
            <span className="term__cursor term__cursor--idle" />
          </p>
        )}
      </div>
    </div>
  );
}

export default Terminal;
