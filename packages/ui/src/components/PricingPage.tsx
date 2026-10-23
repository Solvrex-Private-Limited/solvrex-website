import { C, accent, eyebrow, pageH1, sectionHeading } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { BulletList } from "./ui/BulletList";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import {
  PRICING_TIERS,
  PRICING_IS_PLACEHOLDER,
  PRICING_NOTE,
  SUPER_PLAN_TIERS,
  SUPER_PLAN_NOTE,
  COMPARISON,
  ADD_ONS,
  BUSINESS_PRICING,
  PRICING_FAQ,
} from "../lib/pricing";
import { Aurora } from "./ui/Aurora";
import PointerAura from "./PointerAura";

const styles = `
  .sx-tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
  .sx-faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 48px; }
  /* FAQ 3D Stacked Depth Cards */
  .sx-faq-stack {
    position: relative;
    transform-style: preserve-3d;
    perspective: 800px;
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 820px;
    margin: 24px auto 0;
    transition: gap 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
    padding: 30px 0 40px;
  }
  .sx-faq-stack:hover {
    gap: 20px;
  }
  .sx-faq-card {
    position: relative;
    list-style: none;
    width: 100%;
    padding: 20px 24px;
    background: ${C.bgSurface};
    border: 1px solid ${C.border};
    border-radius: 14px;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
    transition: transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 500ms ease, filter 500ms ease, border-color 300ms ease, box-shadow 300ms ease;
    transition-delay: calc(var(--i) * 50ms);
    cursor: pointer;
  }
  :root[data-theme="dark"] .sx-faq-card {
    background: rgba(255, 255, 255, 0.035);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  .sx-faq-card:nth-child(1) {
    transform: translateZ(-75px) translateY(20px);
    opacity: 0.6;
    filter: blur(4px);
  }
  .sx-faq-card:nth-child(2) {
    opacity: 0.8;
    filter: blur(2px);
  }
  .sx-faq-card:nth-child(3) {
    transform: translateZ(65px) translateY(-30px);
  }
  .sx-faq-card:nth-child(4) {
    transform: translateZ(125px) translateY(-68px);
    filter: blur(1px);
  }
  .sx-faq-card:nth-child(5) {
    transform: translateZ(175px) translateY(-95px);
    opacity: 0.7;
    filter: blur(2px);
  }
  .sx-faq-stack:hover .sx-faq-card {
    opacity: 1 !important;
    filter: blur(0) !important;
    transform: translateZ(0) translateY(0) !important;
  }
  .sx-faq-card:hover {
    border-color: ${C.blue} !important;
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.16) !important;
    transform: translateZ(24px) translateY(-4px) scale(1.015) !important;
    z-index: 10;
  }
  :root[data-theme="dark"] .sx-faq-card:hover {
    border-color: ${C.blue} !important;
    box-shadow: 0 12px 32px rgba(37, 99, 235, 0.32) !important;
  }
  .sx-faq-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: ${accent.fill};
    color: ${C.blue};
    font-size: 13.5px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
    letter-spacing: -0.01em;
  }
  .sx-faq-card .content {
    width: 100%;
  }
  .sx-faq-card .content h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${C.text};
    margin-bottom: 6px;
    line-height: 1.35;
  }
  .sx-faq-card .content p {
    font-size: 14.5px;
    color: ${C.textMuted};
    line-height: 1.6;
    margin: 0;
  }
  /* 3D Rotating Prism Button (Bottom FAQ CTA) */
  .sx-3d-btn {
    position: relative;
    display: inline-flex;
    width: 260px;
    height: 50px;
    text-decoration: none;
    transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateX(0deg);
  }
  .sx-3d-btn:hover {
    transform: perspective(1000px) rotateX(360deg);
  }
  .sx-3d-btn span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: ${C.text};
    background: rgba(255, 255, 255, 0.95);
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: 2px solid ${C.borderStrong};
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: inset 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 14px rgba(0, 0, 0, 0.05);
    transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
    backface-visibility: hidden;
  }
  :root[data-theme="dark"] .sx-3d-btn span {
    color: #ffffff;
    background: rgba(20, 24, 38, 0.95);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 10px 25px rgba(255, 255, 255, 0.04), 0 4px 14px rgba(0, 0, 0, 0.4);
  }
  .sx-3d-btn:hover span {
    color: #ffffff;
    background: rgba(3, 169, 244, 0.9);
    border-color: #03a9f4;
    box-shadow: inset 0 10px 25px rgba(255, 255, 255, 0.3), 0 12px 32px rgba(3, 169, 244, 0.4);
  }
  .sx-3d-btn span:nth-child(1) {
    transform: rotateX(360deg) translateZ(25px);
  }
  .sx-3d-btn span:nth-child(2) {
    transform: rotateX(270deg) translateZ(25px);
  }
  .sx-3d-btn span:nth-child(3) {
    transform: rotateX(180deg) translateZ(25px);
  }
  .sx-3d-btn span:nth-child(4) {
    transform: rotateX(90deg) translateZ(25px);
  }
  /* Comparison Table: Glassmorphism Card & Claymorphic Elements */
  .sx-cmp-card {
    position: relative;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9);
    padding: 10px 18px 18px;
    overflow-x: auto;
    transition: box-shadow 0.35s ease;
  }
  :root[data-theme="dark"] .sx-cmp-card {
    background: rgba(14, 18, 30, 0.65);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  .sx-cmp-card:hover {
    box-shadow: 0 28px 65px -12px rgba(37, 99, 235, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9);
  }
  .sx-cmp { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 580px; }
  .sx-cmp th, .sx-cmp td { text-align: left; padding: 16px 18px; border-bottom: 1px solid ${C.border}; font-size: 14px; }
  .sx-cmp thead th { color: ${C.textSubtle}; font-weight: 600; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; padding-top: 18px; padding-bottom: 16px; }
  .sx-cmp td.cell { text-align: center; color: ${C.textMuted}; white-space: nowrap; }
  .sx-cmp td.cell-highlighted, .sx-cmp th.th-highlighted {
    background: rgba(37, 99, 235, 0.035);
  }
  .sx-cmp th.th-highlighted {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .sx-cmp tbody tr:last-child td.cell-highlighted {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .sx-cmp td.feat {
    color: ${C.textBody};
    font-weight: 500;
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.2s ease;
  }
  .sx-cmp tbody tr {
    transition: background 0.25s ease;
  }
  .sx-cmp tbody tr:hover {
    background: rgba(37, 99, 235, 0.045);
  }
  .sx-cmp tbody tr:hover td.feat {
    color: ${C.text};
    transform: translateX(6px);
  }
  .sx-clay-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #2563eb;
    background: linear-gradient(145deg, #ffffff, #eaf0fe);
    box-shadow:
      2px 3px 6px rgba(37, 99, 235, 0.18),
      -2px -2px 5px rgba(255, 255, 255, 0.95),
      inset 1px 1px 2px rgba(255, 255, 255, 1),
      inset -1px -1px 2px rgba(37, 99, 235, 0.12);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
  }
  :root[data-theme="dark"] .sx-clay-check {
    color: #60a5fa;
    background: linear-gradient(145deg, #1e293b, #0f172a);
    box-shadow:
      2px 3px 6px rgba(0, 0, 0, 0.5),
      -1px -1px 3px rgba(255, 255, 255, 0.08),
      inset 1px 1px 2px rgba(255, 255, 255, 0.12),
      inset -1px -1px 2px rgba(0, 0, 0, 0.4);
  }
  .sx-cmp tr:hover .sx-clay-check {
    transform: scale(1.18) rotate(-4deg);
    box-shadow:
      3px 5px 12px rgba(37, 99, 235, 0.25),
      -2px -2px 6px rgba(255, 255, 255, 0.9);
  }
  .sx-clay-pill {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    color: ${C.textBody};
    background: linear-gradient(145deg, #ffffff, #f0f3f8);
    box-shadow:
      2px 2px 5px rgba(0, 0, 0, 0.06),
      -1px -1px 3px rgba(255, 255, 255, 0.85),
      inset 1px 1px 1px rgba(255, 255, 255, 1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  :root[data-theme="dark"] .sx-clay-pill {
    color: #e2e8f0;
    background: linear-gradient(145deg, #1b2234, #101624);
    box-shadow:
      2px 2px 5px rgba(0, 0, 0, 0.4),
      -1px -1px 2px rgba(255, 255, 255, 0.06),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
  }
  .sx-cmp tr:hover .sx-clay-pill {
    transform: translateY(-1px) scale(1.04);
  }
  .sx-super-hand {
    display: grid;
    counter-set: card 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    align-items: stretch;
    perspective: 1200px;
    transition: gap 250ms ease-out;
  }
  .sx-super-section:hover .sx-super-hand,
  .sx-super-hand:hover {
    gap: 28px;
  }
  .sx-super-plan {
    --grad-a: 135deg;
    --stripe: linear-gradient(var(--grad-a), var(--c1) 32%, var(--c2) 32% 57%, var(--c3) 57%);
    position: relative;
    display: flex;
    flex-direction: column;
    counter-increment: card;
    border-radius: 20px;
    overflow: hidden;
    background: ${C.bgSurface};
    border: 1px solid ${C.borderStrong};
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.06);
    transform-origin: 50% 100%;
    transform: rotate(calc((var(--i) * 12deg) - 12deg));
    transition: transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out;
  }
  .sx-super-plan:nth-child(1) {
    transform: rotate(calc((var(--i) * 12deg) - 12deg)) translateY(6px);
  }
  .sx-super-plan:nth-child(2) {
    transform: rotate(calc((var(--i) * 12deg) - 12deg)) translateY(0);
  }
  .sx-super-plan:nth-child(3) {
    transform: rotate(calc((var(--i) * 12deg) - 12deg)) translateY(6px);
  }
  .sx-super-section:hover .sx-super-plan,
  .sx-super-hand:hover .sx-super-plan {
    transform: rotate(0deg) translateY(0);
  }
  .sx-super-hand .sx-super-plan:hover {
    transform: rotate(0deg) translateY(-22px) scale(1.025) !important;
    box-shadow: 0 22px 50px -6px rgba(0, 0, 0, 0.22);
    z-index: 10;
  }
  .sx-super-card-tag {
    position: absolute;
    top: 20px;
    right: 22px;
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.92);
    pointer-events: none;
  }
  .sx-super-card-tag:before {
    content: "0" counter(card);
  }
  @keyframes fan {
    from {
      gap: 28px;
    }
    to {
      gap: 16px;
    }
  }
  .sx-super-plan-popular {
    border: 1.5px solid ${C.blue};
    box-shadow: 0 8px 32px -4px rgba(37, 99, 235, 0.18);
  }
  .sx-super-hand .sx-super-plan-popular:hover {
    box-shadow: 0 22px 50px -6px rgba(37, 99, 235, 0.3);
  }
  .sx-super-plan-head {
    position: relative;
    padding: 30px 24px 44px;
    background: var(--stripe);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), 0 100%);
    color: #ffffff;
  }
  .sx-super-plan-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px 24px 28px;
    background: ${C.bgSurface};
  }
  .sx-super-plan-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px 20px;
    border-radius: 12px;
    font-size: 14.5px;
    font-weight: 600;
    color: #ffffff;
    background: var(--stripe);
    background-size: 120% 120%;
    text-decoration: none;
    border: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .sx-super-plan-btn:hover {
    filter: brightness(1.12);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  .sx-normal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    align-items: stretch;
    perspective: 1000px;
  }
  .sx-normal-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.08);
    transform-origin: center bottom;
    transform: rotateX(20deg) translateZ(-10px);
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s ease, border-color 0.4s ease, background 0.4s ease;
  }
  :root[data-theme="dark"] .sx-normal-card {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.35);
  }
  .sx-normal-card:hover {
    transform: rotateX(0deg) translateY(-8px) translateZ(15px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.16);
    background: rgba(255, 255, 255, 0.75);
    border-color: ${C.borderStrong};
    z-index: 2;
  }
  :root[data-theme="dark"] .sx-normal-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55);
  }
  .sx-normal-card-highlighted {
    border-color: ${C.blueLight};
    box-shadow: 0 16px 45px rgba(37, 99, 235, 0.12);
  }
  .sx-normal-card-highlighted:hover {
    border-color: ${C.blue};
    box-shadow: 0 25px 60px rgba(37, 99, 235, 0.22);
  }

  /* Horizontal scroll-driven animation (scoped to pricing page) */
  @keyframes horizontal-scroll {
    0% {
      transform: translate3d(70%, 0%, 0);
      opacity: 0.15;
    }
    30%, 70% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translate3d(-70%, 0%, 0);
      opacity: 0.15;
    }
  }

  .sx-scroll-section {
    position: relative;
    overflow-x: clip;
  }

  @supports (animation-timeline: view()) {
    .sx-scroll-section {
      view-timeline: --section block;
    }
    .sx-scroll-content {
      animation: horizontal-scroll ease-in-out both;
      animation-timeline: view(block);
      animation-range: entry 0% exit 100%;
      will-change: transform, opacity;
    }
  }

  @media (max-width: 860px) {
    .sx-tier-grid { grid-template-columns: 1fr; }
    .sx-super-hand { grid-template-columns: 1fr; perspective: none; }
    .sx-super-plan,
    .sx-super-plan:nth-child(1),
    .sx-super-plan:nth-child(2),
    .sx-super-plan:nth-child(3) {
      transform: none !important;
    }
    .sx-super-hand .sx-super-plan:hover {
      transform: translateY(-4px) !important;
    }
    .sx-normal-grid { grid-template-columns: 1fr; perspective: none; }
    .sx-normal-card { transform: none !important; }
    .sx-normal-card:hover { transform: translateY(-4px) !important; }
    .sx-faq-grid { grid-template-columns: 1fr; }
    .sx-faq-stack { perspective: none; gap: 16px; }
    .sx-faq-card {
      transform: none !important;
      opacity: 1 !important;
      filter: none !important;
      transition-delay: 0ms !important;
    }
    .sx-faq-card:hover { transform: translateY(-2px) !important; }
    .sx-scroll-content {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sx-scroll-content {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
`;

