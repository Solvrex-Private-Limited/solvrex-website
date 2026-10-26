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

// Varied, prominent bubble sizes (32px to 108px) distributed across the entire viewport
const BUBBLE_LIST: BubbleConfig[] = [
  // Upper viewport on initial render (negative delays around 60%-90% of duration)
  { id: 1, size: 52, left: 4, duration: 18, delay: -15, drift: 28, opacity: 0.78 },
  { id: 2, size: 88, left: 12, duration: 22, delay: -18, drift: -32, opacity: 0.82 },
  { id: 3, size: 38, left: 22, duration: 15, delay: -12, drift: 22, opacity: 0.72 },
  { id: 4, size: 102, left: 33, duration: 24, delay: -20, drift: -26, opacity: 0.85 },
  { id: 5, size: 60, left: 45, duration: 17, delay: -14, drift: 30, opacity: 0.8 },
  { id: 6, size: 94, left: 58, duration: 21, delay: -17, drift: -24, opacity: 0.84 },
  { id: 7, size: 44, left: 70, duration: 16, delay: -13, drift: 20, opacity: 0.74 },
  { id: 8, size: 108, left: 82, duration: 23, delay: -19, drift: -30, opacity: 0.85 },
  { id: 9, size: 56, left: 93, duration: 18, delay: -15, drift: 25, opacity: 0.78 },

  // Mid viewport on initial render (negative delays around 35%-60% of duration)
  { id: 10, size: 78, left: 8, duration: 20, delay: -9, drift: -28, opacity: 0.82 },
  { id: 11, size: 36, left: 18, duration: 14, delay: -6, drift: 18, opacity: 0.7 },
  { id: 12, size: 92, left: 28, duration: 22, delay: -10, drift: 32, opacity: 0.84 },
  { id: 13, size: 64, left: 39, duration: 19, delay: -8, drift: -22, opacity: 0.78 },
  { id: 14, size: 98, left: 51, duration: 23, delay: -11, drift: 28, opacity: 0.85 },
  { id: 15, size: 42, left: 63, duration: 15, delay: -7, drift: -20, opacity: 0.72 },
  { id: 16, size: 84, left: 75, duration: 21, delay: -10, drift: 24, opacity: 0.82 },
  { id: 17, size: 70, left: 88, duration: 19, delay: -9, drift: -26, opacity: 0.8 },

  // Lower viewport / rising continuously from base (negative delays around 5%-30% of duration)
  { id: 18, size: 58, left: 3, duration: 17, delay: -3, drift: 22, opacity: 0.76 },
  { id: 19, size: 96, left: 15, duration: 22, delay: -4, drift: -30, opacity: 0.84 },
  { id: 20, size: 48, left: 25, duration: 16, delay: -2, drift: 24, opacity: 0.74 },
  { id: 21, size: 106, left: 42, duration: 24, delay: -5, drift: -28, opacity: 0.86 },
  { id: 22, size: 62, left: 54, duration: 18, delay: -3, drift: 26, opacity: 0.78 },
  { id: 23, size: 86, left: 67, duration: 20, delay: -4, drift: -24, opacity: 0.82 },
  { id: 24, size: 44, left: 80, duration: 15, delay: -2, drift: 20, opacity: 0.72 },
  { id: 25, size: 76, left: 91, duration: 21, delay: -5, drift: -26, opacity: 0.8 },
  { id: 26, size: 34, left: 48, duration: 13, delay: -1, drift: 16, opacity: 0.68 },
];

export function FloatingBubbles() {
  return (
    <div className="sx-floating-bubbles" aria-hidden="true">
      {BUBBLE_LIST.map((b) => (
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
