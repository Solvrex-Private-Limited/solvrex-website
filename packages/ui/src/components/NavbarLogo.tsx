"use client";

import Link from "next/link";
import { C } from "../lib/theme";
import { siteConfig } from "../lib/site";

interface NavbarLogoProps {
  onClick?: () => void;
}

export function NavbarLogo({ onClick }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
      }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sx-logo"
        src="/mark.png"
        alt=""
        width={29}
        height={24}
        style={{
          height: "24px",
          width: "auto",
          display: "block",
        }}
      />

      <span
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: C.text,
          letterSpacing: "-0.01em",
        }}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}