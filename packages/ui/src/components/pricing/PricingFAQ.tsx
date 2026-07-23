import { C, sectionHeading } from "../../lib/theme";

import { PRICING_FAQ } from "../../lib/pricing";

import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";

export function PricingFAQ() {
  return (
    <>
      <section
        style={{ padding: "56px 0 80px", borderTop: `1px solid ${C.border}` }}
      >
        <div className="sx-container">
          <h2 style={{ ...sectionHeading, marginBottom: "32px" }}>
            Frequently asked questions
          </h2>
          <div className="sx-faq-grid">
            {PRICING_FAQ.map((f) => (
              <div key={f.q}>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: "8px",
                  }}
                >
                  {f.q}
                </h3>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: C.textMuted,
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px" }}>
            <PrimaryLink href="/book">
              Schedule Consultation
              <ArrowRight />
            </PrimaryLink>
          </div>
        </div>
      </section>
    </>
  );
}
