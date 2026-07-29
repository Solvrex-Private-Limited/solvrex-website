"use client";

import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";
import { PRICING_TIERS, PRICING_IS_PLACEHOLDER } from "../../lib/pricing";
import { sectionPad } from "../../lib/homestyles";

export function Pricing_Preview() {
  return (
    <section style={sectionPad}>
      <div className="sx-container">
        <Reveal>
          <p style={eyebrow}>Pricing</p>

          <h2
            style={{
              ...sectionHeading,
              maxWidth: "560px",
              marginBottom: "44px",
            }}
          >
            Plans for every stage.
          </h2>

          <div className="hx-grid-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  borderRadius: "10px",
                  background: tier.highlighted ? C.bgSurface : "transparent",
                }}
              >
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: "6px",
                  }}
                >
                  {tier.name} 
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: C.textSubtle,
                    marginBottom: "16px",
                  }}
                >
                  {PRICING_IS_PLACEHOLDER
                    ? "Pricing on consultation"
                    : `Starting from ${tier.priceFrom}`}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontSize: "13.5px",
                        color: C.textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: C.blue }}>—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px" }}>
            <PrimaryLink href="/pricing" variant="outline">
              View Full Pricing
              <ArrowRight />
            </PrimaryLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
