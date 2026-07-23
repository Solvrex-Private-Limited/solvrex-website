"use client";

import Link from "next/link";
import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { CAREER_SERVICES } from "../../data/careerServices";
import { sectionPad, cardLabel, cardBody } from "../../lib/homestyles";

export function CareerSection() {
  return (
    <section style={sectionPad}>
      <div className="sx-container">
        <Reveal>
          <p style={eyebrow}>Career Services</p>

          <h2
            style={{
              ...sectionHeading,
              maxWidth: "560px",
              marginBottom: "44px",
            }}
          >
            What we help with.
          </h2>

          <div className="hx-grid-3">
            {CAREER_SERVICES.map((service) => (
              <Link
                key={service.title}
                href="/services/career-services"
                className="hx-cardlink"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "22px",
                  borderRadius: "10px",
                }}
              >
                <h3 style={cardLabel}>{service.title}</h3>

                <p
                  style={{
                    ...cardBody,
                    marginBottom: "14px",
                  }}
                >
                  {service.description}
                </p>

                <p
                  style={{
                    fontSize: "12.5px",
                    color: C.textSubtle,
                    lineHeight: 1.55,
                    marginBottom: "18px",
                    flex: 1,
                  }}
                >
                  <span style={{ color: C.blueLight }}>Outcome:</span>{" "}
                  {service.outcome}
                </p>

                <span
                  className="hx-more"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: C.blueLight,
                  }}
                >
                  Learn more
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
