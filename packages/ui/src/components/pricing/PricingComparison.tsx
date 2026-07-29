import { C, sectionHeading } from "../../lib/theme";
import { PRICING_TIERS, COMPARISON } from "../../lib/pricing";

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Included"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        color: C.blue,
      }}
    >
      <path
        d="M3 8l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingComparison() {
  return (
    <>
      <section
        style={{ padding: "56px 0", borderTop: `1px solid ${C.border}` }}
      >
        <div className="sx-container">
          <h2 style={{ ...sectionHeading, marginBottom: "32px" }}>
            Compare plans
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="sx-cmp">
              <thead>
                <tr>
                  <th>Feature</th>
                  {PRICING_TIERS.map((t) => (
                    <th key={t.slug} style={{ textAlign: "center" }}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="feat">{row.feature}</td>
                    {row.tiers.map((cell, i) => (
                      <td key={i} className="cell">
                        {cell === true ? (
                          <Check />
                        ) : cell === false ? (
                          <span style={{ color: C.textSubtle }}>—</span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
