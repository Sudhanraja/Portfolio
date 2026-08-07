import { useEffect, useRef, useState } from "react";

// Accessible custom dropdown to replace the native <select>, so the open list
// can be fully themed (native option popups are drawn by the OS and can't be
// styled). Implements the ARIA listbox pattern: keyboard navigation, type-to-
// close on Escape, and click-outside to dismiss.
function Select({ id, value, options, onChange, placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    Math.max(0, options.indexOf(value))
  );
  const rootRef = useRef(null);
  const listRef = useRef(null);

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const choose = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActive((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(options[active]);
        else setOpen(true);
        break;
      case "Escape":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="select" ref={rootRef}>
      <button
        type="button"
        id={id}
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className={value ? "" : "select__placeholder"}>
          {value || placeholder}
        </span>
        <span className={`select__chevron ${open ? "is-open" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <ul className="select__list" role="listbox" ref={listRef} tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`select__option ${opt === value ? "is-selected" : ""} ${
                i === active ? "is-active" : ""
              }`}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
