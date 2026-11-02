"use client";

import { useState, useEffect, useRef, useId } from "react";
import { C, eyebrow } from "../lib/theme";
import type { Service } from "../data/services";
import { ConnectedTechnologyNetwork } from "./ConnectedTechnologyNetwork";
import { ConnectedCareerNetwork } from "./ConnectedCareerNetwork";
import { DigitalWaveCanvas } from "./DigitalWaveCanvas";

// Curated icons for Typical Engagements
export function EngagementIcon({ index, slug }: { index: number; slug?: string }) {
  if (slug === "career-services") {
    if (index === 0) {
      // Resume / Document audit
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    }
    if (index === 1) {
      // Profile / LinkedIn reach
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      );
    }
    if (index === 2) {
      // Job Search Strategy (Target / Compass)
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    }
    if (index === 3) {
      // Application Support (Paper airplane / Send)
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    }
    // Career Guidance (Executive Briefcase)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  if (index === 0) {
    // Website Development & Maintenance (Browser / Code window)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="6.5" x2="8.01" y2="6.5" />
        <line x1="12" y1="6.5" x2="12.01" y2="6.5" />
      </svg>
    );
  }
  if (index === 1) {
    // Online Presence Setup (Map / Search pin)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  if (index === 2) {
    // Business Process Improvement (Flow / Sliders)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  if (index === 3) {
    // Operational Support & Optimization (Cpu / Gear)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  // Digital Enablement (Devices / Monitor)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export interface EngagementItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
}

export const BUSINESS_ENGAGEMENTS: EngagementItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website development and maintenance",
    tag: "Web & Performance",
    description:
      "Custom responsive website architecture, routine updates, fast load times, and ongoing reliability maintenance.",
    deliverables: ["Custom Architecture", "Core Web Vitals", "Security & Hosting"],
  },
  {
    id: "online-presence",
    number: "02",
    title: "Online presence setup (Google Business Profile, social profiles)",
    tag: "Local Discovery",
    description:
      "Verified Google Business Profile setup, local maps authority, search citations, and cohesive social touchpoints.",
    deliverables: ["Google Business Profile", "Local Maps Authority", "Profile Synchronization"],
  },
  {
    id: "process-improvement",
    number: "03",
    title: "Business process improvement",
    tag: "Operational Clarity",
    description:
      "Audit and restructuring of daily workflows to eliminate friction, handoff bottlenecks, and redundant steps.",
    deliverables: ["Workflow Mapping", "Bottleneck Elimination", "Operational Velocity"],
  },
  {
    id: "operational-support",
    number: "04",
    title: "Operational support and workflow optimization",
    tag: "Workflow Automation",
    description:
      "Hands-on operational support, tooling alignment, standard operating procedures, and automated pipelines.",
    deliverables: ["Tooling Alignment", "Structured Handoffs", "Pragmatic Automation"],
  },
  {
    id: "digital-enablement",
    number: "05",
    title: "Digital enablement for local businesses",
    tag: "Technology Adoption",
    description:
      "Equipping local business teams with modern customer engagement systems, digitized invoicing, and digital tools.",
    deliverables: ["Local Digitization", "Customer Pipelines", "Team Tooling"],
  },
];

export const ENGAGEMENTS_BY_SLUG: Record<string, EngagementItem[]> = {
  "business-enablement": BUSINESS_ENGAGEMENTS,
  "technology-consulting": [
    {
      id: "tech-architecture-assessment",
      number: "01",
      title: "Technology & Architecture Assessment",
      tag: "Tech Assessment",
      description:
        "Comprehensive evaluation of current infrastructure, tech stack maturity, technical debt, and scalability bottlenecks.",
      deliverables: ["Stack Architecture Audit", "Technical Debt Scorecard", "Scalability Benchmarks"],
    },
    {
      id: "platform-vendor-evaluation",
      number: "02",
      title: "Platform & Vendor Evaluation",
      tag: "Platform Selection",
      description:
        "Objective, vendor-neutral scoring of cloud providers, SaaS tooling, databases, and frameworks without vendor affiliations.",
      deliverables: ["Vendor-Neutral Matrix", "Total Cost of Ownership (TCO)", "Contract & Lock-in Analysis"],
    },
    {
      id: "cloud-infrastructure-strategy",
      number: "03",
      title: "Cloud & Infrastructure Strategy",
      tag: "Cloud & Infrastructure",
      description:
        "Strategic cloud architecture design, serverless and distributed topologies, multi-region failover, and compute cost optimization.",
      deliverables: ["Cloud Topology Design", "High Availability & Failover", "Infrastructure as Code"],
    },
    {
      id: "technical-roadmap-planning",
      number: "04",
      title: "Technical Roadmap & Planning",
      tag: "Roadmap & Strategy",
      description:
        "Structured technical roadmaps aligning architectural decisions, infrastructure milestones, and engineering priorities with business goals.",
      deliverables: ["Phased Technical Roadmap", "Milestone & Dependency Map", "Resource & Tooling Plan"],
    },
    {
      id: "implementation-migration-advisory",
      number: "05",
      title: "Implementation & Migration Advisory",
      tag: "Implementation Advisory",
      description:
        "Hands-on architectural guidance, database migration strategies, cutover runbooks, and risk mitigation for zero-downtime execution.",
      deliverables: ["Cutover Runbooks", "Zero-Downtime Migration", "Team Engineering Enablement"],
    },
  ],
  "career-services": [
    {
      id: "resume-review",
      number: "01",
      title: "Resume Review and Optimization",
      tag: "RESUME AUDIT",
      description:
        "Line-by-line review of content, structure, and keywords with ATS-friendly formatting to match your target roles.",
      deliverables: ["ATS Score Optimization", "Impact-Driven Bullets", "Role Tailoring"],
    },
    {
      id: "linkedin-review",
      number: "02",
      title: "LinkedIn Profile Review",
      tag: "PROFILE REACH",
      description:
        "Recruiter-centric headline, summary, and keyword positioning to increase visibility and meaningful profile engagement.",
      deliverables: ["SEO Keyword Targeting", "Executive Headline", "Featured Portfolio"],
    },
    {
      id: "job-search-strategy",
      number: "03",
      title: "Job Search Strategy",
      tag: "JOB SEARCH STRATEGY",
      description:
        "A structured, personalized plan to identify the right opportunities, reach target companies, and maintain consistent momentum.",
      deliverables: ["Company Target List", "Outreach Templates", "Weekly Action Cadence"],
    },
    {
      id: "application-support",
      number: "04",
      title: "Application Support",
      tag: "APPLICATION SUPPORT",
      description:
        "End-to-end support to create compelling, role-specific applications that highlight your strengths and fit.",
      deliverables: ["Tailored Cover Letters", "Application Tracking", "Follow-up Frameworks"],
    },
    {
      id: "career-guidance",
      number: "05",
      title: "Career Guidance and Direction",
      tag: "CAREER GUIDANCE",
      description:
        "One-on-one advisory on salary negotiation, career positioning, interview readiness, and long-term growth strategy.",
      deliverables: ["Interview Preparation", "Salary Negotiation", "Career Positioning"],
    },
  ],
};

