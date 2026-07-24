"use client";

import Link from "next/link";
import { C } from "../lib/theme";

interface MegaItem {
  label: string;
  href?: string;
}
interface MegaColumn {
  title: string;
  href: string;
  description?: string;
  items?: MegaItem[];
}
interface MegaMenuData {
  key: string;
  label: string;
  basePath: string;
  columns: MegaColumn[];
  footerCta: { label: string; href: string };
  footerNote?: string;
}

interface MegaMenuProps {
  activeMenu: MegaMenuData;
  onClose: () => void;
}

function getMenuIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("business") || t.includes("enablement")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  if (t.includes("technology") || t.includes("consulting")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (t.includes("career") || t.includes("services")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  if (t.includes("essential")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  }
  if (t.includes("professional")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (t.includes("premium")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  return (
    <>
      {/* Dimmed backdrop overlay covering page content behind navbar mega menu */}
      <div
        className="sx-mega-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          top: "64px",
          backgroundColor: "rgba(4, 7, 17, 0.65)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 240,
        }}
      />

      {/* Floating Card Mega Menu Container */}
      <div
        className="sx-mega"
        style={{
          position: "absolute",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 250,
          pointerEvents: "none",
          padding: "16px 24px 0",
        }}
      >
        <div
          className="sx-mega-card"
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            pointerEvents: "auto",
            backgroundColor: "var(--sx-mega-bg, #060914)",
            border: "1px solid var(--sx-border-strong, rgba(40, 65, 110, 0.6))",
            borderRadius: "14px",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.95), 0 0 32px rgba(229, 192, 123, 0.08)",
            padding: "36px 40px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 3-Column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(activeMenu.columns.length, 3)}, 1fr)`,
              gap: "40px 48px",
            }}
          >
            {activeMenu.columns.map((col) => (
              <div key={col.title}>
                {/* Header block with circular icon */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "1px solid rgba(229, 192, 123, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(229, 192, 123, 0.05)",
                      color: "var(--sx-gold, #e5c07b)",
                      flexShrink: 0,
                    }}
                  >
                    {getMenuIcon(col.title)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link href={col.href} style={{ display: "block", marginBottom: "3px" }} onClick={onClose}>
                      <span
                        style={{
                          fontSize: "15.5px",
                          fontWeight: 650,
                          color: C.text,
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--sx-gold, #e5c07b)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = C.text;
                        }}
                      >
                        {col.title}
                      </span>
                    </Link>
                    {col.description && (
                      <p style={{ fontSize: "12.5px", color: C.textSubtle, lineHeight: 1.45 }}>{col.description}</p>
                    )}
                  </div>
                </div>

                {/* Glowing divider line with central dot */}
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(229, 192, 123, 0.05) 0%, rgba(229, 192, 123, 0.45) 50%, rgba(229, 192, 123, 0.05) 100%)",
                    margin: "14px 0 18px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "3px",
                      backgroundColor: "var(--sx-gold, #e5c07b)",
                      borderRadius: "50%",
                      boxShadow: "0 0 8px var(--sx-gold, #e5c07b)",
                    }}
                  />
                </div>

                {/* Bullet list items with gold chevrons */}
                {col.items && col.items.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    {col.items.map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0" }}>
                        <span
                          style={{
                            color: "var(--sx-gold, #e5c07b)",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            fontFamily: "monospace",
                            flexShrink: 0,
                          }}
                        >
                          &gt;
                        </span>
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            style={{
                              fontSize: "13.5px",
                              color: C.textMuted,
                              lineHeight: 1.4,
                              transition: "color 0.12s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = C.text;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = C.textMuted;
                            }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span style={{ fontSize: "13.5px", color: C.textMuted, lineHeight: 1.4 }}>{item.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Bar inside Card */}
          <div
            style={{
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {activeMenu.key === "services" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--sx-gold, #e5c07b)", flexShrink: 0 }}
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              )}
              <p style={{ fontSize: "12px", color: C.textSubtle }}>{activeMenu.footerNote ?? ""}</p>
            </div>
            <Link
              href={activeMenu.footerCta.href}
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13.5px",
                color: "var(--sx-gold, #e5c07b)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--sx-gold-hover, #f5dfb0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--sx-gold, #e5c07b)";
              }}
            >
              {activeMenu.footerCta.label}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "inherit" }}>
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}