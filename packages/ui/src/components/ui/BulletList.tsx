import { C } from "../../lib/theme";
import { Reveal } from "../ui/Reveal";

/**
 * Shared dash-bulleted list used for service "engagements/outcomes" and the
 * careers role-detail sections.
 */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item, index) => (
        <Reveal key={item} delay={index * 100}>
          <li
            style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: C.textBody, lineHeight: 1.6 }}
          >
            <span style={{ color: C.blue, flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>—</span>
            {item}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
