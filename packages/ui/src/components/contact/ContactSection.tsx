"use client";

import { useEffect, useRef } from "react";
import { C } from "../../lib/theme";
import { siteConfig } from "../../lib/site";
import { ConsultationForm } from "../ConsultationForm";

interface ContactSectionProps {
  selectedService: string;
}

const serviceMap: { [key: string]: string } = {
  "career-services": "career-services",
  "business-enablement": "business-enablement",
  "technology-consulting": "technology-consulting",
};

export function ContactSection({ selectedService }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Animate left and right columns
    const animateElement = (el: HTMLDivElement | null, delay: number, direction: "left" | "right") => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = direction === "left" ? "translateX(-30px)" : "translateX(30px)";

      if (!prefersReduced) {
        setTimeout(() => {
          el.style.transition = "all 0.7s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
        }, delay);
      } else {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }
    };

    animateElement(leftRef.current, 200, "left");
    animateElement(rightRef.current, 300, "right");
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "100px 0",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="sx-container">
        {/* Section header */}
        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.blue,
              marginBottom: "16px",
            }}
          >
            READY TO START?
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300,
              color: C.text,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Send us your details
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: C.textMuted,
              lineHeight: 1.6,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Fill out the form below and we'll get back to you within 24 hours with next steps.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: Contact info */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            {/* Email */}
            <div style={{ marginBottom: "56px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textSubtle,
                  marginBottom: "12px",
                }}
              >
                Email
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: C.blue,
                  textDecoration: "none",
                  transition: "opacity 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                }}
              >
                {siteConfig.contactEmail}
              </a>
            </div>

            {/* Response time */}
            <div style={{ marginBottom: "56px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textSubtle,
                  marginBottom: "12px",
                }}
              >
                Response Time
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: C.textBody,
                  lineHeight: 1.6,
                }}
              >
                We typically respond within 24 hours during business days.
              </p>
            </div>

            {/* Service areas */}
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textSubtle,
                  marginBottom: "16px",
                }}
              >
                Services
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Career Services",
                  "Business Enablement",
                  "Technology Consulting",
                ].map((service) => (
                  <li
                    key={service}
                    style={{
                      fontSize: "14px",
                      color: C.textMuted,
                      lineHeight: 1.6,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLLIElement).style.color = C.blue;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLLIElement).style.color =
                        C.textMuted;
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: C.blue,
                        flexShrink: 0,
                      }}
                    />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              padding: "56px",
              backgroundColor: C.bgSurface,
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
            }}
            id="contact-form"
          >
            <ConsultationForm
              submitLabel="Send message"
              defaultSubject={
                selectedService ? serviceMap[selectedService] || "" : ""
              }
              successText="Thank you for reaching out! We'll be in touch soon."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
