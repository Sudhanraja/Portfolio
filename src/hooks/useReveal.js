import { useEffect, useRef } from "react";

// Adds an `is-visible` class the first time an element scrolls into view,
// driving the fade-and-rise reveal defined in index.css. Attach the returned
// ref to any element that also carries the `reveal` class.
export function useReveal({ threshold = 0.1, once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver → show immediately (never hide content).
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    // If the element is already within (or above) the viewport on mount,
    // reveal it right away — the observer won't fire for it otherwise.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    // Safety net: never let a reveal element stay hidden permanently.
    const fallback = setTimeout(() => el.classList.add("is-visible"), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold, once]);

  return ref;
}
