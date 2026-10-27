"use client";
import Link from "next/link";
import { useRef } from "react";
import { C, eyebrow, pageH1 } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { BulletList } from "./ui/BulletList";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { type Article, getArticle } from "../data/resources";
import { RESOURCE_IMAGES } from "./ResourceGrid/resourceImages";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,400..800;1,400..800&display=swap");

  /* ── Holo Takeaways Card ── */
  @property --ratio-x {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }
  @property --correction {
    syntax: "<percent>";
    inherits: true;
    initial-value: 0%;
  }
  @property --ratio-y {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .sx-takeaways-wrap {
    position: relative;
    width: 100%;
    margin: 16px 0 48px;
    display: flex;
    justify-content: stretch;
    perspective: 30rem;
    font-family: "Mona Sans", "Mona-Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .holo-card {
    position: relative;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    color: #e2e8f0;
    padding: 32px 34px 28px;
    box-sizing: border-box;

    --ratio-x: 0;
    --ratio-y: 0;
    --correction: 100%;

    transform-style: preserve-3d;
    transition: transform 0.2s linear;
    transform: rotateY(calc(-14deg * var(--ratio-x)))
      rotateX(calc(14deg * var(--ratio-y)));

    background: linear-gradient(
      135deg,
      #0a0f1e 0%,
      #0d1433 40%,
      #0a1628 70%,
      #060c1a 100%
    );
    box-shadow:
      0 0 0 1px rgba(0, 147, 255, 0.18),
      0 8px 32px rgba(0, 80, 200, 0.25),
      inset 0 2px 2px 0 rgba(100, 180, 255, 0.12),
      inset 0 -2px 2px 0 rgba(0, 0, 0, 0.4);
  }

  .holo-card:hover {
    transform: rotateY(calc(-14deg * var(--ratio-x)))
      rotateX(calc(14deg * var(--ratio-y)));
    --correction: 0%;
  }
  .holo-card:hover .holo-bg {
    opacity: 0.7;
  }
  .holo-card:hover .circles {
    opacity: 0.7;
  }

  .holo-bg {
    position: absolute;
    border-radius: inherit;
    top: 0; right: 0; bottom: 0; left: 0;
    background: radial-gradient(
        ellipse at calc(85% - var(--ratio-x) * 20%) calc(5% - var(--ratio-y) * 20%),
        rgba(180, 220, 255, 0.6),
        hsl(200, 100%, 70%, 0.5) 1%,
        hsl(220, 100%, 60%, 0.55) 20%,
        transparent
      ),
      linear-gradient(
        110deg,
        #0050c8 calc(10% - var(--ratio-x) * 20%),
        #00b4ff calc(20% - var(--ratio-x) * 20%),
        #0050c8 calc(30% - var(--ratio-x) * 20%),
        hsl(220, 100%, 60%, 0.7) calc(60% - var(--ratio-x) * 20%),
        transparent calc(100% - var(--ratio-x) * 20%),
        transparent
      );
    transition: all 0.2s linear, opacity 0.8s ease;
    mix-blend-mode: hard-light;
    opacity: 0.18;
    pointer-events: none;
  }

  .holo-lines {
    content: "";
    position: absolute;
    border-radius: inherit;
    top: 0; right: 0; bottom: 0; left: 0;
    pointer-events: none;
    /* Diagonal line mask — pure CSS, no external image */
    -webkit-mask-image: repeating-linear-gradient(
      -45deg,
      #000 0px,
      #000 1.5px,
      transparent 1.5px,
      transparent 8px
    );
    mask-image: repeating-linear-gradient(
      -45deg,
      #000 0px,
      #000 1.5px,
      transparent 1.5px,
      transparent 8px
    );
    background: linear-gradient(
      110deg,
      #0050c8 calc(10% - var(--ratio-x) * 20% - var(--correction)),
      #00b4ff calc(20% - var(--ratio-x) * 20% - var(--correction)),
      #0077ff calc(30% - var(--ratio-x) * 20% - var(--correction)),
      hsl(195, 90%, calc(72% - 15% * var(--ratio-x)), 1)
        calc(40% - var(--ratio-x) * 20% - var(--correction)),
      transparent calc(60% - var(--ratio-x) * 20% - var(--correction)),
      #4040ff calc(70% - var(--ratio-x) * 20% - var(--correction)),
      transparent calc(80% - var(--ratio-x) * 20% - var(--correction))
    );
    opacity: 0.22;
    transition: all 0.2s linear;
  }
  .holo-card:hover .holo-lines {
    opacity: 0.45;
  }

  .circles {
    position: absolute;
    border-radius: inherit;
    overflow: hidden;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.08;
    pointer-events: none;
    transition: opacity 0.8s ease;
  }
  .circles::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at 50% 50%,
        hsl(200, 100%, 65%, 0.42) 0.25rem,
        transparent 0.25rem,
        transparent
      ) repeat;
    background-size: 1rem 1rem;
    background-position: left top;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .circles::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at 50% 50%,
        hsl(200, 100%, 65%, 0.42) 0.25rem,
        transparent 0.25rem,
        transparent
      ) repeat;
    background-size: 1rem 1rem;
    background-position: left top;
    transform: translate(50%, 100%) rotate(45deg);
  }

  /* Card inner content */
  .holo-card-content {
    position: relative;
    z-index: 2;
  }

  .card-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #60b4ff;
    margin-bottom: 20px;
  }
  .card-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #0093ff;
    box-shadow: 0 0 8px #0077ff, 0 0 16px #0050c8;
  }

  .takeaways-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 36px;
  }
  @media (max-width: 640px) {
    .takeaways-list {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
  .takeaways-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    font-size: 15.5px;
    line-height: 1.55;
    transition: transform 0.2s ease;
  }
  .takeaways-item:hover {
    transform: translateX(3px);
  }
  .takeaways-dash {
    color: #4da6ff;
    font-weight: 700;
    flex-shrink: 0;
    transition: color 0.2s ease, text-shadow 0.2s ease;
  }
  .takeaways-item:hover .takeaways-dash {
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
  }
  .takeaways-text {
    color: #d4e8ff;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  .takeaways-item:hover .takeaways-text {
    color: #ffffff;
  }

  .button-wrap {
    margin-top: 26px;
    padding-top: 18px;
    border-top: 1px solid rgba(0, 147, 255, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .takeaways-count {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #60a5fa;
    opacity: 0.85;
  }
  .sx-takeaways-wrap .button {
    width: fit-content;
    border-radius: 100px;
    padding: 9px 24px;
    background: rgba(0, 80, 200, 0.28);
    box-shadow:
      0 0 0 1px rgba(0, 147, 255, 0.35),
      inset 120px 0 100px -100px rgba(0, 0, 0, 0.6),
      0 0 16px rgba(0, 100, 255, 0.15);
    color: #a0d4ff;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: box-shadow 0.3s ease-in-out, transform 0.2s ease, color 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }
  .sx-takeaways-wrap .button:hover {
    background: rgba(0, 100, 240, 0.38);
    box-shadow:
      0 0 0 1px rgba(0, 180, 255, 0.6),
      inset 200px 0px 100px -100px rgba(0, 0, 0, 0.4),
      0 0 20px 2px rgba(0, 147, 255, 0.35);
    color: #ffffff;
    transform: translateY(-1px);
  }

  /* ── 3D Square Flip Cards (Keep Reading) ── */
  .centerflipcards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
    width: 100%;
    margin-top: 28px;
  }
  @media (max-width: 960px) {
    .centerflipcards {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
  }
  @media (max-width: 620px) {
    .centerflipcards {
      grid-template-columns: 1fr;
    }
  }

  .square-flip {
    perspective: 1000px;
    -webkit-perspective: 1000px;
    transform: perspective(1000px);
    -webkit-transform: perspective(1000px);
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 390px;
  }

  .square, .square2 {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-size: cover;
    background-position: center center;
    transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    -webkit-transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .square-flip .square {
    transform: rotateY(0deg);
    transform-style: preserve-3d;
    z-index: 1;
  }
  .square-flip:hover .square {
    transform: rotateY(-180deg);
    transform-style: preserve-3d;
  }

  .square-flip .square2 {
    transform: rotateY(180deg);
    transform-style: preserve-3d;
    z-index: 1;
  }
  .square-flip:hover .square2 {
    transform: rotateY(0deg);
    transform-style: preserve-3d;
  }

  /* Square content animations */
  .square-container {
    padding: 32px 24px;
    text-align: center;
    position: relative;
    top: 50%;
    transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    -webkit-transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    transform: translateY(-50%) translateX(0px) scale(1);
    transform-style: preserve-3d;
    z-index: 2;
  }
  .square-flip:hover .square-container {
    transform: translateY(-50%) translateX(-650px) scale(.88);
    transform-style: preserve-3d;
  }

  .square-container2 {
    padding: 32px 24px;
    text-align: center;
    position: relative;
    top: 50%;
    transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    -webkit-transition: transform 0.60s cubic-bezier(.5,.3,.3,1);
    transform: translateY(-50%) translateX(650px) translateZ(60px) scale(.88);
    transform-style: preserve-3d;
    z-index: 2;
  }
  .square-flip:hover .square-container2 {
    transform: translateY(-50%) translateX(0px) translateZ(0px) scale(1);
    transform-style: preserve-3d;
  }

  /* Square typography & overlay */
  .square-flip h2 {
    color: #ffffff;
    font-weight: 700;
    font-size: 19px;
    line-height: 1.35;
    margin: 10px 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  }
  .square-flip h3 {
    color: #e2e8f0;
    font-weight: 400;
    font-size: 14.5px;
    line-height: 1.55;
    margin-bottom: 22px;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
  }
  .square-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #60c0ff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  }
  .square-hint {
    margin-top: 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  }
  .square2-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7dd3fc;
    margin-bottom: 8px;
  }

  .flip-overlay {
    display: block;
    background: rgba(10, 14, 24, 0.55);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .flip-overlay-back {
    background: rgba(8, 12, 28, 0.84);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  /* Blue Read Guide button */
  .kallyas-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: auto;
    min-width: 148px;
    padding: 13px 26px;
    font-weight: 700;
    font-size: 13.5px;
    color: #ffffff !important;
    margin: 0 auto;
    border-radius: 999px;
    text-decoration: none;
    background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 49%, #0284c7 100%);
    box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .kallyas-button:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 10px 28px rgba(14, 165, 233, 0.7), 0 0 0 1px rgba(147, 197, 253, 0.45);
  }

  /* Shadows */
  .square-flip .square .boxshadow {
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.45);
    transition: box-shadow 0.6s ease;
  }
  .square-flip:hover .square .boxshadow {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  .square-flip .square2 .boxshadow {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow 0.6s ease;
  }
  .square-flip:hover .square2 .boxshadow {
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    .holo-card {
      transform: none !important;
      transition: none !important;
    }
    .square-flip .square,
    .square-flip .square2,
    .square-container,
    .square-container2 {
      transition: none !important;
    }
  }
`;

// Holographic Key Takeaways card — tilt driven by mouse position
function HoloTakeawaysCard({ items }: { items: string[] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0→1
    const y = (e.clientY - rect.top)  / rect.height;  // 0→1
    const rx = (x - 0.5) * 2;   // -1→1
    const ry = (y - 0.5) * -2;  // 1→-1 (invert Y)
    card.style.setProperty("--ratio-x", String(rx.toFixed(3)));
    card.style.setProperty("--ratio-y", String(ry.toFixed(3)));
    card.style.setProperty("--correction", "0%");
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--ratio-x", "0");
    card.style.setProperty("--ratio-y", "0");
    card.style.setProperty("--correction", "100%");
  }

  return (
    <div className="sx-takeaways-wrap">
      <div
        ref={cardRef}
        className="holo-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Holographic shimmer layers */}
        <div className="holo-bg" aria-hidden="true" />
        <div className="holo-lines" aria-hidden="true" />
        <div className="circles" aria-hidden="true" />

        {/* Content */}
        <div className="holo-card-content">
          <div className="card-badge">
            <span className="card-badge-dot" />
            KEY TAKEAWAYS
          </div>
          <ul className="takeaways-list">
            {items.map((item) => (
              <li key={item} className="takeaways-item">
                <span className="takeaways-dash">—</span>
                <span className="takeaways-text">{item}</span>
              </li>
            ))}
          </ul>
          <div className="button-wrap">
            <span className="takeaways-count">
              {items.length} Core Insights
            </span>
            <a href="#article-sections" className="button">
              Explore Breakdown ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <h1 style={{ ...pageH1, maxWidth: "780px", marginBottom: "20px" }}>
            <div className="fx-shimmer">{article.title}</div>
          </h1>
          <p style={{ fontSize: "18px", color: C.textMuted, lineHeight: 1.65, maxWidth: "680px" }}>{article.summary}</p>
        </div>
      </section>

      {/* Body */}
      <section id="article-content" style={{ padding: "48px 0 80px" }}>
        <div className="sx-container" style={{ maxWidth: "760px" }}>

          {/* Holographic Key Takeaways Card */}
          <HoloTakeawaysCard items={article.keyTakeaways} />

          {/* Sections */}
          <div id="article-sections">
            {article.sections.map((section) => (
              <div key={section.heading} style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "21px", fontWeight: 600, color: C.text, letterSpacing: "-0.015em", marginBottom: "16px" }}>{section.heading}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} style={{ fontSize: "15.5px", color: C.textBody, lineHeight: 1.75, marginBottom: "14px" }}>{p}</p>
                ))}
                {section.bullets && <BulletList items={section.bullets} />}
              </div>
            ))}
          </div>

          {/* Inline CTAs */}
          <div style={{ marginTop: "8px", paddingTop: "32px", borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: "22px", alignItems: "center" }}>
            <PrimaryLink href="/services/career-services">Explore Career Services<ArrowRight /></PrimaryLink>
            <Link href="/pricing" style={{ fontSize: "14px", color: C.blueLight, fontWeight: 500 }}>View pricing →</Link>
            <Link href="/book" style={{ fontSize: "14px", color: C.blueLight, fontWeight: 500 }}>Book a consultation →</Link>
          </div>
        </div>
      </section>

      {/* Related resources — 3D Square Flip Cards */}
      {related.length > 0 && (
        <section style={{ padding: "64px 0 96px", borderTop: `1px solid ${C.border}` }}>
          <div className="sx-container">
            <p style={eyebrow}>Related resources</p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 300, color: C.text, letterSpacing: "-0.02em", marginBottom: "32px" }}>Keep reading.</h2>
            <div className="centerflipcards">
              {related.map((r) => {
                const img = RESOURCE_IMAGES[r.slug];
                const bgImg = img?.src || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
                const bgPos = img?.position || "center center";

                return (
                  <div key={r.slug} className="square-flip">
                    {/* Front */}
                    <div
                      className="square"
                      style={{ backgroundImage: `url(${bgImg})`, backgroundPosition: bgPos }}
                    >
                      <div className="boxshadow" />
                      <div className="flip-overlay" />
                      <div className="square-container">
                        <div className="square-tag">{r.category} · {r.readingTime}</div>
                        <h2>{r.title}</h2>
                        <div className="square-hint">Hover to explore ↻</div>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="square2"
                      style={{ backgroundImage: `url(${bgImg})`, backgroundPosition: bgPos }}
                    >
                      <div className="boxshadow" />
                      <div className="flip-overlay flip-overlay-back" />
                      <div className="square-container2">
                        <div className="square2-tag">{r.category}</div>
                        <h3>{r.summary}</h3>
                        <Link href={`/resources/${r.slug}`} className="kallyas-button">
                          Read guide →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
