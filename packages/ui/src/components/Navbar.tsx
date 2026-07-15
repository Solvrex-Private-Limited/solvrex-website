"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { C } from "../lib/theme";
import { SERVICES } from "../data/services";
import { PRICING_TIERS } from "../lib/pricing";
import { RESOURCES } from "../data/resources";
import { LEVELS } from "../data/roles";
import { ThemeToggle } from "./ui/ThemeToggle";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopNav } from "./DesktopNav";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { flexBetween, iconButtonReset, hamburgerBar } from "./navbarStyles";
import { useScrollDetection } from "./useScrollDetection";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useCloseOnNavigation } from "./useCloseOnNavigation";
import { useEscapeToClose } from "./useEscapeToClose";
import { useFocusReturn } from "./useFocusReturn";

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

const MENUS: MegaMenuData[] = [
  {
    key: "services",
    label: "Services",
    basePath: "/services",
    columns: SERVICES.map((s) => ({
      title: s.title,
      href: `/services/${s.slug}`,
      description: s.navDescription,
      items: s.megaLinks.map((l) => ({ label: l, href: `/services/${s.slug}` })),
    })),
    footerNote: "All services are delivered independently — no vendor affiliations.",
    footerCta: { label: "View all services", href: "/services" },
  },
  {
    key: "pricing",
    label: "Pricing",
    basePath: "/pricing",
    columns: PRICING_TIERS.map((t) => ({
      title: t.name,
      href: "/pricing",
      description: t.blurb,
      items: t.features.map((f) => ({ label: f })),
    })),
    footerCta: { label: "View full pricing", href: "/pricing" },
  },
  {
    key: "resources",
    label: "Resources",
    basePath: "/resources",
    columns: RESOURCES.map((a) => ({
      title: a.title,
      href: `/resources/${a.slug}`,
      description: a.summary,
    })),
    footerCta: { label: "Browse all resources", href: "/resources" },
  },
  {
    key: "careers",
    label: "Careers",
    basePath: "/careers",
    columns: LEVELS.map((l) => ({
      title: l.name,
      href: `/careers/${l.slug}`,
      description: l.description,
    })),
    footerCta: { label: "View all roles", href: "/careers" },
  },
];

const SIMPLE_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const DRAWER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const scrolled = useScrollDetection();
  useBodyScrollLock(mobileOpen);
  useCloseOnNavigation(pathname, setOpenMenu, setMobileOpen);
  useEscapeToClose(setOpenMenu, setMobileOpen);
  useFocusReturn(mobileOpen, hamburgerRef);

  const activeMenu = MENUS.find((m) => m.key === openMenu);

  return (
    <header
      className={scrolled ? "sx-navblur" : undefined}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        backgroundColor: C.bg,
        borderBottom: `1px solid ${C.border}`,
        overflow: "visible",
      }}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Main bar */}
      <div className="sx-container" style={{ ...flexBetween, height: "64px" }}>
        <NavbarLogo onClick={() => { setOpenMenu(null); setMobileOpen(false); }} />

        <DesktopNav
          menus={MENUS}
          simpleLinks={SIMPLE_LINKS}
          pathname={pathname}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />

        {/* Tablet + mobile cluster (< 1024px): Book + hamburger */}
        <div className="sx-mobile-nav">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            style={{ ...iconButtonReset, padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <span style={hamburgerBar} />
            <span style={hamburgerBar} />
            <span style={hamburgerBar} />
          </button>
        </div>
      </div>

      {/* ── Mega menu panel (desktop) ── */}
      {activeMenu && (
        <MegaMenu activeMenu={activeMenu} onClose={() => setOpenMenu(null)} />
      )}

      {/* ── Slide-out drawer (tablet + mobile) ── */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={DRAWER_LINKS}
        pathname={pathname}
      />
    </header>
  );
}