import Link from "next/link";
import { C } from "../../lib/theme";
import { breadcrumbLd } from "../../lib/seo";
import { JsonLd } from "../JsonLd";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumb trail shown at the top of every page except home.
 * The last item is the current page (not linked).
 * Also emits a matching BreadcrumbList JSON-LD block, so every page that renders
 * <Breadcrumbs> gets structured data that mirrors the visible trail.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
        <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", listStyle: "none", fontSize: "12.5px" }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {item.href && !isLast ? (
                  <Link href={item.href} className="sx-crumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: isLast ? C.textBody : C.textMuted }} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && <span style={{ color: C.borderStrong }} aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}