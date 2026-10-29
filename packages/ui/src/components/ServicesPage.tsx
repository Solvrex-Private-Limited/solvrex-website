"use client";

import Link from 'next/link';
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { C, eyebrow, pageH1 } from '../lib/theme';
import { SERVICES } from '../data/services';
import { ContactCallout } from './ui/ContactCallout';
import { Breadcrumbs } from './ui/Breadcrumbs';
import { FloatingBubbles } from './ui/FloatingBubbles';

export function ServicesPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  const updateActiveCard = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(SERVICES.length - 1, next));
    if (bounded === activeCardRef.current) return;
    activeCardRef.current = bounded;
    setActiveCard(bounded);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      // Ignore subtle horizontal shifts or tiny jitters
      if (Math.abs(e.deltaY) < 3) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Check if services section is currently in viewport
      const isInView = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      if (!isInView) return;

      const current = activeCardRef.current;
      const movingDown = e.deltaY > 0;

      // Allow natural scrolling out of section at the boundaries
      if (!movingDown && current === 0) return;
      if (movingDown && current === SERVICES.length - 1) return;

      // Intercept wheel while viewing card stack
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 380) return;
      lastWheelTimeRef.current = now;

      const next = movingDown ? current + 1 : current - 1;
      updateActiveCard(next);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 0) return;
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) < 40) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const isInView = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      if (!isInView) return;

      const current = activeCardRef.current;
      const movingDown = delta > 0;

      if (!movingDown && current === 0) return;
      if (movingDown && current === SERVICES.length - 1) return;

      const next = movingDown ? current + 1 : current - 1;
      updateActiveCard(next);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, [updateActiveCard]);

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
      <section
        ref={sectionRef}
        className="services-stack-section"
        aria-label="Our services"
      >
        <div className="sx-container">
          <div className="services-stack" data-active-card={activeCard + 1}>
            {SERVICES.map((service, index) => {
              const state = index === activeCard ? 'active' : index < activeCard ? 'past' : 'upcoming';
              const rel = index - activeCard;
              const baseZIndex = (SERVICES.length - index) * 10;

              let cardY = '0px';
              let cardScale = 1;
              let cardOpacity = 1;

              if (state === 'past') {
                // Earlier cards lift up into the air and disappear
                const pastDistance = Math.abs(rel);
                cardY = `${-140 - (pastDistance - 1) * 30}px`;
                cardScale = Math.max(0.92, 1 - pastDistance * 0.04);
                cardOpacity = 0;
              } else if (state === 'upcoming') {
                // Later cards are neatly stacked underneath active card
                const upcomingDistance = rel;
                cardY = `${22 * upcomingDistance}px`;
                cardScale = Math.max(0.88, 1 - upcomingDistance * 0.04);
                cardOpacity = Math.max(0.2, 0.65 - (upcomingDistance - 1) * 0.3);
              } else {
                cardY = '0px';
                cardScale = 1;
                cardOpacity = 1;
              }

              const cardStyle = {
                '--card-y': cardY,
                '--card-scale': cardScale,
                '--card-opacity': cardOpacity,
                zIndex: baseZIndex,
              } as CSSProperties;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="services-stack-card"
                  aria-label={`${service.title}: ${service.cardDescription}`}
                  aria-current={state === 'active' ? 'step' : undefined}
                  tabIndex={reducedMotion || state === 'active' ? 0 : -1}
                  data-card-state={state}
                  style={cardStyle}
                  onClick={(e) => {
                    if (state !== 'active') {
                      e.preventDefault();
                      updateActiveCard(index);
                    }
                  }}
                >
                  <span className="services-stack-number">
                    {service.number}
                  </span>
                  <h2 className="services-stack-title">
                    {service.title}
                  </h2>
                  <p className="services-stack-description">
                    {service.cardDescription}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Interactive Step Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '64px' }}>
            {SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => updateActiveCard(i)}
                aria-label={`View service ${i + 1}`}
                style={{
                  width: i === activeCard ? '32px' : '9px',
                  height: '9px',
                  borderRadius: '5px',
                  border: 'none',
                  padding: 0,
                  backgroundColor: i === activeCard ? 'var(--sx-blue)' : 'rgba(37, 99, 235, 0.22)',
                  cursor: 'pointer',
                  transition: 'all 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact callout */}
      <ContactCallout borderTop />
    </div>
  );
}
