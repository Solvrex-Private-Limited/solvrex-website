"use client";

import { useState, useEffect, useRef, useId } from "react";
import { eyebrow } from "../lib/theme";
import type { Service } from "../data/services";
import { DigitalWaveCanvas } from "./DigitalWaveCanvas";

/* =========================================================================
   CORE PILLARS DATA (Preserved text & structure from requirements)
   ========================================================================= */

interface PillarItem {
  id: string;
  number: string;
  category: string;
  headline: string;
  detail: string;
  deliverables: string[];
}

const ORIGINAL_SUBTITLE = "Structured modular delivery designed for small organizations and local enterprises.";

const PILLARS_DATA: PillarItem[] = [
  {
    id: "web-digital-presence",
    number: "01",
    category: "WEB & DIGITAL PRESENCE",
    headline: "Modern Web Foundations",
    detail: "Fast, accessible, search-optimized web architectures built on Next.js and clean design systems.",
    deliverables: [
      "Responsive marketing site",
      "SEO & OpenGraph configuration",
      "Core Web Vitals tuning",
    ],
  },
  {
    id: "discovery-local-reach",
    number: "02",
    category: "DISCOVERY & LOCAL REACH",
    headline: "Search & Profile Authority",
    detail: "Direct local visibility setup ensuring customers find verified contact info, hours, and catalog details.",
    deliverables: [
      "Google Business Profile setup",
      "Domain & DNS configuration",
      "Structured Schema metadata",
    ],
  },
  {
    id: "workflow-operations",
    number: "03",
    category: "WORKFLOW & OPERATIONS",
    headline: "Operational Streamlining",
    detail: "Connecting client communications, inquiries, and booking processes to eliminate manual friction.",
    deliverables: [
      "Inquiry & booking pipelines",
      "Workflow automation integration",
      "Team tooling alignment",
    ],
  },
];

export const PILLARS_BY_SLUG: Record<string, { pillars: PillarItem[]; subtitle: string }> = {
  "business-enablement": {
    pillars: PILLARS_DATA,
    subtitle: ORIGINAL_SUBTITLE,
  },
  "technology-consulting": {
    pillars: [
      {
        id: "architecture-cloud",
        number: "01",
        category: "ARCHITECTURE & CLOUD",
        headline: "Resilient Systems Design",
        detail:
          "Modern distributed systems, serverless architectures, and scalable cloud infrastructure built for high availability.",
        deliverables: [
          "Cloud Topology Design",
          "Multi-region Failover",
          "Compute Optimization",
        ],
      },
      {
        id: "platform-evaluation",
        number: "02",
        category: "PLATFORM EVALUATION",
        headline: "Objective Tool Selection",
        detail:
          "Unbiased evaluation matrices comparing technology stacks, enterprise SaaS, and managed databases without vendor bias.",
        deliverables: [
          "Comparative Benchmarks",
          "Pricing Analysis",
          "Ecosystem Integration",
        ],
      },
      {
        id: "implementation-migration",
        number: "03",
        category: "IMPLEMENTATION & MIGRATION",
        headline: "Controlled Implementation & Migration",
        detail:
          "Structured technical roadmaps, database migration strategies, and team enablement to minimize deployment risks.",
        deliverables: [
          "Phased Migration Roadmaps",
          "CI/CD Pipeline Automation",
          "Architecture Documentation",
        ],
      },
    ],
    subtitle: "A structured approach to building scalable, resilient, and efficient technology ecosystems.",
  },
  "career-services": {
    pillars: [
      {
        id: "resume-narrative",
        number: "01",
        category: "RESUME & NARRATIVE",
        headline: "Impact-Driven Positioning",
        detail:
          "Restructuring your experience into quantifiable achievements that pass ATS screening and catch recruiter attention.",
        deliverables: [
          "Targeted Resume Optimization",
          "ATS Parsing & Keyword Audit",
          "Professional Career Narrative",
        ],
      },
      {
        id: "discovery-search",
        number: "02",
        category: "DISCOVERY & SEARCH",
        headline: "LinkedIn & Inbound Reach",
        detail:
          "Optimizing your digital footprint and LinkedIn profile so hiring teams and recruiters discover your profile easily.",
        deliverables: [
          "LinkedIn Profile Overhaul",
          "Profile Visibility & Keyword Optimization",
          "Strategic Outreach Positioning",
        ],
      },
      {
        id: "strategy-execution",
        number: "03",
        category: "STRATEGY & EXECUTION",
        headline: "Application & Interview Flow",
        detail:
          "Structured job application support, targeted interview preparation, and practical salary negotiation guidance.",
        deliverables: [
          "Job Search Pipeline System",
          "Interview Strategy & Mock Prep",
          "Offer Evaluation & Negotiation",
        ],
      },
    ],
    subtitle:
      "An integrated approach to professional positioning, job discovery, and career advancement.",
  },
};

/* =========================================================================
   3D DECORATIVE ILLUSTRATIONS (Glossy, Translucent Glass & Blue Gradients)
   ========================================================================= */

