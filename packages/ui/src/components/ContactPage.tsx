import { C, eyebrow, pageH1 } from "../lib/theme";
import { siteConfig } from "../lib/site";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { ConsultationForm } from "./ConsultationForm";

export function ContactPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Page header */}
      <section style={{ padding: "80px 0 64px", borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p style={eyebrow}>Contact</p>
          <h1 style={{ ...pageH1, maxWidth: "480px" }}>
            Start a conversation.
          </h1>
        </div>
      </section>

      {/* Contact body */}
      <section style={{ padding: "72px 0" }}>
        <div className="sx-container">
          <div className="sx-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "88px", alignItems: "start" }}>
            {/* Left: info */}
            <div>
              <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.72, marginBottom: "44px" }}>
                Tell us about your situation and we will respond as soon as possible.
              </p>

              <div style={{ marginBottom: "40px" }}>
                <p style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "12px" }}>Email</p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  style={{ fontSize: "15px", color: C.blueLight, fontWeight: 400 }}
                >
                  {siteConfig.contactEmail}
                </a>
              </div>

              <div>
                <p style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "16px" }}>Service areas</p>
                {["Career Services", "Business Enablement", "Technology Consulting"].map((service) => (
                  <p key={service} style={{ fontSize: "14px", color: C.textMuted, lineHeight: 1.6, marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: C.blue, fontSize: "12px" }}>—</span>
                    {service}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
