import Link from "next/link";
import { C, eyebrow, pageH1 } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { BulletList } from "./ui/BulletList";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { type Article, getArticle } from "../data/resources";

const styles = `
  .ar-related { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; grid-auto-rows: 1fr; }
  .ar-card:hover .ar-more { text-decoration: underline; }
  @media (max-width: 760px) { .ar-related { grid-template-columns: 1fr; grid-auto-rows: auto; } }
`;

export function ArticlePage({ article }: { article: Article }) {
  const related = article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>

      {/* Hero */}
      <section style={{ padding: "80px 0 56px", borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container" style={{ maxWidth: "820px" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: article.title }]} />
          <p style={eyebrow}>{article.category} · {article.readingTime}</p>
          <h1 style={{ ...pageH1, maxWidth: "720px", marginBottom: "20px" }}>{article.title}</h1>
          <p style={{ fontSize: "18px", color: C.textMuted, lineHeight: 1.65, maxWidth: "680px" }}>{article.summary}</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "48px 0 80px" }}>
        <div className="sx-container" style={{ maxWidth: "760px" }}>
          {/* Key takeaways */}
          <div style={{ background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "26px 28px", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "16px" }}>
              Key takeaways
            </p>
            <BulletList items={article.keyTakeaways} />
          </div>

          {/* Sections */}
          {article.sections.map((section) => (
            <div key={section.heading} style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "21px", fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: "16px" }}>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} style={{ fontSize: "15.5px", color: C.textBody, lineHeight: 1.75, marginBottom: "14px" }}>{p}</p>
              ))}
              {section.bullets && <BulletList items={section.bullets} />}
            </div>
          ))}

          {/* Inline CTAs */}
          <div style={{ marginTop: "8px", paddingTop: "32px", borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: "22px", alignItems: "center" }}>
            <PrimaryLink href="/services/career-services">Explore Career Services<ArrowRight /></PrimaryLink>
            <Link href="/pricing" style={{ fontSize: "14px", color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}>View pricing →</Link>
            <Link href="/book" style={{ fontSize: "14px", color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}>Book a consultation →</Link>
          </div>
        </div>
      </section>

      {/* Related resources */}
      {related.length > 0 && (
        <section style={{ padding: "64px 0", borderTop: `1px solid ${C.border}` }}>
          <div className="sx-container">
            <p style={eyebrow}>Related resources</p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 300, color: C.text, letterSpacing: "-0.02em", marginBottom: "32px" }}>Keep reading.</h2>
            <div className="ar-related">
              {related.map((r) => (
                <Link key={r.slug} href={`/resources/${r.slug}`} className="ar-card" style={{ display: "flex", flexDirection: "column", padding: "22px", borderRadius: "10px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSubtle, marginBottom: "12px" }}>{r.category} · {r.readingTime}</p>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{r.title}</h3>
                  <p style={{ fontSize: "14px", color: C.textMuted, lineHeight: 1.6, marginBottom: "18px", flex: 1 }}>{r.summary}</p>
                  <span className="ar-more" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 500, color: "var(--sx-gold, #e5c07b)" }}>
                    Read guide
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
