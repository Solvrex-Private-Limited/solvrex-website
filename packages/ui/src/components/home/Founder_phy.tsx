"use client";

import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { sectionPad } from "../../lib/homestyles";

export function Founder_phy() {
  return (
    <section style={sectionPad}>
      <div className="sx-container">
        <Reveal>
          <div style={{ maxWidth: "680px" }}>
            <p style={eyebrow}>Our philosophy</p>

            <h2
              style={{
                ...sectionHeading,
                marginBottom: "24px",
              }}
            >
              Why Solvrex Exists
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: C.textBody,
                lineHeight: 1.78,
                marginBottom: "18px",
              }}
            >
              Solvrex was created by professionals who experienced the realities
              of job searching, skill development, and career transitions
              firsthand.
            </p>

            <p
              style={{
                fontSize: "16px",
                color: C.textBody,
                lineHeight: 1.78,
                marginBottom: "18px",
              }}
            >
              We believe career guidance should be practical, personalized, and
              rooted in real-world experience.
            </p>

            <p
              style={{
                fontSize: "16px",
                color: C.textBody,
                lineHeight: 1.78,
              }}
            >
              Our goal is to reduce the complexity of navigating opportunities
              so individuals can focus on building meaningful careers.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
