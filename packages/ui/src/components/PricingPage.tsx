import { C, eyebrow, pageH1, sectionHeading } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { BulletList } from "./ui/BulletList";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import {
  PRICING_TIERS,
  PRICING_IS_PLACEHOLDER,
  PRICING_NOTE,
  COMPARISON,
  ADD_ONS,
  BUSINESS_PRICING,
  PRICING_FAQ,
} from "../lib/pricing";
import { Aurora } from "./ui/Aurora";

const styles = `
  .sx-tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
  .sx-faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px 48px; }
  .sx-cmp { width: 100%; border-collapse: collapse; min-width: 560px; }
  .sx-cmp th, .sx-cmp td { text-align: left; padding: 14px 16px; border-bottom: 1px solid ${C.border}; font-size: 14px; }
  .sx-cmp thead th { color: ${C.textSubtle}; font-weight: 600; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
  .sx-cmp td.cell { text-align: center; color: ${C.textMuted}; white-space: nowrap; }
  .sx-cmp td.feat { color: ${C.textBody}; }
  @media (max-width: 860px) { .sx-tier-grid { grid-template-columns: 1fr; } .sx-faq-grid { grid-template-columns: 1fr; } }
`;

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-label="Included" style={{ display: "inline-block", verticalAlign: "middle", color: "var(--sx-gold, #e5c07b)" }}>
      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

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
      <section style={{ padding: "56px 0 72px" }}>
        <div className="sx-container">
          <div className="sx-tier-grid">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.slug} style={{ display: "flex", flexDirection: "column", padding: "28px 24px", borderRadius: "12px", background: tier.highlighted ? C.bgSurface : "transparent" }}>
                {tier.highlighted && (
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sx-gold, #e5c07b)", marginBottom: "12px" }}>Most popular</span>
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

      {/* Comparison table */}
      <section style={{ padding: "56px 0", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <h2 style={{ ...sectionHeading, marginBottom: "32px" }}>Compare plans</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="sx-cmp">
              <thead>
                <tr>
                  <th>Feature</th>
                  {PRICING_TIERS.map((t) => (
                    <th key={t.slug} style={{ textAlign: "center" }}>{t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="feat">{row.feature}</td>
                    {row.tiers.map((cell, i) => (
                      <td key={i} className="cell">
                        {cell === true ? <Check /> : cell === false ? <span style={{ color: C.textSubtle }}>—</span> : cell}
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
      <section style={{ padding: "56px 0", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container">
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
      <section style={{ padding: "56px 0 80px", borderTop: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <h2 style={{ ...sectionHeading, marginBottom: "32px" }}>Frequently asked questions</h2>
          <div className="sx-faq-grid">
            {PRICING_FAQ.map((f) => (
              <div key={f.q}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: C.text, marginBottom: "8px" }}>{f.q}</h3>
                <p style={{ fontSize: "14.5px", color: C.textMuted, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px" }}>
            <PrimaryLink href="/book">Schedule Consultation<ArrowRight /></PrimaryLink>
          </div>
        </div>
      </section>
    </div>
  );
}
