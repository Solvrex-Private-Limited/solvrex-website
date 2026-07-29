import { C } from "../../lib/theme";
import {
  PRICING_TIERS,
  PRICING_IS_PLACEHOLDER,
  PRICING_NOTE,
} from "../../lib/pricing";
import { BulletList } from "../ui/BulletList";
import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";

export function PricingTiers() {
  return (
    <section style={{ padding: "56px 0 72px" }}>
      <div className="sx-container">
        <div className="sx-tier-grid">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.slug}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "36px 32px",
                borderRadius: "20px",
                background: "var(--sx-bg-surface)",
                border: tier.highlighted ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                boxShadow: tier.highlighted ? "0 8px 30px rgba(195,157,83,0.12)" : "0 4px 20px rgba(0,0,0,0.02)",
                position: "relative",
              }}
            >
              {tier.highlighted && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: C.blue,
                    marginBottom: "12px",
                    display: "inline-block",
                  }}
                >
                  Most popular
                </span>
              )}

              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: "-0.015em",
                  marginBottom: "8px",
                }}
              >
                {tier.name}
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                {tier.blurb}
              </p>

              <div style={{ marginBottom: "22px" }}>
                {PRICING_IS_PLACEHOLDER ? (
                  <span
                    style={{
                      fontSize: "14.5px",
                      color: C.textBody,
                    }}
                  >
                    Pricing shared on consultation
                  </span>
                ) : (
                  <span>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: 600,
                        color: C.text,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {tier.priceFrom}
                    </span>

                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: C.textMuted,
                      }}
                    >
                      {" "}
                      {tier.billing}
                    </span>
                  </span>
                )}
              </div>

              <div style={{ flex: 1, marginBottom: "24px" }}>
                <BulletList items={tier.features} />
              </div>

              <PrimaryLink
                href="/book"
                variant={tier.highlighted ? "solid" : "outline"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Schedule Consultation
                <ArrowRight />
              </PrimaryLink>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "13px",
            color: C.textSubtle,
            lineHeight: 1.6,
            marginTop: "28px",
            maxWidth: "640px",
          }}
        >
          {PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}
