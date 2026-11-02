"use client";

import Link from "next/link";
import { eyebrow, pageH1 } from "../lib/theme";
import type { Service } from "../data/services";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Reveal } from "./ui/Reveal";
import { Aurora, type AuroraVariant } from "./ui/Aurora";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { FloatingBubbles } from "./ui/FloatingBubbles";
import { BusinessEngagementCards } from "./BusinessEngagementCards";
import { BusinessOutcomeFlipCards } from "./BusinessOutcomeFlipCards";
import { BusinessEngagementPillars } from "./BusinessEngagementPillars";
import { HeroLivingDashboard } from "./HeroLivingDashboard";

const AURORA_BY_SLUG: Record<string, AuroraVariant> = {
  "business-enablement": "business",
  "technology-consulting": "technology",
  "career-services": "career",
};

const RESOURCE_LINK_BY_SLUG: Record<string, string> = {
  "business-enablement": "Business resources",
  "technology-consulting": "Technology resources",
  "career-services": "Career resources",
};

const ENGAGEMENTS_SUBTITLE_BY_SLUG: Record<string, string> = {
  "business-enablement": "Focused, practical projects configured to your business stage and operational needs.",
  "technology-consulting": "Focused, practical engagements configured to your architecture, platform, and operational needs.",
  "career-services":
    "Personalized career support to strengthen your professional profile, navigate job opportunities, and move confidently toward your next career goal.",
};

const OUTCOMES_SUBTITLE_BY_SLUG: Record<string, string> = {
  "business-enablement": "Clear, measurable shifts in your digital footprint and day-to-day workflow.",
  "technology-consulting": "Clearer technology decisions, reduced implementation risks, and a stronger technical foundation for growth.",
  "career-services": "Clear, measurable shifts in your career positioning and application trajectory.",
};

// Approved capability highlights for Service 01 (Business Enablement)
const CAPABILITY_PILLARS = [
  {
    category: "Web & Digital Presence",
    headline: "Modern Web Foundations",
    detail: "Fast, accessible, search-optimized web architectures built on Next.js and clean design systems.",
    deliverables: ["Responsive marketing site", "SEO & OpenGraph configuration", "Core Web Vitals tuning"],
  },
  {
    category: "Discovery & Local Reach",
    headline: "Search & Profile Authority",
    detail: "Direct local visibility setup ensuring customers find verified contact info, hours, and catalog details.",
    deliverables: ["Google Business Profile setup", "Domain & DNS configuration", "Structured Schema metadata"],
  },
  {
    category: "Workflow & Operations",
    headline: "Operational Streamlining",
    detail: "Connecting client communications, inquiries, and booking processes to eliminate manual friction.",
    deliverables: ["Inquiry & booking pipelines", "Workflow automation integration", "Team tooling alignment"],
  },
];

// Curated icons for Typical Engagements
export function EngagementIcon({ index }: { index: number }) {
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

export function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <main className="sx-service-detail" data-service={service.slug}>
      <FloatingBubbles />
      {/* Global background bubbles */}
      <Aurora variant={AURORA_BY_SLUG[service.slug] ?? "homepage"} />

      {/* ============================================================
          HERO SECTION: Modern Digital Agency Aesthetic
          ============================================================ */}
      <section className="sx-service-detail-hero">

        {/* Subtle decorative mesh grid background */}
        <div className="sx-service-hero-mesh" aria-hidden="true" />

        <div className="sx-container sx-service-detail-hero-content">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />

          <div className="sx-service-detail-hero-grid">
            {/* Left Column: Typography, Eyebrow & Two CTAs */}
            <div className="sx-service-detail-heading">
              <Reveal>
                <div className="sx-service-detail-eyebrow" style={eyebrow}>
                  <span className="sx-service-badge">
                    <span className="sx-service-badge-dot" aria-hidden="true" />
                    Service {service.number}
                  </span>
                  <span className="sx-service-badge-sub">Solvrex Practice</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="sx-service-detail-title" style={pageH1}>
                  {service.h1}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="sx-service-detail-overview">
                  {service.overview}
                </p>
              </Reveal>

              {/* Two CTA Buttons */}
              <Reveal delay={300}>
                <div className="sx-service-detail-cta-group">
                  <PrimaryLink href="/book">
                    Book a consultation
                    <ArrowRight />
                  </PrimaryLink>
                  <PrimaryLink href="/pricing" variant="outline">
                    View Pricing
                  </PrimaryLink>
                </div>
              </Reveal>

              {/* Trust & Guarantee Micro-bar */}
              <Reveal delay={350}>
                <div className="sx-service-hero-guarantees" aria-label="Engagement characteristics">
                  <div className="sx-hero-guarantee-item">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M13.5 4.5l-7 7L3 8" stroke="var(--sx-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Independent & Objective</span>
                  </div>
                  <div className="sx-hero-guarantee-item">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M13.5 4.5l-7 7L3 8" stroke="var(--sx-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Fixed Scope & Timelines</span>
                  </div>
                  <div className="sx-hero-guarantee-item">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M13.5 4.5l-7 7L3 8" stroke="var(--sx-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Direct Senior Oversight</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Premium Interactive Website / Living Dashboard Visual */}
            <Reveal delay={250}>
              <div className="sx-service-detail-visual" aria-hidden="true">
                <HeroLivingDashboard service={service} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          TYPICAL ENGAGEMENTS: Refined Cards with Icons & Smooth Hover
          ============================================================ */}
      <section
        className="sx-service-detail-content"
        id="typical-engagements"
        style={{ scrollMarginTop: "100px" }}
        aria-label="Service engagements"
      >
        <div className="sx-container">
          <div className="sx-service-detail-section">
            <div className="sx-section-intro">
              <Reveal>
                <p className="sx-section-kicker" style={eyebrow}>What We Deliver</p>
                <h2 className="sx-service-section-title">Typical Engagements</h2>
                <p className="sx-section-sub">
                  {ENGAGEMENTS_SUBTITLE_BY_SLUG[service.slug] ?? "Focused, practical projects configured to your business stage and operational needs."}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <BusinessEngagementCards service={service} />

        <div className="sx-container">

          {/* ============================================================
              EXPECTED OUTCOMES: Distinct, Premium Visual Treatment
              ============================================================ */}
          <div className="sx-service-detail-section sx-service-outcomes-section">
            <div className="sx-section-intro">
              <Reveal>
                <p className="sx-section-kicker" style={eyebrow}>Real-World Impact</p>
                <h2 className="sx-service-section-title">Expected Outcomes</h2>
                <p className="sx-section-sub">
                  {OUTCOMES_SUBTITLE_BY_SLUG[service.slug] ?? "Clear, measurable shifts in your digital footprint and day-to-day workflow."}
                </p>
              </Reveal>
            </div>

            <BusinessOutcomeFlipCards service={service} />
          </div>
        </div>

        <BusinessEngagementPillars service={service} />
      </section>

      {/* ============================================================
          RELATED EXPLORATION LINKS
          ============================================================ */}
      <nav className="sx-container sx-service-detail-links" aria-label="Related links">
        <Reveal delay={100}>
          <Link href="/resources" className="sx-detail-nav-link">
            {RESOURCE_LINK_BY_SLUG[service.slug] ?? "Service resources"}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal delay={200}>
          <Link href="/pricing" className="sx-detail-nav-link">
            View Transparent Pricing
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal delay={300}>
          <Link href="/book" className="sx-detail-nav-link sx-highlight-link">
            Schedule Free Intro Call
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </nav>
    </main>
  );
}
