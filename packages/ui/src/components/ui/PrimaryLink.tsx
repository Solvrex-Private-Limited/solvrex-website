"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { C, accent } from "../../lib/theme";

type Variant = "solid" | "outline";

interface PrimaryLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  style?: CSSProperties;
}

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 28px",
  borderRadius: "100px",
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "0.01em",
  transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
};

const variants: Record<Variant, CSSProperties> = {
  solid: {
    backgroundColor: C.blue,
    border: `1px solid ${C.blue}`,
    color: "#ffffff",
    boxShadow: "0 4px 16px rgba(195,157,83,0.25)",
  },
  outline: {
    backgroundColor: "transparent",
    border: `1px solid ${C.borderStrong}`,
    color: C.text,
  },
};

function applyHover(el: HTMLElement, variant: Variant, on: boolean) {
  if (variant === "solid") {
    el.style.backgroundColor = on ? C.blueHover : C.blue;
    el.style.borderColor = on ? C.blueHover : C.blue;
    el.style.transform = on ? "translateY(-1px)" : "none";
    el.style.boxShadow = on ? "0 6px 20px rgba(195,157,83,0.35)" : "0 4px 16px rgba(195,157,83,0.25)";
  } else {
    el.style.borderColor = on ? C.blue : C.borderStrong;
    el.style.backgroundColor = on ? accent.hoverFill : "transparent";
    el.style.transform = on ? "translateY(-1px)" : "none";
  }
}

/**
 * Shared primary call-to-action link. Encapsulates the blue button + hover
 * behaviour that was previously copy-pasted with inline onMouseEnter handlers.
 */
export function PrimaryLink({ href, children, variant = "solid", external, style }: PrimaryLinkProps) {
  const className = "cx-btn";
  const mergedStyle = { ...base, ...variants[variant], ...style };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => applyHover(e.currentTarget, variant, true);
  const onLeave = (e: React.MouseEvent<HTMLElement>) => applyHover(e.currentTarget, variant, false);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={mergedStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={mergedStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </Link>
  );
}

// Right-arrow glyph commonly paired with a CTA label.
export function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5h9M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
