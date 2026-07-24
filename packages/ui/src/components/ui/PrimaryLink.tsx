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
  padding: "12px 24px",
  borderRadius: "3px",
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0.01em",
  transition: "background-color 0.15s, border-color 0.15s",
};

const variants: Record<Variant, CSSProperties> = {
  solid: { 
    background: "linear-gradient(135deg, var(--sx-gold-hover, #f5dfb0) 0%, var(--sx-gold, #e5c07b) 100%)", 
    border: "none", 
    color: "#0b0d12",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
  },
  outline: { 
    backgroundColor: "transparent", 
    border: `1px solid var(--sx-form-border, ${C.borderStrong})`, 
    color: C.text 
  },
};

function applyHover(el: HTMLElement, variant: Variant, on: boolean) {
  if (variant === "solid") {
    el.style.background = on 
      ? "linear-gradient(135deg, #ffffff 0%, var(--sx-gold-hover, #f5dfb0) 100%)" 
      : "linear-gradient(135deg, var(--sx-gold-hover, #f5dfb0) 0%, var(--sx-gold, #e5c07b) 100%)";
    el.style.boxShadow = on 
      ? "0 4px 14px var(--sx-gold-glow, rgba(229, 192, 123, 0.35))" 
      : "0 2px 8px rgba(0, 0, 0, 0.2)";
  } else {
    el.style.borderColor = on ? "var(--sx-gold, #e5c07b)" : "var(--sx-form-border, rgba(229, 192, 123, 0.35))";
    el.style.backgroundColor = on ? "var(--sx-gold-glow, rgba(229, 192, 123, 0.15))" : "transparent";
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
