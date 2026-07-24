"use client";

import Link from 'next/link';
import { C, eyebrow } from '../lib/theme';
import { SERVICES } from '../data/services';
import { ContactCallout } from './ui/ContactCallout';
import { Breadcrumbs } from './ui/Breadcrumbs';

const ICONS = [
  // 01 Business Enablement (Briefcase/Building)
  <svg key="01" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E5C158" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <path d="M9 12h6M9 16h6"/>
  </svg>,
  // 02 Technology Consulting (Monitor/Chart)
  <svg key="02" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E5C158" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <path d="M6 12l3-3 3 3 5-5"/>
  </svg>,
  // 03 Career Services (User Profile + Briefcase)
  <svg key="03" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E5C158" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <rect x="16" y="11" width="6" height="5" rx="1"/>
    <path d="M18 11V9.5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1V11"/>
  </svg>,
];

export function ServicesPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>

      {/* Page header */}
      <section style={{ padding: '80px 0 64px' }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          <p style={{ ...eyebrow, color: 'var(--sx-gold, #e5c07b)', marginTop: '16px', marginBottom: '16px' }}>SERVICES</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, color: C.text, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            What we do<span style={{ color: 'var(--sx-gold, #e5c07b)' }}>.</span>
          </h1>
        </div>
      </section>

      {/* Service tiles matching reference image */}
      <section style={{ padding: '0 0 88px' }}>
        <div className="sx-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1px',
              backgroundColor: 'rgba(229, 192, 123, 0.08)',
              border: '1px solid rgba(229, 192, 123, 0.25)',
              borderRadius: '12px',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
            }}
          >
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                style={{
                  backgroundColor: 'var(--sx-bg-surface, rgba(13, 21, 38, 0.65))',
                  padding: '40px 32px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background-color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(229, 192, 123, 0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--sx-bg-surface, rgba(13, 21, 38, 0.65))'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(15, 30, 60, 0.85)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {ICONS[index] || ICONS[0]}
                  </div>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--sx-gold, #e5c07b)',
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                  }}
                >
                  {service.title}
                </h2>

                {/* Horizontal Gold Accent Line */}
                <div style={{ width: '36px', height: '2px', backgroundColor: '#E5C158', marginBottom: '18px' }} />

                <p
                  style={{
                    fontSize: '14.5px',
                    color: C.textMuted,
                    lineHeight: 1.68,
                    flex: 1,
                  }}
                >
                  {service.cardDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact callout */}
      <ContactCallout borderTop />
    </div>
  );
}

