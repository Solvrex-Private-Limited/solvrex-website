import { C, eyebrow, pageH1 } from "../lib/theme";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { RESOURCES } from "../data/resources";
import { Aurora } from "./ui/Aurora";
import ResourceGrid from "./ResourceGrid/ResourceGrid";

export function ResourcesIndex() {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <section style={{ padding: "80px 0 56px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <Aurora variant="resources" />
        <div className="sx-container" style={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <p style={eyebrow}>Resources</p>
          <h1 style={{ ...pageH1, maxWidth: "620px", marginBottom: "18px" }}>
            <div className="fx-softblur">Career Resources</div>
          </h1>
          <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, maxWidth: "620px" }}>
            Practical, no-fluff guides on resumes, LinkedIn, referrals, planning your search,
            and interview preparation — written from real career-support work.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0 100px" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <ResourceGrid articles={RESOURCES} basePath="/resources" />
        </div>
      </section>
    </div>
  );
}

