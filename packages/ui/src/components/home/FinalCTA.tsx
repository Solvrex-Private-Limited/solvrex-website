import { C, eyebrow, sectionHeading } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { sectionPad, cardLabel, cardBody } from "../../lib/homestyles";
import { PrimaryLink, ArrowRight } from "../ui/PrimaryLink";

export function FinalCTA() {
  return (
    <>
      <section style={{ padding: "96px 0" }}>
        <div className="sx-container">
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.4vw, 40px)",
                  fontWeight: 300,
                  color: C.text,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  marginBottom: "18px",
                }}
              >
                Start with a Free Resume Assessment.
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: C.textMuted,
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Upload your resume and tell us about your goals. We&apos;ll
                review your profile and recommend practical next steps.
              </p>
              <PrimaryLink href="/book">
                Get Free Assessment
                <ArrowRight />
              </PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
