"use client";

import { useId } from "react";

interface ConnectedCareerNetworkProps {
  inView?: boolean;
  activeNodeIdx?: number | null;
  onNodeClick?: (index: number) => void;
}

interface CareerNode {
  id: string;
  concept: string;
  label: string;
  sub: string;
  isCenter?: boolean;
  icon: (uid: string) => React.ReactNode;
}

const CAREER_NODES: CareerNode[] = [
  {
    id: "resume",
    concept: "Resume Audit",
    label: "Resume Audit",
    sub: "ATS & Structure",
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
          <linearGradient id={`${uid}-res-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={`url(#${uid}-res-grad)`} />
        <polyline points="14 2 14 8 20 8" stroke={`url(#${uid}-res-grad)`} />
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.6" />
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.6" />
        <line x1="10" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "profile",
    concept: "Profile Reach",
    label: "Profile Reach",
    sub: "LinkedIn Authority",
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
          <linearGradient id={`${uid}-prof-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={`url(#${uid}-prof-grad)`} />
        <circle cx="8.5" cy="7" r="4" stroke={`url(#${uid}-prof-grad)`} />
        <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="1.6" />
        <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "briefcase",
    concept: "Career Opportunities",
    label: "Career Network",
    sub: "Target Matching",
    isCenter: true,
    icon: (uid: string) => (
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-case-body`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id={`${uid}-case-clasp`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        {/* Main Briefcase Body */}
        <rect
          x="3"
          y="10"
          width="26"
          height="18"
          rx="3.5"
          fill={`url(#${uid}-case-body)`}
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="1.4"
          filter="drop-shadow(0 4px 8px rgba(30, 58, 138, 0.35))"
        />
        {/* Briefcase Flap Line */}
        <path
          d="M 3 17 L 13 20 L 19 20 L 29 17"
          fill="none"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.2"
        />
        {/* Handle */}
        <path
          d="M 11 10 V 6.5 C 11 5.12 12.12 4 13.5 4 H 18.5 C 19.88 4 21 5.12 21 6.5 V 10"
          fill="none"
          stroke={`url(#${uid}-case-body)`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 11 10 V 6.5 C 11 5.12 12.12 4 13.5 4 H 18.5 C 19.88 4 21 5.12 21 6.5 V 10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Center Metallic Clasp / Latch */}
        <rect
          x="14"
          y="18"
          width="4"
          height="4.5"
          rx="1"
          fill={`url(#${uid}-case-clasp)`}
          stroke="rgba(30, 58, 138, 0.6)"
          strokeWidth="0.8"
        />
        {/* Specular Glint */}
        <circle cx="7" cy="13" r="1.2" fill="#ffffff" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "application",
    concept: "Application Support",
    label: "Application Support",
    sub: "Tailored Pipelines",
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
          <linearGradient id={`${uid}-app-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <line x1="22" y1="2" x2="11" y2="13" stroke={`url(#${uid}-app-grad)`} />
        <polygon points="22 2 15 22 11 13 2 9 22 2" stroke={`url(#${uid}-app-grad)`} />
      </svg>
    ),
  },
  {
    id: "guidance",
    concept: "Career Guidance",
    label: "Career Guidance",
    sub: "Advisory & Growth",
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
          <linearGradient id={`${uid}-gui-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" stroke={`url(#${uid}-gui-grad)`} />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={`url(#${uid}-gui-grad)`} stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

export function ConnectedCareerNetwork({
  inView = true,
  activeNodeIdx = null,
  onNodeClick,
}: ConnectedCareerNetworkProps) {
  const uid = useId();

  // 5 Node X positions along the 1200px width (aligning above the 5 cards)
  const nodePositions = [120, 360, 600, 840, 1080];

  // SVG curved connecting line path
  const curvePath =
    "M 70,74 C 180,48 250,78 360,64 C 470,50 530,36 600,34 C 670,36 730,50 840,64 C 950,78 1020,48 1130,74";

  return (
    <div
      className={`sx-career-network-container ${inView ? "sx-active" : ""}`}
      aria-label="Connected career guidance ecosystem network"
      role="region"
    >
      <div className="sx-career-network-stage">
        {/* SVG Curved Network Line & Animated Traveling Pulses */}
        <svg
          viewBox="0 0 1200 135"
          className="sx-career-network-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Blue-Cyan Glow Gradient */}
            <linearGradient id={`${uid}-net-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.25)" />
              <stop offset="25%" stopColor="rgba(59, 130, 246, 0.75)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.95)" />
              <stop offset="75%" stopColor="rgba(59, 130, 246, 0.75)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.25)" />
            </linearGradient>

            {/* Traveling Light Pulse Gradient */}
            <linearGradient id={`${uid}-pulse-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Centerpiece Radial Glow */}
            <radialGradient id={`${uid}-center-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
              <stop offset="60%" stopColor="rgba(99, 102, 241, 0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ambient Center Glow behind briefcase node */}
          <circle cx="600" cy="34" r="58" fill={`url(#${uid}-center-glow)`} />

          {/* Background Ambient Glow Ribbon */}
          <path
            d={curvePath}
            fill="none"
            stroke={`url(#${uid}-net-grad)`}
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.35"
            filter="blur(3px)"
          />

          {/* Core Thin Curved SVG Connection Line */}
          <path
            d={curvePath}
            fill="none"
            stroke={`url(#${uid}-net-grad)`}
            strokeWidth="2"
            strokeLinecap="round"
            className="sx-career-core-line"
          />

          {/* Subtle Secondary Dashed Light Track */}
          <path
            d={curvePath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            strokeLinecap="round"
            className="sx-career-dash-line"
          />

          {/* Connection Anchor Points along the curved line */}
          {nodePositions.map((nx, i) => (
            <g key={i} className="sx-network-anchor">
              <circle
                cx={nx}
                cy={i === 2 ? 34 : i === 1 || i === 3 ? 64 : 74}
                r={i === 2 ? 6 : 4}
                fill="#ffffff"
                stroke="#3b82f6"
                strokeWidth="2"
                filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
              />
              <circle
                cx={nx}
                cy={i === 2 ? 34 : i === 1 || i === 3 ? 64 : 74}
                r={i === 2 ? 10 : 7}
                fill="none"
                stroke="rgba(147, 197, 253, 0.6)"
                strokeWidth="1"
                className="sx-anchor-pulse"
              />
            </g>
          ))}

          {/* Traveling Light Pulse 1 (Forward Flow) */}
          <circle r="4" fill="#ffffff" filter="drop-shadow(0 0 8px #60a5fa)">
            <animateMotion
              path={curvePath}
              dur="8s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </circle>

          {/* Traveling Light Pulse 2 (Staggered Forward Flow) */}
          <circle r="3.2" fill="#93c5fd" filter="drop-shadow(0 0 6px #ffffff)">
            <animateMotion
              path={curvePath}
              dur="8s"
              begin="-4s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </circle>
        </svg>

        {/* 5 Floating Career Nodes Positioned Directly Above The Cards */}
        <div className="sx-career-nodes-row">
          {CAREER_NODES.map((node, index) => {
            const isCenter = !!node.isCenter;
            return (
              <div
                key={node.id}
                className={`sx-career-node-wrapper sx-career-node-${index} ${isCenter ? "sx-career-center-node" : ""}`}
              >
                {/* Floating Clickable Node Glass Card */}
                <button
                  type="button"
                  className={`sx-career-glass-node ${isCenter ? "sx-glass-briefcase-node" : ""} ${activeNodeIdx === index ? "sx-node-active" : ""}`}
                  aria-label={`Scroll to ${node.concept}: ${node.label}`}
                  onClick={() => onNodeClick?.(index)}
                >
                  {/* Subtle inner radial glow */}
                  <div className="sx-node-inner-glow" aria-hidden="true" />

                  {/* Icon Circle */}
                  <div className={`sx-career-icon-stage ${isCenter ? "sx-briefcase-stage" : ""}`}>
                    {node.icon(uid)}
                  </div>

                  {/* Node Label Pill (Clean Typography) */}
                  <div className="sx-career-node-info">
                    <span className="sx-career-node-label">{node.label}</span>
                    <span className="sx-career-node-sub">{node.sub}</span>
                  </div>

                  {/* Glass rim specular reflection */}
                  <div className="sx-node-rim-gleam" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .sx-career-network-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          margin-bottom: clamp(16px, 2.5vw, 28px);
          padding: 0 clamp(20px, 3.5vw, 60px);
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sx-career-network-container.sx-active {
          opacity: 1;
          transform: translateY(0);
        }

        .sx-career-network-stage {
          position: relative;
          width: 100%;
          height: 125px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* SVG Curved Network Lines Overlay */
        .sx-career-network-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
          z-index: 1;
        }

        /* Animated Dashed Line Flow */
        .sx-career-dash-line {
          animation: sxDashFlow 24s linear infinite;
        }

        @keyframes sxDashFlow {
          from {
            stroke-dashoffset: 240;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Anchor point pulse rings */
        .sx-anchor-pulse {
          animation: sxAnchorPulse 2.8s ease-out infinite;
          transform-origin: center;
        }

        @keyframes sxAnchorPulse {
          0% {
            r: 5;
            opacity: 0.9;
          }
          70% {
            r: 13;
            opacity: 0;
          }
          100% {
            r: 13;
            opacity: 0;
          }
        }

        /* 5 Nodes Row */
        .sx-career-nodes-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .sx-career-node-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          padding: 0 6px;
        }

        /* Staggered Floating Keyframes for Career Nodes */
        .sx-career-node-0 {
          animation: sxNodeFloatA 5.4s ease-in-out infinite alternate;
        }
        .sx-career-node-1 {
          animation: sxNodeFloatB 6.2s ease-in-out infinite alternate -1.6s;
        }
        .sx-career-node-2 {
          animation: sxNodeFloatCenter 4.8s ease-in-out infinite alternate -0.8s;
        }
        .sx-career-node-3 {
          animation: sxNodeFloatB 6.6s ease-in-out infinite alternate -2.4s;
        }
        .sx-career-node-4 {
          animation: sxNodeFloatA 5.8s ease-in-out infinite alternate -1.2s;
        }

        @keyframes sxNodeFloatA {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes sxNodeFloatB {
          0% { transform: translateY(0px); }
          100% { transform: translateY(5px); }
        }
        @keyframes sxNodeFloatCenter {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-7px) scale(1.02); }
        }

        /* Glassmorphic Circular / Pill Node (Button) */
        .sx-career-glass-node {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px 8px 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(191, 219, 254, 0.85);
          box-shadow:
            0 10px 24px -6px rgba(15, 23, 42, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.9),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: pointer;
          user-select: none;
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          outline: none;
        }

        .sx-career-glass-node:hover {
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(59, 130, 246, 0.7);
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 18px 36px -8px rgba(37, 99, 235, 0.25),
            0 0 20px rgba(59, 130, 246, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .sx-career-glass-node:focus-visible {
          border-color: var(--sx-blue, #2563eb);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35), 0 10px 24px rgba(37, 99, 235, 0.2);
        }

        /* Active State for Selected Node */
        .sx-career-glass-node.sx-node-active {
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(37, 99, 235, 0.9);
          box-shadow:
            0 14px 30px -6px rgba(37, 99, 235, 0.3),
            0 0 20px rgba(59, 130, 246, 0.32),
            0 0 0 1.5px rgba(37, 99, 235, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          transform: translateY(-4px) scale(1.04);
        }

        .sx-career-glass-node.sx-node-active .sx-career-node-label {
          color: #1d4ed8;
          font-weight: 750;
        }

        .sx-career-glass-node.sx-node-active .sx-career-icon-stage {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-color: rgba(37, 99, 235, 0.7);
          transform: scale(1.08);
        }

        /* Centerpiece: Floating Briefcase Icon inside soft glass circle */
        .sx-glass-briefcase-node {
          padding: 10px 18px 10px 12px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(239, 246, 255, 0.92) 100%);
          border: 1.5px solid rgba(59, 130, 246, 0.55);
          box-shadow:
            0 14px 34px -6px rgba(37, 99, 235, 0.28),
            0 0 22px rgba(59, 130, 246, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.95),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .sx-glass-briefcase-node:hover {
          border-color: rgba(37, 99, 235, 0.9);
          box-shadow:
            0 20px 42px -6px rgba(37, 99, 235, 0.35),
            0 0 28px rgba(59, 130, 246, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* Icon Stage */
        .sx-career-icon-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0f7ff 0%, #e0effe 100%);
          border: 1px solid rgba(191, 219, 254, 0.85);
          color: #2563eb;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.12);
          transition: transform 0.3s ease;
        }

        .sx-briefcase-stage {
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 1.5px solid rgba(147, 197, 253, 0.9);
          box-shadow: 0 6px 14px rgba(37, 99, 235, 0.2);
        }

        .sx-career-glass-node:hover .sx-career-icon-stage {
          transform: rotate(6deg) scale(1.08);
        }

        .sx-briefcase-stage svg {
          filter: drop-shadow(0 2px 5px rgba(37, 99, 235, 0.25));
        }

        /* Typography inside nodes */
        .sx-career-node-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .sx-career-node-label {
          font-family: var(--font-heading, inherit);
          font-size: 11.5px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .sx-glass-briefcase-node .sx-career-node-label {
          font-size: 12.5px;
          color: #1d4ed8;
        }

        .sx-career-node-sub {
          font-size: 9.5px;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        /* Specular rim gleam */
        .sx-node-rim-gleam {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 55%);
          pointer-events: none;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1099px) and (min-width: 768px) {
          .sx-career-network-container {
            margin-bottom: 20px;
          }
          .sx-career-network-stage {
            height: 105px;
          }
          .sx-career-glass-node {
            padding: 6px 10px 6px 8px;
            gap: 7px;
          }
          .sx-career-icon-stage {
            width: 32px;
            height: 32px;
          }
          .sx-briefcase-stage {
            width: 38px;
            height: 38px;
          }
          .sx-career-node-label {
            font-size: 10.5px;
          }
          .sx-career-node-sub {
            font-size: 8.5px;
          }
        }

        @media (max-width: 767px) {
          .sx-career-network-container {
            padding: 0 16px;
            margin-bottom: 12px;
          }
          .sx-career-network-stage {
            height: auto;
            min-height: 52px;
          }
          .sx-career-network-svg {
            display: none;
          }
          .sx-career-nodes-row {
            display: flex;
            justify-content: flex-start;
            overflow-x: auto;
            gap: 8px;
            padding: 4px 4px 10px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .sx-career-nodes-row::-webkit-scrollbar {
            display: none;
          }
          .sx-career-node-wrapper {
            flex: 0 0 auto;
            padding: 0;
            animation: none !important;
          }
          .sx-career-glass-node {
            padding: 6px 12px 6px 8px;
            gap: 6px;
          }
          .sx-career-icon-stage {
            width: 28px;
            height: 28px;
          }
          .sx-briefcase-stage {
            width: 32px;
            height: 32px;
          }
          .sx-career-node-label {
            font-size: 11px;
          }
          .sx-career-node-sub {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-career-node-0,
          .sx-career-node-1,
          .sx-career-node-2,
          .sx-career-node-3,
          .sx-career-node-4,
          .sx-career-dash-line,
          .sx-anchor-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
