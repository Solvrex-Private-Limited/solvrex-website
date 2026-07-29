import { C, eyebrow, sectionHeading } from "./theme";

export const sectionPad = {
  padding: "88px 0",
  borderBottom: `1px solid ${C.border}`,
} as const;
export const cardLabel = {
  fontSize: "16px",
  fontWeight: 600,
  color: C.text,
  marginBottom: "10px",
  letterSpacing: "-0.01em",
} as const;
export const cardBody = {
  fontSize: "14px",
  color: C.textMuted,
  lineHeight: 1.6,
} as const;
