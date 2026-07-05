import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

// Resolves the initial theme: an explicit stored choice wins; otherwise fall
// back to the OS preference. Kept in sync with the inline boot script in
// index.html so the first paint already carries the right theme.
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Manages the light/dark theme: reflects the current choice onto
// <html data-theme>, persists it, and follows the OS preference until the
// user makes an explicit choice.
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply + persist whenever the theme changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // While the user hasn't chosen, track OS changes live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
