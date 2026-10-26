"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "../../lib/theme";
import { siteConfig } from "../../lib/site";

const TITLE = "Contact";

export function ContactHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translateX(${-window.scrollY * 0.18}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      const px = (e.clientX - window.innerWidth / 2) / window.innerWidth * -40;
      const py = (e.clientY - window.innerHeight / 2) / window.innerHeight * -40;
      stageRef.current.style.setProperty("--px", String(px));
      stageRef.current.style.setProperty("--py", String(py));

      // Eye tracking
      const pupils = stageRef.current.querySelectorAll<HTMLElement>(".sx-pupil");
      pupils.forEach((p) => {
        const parent = p.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx);
        const m = Math.min(r.width * 0.26, Math.hypot(dx, dy) / 8);
        p.style.transform = `translate(${Math.cos(a) * m}px, ${Math.sin(a) * m}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .sx-hero-contact {
          position: relative;
          min-height: calc(100vh - 68px);
          display: grid;
          grid-template-columns: 64px 1fr;
          border-bottom: 1px solid ${C.border};
          overflow: hidden;
          background: ${C.bg};
        }
        @media (max-width: 700px) {
          .sx-hero-contact { grid-template-columns: 1fr; }
          .sx-hero-rail { display: none !important; }
          .sx-hero-eyes { display: none !important; }
        }
        .sx-hero-rail {
          border-right: 1px solid ${C.border};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sx-hero-rail span {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.textSubtle};
        }
        .sx-hero-stage {
          position: relative;
          padding: clamp(40px, 8vh, 90px) clamp(20px, 4vw, 64px) 0;
        }
        .sx-hero-ghost {
          position: absolute;
          left: -2vw;
          top: 14%;
          font: 400 36vw/1 "Anton", Impact, "Arial Narrow", sans-serif;
          color: ${C.textSubtle};
          opacity: 0.08;
          white-space: nowrap;
          pointer-events: none;
        }
        .sx-hero-meta {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${C.textSubtle};
          animation: sx-hero-fade 1s 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .sx-hero-h1 {
          position: relative;
          z-index: 2;
          margin: clamp(30px, 7vh, 80px) 0 0;
          display: flex;
          overflow: hidden;
          font: 400 clamp(50px, 14vw, 220px)/0.95 "Inter", system-ui, sans-serif;
          text-transform: uppercase;
          color: #2563eb;
          padding-bottom: 0.04em;
          letter-spacing: -0.02em;
          font-weight: 300;
        }
        .sx-hero-h1 span {
          display: inline-block;
          font-weight: 400;
          transform: translateY(110%) rotate(8deg);
          animation: sx-hero-rise 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .sx-hero-lead {
          position: relative;
          z-index: 2;
          max-width: 330px;
          margin: 20px 0 0;
          color: ${C.textMuted};
          font-size: 16px;
          animation: sx-hero-fade 1s 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          padding-bottom: clamp(40px, 8vh, 90px);
        }
        .sx-hero-clouds {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transform: translate(calc(var(--px, 0) * 1px), calc(var(--py, 0) * 1px));
          transition: transform 0.3s linear;
        }
        .sx-cloud {
          position: absolute;
          border-radius: 50%;
          background: ${C.bgSurface};
          animation: sx-cloud-bob 7s ease-in-out infinite;
        }
        .sx-cloud-1 { width: 34vw; aspect-ratio: 1; left: -8vw; bottom: -14vw; }
        .sx-cloud-2 { width: 24vw; aspect-ratio: 1; left: 14vw; bottom: -12vw; animation-delay: -2s; }
        .sx-cloud-3 { width: 42vw; aspect-ratio: 1; right: -10vw; bottom: -22vw; animation-delay: -4s; }
        .sx-cloud-4 { width: 18vw; aspect-ratio: 1; right: 26vw; bottom: -10vw; animation-delay: -1s; }
        .sx-hero-eyes {
          position: absolute;
          left: 5vw;
          bottom: 2vw;
          display: flex;
          gap: 1.2vw;
          z-index: 1;
        }
        .sx-hero-eye {
          width: 5.4vw;
          max-width: 80px;
          aspect-ratio: 0.72;
          border-radius: 50%;
          background: #fff;
          position: relative;
          overflow: hidden;
          animation: sx-eye-blink 6s infinite;
          transform-origin: center;
          transition: background 0.4s ease;
          cursor: pointer;
          border: 1.5px solid #000;
        }
        .sx-hero-eye:hover {
          background: #2563eb;
        }
        .sx-pupil {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 46%;
          aspect-ratio: 1;
          margin: -23%;
          border-radius: 50%;
          background: #0b1a26;
        }
        .sx-hero-badge {
          position: absolute;
          right: clamp(20px, 6vw, 90px);
          top: clamp(100px, 18vh, 200px);
          width: clamp(110px, 13vw, 190px);
          z-index: 3;
          animation: sx-badge-spin 14s linear infinite;
        }
        .sx-hero-badge text {
          font: 800 13.5px "Inter", system-ui, sans-serif;
          letter-spacing: 0.2em;
          fill: ${C.text};
          text-transform: uppercase;
        }

        @keyframes sx-hero-rise { to { transform: none; } }
        @keyframes sx-hero-fade { from { opacity: 0; transform: translateY(18px); } }
        @keyframes sx-cloud-bob { 50% { transform: translateY(-16px); } }
        @keyframes sx-eye-blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
        @keyframes sx-badge-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .sx-hero-h1 span, .sx-hero-meta, .sx-hero-lead { transform: none; opacity: 1; animation: none; }
          .sx-cloud, .sx-hero-eye, .sx-hero-badge { animation: none; }
        }
      `}</style>

      <header className="sx-hero-contact" id="top">
        <div className="sx-hero-rail">
          <span>007 — Contact</span>
        </div>
        <div className="sx-hero-stage" ref={stageRef}>
          <div className="sx-hero-ghost" ref={ghostRef} aria-hidden="true">
            CONTACT
          </div>

          {/* Parallax clouds */}
          <div className="sx-hero-clouds" aria-hidden="true">
            <div className="sx-cloud sx-cloud-1" />
            <div className="sx-cloud sx-cloud-2" />
            <div className="sx-cloud sx-cloud-3" />
            <div className="sx-cloud sx-cloud-4" />
            {/* Eyes */}
            <div className="sx-hero-eyes">
              <div className="sx-hero-eye">
                <i className="sx-pupil" />
              </div>
              <div className="sx-hero-eye">
                <i className="sx-pupil" />
              </div>
            </div>
          </div>

          {/* Spinning badge */}
          <svg className="sx-hero-badge" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="sx-badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#sx-badge-path">
                {"Let's talk • Let's talk • Let's talk •"}
              </textPath>
            </text>
            <circle cx="60" cy="60" r="6" fill="#2563eb" />
          </svg>

          <div className="sx-hero-meta">
            <span>{siteConfig.name}</span>
            <span>Reply within 24 hours</span>
          </div>

          <h1 className="sx-hero-h1" aria-label="Contact">
            {mounted
              ? TITLE.split("").map((char, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                ))
              : TITLE}
          </h1>

          <p className="sx-hero-lead">
            Practical technology and business solutions for organizations built
            to last.
          </p>
        </div>
      </header>
    </>
  );
}
