import { useEffect, useRef, useState } from "react";

// Drives a terminal-style typing sequence through a list of lines. Each line
// is either typed character-by-character (a command) or printed instantly
// (output). Honours prefers-reduced-motion by revealing everything at once.
//
// lines: [{ text, kind: "cmd" | "out" | "comment", instant?: boolean }]
// Returns { rendered, done } where `rendered` mirrors `lines` but each entry
// carries a `shown` substring reflecting typing progress.
export function useTypewriter(lines, { speed = 32, linePause = 380 } = {}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [progress, setProgress] = useState(() =>
    prefersReduced ? { line: lines.length, char: 0 } : { line: 0, char: 0 }
  );
  const timer = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;

    function tick() {
      setProgress((p) => {
        if (p.line >= lines.length) return p;
        const current = lines[p.line];
        const typed = current.kind === "cmd" && !current.instant;

        // Output / instant lines appear whole, then advance after a pause.
        if (!typed) {
          timer.current = setTimeout(tick, linePause);
          return { line: p.line + 1, char: 0 };
        }

        // Command lines type one char at a time.
        if (p.char < current.text.length) {
          timer.current = setTimeout(tick, speed);
          return { line: p.line, char: p.char + 1 };
        }

        // Finished typing this command — pause, then move on.
        timer.current = setTimeout(tick, linePause);
        return { line: p.line + 1, char: 0 };
      });
    }

    timer.current = setTimeout(tick, 500);
    return () => clearTimeout(timer.current);
  }, [lines, speed, linePause, prefersReduced]);

  const done = progress.line >= lines.length;

  const rendered = lines.map((line, i) => {
    if (i < progress.line) return { ...line, shown: line.text, visible: true };
    if (i === progress.line && !done) {
      const shown =
        line.kind === "cmd" && !line.instant
          ? line.text.slice(0, progress.char)
          : "";
      return { ...line, shown, visible: line.kind === "cmd" };
    }
    return { ...line, shown: "", visible: false };
  });

  return { rendered, done, prefersReduced };
}
