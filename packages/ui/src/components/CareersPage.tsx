"use client";

import { C, eyebrow, sectionHeading } from "../lib/theme";
import { siteConfig } from "../lib/site";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Aurora } from "./ui/Aurora";
import { OpenRoles } from "./OpenRoles";
import { StayConnected } from "./StayConnected";

/* ── Page-scoped CSS ─────────────────────────────────────────── */
const pageStyles = `
  @keyframes cx-pulse {
    0%   { transform: scale(1);    }
    50%  { transform: scale(1.07); }
    100% { transform: scale(1);    }
  }

  .cx-btn {
    animation: cx-pulse 1.5s ease-in-out infinite;
  }

  /* Pause pulse while hovering so hover effects aren't janky */
  .cx-btn:hover,
  .cx-btn:focus-visible {
    animation-play-state: paused;
  }

  .cx-btn:focus-visible { outline: 2px solid ${C.blueLight}; outline-offset: 2px; }
`;

export function CareersPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{pageStyles}</style>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "120px 0 100px",
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <Aurora variant="business" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(77,124,255,0.07) 1px, transparent 1px)",
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
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
          <p style={eyebrow}>Careers at Solvrex</p>
          <h1
            style={{
              fontSize: "clamp(38px, 5.5vw, 64px)",
              fontWeight: 300,
              color: C.text,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "26px",
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
              marginBottom: "44px",
              maxWidth: "560px",
            }}
          >
            Solvrex is human-led and technology-enabled. Join early, do real work, and grow with us.
          </p>
          <a
            className="cx-btn"
            href="#open-roles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 26px",
              backgroundColor: C.blue,
              color: "#fff",
              borderRadius: "3px",
              fontSize: "14px",
              fontWeight: 500,
              border: `1px solid ${C.blue}`,
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
              <path
                d="M6.5 2v9M3.5 8l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Open Roles – two rectangular cards ──────────────── */}
      <OpenRoles />

      {/* ── Stay Connected ──────────────────────────────────── */}
      <StayConnected
        companyName="Solvrex"
        followUrl={siteConfig.linkedInUrl}
      />
    </div>
  );
}
