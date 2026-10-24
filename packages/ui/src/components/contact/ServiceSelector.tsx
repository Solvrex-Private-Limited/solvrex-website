"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { C } from "../../lib/theme";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CareerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 19C18 16.2386 15.3137 14 12 14C8.68629 14 6 16.2386 6 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BusinessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 2V6C13 7.10457 13.8954 8 15 8H19M9 13H15M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 2L22 7M22 7L17 12M22 7H13V16H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const services: Service[] = [
  {
    id: "career-services",
    title: "Career Services",
    description:
      "Resume reviews, interview prep, LinkedIn optimization, and job search strategy.",
    icon: <CareerIcon />,
  },
  {
    id: "business-enablement",
    title: "Business Enablement",
    description:
      "Strategic partnerships, product enquiries, and custom solutions for growth.",
    icon: <BusinessIcon />,
  },
  {
    id: "technology-consulting",
    title: "Technology Consulting",
    description:
      "Technical consulting, custom development, and innovation projects.",
    icon: <TechIcon />,
  },
];

interface ServiceSelectorProps {
  selectedService: string;
  onSelectService: (serviceId: string) => void;
}

export function ServiceSelector({
  selectedService,
  onSelectService,
}: ServiceSelectorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
      card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    },
    [],
  );

  const handleCardMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = "";
    },
    [],
  );

  return (
    <>
      <style>{`
        .sx-srv-section {
          padding-block: clamp(50px, 6vw, 80px);
        }
        .sx-srv-head {
          text-align: center;
          margin-bottom: 36px;
        }
        .sx-srv-eyebrow {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .sx-srv-head h2 {
          margin: 0 0 10px;
          font: 400 clamp(28px, 4vw, 44px)/1 "Instrument Serif", "Times New Roman", serif;
          letter-spacing: -0.02em;
          color: ${C.text};
        }
        .sx-srv-head p {
          margin: 0 auto;
          max-width: 340px;
          color: ${C.textMuted};
          font-size: 13px;
        }

        .sx-srv-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          perspective: 900px;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 860px) {
          .sx-srv-cards { grid-template-columns: 1fr; }
        }

        .sx-srv-card {
          background: ${C.bgSurface};
          border: 1px solid ${C.border};
          border-radius: 16px;
          padding: 20px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.25s ease-out, box-shadow 0.4s, border-color 0.4s;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }
        .sx-srv-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 0), color-mix(in srgb, #2563eb 12%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .sx-srv-card:hover::before {
          opacity: 1;
        }
        .sx-srv-card:hover {
          border-color: #2563eb;
          box-shadow: 0 12px 32px -12px color-mix(in srgb, #2563eb 35%, transparent);
          transform: translateY(-2px);
        }

        .sx-srv-icon {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: color-mix(in srgb, #2563eb 8%, transparent);
          margin-bottom: 14px;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s;
          color: #2563eb;
          stroke-width: 2;
          flex-shrink: 0;
        }
        .sx-srv-icon svg {
          width: 20px;
          height: 20px;
        }
        .sx-srv-card:hover .sx-srv-icon {
          transform: scale(1.08) rotate(-6deg);
          background: color-mix(in srgb, #2563eb 12%, transparent);
        }
        .sx-srv-card h3 {
          position: relative;
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: ${C.text};
        }
        .sx-srv-card p {
          position: relative;
          margin: 0 0 14px;
          color: ${C.textMuted};
          font-size: 12px;
          line-height: 1.4;
        }
        .sx-srv-go {
          position: relative;
          font-size: 11px;
          font-weight: 700;
          color: #2563eb;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: letter-spacing 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sx-srv-card:hover .sx-srv-go {
          letter-spacing: 0.1em;
        }

        /* Reveal animations */
        .sx-srv-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sx-srv-reveal.in {
          opacity: 1;
          transform: none;
        }
        .sx-srv-cards.in .sx-srv-card {
          animation: sx-srv-fade 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .sx-srv-cards.in .sx-srv-card:nth-child(2) { animation-delay: 0.15s; }
        .sx-srv-cards.in .sx-srv-card:nth-child(3) { animation-delay: 0.3s; }
        @keyframes sx-srv-fade {
          from { opacity: 0; transform: translateY(18px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-srv-reveal { opacity: 1; transform: none; transition: none; }
          .sx-srv-cards.in .sx-srv-card { animation: none; }
        }
      `}</style>

      <section className="sx-srv-section sx-container" ref={sectionRef}>
        <div className={`sx-srv-head sx-srv-reveal ${visible ? "in" : ""}`}>
          <p className="sx-srv-eyebrow">Our services</p>
          <h2>How we can help</h2>
          <p>
            Choose a service to get started, or tell us about your specific
            needs.
          </p>
        </div>

        <div className={`sx-srv-cards sx-srv-reveal ${visible ? "in" : ""}`}>
          {services.map((svc) => (
            <button
              key={svc.id}
              className="sx-srv-card"
              onClick={() => {
                onSelectService(svc.id);
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="sx-srv-icon">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
              <span className="sx-srv-go">Choose →</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
