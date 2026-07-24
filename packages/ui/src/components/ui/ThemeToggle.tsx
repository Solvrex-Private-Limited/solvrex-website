"use client";

import { useEffect, useState } from "react";
import { C } from "../../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("solvrex-theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px", borderRadius: "4px",
        background: "none", border: "none",
        color: theme === "dark" ? "var(--sx-gold, #e5c07b)" : C.textMuted,
        cursor: "pointer",
        transition: "color 0.15s", flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = theme === "dark" ? "var(--sx-gold-hover, #f5dfb0)" : C.text;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = theme === "dark" ? "var(--sx-gold, #e5c07b)" : C.textMuted;
      }}
    >
      {theme === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
