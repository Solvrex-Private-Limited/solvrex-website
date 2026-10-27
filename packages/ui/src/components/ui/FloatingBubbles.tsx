"use client";

import React from "react";

interface BubbleConfig {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  opacity?: number;
}

export interface FloatingBubblesProps {
  count?: number;
  className?: string;
}

// Calibrated, elegant bubble distribution with reduced count (14 bubbles)
const BUBBLE_LIST: BubbleConfig[] = [
  // Upper viewport on initial render
  { id: 1, size: 44, left: 6, duration: 19, delay: -14, drift: 20, opacity: 0.6 },
  { id: 2, size: 74, left: 18, duration: 23, delay: -17, drift: -24, opacity: 0.65 },
  { id: 3, size: 34, left: 32, duration: 16, delay: -6, drift: 18, opacity: 0.55 },
  { id: 4, size: 82, left: 45, duration: 25, delay: -20, drift: -22, opacity: 0.66 },
  { id: 5, size: 50, left: 58, duration: 18, delay: -10, drift: 22, opacity: 0.6 },
  { id: 6, size: 76, left: 72, duration: 22, delay: -16, drift: -24, opacity: 0.64 },
  { id: 7, size: 36, left: 86, duration: 15, delay: -4, drift: 16, opacity: 0.55 },

  // Mid & lower viewport rising smoothly
  { id: 8, size: 68, left: 12, duration: 20, delay: -8, drift: 22, opacity: 0.62 },
  { id: 9, size: 42, left: 26, duration: 17, delay: -2, drift: -18, opacity: 0.56 },
  { id: 10, size: 78, left: 39, duration: 24, delay: -12, drift: 24, opacity: 0.65 },
  { id: 11, size: 48, left: 65, duration: 19, delay: -5, drift: -20, opacity: 0.58 },
  { id: 12, size: 70, left: 79, duration: 21, delay: -11, drift: 20, opacity: 0.63 },
  { id: 13, size: 38, left: 92, duration: 16, delay: -13, drift: -18, opacity: 0.55 },
  { id: 14, size: 54, left: 52, duration: 20, delay: -3, drift: 18, opacity: 0.58 },
];

export function FloatingBubbles({ count, className }: FloatingBubblesProps) {
  const items = typeof count === "number" ? BUBBLE_LIST.slice(0, count) : BUBBLE_LIST;

  return (
    <div className={`sx-floating-bubbles ${className ?? ""}`.trim()} aria-hidden="true">
      {items.map((b) => (
        <span
          key={b.id}
          className="sx-floating-bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            opacity: b.opacity,
            "--duration": `${b.duration}s`,
            "--delay": `${b.delay}s`,
            "--drift": `${b.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
