"use client";

import { useId } from "react";

interface ConnectedTechnologyNetworkProps {
  inView?: boolean;
}

interface TechNode {
  id: string;
  concept: string;
  label: string;
  sub: string;
  icon: (uid: string) => React.ReactNode;
}

const TECH_NODES: TechNode[] = [
  {
    id: "cloud",
    concept: "Cloud",
    label: "Cloud",
    sub: "Architecture",
    icon: (uid: string) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-cloud-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" stroke={`url(#${uid}-cloud-grad)`} />
        <path d="M12 11v4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 13l2-2 2 2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "platform",
    concept: "Platform",
    label: "Platform",
    sub: "Ecosystems",
    icon: (uid: string) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-plat-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={`url(#${uid}-plat-grad)`} />
        <path d="M2 17l10 5 10-5" stroke="currentColor" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" />
      </svg>
    ),
  },
  {
    id: "development",
    concept: "Development / Code",
    label: "Development",
    sub: "Modern Code",
    icon: (uid: string) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-dev-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <polyline points="16 18 22 12 16 6" stroke={`url(#${uid}-dev-grad)`} />
        <polyline points="8 6 2 12 8 18" stroke="currentColor" />
        <line x1="14" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.75" />
      </svg>
    ),
  },
  {
    id: "security",
    concept: "Security",
    label: "Security",
    sub: "Zero-Trust",
    icon: (uid: string) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-sec-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={`url(#${uid}-sec-grad)`} />
        <circle cx="12" cy="11" r="1.75" fill="currentColor" />
        <path d="M12 12.75V15.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "database",
    concept: "Database",
    label: "Database",
    sub: "Distributed",
    icon: (uid: string) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-db-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke={`url(#${uid}-db-grad)`} />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="currentColor" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" />
      </svg>
    ),
  },
];

