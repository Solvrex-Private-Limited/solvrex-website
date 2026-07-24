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
        gap: "10px",
      }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sx-logo"
        src="/mark.png"
        alt=""
        width={32}
        height={26}
        style={{
          height: "26px",
          width: "auto",
          display: "block",
        }}
      />

      <span
        style={{
          fontSize: "16.5px",
          fontWeight: 650,
          color: C.text,
          letterSpacing: "-0.015em",
        }}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}