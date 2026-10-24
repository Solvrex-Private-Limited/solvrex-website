"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "../../lib/theme";
import { siteConfig } from "../../lib/site";
import { ConsultationForm } from "../ConsultationForm";

interface ContactFormProps {
  selectedService: string;
}

const serviceMap: { [key: string]: string } = {
  "career-services": "career-services",
  "business-enablement": "business-enablement",
  "technology-consulting": "technology-consulting",
};

export function ContactForm({ selectedService }: ContactFormProps) {
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

  return (
    <>
      <style>{`
        .sx-ct-dark {
          background: ${C.bgSurface};
          color: ${C.text};
          --muted: ${C.textMuted};
          --line: ${C.border};
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 900px) {
          .sx-ct-dark {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }
        .sx-ct-mail {
          display: inline-block;
          font: 400 clamp(34px, 9vw, 150px)/1 "Anton", Impact, "Arial Narrow", sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          background: linear-gradient(#2563eb, #2563eb) 0 100% / 100% 4px no-repeat;
          padding-bottom: 0.06em;
          transition: background-size 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.4s;
          color: ${C.text};
          text-decoration: none;
          grid-column: 1 / -1;
          padding: clamp(40px, 6vw, 80px);
          padding-bottom: clamp(30px, 4vw, 50px);
        }
        @media (max-width: 900px) {
          .sx-ct-mail {
            grid-column: auto;
          }
        }
        .sx-ct-mail:hover {
          background-size: 100% 100%;
          color: #fff;
        }
        .sx-ct-grid {
          display: contents;
        }
        .sx-ct-info {
          padding: clamp(40px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .sx-ct-form-wrap {
          padding: clamp(40px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .sx-ct-info h3 {
          margin: 0 0 16px;
          font: 400 clamp(38px, 5vw, 70px)/1 "Instrument Serif", "Times New Roman", serif;
          color: ${C.text};
        }
        .sx-ct-info > p {
          color: ${C.textMuted};
          max-width: 380px;
          margin: 0 0 34px;
        }
        .sx-ct-fact {
          padding: 18px 0;
          border-top: 1px solid ${C.border};
        }
        .sx-ct-fact small {
          display: block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.textMuted};
          margin-bottom: 4px;
        }
        .sx-ct-fact span {
          font-weight: 500;
          font-size: 20px;
          color: ${C.text};
        }
        .sx-ct-fact ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .sx-ct-fact li {
          color: ${C.text};
          padding: 2px 0;
          font-size: 15px;
        }
        .sx-ct-fact li::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          margin-right: 10px;
          vertical-align: middle;
        }

        /* Override consultation form input styles for theme-aware section */
        .sx-ct-form-wrap .sx-input {
          background-color: ${C.bg} !important;
          border-color: ${C.border} !important;
          color: ${C.text} !important;
        }
        .sx-ct-form-wrap .sx-input:focus {
          border-color: #2563eb !important;
          background-color: ${C.bg} !important;
          box-shadow: 0 0 0 4px color-mix(in srgb, #2563eb 10%, transparent) !important;
        }
        .sx-ct-form-wrap .sx-input::placeholder {
          color: ${C.textMuted} !important;
        }
        .sx-ct-form-wrap label {
          color: ${C.textMuted} !important;
        }

        /* Reveal */
        .sx-ct-rv {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sx-ct-rv.in {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .sx-ct-rv { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <section className="sx-ct-dark" ref={sectionRef} id="contact-form">
        <a
          className={`sx-ct-mail sx-ct-rv ${visible ? "in" : ""}`}
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </a>

        <div className={`sx-ct-info sx-ct-rv ${visible ? "in" : ""}`}>
          <h3>Send us your details</h3>
          <p>
            Fill out the form and we&apos;ll get back to you within 24 hours
            with next steps.
          </p>
          <div className="sx-ct-fact">
            <small>Response time</small>
            <span>Within 24 hours, business days</span>
          </div>
          <div className="sx-ct-fact">
            <small>Services</small>
            <ul>
              <li>Career Services</li>
              <li>Business Enablement</li>
              <li>Technology Consulting</li>
            </ul>
          </div>
        </div>

        <div className={`sx-ct-form-wrap sx-ct-rv ${visible ? "in" : ""}`}>
          <ConsultationForm
            submitLabel="Send message"
            defaultSubject={
              selectedService ? serviceMap[selectedService] || "" : ""
            }
            successText="Thank you for reaching out! We'll be in touch soon."
          />
        </div>
      </section>
    </>
  );
}
