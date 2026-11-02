"use client";

import { useState, useEffect, useRef, useId, type MouseEvent } from "react";
import { C } from "../lib/theme";
import type { Service } from "../data/services";
import { DigitalWaveCanvas } from "./DigitalWaveCanvas";

export interface OutcomeCardData {
  number: string;
  badge: string;
  backBadge: string;
  heading: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export const OUTCOME_CARDS: OutcomeCardData[] = [
  {
    number: "01",
    badge: "Expected Impact",
    backBadge: "Deliverable Blueprint",
    heading: "Functional, professional online presence",
    subtitle: "Custom-crafted web architecture & search presence.",
    description:
      "Custom-crafted, accessible web architecture with search presence that represents your brand at its best.",
    highlights: ["Custom Web Architecture", "Local SEO & OpenGraph", "Core Web Vitals Tuning"],
  },
  {
    number: "02",
    badge: "Expected Impact",
    backBadge: "Operational Velocity",
    heading: "Improved operational efficiency",
    subtitle: "Eliminating friction & redundant inquiry handoffs.",
    description:
      "Fewer manual handoffs and clearer inquiry flow, saving team hours each week.",
    highlights: ["Friction Elimination", "Automated Pipelines", "Hours Saved Weekly"],
  },
  {
    number: "03",
    badge: "Expected Impact",
    backBadge: "Systems Optimization",
    heading: "Better use of existing tools and systems",
    subtitle: "Maximizing platform ROI without vendor churn.",
    description:
      "Maximized return on current software, email services, and analytics without unnecessary platform churn.",
    highlights: ["Zero Unnecessary Churn", "Software Optimization", "High ROI Utilization"],
  },
];

export const OUTCOMES_BY_SLUG: Record<string, OutcomeCardData[]> = {
  "business-enablement": OUTCOME_CARDS,
  "technology-consulting": [
    {
      number: "01",
      badge: "Expected Impact",
      backBadge: "Strategic Advisory",
      heading: "Informed Technology Decisions",
      subtitle:
        "Evidence-based evaluation of platforms, architecture, and technical trade-offs to support confident business decisions.",
      description:
        "Evidence-based evaluation of platforms, architecture, and technical trade-offs to support confident business decisions.",
      highlights: ["Platform Evaluation", "Architecture Trade-offs", "Confident Decisions"],
    },
    {
      number: "02",
      badge: "Expected Impact",
      backBadge: "Risk De-escalation",
      heading: "Reduced Implementation Risk",
      subtitle:
        "Early risk identification, technical validation, and structured migration planning to minimize implementation challenges.",
      description:
        "Early risk identification, technical validation, and structured migration planning to minimize implementation challenges.",
      highlights: ["Early Risk Identification", "Technical Validation", "Migration Planning"],
    },
    {
      number: "03",
      badge: "Expected Impact",
      backBadge: "Architecture Roadmap",
      heading: "Clearer Technical Direction",
      subtitle:
        "A practical technology roadmap aligned with business priorities, scalability requirements, and long-term objectives.",
      description:
        "A practical technology roadmap aligned with business priorities, scalability requirements, and long-term objectives.",
      highlights: ["Practical Roadmap", "Business Priorities", "Scalability Alignment"],
    },
  ],
  "career-services": [
    {
      number: "01",
      badge: "Expected Impact",
      backBadge: "Executive Positioning",
      heading: "Stronger Professional Positioning",
      subtitle:
        "A compelling professional profile tailored to target roles and employer expectations.",
      description:
        "A compelling professional profile tailored to target roles and employer expectations.",
      highlights: ["Target Role Alignment", "Employer Expectations", "Compelling Narrative"],
    },
    {
      number: "02",
      badge: "Expected Impact",
      backBadge: "Strategic Roadmapping",
      heading: "Clearer Career Direction",
      subtitle:
        "A focused career roadmap with target companies, suitable opportunities, and realistic salary expectations.",
      description:
        "A focused career roadmap with target companies, suitable opportunities, and realistic salary expectations.",
      highlights: ["Target Companies", "Opportunity Matching", "Salary Expectations"],
    },
    {
      number: "03",
      badge: "Expected Impact",
      backBadge: "Conversion Optimization",
      heading: "Improved Application Materials",
      subtitle:
        "An ATS-friendly resume and recruiter-ready LinkedIn profile designed to improve application quality.",
      description:
        "An ATS-friendly resume and recruiter-ready LinkedIn profile designed to improve application quality.",
      highlights: ["ATS-Friendly Resume", "Recruiter-Ready LinkedIn", "Application Quality"],
    },
  ],
};

/* =========================================================================
   3D DECORATIVE OBJECTS (Vector SVG with Rich Depth & Lighting)
   ========================================================================= */

// Card 01: Glass Globe with Meridian Lines & Ambient Glow
function GlassGlobeObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <radialGradient id={`${uid}-globe-base`} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#93c5fd" />
            <stop offset="45%" stopColor="#3b82f6" />
            <stop offset="80%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          <radialGradient id={`${uid}-globe-rim`} cx="85%" cy="85%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-ring-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.2)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.26)" filter="url(#sx-flip-blur-md)" />

        {/* Outer Ring Back Arc */}
        <g transform="translate(50, 48) rotate(-24)">
          <path
            d="M -36 0 A 36 12 0 0 1 36 0"
            fill="none"
            stroke={`url(#${uid}-ring-glass)`}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>

        {/* Glass Globe Sphere */}
        <g transform="translate(50, 46)">
          <circle cx="0" cy="0" r="23" fill={`url(#${uid}-globe-base)`} />
          <circle cx="0" cy="0" r="23" fill={`url(#${uid}-globe-rim)`} />

          {/* Meridian and Latitude Lines on Globe */}
          <ellipse cx="0" cy="0" rx="23" ry="11" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="11" ry="23" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          <line x1="-23" y1="0" x2="23" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
          <line x1="0" y1="-23" x2="0" y2="23" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />

          {/* Specular White Gleam */}
          <ellipse cx="-7" cy="-7" rx="7" ry="4" transform="rotate(-30 -7 -7)" fill="#ffffff" opacity="0.85" />
          <circle cx="-3" cy="-4" r="1.8" fill="#ffffff" />
        </g>

        {/* Outer Ring Front Arc */}
        <g transform="translate(50, 48) rotate(-24)">
          <path
            d="M 36 0 A 36 12 0 0 1 -36 0"
            fill="none"
            stroke={`url(#${uid}-ring-glass)`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 34 1 A 34 11 0 0 1 -34 1"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="3" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Card 02: Blue 3D Gear with Extruded Facets & Specular Sheen
function Blue3DGearObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <linearGradient id={`${uid}-gear-face`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="30%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id={`${uid}-gear-depth`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id={`${uid}-hub`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.2)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.25)" filter="url(#sx-flip-blur-md)" />

        {/* 3D Extruded Gear Depth Layer (Shifted Down & Right) */}
        <g transform="translate(50, 52) rotate(14) scale(1, 0.72)">
          <path
            d="M -7 -28 L 7 -28 L 10 -21 L 21 -21 L 28 -7 L 28 7 L 21 10 L 21 21 L 7 28 L -7 28 L -10 21 L -21 21 L -28 7 L -28 -7 L -21 -10 L -21 -21 Z"
            fill={`url(#${uid}-gear-depth)`}
            stroke="rgba(30, 58, 138, 0.8)"
            strokeWidth="1.5"
          />
        </g>

        {/* 3D Gear Front Face */}
        <g transform="translate(50, 46) rotate(14) scale(1, 0.72)">
          <path
            d="M -7 -28 L 7 -28 L 10 -21 L 21 -21 L 28 -7 L 28 7 L 21 10 L 21 21 L 7 28 L -7 28 L -10 21 L -21 21 L -28 7 L -28 -7 L -21 -10 L -21 -21 Z"
            fill={`url(#${uid}-gear-face)`}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Inner Bore Hole */}
          <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="10" fill={`url(#${uid}-hub)`} />

          {/* Specular Bevel Ridge */}
          <path
            d="M -7 -28 L 7 -28 L 10 -21 L 21 -21 L 28 -7"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="-7" cy="-28" r="1.6" fill="#ffffff" />
          <circle cx="7" cy="-28" r="1.6" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Card 03: Layered Translucent Glass Cubes Stack with Specular Edges
function LayeredGlassCubesObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <linearGradient id={`${uid}-cube-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-left`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-right`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-purple`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.2)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.25)" filter="url(#sx-flip-blur-md)" />

        {/* Base Layer Large Glass Cube */}
        <g transform="translate(50, 56)">
          <polygon points="0,-16 22,-5 0,6 -22,-5" fill={`url(#${uid}-cube-top)`} stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.3" />
          <polygon points="-22,-5 0,6 0,26 -22,15" fill={`url(#${uid}-cube-left)`} stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.1" />
          <polygon points="0,6 22,-5 22,15 0,26" fill={`url(#${uid}-cube-right)`} stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.1" />
        </g>

        {/* Upper Layer Angled Small Glass Cube */}
        <g transform="translate(48, 30) rotate(-16) scale(0.72)">
          <polygon points="0,-16 22,-5 0,6 -22,-5" fill={`url(#${uid}-cube-top)`} stroke="rgba(255, 255, 255, 0.98)" strokeWidth="1.5" />
          <polygon points="-22,-5 0,6 0,26 -22,15" fill={`url(#${uid}-cube-purple)`} stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
          <polygon points="0,6 22,-5 22,15 0,26" fill={`url(#${uid}-cube-right)`} stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" />
          {/* Specular apex glint */}
          <circle cx="0" cy="-16" r="2.2" fill="#ffffff" />
          <circle cx="22" cy="-5" r="1.6" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Career Services Card 01: Premium Glossy Blue 3D Professional Profile / Identity Document Icon
function CareerProfileDocumentObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <linearGradient id={`${uid}-doc-card`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="30%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id={`${uid}-badge-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.2)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.26)" filter="url(#sx-flip-blur-md)" />

        {/* 3D Angled Credential Card Layer */}
        <g transform="translate(50, 46) rotate(-8)">
          {/* Card Back Depth Shadow */}
          <rect
            x="-24"
            y="-30"
            width="48"
            height="58"
            rx="7"
            fill="#1e3a8a"
            transform="translate(2, 4)"
            opacity="0.6"
          />

          {/* Main ID Card Surface */}
          <rect
            x="-24"
            y="-30"
            width="48"
            height="58"
            rx="7"
            fill={`url(#${uid}-doc-card)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.6"
            filter="drop-shadow(0 8px 18px rgba(30, 58, 138, 0.35))"
          />

          {/* Top Lanyard / Badge Slot */}
          <rect x="-8" y="-27" width="16" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />

          {/* User Avatar Circle */}
          <circle cx="0" cy="-12" r="10" fill={`url(#${uid}-badge-grad)`} stroke="#ffffff" strokeWidth="1.2" />
          {/* User Avatar Silhouette */}
          <circle cx="0" cy="-14" r="3.5" fill="#1d4ed8" />
          <path d="M -6 -5 C -6 -9 6 -9 6 -5 Z" fill="#1d4ed8" />

          {/* Credential Data Bars */}
          <rect x="-16" y="3" width="32" height="3.5" rx="1.8" fill="#ffffff" opacity="0.95" />
          <rect x="-16" y="9.5" width="22" height="2.5" rx="1.2" fill="rgba(255, 255, 255, 0.8)" />
          <rect x="-16" y="15" width="26" height="2.5" rx="1.2" fill="rgba(255, 255, 255, 0.65)" />

          {/* Specular Glint Streak across card */}
          <path
            d="M -20 -15 L 18 -27"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="-24" r="1.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Career Services Card 02: Premium Glossy Blue 3D Compass Icon (Direction & Navigation)
function CareerCompass3DObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <radialGradient id={`${uid}-compass-rim`} cx="32%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          <radialGradient id={`${uid}-dial-face`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id={`${uid}-needle-n`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id={`${uid}-needle-s`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id={`${uid}-ring-tilt`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.22)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.3)" filter="url(#sx-flip-blur-md)" />

        {/* Tilted Outer Glass Orbit Ring */}
        <g transform="translate(50, 46) rotate(-22)">
          <ellipse
            cx="0"
            cy="0"
            rx="34"
            ry="11"
            fill="none"
            stroke={`url(#${uid}-ring-tilt)`}
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
        </g>

        {/* 3D Compass Housing */}
        <g transform="translate(50, 46)">
          {/* Beveled 3D Outer Rim */}
          <circle
            cx="0"
            cy="0"
            r="26"
            fill={`url(#${uid}-compass-rim)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.8"
            filter="drop-shadow(0 10px 22px rgba(30, 58, 138, 0.4))"
          />

          {/* Inner Compass Dial Face */}
          <circle cx="0" cy="0" r="19" fill={`url(#${uid}-dial-face)`} stroke="rgba(147, 197, 253, 0.5)" strokeWidth="1" />

          {/* Cardinal Axis Markers */}
          <line x1="0" y1="-17" x2="0" y2="-13" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="13" x2="0" y2="17" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-17" y1="0" x2="-13" y2="0" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="13" y1="0" x2="17" y2="0" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Compass Needle (Tilted pointing to North-East) */}
          <g transform="rotate(32)">
            {/* North Point (Cyan / Electric Blue) */}
            <polygon points="0,-16 4,0 0,2" fill={`url(#${uid}-needle-n)`} />
            <polygon points="0,-16 -4,0 0,2" fill="#ffffff" opacity="0.9" />

            {/* South Point (Silver / Slate) */}
            <polygon points="0,16 4,0 0,-2" fill={`url(#${uid}-needle-s)`} />
            <polygon points="0,16 -4,0 0,-2" fill="#cbd5e1" />
          </g>

          {/* Center Pivot Jewel */}
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" filter="drop-shadow(0 0 4px #93c5fd)" />
          <circle cx="-1" cy="-1" r="1" fill="#ffffff" />

          {/* Specular Glint on Glass Bezel */}
          <path
            d="M -16 -16 A 22 22 0 0 1 12 -18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}

// Career Services Card 03: Premium Glossy Blue 3D Resume/Document with Verification Checkmark
function CareerResumeCheckObject() {
  const uid = useId();
  return (
    <div className="sx-outcome-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sx-outcome-3d-svg">
        <defs>
          <linearGradient id={`${uid}-doc-sheet`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          <linearGradient id={`${uid}-fold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <radialGradient id={`${uid}-badge-check`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="50" cy="88" rx="30" ry="6" fill="rgba(37, 99, 235, 0.2)" filter="url(#sx-flip-blur-sm)" />

        {/* Ambient blue back-glow */}
        <circle cx="50" cy="46" r="28" fill="rgba(59, 130, 246, 0.26)" filter="url(#sx-flip-blur-md)" />

        {/* 3D Tilted Resume Document */}
        <g transform="translate(46, 44) rotate(-6)">
          {/* Card Back Depth Shadow */}
          <polygon
            points="-22,-28 14,-28 22,-20 22,28 -22,28"
            fill="#1e3a8a"
            transform="translate(2, 4)"
            opacity="0.5"
          />

          {/* Main Resume Sheet with folded corner */}
          <polygon
            points="-22,-28 14,-28 22,-20 22,28 -22,28"
            fill={`url(#${uid}-doc-sheet)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.5"
            filter="drop-shadow(0 8px 18px rgba(30, 58, 138, 0.3))"
          />

          {/* Folded Top-Right Corner */}
          <polygon
            points="14,-28 14,-20 22,-20"
            fill={`url(#${uid}-fold)`}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1"
          />

          {/* Header Line (Name/Role) */}
          <rect x="-16" y="-21" width="18" height="4" rx="2" fill="#2563eb" />

          {/* Resume Body Text Lines */}
          <rect x="-16" y="-12" width="30" height="2.5" rx="1.2" fill="#60a5fa" opacity="0.8" />
          <rect x="-16" y="-6" width="26" height="2.5" rx="1.2" fill="#93c5fd" />
          <rect x="-16" y="0" width="30" height="2.5" rx="1.2" fill="#93c5fd" />
          <rect x="-16" y="6" width="18" height="2.5" rx="1.2" fill="#93c5fd" />
          <rect x="-16" y="12" width="24" height="2.5" rx="1.2" fill="#cbd5e1" />
          <rect x="-16" y="18" width="20" height="2.5" rx="1.2" fill="#cbd5e1" />

          {/* Specular White Line */}
          <line x1="-18" y1="-26" x2="10" y2="-26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Verification Checkmark Badge (Anchored at Bottom-Right of Document) */}
        <g transform="translate(64, 58)">
          {/* Badge Outer Shadow & Glow */}
          <circle cx="0" cy="0" r="13" fill={`url(#${uid}-badge-check)`} stroke="#ffffff" strokeWidth="1.8" filter="drop-shadow(0 4px 10px rgba(37, 99, 235, 0.45))" />
          {/* Inner Accent Ring */}
          <circle cx="0" cy="0" r="10.5" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />

          {/* Crisp Verification Checkmark */}
          <polyline
            points="-4.5,0.5 -1.5,3.5 5,-3.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))"
          />
          {/* Specular highlight */}
          <circle cx="-4" cy="-5" r="1.5" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function Outcome3DObject({ index, slug }: { index: number; slug?: string }) {
  if (slug === "career-services") {
    switch (index) {
      case 0:
        return <CareerProfileDocumentObject />;
      case 1:
        return <CareerCompass3DObject />;
      case 2:
        return <CareerResumeCheckObject />;
      default:
        return <CareerProfileDocumentObject />;
    }
  }

  switch (index) {
    case 0:
      return <GlassGlobeObject />;
    case 1:
      return <Blue3DGearObject />;
    case 2:
      return <LayeredGlassCubesObject />;
    default:
      return <GlassGlobeObject />;
  }
}

/* =========================================================================
   INDIVIDUAL 3D FLIP CARD COMPONENT (Coin-like Double-Sided Rotation)
   ========================================================================= */

function FlipCardItem({
  item,
  index,
  isFlipped,
  slug,
  onFlip,
}: {
  item: OutcomeCardData;
  index: number;
  isFlipped: boolean;
  slug?: string;
  onFlip: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt tracking for the card wrapper
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--sx-tilt-x", (y * -10).toFixed(2) + "deg");
    card.style.setProperty("--sx-tilt-y", (x * 12).toFixed(2) + "deg");
    card.style.setProperty("--sx-spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--sx-spot-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--sx-tilt-x", "0deg");
    card.style.setProperty("--sx-tilt-y", "0deg");
  };

  return (
    <div
      ref={cardRef}
      className={`sx-flip-card-wrapper sx-flip-item-${index} ${isFlipped ? "is-flipped-parent" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 140}ms` }}
    >
      <div
        className={`sx-flip-card-inner ${isFlipped ? "is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={`${item.heading}. ${isFlipped ? "Back side showing. Click to return to front." : "Front side showing. Click to flip for full details."}`}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFlip();
          }
        }}
      >
        {/* =========================================================
            FRONT FACE (rotateY: 0deg)
            ========================================================= */}
        <div
          className={`sx-flip-card-face sx-flip-card-front ${index === 1 ? "sx-middle-highlight" : ""}`}
          aria-hidden={isFlipped}
        >
          {/* Frosted Border Glow & Spotlight */}
          <div className="sx-face-spotlight" aria-hidden="true" />
          <div className="sx-face-border-glow" aria-hidden="true" />

          {/* Holographic Scanning Light Sweep on Hover */}
          <div className="sx-card-scan-line" aria-hidden="true" />

          {/* Top Bar: Card Number, Key Deliverable Badge & 3D Object */}
          <div className="sx-face-top">
            <div className="sx-face-top-left">
              <span className="sx-face-number">{item.number}</span>
              <div className="sx-face-badge">
                <span className="sx-badge-check" aria-hidden="true">✓</span>
                <span className="sx-badge-text">{item.badge}</span>
              </div>
            </div>

            <div className="sx-face-top-right">
              <Outcome3DObject index={index} slug={slug} />
            </div>
          </div>

          {/* Center Content: Bold Heading & Subtitle */}
          <div className="sx-face-body">
            <h3 className="sx-face-title">{item.heading}</h3>
            <p className="sx-face-subtitle">{item.subtitle}</p>
          </div>

          {/* Bottom Action: Circular Flip Button & Hint */}
          <div className="sx-face-bottom">
            <div className="sx-flip-hint">
              <span className="sx-hint-text">Click to flip</span>
              <span className="sx-hint-dots" aria-hidden="true">• • •</span>
            </div>

            <div className="sx-flip-btn" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK FACE (rotateY: 180deg)
            ========================================================= */}
        <div className="sx-flip-card-face sx-flip-card-back" aria-hidden={!isFlipped}>
          <div className="sx-face-spotlight" aria-hidden="true" />
          <div className="sx-face-border-glow" aria-hidden="true" />

          {/* Holographic Scanning Light Sweep on Hover */}
          <div className="sx-card-scan-line" aria-hidden="true" />

          {/* Top Bar: Same Card Number & 3D Object */}
          <div className="sx-face-top">
            <div className="sx-face-top-left">
              <span className="sx-face-number sx-back-number">{item.number}</span>
              <div className="sx-face-badge sx-back-badge">
                <span className="sx-badge-check" aria-hidden="true">✓</span>
                <span className="sx-badge-text">{item.backBadge}</span>
              </div>
            </div>

            <div className="sx-face-top-right">
              <Outcome3DObject index={index} slug={slug} />
            </div>
          </div>

          {/* Center Content: Full Detailed Description & Feature Chips */}
          <div className="sx-face-body">
            <h4 className="sx-back-title">{item.heading}</h4>
            <p className="sx-back-description">{item.description}</p>

            <div className="sx-back-chips">
              {item.highlights.map((h, hIdx) => (
                <span key={hIdx} className="sx-back-chip">
                  <span className="sx-chip-dot" aria-hidden="true" />
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action: Circular Reverse Arrow & Return Hint */}
          <div className="sx-face-bottom">
            <div className="sx-flip-hint">
              <span className="sx-hint-text">Click to return</span>
              <span className="sx-hint-dots" aria-hidden="true">• • •</span>
            </div>

            <div className="sx-flip-btn sx-flip-btn-back" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38L-2.44 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN BUSINESS OUTCOME FLIP CARDS CONTAINER
   ========================================================================= */

export function BusinessOutcomeFlipCards({ service }: { service?: Service } = {}) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const slug = service?.slug ?? "business-enablement";
  const outcomeCards = OUTCOMES_BY_SLUG[slug] ?? OUTCOMES_BY_SLUG["business-enablement"];

  // IntersectionObserver for entrance reveal
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Independent flip handler for each card
  const handleToggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      ref={containerRef}
      className={`sx-flip-outcomes-container ${inView ? "sx-flip-in-view" : ""}`}
      aria-label="Expected Outcomes 3D Flip Cards"
    >
      {/* Global SVG Filters for soft shadow and blur */}
      <svg className="sx-svg-flip-filters" aria-hidden="true">
        <defs>
          <filter id="sx-flip-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
          <filter id="sx-flip-blur-md" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>
        </defs>
      </svg>

      {/* Background Ambience: Lavender Gradient, Digital Wave, Curved Light Trails, Light Spots */}
      <div className="sx-flip-bg-decorations" aria-hidden="true">
        <div className="sx-flip-ambient-glow" />
        <div className="sx-flip-diagonal-lines" />

        {/* Subtle animated digital wave mesh below the cards */}
        <DigitalWaveCanvas inView={inView} />

        {/* Curved glowing SVG light trails in background */}
        <svg className="sx-flip-light-trails" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-trail-1`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-trail-2`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
              <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <filter id={`${uid}-trail-glow`} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M -50,230 C 250,110 460,330 760,170 C 960,80 1150,270 1250,210"
            fill="none"
            stroke={`url(#${uid}-trail-1)`}
            strokeWidth="2.4"
            strokeDasharray="180 520"
            filter={`url(#${uid}-trail-glow)`}
            className="sx-outcomes-trail-1"
          />
          <path
            d="M -50,150 C 220,290 510,70 810,250 C 1010,350 1150,130 1250,170"
            fill="none"
            stroke={`url(#${uid}-trail-2)`}
            strokeWidth="1.8"
            strokeDasharray="140 600"
            className="sx-outcomes-trail-2"
          />

          {/* Glowing Connection Nodes along Trails */}
          <circle cx="260" cy="175" r="4" fill="#ffffff" filter={`url(#${uid}-trail-glow)`} />
          <circle cx="260" cy="175" r="8" fill="none" stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1" className="sx-trail-pulse-node" />

          <circle cx="600" cy="245" r="5" fill="#ffffff" filter={`url(#${uid}-trail-glow)`} />
          <circle cx="600" cy="245" r="10" fill="none" stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1" className="sx-trail-pulse-node" />

          <circle cx="940" cy="170" r="4" fill="#ffffff" filter={`url(#${uid}-trail-glow)`} />
          <circle cx="940" cy="170" r="8" fill="none" stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1" className="sx-trail-pulse-node" />

          {/* Traveling Photon Pulses */}
          <circle r="3.5" fill="#ffffff" filter="drop-shadow(0 0 6px #60a5fa)">
            <animateMotion
              path="M -50,230 C 250,110 460,330 760,170 C 960,80 1150,270 1250,210"
              dur="11s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#93c5fd" filter="drop-shadow(0 0 6px #ffffff)">
            <animateMotion
              path="M -50,150 C 220,290 510,70 810,250 C 1010,350 1150,130 1250,170"
              dur="13s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Soft glowing bokeh circles */}
        <div className="sx-flip-bokeh sx-flip-bokeh-left" />
        <div className="sx-flip-bokeh sx-flip-bokeh-right" />
        <div className="sx-flip-bokeh sx-flip-bokeh-center" />
      </div>

      {/* Grid of Three 3D Flip Cards */}
      <div className="sx-flip-cards-grid">
        {outcomeCards.map((item, index) => (
          <FlipCardItem
            key={item.number}
            item={item}
            index={index}
            slug={slug}
            isFlipped={Boolean(flippedCards[index])}
            onFlip={() => handleToggleFlip(index)}
          />
        ))}
      </div>

      {/* Scoped CSS Styles for 3D Flipping & Responsive Rules */}
      <style>{`
        .sx-svg-flip-filters {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        /* Section Intro Typography Enhancement */
        .sx-service-outcomes-section .sx-section-kicker {
          letter-spacing: 0.08em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .sx-service-outcomes-section .sx-service-section-title {
          letter-spacing: -0.03em;
          font-weight: 750;
        }

        .sx-service-outcomes-section .sx-section-sub {
          font-size: 15.5px;
          line-height: 1.55;
          max-width: 680px;
        }

        /* Container Section */
        .sx-flip-outcomes-container {
          position: relative;
          padding: 38px 0 32px;
          margin-top: 14px;
          border-radius: 28px;
          background: linear-gradient(180deg, #f8fafc 0%, #f0f4ff 50%, #f8fafc 100%);
          border: 1px solid rgba(226, 232, 240, 0.9);
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }

        /* Background Decorations */
        .sx-flip-bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .sx-flip-ambient-glow {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 780px;
          height: 340px;
          background: radial-gradient(
            ellipse,
            rgba(59, 130, 246, 0.16) 0%,
            rgba(99, 102, 241, 0.06) 40%,
            transparent 70%
          );
          filter: blur(40px);
        }

        .sx-flip-diagonal-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.65) 0px,
            rgba(255, 255, 255, 0.65) 1.5px,
            transparent 1.5px,
            transparent 40px
          );
          mask-image: radial-gradient(ellipse at 50% 50%, black 45%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 45%, transparent 80%);
          opacity: 0.65;
        }

        /* Glowing Curved Light Trails */
        .sx-flip-light-trails {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .sx-outcomes-trail-1 {
          will-change: stroke-dashoffset;
          animation: sxTrailPulse1 14s linear infinite;
        }

        .sx-outcomes-trail-2 {
          will-change: stroke-dashoffset;
          animation: sxTrailPulse2 16s linear infinite reverse;
        }

        @keyframes sxTrailPulse1 {
          0% { stroke-dashoffset: 700; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes sxTrailPulse2 {
          0% { stroke-dashoffset: 740; }
          100% { stroke-dashoffset: 0; }
        }

        /* Floating Translucent Bokeh */
        .sx-flip-bokeh {
          position: absolute;
          border-radius: 50%;
          filter: blur(30px);
          opacity: 0.45;
        }
        .sx-flip-bokeh-left {
          width: 240px;
          height: 240px;
          top: 10%;
          left: 6%;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, transparent 70%);
        }
        .sx-flip-bokeh-right {
          width: 220px;
          height: 220px;
          bottom: 10%;
          right: 8%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
        }
        .sx-flip-bokeh-center {
          position: absolute;
          width: 320px;
          height: 320px;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(40px);
          background: radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, transparent 70%);
          opacity: 0.5;
          pointer-events: none;
        }

        /* 3-Card Grid */
        .sx-flip-cards-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 20px 24px 28px;
          max-width: 1240px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Outer Card Wrapper with 3D Perspective */
        .sx-flip-card-wrapper {
          position: relative;
          perspective: 1400px;
          min-height: 440px;
          border-radius: 22px;
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          --sx-tilt-x: 0deg;
          --sx-tilt-y: 0deg;
          --sx-spot-x: 50%;
          --sx-spot-y: 50%;
        }

        .sx-flip-outcomes-container.sx-flip-in-view .sx-flip-card-wrapper {
          opacity: 1;
          transform: translateY(0);
        }

        /* 3D Flipper Element (preserves 3D & rotates horizontally) */
        .sx-flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 440px;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1);
          cursor: pointer;
          outline: none;
          border-radius: 22px;
        }

        /* Hover tilt on wrapper */
        @media (hover: hover) and (pointer: fine) {
          .sx-flip-card-wrapper:hover {
            transform: translateY(-8px) perspective(1400px) rotateX(var(--sx-tilt-x)) rotateY(var(--sx-tilt-y));
          }
          .sx-flip-card-wrapper:hover .sx-flip-card-face {
            border-color: rgba(37, 99, 235, 0.85);
            box-shadow:
              0 30px 65px -12px rgba(37, 99, 235, 0.28),
              0 0 28px rgba(59, 130, 246, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 1);
          }
          .sx-flip-card-wrapper:hover .sx-outcome-3d-stage {
            transform: translate3d(0, -6px, 24px) scale(1.08);
          }
          .sx-flip-card-wrapper:hover .sx-outcome-3d-svg {
            filter: drop-shadow(0 14px 28px rgba(37, 99, 235, 0.38));
            animation: sxOutcomeIconHoverFloat 3.2s ease-in-out infinite alternate;
          }
          .sx-flip-card-wrapper:hover .sx-card-scan-line {
            opacity: 1;
          }
          .sx-flip-card-wrapper:hover .sx-card-scan-line::before {
            opacity: 1;
            animation: sxFlipScanSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        }

        @keyframes sxOutcomeIconHoverFloat {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-5px) rotate(2deg) scale(1.03); }
          100% { transform: translateY(-2px) rotate(-1.5deg) scale(1.02); }
        }

        @keyframes sxFlipScanSweep {
          0% { transform: translateY(-80%) rotate(22deg); }
          100% { transform: translateY(320%) rotate(22deg); }
        }

        /* 180-Degree 3D Coin Flip */
        .sx-flip-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        /* Common Card Face Styling */
        .sx-flip-card-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 22px;
          padding: 24px 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(191, 219, 254, 0.85);
          box-shadow:
            0 20px 45px -12px rgba(15, 23, 42, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.02),
            0 0 20px rgba(59, 130, 246, 0.1),
            0 0 0 1px rgba(226, 232, 240, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Subtle Blue Highlight on Middle Card (Card 02) */
        .sx-flip-card-face.sx-middle-highlight {
          border: 1.5px solid rgba(59, 130, 246, 0.75);
          background: linear-gradient(175deg, rgba(255, 255, 255, 0.96) 0%, rgba(239, 246, 255, 0.94) 100%);
          box-shadow:
            0 26px 54px -12px rgba(37, 99, 235, 0.24),
            0 0 32px rgba(59, 130, 246, 0.22),
            inset 0 0 25px rgba(59, 130, 246, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .sx-middle-highlight .sx-face-badge {
          background: rgba(219, 234, 254, 0.95);
          border-color: rgba(96, 165, 250, 0.85);
        }

        .sx-middle-highlight .sx-badge-text,
        .sx-middle-highlight .sx-badge-check {
          color: #1d4ed8;
        }

        .sx-middle-highlight .sx-flip-btn {
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.25);
          border-color: rgba(96, 165, 250, 0.9);
        }

        /* Scanning Light Sweep on Hover */
        .sx-card-scan-line {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          overflow: hidden;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .sx-card-scan-line::before {
          content: "";
          position: absolute;
          top: -120%;
          left: -50%;
          width: 200%;
          height: 70%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(96, 165, 250, 0.04) 20%,
            rgba(59, 130, 246, 0.22) 50%,
            rgba(255, 255, 255, 0.5) 52%,
            rgba(59, 130, 246, 0.16) 55%,
            transparent 100%
          );
          transform: rotate(22deg);
          opacity: 0;
        }

        /* Focus-visible accessibility ring */
        .sx-flip-card-inner:focus-visible .sx-flip-card-face {
          border-color: var(--sx-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35), 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        /* Front Face (Initial 0deg) */
        .sx-flip-card-front {
          transform: rotateY(0deg);
          z-index: 2;
        }

        /* Back Face (Pre-rotated 180deg) */
        .sx-flip-card-back {
          transform: rotateY(180deg);
          z-index: 1;
          background: linear-gradient(155deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.92) 100%);
          border-color: rgba(147, 197, 253, 0.9);
          box-shadow:
            0 24px 48px -12px rgba(37, 99, 235, 0.18),
            0 0 0 1px rgba(96, 165, 250, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* Soft spotlight following cursor on card face */
        .sx-face-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            380px circle at var(--sx-spot-x) var(--sx-spot-y),
            rgba(59, 130, 246, 0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
          opacity: 0.8;
        }

        /* Top Bar */
        .sx-face-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .sx-face-top-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sx-face-number {
          font-family: var(--font-heading, inherit);
          font-size: 36px;
          font-weight: 800;
          color: var(--sx-blue);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .sx-back-number {
          color: #1e40af;
        }

        .sx-face-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3.5px 10px;
          border-radius: 9999px;
          background: rgba(239, 246, 255, 0.9);
          border: 1px solid rgba(191, 219, 254, 0.8);
          width: fit-content;
        }
        .sx-back-badge {
          background: rgba(224, 231, 255, 0.9);
          border-color: rgba(165, 180, 252, 0.85);
        }

        .sx-badge-check {
          font-size: 11px;
          font-weight: 700;
          color: var(--sx-blue);
        }
        .sx-badge-text {
          font-size: 11px;
          font-weight: 600;
          color: var(--sx-blue);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .sx-back-badge .sx-badge-text {
          color: #4338ca;
        }

        /* 3D Decorative Stage (Top Right) - Slightly more prominent */
        .sx-outcome-3d-stage {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .sx-outcome-3d-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 8px 16px rgba(37, 99, 235, 0.22));
          animation: sxOutcomeIconFloat 5.2s ease-in-out infinite alternate;
        }
        @keyframes sxOutcomeIconFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-4px) rotate(1.5deg); }
        }

        /* Center Body */
        .sx-face-body {
          position: relative;
          z-index: 2;
          margin: 10px 0 12px;
        }

        .sx-face-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--sx-text);
          line-height: 1.32;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .sx-face-subtitle {
          font-size: 13px;
          line-height: 1.5;
          color: var(--sx-text-muted);
          margin: 0;
        }

        /* Back Face Body */
        .sx-back-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--sx-blue);
          margin: 0 0 6px;
          letter-spacing: -0.015em;
        }

        .sx-back-description {
          font-size: 13px;
          line-height: 1.52;
          color: #334155;
          margin: 0 0 10px;
        }

        .sx-back-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .sx-back-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 500;
          color: #1e293b;
          background: rgba(255, 255, 255, 0.9);
          padding: 2.5px 7px;
          border-radius: 4px;
          border: 1px solid rgba(191, 219, 254, 0.7);
        }

        .sx-chip-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--sx-blue);
        }

        /* Bottom Action: Hint & Circular Flip Button */
        .sx-face-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(226, 232, 240, 0.75);
          position: relative;
          z-index: 2;
        }

        .sx-flip-hint {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sx-hint-text {
          font-size: 12px;
          font-weight: 600;
          color: var(--sx-blue);
          letter-spacing: 0.01em;
        }
        .sx-hint-dots {
          font-size: 10px;
          color: rgba(148, 163, 184, 0.7);
        }

        .sx-flip-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(239, 246, 255, 0.95);
          border: 1px solid rgba(191, 219, 254, 0.85);
          color: var(--sx-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.14);
          transition: transform 0.3s ease, background-color 0.2s ease, color 0.2s ease;
        }

        .sx-flip-card-inner:hover .sx-flip-btn {
          transform: rotate(45deg);
          background: var(--sx-blue);
          color: #ffffff;
        }

        .sx-flip-btn-back {
          background: rgba(224, 231, 255, 0.95);
          border-color: rgba(165, 180, 252, 0.85);
          color: #4338ca;
        }
        .sx-flip-card-inner:hover .sx-flip-btn-back {
          transform: rotate(-45deg);
          background: #4338ca;
          color: #ffffff;
        }

        /* =========================================================================
           RESPONSIVE BREAKPOINTS
           ========================================================================= */

        /* Tablet (1024px down to 768px) */
        @media (max-width: 1024px) and (min-width: 768px) {
          .sx-flip-cards-grid {
            gap: 16px;
            padding: 16px 18px 24px;
          }
          .sx-flip-card-wrapper,
          .sx-flip-card-inner {
            min-height: 440px;
          }
          .sx-flip-card-face {
            padding: 20px 16px 16px;
          }
          .sx-face-number {
            font-size: 30px;
          }
          .sx-face-title {
            font-size: 17px;
          }
          .sx-outcome-3d-stage {
            width: 74px;
            height: 74px;
          }
        }

        /* Mobile (< 768px): Vertical Stack */
        @media (max-width: 767px) {
          .sx-flip-outcomes-container {
            padding: 20px 0 24px;
            margin: 10px -16px 0;
            border-radius: 18px;
          }
          .sx-flip-cards-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 14px 16px 20px;
          }
          .sx-flip-card-wrapper,
          .sx-flip-card-inner {
            min-height: 420px;
          }
          .sx-flip-card-wrapper:hover {
            transform: none !important;
          }
          .sx-flip-light-trails {
            display: none;
          }
        }

        .sx-trail-pulse-node {
          animation: sxTrailPulse 3.2s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes sxTrailPulse {
          0% {
            opacity: 0.85;
            stroke-width: 1px;
          }
          50% {
            opacity: 0.25;
            stroke-width: 1.8px;
          }
          100% {
            opacity: 0.85;
            stroke-width: 1px;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .sx-flip-card-wrapper {
            transition: none !important;
            transform: none !important;
          }
          .sx-flip-card-inner {
            transition: none !important;
          }
          .sx-outcome-3d-svg,
          .sx-outcomes-trail-1,
          .sx-outcomes-trail-2,
          .sx-trail-pulse-node,
          .sx-card-scan-line::before {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BusinessOutcomeFlipCards;