export function ConnectedTechnologyNetwork({ inView = true }: ConnectedTechnologyNetworkProps) {
  const uid = useId();

  // Coordinates matching the 5 columns above the 5 cards
  // Smooth wave curve crossing (100, 48) -> (300, 26) -> (500, 52) -> (700, 28) -> (900, 48)
  const curvePath =
    "M 100,48 C 180,14 220,12 300,26 C 380,40 420,68 500,52 C 580,36 620,14 700,28 C 780,42 820,66 900,48";

  return (
    <div
      className={`sx-tech-network-container ${inView ? "sx-in-view" : ""}`}
      aria-label="Connected Technology Ecosystem"
    >
      {/* Background connecting SVG curved track with traveling photon pulse */}
      <svg
        className="sx-tech-network-svg"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Main gradient for the continuous network line */}
          <linearGradient id={`${uid}-net-line`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>

          {/* Traveling energy beam gradient */}
          <linearGradient id={`${uid}-net-travel`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>

          {/* Soft ambient line glow */}
          <filter id={`${uid}-net-glow`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient back-glow line */}
        <path
          d={curvePath}
          fill="none"
          stroke="rgba(147, 197, 253, 0.45)"
          strokeWidth="5"
          filter={`url(#${uid}-net-glow)`}
        />

        {/* Core crisp connection line */}
        <path
          d={curvePath}
          fill="none"
          stroke={`url(#${uid}-net-line)`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Animated continuous traveling light packet 1 */}
        <path
          d={curvePath}
          fill="none"
          stroke={`url(#${uid}-net-travel)`}
          strokeWidth="2.8"
          strokeLinecap="round"
          className="sx-net-travel-packet sx-packet-1"
        />

        {/* Animated continuous traveling light packet 2 (offset) */}
        <path
          d={curvePath}
          fill="none"
          stroke={`url(#${uid}-net-travel)`}
          strokeWidth="2.4"
          strokeLinecap="round"
          className="sx-net-travel-packet sx-packet-2"
        />

        {/* Intermediate glowing connection points along the line */}
        <g className="sx-net-connection-points">
          {/* Point 1: between Node 0 and Node 1 */}
          <circle cx="200" cy="18" r="2.5" className="sx-net-node-dot" />
          <circle cx="200" cy="18" r="6" className="sx-net-dot-ring" />

          {/* Point 2: between Node 1 and Node 2 */}
          <circle cx="400" cy="46" r="2.5" className="sx-net-node-dot" />
          <circle cx="400" cy="46" r="6" className="sx-net-dot-ring" />

          {/* Point 3: between Node 2 and Node 3 */}
          <circle cx="600" cy="38" r="2.5" className="sx-net-node-dot" />
          <circle cx="600" cy="38" r="6" className="sx-net-dot-ring" />

          {/* Point 4: between Node 3 and Node 4 */}
          <circle cx="800" cy="44" r="2.5" className="sx-net-node-dot" />
          <circle cx="800" cy="44" r="6" className="sx-net-dot-ring" />
        </g>
      </svg>

      {/* Grid of the 5 Floating Circular Glass Nodes */}
      <div className="sx-tech-nodes-row" role="region" aria-label="Technology Concepts">
        {TECH_NODES.map((node, index) => {
          return (
            <div
              key={node.id}
              className={`sx-tech-node-item sx-tech-node-${index}`}
              title={`${node.concept} - Technology Consulting Concept`}
            >
              {/* Floating ambient motion container */}
              <div className="sx-tech-node-motion">
                {/* Circular Glass Node Disc */}
                <div className="sx-tech-node-glass">
                  {/* Subtle radiating beacon halo */}
                  <span className="sx-tech-node-halo" aria-hidden="true" />

                  {/* Circular glass disc with icon */}
                  <div className="sx-tech-node-disc">
                    <span className="sx-tech-node-icon" aria-hidden="true">
                      {node.icon(uid)}
                    </span>
                  </div>
                </div>

                {/* Elegant Glass Pill Label */}
                <div className="sx-tech-node-label-wrap">
                  <span className="sx-tech-node-label">{node.label}</span>
                  <span className="sx-tech-node-sub">{node.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        /* Container for Connected Technology Network */
        .sx-tech-network-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto 18px;
          padding: 0 clamp(20px, 3.5vw, 60px);
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sx-tech-network-container.sx-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* SVG Curved Network Line Layer */
        .sx-tech-network-svg {
          position: absolute;
          top: 8px;
          left: clamp(20px, 3.5vw, 60px);
          right: clamp(20px, 3.5vw, 60px);
          width: calc(100% - (clamp(20px, 3.5vw, 60px) * 2));
          height: 60px;
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }

        /* Continuous Traveling Light Packets */
        .sx-net-travel-packet {
          stroke-dasharray: 140 680;
          stroke-dashoffset: 820;
          will-change: stroke-dashoffset;
        }

        .sx-packet-1 {
          animation: sxNetTravelMove 8s linear infinite;
        }

        .sx-packet-2 {
          animation: sxNetTravelMove 8s linear infinite -4s;
          opacity: 0.85;
        }

        @keyframes sxNetTravelMove {
          0% {
            stroke-dashoffset: 820;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        /* Glowing Connection Points on Curve */
        .sx-net-node-dot {
          fill: #38bdf8;
          filter: drop-shadow(0 0 5px #38bdf8);
        }

        .sx-net-dot-ring {
          fill: none;
          stroke: #60a5fa;
          stroke-width: 1.2;
          opacity: 0.5;
          transform-origin: center;
          animation: sxNetRingPulse 3.2s ease-in-out infinite alternate;
        }

        @keyframes sxNetRingPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.35;
          }
          100% {
            transform: scale(1.35);
            opacity: 0.85;
          }
        }

        /* Nodes Row aligned with cards below */
        .sx-tech-nodes-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 1.8vw, 24px);
          width: 100%;
        }

        .sx-tech-node-item {
          flex: 1 1 0;
          min-width: 215px;
          max-width: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: default;
          user-select: none;
        }

        .sx-tech-node-motion {
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }

        /* Floating keyframes for each node */
        .sx-tech-node-0 .sx-tech-node-motion {
          animation: sxNodeFloat0 5.4s ease-in-out infinite alternate;
        }
        .sx-tech-node-1 .sx-tech-node-motion {
          animation: sxNodeFloat1 6.2s ease-in-out infinite alternate -1.8s;
        }
        .sx-tech-node-2 .sx-tech-node-motion {
          animation: sxNodeFloat2 5.0s ease-in-out infinite alternate -0.9s;
        }
        .sx-tech-node-3 .sx-tech-node-motion {
          animation: sxNodeFloat3 6.6s ease-in-out infinite alternate -2.5s;
        }
        .sx-tech-node-4 .sx-tech-node-motion {
          animation: sxNodeFloat4 5.8s ease-in-out infinite alternate -1.4s;
        }

        @keyframes sxNodeFloat0 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-5px); }
        }
        @keyframes sxNodeFloat1 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
        @keyframes sxNodeFloat2 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes sxNodeFloat3 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(5px); }
        }
        @keyframes sxNodeFloat4 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-4px); }
        }

        /* Circular Glass Node Disc */
        .sx-tech-node-glass {
          position: relative;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-tech-node-halo {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 72%);
          opacity: 0.65;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .sx-tech-node-disc {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(191, 219, 254, 0.9);
          box-shadow:
            0 8px 20px -4px rgba(37, 99, 235, 0.16),
            0 0 16px rgba(59, 130, 246, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-tech-node-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2));
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        /* Label and Sub-badge */
        .sx-tech-node-label-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 6px;
        }

        .sx-tech-node-label {
          font-family: var(--font-heading, inherit);
          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #1e3a8a;
          line-height: 1.2;
          transition: color 0.25s ease;
        }

        .sx-tech-node-sub {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #64748b;
          line-height: 1.2;
          margin-top: 2px;
        }

        /* Node Hover State */
        @media (hover: hover) and (pointer: fine) {
          .sx-tech-node-item:hover .sx-tech-node-disc {
            transform: scale(1.1);
            border-color: rgba(37, 99, 235, 0.85);
            background: rgba(255, 255, 255, 0.98);
            box-shadow:
              0 14px 28px -4px rgba(37, 99, 235, 0.28),
              0 0 24px rgba(59, 130, 246, 0.35),
              0 0 0 1.5px rgba(37, 99, 235, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 1);
            color: #1d4ed8;
          }

          .sx-tech-node-item:hover .sx-tech-node-halo {
            opacity: 1;
            transform: scale(1.25);
          }

          .sx-tech-node-item:hover .sx-tech-node-icon {
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
            transform: scale(1.08);
          }

          .sx-tech-node-item:hover .sx-tech-node-label {
            color: #2563eb;
          }
        }

        /* Tablet adaptation */
        @media (max-width: 1099px) and (min-width: 768px) {
          .sx-tech-nodes-row {
            gap: 8px;
          }
          .sx-tech-node-item {
            min-width: 0;
          }
          .sx-tech-node-disc {
            width: 42px;
            height: 42px;
          }
          .sx-tech-node-label {
            font-size: 10px;
          }
          .sx-tech-node-sub {
            display: none;
          }
        }

        /* Mobile adaptation (< 768px): clean compact horizontal row */
        @media (max-width: 767px) {
          .sx-tech-network-container {
            margin-bottom: 12px;
            padding: 0 16px;
          }
          .sx-tech-network-svg {
            display: none;
          }
          .sx-tech-nodes-row {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            overflow-x: auto;
            scrollbar-width: none;
            padding: 4px 0 8px;
          }
          .sx-tech-nodes-row::-webkit-scrollbar {
            display: none;
          }
          .sx-tech-node-item {
            min-width: 60px;
            max-width: 70px;
          }
          .sx-tech-node-disc {
            width: 40px;
            height: 40px;
          }
          .sx-tech-node-icon svg {
            width: 18px;
            height: 18px;
          }
          .sx-tech-node-label {
            font-size: 9.5px;
            letter-spacing: 0;
          }
          .sx-tech-node-sub {
            display: none;
          }
          .sx-tech-node-motion {
            animation: none !important;
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .sx-tech-node-motion,
          .sx-packet-1,
          .sx-packet-2,
          .sx-net-dot-ring {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ConnectedTechnologyNetwork;
