"use client";

import Link from "next/link";
import { C, eyebrow, sectionHeading } from "../lib/theme";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { Reveal } from "./ui/Reveal";
import { CareerJourney } from "./CareerJourney";
import { Aurora } from "./ui/Aurora";
import { CAREER_SERVICES } from "../data/careerServices";
import { PRICING_TIERS, PRICING_IS_PLACEHOLDER } from "../lib/pricing";
import { RESOURCES } from "../data/resources";

const styles = `
  .hx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .hx-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  .hx-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .hx-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; position: relative; }
  .hx-cardlink:hover .hx-more { text-decoration: underline; }
  .hx-cardlink:focus-visible, .hx-btn:focus-visible { outline: 2px solid ${C.blueLight}; outline-offset: 2px; }
  @media (max-width: 900px) {
    .hx-grid-4 { grid-template-columns: repeat(2, 1fr); }
    .hx-grid-3 { grid-template-columns: 1fr; }
    .hx-steps { grid-template-columns: 1fr; gap: 22px; }
    .hx-stepline { display: none !important; }
  }
  @media (max-width: 620px) {
    .hx-grid-4 { grid-template-columns: 1fr; }
    .hx-grid-2 { grid-template-columns: 1fr; }
  }
`;

const TRUST = [
  { title: "Human Reviewed", body: "Every profile receives real human review and feedback." },
  { title: "Personalized Guidance", body: "Recommendations tailored to your goals and experience." },
  { title: "Independent Advice", body: "No recruitment commissions or hidden incentives." },
  { title: "Practical Support", body: "Focused on actions that improve outcomes." },
];

const STEPS = [
  "Profile Assessment",
  "Resume & LinkedIn Review",
  "Job Search Strategy",
  "Application Support",
  "Interview Preparation",
];

const INSIGHTS = [
  "Tailored resumes generally outperform generic resumes in recruiter screening processes.",
  "Employee referrals remain among the highest-converting hiring channels.",
  "Complete LinkedIn profiles receive significantly greater recruiter visibility than incomplete profiles.",
  "Strategic follow-up outreach can increase application visibility.",
];

const sectionPad = { padding: "88px 0", borderBottom: `1px solid ${C.border}` } as const;
const cardLabel = { fontSize: "16px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.01em" } as const;
const cardBody = { fontSize: "14px", color: C.textMuted, lineHeight: 1.6 } as const;

