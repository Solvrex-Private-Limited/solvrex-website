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
  fill: "rgba(77,124,255,0.1)",
  fillStrong: "rgba(77,124,255,0.12)",
  border: "rgba(77,124,255,0.2)",
  hoverFill: "rgba(77,124,255,0.06)",
} as const;

/* ── Shared style fragments (reused across pages) ───────────── */

// Small uppercase section eyebrow above a page/section heading.
export const eyebrow: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--sx-gold, #e5c07b)",
  marginBottom: "22px",
};

// Standard page-header H1 (services, about, contact, service detail).
export const pageH1: CSSProperties = {
  fontSize: "clamp(32px, 4vw, 48px)",
  fontWeight: 300,
  color: C.text,
  letterSpacing: "-0.025em",
  lineHeight: 1.12,
};

// Mid-size section heading (used on the careers page).
export const sectionHeading: CSSProperties = {
  fontSize: "clamp(26px, 3.4vw, 38px)",
  fontWeight: 300,
  color: C.text,
  letterSpacing: "-0.025em",
  lineHeight: 1.15,
};

// Tiny uppercase label (footer columns, contact info, service sections).
export const metaLabel: CSSProperties = {
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: C.textSubtle,
};
