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
      <section style={{ padding: "64px 0 40px", borderBottom: `1px solid rgba(230,223,211,0.6)` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book Consultation" }]} />
          <div style={{ marginTop: "24px", marginBottom: "28px" }}>
            <span style={{ display: "inline-block", padding: "8px 20px", borderRadius: "100px", backgroundColor: C.blue, color: "#ffffff", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
              Book Consultation
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--sx-font-serif)", fontSize: "clamp(42px, 5.5vw, 68px)", fontWeight: 400, color: C.text, letterSpacing: "-0.015em", lineHeight: 1.1, maxWidth: "680px" }}>
            Let&apos;s find your next step.
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "48px 0 96px" }}>
        <div className="sx-container">
          <div className="sx-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "80px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.75, marginBottom: "36px" }}>
                Share a little about your goals and <strong>we&apos;ll review your profile and recommend</strong> practical next steps. Tell us what you&apos;re working toward in the message.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
                {points.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "14px", fontSize: "15px", color: C.textBody, lineHeight: 1.65 }}>
                    <span style={{ color: C.textSubtle, flexShrink: 0, marginTop: "1px", fontWeight: 600 }}>—</span>
                    <span>
                      {p.includes("your situation") ? (
                        <>A real human reviews <strong>your situation</strong> before we talk.</>
                      ) : p.includes("no pressure") ? (
                        <>Honest, practical next steps — <strong>no pressure, no obligation</strong>.</>
                      ) : (
                        <><strong>Tailored to your goals</strong>, experience, and where you are in your search.</>
                      )}
                    </span>
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
