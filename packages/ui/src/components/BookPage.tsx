import { C } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { ConsultationForm } from "./ConsultationForm";

const points = [
  "A real human reviews your situation before we talk.",
  "Honest, practical next steps — no pressure, no obligation.",
  "Tailored to your goals, experience, and where you are in your search.",
];

export function BookPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Header */}
      <section style={{ padding: "80px 0 64px", borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book Consultation" }]} />
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.blue, marginBottom: "22px" }}>
            Book a consultation
          </p>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: C.text, letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "560px" }}>
            Let&apos;s find your next step.
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "72px 0" }}>
        <div className="sx-container">
          <div className="sx-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "88px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.72, marginBottom: "32px" }}>
                Share a little about your goals and we&apos;ll review your profile and recommend
                practical next steps. Tell us what you&apos;re working toward in the message.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {points.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14.5px", color: C.textBody, lineHeight: 1.6 }}>
                    <span style={{ color: C.blue, flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ConsultationForm submitLabel="Request consultation" defaultSubject="career-services" successText="We'll review your profile and follow up with next steps." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
