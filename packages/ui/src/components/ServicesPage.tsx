"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { C, eyebrow, pageH1 } from '../lib/theme';
import { SERVICES } from '../data/services';
import { ContactCallout } from './ui/ContactCallout';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { FloatingBubbles } from './ui/FloatingBubbles';

export function ServicesPage() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const stack = document.querySelector('.services-stack');
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.services-stack-card'));
    let frame = 0;

    const updateActiveCard = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let nextActiveCard = 0;

        cards.forEach((card, index) => {
          const stickyTop = Number.parseFloat(window.getComputedStyle(card).top);
          const cardTop = card.getBoundingClientRect().top;
          if (Number.isFinite(stickyTop) && Math.abs(cardTop - stickyTop) <= 2) {
            nextActiveCard = index + 1;
          }
        });

        setActiveCard(nextActiveCard);
      });
    };

    updateActiveCard();
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "transparent", position: 'relative' }}>
      <FloatingBubbles />

      {/* Page header */}
      <section style={{ padding: '80px 0 64px', borderBottom: `1px solid ${C.border}` }}>
        <div className="sx-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          <p style={eyebrow}>Services</p>
          <h1 style={{ ...pageH1, maxWidth: '520px' }}>What we do.</h1>
        </div>
      </section>

      {/* Service tiles */}
      <section style={{ padding: '72px 0 48px' }}>
        <div className="sx-container">
          <div className="services-stack" data-active-card={activeCard}>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="services-stack-card"
                aria-label={`${service.title}: ${service.cardDescription}`}
              >
                <span className="services-stack-number">
                  {service.number}
                </span>
                <h2
                  className="services-stack-title"
                >
                  {service.title}
                </h2>
                <p
                  className="services-stack-description"
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
