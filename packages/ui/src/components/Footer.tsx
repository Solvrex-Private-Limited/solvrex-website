"use client";

import Link from "next/link";
import { C } from "../lib/theme";
import { siteConfig } from "../lib/site";
import { SERVICES } from "../data/services";

const displayDomain = siteConfig.url.replace(/^https?:\/\//, "");

const columnLabel = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: C.textSubtle,
  marginBottom: "16px",
};

const linkStyle = {
  display: "block",
  fontSize: "13.5px",
  color: C.textMuted,
  marginBottom: "10px",
  transition: "color 0.15s",
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={linkStyle}
      onMouseEnter={(e) => { e.currentTarget.style.color = C.blue; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const services = SERVICES.map((s) => [s.title, `/services/${s.slug}`] as const);
  const company = [
    ["About", "/about"],
    ["Services", "/services"],
    ["Careers", "/careers"],
    ["Contact", "/contact"],
  ] as const;

  return (
    <footer style={{ backgroundColor: "transparent", borderTop: `1px solid ${C.border}` }}>
      <div className="sx-container">
        {/* Main grid */}
        <div
          className="sx-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            padding: "36px 0 26px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          {/* Brand */}
          <div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.01em" }}>
              {siteConfig.name}
            </p>
            <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.65, maxWidth: "220px" }}>
              Practical technology and business solutions for organizations built to last.
            </p>
          </div>

          {/* Services */}
          <div>
            <p style={columnLabel}>Services</p>
            {services.map(([label, href]) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={columnLabel}>Company</p>
            {company.map(([label, href]) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={columnLabel}>Get in touch</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
            >
              {siteConfig.contactEmail}
            </a>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "8px", fontSize: "12px", color: C.blue, fontWeight: 500 }}
            >
              Send an inquiry →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "44px" }}>
          <p style={{ fontSize: "12px", color: C.textSubtle }}>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: C.textSubtle }}>{displayDomain}</p>
        </div>
      </div>
    </footer>
  );
}
