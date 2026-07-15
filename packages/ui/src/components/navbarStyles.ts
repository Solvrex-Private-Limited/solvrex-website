import { C } from "../lib/theme";
import type { CSSProperties } from "react";

// Shared inline style objects used across the navbar components.
// Keeping these in one place avoids repeating the same object literals
// in Navbar.tsx, MobileDrawer.tsx, DesktopNav.tsx, and MegaMenu.tsx.

export const flexRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

export const flexBetween: CSSProperties = {
  ...flexRow,
  justifyContent: "space-between",
};

export const iconButtonReset: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

export const hamburgerBar: CSSProperties = {
  display: "block",
  width: "20px",
  height: "1.5px",
  backgroundColor: C.textMuted,
  borderRadius: "1px",
};

export const borderBottomLine: CSSProperties = {
  borderBottom: `1px solid ${C.border}`,
};