"use client";

import Link from 'next/link';
import { C, eyebrow, pageH1 } from '../lib/theme';
import { SERVICES } from '../data/services';
import { ContactCallout } from './ui/ContactCallout';
import { Breadcrumbs } from './ui/Breadcrumbs';

export function ServicesPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>

      {/* Page header */}
      <section style={{ padding: '80px 0 64px', borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          <p style={eyebrow}>Services</p>
          <h1 style={{ ...pageH1, maxWidth: '520px' }}>What we do.</h1>
        </div>
      </section>

      {/* Service tiles */}
      <section style={{ padding: '64px 0 96px' }}>
        <div className="sx-container">
          <div
            className="sx-grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                style={{
                  backgroundColor: 'var(--sx-bg-surface)',
                  border: `1px solid ${C.border}`,
                  borderRadius: '20px',
                  padding: '40px 36px 44px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, shadow 0.2s ease, border-color 0.2s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.blue;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: C.textSubtle,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.04em',
                    marginBottom: '24px',
                  }}
                >
                  {service.number}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--sx-font-sans)',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: C.blue,
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </h2>
                <p
                  style={{
                    fontSize: '15px',
                    color: C.textBody,
                    lineHeight: 1.65,
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
