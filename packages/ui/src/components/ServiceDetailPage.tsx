import type { CSSProperties } from "react";
import Link from "next/link";
import { C, eyebrow, pageH1, metaLabel } from "../lib/theme";
import { BulletList } from "./ui/BulletList";
import { ContactCallout } from "./ui/ContactCallout";
import type { Service } from "../data/services";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Aurora, type AuroraVariant } from "./ui/Aurora";

const AURORA_BY_SLUG: Record<string, AuroraVariant> = {
  "business-enablement": "business",
  "technology-consulting": "technology",
  "career-services": "career",
};

const labelStyle: CSSProperties = {
  ...metaLabel,
  flexShrink: 0,
  width: "180px",
  paddingTop: "3px",
};

function Row({ label, children, last }: { label: React.ReactNode; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="sx-row" style={{ display: "flex", gap: "48px", marginBottom: last ? 0 : "40px" }}>
      <div style={{ ...labelStyle, lineHeight: 1.5 }}>{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Page header */}
      <section style={{ padding: "80px 0 64px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <Aurora variant={AURORA_BY_SLUG[service.slug] ?? "homepage"} />
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <p style={eyebrow}>{service.title}</p>
          <h1 style={{ ...pageH1, maxWidth: "560px" }}>{service.h1}</h1>
        </div>
      </section>

      {/* Detail */}
      <section style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Row label="Overview">
            <p style={{ fontSize: "16px", color: C.textBody, lineHeight: 1.78, maxWidth: "600px" }}>
              {service.overview}
            </p>
          </Row>
          <Row label={<>Typical<br />Engagements</>}>
            <BulletList items={service.typicalEngagements} />
          </Row>
          <Row label={<>Expected<br />Outcomes</>} last>
            <BulletList items={service.expectedOutcomes} />
          </Row>
        </div>
      </section>

      <section style={{ padding: "0 0 8px" }}>
        <div className="sx-container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "22px" }}>
            <Link href="/resources" style={{ fontSize: "14px", color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}>Career resources →</Link>
            <Link href="/pricing" style={{ fontSize: "14px", color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}>Pricing →</Link>
            <Link href="/book" style={{ fontSize: "14px", color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}>Book a consultation →</Link>
          </div>
        </div>
      </section>
      <ContactCallout />
    </div>
  );
}
