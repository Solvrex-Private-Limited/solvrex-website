"use client";

import Link from "next/link";
import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { RESOURCES } from "../../data/resources";
import { sectionPad, cardLabel, cardBody } from "../../lib/homestyles";

export function Resources() {
  return (
    <section style={sectionPad}>
      <div className="sx-container">
        <Reveal>
          <p style={eyebrow}>Resources</p>

          <h2
            style={{
              ...sectionHeading,
              maxWidth: "560px",
              marginBottom: "44px",
            }}
          >
            Career Resources
          </h2>

          <div className="hx-grid-3">
            {RESOURCES.map((resource) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="hx-cardlink"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "22px",
                  borderRadius: "10px",
                }}
              >
                <h3 style={cardLabel}>{resource.title}</h3>

                <p
                  style={{
                    ...cardBody,
                    marginBottom: "18px",
                    flex: 1,
                  }}
                >
                  {resource.description}
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
                  Read guide
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
