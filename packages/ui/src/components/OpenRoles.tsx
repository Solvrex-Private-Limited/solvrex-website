"use client";

import { LEVELS, getRolesByLevel } from "../data/roles";
import { eyebrow, sectionHeading } from "../lib/theme";
import { RoleCard } from "./RoleCard";
import styles from "./OpenRoles.module.css";

/** Photo map – keyed by the level slug defined in roles.ts */
const PHOTOS: Record<string, { src: string; alt: string }> = {
  "entry-level": {
    src: "/images/roles/photos/entry-level.png",
    alt: "Two early-career professionals collaborating at a desk",
  },
  lateral: {
    src: "/images/roles/photos/lateral.png",
    alt: "Experienced professional reviewing architecture diagrams",
  },
};

/** href map – update these if your URL structure changes */
const HREFS: Record<string, string> = {
  "entry-level": "/careers/entry-level",
  lateral: "/careers/lateral",
};

export function OpenRoles() {
  return (
    <section
      id="open-roles"
      className={styles.section}
      aria-labelledby="open-roles-heading"
    >
      <div className="sx-container">
        <p style={eyebrow}>Open roles</p>
        <h2
          id="open-roles-heading"
          style={{ ...sectionHeading, maxWidth: "560px", marginBottom: "36px" }}
        >
          Find your place on the team.
        </h2>

        <div className={styles.grid}>
          {LEVELS.map((lvl) => {
            const photo = PHOTOS[lvl.slug];
            const href = HREFS[lvl.slug];
            const count = getRolesByLevel(lvl.id).length;

            return (
              <RoleCard
                key={lvl.id}
                title={lvl.name}
                description={lvl.description}
                count={count}
                imageSrc={photo?.src ?? "/images/roles/photos/entry-level.png"}
                imageAlt={photo?.alt ?? lvl.name}
                href={href ?? `/careers/${lvl.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