/* =========================================================================
   3D FLOATING DECORATIVE OBJECTS (Vector SVG with Multi-Layer Lighting)
   ========================================================================= */

// Card 01: Floating translucent glass cube + Blue gradient rounded geometric shape
function DecorativeObject01() {
  const uid = useId();
  return (
    <div className="sx-3d-object sx-3d-object-1" aria-hidden="true">
      <svg viewBox="0 0 160 140" className="sx-3d-svg">
        <defs>
          <linearGradient id={`${uid}-capsule`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="25%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <radialGradient id={`${uid}-capsule-gleam`} cx="30%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-cube-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-left`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-right`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient shadow on card surface */}
        <ellipse cx="80" cy="124" rx="46" ry="9" fill="rgba(37, 99, 235, 0.16)" filter="url(#sx-blur-shadow)" />

        {/* Ambient blue back-glow */}
        <circle cx="82" cy="62" r="38" fill="rgba(59, 130, 246, 0.22)" filter="url(#sx-blur-medium)" />

        {/* Blue gradient rounded geometric capsule */}
        <g transform="translate(68, 38) rotate(32)">
          <rect
            x="-18"
            y="-38"
            width="36"
            height="76"
            rx="18"
            fill={`url(#${uid}-capsule)`}
            filter="drop-shadow(0 10px 20px rgba(37, 99, 235, 0.4))"
          />
          <rect x="-18" y="-38" width="36" height="76" rx="18" fill={`url(#${uid}-capsule-gleam)`} />
          {/* Specular highlight stripe */}
          <path
            d="M -8 -26 Q -10 0 -8 26"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Floating translucent glass cube */}
        <g transform="translate(48, 52)">
          {/* Top Face */}
          <polygon
            points="0,-22 28,-7 0,8 -28,-7"
            fill={`url(#${uid}-cube-top)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.4"
          />
          {/* Left Face */}
          <polygon
            points="-28,-7 0,8 0,38 -28,23"
            fill={`url(#${uid}-cube-left)`}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1.2"
          />
          {/* Right Face */}
          <polygon
            points="0,8 28,-7 28,23 0,38"
            fill={`url(#${uid}-cube-right)`}
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
          />
          {/* Internal refractive vertices */}
          <line x1="0" y1="8" x2="0" y2="-22" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" />
          {/* Top specular glint point */}
          <circle cx="0" cy="-22" r="2.2" fill="#ffffff" />
          <circle cx="28" cy="-7" r="1.6" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

// Card 02: Glossy blue floating sphere + Transparent glass circular ring
function DecorativeObject02() {
  const uid = useId();
  return (
    <div className="sx-3d-object sx-3d-object-2" aria-hidden="true">
      <svg viewBox="0 0 160 140" className="sx-3d-svg">
        <defs>
          <radialGradient id={`${uid}-sphere`} cx="34%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="12%" stopColor="#93c5fd" />
            <stop offset="42%" stopColor="#3b82f6" />
            <stop offset="78%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          <radialGradient id={`${uid}-purple-rim`} cx="85%" cy="85%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-ring-back`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`${uid}-ring-front`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#bfdbfe" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="80" cy="124" rx="44" ry="9" fill="rgba(37, 99, 235, 0.16)" filter="url(#sx-blur-shadow)" />

        {/* Ambient back-glow */}
        <circle cx="80" cy="62" r="38" fill="rgba(59, 130, 246, 0.24)" filter="url(#sx-blur-medium)" />

        {/* Ring BACK arc (behind sphere) */}
        <g transform="translate(80, 64) rotate(-22)">
          <path
            d="M -54 0 A 54 18 0 0 1 54 0"
            fill="none"
            stroke={`url(#${uid}-ring-back)`}
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M -54 0 A 54 18 0 0 1 54 0"
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
          />
        </g>

        {/* Glossy blue floating sphere */}
        <g transform="translate(80, 62)">
          <circle
            cx="0"
            cy="0"
            r="30"
            fill={`url(#${uid}-sphere)`}
            filter="drop-shadow(0 12px 24px rgba(37, 99, 235, 0.45))"
          />
          <circle cx="0" cy="0" r="30" fill={`url(#${uid}-purple-rim)`} />
          {/* Specular highlight point */}
          <ellipse cx="-10" cy="-10" rx="9" ry="5.5" transform="rotate(-30 -10 -10)" fill="#ffffff" opacity="0.85" />
          <circle cx="-5" cy="-6" r="2.5" fill="#ffffff" />
        </g>

        {/* Ring FRONT arc (in front of sphere) */}
        <g transform="translate(80, 64) rotate(-22)">
          <path
            d="M 54 0 A 54 18 0 0 1 -54 0"
            fill="none"
            stroke={`url(#${uid}-ring-front)`}
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* Crisp specular rim on glass ring */}
          <path
            d="M 50 2 A 50 16 0 0 1 -50 2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Glass edge glints */}
          <circle cx="48" cy="4" r="2" fill="#ffffff" />
          <circle cx="-48" cy="-4" r="1.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Card 03 (Central Focal Point): Large blue glass geometric object + Layered translucent glass cubes
function DecorativeObject03() {
  const uid = useId();
  return (
    <div className="sx-3d-object sx-3d-object-3" aria-hidden="true">
      <svg viewBox="0 0 180 155" className="sx-3d-svg">
        <defs>
          <linearGradient id={`${uid}-jewel-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id={`${uid}-jewel-front`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id={`${uid}-jewel-side`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="60%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id={`${uid}-jewel-right`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id={`${uid}-crystal-glow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-glass-cube1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow (larger, deeper for focal prominence) */}
        <ellipse cx="90" cy="138" rx="58" ry="11" fill="rgba(37, 99, 235, 0.22)" filter="url(#sx-blur-shadow)" />

        {/* High-intensity ambient center bloom */}
        <circle cx="90" cy="68" r="48" fill="rgba(59, 130, 246, 0.32)" filter="url(#sx-blur-medium)" />
        <circle cx="90" cy="68" r="28" fill="rgba(168, 85, 247, 0.25)" filter="url(#sx-blur-medium)" />

        {/* Floating background glass cube (Left) */}
        <g transform="translate(42, 42) rotate(-18) scale(0.65)">
          <polygon points="0,-22 28,-7 0,8 -28,-7" fill={`url(#${uid}-glass-cube1)`} stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.5" />
          <polygon points="-28,-7 0,8 0,38 -28,23" fill="rgba(147, 197, 253, 0.4)" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
          <polygon points="0,8 28,-7 28,23 0,38" fill="rgba(96, 165, 250, 0.5)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
        </g>

        {/* Floating background glass cube (Right) */}
        <g transform="translate(140, 84) rotate(24) scale(0.52)">
          <polygon points="0,-22 28,-7 0,8 -28,-7" fill={`url(#${uid}-glass-cube1)`} stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.5" />
          <polygon points="-28,-7 0,8 0,38 -28,23" fill="rgba(168, 85, 247, 0.35)" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
          <polygon points="0,8 28,-7 28,23 0,38" fill="rgba(59, 130, 246, 0.45)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
        </g>

        {/* Large Blue Glass Geometric Polyhedron / Jewel */}
        <g transform="translate(90, 68)">
          {/* Top Apex Facet */}
          <polygon
            points="0,-38 32,-18 0,0 -32,-18"
            fill={`url(#${uid}-jewel-top)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.6"
          />
          {/* Front Left Facet */}
          <polygon
            points="-32,-18 0,0 0,36 -34,16"
            fill={`url(#${uid}-jewel-front)`}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1.3"
          />
          {/* Front Right Facet */}
          <polygon
            points="0,0 32,-18 34,16 0,36"
            fill={`url(#${uid}-jewel-right)`}
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.3"
          />
          {/* Bottom Pyramid Tip */}
          <polygon
            points="-34,16 0,36 0,46 -18,32"
            fill={`url(#${uid}-jewel-side)`}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.2"
          />
          <polygon
            points="0,36 34,16 18,32 0,46"
            fill={`url(#${uid}-jewel-side)`}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.2"
          />
          {/* Specular central crystal glint */}
          <line x1="0" y1="0" x2="0" y2="36" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
          <circle cx="0" cy="-38" r="2.5" fill="#ffffff" />
          <circle cx="32" cy="-18" r="2" fill="#ffffff" />
          <circle cx="-32" cy="-18" r="2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Card 04: Floating blue triangular glass object + Transparent rounded glass shell
function DecorativeObject04() {
  const uid = useId();
  return (
    <div className="sx-3d-object sx-3d-object-4" aria-hidden="true">
      <svg viewBox="0 0 160 140" className="sx-3d-svg">
        <defs>
          <linearGradient id={`${uid}-shell`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#bfdbfe" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${uid}-prism-left`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id={`${uid}-prism-right`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id={`${uid}-prism-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="80" cy="124" rx="44" ry="9" fill="rgba(37, 99, 235, 0.16)" filter="url(#sx-blur-shadow)" />

        {/* Ambient blue back-glow */}
        <circle cx="80" cy="62" r="38" fill="rgba(59, 130, 246, 0.22)" filter="url(#sx-blur-medium)" />

        {/* Transparent Rounded Glass Shell / Dome (Capsule Backing) */}
        <g transform="translate(80, 62)">
          <path
            d="M -38 18 C -42 -22 -18 -42 0 -42 C 18 -42 42 -22 38 18 C 36 34 22 42 0 42 C -22 42 -36 34 -38 18 Z"
            fill={`url(#${uid}-shell)`}
            stroke="rgba(255, 255, 255, 0.88)"
            strokeWidth="1.6"
            filter="drop-shadow(0 8px 18px rgba(37, 99, 235, 0.2))"
          />
          {/* Specular curved reflection on glass shell */}
          <path
            d="M -26 -14 C -18 -32 0 -36 12 -36"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Floating Blue Triangular Glass Object (Prism) */}
        <g transform="translate(80, 60)">
          {/* Left Facet */}
          <polygon
            points="0,-32 -26,18 0,26"
            fill={`url(#${uid}-prism-left)`}
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
          />
          {/* Right Facet */}
          <polygon
            points="0,-32 0,26 26,18"
            fill={`url(#${uid}-prism-right)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.4"
          />
          {/* Bottom Facet */}
          <polygon
            points="-26,18 0,26 26,18 0,14"
            fill={`url(#${uid}-prism-base)`}
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1"
          />
          {/* Sharp Center Specular Ridge */}
          <line x1="0" y1="-32" x2="0" y2="26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="0" cy="-32" r="2.4" fill="#ffffff" />
          <circle cx="-26" cy="18" r="1.6" fill="#ffffff" />
          <circle cx="26" cy="18" r="1.6" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

// Card 05: Blue gradient floating sphere + Small translucent glass cube
function DecorativeObject05() {
  const uid = useId();
  return (
    <div className="sx-3d-object sx-3d-object-5" aria-hidden="true">
      <svg viewBox="0 0 160 140" className="sx-3d-svg">
        <defs>
          <radialGradient id={`${uid}-orb`} cx="32%" cy="26%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="80%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </radialGradient>
          <linearGradient id={`${uid}-cube-face1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-face2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${uid}-cube-face3`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Ambient ground shadow */}
        <ellipse cx="80" cy="124" rx="44" ry="9" fill="rgba(37, 99, 235, 0.16)" filter="url(#sx-blur-shadow)" />

        {/* Ambient blue back-glow */}
        <circle cx="80" cy="64" r="38" fill="rgba(59, 130, 246, 0.22)" filter="url(#sx-blur-medium)" />

        {/* Main Blue Gradient Floating Orb / Sphere */}
        <g transform="translate(74, 66)">
          <circle
            cx="0"
            cy="0"
            r="28"
            fill={`url(#${uid}-orb)`}
            filter="drop-shadow(0 12px 24px rgba(37, 99, 235, 0.45))"
          />
          {/* Specular gleam */}
          <ellipse cx="-9" cy="-9" rx="8" ry="5" transform="rotate(-30 -9 -9)" fill="#ffffff" opacity="0.85" />
          <circle cx="-5" cy="-5" r="2.2" fill="#ffffff" />
        </g>

        {/* Small Translucent Glass Cube (Floating slightly ahead and to top-right) */}
        <g transform="translate(108, 46) rotate(16)">
          <polygon
            points="0,-16 18,-5 0,6 -18,-5"
            fill={`url(#${uid}-cube-face1)`}
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="1.3"
          />
          <polygon
            points="-18,-5 0,6 0,28 -18,17"
            fill={`url(#${uid}-cube-face2)`}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1.1"
          />
          <polygon
            points="0,6 18,-5 18,17 0,28"
            fill={`url(#${uid}-cube-face3)`}
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.1"
          />
          <circle cx="0" cy="-16" r="1.8" fill="#ffffff" />
          <circle cx="18" cy="-5" r="1.4" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

function DecorativeObject({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <DecorativeObject01 />;
    case 1:
      return <DecorativeObject02 />;
    case 2:
      return <DecorativeObject03 />;
    case 3:
      return <DecorativeObject04 />;
    case 4:
      return <DecorativeObject05 />;
    default:
      return <DecorativeObject01 />;
  }
}

/* =========================================================================
   MAIN BUSINESS ENGAGEMENT CARDS COMPONENT
   ========================================================================= */

export function BusinessEngagementCards({ service }: { service?: Service } = {}) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselActiveIdx, setCarouselActiveIdx] = useState(2); // default center card

  const slug = service?.slug ?? "business-enablement";
  const isTechConsulting = slug === "technology-consulting";
  const isCareerServices = slug === "career-services";
  const engagementList = ENGAGEMENTS_BY_SLUG[slug] ?? ENGAGEMENTS_BY_SLUG["business-enablement"];

  // IntersectionObserver for entrance animation
  useEffect(() => {
    const el = sectionRef.current;
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

  // Mouse tilt & parallax tracking (smooth with requestAnimationFrame)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check fine pointer to only run on desktop
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, x));
      targetY = Math.max(-0.5, Math.min(0.5, y));

      // Spotlight coordinates in px
      el.style.setProperty("--sx-spotlight-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--sx-spotlight-y", `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.setProperty("--sx-spotlight-x", "50%");
      el.style.setProperty("--sx-spotlight-y", "45%");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      el.style.setProperty("--sx-mouse-x", currentX.toFixed(4));
      el.style.setProperty("--sx-mouse-y", currentY.toFixed(4));

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

  const [activeNodeIdx, setActiveNodeIdx] = useState<number | null>(null);

  // Update carousel active dot on mobile scroll
  const handleCarouselScroll = () => {
    const c = carouselRef.current;
    if (!c) return;
    const cardWidth = 300;
    const scrollPos = c.scrollLeft;
    const idx = Math.round(scrollPos / cardWidth);
    const clamped = Math.max(0, Math.min(4, idx));
    setCarouselActiveIdx(clamped);
    setActiveNodeIdx(clamped);
  };

  const scrollToCard = (index: number) => {
    const c = carouselRef.current;
    if (!c) return;
    const cardEl = c.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setCarouselActiveIdx(index);
      setActiveNodeIdx(index);
      cardEl.focus({ preventScroll: true });
    }
  };

  const handleNodeSelect = (index: number) => {
    setActiveNodeIdx(index);
    scrollToCard(index);
  };

  return (
    <div
      ref={sectionRef}
      className={`sx-business-cards-section ${inView ? "sx-in-view" : ""}`}
      aria-label="Typical Engagements interactive cards"
    >
      {/* SVG Global Filters for high-performance blur/shadow */}
      <svg className="sx-svg-filters" aria-hidden="true">
        <defs>
          <filter id="sx-blur-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <filter id="sx-blur-medium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>
        </defs>
      </svg>

      {/* =========================================================================
          BACKGROUND DESIGN: Soft Lavender-Blue Gradient, Digital Wave & Ambient Light
          ========================================================================= */}
      <div className="sx-bg-decorations" aria-hidden="true">
        {/* Soft blue spotlight tracking the cursor */}
        <div className="sx-bg-spotlight" />

        {/* Ambient blue center lighting */}
        <div className="sx-bg-center-glow" />

        {/* Thin white diagonal geometric lines pattern */}
        <div className="sx-bg-diagonal-lines" />

        {/* Subtle animated flowing digital wave mesh with glowing particles */}
        {(isTechConsulting || isCareerServices) && <DigitalWaveCanvas inView={inView} />}

        {/* Gentle floating translucent circles / bokeh */}
        <div className="sx-bokeh sx-bokeh-1" />
        <div className="sx-bokeh sx-bokeh-2" />
        <div className="sx-bokeh sx-bokeh-3" />
        <div className="sx-bokeh sx-bokeh-4" />
      </div>

      {/* =========================================================================
          CONNECTED TECHNOLOGY & CAREER NETWORKS (Curved line & floating nodes)
          ========================================================================= */}
      {isTechConsulting && <ConnectedTechnologyNetwork inView={inView} />}
      {isCareerServices && (
        <ConnectedCareerNetwork
          inView={inView}
          activeNodeIdx={activeNodeIdx}
          onNodeClick={handleNodeSelect}
        />
      )}

      {/* =========================================================================
          FIVE FLOATING CARDS CONTAINER (Horizontal Arrangement with Center Focal Point)
          ========================================================================= */}
      <div
        ref={carouselRef}
        onScroll={handleCarouselScroll}
        className="sx-floating-cards-track"
        role="region"
        aria-label="Services cards carousel"
      >
        {engagementList.map((card, index) => {
          return (
            <div
              key={card.id}
              tabIndex={0}
              role="region"
              aria-label={card.title}
              className={`sx-floating-card sx-card-idx-${index}`}
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
              onMouseEnter={() => setActiveNodeIdx(index)}
              onMouseLeave={() => setActiveNodeIdx(null)}
              onFocus={() => setActiveNodeIdx(index)}
              onBlur={() => setActiveNodeIdx(null)}
            >
              {/* Internal Card Frosted Highlight Border & Glow */}
              <div className="sx-card-border-glow" aria-hidden="true" />

              {/* Holographic Scanning Light Sweep on Hover */}
              <div className="sx-card-scan-line" aria-hidden="true" />

              {/* Ambient Floating Motion Container (Pauses when card is hovered) */}
              <div className="sx-card-ambient">
                {/* 3D Floating Decorative Object */}
                <div className="sx-card-object-stage">
                  <DecorativeObject index={index} />
                </div>

                {/* Card Header: Pill Badge & Engagement Number */}
                <div className="sx-card-header">
                  <div className="sx-card-badge">
                    <span className="sx-card-icon-wrap" aria-hidden="true">
                      <EngagementIcon index={index} slug={slug} />
                    </span>
                    <span className="sx-card-tag">{card.tag}</span>
                  </div>
                  <div className="sx-card-number">
                    <span className="sx-card-number-prefix">0</span>
                    <span className="sx-card-number-val">{index + 1}</span>
                  </div>
                </div>

                {/* Card Body: Title & Readable Typography */}
                <div className="sx-card-body">
                  <h3 className="sx-card-title">{card.title}</h3>
                  <p className="sx-card-desc">{card.description}</p>
                </div>

                {/* Card Footer: Structured Deliverables Tags */}
                <div className="sx-card-footer">
                  <div className="sx-deliverable-chips">
                    {card.deliverables.map((item, dIdx) => (
                      <span key={dIdx} className="sx-deliverable-chip">
                        <span className="sx-chip-dot" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Pagination Dot Indicators */}
      <div className="sx-carousel-dots" aria-hidden="true">
        {engagementList.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className={`sx-dot ${carouselActiveIdx === i ? "active" : ""}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      {/* =========================================================================
          SCOPED STYLING: Hardware Accelerated 3D Transforms, Glows & Responsive Rules
          ========================================================================= */}
      <style>{`
        /* Global SVG Filters Utility (hidden visually) */
        .sx-svg-filters {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        /* Section Container & Immediate Background - Full Screen Viewport Width */
        .sx-business-cards-section {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          padding: 60px 0 85px;
          margin-top: 25px;
          margin-bottom: 50px;
          background: linear-gradient(180deg, #f8fafc 0%, #f0f4ff 50%, #f8fafc 100%);
          border-top: 1px solid rgba(226, 232, 240, 0.9);
          border-bottom: 1px solid rgba(226, 232, 240, 0.9);
          border-left: none;
          border-right: none;
          border-radius: 0;
          overflow: hidden;
          perspective: 1400px;
          --sx-mouse-x: 0;
          --sx-mouse-y: 0;
          --sx-spotlight-x: 50%;
          --sx-spotlight-y: 45%;
        }

        /* Background Decorations */
        .sx-bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* Mouse-driven spotlight */
        .sx-bg-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            750px circle at var(--sx-spotlight-x) var(--sx-spotlight-y),
            rgba(59, 130, 246, 0.14) 0%,
            rgba(99, 102, 241, 0.05) 45%,
            transparent 70%
          );
          opacity: 0.9;
          transition: opacity 0.4s ease;
        }

        /* Soft central ambient lighting */
        .sx-bg-center-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 820px;
          height: 380px;
          background: radial-gradient(
            ellipse,
            rgba(59, 130, 246, 0.18) 0%,
            rgba(168, 85, 247, 0.08) 40%,
            transparent 72%
          );
          filter: blur(40px);
        }

        /* Thin white diagonal geometric lines pattern */
        .sx-bg-diagonal-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.6) 0px,
            rgba(255, 255, 255, 0.6) 1.5px,
            transparent 1.5px,
            transparent 42px
          );
          mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%);
          opacity: 0.65;
        }

        /* Translucent Bokeh Circles with Floating Keyframes */
        .sx-bokeh {
          position: absolute;
          border-radius: 50%;
          filter: blur(28px);
          opacity: 0.45;
          will-change: transform;
        }
        .sx-bokeh-1 {
          width: 220px;
          height: 220px;
          top: 10%;
          left: 8%;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.65) 0%, transparent 70%);
          animation: sxBokehFloat 12s ease-in-out infinite alternate;
        }
        .sx-bokeh-2 {
          width: 180px;
          height: 180px;
          bottom: 12%;
          left: 28%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, transparent 70%);
          animation: sxBokehFloat 15s ease-in-out infinite alternate-reverse;
        }
        .sx-bokeh-3 {
          width: 240px;
          height: 240px;
          top: 15%;
          right: 12%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%);
          animation: sxBokehFloat 14s ease-in-out infinite alternate;
        }
        .sx-bokeh-4 {
          width: 160px;
          height: 160px;
          bottom: 15%;
          right: 32%;
          background: radial-gradient(circle, rgba(129, 140, 248, 0.45) 0%, transparent 70%);
          animation: sxBokehFloat 16s ease-in-out infinite alternate-reverse;
        }

        @keyframes sxBokehFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(24px, -28px, 0);
          }
        }

        /* =========================================================================
           CARDS TRACK (Full Viewport Spacing & Sizing)
           ========================================================================= */
        .sx-floating-cards-track {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(14px, 1.8vw, 24px);
          padding: 24px clamp(20px, 3.5vw, 60px) 30px;
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Ambient Floating Motion Container (gentle bobbing for natural floating layout) */
        .sx-card-ambient {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          will-change: transform;
        }

        .sx-card-idx-0 .sx-card-ambient {
          animation: sxCardFloat0 6.6s ease-in-out infinite alternate;
        }
        .sx-card-idx-1 .sx-card-ambient {
          animation: sxCardFloat1 7.8s ease-in-out infinite alternate -2.2s;
        }
        .sx-card-idx-2 .sx-card-ambient {
          animation: sxCardFloat2 6.0s ease-in-out infinite alternate -1.1s;
        }
        .sx-card-idx-3 .sx-card-ambient {
          animation: sxCardFloat3 8.2s ease-in-out infinite alternate -3.4s;
        }
        .sx-card-idx-4 .sx-card-ambient {
          animation: sxCardFloat4 7.2s ease-in-out infinite alternate -1.7s;
        }

        @keyframes sxCardFloat0 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }
        @keyframes sxCardFloat1 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(6px); }
        }
        @keyframes sxCardFloat2 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes sxCardFloat3 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(7px); }
        }
        @keyframes sxCardFloat4 {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }

        /* Common Card Appearance: White Translucent Glassmorphic - ALL 5 CARDS EQUAL SIZES */
        .sx-floating-card {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1 1 0;
          min-width: 215px;
          max-width: 260px;
          height: 480px;
          min-height: 480px;
          padding: 24px 20px 22px;
          box-sizing: border-box;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 18px 40px -12px rgba(15, 23, 42, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.02),
            0 0 0 1px rgba(226, 232, 240, 0.75),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          cursor: pointer;
          user-select: none;
          text-align: left;
          outline: none;
          transform-style: preserve-3d;
          will-change: transform, box-shadow, border-color;
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.42s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.32s ease,
            background 0.3s ease;
        }

        /* Keyboard Focus Visible */
        .sx-floating-card:focus-visible {
          border-color: var(--sx-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35), 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        /* Scroll In-View Entrance Animation */
        .sx-business-cards-section.sx-in-view .sx-floating-card {
          opacity: 1;
        }

        /* Natural Floating Resting Positions & Alternating Rotations (-2deg to +2deg) */
        .sx-business-cards-section.sx-in-view .sx-card-idx-0 {
          --sx-base-rot: -1.8deg;
          --sx-base-y: 6px;
          margin-right: 2px;
          z-index: 2;
        }
        .sx-business-cards-section.sx-in-view .sx-card-idx-1 {
          --sx-base-rot: 1.2deg;
          --sx-base-y: -8px;
          margin-left: 2px;
          margin-right: 5px;
          z-index: 3;
        }
        .sx-business-cards-section.sx-in-view .sx-card-idx-2 {
          --sx-base-rot: -0.5deg;
          --sx-base-y: 4px;
          margin-left: 3px;
          margin-right: 3px;
          z-index: 2;
        }
        .sx-business-cards-section.sx-in-view .sx-card-idx-3 {
          --sx-base-rot: 1.6deg;
          --sx-base-y: -6px;
          margin-left: 5px;
          margin-right: 2px;
          z-index: 3;
        }
        .sx-business-cards-section.sx-in-view .sx-card-idx-4 {
          --sx-base-rot: -1.3deg;
          --sx-base-y: 8px;
          margin-left: 2px;
          z-index: 2;
        }

        /* Default resting 3D transform for all cards */
        .sx-business-cards-section.sx-in-view .sx-floating-card {
          transform: perspective(1200px)
            rotateZ(var(--sx-base-rot, 0deg))
            translateY(var(--sx-base-y, 0px))
            rotateY(calc(var(--sx-mouse-x) * 5.5deg))
            rotateX(calc(var(--sx-mouse-y) * -4.5deg));
        }

        /* =========================================================================
           DYNAMIC HOVER FOCUS (Identical Spring Scale ~1.08 For Whichever Card Is Hovered)
           ========================================================================= */
        @media (hover: hover) and (pointer: fine) {
          .sx-business-cards-section.sx-in-view .sx-floating-card:hover {
            transform: perspective(1200px)
              rotateZ(0deg)
              translateY(-14px)
              scale(1.08)
              rotateY(calc(var(--sx-mouse-x) * 7.5deg))
              rotateX(calc(var(--sx-mouse-y) * -5.5deg)) !important;
            z-index: 30 !important;
            border-color: rgba(37, 99, 235, 0.85) !important;
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow:
              0 32px 70px -12px rgba(37, 99, 235, 0.35),
              0 0 32px rgba(59, 130, 246, 0.32),
              0 0 0 1.5px rgba(37, 99, 235, 0.65),
              inset 0 0 20px rgba(59, 130, 246, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 1) !important;
          }

          /* Subtle Holographic Scanning Light Sweep on Hover */
          .sx-card-scan-line {
            position: absolute;
            inset: 0;
            border-radius: 22px;
            overflow: hidden;
            pointer-events: none;
            z-index: 6;
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
              rgba(59, 130, 246, 0.24) 50%,
              rgba(255, 255, 255, 0.55) 52%,
              rgba(59, 130, 246, 0.18) 55%,
              transparent 100%
            );
            transform: rotate(22deg);
            opacity: 0;
          }

          .sx-floating-card:hover .sx-card-scan-line {
            opacity: 1;
          }

          .sx-floating-card:hover .sx-card-scan-line::before {
            opacity: 1;
            animation: sxScanSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          @keyframes sxScanSweep {
            0% {
              transform: translateY(-80%) rotate(22deg);
            }
            100% {
              transform: translateY(320%) rotate(22deg);
            }
          }

          /* Pause ambient bob on the hovered card so text stays steady & crisp */
          .sx-floating-card:hover .sx-card-ambient {
            animation-play-state: paused;
          }

          .sx-floating-card:hover .sx-card-number {
            color: var(--sx-blue);
          }

          /* 3D Decorative Object becomes slightly larger and more responsive on hover */
          .sx-floating-card:hover .sx-3d-object {
            transform: translate3d(
              calc(var(--sx-mouse-x) * 18px),
              calc(var(--sx-mouse-y) * 12px),
              35px
            ) scale(1.12) !important;
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          .sx-floating-card:hover .sx-3d-object svg {
            filter: drop-shadow(0 14px 28px rgba(37, 99, 235, 0.42));
            animation: sxIconHoverGentleFloat 3.4s ease-in-out infinite alternate !important;
          }

          @keyframes sxIconHoverGentleFloat {
            0% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-6px) rotate(2.5deg) scale(1.03);
            }
            100% {
              transform: translateY(-2px) rotate(-2deg) scale(1.02);
            }
          }
        }

        /* Card Top Stage: 3D Object Container with Parallax & Float */
        .sx-card-object-stage {
          position: relative;
          width: 100%;
          height: 105px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .sx-3d-object {
          position: absolute;
          width: 125px;
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
          /* Parallax floating with mouse tracking */
          transform: translate3d(
            calc(var(--sx-mouse-x) * 10px),
            calc(var(--sx-mouse-y) * 6px),
            16px
          );
          transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-3d-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Individual Natural Floating Keyframes for each 3D Object */
        .sx-3d-object-1 svg {
          animation: sxFloat01 4.8s ease-in-out infinite alternate;
        }
        .sx-3d-object-2 svg {
          animation: sxFloat02 5.5s ease-in-out infinite alternate;
        }
        .sx-3d-object-3 svg {
          animation: sxFloat03 4.2s ease-in-out infinite alternate;
        }
        .sx-3d-object-4 svg {
          animation: sxFloat04 5.2s ease-in-out infinite alternate;
        }
        .sx-3d-object-5 svg {
          animation: sxFloat05 4.6s ease-in-out infinite alternate;
        }

        @keyframes sxFloat01 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(2px, -11px, 0) rotate(2deg);
          }
        }
        @keyframes sxFloat02 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(-3px, -13px, 0) rotate(-2deg);
          }
        }
        @keyframes sxFloat03 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(0, -15px, 0) scale(1.03);
          }
        }
        @keyframes sxFloat04 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(3px, -12px, 0) rotate(-1.5deg);
          }
        }
        @keyframes sxFloat05 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(-2px, -11px, 0) rotate(2.5deg);
          }
        }

        /* Card Header: Badge & Number */
        .sx-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .sx-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 7px 3px 5px;
          border-radius: 9999px;
          background: rgba(239, 246, 255, 0.85);
          border: 1px solid rgba(191, 219, 254, 0.8);
        }

        .sx-card-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--sx-blue);
          color: #ffffff;
        }
        .sx-card-icon-wrap svg {
          width: 11px;
          height: 11px;
        }

        .sx-card-tag {
          font-size: 9.5px;
          font-weight: 600;
          color: var(--sx-blue);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .sx-card-number {
          font-family: var(--font-heading, inherit);
          font-size: 16px;
          font-weight: 700;
          color: rgba(148, 163, 184, 0.65);
          letter-spacing: -0.03em;
        }
        .sx-floating-card:focus-visible .sx-card-number {
          color: var(--sx-blue);
        }

        /* Card Body: Title & Description */
        .sx-card-body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }

        .sx-card-title {
          font-size: 13.5px;
          font-weight: 650;
          line-height: 1.35;
          color: var(--sx-text);
          letter-spacing: -0.015em;
          margin: 0 0 8px;
          min-height: 38px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sx-card-desc {
          font-size: 11.5px;
          line-height: 1.48;
          color: var(--sx-text-muted);
          margin: 0 0 12px;
          min-height: 52px;
        }

        /* Card Footer: Deliverables */
        .sx-card-footer {
          margin-top: auto;
          padding-top: 10px;
          flex-shrink: 0;
        }

        .sx-deliverable-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 0;
          min-height: 52px;
          align-content: flex-start;
        }

        .sx-deliverable-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9.5px;
          font-weight: 500;
          color: #475569;
          background: rgba(241, 245, 249, 0.85);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(226, 232, 240, 0.7);
        }

        .sx-chip-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--sx-blue);
          opacity: 0.8;
        }

        /* Mobile Dot Indicators (Hidden on Desktop) */
        .sx-carousel-dots {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .sx-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.4);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .sx-dot.active {
          width: 24px;
          border-radius: 6px;
          background: var(--sx-blue);
        }

        /* =========================================================================
           RESPONSIVE BREAKPOINTS
           ========================================================================= */

        /* Tablet (1024px down to 768px) */
        @media (max-width: 1099px) and (min-width: 768px) {
          .sx-floating-cards-track {
            gap: 8px;
            padding: 24px 8px 18px;
          }
          .sx-floating-card {
            min-width: 0;
            padding: 16px 11px 14px;
            height: 440px;
            min-height: 440px;
          }
          .sx-card-title {
            font-size: 13px;
            min-height: 36px;
          }
          .sx-card-desc {
            font-size: 11px;
            min-height: 48px;
          }
          .sx-deliverable-chips {
            min-height: 48px;
          }
        }

        /* Mobile Screen (< 768px): Swipeable Snap Carousel */
        @media (max-width: 767px) {
          .sx-business-cards-section {
            padding: 30px 0 40px;
            margin: 10px -16px 0;
            border-radius: 18px;
            perspective: none;
          }
          .sx-floating-cards-track {
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding: 20px 20px 24px;
            gap: 14px;
            scrollbar-width: none;
          }
          .sx-floating-cards-track::-webkit-scrollbar {
            display: none;
          }
          .sx-floating-card {
            flex: 0 0 82vw;
            min-width: 280px;
            max-width: 320px;
            height: 430px;
            min-height: 430px;
            scroll-snap-align: center;
            opacity: 1 !important;
            transform: none !important;
          }
          .sx-card-desc {
            min-height: unset;
          }
          .sx-deliverable-chips {
            min-height: unset;
          }
          .sx-carousel-dots {
            display: flex;
          }
          .sx-card-ambient {
            animation: none !important;
          }
          .sx-3d-object {
            transform: none !important;
          }
        }

        /* Reduced Motion Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .sx-3d-object svg,
          .sx-bokeh,
          .sx-card-ambient,
          .sx-card-scan-line::before {
            animation: none !important;
          }
          .sx-floating-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BusinessEngagementCards;
