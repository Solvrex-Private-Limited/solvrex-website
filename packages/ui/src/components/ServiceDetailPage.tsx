"use client";

import Link from "next/link";
import { eyebrow, pageH1 } from "../lib/theme";
import type { Service } from "../data/services";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Reveal } from "./ui/Reveal";
import { Aurora, type AuroraVariant } from "./ui/Aurora";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { FloatingBubbles } from "./ui/FloatingBubbles";

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
function EngagementIcon({ index }: { index: number }) {
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
  const isBusiness = service.slug === "business-enablement";

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

            {/* Right Column: Premium Interactive Website / Dashboard Mockup Visual */}
            <Reveal delay={250}>
              <div className="sx-service-detail-visual" aria-hidden="true">
                <div className="sx-mockup-frame">
                  {/* Browser chrome header */}
                  <div className="sx-mockup-browser-bar">
                    <div className="sx-mockup-traffic-lights">
                      <span className="sx-tl-dot sx-tl-red" />
                      <span className="sx-tl-dot sx-tl-amber" />
                      <span className="sx-tl-dot sx-tl-green" />
                    </div>
                    <div className="sx-mockup-address-bar">
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="7" width="10" height="7" rx="1.5" />
                        <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
                      </svg>
                      <span>client-platform.solvrex.com</span>
                    </div>
                    <div className="sx-mockup-chip">Mockup Preview</div>
                  </div>

                  {/* Browser preview body: Modern web platform interface */}
                  <div className="sx-mockup-body">
                    {/* Mockup sub-navbar */}
                    <div className="sx-mockup-nav">
                      <div className="sx-mockup-logo-mark" />
                      <div className="sx-mockup-nav-links">
                        <span className="sx-mockup-nav-line active" />
                        <span className="sx-mockup-nav-line" />
                        <span className="sx-mockup-nav-line" />
                      </div>
                      <div className="sx-mockup-pill-btn">Launch</div>
                    </div>

                    {/* Mockup hero card inside website */}
                    <div className="sx-mockup-hero-card">
                      <div className="sx-mockup-tag">Digital Enablement</div>
                      <div className="sx-mockup-hero-title" />
                      <div className="sx-mockup-hero-sub" />
                      <div className="sx-mockup-hero-actions">
                        <div className="sx-mockup-btn-primary" />
                        <div className="sx-mockup-btn-secondary" />
                      </div>
                    </div>

                    {/* Mockup metrics / analytics grid */}
                    <div className="sx-mockup-dashboard-grid">
                      <div className="sx-mockup-metric-card">
                        <div className="sx-mockup-metric-header">
                          <span className="sx-mockup-metric-label">Benchmark Target</span>
                          <span className="sx-mockup-trend-up">90+</span>
                        </div>
                        <div className="sx-mockup-sparkline">
                          <svg viewBox="0 0 100 24" className="sx-spark-svg">
                            <path d="M0 18 Q20 16 35 12 T70 8 T100 2" fill="none" stroke="var(--sx-blue)" strokeWidth="2.5" />
                          </svg>
                        </div>
                      </div>

                      <div className="sx-mockup-metric-card">
                        <div className="sx-mockup-metric-header">
                          <span className="sx-mockup-metric-label">SEO Visibility</span>
                          <span className="sx-mockup-trend-badge">Indexed</span>
                        </div>
                        <div className="sx-mockup-progress-bar">
                          <div className="sx-mockup-progress-fill" />
                        </div>
                      </div>
                    </div>

                    {/* Floating highlight badge */}
                    <div className="sx-mockup-floating-pill">
                      <div className="sx-floating-avatar-check">✓</div>
                      <div className="sx-floating-pill-text">
                        <strong>Web Platform & SEO</strong>
                        <span>Engineered for Reliability</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="sx-mockup-caption">
                  Illustrative concept demo &mdash; sample interface architecture, not real-time analytics.
                </p>

                {/* Soft ambient back-glow behind the mockup */}
                <div className="sx-service-visual-glow" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          TYPICAL ENGAGEMENTS: Refined Cards with Icons & Smooth Hover
          ============================================================ */}
      <section className="sx-service-detail-content" aria-label="Service engagements">
        <div className="sx-container">
          <div className="sx-service-detail-section">
            <div className="sx-section-intro">
              <Reveal>
                <p className="sx-section-kicker" style={eyebrow}>What We Deliver</p>
                <h2 className="sx-service-section-title">Typical Engagements</h2>
                <p className="sx-section-sub">
                  Focused, practical projects configured to your business stage and operational needs.
                </p>
              </Reveal>
            </div>

            <div className="sx-service-feature-grid">
              {service.typicalEngagements.map((item, index) => (
                <Reveal key={item} delay={index * 75}>
                  <div className="sx-service-feature-card">
                    <div className="sx-service-feature-icon-wrap" aria-hidden="true">
                      <EngagementIcon index={index} />
                    </div>
                    <div className="sx-service-feature-body">
                      <span className="sx-service-feature-index">Engagement 0{index + 1}</span>
                      <h3 className="sx-service-feature-title">{item}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ============================================================
              EXPECTED OUTCOMES: Distinct, Premium Visual Treatment
              ============================================================ */}
          <div className="sx-service-detail-section sx-service-outcomes-section">
            <div className="sx-section-intro">
              <Reveal>
                <p className="sx-section-kicker" style={eyebrow}>Real-World Impact</p>
                <h2 className="sx-service-section-title">Expected Outcomes</h2>
                <p className="sx-section-sub">
                  Clear, measurable shifts in your digital footprint and day-to-day workflow.
                </p>
              </Reveal>
            </div>

            <div className="sx-service-outcomes-grid">
              {service.expectedOutcomes.map((item, index) => (
                <Reveal key={item} delay={index * 120}>
                  <div className="sx-service-outcome-card">
                    <div className="sx-outcome-card-bg-glow" aria-hidden="true" />
                    <div className="sx-outcome-card-top">
                      <div className="sx-outcome-badge">
                        <span className="sx-outcome-badge-icon" aria-hidden="true">✓</span>
                        <span>Key Deliverable</span>
                      </div>
                      <div className="sx-outcome-number">0{index + 1}</div>
                    </div>
                    <div className="sx-outcome-content">
                      <h3 className="sx-outcome-title">{item}</h3>
                      <p className="sx-outcome-desc">
                        {index === 0 && "Custom-crafted, accessible web architecture with search presence that represents your brand at its best."}
                        {index === 1 && "Fewer manual handoffs and clearer inquiry flow, saving team hours each week."}
                        {index === 2 && "Maximized return on current software, email services, and analytics without unnecessary platform churn."}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ============================================================
              SELECTED WORK & CAPABILITIES: Only approved assets used
              ============================================================ */}
          {isBusiness && (
            <div className="sx-service-detail-section sx-service-selected-work">
              <div className="sx-section-intro">
                <Reveal>
                  <p className="sx-section-kicker" style={eyebrow}>Practice Architecture</p>
                  <h2 className="sx-service-section-title">Core Engagement Pillars</h2>
                  <p className="sx-section-sub">
                    Structured modular delivery designed for small organizations and local enterprises.
                  </p>
                </Reveal>
              </div>

              <div className="sx-capability-grid">
                {CAPABILITY_PILLARS.map((pillar, i) => (
                  <Reveal key={pillar.headline} delay={i * 100}>
                    <div className="sx-capability-card">
                      <div className="sx-capability-badge">{pillar.category}</div>
                      <h3 className="sx-capability-title">{pillar.headline}</h3>
                      <p className="sx-capability-desc">{pillar.detail}</p>
                      <ul className="sx-capability-list" aria-label={`${pillar.headline} deliverables`}>
                        {pillar.deliverables.map((del) => (
                          <li key={del}>
                            <span className="sx-check-bullet" aria-hidden="true">→</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
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
