"use client";

import Link from "next/link";
import { C } from "../lib/theme";
import { ThemeToggle } from "./ui/ThemeToggle";

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
interface MegaMenu {
  key: string;
  label: string;
  basePath: string;
  columns: MegaColumn[];
  footerCta: { label: string; href: string };
  footerNote?: string;
}

interface SimpleLink {
  label: string;
  href: string;
}

interface DesktopNavProps {
  menus: MegaMenu[];
  simpleLinks: SimpleLink[];
  pathname: string;
  openMenu: string | null;
  setOpenMenu: (key: string | null) => void;
}

export function DesktopNav({ menus, simpleLinks, pathname, openMenu, setOpenMenu }: DesktopNavProps) {
  return (
    <nav className="sx-desktop-nav">
      {menus.map((menu) => {
        const isOpen = openMenu === menu.key;
        const isActive = pathname.startsWith(menu.basePath);
        return (
          <Link
            key={menu.key}
            href={menu.basePath}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "6px 12px",
              background: isOpen ? "rgba(77,124,255,0.1)" : "transparent",
              borderRadius: "3px",
              fontSize: "14px", fontWeight: 400,
              color: isOpen || isActive ? C.text : C.textMuted,
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={() => setOpenMenu(menu.key)}
            onClick={() => setOpenMenu(null)}
          >
            {menu.label}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        );
      })}

      {simpleLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            padding: "6px 12px", fontSize: "14px", fontWeight: 400,
            color: pathname.startsWith(link.href) ? C.text : C.textMuted,
            borderRadius: "3px", transition: "color 0.15s",
          }}
          onMouseEnter={() => setOpenMenu(null)}
        >
          {link.label}
        </Link>
      ))}

      <span style={{ marginLeft: "6px", display: "inline-flex", alignItems: "center" }}>
        <ThemeToggle />
      </span>
    </nav>
  );
}