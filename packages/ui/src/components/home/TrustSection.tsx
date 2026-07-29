import { C } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";
import { TRUST } from "../../data/home_static";
import { sectionPad, cardLabel, cardBody } from "../../lib/homestyles";

export function TrustSection() {
  return (
    <>
      {/* __ 2. Trust Bar __*/}

      <section style={sectionPad}>
        <div className="sx-container">
          <Reveal>
            <div className="hx-grid-4">
              {TRUST.map((t) => (
                <div key={t.title} style={{ padding: "4px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: C.blue,
                      marginBottom: "16px",
                    }}
                    aria-hidden="true"
                  />
                  <h3 style={cardLabel}>{t.title}</h3>
                  <p style={cardBody}>{t.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
