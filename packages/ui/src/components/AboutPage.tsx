import { CSSProperties } from 'react';
import Link from 'next/link';
import { C, eyebrow, pageH1, metaLabel } from '../lib/theme';
import { siteConfig } from '../lib/site';
import { Breadcrumbs } from './ui/Breadcrumbs';

const labelStyle: CSSProperties = {
  ...metaLabel,
  flexShrink: 0,
  width: '180px',
  paddingTop: '3px',
};

const sectionBorder: CSSProperties = {
  padding: '56px 0',
  borderBottom: `1px solid ${C.border}`,
};

const sections = [
  {
    label: 'Who We Are',
    body: `${siteConfig.name} is a small practice focused on technology consulting, business enablement, and career services.`,
  },
  {
    label: 'What We Do',
    body: 'We build websites, advise on technology decisions, and support professionals in career transitions. All work is independent — we have no vendor affiliations.',
  },
  {
    label: 'How We Work',
    body: 'We take on work where we can be useful. When we are not the right fit, we say so.',
  },
];

export function AboutPage() {
  return (
    <div style={{ backgroundColor: "transparent" }}>

      {/* Page header */}
      <section style={{ padding: '80px 0 64px', borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <p style={eyebrow}>About</p>
          <h1 style={{ ...pageH1, maxWidth: '560px' }}>Technology and business support.</h1>
        </div>
      </section>

      {/* Sections */}
      {sections.map((s) => (
        <section key={s.label} style={sectionBorder}>
          <div className="sx-container">
            <div className="sx-row" style={{ display: 'flex', gap: '48px' }}>
              <div style={labelStyle}>{s.label}</div>
              <p style={{ fontSize: '16px', color: C.textBody, lineHeight: 1.78, maxWidth: '600px', flex: 1 }}>
                {s.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: '72px 0' }}>
        <div className="sx-container">
          <p style={{ fontSize: '16px', color: C.textMuted, marginBottom: '24px', maxWidth: '480px', lineHeight: 1.65 }}>
            To discuss your situation, reach out directly.
          </p>
          <Link
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: "var(--sx-gold, #e5c07b)", fontWeight: 500 }}
          >
            Get in touch →
          </Link>
        </div>
      </section>

    </div>
  );
}
