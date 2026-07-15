"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { C } from "../lib/theme";

interface DrawerLink {
  label: string;
  href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: DrawerLink[];
  pathname: string;
}

export function MobileDrawer({ isOpen, onClose, links, pathname }: MobileDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="sx-drawer-wrap">
      <div
        className={`sx-drawer-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="mobile-navigation"
        className={`sx-drawer${isOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", padding: "0 20px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.textSubtle }}>Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation"
            style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", padding: "6px", display: "inline-flex" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <nav style={{ padding: "8px 0", flex: 1 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                display: "block", padding: "15px 20px", fontSize: "16px",
                color: pathname.startsWith(link.href) ? C.text : C.textMuted,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}