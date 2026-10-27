"use client";

import { C, eyebrow, sectionHeading } from "../lib/theme";
import { siteConfig } from "../lib/site";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Aurora } from "./ui/Aurora";
import { OpenRoles } from "./OpenRoles";
import { StayConnected } from "./StayConnected";
import styles from "./CareersPage.module.css";

export function CareersPage() {
  return (
    <div className={`careers-zoom-root ${styles.careersRoot}`} style={{ backgroundColor: "transparent" }}>
      <style>{`
        @supports (animation-timeline: view()) or (animation-timeline: --section-hero) {
          html:has(.careers-zoom-root) {
            scroll-snap-type: y mandatory;
            timeline-scope: --section-hero, --section-roles, --section-cta, --careers-main;
          }
        }
      `}</style>
      {/* ── Scroll Progress Indicator on the side ── */}
      <nav className={styles.indicator} aria-label="Section navigation">
        <div className={styles.indicatorTrack} />
        <div className={styles.indicatorThumb} aria-hidden="true" />
        <a href="#hero" className={styles.indicatorDot} title="Hero Overview" aria-label="Jump to Overview section" />
        <a href="#open-roles" className={styles.indicatorDot} title="Open Roles" aria-label="Jump to Open Roles section" />
        <a href="#stay-connected" className={styles.indicatorDot} title="Stay Connected" aria-label="Jump to Stay Connected section" />
      </nav>

      <main className={styles.main}>
        {/* ── Section 1: Hero ── */}
        <section id="hero" className={`${styles.section} ${styles.sectionHero}`}>
          <div className={`${styles.content} ${styles.contentHero}`}>
            <Aurora variant="business" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(77,124,255,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "3px",
                height: "100%",
                background: `linear-gradient(to bottom, ${C.blue} 0%, transparent 100%)`,
              }}
              aria-hidden="true"
            />
            <div className="sx-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
              <p style={eyebrow}>Careers at Solvrex</p>
              <h1
                style={{
                  fontSize: "clamp(34px, 5vw, 60px)",
                  fontWeight: 300,
                  color: C.text,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                  maxWidth: "760px",
                }}
              >
                Build something from the ground up — as part of our founding team.
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  marginBottom: "40px",
                  maxWidth: "560px",
                }}
              >
                Solvrex is human-led and technology-enabled. Join early, do real work, and grow with us.
              </p>
              <a
                className={styles.pulseBtn}
                href="#open-roles"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 26px",
                  backgroundColor: C.blue,
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: `1px solid ${C.blue}`,
                  textDecoration: "none",
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = C.blueHover;
                  e.currentTarget.style.borderColor = C.blueHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = C.blue;
                  e.currentTarget.style.borderColor = C.blue;
                }}
              >
                View open roles
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M6.5 2v9M3.5 8l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 2: Open Roles ── */}
        <section id="open-roles" className={`${styles.section} ${styles.sectionRoles}`}>
          <div className={`${styles.content} ${styles.contentRoles}`}>
            <div style={{ width: "100%", maxWidth: "1280px" }}>
              <OpenRoles embedded={true} />
            </div>
          </div>
        </section>

        {/* ── Section 3: Stay Connected ── */}
        <section id="stay-connected" className={`${styles.section} ${styles.sectionCta}`}>
          <div className={`${styles.content} ${styles.contentCta}`}>
            <div style={{ width: "100%", maxWidth: "1280px" }}>
              <StayConnected companyName="Solvrex" followUrl={siteConfig.linkedInUrl} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
