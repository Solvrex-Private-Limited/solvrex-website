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

export function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  return (
    <div
      className="sx-mega"
      style={{
        position: "absolute", top: "64px", left: 0, right: 0,
        backgroundColor: C.bgSurface, borderTop: `2px solid ${C.blue}`,
        borderBottom: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
      }}
    >
      <div className="sx-container" style={{ padding: "40px 48px 44px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(activeMenu.columns.length, 3)}, 1fr)`, gap: "40px" }}>
          {activeMenu.columns.map((col) => (
            <div key={col.title}>
              <Link href={col.href} style={{ display: "block", marginBottom: "8px" }} onClick={onClose}>
                <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: C.text }}>{col.title}</span>
              </Link>
              {col.description && (
                <p style={{ fontSize: "12px", color: C.textSubtle, marginBottom: col.items?.length ? "16px" : 0, lineHeight: 1.5 }}>{col.description}</p>
              )}
              {col.items && col.items.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "14px" }}>
                  {col.items.map((item) =>
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        style={{ display: "block", fontSize: "13.5px", color: C.textMuted, padding: "6px 0", lineHeight: 1.4, transition: "color 0.12s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <p key={item.label} style={{ fontSize: "13.5px", color: C.textMuted, padding: "6px 0", lineHeight: 1.4 }}>{item.label}</p>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "32px", paddingTop: "22px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ fontSize: "12px", color: C.textSubtle }}>{activeMenu.footerNote ?? ""}</p>
          <Link href={activeMenu.footerCta.href} onClick={onClose} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: C.blueLight, fontWeight: 500, whiteSpace: "nowrap" }}>
            {activeMenu.footerCta.label}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}