export function Home() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      {/* ── 1. Hero ── */}
      <section style={{ padding: "104px 0 64px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(212,175,55,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "760px" }}>
          <p style={eyebrow}>Career Services</p>
          <h1 style={{ fontSize: "clamp(38px, 5.6vw, 66px)", fontWeight: 300, color: C.text, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "26px" }}>
            Practical career guidance for professionals in transition.
          </h1>
          <p style={{ fontSize: "18px", color: C.textMuted, lineHeight: 1.6, marginBottom: "40px", maxWidth: "620px" }}>
            Resume reviews, LinkedIn optimization, application strategy, interview preparation, and
            personalized support designed to help professionals move forward with confidence.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
            <PrimaryLink href="/book">Book Consultation<ArrowRight /></PrimaryLink>
            <Link
              href="/services/career-services"
              style={{ fontSize: "14px", color: C.textMuted, display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
            >
              Explore Career Services →
            </Link>
          </div>
          </div>
          <div style={{ marginTop: "56px" }}><CareerJourney /></div>
        </div>
      </section>

      {/* ── 2. Trust bar ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <div className="hx-grid-4">
              {TRUST.map((t) => (
                <div key={t.title} style={{ padding: "4px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.blue, marginBottom: "16px" }} aria-hidden="true" />
                  <h3 style={cardLabel}>{t.title}</h3>
                  <p style={cardBody}>{t.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. How it works ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>How it works</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>How Career Services Works</h2>
            <div className="hx-steps">
              {/* drawn connector line (desktop) */}
              <div className="hx-stepline sx-line" aria-hidden="true" style={{ position: "absolute", top: "15px", left: "10%", right: "10%", height: "1px", background: C.borderStrong }} />
              {STEPS.map((step, i) => (
                <div key={step} style={{ position: "relative" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: `1px solid ${C.blue}`, background: "transparent", color: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, marginBottom: "16px", position: "relative", zIndex: 1 }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "14.5px", fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{step}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Career Services ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>Career Services</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>What we help with.</h2>
            <div className="hx-grid-3">
              {CAREER_SERVICES.map((s) => (
                <Link key={s.title} href="/services/career-services" className="hx-cardlink" style={{ display: "flex", flexDirection: "column", padding: "22px", borderRadius: "10px" }}>
                  <h3 style={cardLabel}>{s.title}</h3>
                  <p style={{ ...cardBody, marginBottom: "14px" }}>{s.description}</p>
                  <p style={{ fontSize: "12.5px", color: C.textSubtle, lineHeight: 1.55, marginBottom: "18px", flex: 1 }}>
                    <span style={{ color: C.blueLight }}>Outcome:</span> {s.outcome}
                  </p>
                  <span className="hx-more" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 500, color: C.blueLight }}>
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Research insights ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>Evidence</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>What Research Suggests</h2>
            <div className="hx-grid-2">
              {INSIGHTS.map((insight, i) => (
                <div key={i} style={{ padding: "22px", borderRadius: "10px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: C.blue, fontVariantNumeric: "tabular-nums", marginTop: "2px" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: "15px", color: C.textBody, lineHeight: 1.65 }}>{insight}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "12.5px", color: C.textSubtle, lineHeight: 1.6, marginTop: "28px", maxWidth: "640px" }}>
              Sources include LinkedIn, Jobvite, Glassdoor, Indeed Hiring Research, ResumeLab.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Pricing preview ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>Pricing</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>Plans for every stage.</h2>
            <div className="hx-grid-3">
              {PRICING_TIERS.map((tier) => (
                <div key={tier.slug} style={{ display: "flex", flexDirection: "column", padding: "24px", borderRadius: "10px", background: tier.highlighted ? C.bgSurface : "transparent" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, color: C.text, marginBottom: "6px" }}>{tier.name}</h3>
                  <p style={{ fontSize: "13px", color: C.textSubtle, marginBottom: "16px" }}>
                    {PRICING_IS_PLACEHOLDER ? "Pricing on consultation" : `Starting from ${tier.priceFrom}`}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: "10px", fontSize: "13.5px", color: C.textMuted, lineHeight: 1.5 }}>
                        <span style={{ color: C.blue }}>—</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "32px" }}>
              <PrimaryLink href="/pricing" variant="outline">View Full Pricing<ArrowRight /></PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Resources ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>Resources</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>Career Resources</h2>
            <div className="hx-grid-3">
              {RESOURCES.map((a) => (
                <Link key={a.slug} href={`/resources/${a.slug}`} className="hx-cardlink" style={{ display: "flex", flexDirection: "column", padding: "22px", borderRadius: "10px" }}>
                  <h3 style={cardLabel}>{a.title}</h3>
                  <p style={{ ...cardBody, marginBottom: "18px", flex: 1 }}>{a.description}</p>
                  <span className="hx-more" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 500, color: C.blueLight }}>
                    Read guide
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Founder philosophy ── */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <div style={{ maxWidth: "680px" }}>
              <p style={eyebrow}>Our philosophy</p>
              <h2 style={{ ...sectionHeading, marginBottom: "24px" }}>Why Solvrex Exists</h2>
              <p style={{ fontSize: "16px", color: C.textBody, lineHeight: 1.78, marginBottom: "18px" }}>
                Solvrex was created by professionals who experienced the realities of job searching,
                skill development, and career transitions firsthand.
              </p>
              <p style={{ fontSize: "16px", color: C.textBody, lineHeight: 1.78, marginBottom: "18px" }}>
                We believe career guidance should be practical, personalized, and rooted in
                real-world experience.
              </p>
              <p style={{ fontSize: "16px", color: C.textBody, lineHeight: 1.78 }}>
                Our goal is to reduce the complexity of navigating opportunities so individuals can
                focus on building meaningful careers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section style={{ padding: "96px 0" }}>
        <div className="sx-container">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <h2 style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 300, color: C.text, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "18px" }}>
                Start with a Free Resume Assessment.
              </h2>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, marginBottom: "32px" }}>
                Upload your resume and tell us about your goals. We&apos;ll review your profile and
                recommend practical next steps.
              </p>
              <PrimaryLink href="/book">Get Free Assessment<ArrowRight /></PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
