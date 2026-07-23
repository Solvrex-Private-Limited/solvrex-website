// Reusable "Aurora" hero light. SVG soft-light blobs animated with transform/opacity
// only (GPU). Place inside a position:relative, overflow:hidden hero with content above
// it (z-index > 0). Honors prefers-reduced-motion via the .aurora-* rules in globals.css.

import type { CSSProperties } from "react";

export type AuroraVariant =
  | "homepage"
  | "career"
  | "technology"
  | "business"
  | "resources"
  | "pricing";

interface Blob {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  grad: "blue" | "blueDeep" | "indigo" | "sky";
  cls: "aurora-a" | "aurora-b" | "aurora-c";
  opacity?: number;
}

interface VariantConfig {
  opacity: number; // overall intensity of the layer
  blobs: Blob[];
  geometric?: boolean; // structured line motif (technology)
}

// viewBox is 1000 x 600; SVG is sliced to cover the hero.
const VARIANTS: Record<AuroraVariant, VariantConfig> = {
  // Largest treatment, upper-right, partially off-screen.
  homepage: {
    opacity: 0.6,
    blobs: [
      { cx: 800, cy: 130, rx: 480, ry: 400, grad: "blue", cls: "aurora-a" },
      { cx: 960, cy: 330, rx: 400, ry: 350, grad: "indigo", cls: "aurora-b" },
      { cx: 660, cy: 80, rx: 280, ry: 260, grad: "sky", cls: "aurora-c", opacity: 0.7 },
    ],
  },
  // Flowing diagonal — suggests guided progression top-left → bottom-right.
  career: {
    opacity: 0.78,
    blobs: [
      { cx: 140, cy: 60, rx: 280, ry: 240, grad: "blue", cls: "aurora-a" },
      { cx: 520, cy: 300, rx: 300, ry: 260, grad: "blue", cls: "aurora-b" },
      { cx: 900, cy: 540, rx: 320, ry: 280, grad: "indigo", cls: "aurora-c" },
    ],
  },
  // Structured + indigo for systems/architecture.
  technology: {
    opacity: 0.76,
    geometric: true,
    blobs: [
      { cx: 860, cy: 110, rx: 380, ry: 320, grad: "indigo", cls: "aurora-a" },
      { cx: 960, cy: 380, rx: 320, ry: 300, grad: "blueDeep", cls: "aurora-b" },
    ],
  },
  // Broad, expansive, teal-blue balance.
  business: {
    opacity: 0.8,
    blobs: [
      { cx: 300, cy: 200, rx: 470, ry: 320, grad: "blue", cls: "aurora-b" },
      { cx: 840, cy: 380, rx: 470, ry: 320, grad: "sky", cls: "aurora-a" },
    ],
  },
  // Content-first: smaller, lower opacity.
  resources: {
    opacity: 0.52,
    blobs: [{ cx: 900, cy: 70, rx: 300, ry: 250, grad: "blue", cls: "aurora-a" }],
  },
  // Almost invisible — clarity first.
  pricing: {
    opacity: 0.36,
    blobs: [{ cx: 950, cy: 50, rx: 240, ry: 200, grad: "blue", cls: "aurora-a" }],
  },
};

const GRADIENTS: { id: Blob["grad"]; color: string }[] = [
  { id: "blue", color: "var(--aurora-blue, #3B82F6)" },
  { id: "blueDeep", color: "var(--aurora-blue-deep, #2563EB)" },
  { id: "indigo", color: "var(--aurora-indigo, #4F46E5)" },
  { id: "sky", color: "var(--aurora-sky, #0EA5E9)" },
];

export function Aurora({ variant = "homepage" }: { variant?: AuroraVariant }) {
  const cfg = VARIANTS[variant];
  return (
    <div className="aurora" aria-hidden="true" style={{ ["--aurora-o" as string]: cfg.opacity } as CSSProperties}>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          {GRADIENTS.map((g) => (
            <radialGradient key={g.id} id={`aurora-${variant}-${g.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={g.color} stopOpacity="0.85" />
              <stop offset="72%" stopColor={g.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {cfg.geometric && (
          <g stroke="var(--aurora-indigo, #4F46E5)" strokeWidth="1" fill="none" opacity="0.12">
            <path d="M620 120 L900 120 L900 400" />
            <path d="M700 60 L700 460 L1000 460" />
            <rect x="780" y="200" width="150" height="150" transform="rotate(12 855 275)" />
            <circle cx="700" cy="120" r="4" />
            <circle cx="900" cy="400" r="4" />
          </g>
        )}

        {cfg.blobs.map((b, i) => (
          <ellipse
            key={i}
            className={`aurora-blob ${b.cls}`}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill={`url(#aurora-${variant}-${b.grad})`}
            opacity={b.opacity ?? 1}
          />
        ))}
      </svg>
    </div>
  );
}
