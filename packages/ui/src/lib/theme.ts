import type { CSSProperties } from "react";

/**
 * Single source of truth for design tokens.
 * Every component imports `C` from here instead of redefining a local palette.
 */
// Values are CSS variables (defined per theme in app/globals.css), so every
// inline style that reads from C automatically responds to the active theme.
export const C = {
  // surfaces
  bg: "var(--sx-bg)",
  bgSurface: "var(--sx-bg-surface)",
  bgRaised: "var(--sx-bg-raised)",
  bgFooter: "var(--sx-bg-footer)",
  // borders
  border: "var(--sx-border)",
  borderStrong: "var(--sx-border-strong)",
  // text (strongest → faintest)
  text: "var(--sx-text)",
  textBody: "var(--sx-text-body)",
  textMuted: "var(--sx-text-muted)",
  textSubtle: "var(--sx-text-subtle)",
  // accent
  blue: "var(--sx-blue)",
  blueHover: "var(--sx-blue-hover)",
  blueLight: "var(--sx-blue-light)",
} as const;

// Translucent accent helpers (used for badges, glows, hover fills).
export const accent = {
  fill: "rgba(195,157,83,0.12)",
  fillStrong: "rgba(195,157,83,0.18)",
  border: "rgba(195,157,83,0.28)",
  hoverFill: "rgba(195,157,83,0.08)",
} as const;

/* ── Shared style fragments (reused across pages) ───────────── */

// Small uppercase section eyebrow above a page/section heading.
export const eyebrow: CSSProperties = {
  fontSize: "11.5px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.blue,
  marginBottom: "20px",
  fontFamily: "var(--sx-font-sans)",
};

// Standard page-header H1 (services, about, contact, service detail).
export const pageH1: CSSProperties = {
  fontFamily: "var(--sx-font-serif)",
  fontSize: "clamp(36px, 4.5vw, 56px)",
  fontWeight: 400,
  color: C.text,
  letterSpacing: "-0.015em",
  lineHeight: 1.15,
};

// Mid-size section heading (used on the careers page).
export const sectionHeading: CSSProperties = {
  fontFamily: "var(--sx-font-serif)",
  fontSize: "clamp(28px, 3.8vw, 42px)",
  fontWeight: 400,
  color: C.text,
  letterSpacing: "-0.015em",
  lineHeight: 1.18,
};

// Tiny uppercase label (footer columns, contact info, service sections).
export const metaLabel: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: C.textSubtle,
  fontFamily: "var(--sx-font-sans)",
};
