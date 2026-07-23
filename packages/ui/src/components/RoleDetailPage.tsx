import { C, eyebrow as eyebrowStyle } from "../lib/theme";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { DetailList } from "./ui/DetailList";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { siteConfig } from "../lib/site";
import type { Role } from "../data/roles";

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <p style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "6px" }}>
        {label}
      </p>
      <p style={{ fontSize: "14.5px", color: C.text, lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

export function RoleDetailPage({ role }: { role: Role }) {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Header band */}
      <section style={{ backgroundColor: C.bgSurface, borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container" style={{ padding: "32px 0 40px" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: role.title }]} />

          <p style={eyebrowStyle}>
            {role.track}
          </p>
          <h1 style={{ fontFamily: "var(--sx-font-serif)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: C.text, letterSpacing: "-0.015em", lineHeight: 1.15, marginBottom: "16px", maxWidth: "720px" }}>
            {role.title}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", fontSize: "13.5px", color: C.textMuted, marginBottom: "28px" }}>
            <span>{role.location}</span>
            <span style={{ color: C.borderStrong }}>·</span>
            <span>{role.type}</span>
            <span style={{ color: C.borderStrong }}>·</span>
            <span>{role.openings} openings</span>
          </div>

          <PrimaryLink href={siteConfig.applyFormUrl} external>
            Apply now
            <ArrowRight />
          </PrimaryLink>
        </div>
      </section>

      {/* Body: content + facts sidebar */}
      <section style={{ padding: "56px 0 88px" }}>
        <div className="sx-container">
          <div
            className="sx-grid-2"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: "64px", alignItems: "start" }}
          >
            {/* Left: write-up */}
            <div>
              {role.about && (
                <div>
                  <h2 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "14px" }}>
                    About the role
                  </h2>
                  <p style={{ fontSize: "15.5px", color: C.textBody, lineHeight: 1.75 }}>{role.about}</p>
                </div>
              )}
              <DetailList heading="Key responsibilities" items={role.responsibilities} />
              <DetailList heading="Skills & requirements" items={role.requirements} />
              <DetailList heading="Eligibility" items={role.eligibility} />
            </div>

            {/* Right: facts */}
            <aside
              style={{
                backgroundColor: C.bgSurface,
                border: `1px solid ${C.border}`,
                borderTop: `3px solid ${C.blue}`,
                borderRadius: "20px",
                padding: "32px 28px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
              }}
            >
              <Fact label="Role" value={role.title} />
              <Fact label="Track" value={role.track} />
              <Fact label="Employment type" value={role.type} />
              <Fact label="Location" value={role.location} />
              <Fact label="Openings" value={role.openings} />

              <div style={{ marginTop: "16px" }}>
                <PrimaryLink href={siteConfig.applyFormUrl} external style={{ width: "100%", justifyContent: "center" }}>
                  Apply now
                  <ArrowRight />
                </PrimaryLink>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
