import { C } from "../../lib/theme";
import { ADD_ONS, BUSINESS_PRICING } from "../../lib/pricing";
import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";

export function PricingBusiness() {
  return (
    <section
      style={{
        padding: "56px 0",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div className="sx-container">
        <div className="sx-faq-grid">
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: C.text,
                letterSpacing: "-0.015em",
                marginBottom: "20px",
              }}
            >
              Add-ons
            </h2>

            {ADD_ONS.map((addon) => (
              <div
                key={addon.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: C.textBody,
                  }}
                >
                  {addon.name}
                </span>

                <span
                  style={{
                    fontSize: "14px",
                    color: C.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: C.text,
                letterSpacing: "-0.015em",
                marginBottom: "20px",
              }}
            >
              {BUSINESS_PRICING.heading}
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: C.textMuted,
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              {BUSINESS_PRICING.blurb}
            </p>

            <PrimaryLink href="/book" variant="outline">
              Request a quote
              <ArrowRight />
            </PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
