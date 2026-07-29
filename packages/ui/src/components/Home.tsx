"use client";

import { C, eyebrow, sectionHeading } from "../lib/theme";
import { Reveal } from "./ui/Reveal";
import { STEPS, INSIGHTS } from "../data/home_static";
import { HeroSection } from "./home/HeroSection";
import { TrustSection } from "./home/TrustSection";
import { CareerSection } from "./home/CareerSection";
import { Pricing_Preview } from "./home/Pricing_Preview";
import { Founder_phy } from "./home/Founder_phy";
import { FinalCTA } from "./home/FinalCTA";
import { Resources } from "./home/Rseources";
import { sectionPad, cardLabel, cardBody } from "../lib/homestyles";
import { Research_Insights } from "./home/Research_Insights";

const styles = `
  .hx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .hx-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  .hx-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .hx-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; position: relative; }
  .hx-cardlink:hover .hx-more { text-decoration: underline; }
  .hx-cardlink:focus-visible, .hx-btn:focus-visible { outline: 2px solid ${C.blueLight}; outline-offset: 2px; }
  @media (max-width: 900px) {
    .hx-grid-4 { grid-template-columns: repeat(2, 1fr); }
    .hx-grid-3 { grid-template-columns: 1fr; }
    .hx-steps { grid-template-columns: 1fr; gap: 22px; }
    .hx-stepline { display: none !important; }
  }
  @media (max-width: 620px) {
    .hx-grid-4 { grid-template-columns: 1fr; }
    .hx-grid-2 { grid-template-columns: 1fr; }
  }
`;

export function Home() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      {/* ── 1. Hero ── */}
      <HeroSection />

      <TrustSection />

      {/* ── 3. How it works ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>How it works</p>
            <h2
              style={{
                ...sectionHeading,
                maxWidth: "560px",
                marginBottom: "44px",
              }}
            >
              How Career Services Works
            </h2>
            <div className="hx-steps">
              {/* drawn connector line (desktop) */}
              <div
                className="hx-stepline sx-line"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: C.borderStrong,
                }}
              />
              {STEPS.map((step, i) => (
                <div key={step} style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: `1px solid ${C.blue}`,
                      background: C.bg,
                      color: C.blueLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: C.text,
                      lineHeight: 1.4,
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Career Services ── */}
      <CareerSection />

      {/* ── 5. Research insights ── */}
      <Research_Insights />

      {/* ── 6. Pricing preview ── */}
      <Pricing_Preview />

      {/* ── 7. Resources ── */}
      <Resources />

      {/* ── 8. Founder philosophy ── */}
      <Founder_phy />

      {/* ── 9. Final CTA ── */}
      <FinalCTA />
    </div>
  );
}
