import Link from "next/link";
import { C, eyebrow } from "../../lib/theme";
import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";
import { Aurora } from "../ui/Aurora";
import { CareerJourney } from "../CareerJourney";

{
  /* ── 1. Hero ── */
}

export function HeroSection() {
  return (
    <section
      style={{
        padding: "104px 0 64px",
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <Aurora variant="homepage" />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(195,157,83,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "760px" }}>
          <p style={eyebrow}>Career Services</p>
          <h1
            style={{
              fontFamily: "var(--sx-font-serif)",
              fontSize: "clamp(38px, 5.6vw, 66px)",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "26px",
            }}
          >
            Practical career guidance for professionals in transition.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: C.textMuted,
              lineHeight: 1.6,
              marginBottom: "40px",
              maxWidth: "620px",
            }}
          >
            Resume reviews, LinkedIn optimization, application strategy,
            interview preparation, and personalized support designed to help
            professionals move forward with confidence.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <PrimaryLink href="/book">
              Book Consultation
              <ArrowRight />
            </PrimaryLink>
            <Link
              href="/services/career-services"
              style={{
                fontSize: "14px",
                color: C.textMuted,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.textMuted;
              }}
            >
              Explore Career Services →
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "56px" }}>
          <CareerJourney />
        </div>
      </div>
    </section>
  );
}