const SUPER_PALETTES = [
  { c1: "#1e3a8a", c2: "#2563eb", c3: "#3b82f6", c4: "#93c5fd" },
  { c1: "#31104b", c2: "#4f46e5", c3: "#7c3aed", c4: "#c084fc" },
  { c1: "#0f172a", c2: "#1e293b", c3: "#3b82f6", c4: "#60a5fa" },
];

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-label="Included" style={{ display: "inline-block", verticalAlign: "middle", color: C.blue }}>
      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClayCheck() {
  return (
    <span className="sx-clay-check" aria-label="Included">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function PricingPage() {
  return (
    <div style={{ backgroundColor: "transparent", overflowX: "clip", position: "relative", minHeight: "100vh" }}>
      <style>{styles}</style>
      <PointerAura />

      {/* Header */}
      <section style={{ padding: "80px 0 56px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <Aurora variant="pricing" />
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <p style={eyebrow}>Pricing</p>
          <h1 style={{ ...pageH1, maxWidth: "560px", marginBottom: "18px" }}>Simple, transparent plans.</h1>
          <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, maxWidth: "620px" }}>
            Three ways to work with us on your job search. Not sure which fits? Book a free
            consultation and we&apos;ll recommend the right starting point.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="sx-scroll-section" style={{ padding: "56px 0 72px" }}>
        <div className="sx-container sx-scroll-content">
          <div className="sx-normal-grid">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.slug}
                className={`sx-normal-card ${tier.highlighted ? "sx-normal-card-highlighted" : ""}`}
              >
                {tier.highlighted && (
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blueLight, marginBottom: "12px" }}>Most popular</span>
                )}
                <h2 style={{ fontSize: "20px", fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: "8px" }}>{tier.name}</h2>
                <p style={{ fontSize: "14px", color: C.textMuted, lineHeight: 1.6, marginBottom: "20px" }}>{tier.blurb}</p>

                <div style={{ marginBottom: "22px" }}>
                  {PRICING_IS_PLACEHOLDER ? (
                    <span style={{ fontSize: "14.5px", color: C.textBody }}>Pricing shared on consultation</span>
                  ) : (
                    <span>
                      <span style={{ fontSize: "30px", fontWeight: 600, color: C.text, letterSpacing: "-0.02em" }}>{tier.priceFrom}</span>
                      <span style={{ fontSize: "13px", fontWeight: 400, color: C.textMuted }}> {tier.billing}</span>
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, marginBottom: "24px" }}>
                  <BulletList items={tier.features} />
                </div>

                <PrimaryLink href="/book" variant={tier.highlighted ? "solid" : "outline"} style={{ width: "100%", justifyContent: "center" }}>
                  Schedule Consultation
                  <ArrowRight />
                </PrimaryLink>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: C.textSubtle, lineHeight: 1.6, marginTop: "28px", maxWidth: "640px" }}>{PRICING_NOTE}</p>
        </div>
      </section>

      {/* Super Plans */}
      <section className="sx-scroll-section sx-super-section" style={{ padding: "56px 0 72px", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container sx-scroll-content">
          <div style={{ marginBottom: "36px" }}>
            <p style={eyebrow}>Accelerated Placement</p>
            <h2 style={{ ...sectionHeading, marginBottom: "12px" }}>Super Plans</h2>
            <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.65, maxWidth: "620px" }}>
              Engineered for candidates seeking maximum momentum — higher volume caps, direct outreach campaigns, and dedicated coaching.
            </p>
          </div>

          <div className="sx-super-hand sx-tier-grid">
            {SUPER_PLAN_TIERS.map((tier, idx) => {
              const pal = SUPER_PALETTES[idx % SUPER_PALETTES.length];
              return (
                <div
                  key={tier.slug}
                  className={`sx-super-plan ${tier.highlighted ? "sx-super-plan-popular" : ""}`}
                  style={{
                    ["--i" as string]: idx,
                    ["--c1" as string]: pal.c1,
                    ["--c2" as string]: pal.c2,
                    ["--c3" as string]: pal.c3,
                    ["--c4" as string]: pal.c4,
                  } as React.CSSProperties}
                >
                  <div className="sx-super-plan-head">
                    <span className="sx-super-card-tag" aria-hidden="true" />
                    {tier.highlighted ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#ffffff",
                          background: "rgba(255, 255, 255, 0.22)",
                          backdropFilter: "blur(4px)",
                          border: "1px solid rgba(255, 255, 255, 0.35)",
                          marginBottom: "12px",
                        }}
                      >
                        Most popular
                      </span>
                    ) : (
                      <span style={{ height: "23px", display: "inline-block", marginBottom: "12px" }} aria-hidden="true" />
                    )}
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.015em", marginBottom: "6px" }}>
                      {tier.name}
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "rgba(255, 255, 255, 0.88)", lineHeight: 1.5, minHeight: "40px", marginBottom: "14px" }}>
                      {tier.blurb}
                    </p>

                    <div>
                      <span style={{ fontSize: "32px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
                        ${tier.priceFrom}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.8)" }}>
                        {" "}/ {tier.billing}
                      </span>
                    </div>
                  </div>

                  <div className="sx-super-plan-body">
                    <div style={{ flex: 1, marginBottom: "26px" }}>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", padding: 0, margin: 0 }}>
                        {tier.features.map((feat) => (
                          <li
                            key={feat}
                            style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: C.textBody, lineHeight: 1.55 }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: accent.fill,
                                color: C.blue,
                                flexShrink: 0,
                                marginTop: "1px",
                              }}
                            >
                              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a href="/book" className="sx-super-plan-btn">
                      <span>Schedule Consultation</span>
                      <ArrowRight />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: "13px", color: C.textSubtle, lineHeight: 1.6, marginTop: "28px", maxWidth: "640px" }}>
            {SUPER_PLAN_NOTE}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="sx-scroll-section" style={{ padding: "56px 0", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container sx-scroll-content">
          <h2 style={{ ...sectionHeading, marginBottom: "32px" }}>Compare plans</h2>
          <div className="sx-cmp-card">
            <table className="sx-cmp">
              <thead>
                <tr>
                  <th>Feature</th>
                  {PRICING_TIERS.map((t) => (
                    <th key={t.slug} className={t.highlighted ? "th-highlighted" : ""} style={{ textAlign: "center" }}>
                      <div>{t.name}</div>
                      {t.highlighted && (
                        <div style={{ marginTop: "4px" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blueLight }}>
                            Most popular
                          </span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="feat">{row.feature}</td>
                    {row.tiers.map((cell, i) => (
                      <td key={i} className={`cell ${PRICING_TIERS[i]?.highlighted ? "cell-highlighted" : ""}`}>
                        {cell === true ? (
                          <ClayCheck />
                        ) : cell === false ? (
                          <span style={{ color: C.textSubtle, opacity: 0.45, fontSize: "15px" }}>—</span>
                        ) : (
                          <span className="sx-clay-pill">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons + Business */}
      <section className="sx-scroll-section" style={{ padding: "56px 0", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container sx-scroll-content">
          <div className="sx-faq-grid">
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: "20px" }}>Add-ons</h2>
              {ADD_ONS.map((a) => (
                <div key={a.name} style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: "14px", color: C.textBody }}>{a.name}</span>
                  <span style={{ fontSize: "14px", color: C.textMuted, whiteSpace: "nowrap" }}>{a.price}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: "20px" }}>{BUSINESS_PRICING.heading}</h2>
              <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.7, marginBottom: "24px" }}>{BUSINESS_PRICING.blurb}</p>
              <PrimaryLink href="/book" variant="outline">Request a quote<ArrowRight /></PrimaryLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sx-scroll-section" style={{ padding: "56px 0 80px", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container sx-scroll-content">
          <h2 style={{ ...sectionHeading, marginBottom: "36px", textAlign: "center" }}>Frequently asked questions</h2>
          <div className="sx-faq-stack">
            {PRICING_FAQ.map((f, idx) => (
              <div
                key={f.q}
                className="sx-faq-card"
                style={{ ["--i" as string]: idx } as React.CSSProperties}
              >
                <span className="sx-faq-badge" aria-hidden="true">
                  Q{idx + 1}
                </span>
                <div className="content">
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "54px", display: "flex", justifyContent: "center" }}>
            <a href="/book" className="sx-3d-btn" aria-label="Schedule Consultation">
              <span>Schedule Consultation <ArrowRight /></span>
              <span>Schedule Consultation <ArrowRight /></span>
              <span>Schedule Consultation <ArrowRight /></span>
              <span>Schedule Consultation <ArrowRight /></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
