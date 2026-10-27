"use client";

import { C } from "../../lib/theme";
import { siteConfig } from "../../lib/site";

/** Infinite scrolling marquee strip between hero and services. */
export function ContactMarquee() {
  const items = [
    "Career Services",
    "✦",
    "Business Enablement",
    "✦",
    "Technology Consulting",
    "✦",
    "Let's talk",
    "✦",
  ];

  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <>
      <style>{`
        .sx-mq {
          overflow: hidden;
          white-space: nowrap;
          background: ${C.text};
          color: ${C.bg};
          padding: 18px 0;
        }
        .sx-mq-track {
          display: inline-flex;
          gap: 44px;
          animation: sx-mq-scroll 30s linear infinite;
          font: 300 clamp(28px, 4vw, 56px)/1.1 "Inter", system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        .sx-mq:hover .sx-mq-track {
          animation-play-state: paused;
        }
        .sx-mq-accent {
          color: ${C.blue};
        }
        @keyframes sx-mq-scroll {
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sx-mq-track { animation: none; }
        }
      `}</style>

      <div className="sx-mq" aria-hidden="true">
        <div className="sx-mq-track">
          {track.map((item, i) =>
            item === "✦" ? (
              <span key={i} className="sx-mq-accent">✦</span>
            ) : (
              <span key={i}>{item}</span>
            ),
          )}
        </div>
      </div>
    </>
  );
}