// Pillar 01: Glossy Blue 3D Globe + Floating Browser Window + Orbital Ring
function GlobeIllustration() {
  const uid = useId();
  return (
    <div className="sx-pillar-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 200 170" className="sx-pillar-svg">
        <defs>
          {/* Radial Globe Gradient */}
          <radialGradient id={`${uid}-globe-grad`} cx="36%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="28%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>

          {/* Browser Window Glass Gradient */}
          <linearGradient id={`${uid}-browser-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#eff6ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.4" />
          </linearGradient>

          {/* Orbital Ring Gradient */}
          <linearGradient id={`${uid}-ring-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
          </linearGradient>

          {/* Soft Ground Shadow Filter */}
          <radialGradient id={`${uid}-shadow-grad`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.28)" />
            <stop offset="60%" stopColor="rgba(37, 99, 235, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="100" cy="148" rx="55" ry="10" fill={`url(#${uid}-shadow-grad)`} />

        {/* Ambient Blue Backlight */}
        <circle cx="100" cy="78" r="46" fill="rgba(59, 130, 246, 0.18)" filter="blur(16px)" />

        {/* Floating Glass Browser Window (Backdrop) */}
        <g transform="translate(62, 28) rotate(-7)" className="sx-anim-browser">
          <rect
            x="0"
            y="0"
            width="82"
            height="58"
            rx="8"
            fill={`url(#${uid}-browser-glass)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.5"
            filter="drop-shadow(0 10px 20px rgba(37, 99, 235, 0.12))"
          />
          {/* Header traffic light dots */}
          <circle cx="9" cy="8" r="2.2" fill="#f87171" />
          <circle cx="15.5" cy="8" r="2.2" fill="#fbbf24" />
          <circle cx="22" cy="8" r="2.2" fill="#34d399" />
          {/* Browser address pill */}
          <rect x="28" y="5" width="46" height="6.5" rx="3.2" fill="rgba(255, 255, 255, 0.85)" />
          {/* Wireframe layout elements inside window */}
          <rect x="8" y="18" width="30" height="4" rx="2" fill="rgba(59, 130, 246, 0.5)" />
          <rect x="8" y="26" width="66" height="2.5" rx="1.2" fill="rgba(148, 163, 184, 0.4)" />
          <rect x="8" y="32" width="54" height="2.5" rx="1.2" fill="rgba(148, 163, 184, 0.3)" />
          <rect x="8" y="40" width="22" height="10" rx="3" fill="rgba(37, 99, 235, 0.4)" />
          <rect x="34" y="40" width="22" height="10" rx="3" fill="rgba(191, 219, 254, 0.5)" />
        </g>

        {/* Back section of Orbital Ring (rendered behind sphere) */}
        <g transform="translate(100, 84) rotate(-22)">
          <path
            d="M -56,0 A 56,16 0 0,1 56,0"
            fill="none"
            stroke={`url(#${uid}-ring-grad)`}
            strokeWidth="2.8"
            opacity="0.45"
            strokeDasharray="4 2"
          />
        </g>

        {/* Large Glossy Blue 3D Globe */}
        <g transform="translate(100, 84)" className="sx-anim-globe">
          {/* Main sphere */}
          <circle
            cx="0"
            cy="0"
            r="35"
            fill={`url(#${uid}-globe-grad)`}
            filter="drop-shadow(0 14px 28px rgba(30, 58, 138, 0.35))"
          />

          {/* Latitude & Longitude wireframe curves */}
          <ellipse cx="0" cy="0" rx="35" ry="14" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="35" ry="26" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="14" ry="35" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="26" ry="35" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
          <line x1="-35" y1="0" x2="35" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
          <line x1="0" y1="-35" x2="0" y2="35" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />

          {/* Specular curved glint */}
          <ellipse
            cx="-12"
            cy="-12"
            rx="12"
            ry="7"
            transform="rotate(-35 -12 -12)"
            fill="#ffffff"
            opacity="0.75"
          />
          <circle cx="-16" cy="-16" r="3.5" fill="#ffffff" opacity="0.9" />

          {/* Mini pulse beacon on globe surface */}
          <circle cx="10" cy="-6" r="3" fill="#67e8f9" filter="drop-shadow(0 0 6px #67e8f9)" />
          <circle cx="10" cy="-6" r="6" fill="none" stroke="#67e8f9" strokeWidth="1" opacity="0.7" className="sx-beacon-pulse" />
        </g>

        {/* Front section of Orbital Ring (rendered in front of sphere) */}
        <g transform="translate(100, 84) rotate(-22)">
          <path
            d="M 56,0 A 56,16 0 0,1 -56,0"
            fill="none"
            stroke={`url(#${uid}-ring-grad)`}
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 4px 10px rgba(59, 130, 246, 0.5))"
          />
          {/* Orbital satellite node */}
          <circle cx="34" cy="12.5" r="3.2" fill="#ffffff" filter="drop-shadow(0 0 8px #93c5fd)" />
          <circle cx="34" cy="12.5" r="1.6" fill="#3b82f6" />
        </g>
      </svg>
    </div>
  );
}

// Pillar 02: Glossy Blue 3D Location Pin + Pulsing Radar Platform + Verified Badge
function RadarPinIllustration() {
  const uid = useId();
  return (
    <div className="sx-pillar-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 200 170" className="sx-pillar-svg">
        <defs>
          {/* Radar Platform Gradient */}
          <radialGradient id={`${uid}-radar-grad`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
            <stop offset="50%" stopColor="rgba(96, 165, 250, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* 3D Location Pin Radial Gradient */}
          <radialGradient id={`${uid}-pin-face`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>

          {/* 3D Pin Extrusion/Bevel Gradient */}
          <linearGradient id={`${uid}-pin-bevel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Translucent Chip Gradient */}
          <linearGradient id={`${uid}-chip-glass`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="100" cy="148" rx="55" ry="11" fill="rgba(37, 99, 235, 0.22)" filter="blur(6px)" />

        {/* Circular Radar Platform (Perspective 3D Ellipse) */}
        <g transform="translate(100, 134)">
          {/* Radar Base Fill */}
          <ellipse cx="0" cy="0" rx="58" ry="18" fill={`url(#${uid}-radar-grad)`} />

          {/* Outer Radar Rings */}
          <ellipse cx="0" cy="0" rx="58" ry="18" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="42" ry="13" fill="none" stroke="rgba(96, 165, 250, 0.45)" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="26" ry="8" fill="none" stroke="rgba(147, 197, 253, 0.55)" strokeWidth="1" />

          {/* Radar Crosshairs */}
          <line x1="-58" y1="0" x2="58" y2="0" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Pulsing Concentric Radar Wave (CSS animated) */}
          <ellipse cx="0" cy="0" rx="48" ry="15" fill="none" stroke="#60a5fa" strokeWidth="1.6" className="sx-radar-wave" />
        </g>

        {/* Floating Mini Verified Chip (Top Left) */}
        <g transform="translate(34, 46) rotate(-8)" className="sx-anim-chip-left">
          <rect
            x="0"
            y="0"
            width="46"
            height="22"
            rx="11"
            fill={`url(#${uid}-chip-glass)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.2"
            filter="drop-shadow(0 6px 14px rgba(37, 99, 235, 0.14))"
          />
          <circle cx="11" cy="11" r="5" fill="#3b82f6" />
          <path d="M9 11l1.5 1.5 3-3" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="19" y="8" width="19" height="3" rx="1.5" fill="rgba(30, 58, 138, 0.65)" />
          <rect x="19" y="13" width="13" height="2" rx="1" fill="rgba(100, 116, 139, 0.5)" />
        </g>

        {/* Floating Search Pill (Top Right) */}
        <g transform="translate(136, 52) rotate(10)" className="sx-anim-chip-right">
          <rect
            x="0"
            y="0"
            width="40"
            height="20"
            rx="10"
            fill={`url(#${uid}-chip-glass)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.2"
            filter="drop-shadow(0 6px 14px rgba(37, 99, 235, 0.14))"
          />
          {/* Mini magnifying glass */}
          <circle cx="11" cy="10" r="3.5" fill="none" stroke="#2563eb" strokeWidth="1.4" />
          <line x1="13.5" y1="12.5" x2="16.5" y2="15.5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="19" y="8.5" width="14" height="3" rx="1.5" fill="rgba(37, 99, 235, 0.6)" />
        </g>

        {/* Large Glossy Blue 3D Location Pin */}
        <g transform="translate(100, 72)" className="sx-anim-pin">
          {/* Bevel 3D Shadow/Extrusion behind */}
          <path
            d="M 3, -38 
               C 25, -38 39, -20 37, 2 
               C 35, 18 19, 38 3, 56 
               L -1, 56 
               C 15, 38 31, 18 33, 2 
               C 35, -20 21, -38 3, -38 Z"
            fill={`url(#${uid}-pin-bevel)`}
            opacity="0.8"
          />

          {/* Main Pin Teardrop Body */}
          <path
            d="M 0, -40 
               C 22, -40 36, -24 36, -4 
               C 36, 16 18, 38 0, 56 
               C -18, 38 -36, 16 -36, -4 
               C -36, -24 -22, -40 0, -40 Z"
            fill={`url(#${uid}-pin-face)`}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.6"
            filter="drop-shadow(0 16px 30px rgba(30, 58, 138, 0.4))"
          />

          {/* Specular 3D Highlight curve */}
          <path
            d="M -6, -36 C -18, -34 -28, -20 -28, -6 C -28, 6 -16, 22 -6, 32"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Center White & Cyan Aperture */}
          <circle cx="0" cy="-8" r="14" fill="#ffffff" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.15))" />
          <circle cx="0" cy="-8" r="9" fill="url(#pin-hole-grad)" />
          <radialGradient id="pin-hole-grad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <circle cx="-3" cy="-11" r="2.2" fill="#ffffff" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

// Pillar 03: Large Blue 3D Gear + Floating Workflow & Node Symbols
function WorkflowGearIllustration() {
  const uid = useId();
  return (
    <div className="sx-pillar-3d-stage" aria-hidden="true">
      <svg viewBox="0 0 200 170" className="sx-pillar-svg">
        <defs>
          {/* Main Gear Gradient */}
          <linearGradient id={`${uid}-gear-front`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Gear 3D Bevel Side Gradient */}
          <linearGradient id={`${uid}-gear-side`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          {/* Secondary Satellite Gear Gradient */}
          <linearGradient id={`${uid}-sat-gear`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>

          {/* Glass Chip Gradient */}
          <linearGradient id={`${uid}-wf-chip`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="100" cy="148" rx="55" ry="10" fill="rgba(37, 99, 235, 0.22)" filter="blur(6px)" />

        {/* Ambient Center Bloom */}
        <circle cx="100" cy="80" r="44" fill="rgba(99, 102, 241, 0.18)" filter="blur(16px)" />

        {/* Connected Circuit / Node Tracks (Behind Gear) */}
        <g stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1.5" fill="none">
          <path d="M 38,100 L 68,100 L 80,85" />
          <path d="M 152,60 L 132,60 L 122,74" />
          <circle cx="38" cy="100" r="3.5" fill="#3b82f6" />
          <circle cx="152" cy="60" r="3.5" fill="#818cf8" />
        </g>

        {/* Floating Mini Satellite Gear (Tucked neatly inside group, avoiding any edge overlap or clipping) */}
        <g transform="translate(132, 48) scale(0.9)" className="sx-anim-sat-gear">
          <circle
            cx="0"
            cy="0"
            r="16"
            fill={`url(#${uid}-sat-gear)`}
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
            filter="drop-shadow(0 6px 14px rgba(99, 102, 241, 0.25))"
          />
          {/* Teeth around satellite */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x="-3"
              y="-19"
              width="6"
              height="5"
              rx="1.5"
              fill={`url(#${uid}-sat-gear)`}
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="6" fill="#ffffff" />
          <circle cx="0" cy="0" r="3.5" fill="#4338ca" />
        </g>

        {/* Floating Automation Chip (Top Left) */}
        <g transform="translate(32, 42) rotate(-6)" className="sx-anim-wf-chip">
          <rect
            x="0"
            y="0"
            width="48"
            height="22"
            rx="11"
            fill={`url(#${uid}-wf-chip)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.2"
            filter="drop-shadow(0 8px 16px rgba(37, 99, 235, 0.16))"
          />
          {/* Lightning bolt / speed sync icon */}
          <path d="M12 5 L8 12 L13 12 L11 18 L17 10 L12 10 Z" fill="#3b82f6" />
          <rect x="21" y="8" width="20" height="3" rx="1.5" fill="rgba(30, 58, 138, 0.7)" />
          <rect x="21" y="13" width="14" height="2" rx="1" fill="rgba(99, 102, 241, 0.6)" />
        </g>

        {/* Large Blue 3D Main Gear */}
        <g transform="translate(100, 82)">
          {/* 3D Extrusion Side Layer (offset for depth) */}
          <g transform="translate(0, 6)">
            <circle cx="0" cy="0" r="36" fill={`url(#${uid}-gear-side)`} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <rect
                key={deg}
                x="-6.5"
                y="-46"
                width="13"
                height="12"
                rx="2.5"
                fill={`url(#${uid}-gear-side)`}
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Front Rotating Gear Face */}
          <g className="sx-anim-gear-face">
            {/* Gear Rim */}
            <circle
              cx="0"
              cy="0"
              r="36"
              fill={`url(#${uid}-gear-front)`}
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.6"
              filter="drop-shadow(0 14px 28px rgba(30, 58, 138, 0.38))"
            />

            {/* 8 Gear Teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <rect
                  x="-6.5"
                  y="-46"
                  width="13"
                  height="12"
                  rx="2.5"
                  fill={`url(#${uid}-gear-front)`}
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="1.2"
                />
              </g>
            ))}

            {/* Specular Rim Glint */}
            <path
              d="M -26,-20 A 32,32 0 0,1 20,-26"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Center Hub & Bore */}
            <circle cx="0" cy="0" r="17" fill="#ffffff" stroke="rgba(191, 219, 254, 0.8)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="10" fill="url(#gear-bore-grad)" />
            <radialGradient id="gear-bore-grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <circle cx="-3" cy="-4" r="2.2" fill="#ffffff" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PillarIllustration({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <GlobeIllustration />;
    case 1:
      return <RadarPinIllustration />;
    case 2:
      return <WorkflowGearIllustration />;
    default:
      return <GlobeIllustration />;
  }
}

/* =========================================================================
   ANIMATED CONNECTING LINES SVG COMPONENT
   ========================================================================= */

function ConnectingArchitectureLines({ inView }: { inView: boolean }) {
  const uid = useId();
  return (
    <div className={`sx-connecting-lines-layer ${inView ? "sx-active" : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        className="sx-connecting-svg"
      >
        <defs>
          {/* Animated Light Pulse Gradient */}
          <linearGradient id={`${uid}-pulse-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="1" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          {/* Node Glow Filter */}
          <filter id={`${uid}-node-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* 1. Base Subtle Translucent Architecture Path */}
        <path
          d="M 200,85 C 380,45 420,125 600,85 C 780,45 820,125 1000,85"
          fill="none"
          stroke="rgba(191, 219, 254, 0.75)"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="sx-arch-base-path"
        />

        {/* 2. Secondary Smooth Flow Path */}
        <path
          d="M 200,85 C 380,45 420,125 600,85 C 780,45 820,125 1000,85"
          fill="none"
          stroke="rgba(59, 130, 246, 0.28)"
          strokeWidth="3.5"
          className="sx-arch-glow-path"
        />

        {/* 3. Travelling Glowing Light Pulse */}
        <path
          d="M 200,85 C 380,45 420,125 600,85 C 780,45 820,125 1000,85"
          fill="none"
          stroke={`url(#${uid}-pulse-grad)`}
          strokeWidth="4"
          strokeLinecap="round"
          className="sx-arch-pulse-path"
        />

        {/* 4. Glowing Blue Architecture Nodes */}
        {/* Node 1 (Pillar 01 Anchor) */}
        <g transform="translate(200, 85)">
          <circle cx="0" cy="0" r="14" fill="rgba(59, 130, 246, 0.22)" filter={`url(#${uid}-node-glow)`} />
          <circle cx="0" cy="0" r="6" fill="#3b82f6" />
          <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
        </g>

        {/* Intermediate Data Node 1-2 */}
        <g transform="translate(400, 75)" className="sx-mid-node sx-mid-1">
          <circle cx="0" cy="0" r="4.5" fill="#60a5fa" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Node 2 (Pillar 02 Center Anchor) */}
        <g transform="translate(600, 85)">
          <circle cx="0" cy="0" r="16" fill="rgba(59, 130, 246, 0.28)" filter={`url(#${uid}-node-glow)`} />
          <circle cx="0" cy="0" r="7" fill="#2563eb" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>

        {/* Intermediate Data Node 2-3 */}
        <g transform="translate(800, 75)" className="sx-mid-node sx-mid-2">
          <circle cx="0" cy="0" r="4.5" fill="#60a5fa" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Node 3 (Pillar 03 Anchor) */}
        <g transform="translate(1000, 85)">
          <circle cx="0" cy="0" r="14" fill="rgba(99, 102, 241, 0.25)" filter={`url(#${uid}-node-glow)`} />
          <circle cx="0" cy="0" r="6" fill="#4f46e5" />
          <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

/* =========================================================================
   MAIN BUSINESS ENGAGEMENT PILLARS COMPONENT
   ========================================================================= */

export function BusinessEngagementPillars({ service }: { service?: Service } = {}) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slug = service?.slug ?? "business-enablement";
  const isTechConsulting = slug === "technology-consulting";
  const isCareerServices = slug === "career-services";
  const { pillars, subtitle } = PILLARS_BY_SLUG[slug] ?? PILLARS_BY_SLUG["business-enablement"];

  // Entrance observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse tilt tracking across the whole section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, x));
      targetY = Math.max(-0.5, Math.min(0.5, y));

      el.style.setProperty("--sx-mouse-px", `${e.clientX - rect.left}px`);
      el.style.setProperty("--sx-mouse-py", `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.setProperty("--sx-mouse-px", "50%");
      el.style.setProperty("--sx-mouse-py", "50%");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      el.style.setProperty("--sx-mx", currentX.toFixed(4));
      el.style.setProperty("--sx-my", currentY.toFixed(4));
      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sx-pillars-wrapper ${inView ? "sx-in-view" : ""}`}
      aria-label="Core Engagement Pillars"
    >
      {/* Background Decorators & Radial Ambient Spotlight */}
      <div className="sx-pillars-bg" aria-hidden="true">
        <div className="sx-pillars-spotlight" />
        <div className="sx-pillars-center-glow" />
        <div className="sx-pillars-grid-lines" />

        {/* Subtle animated flowing digital wave mesh below the cards */}
        <DigitalWaveCanvas inView={inView} />

        {/* Floating background technology bokeh particles */}
        <div className="sx-pillar-bokeh sx-pillar-bokeh-1" />
        <div className="sx-pillar-bokeh sx-pillar-bokeh-2" />
        <div className="sx-pillar-bokeh sx-pillar-bokeh-3" />
      </div>

      {/* Container holding Section Intro & 3D Modular Grid */}
      <div className="sx-pillars-container">
        {/* Section Intro (Title, Subtitle) */}
        <div className="sx-section-intro sx-pillars-intro">
          <p className="sx-section-kicker" style={eyebrow}>
            Practice Architecture
          </p>
          <h2 className="sx-service-section-title">Core Engagement Pillars</h2>
          <p className="sx-section-sub">
            {subtitle}
          </p>
        </div>

        {/* 3D Modular Architecture Stage */}
        <div className="sx-pillars-stage">
          {/* Animated Connecting Architecture Line Behind Cards */}
          <ConnectingArchitectureLines inView={inView} />

          {/* Three Large Modular Architecture Cards */}
          <div className="sx-pillars-grid">
            {pillars.map((pillar, i) => {
              const isHighlighted = (isTechConsulting && i === 2) || (isCareerServices && i === 1);
              return (
                <div
                  key={pillar.id}
                  tabIndex={0}
                  role="region"
                  aria-label={`${pillar.category}: ${pillar.headline}`}
                  className={`sx-pillar-card sx-pillar-idx-${i} ${isHighlighted ? "sx-pillar-card-highlighted" : ""}`}
                  style={{
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                {/* Frosted Card Top Highlight */}
                <div className="sx-pillar-card-glow" aria-hidden="true" />

                {/* Holographic Scanning Light Sweep on Hover */}
                <div className="sx-card-scan-line" aria-hidden="true" />

                {/* 3D Floating Illustration Stage */}
                <div className="sx-pillar-object-wrapper">
                  <PillarIllustration index={i} />
                </div>

                {/* Card Header: Category Badge & Step Number */}
                <div className="sx-pillar-header">
                  <div className="sx-pillar-badge">
                    <span className="sx-pillar-badge-dot" aria-hidden="true" />
                    <span>{pillar.category}</span>
                  </div>
                  <div className="sx-pillar-number">
                    <span className="sx-pillar-number-label">PILLAR</span>
                    <span className="sx-pillar-number-val">{pillar.number}</span>
                  </div>
                </div>

                {/* Card Body: Title & Business Description */}
                <div className="sx-pillar-body">
                  <h3 className="sx-pillar-title">{pillar.headline}</h3>
                  <p className="sx-pillar-desc">{pillar.detail}</p>
                </div>

                {/* Card Deliverables: Bullet Features */}
                <div className="sx-pillar-features">
                  <div className="sx-pillar-features-label">Key Deliverables</div>
                  <ul className="sx-pillar-list">
                    {pillar.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="sx-pillar-list-item">
                        <span className="sx-pillar-check-icon" aria-hidden="true">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M13.3 4.3L6.3 11.3L2.7 7.7"
                              stroke="var(--sx-blue)"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="sx-pillar-item-text">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMPONENT STYLES: 3D Hardware Accelerated Transforms & Responsive Layout
          ========================================================================= */}
      <style>{`
        /* Wrapper & Edge-to-Edge Canvas */
        .sx-pillars-wrapper {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          padding: 80px 0 95px;
          margin-top: 35px;
          margin-bottom: 45px;
          background: linear-gradient(180deg, #f8fafc 0%, #f0f4ff 50%, #eff6ff 100%);
          border-top: 1px solid rgba(226, 232, 240, 0.85);
          border-bottom: 1px solid rgba(226, 232, 240, 0.85);
          overflow: hidden;
          perspective: 1400px;
          --sx-mx: 0;
          --sx-my: 0;
          --sx-mouse-px: 50%;
          --sx-mouse-py: 45%;
        }

        /* Ambient Lighting Background */
        .sx-pillars-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .sx-pillars-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--sx-mouse-px) var(--sx-mouse-py),
            rgba(59, 130, 246, 0.12) 0%,
            rgba(99, 102, 241, 0.04) 45%,
            transparent 70%
          );
          opacity: 0.85;
          transition: opacity 0.4s ease;
        }

        .sx-pillars-center-glow {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 850px;
          height: 380px;
          background: radial-gradient(
            ellipse,
            rgba(59, 130, 246, 0.16) 0%,
            rgba(147, 197, 253, 0.08) 50%,
            transparent 75%
          );
          filter: blur(40px);
        }

        .sx-pillars-grid-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(191, 219, 254, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(191, 219, 254, 0.45) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at 50% 45%, black 45%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 45%, black 45%, transparent 85%);
          opacity: 0.5;
        }

        /* Floating Background Technology Bokeh Particles */
        .sx-pillar-bokeh {
          position: absolute;
          border-radius: 50%;
          filter: blur(34px);
          opacity: 0.45;
          pointer-events: none;
        }
        .sx-pillar-bokeh-1 {
          width: 260px;
          height: 260px;
          top: 15%;
          left: 5%;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, transparent 70%);
        }
        .sx-pillar-bokeh-2 {
          width: 240px;
          height: 240px;
          bottom: 12%;
          right: 6%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
        }
        .sx-pillar-bokeh-3 {
          width: 300px;
          height: 300px;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, transparent 70%);
        }

        /* Inner Container */
        .sx-pillars-container {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          box-sizing: border-box;
        }

        .sx-pillars-intro {
          text-align: center;
          margin-bottom: 50px;
        }

        .sx-pillars-intro .sx-service-section-title {
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 750;
          color: var(--sx-text);
          letter-spacing: -0.025em;
          margin: 8px 0 12px;
        }

        .sx-pillars-intro .sx-section-sub {
          max-width: 640px;
          margin: 0 auto;
          font-size: 15.5px;
          color: var(--sx-text-muted);
          line-height: 1.55;
        }

        /* Stage Holding Connecting Lines & 3 Cards */
        .sx-pillars-stage {
          position: relative;
          width: 100%;
        }

        /* =========================================================================
           CONNECTING ARCHITECTURE LINES (Between Pillar 1, 2, 3)
           ========================================================================= */
        .sx-connecting-lines-layer {
          position: absolute;
          top: 35px;
          left: 0;
          width: 100%;
          height: 160px;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 1s ease 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .sx-connecting-lines-layer.sx-active {
          opacity: 1;
          transform: translateY(0);
        }

        .sx-connecting-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Pulse wave travelling along the path */
        .sx-arch-pulse-path {
          stroke-dasharray: 100 450;
          animation: sxPulseTravel 8s linear infinite;
        }

        @keyframes sxPulseTravel {
          0% {
            stroke-dashoffset: 480;
          }
          100% {
            stroke-dashoffset: -480;
          }
        }

        /* Intermediate Floating Data Nodes */
        .sx-mid-1 {
          animation: sxMidPulse 3.5s ease-in-out infinite alternate;
        }
        .sx-mid-2 {
          animation: sxMidPulse 3.5s ease-in-out infinite alternate-reverse;
        }

        @keyframes sxMidPulse {
          0% {
            transform: translate(400px, 75px) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translate(400px, 71px) scale(1.2);
            opacity: 1;
          }
        }

        /* =========================================================================
           THREE PILLAR CARDS GRID
           ========================================================================= */
        .sx-pillars-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        /* Pillar Card: Translucent Glassmorphism with Refined Highlights */
        .sx-pillar-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 520px;
          padding: 24px 28px 30px;
          box-sizing: border-box;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(191, 219, 254, 0.85);
          box-shadow:
            0 20px 45px -12px rgba(15, 23, 42, 0.08),
            0 2px 10px rgba(0, 0, 0, 0.02),
            0 0 20px rgba(59, 130, 246, 0.1),
            0 0 0 1px rgba(226, 232, 240, 0.75),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          outline: none;
          cursor: pointer;
          user-select: none;
          transform-style: preserve-3d;
          will-change: transform, box-shadow, border-color;
          opacity: 0;
          transform: translateY(40px);
          overflow: hidden;
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease,
            background 0.3s ease;
        }

        /* Refined Electric-Blue Border & Subtle Glow on Pillar 03 */
        .sx-pillar-card.sx-pillar-card-highlighted {
          border: 1.5px solid rgba(59, 130, 246, 0.85);
          background: linear-gradient(175deg, rgba(255, 255, 255, 0.96) 0%, rgba(239, 246, 255, 0.94) 100%);
          box-shadow:
            0 26px 55px -12px rgba(37, 99, 235, 0.25),
            0 0 32px rgba(59, 130, 246, 0.22),
            inset 0 0 24px rgba(59, 130, 246, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .sx-pillar-card-highlighted .sx-pillar-badge {
          background: rgba(219, 234, 254, 0.95);
          border-color: rgba(96, 165, 250, 0.9);
          color: #1d4ed8;
        }

        .sx-pillar-card-highlighted .sx-pillar-badge-dot {
          background: #1d4ed8;
        }

        .sx-pillar-card-highlighted .sx-pillar-number-val {
          color: #1d4ed8;
        }

        /* In-View Entrance */
        .sx-pillars-wrapper.sx-in-view .sx-pillar-card {
          opacity: 1;
          transform: translateY(0)
            rotateY(calc(var(--sx-mx) * 4deg))
            rotateX(calc(var(--sx-my) * -3.5deg));
        }

        /* Subtle Holographic Scanning Light on Card Face */
        .sx-card-scan-line {
          position: absolute;
          inset: 0;
          border-radius: 24px;
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

        /* Interactive Dynamic Hover Focus */
        @media (hover: hover) and (pointer: fine) {
          .sx-pillars-wrapper.sx-in-view .sx-pillar-card:hover {
            transform: translateY(-10px) scale(1.025)
              rotateY(calc(var(--sx-mx) * 6deg))
              rotateX(calc(var(--sx-my) * -4.5deg)) !important;
            z-index: 10 !important;
            border-color: rgba(37, 99, 235, 0.85) !important;
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow:
              0 32px 70px -14px rgba(37, 99, 235, 0.3),
              0 0 30px rgba(59, 130, 246, 0.25),
              0 0 0 1.5px rgba(37, 99, 235, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 1) !important;
          }

          /* 3D Illustration scales and reacts with parallax */
          .sx-pillar-card:hover .sx-pillar-3d-stage {
            transform: scale(1.08) translateY(-6px);
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .sx-pillar-card:hover .sx-card-scan-line {
            opacity: 1;
          }

          .sx-pillar-card:hover .sx-card-scan-line::before {
            opacity: 1;
            animation: sxPillarScanSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        }

        @keyframes sxPillarScanSweep {
          0% { transform: translateY(-80%) rotate(22deg); }
          100% { transform: translateY(320%) rotate(22deg); }
        }

        .sx-pillar-card:focus-visible {
          border-color: var(--sx-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35), 0 20px 45px rgba(37, 99, 235, 0.18);
        }

        .sx-pillar-card-glow {
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95), transparent);
          pointer-events: none;
        }

        /* 3D Illustration Stage */
        .sx-pillar-object-wrapper {
          position: relative;
          width: 100%;
          height: 155px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .sx-pillar-3d-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-pillar-svg {
          width: 100%;
          height: 100%;
          max-width: 220px;
          overflow: visible;
        }

        /* Ambient 3D Keyframe Animations */
        /* Pillar 1: Globe & Browser */
        .sx-anim-globe {
          animation: sxGlobeFloat 5s ease-in-out infinite alternate;
        }
        .sx-anim-browser {
          animation: sxBrowserFloat 6.2s ease-in-out infinite alternate -1.5s;
        }
        .sx-beacon-pulse {
          animation: sxBeaconWave 2.4s ease-out infinite;
        }

        @keyframes sxGlobeFloat {
          0% { transform: translate(100px, 84px); }
          100% { transform: translate(100px, 78px); }
        }
        @keyframes sxBrowserFloat {
          0% { transform: translate(62px, 28px) rotate(-7deg); }
          100% { transform: translate(62px, 24px) rotate(-5.5deg); }
        }
        @keyframes sxBeaconWave {
          0% { r: 3px; opacity: 1; }
          100% { r: 12px; opacity: 0; }
        }

        /* Pillar 2: Pin & Radar */
        .sx-anim-pin {
          animation: sxPinFloat 4.8s ease-in-out infinite alternate;
        }
        .sx-radar-wave {
          animation: sxRadarPulse 2.8s ease-out infinite;
        }
        .sx-anim-chip-left {
          animation: sxChipLeftFloat 5.5s ease-in-out infinite alternate -1s;
        }
        .sx-anim-chip-right {
          animation: sxChipRightFloat 6s ease-in-out infinite alternate -2s;
        }

        @keyframes sxPinFloat {
          0% { transform: translate(100px, 72px); }
          100% { transform: translate(100px, 64px); }
        }
        @keyframes sxRadarPulse {
          0% { rx: 18px; ry: 6px; opacity: 1; }
          100% { rx: 58px; ry: 18px; opacity: 0; }
        }
        @keyframes sxChipLeftFloat {
          0% { transform: translate(34px, 46px) rotate(-8deg); }
          100% { transform: translate(34px, 41px) rotate(-6deg); }
        }
        @keyframes sxChipRightFloat {
          0% { transform: translate(136px, 52px) rotate(10deg); }
          100% { transform: translate(136px, 47px) rotate(8deg); }
        }

        /* Pillar 3: Gear & Workflow */
        .sx-anim-gear-face {
          animation: sxGearRotate 24s linear infinite;
          transform-origin: 0 0;
        }
        .sx-anim-sat-gear {
          animation: sxSatGearRotate 12s linear infinite reverse;
          transform-origin: 132px 48px;
        }
        .sx-anim-wf-chip {
          animation: sxWfChipFloat 5.2s ease-in-out infinite alternate;
        }

        @keyframes sxGearRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sxSatGearRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sxWfChipFloat {
          0% { transform: translate(32px, 42px) rotate(-6deg); }
          100% { transform: translate(32px, 37px) rotate(-4deg); }
        }

        /* Card Header */
        .sx-pillar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .sx-pillar-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(239, 246, 255, 0.9);
          border: 1px solid rgba(191, 219, 254, 0.85);
          font-size: 11px;
          font-weight: 650;
          color: var(--sx-blue);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .sx-pillar-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--sx-blue);
        }

        .sx-pillar-number {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-family: var(--font-heading, inherit);
        }

        .sx-pillar-number-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(148, 163, 184, 0.7);
        }

        .sx-pillar-number-val {
          font-size: 16px;
          font-weight: 800;
          color: var(--sx-blue);
          letter-spacing: -0.02em;
        }

        /* Card Body */
        .sx-pillar-body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .sx-pillar-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.35;
          color: var(--sx-text);
          letter-spacing: -0.015em;
          margin: 0 0 10px;
        }

        .sx-pillar-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--sx-text-muted);
          margin: 0;
        }

        /* Card Features & Deliverables List */
        .sx-pillar-features {
          margin-top: auto;
          border-top: 1px solid rgba(226, 232, 240, 0.85);
          padding-top: 16px;
        }

        .sx-pillar-features-label {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(100, 116, 139, 0.8);
          margin-bottom: 10px;
        }

        .sx-pillar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .sx-pillar-list-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 500;
          color: var(--sx-text);
          line-height: 1.4;
        }

        .sx-pillar-check-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(239, 246, 255, 0.95);
          border: 1px solid rgba(191, 219, 254, 0.8);
          flex-shrink: 0;
        }

        .sx-pillar-item-text {
          flex: 1;
        }

        /* =========================================================================
           RESPONSIVE DESIGN (Desktop, Tablet, Mobile)
           ========================================================================= */

        /* Tablet (1024px down to 768px) */
        @media (max-width: 1024px) {
          .sx-pillars-grid {
            gap: 20px;
          }
          .sx-pillar-card {
            padding: 22px 20px 26px;
            min-height: 500px;
          }
          .sx-pillar-title {
            font-size: 17px;
          }
          .sx-pillar-desc {
            font-size: 13px;
          }
          .sx-pillar-list-item {
            font-size: 12.5px;
          }
        }

        /* Mobile / Small Tablet (< 768px): Stack cards vertically or smooth snap */
        @media (max-width: 767px) {
          .sx-pillars-wrapper {
            padding: 50px 0 65px;
            perspective: none;
          }
          .sx-pillars-container {
            padding: 0 20px;
          }
          .sx-connecting-lines-layer {
            display: none; /* Hide horizontal curves on stacked mobile */
          }
          .sx-pillars-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .sx-pillar-card {
            min-height: auto;
            transform: none !important;
            opacity: 1 !important;
          }
          .sx-pillar-3d-stage {
            transform: none !important;
          }
        }

        /* Reduced Motion Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .sx-anim-globe,
          .sx-anim-browser,
          .sx-anim-pin,
          .sx-radar-wave,
          .sx-anim-chip-left,
          .sx-anim-chip-right,
          .sx-anim-gear-face,
          .sx-anim-sat-gear,
          .sx-anim-wf-chip,
          .sx-arch-pulse-path,
          .sx-beacon-pulse {
            animation: none !important;
          }
          .sx-pillar-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default BusinessEngagementPillars;
