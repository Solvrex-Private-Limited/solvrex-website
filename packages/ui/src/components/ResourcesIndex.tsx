import Link from "next/link";
import { C, eyebrow, pageH1 } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { RESOURCES } from "../data/resources";
import { Aurora } from "./ui/Aurora";

const styles = `
  .sx-res-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; grid-auto-rows: 1fr; }
  .sx-res-card { display: flex; flex-direction: column; padding: 24px; border-radius: 10px; }
  .sx-res-card:hover .sx-detail { text-decoration: underline; }
  .sx-res-card:focus-visible { outline: 2px solid var(--sx-gold, #e5c07b); outline-offset: 2px; }
  @media (max-width: 620px) { .sx-res-grid { grid-template-columns: 1fr; grid-auto-rows: auto; } }
`;

export function ResourcesIndex() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      <section style={{ padding: "80px 0 56px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <Aurora variant="resources" />
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <p style={eyebrow}>Resources</p>
          <h1 style={{ ...pageH1, maxWidth: "560px", marginBottom: "18px" }}>Career resources.</h1>
          <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, maxWidth: "620px" }}>
            Practical, no-fluff guides on resumes, LinkedIn, referrals, planning your search,
            and interview preparation — written from real career-support work.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0 88px" }}>
        <div className="sx-container">
          <div className="sx-res-grid">
            {RESOURCES.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="sx-res-card" aria-label={a.title}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "14px" }}>
                  {a.category} · {a.readingTime}
                </p>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{a.title}</h2>
                <p style={{ fontSize: "14px", color: C.textMuted, lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>{a.summary}</p>
                <span className="sx-detail" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 500, color: "var(--sx-gold, #e5c07b)" }}>
                  Read guide
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
