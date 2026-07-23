"use client";

import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { sectionPad } from "../../lib/homestyles";
import { INSIGHTS } from "../../data/home_static";

export function Research_Insights() {
  return (
    <section style={sectionPad}>
      <div className="sx-container">
        <Reveal>
          <p style={eyebrow}>Evidence</p>

          <h2
            style={{
              ...sectionHeading,
              maxWidth: "560px",
              marginBottom: "44px",
            }}
          >
            What Research Suggests
          </h2>

          <div className="hx-grid-2">
            {INSIGHTS.map((insight, index) => (
              <div
                key={index}
                style={{
                  padding: "22px",
                  borderRadius: "10px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: C.blue,
                    fontVariantNumeric: "tabular-nums",
                    marginTop: "2px",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  style={{
                    fontSize: "15px",
                    color: C.textBody,
                    lineHeight: 1.65,
                  }}
                >
                  {insight}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "12.5px",
              color: C.textSubtle,
              lineHeight: 1.6,
              marginTop: "28px",
              maxWidth: "640px",
            }}
          >
            Sources include LinkedIn, Jobvite, Glassdoor, Indeed Hiring
            Research, ResumeLab.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
