import { C, eyebrow, pageH1 } from "../../lib/theme";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Aurora } from "../ui/Aurora";

export function PricingHero() {
  return (
    <section
      style={{
        padding: "80px 0 56px",
        borderBottom: `1px solid ${C.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Aurora variant="pricing" />

      <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        />

        <p style={eyebrow}>Pricing</p>

        <h1
          style={{
            ...pageH1,
            maxWidth: "560px",
            marginBottom: "18px",
          }}
        >
          Simple, transparent plans.
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: C.textMuted,
            lineHeight: 1.7,
            maxWidth: "620px",
          }}
        >
          Three ways to work with us on your job search. Not sure which fits?
          Book a free consultation and we’ll recommend the right starting point.
        </p>
      </div>
    </section>
  );
}
