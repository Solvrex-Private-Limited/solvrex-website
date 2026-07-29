import { C } from "../lib/theme";

import { PricingHero } from "./pricing/PricingHero";
import { PricingTiers } from "./pricing/PricingTiers";
import { PricingComparison } from "./pricing/PricingComparison";
import { PricingBusiness } from "./pricing/PricingBusiness";
import { PricingFAQ } from "./pricing/PricingFAQ";

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

export function PricingPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      {/* Header */}
      <PricingHero />

      {/* Tiers */}
      <PricingTiers />

      {/* Comparison table */}
      <PricingComparison />

      {/* Add-ons + Business */}
      <PricingBusiness />

      {/* FAQ */}
      <PricingFAQ />
    </div>
  );
}
