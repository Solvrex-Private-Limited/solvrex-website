"use client";

import Link from "next/link";
import { C, eyebrow, sectionHeading } from "../lib/theme";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { Reveal } from "./ui/Reveal";
import { Aurora } from "./ui/Aurora";

const styles = `
  .hx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .hx-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  .hx-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; position: relative; }
  .hx-cardlink:hover .hx-more { text-decoration: underline; }
  .hx-cardlink:focus-visible, .hx-btn:focus-visible { outline: 2px solid ${C.blueLight}; outline-offset: 2px; }
  @media (max-width: 900px) {
    .hx-grid-4 { grid-template-columns: repeat(2, 1fr); }
    .hx-grid-3 { grid-template-columns: 1fr; }
    .hx-steps { grid-template-columns: 1fr; gap: 22px; }
  }
  @media (max-width: 620px) {
    .hx-grid-4 { grid-template-columns: 1fr; }
  }
`;

const TRUST = [
  { title: "Senior-led delivery", body: "Experienced people do the work — not hand-offs to juniors." },
  { title: "Independent advice", body: "No vendor commissions or hidden incentives — just what fits." },
  { title: "Practical & measurable", body: "Focused on outcomes you can see, not slideware." },
  { title: "Transparent", body: "Clear scope, clear pricing, and clear communication throughout." },
];

const OFFERINGS = [
  {
    title: "Technology Consulting",
    body: "Independent guidance on platforms, architecture, and implementation — with no vendor affiliations.",
    href: "/services/technology-consulting",
  },
  {
    title: "Website & Digital Enablement",
    body: "Websites, online presence, and the digital foundations your business runs on.",
    href: "/services/business-enablement",
  },
  {
    title: "Sales Support",
    body: "Outreach, lead generation, and business-development support to grow your pipeline.",
    href: "/contact",
  },
  {
    title: "Marketing Support",
    body: "Content, social, and campaigns to build your brand and bring in customers.",
    href: "/contact",
  },
  {
    title: "Operational Support",
    body: "Process improvement and hands-on help to make day-to-day operations run smoother.",
    href: "/services/business-enablement",
  },
  {
    title: "Career Services",
    body: "Resume, LinkedIn, and job-search support for individuals and teams.",
    href: "/services/career-services",
  },
];

const STEPS = [
  { title: "Discovery", body: "We learn your goals, constraints, and where the friction really is." },
  { title: "Plan", body: "A clear, scoped plan — deliverables, timeline, and a transparent price." },
  { title: "Deliver", body: "We do the work alongside you and stay accountable to outcomes." },
];

const sectionPad = { padding: "88px 0", borderBottom: `1px solid ${C.border}` } as const;
const cardLabel = { fontSize: "16px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.01em" } as const;
const cardBody = { fontSize: "14px", color: C.textMuted, lineHeight: 1.6 } as const;

export function HomeBusiness() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      {/* Hero */}
      <section style={{ padding: "104px 0 96px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <Aurora variant="business" />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(195,157,83,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div className="sx-container" style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
          <p style={eyebrow}>Business Enablement</p>
          <h1 style={{ fontFamily: "var(--sx-font-serif)", fontSize: "clamp(38px, 5.6vw, 66px)", fontWeight: 400, color: C.text, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "26px" }}>
            Practical support to help your business operate and grow.
          </h1>
          <p style={{ fontSize: "18px", color: C.textMuted, lineHeight: 1.6, marginBottom: "40px", maxWidth: "640px" }}>
            Website and digital enablement, technology consulting, and sales, marketing, and
            operational support — delivered by a senior, independent team that focuses on real outcomes.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <PrimaryLink href="/book">Book Consultation<ArrowRight /></PrimaryLink>
            <Link
              href="/services"
              style={{ fontSize: "14px", color: C.textMuted, display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
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

      {/* What we do for businesses */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>What we do for businesses</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>Everything your business needs in one place.</h2>
            <div className="hx-grid-3">
              {OFFERINGS.map((o) => (
                <Link key={o.title} href={o.href} className="hx-cardlink" style={{ display: "flex", flexDirection: "column", padding: "22px", borderRadius: "10px" }}>
                  <h3 style={cardLabel}>{o.title}</h3>
                  <p style={{ ...cardBody, marginBottom: "18px", flex: 1 }}>{o.body}</p>
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

      {/* How we work */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <p style={eyebrow}>How we work</p>
            <h2 style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "44px" }}>A simple, accountable process.</h2>
            <div className="hx-steps">
              {STEPS.map((s, i) => (
                <div key={s.title}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: `1px solid ${C.blue}`, color: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, marginBottom: "16px" }}>
                    {i + 1}
                  </div>
                  <h3 style={cardLabel}>{s.title}</h3>
                  <p style={cardBody}>{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engagement / pricing */}
      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <div style={{ maxWidth: "680px" }}>
              <p style={eyebrow}>Engagements</p>
              <h2 style={{ ...sectionHeading, marginBottom: "20px" }}>Project-based or monthly retainer.</h2>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, marginBottom: "32px" }}>
                One-off builds and projects, or ongoing support as a monthly retainer — scoped to
                what your business actually needs. Tell us your goals and we&apos;ll tailor a quote.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <PrimaryLink href="/book">Request a quote<ArrowRight /></PrimaryLink>
                <Link href="/pricing" style={{ fontSize: "14px", color: C.blueLight, fontWeight: 500 }}>View pricing →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "96px 0" }}>
        <div className="sx-container">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <h2 style={{ fontFamily: "var(--sx-font-serif)", fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 400, color: C.text, letterSpacing: "-0.015em", lineHeight: 1.15, marginBottom: "18px" }}>
                Let&apos;s build what your business needs.
              </h2>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, marginBottom: "32px" }}>
                Book a free consultation — we&apos;ll review your situation and recommend practical next steps.
              </p>
              <PrimaryLink href="/book">Book Consultation<ArrowRight /></PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
