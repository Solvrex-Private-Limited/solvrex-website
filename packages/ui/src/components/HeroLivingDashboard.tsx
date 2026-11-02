"use client";

import { useState, useEffect, useRef, useId } from "react";
import type { Service } from "../data/services";

/* =========================================================================
   DOMAIN CONFIGURATIONS FOR ALL 3 SERVICES
   ========================================================================= */

interface DashboardConfig {
  url: string;
  statusBadge: string;
  kicker: string;
  heading: string;
  launchBtn: string;
  metric1: { val: string; name: string; sub: string };
  metric2: { name: string; sub: string };
  chart: { label: string; badge: string };
  graphPoints: Array<{ x: number; y: number; val: string; note: string }>;
  panel01: { title: string; sub: string };
  panel02: { title: string; sub: string };
  panel03: { title: string; pill: string };
  panel04: { title: string; sub: string };
  panel05: { title: string; items: Array<{ icon: string; text: string; time: string }> };
  panel06: { title: string; sub: string; avatars: [string, string, string] };
  caption: string;
}

const DASHBOARD_CONFIG_BY_SLUG: Record<string, DashboardConfig> = {
  "business-enablement": {
    url: "app.solvrex.com/workspace",
    statusBadge: "Live Engine",
    kicker: "Digital Enablement",
    heading: "Client Operations Core",
    launchBtn: "Launch",
    metric1: { val: "98%", name: "Website Health", sub: "Optimal Core Vitals" },
    metric2: { name: "Security & Edge", sub: "SSL Active • 0 Issues" },
    chart: { label: "Inquiry Velocity & Discovery", badge: "+38% vs Q3" },
    graphPoints: [
      { x: 15, y: 55, val: "Start", note: "Baseline setup" },
      { x: 65, y: 44, val: "+18%", note: "Search indexing" },
      { x: 120, y: 34, val: "+26%", note: "Profile verified" },
      { x: 180, y: 22, val: "+34%", note: "Automation active" },
      { x: 245, y: 12, val: "+48%", note: "High velocity" },
    ],
    panel01: { title: "Website Development", sub: "Next.js 15 • 98 Vitals" },
    panel02: { title: "Local Presence & SEO", sub: "Google Verified • 5.0 ★" },
    panel03: { title: "Leads This Month", pill: "+42% ↑" },
    panel04: { title: "Operational Automation", sub: "14 Hand-offs Eliminated" },
    panel05: {
      title: "Recent Activity",
      items: [
        { icon: "✉", text: "New inquiry received", time: "12m" },
        { icon: "✓", text: "Profile updated", time: "1h" },
        { icon: "📊", text: "Analytics report ready", time: "3h" },
      ],
    },
    panel06: { title: "Team Collaboration", sub: "3 Senior Leads Active", avatars: ["SX", "AD", "MK"] },
    caption: "Living digital workspace demo — integrated web architecture, discovery, and automated operations.",
  },
  "technology-consulting": {
    url: "console.solvrex.com/architecture",
    statusBadge: "Architecture Console",
    kicker: "Architecture Guidance",
    heading: "Enterprise Tech Stack Core",
    launchBtn: "Run Assessment",
    metric1: { val: "99.98%", name: "System Uptime", sub: "Resilient Topology" },
    metric2: { name: "Platform Evaluation", sub: "Vendor-Neutral • 0 Lock-in" },
    chart: { label: "Architecture Performance & Scalability", badge: "+48% Efficiency" },
    graphPoints: [
      { x: 15, y: 56, val: "Baseline", note: "Tech assessment" },
      { x: 65, y: 46, val: "+22%", note: "Architecture review" },
      { x: 120, y: 32, val: "+36%", note: "Platform selection" },
      { x: 180, y: 20, val: "+45%", note: "Roadmap planning" },
      { x: 245, y: 10, val: "+64%", note: "Optimized rollout" },
    ],
    panel01: { title: "Architecture Guidance", sub: "Resilient Systems & Cloud" },
    panel02: { title: "Platform Evaluation", sub: "Objective Vendor-Neutral Audit" },
    panel03: { title: "Planning Velocity", pill: "+64% ↑" },
    panel04: { title: "Implementation Roadmap", sub: "Zero-Downtime Rollout" },
    panel05: {
      title: "Technology Assessment Logs",
      items: [
        { icon: "⚡", text: "Tech assessment complete", time: "8m" },
        { icon: "🛡", text: "Architecture audit approved", time: "45m" },
        { icon: "📈", text: "Platform scoring matrix ready", time: "2h" },
      ],
    },
    panel06: { title: "Technical Advisory", sub: "Principal Consultants Active", avatars: ["SX", "TC", "AR"] },
    caption: "Living architecture workspace demo — technology assessment, platform evaluation, architecture guidance, and implementation planning.",
  },
  "career-services": {
    url: "portal.solvrex.com/career-pipeline",
    statusBadge: "Active Search",
    kicker: "Career Placement",
    heading: "Executive Career Pipeline",
    launchBtn: "Apply Track",
    metric1: { val: "96%", name: "Resume ATS Match", sub: "Top 5% Applicant Pool" },
    metric2: { name: "Profile Inbound", sub: "3.8x Recruiter Views" },
    chart: { label: "Recruiter Outreach & Callbacks", badge: "+52% Response Rate" },
    graphPoints: [
      { x: 15, y: 58, val: "Start", note: "Standard resume" },
      { x: 65, y: 45, val: "+19%", note: "ATS rewrite" },
      { x: 120, y: 32, val: "+34%", note: "LinkedIn optimized" },
      { x: 180, y: 19, val: "+46%", note: "Inbound interviews" },
      { x: 245, y: 11, val: "+58%", note: "Multi-offer stage" },
    ],
    panel01: { title: "Resume Optimization", sub: "ATS Score 96% • Impact Tailored" },
    panel02: { title: "LinkedIn Positioning", sub: "Top 5% Recruiter Search" },
    panel03: { title: "Interview Invites", pill: "+52% ↑" },
    panel04: { title: "Offer Strategy", sub: "Executive Negotiation" },
    panel05: {
      title: "Pipeline Activity",
      items: [
        { icon: "📅", text: "Interview scheduled", time: "15m" },
        { icon: "👁", text: "LinkedIn views +180%", time: "1h" },
        { icon: "💼", text: "Offer review ready", time: "4h" },
      ],
    },
    panel06: { title: "Career Advisory", sub: "Senior Coaches Active", avatars: ["SX", "CP", "HR"] },
    caption: "Living career workspace demo — human-led resume reviews, recruiter positioning, and interview pipelines.",
  },
};

/* =========================================================================
   HERO LIVING DASHBOARD COMPONENT
   Interactive Living Digital Workspace with Layered 3D Parallax & Panels
   ========================================================================= */

export function HeroLivingDashboard({ service }: { service?: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeDataPoint, setActiveDataPoint] = useState<number | null>(null);
  const uid = useId();

  const slug = service?.slug ?? "business-enablement";
  const cfg = DASHBOARD_CONFIG_BY_SLUG[slug] ?? DASHBOARD_CONFIG_BY_SLUG["business-enablement"];

  // 1. IntersectionObserver for scroll-based unfold animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 2. Mouse parallax tracking using requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, x));
      targetY = Math.max(-0.5, Math.min(0.5, y));

      el.style.setProperty("--sx-spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--sx-spot-y", `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.setProperty("--sx-spot-x", "50%");
      el.style.setProperty("--sx-spot-y", "45%");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      el.style.setProperty("--sx-hero-mx", currentX.toFixed(4));
      el.style.setProperty("--sx-hero-my", currentY.toFixed(4));

      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`sx-living-workspace ${inView ? "sx-unfolded" : ""}`}
      aria-label="Living Digital Workspace preview"
    >
      {/* =========================================================================
          BACKGROUND DECORATORS: Ambient Lighting, Spotlight & Floating Bokeh
          ========================================================================= */}
      <div className="sx-workspace-bg" aria-hidden="true">
        <div className="sx-workspace-spotlight" />
        <div className="sx-workspace-glow-core" />
        <div className="sx-bg-orb sx-bg-orb-1" />
        <div className="sx-bg-orb sx-bg-orb-2" />
        <div className="sx-bg-orb sx-bg-orb-3" />
      </div>

      {/* =========================================================================
          CONNECTING NETWORK LINES (Curved lines running between panels & dashboard)
          ========================================================================= */}
      <svg className="sx-workspace-lines-svg" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-net-line`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M 240,160 C 180,120 120,90 60,60" fill="none" stroke={`url(#${uid}-net-line)`} strokeWidth="1.5" strokeDasharray="4 4" className="sx-net-dash" />
        <path d="M 280,160 C 350,110 420,80 480,50" fill="none" stroke={`url(#${uid}-net-line)`} strokeWidth="1.5" strokeDasharray="4 4" className="sx-net-dash" />
        <path d="M 320,280 C 380,320 440,360 490,400" fill="none" stroke={`url(#${uid}-net-line)`} strokeWidth="1.5" strokeDasharray="4 4" className="sx-net-dash" />
        <path d="M 200,280 C 140,330 80,380 40,410" fill="none" stroke={`url(#${uid}-net-line)`} strokeWidth="1.5" strokeDasharray="4 4" className="sx-net-dash" />
      </svg>

      {/* =========================================================================
          CENTRAL FLOATING BROWSER DASHBOARD (SaaS Interface)
          ========================================================================= */}
      <div className="sx-main-dashboard-wrap">
        <div className="sx-main-dashboard">
          {/* Browser Chrome Header Bar */}
          <div className="sx-dash-topbar">
            <div className="sx-dash-traffic-lights" aria-hidden="true">
              <span className="sx-dot-red" />
              <span className="sx-dot-amber" />
              <span className="sx-dot-green" />
            </div>

            {/* URL Address Bar */}
            <div className="sx-dash-url-bar">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
              </svg>
              <span className="sx-dash-url-text">{cfg.url}</span>
            </div>

            {/* Live Ecosystem Status Chip */}
            <div className="sx-dash-status-pill">
              <span className="sx-pulse-beacon" />
              <span>{cfg.statusBadge}</span>
            </div>
          </div>

          {/* Browser Body with Sidebar & Dynamic Content */}
          <div className="sx-dash-body">
            {/* Sidebar Navigation */}
            <aside className="sx-dash-sidebar" aria-hidden="true">
              <div className="sx-side-btn active" title="Overview">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <div className="sx-side-btn" title="Analytics">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="sx-side-btn" title="Presence">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="sx-side-btn" title="Workflows">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </aside>

            {/* Main Workspace Stage */}
            <div className="sx-dash-content">
              {/* Workspace Header: Kicker + Launch CTA */}
              <div className="sx-dash-header-row">
                <div className="sx-dash-title-group">
                  <span className="sx-dash-kicker">{cfg.kicker}</span>
                  <h4 className="sx-dash-heading">{cfg.heading}</h4>
                </div>
                <button type="button" className="sx-dash-launch-btn" aria-label={cfg.launchBtn}>
                  <span>{cfg.launchBtn}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Status Micro-Cards Grid: Metric 1 + Metric 2 */}
              <div className="sx-dash-metrics-grid">
                {/* Metric 1 Indicator with Circular Progress Ring */}
                <div className="sx-dash-metric-card">
                  <div className="sx-health-ring-wrap">
                    <svg viewBox="0 0 54 54" className="sx-health-svg">
                      <circle cx="27" cy="27" r="22" className="sx-ring-bg" />
                      <circle cx="27" cy="27" r="22" className="sx-ring-progress" />
                    </svg>
                    <span className="sx-health-val">{cfg.metric1.val.includes("%") ? cfg.metric1.val.replace("%", "") + "%" : cfg.metric1.val}</span>
                  </div>
                  <div className="sx-health-info">
                    <span className="sx-metric-name">{cfg.metric1.name}</span>
                    <span className="sx-metric-sub">{cfg.metric1.sub}</span>
                  </div>
                </div>

                {/* Metric 2 Status */}
                <div className="sx-dash-metric-card">
                  <div className="sx-security-icon-wrap" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sx-blue)" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="sx-health-info">
                    <span className="sx-metric-name">{cfg.metric2.name}</span>
                    <span className="sx-metric-sub">{cfg.metric2.sub}</span>
                  </div>
                </div>
              </div>

              {/* Animated Interactive Analytics Line Graph */}
              <div className="sx-dash-chart-card">
                <div className="sx-chart-header">
                  <span className="sx-chart-label">{cfg.chart.label}</span>
                  <span className="sx-chart-badge">{cfg.chart.badge}</span>
                </div>

                <div className="sx-chart-svg-wrap">
                  <svg viewBox="0 0 260 75" preserveAspectRatio="none" className="sx-chart-svg">
                    <defs>
                      <linearGradient id={`${uid}-area-grad`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.32" />
                        <stop offset="70%" stopColor="#93c5fd" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={`${uid}-line-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area Fill */}
                    <path
                      d="M 15 55 Q 45 48 65 44 T 120 34 T 180 22 T 245 12 L 245 72 L 15 72 Z"
                      fill={`url(#${uid}-area-grad)`}
                    />

                    {/* Main Analytics Line */}
                    <path
                      d="M 15 55 Q 45 48 65 44 T 120 34 T 180 22 T 245 12"
                      fill="none"
                      stroke={`url(#${uid}-line-grad)`}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      className="sx-analytics-path"
                    />

                    {/* Interactive Points on Line */}
                    {cfg.graphPoints.map((pt, i) => (
                      <g
                        key={i}
                        className={`sx-chart-pt-group ${activeDataPoint === i ? "active" : ""}`}
                        onMouseEnter={() => setActiveDataPoint(i)}
                        onMouseLeave={() => setActiveDataPoint(null)}
                      >
                        <circle cx={pt.x} cy={pt.y} r="7" className="sx-chart-pt-halo" />
                        <circle cx={pt.x} cy={pt.y} r="3.5" className="sx-chart-pt-dot" />
                      </g>
                    ))}
                  </svg>

                  {/* Active Point Floating Tooltip */}
                  {activeDataPoint !== null && (
                    <div
                      className="sx-chart-tooltip"
                      style={{
                        left: `${(cfg.graphPoints[activeDataPoint].x / 260) * 100}%`,
                        top: `${cfg.graphPoints[activeDataPoint].y - 8}px`,
                      }}
                    >
                      <span className="sx-tip-val">{cfg.graphPoints[activeDataPoint].val}</span>
                      <span className="sx-tip-note">{cfg.graphPoints[activeDataPoint].note}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SIX SURROUNDING FLOATING UI PANELS (Independent 3D Floating Layers)
          ========================================================================= */}

      {/* PANEL 01: Top-Left */}
      <div className="sx-floating-panel sx-panel-01" tabIndex={0} role="region" aria-label={cfg.panel01.title}>
        <div className="sx-panel-icon-box sx-icon-blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="8" y1="6.5" x2="8.01" y2="6.5" />
            <line x1="12" y1="6.5" x2="12.01" y2="6.5" />
          </svg>
        </div>
        <div className="sx-panel-text">
          <span className="sx-panel-title">{cfg.panel01.title}</span>
          <span className="sx-panel-sub">{cfg.panel01.sub}</span>
        </div>
        <div className="sx-panel-badge-circle" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* PANEL 02: Top-Right */}
      <div className="sx-floating-panel sx-panel-02" tabIndex={0} role="region" aria-label={cfg.panel02.title}>
        <div className="sx-panel-icon-box sx-icon-pin">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="sx-panel-text">
          <span className="sx-panel-title">{cfg.panel02.title}</span>
          <span className="sx-panel-sub">{cfg.panel02.sub}</span>
        </div>
        <span className="sx-panel-pulsing-dot" aria-hidden="true" />
      </div>

      {/* PANEL 03: Mid-Right */}
      <div className="sx-floating-panel sx-panel-03" tabIndex={0} role="region" aria-label={cfg.panel03.title}>
        <div className="sx-leads-header">
          <span className="sx-panel-title">{cfg.panel03.title}</span>
          <span className="sx-growth-pill">{cfg.panel03.pill}</span>
        </div>
        <div className="sx-mini-barchart" aria-hidden="true">
          <span className="sx-bar" style={{ height: "14px" }} />
          <span className="sx-bar" style={{ height: "22px" }} />
          <span className="sx-bar" style={{ height: "18px" }} />
          <span className="sx-bar" style={{ height: "28px" }} />
          <span className="sx-bar active" style={{ height: "36px" }} />
        </div>
      </div>

      {/* PANEL 04: Bottom-Right */}
      <div className="sx-floating-panel sx-panel-04" tabIndex={0} role="region" aria-label={cfg.panel04.title}>
        <div className="sx-panel-icon-box sx-icon-purple">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
        <div className="sx-panel-text">
          <span className="sx-panel-title">{cfg.panel04.title}</span>
          <span className="sx-panel-sub">{cfg.panel04.sub}</span>
        </div>
      </div>

      {/* PANEL 05: Bottom-Left */}
      <div className="sx-floating-panel sx-panel-05" tabIndex={0} role="region" aria-label={cfg.panel05.title}>
        <div className="sx-activity-header">
          <span className="sx-activity-dot" />
          <span className="sx-panel-title">{cfg.panel05.title}</span>
        </div>
        <ul className="sx-activity-list">
          {cfg.panel05.items.map((item, idx) => (
            <li key={idx} className="sx-activity-item">
              <span className="sx-act-icon">{item.icon}</span>
              <span className="sx-act-text">{item.text}</span>
              <span className="sx-act-time">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PANEL 06: Mid-Left */}
      <div className="sx-floating-panel sx-panel-06" tabIndex={0} role="region" aria-label={cfg.panel06.title}>
        <div className="sx-collab-avatars" aria-hidden="true">
          <span className="sx-avatar sx-av-1">{cfg.panel06.avatars[0]}</span>
          <span className="sx-avatar sx-av-2">{cfg.panel06.avatars[1]}</span>
          <span className="sx-avatar sx-av-3">{cfg.panel06.avatars[2]}</span>
        </div>
        <div className="sx-panel-text">
          <span className="sx-panel-title">{cfg.panel06.title}</span>
          <span className="sx-panel-sub">
            <span className="sx-online-indicator" /> {cfg.panel06.sub}
          </span>
        </div>
      </div>

      {/* Caption at bottom */}
      <p className="sx-workspace-caption">{cfg.caption}</p>

      {/* =========================================================================
          STYLES: Glassmorphism, 3D Parallax, Keyframe Floats & Responsive Rules
          ========================================================================= */}
      <style>{`
        /* Main Container: 3D perspective stage */
        .sx-living-workspace {
          position: relative;
          width: 100%;
          min-height: 520px;
          perspective: 1400px;
          transform-style: preserve-3d;
          --sx-hero-mx: 0;
          --sx-hero-my: 0;
          --sx-spot-x: 50%;
          --sx-spot-y: 45%;
        }

        /* Ambient Background */
        .sx-workspace-bg {
          position: absolute;
          inset: -40px;
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }

        .sx-workspace-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            620px circle at var(--sx-spot-x) var(--sx-spot-y),
            rgba(59, 130, 246, 0.16) 0%,
            rgba(99, 102, 241, 0.05) 50%,
            transparent 72%
          );
          opacity: 0.9;
          transition: opacity 0.4s ease;
        }

        .sx-workspace-glow-core {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 440px;
          height: 320px;
          background: radial-gradient(ellipse, rgba(59, 130, 246, 0.22) 0%, rgba(147, 197, 253, 0.1) 45%, transparent 75%);
          filter: blur(48px);
        }

        .sx-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(24px);
          opacity: 0.45;
          pointer-events: none;
        }
        .sx-bg-orb-1 {
          width: 140px;
          height: 140px;
          top: 10%;
          left: -20px;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.7) 0%, transparent 70%);
          animation: sxHeroOrbFloat 9s ease-in-out infinite alternate;
        }
        .sx-bg-orb-2 {
          width: 160px;
          height: 160px;
          bottom: 15%;
          right: -25px;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, transparent 70%);
          animation: sxHeroOrbFloat 11s ease-in-out infinite alternate-reverse;
        }
        .sx-bg-orb-3 {
          width: 100px;
          height: 100px;
          top: 25%;
          right: 20%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%);
          animation: sxHeroOrbFloat 8s ease-in-out infinite alternate;
        }

        @keyframes sxHeroOrbFloat {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(18px, -18px, 0); }
        }

        /* Connecting Lines Layer */
        .sx-workspace-lines-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          opacity: 0.6;
        }

        .sx-net-dash {
          animation: sxLineDash 20s linear infinite;
        }

        @keyframes sxLineDash {
          to { stroke-dashoffset: -100; }
        }

        /* =========================================================================
           CENTRAL BROWSER DASHBOARD (Glassmorphic Window)
           ========================================================================= */
        .sx-main-dashboard-wrap {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 510px;
          margin: 0 auto;
          will-change: transform;
          transform: perspective(1200px)
            rotateY(calc(var(--sx-hero-mx) * 7.5deg))
            rotateX(calc(var(--sx-hero-my) * -6deg));
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sx-main-dashboard {
          position: relative;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow:
            0 24px 60px -15px rgba(15, 23, 42, 0.12),
            0 2px 10px rgba(0, 0, 0, 0.02),
            0 0 0 1px rgba(226, 232, 240, 0.75),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          overflow: hidden;
          animation: sxHeroMainFloat 7.5s ease-in-out infinite alternate;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .sx-main-dashboard:hover {
          border-color: rgba(147, 197, 253, 0.9);
          box-shadow:
            0 32px 75px -16px rgba(37, 99, 235, 0.2),
            0 0 25px rgba(59, 130, 246, 0.15),
            0 0 0 1px rgba(147, 197, 253, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        @keyframes sxHeroMainFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }

        /* Browser Chrome Bar */
        .sx-dash-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          height: 42px;
          padding: 0 14px;
          background: rgba(248, 250, 252, 0.85);
          border-bottom: 1px solid rgba(226, 232, 240, 0.85);
        }

        .sx-dash-traffic-lights {
          display: flex;
          gap: 6px;
        }
        .sx-dot-red, .sx-dot-amber, .sx-dot-green {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .sx-dot-red { background: #f87171; }
        .sx-dot-amber { background: #fbbf24; }
        .sx-dot-green { background: #34d399; }

        .sx-dash-url-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(226, 232, 240, 0.8);
          font-size: 11px;
          color: var(--sx-text-muted);
        }
        .sx-dash-url-text {
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        .sx-dash-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          border-radius: 9999px;
          background: rgba(239, 246, 255, 0.95);
          border: 1px solid rgba(191, 219, 254, 0.85);
          font-size: 10.5px;
          font-weight: 650;
          color: var(--sx-blue);
        }
        .sx-pulse-beacon {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--sx-blue);
          box-shadow: 0 0 8px var(--sx-blue);
          animation: sxBeaconGlow 2s ease-in-out infinite alternate;
        }
        @keyframes sxBeaconGlow {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.3); opacity: 1; }
        }

        /* Dashboard Body Layout */
        .sx-dash-body {
          display: flex;
          min-height: 290px;
        }

        .sx-dash-sidebar {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px 12px;
          border-right: 1px solid rgba(226, 232, 240, 0.8);
          background: rgba(248, 250, 252, 0.45);
        }

        .sx-side-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: #94a3b8;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .sx-side-btn.active,
        .sx-side-btn:hover {
          color: var(--sx-blue);
          background: rgba(239, 246, 255, 0.95);
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.12);
        }

        .sx-dash-content {
          flex: 1;
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Header Row */
        .sx-dash-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sx-dash-kicker {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--sx-blue);
        }
        .sx-dash-heading {
          margin: 2px 0 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--sx-text);
          letter-spacing: -0.015em;
        }

        .sx-dash-launch-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: none;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
          transition: all 0.25s ease;
        }
        .sx-dash-launch-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
        }

        /* Metrics Grid */
        .sx-dash-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .sx-dash-metric-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(248, 250, 252, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.75);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .sx-dash-metric-card:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(191, 219, 254, 0.9);
        }

        /* Circular Health Progress Ring */
        .sx-health-ring-wrap {
          position: relative;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
        }
        .sx-health-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .sx-ring-bg {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 4.5;
        }
        .sx-ring-progress {
          fill: none;
          stroke: var(--sx-blue);
          stroke-width: 4.5;
          stroke-linecap: round;
          stroke-dasharray: 138;
          stroke-dashoffset: 6;
          transition: stroke-dashoffset 1s ease;
        }
        .sx-health-val {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 750;
          color: var(--sx-text);
        }

        .sx-security-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(239, 246, 255, 0.95);
          flex-shrink: 0;
        }

        .sx-health-info {
          display: flex;
          flex-direction: column;
        }
        .sx-metric-name {
          font-size: 12px;
          font-weight: 650;
          color: var(--sx-text);
        }
        .sx-metric-sub {
          font-size: 10.5px;
          color: var(--sx-text-muted);
        }

        /* Chart Card */
        .sx-dash-chart-card {
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(248, 250, 252, 0.7);
          border: 1px solid rgba(226, 232, 240, 0.75);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sx-chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sx-chart-label {
          font-size: 11px;
          font-weight: 650;
          color: var(--sx-text-body);
        }
        .sx-chart-badge {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--sx-blue);
          background: rgba(239, 246, 255, 0.9);
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .sx-chart-svg-wrap {
          position: relative;
          width: 100%;
          height: 75px;
        }
        .sx-chart-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .sx-analytics-path {
          filter: drop-shadow(0 3px 6px rgba(37, 99, 235, 0.25));
        }

        .sx-chart-pt-group {
          cursor: pointer;
        }
        .sx-chart-pt-halo {
          fill: rgba(59, 130, 246, 0.15);
          opacity: 0;
          transition: opacity 0.2s ease, r 0.2s ease;
        }
        .sx-chart-pt-dot {
          fill: #2563eb;
          stroke: #ffffff;
          stroke-width: 2;
          transition: r 0.2s ease;
        }
        .sx-chart-pt-group:hover .sx-chart-pt-halo,
        .sx-chart-pt-group.active .sx-chart-pt-halo {
          opacity: 1;
          r: 9;
        }
        .sx-chart-pt-group:hover .sx-chart-pt-dot,
        .sx-chart-pt-group.active .sx-chart-pt-dot {
          r: 4.5;
        }

        .sx-chart-tooltip {
          position: absolute;
          transform: translate(-50%, -100%);
          background: #0f172a;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          z-index: 10;
          white-space: nowrap;
        }
        .sx-tip-val {
          font-weight: 750;
          color: #60a5fa;
        }
        .sx-tip-note {
          color: #94a3b8;
          font-size: 9px;
        }

        /* =========================================================================
           FLOATING UI PANELS (Consolidated Glassmorphism & Independent 3D Parallax)
           ========================================================================= */
        .sx-floating-panel {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          box-shadow:
            0 16px 36px -10px rgba(15, 23, 42, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.02),
            0 0 0 1px rgba(226, 232, 240, 0.75),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          padding: 10px 14px;
          cursor: pointer;
          user-select: none;
          outline: none;
          will-change: transform, box-shadow;
          transform-style: preserve-3d;
          transition:
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .sx-floating-panel:hover {
          border-color: rgba(147, 197, 253, 0.95);
          box-shadow:
            0 24px 50px -12px rgba(37, 99, 235, 0.22),
            0 0 20px rgba(59, 130, 246, 0.16),
            0 0 0 1px rgba(147, 197, 253, 0.65),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          z-index: 20 !important;
        }

        .sx-panel-text {
          display: flex;
          flex-direction: column;
        }
        .sx-panel-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--sx-text);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .sx-panel-sub {
          font-size: 10.5px;
          font-weight: 500;
          color: var(--sx-text-muted);
          white-space: nowrap;
        }

        .sx-panel-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          flex-shrink: 0;
        }
        .sx-icon-blue {
          background: rgba(239, 246, 255, 0.95);
          color: var(--sx-blue);
        }
        .sx-icon-pin {
          background: rgba(239, 246, 255, 0.95);
          color: #2563eb;
        }
        .sx-icon-purple {
          background: rgba(243, 232, 255, 0.95);
          color: #7c3aed;
        }

        /* PANEL 01: Top-Left */
        .sx-panel-01 {
          top: -20px;
          left: -22px;
          z-index: 6;
          opacity: 0;
          transform: translate3d(20px, 20px, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-01 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * -22px),
            calc(var(--sx-hero-my) * -16px),
            35px
          ) rotateZ(-2.5deg);
          animation: sxFloatP1 5.8s ease-in-out infinite alternate;
        }
        .sx-panel-badge-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(239, 246, 255, 0.9);
          color: var(--sx-blue);
          margin-left: 4px;
        }

        /* PANEL 02: Top-Right */
        .sx-panel-02 {
          top: -16px;
          right: -24px;
          z-index: 6;
          opacity: 0;
          transform: translate3d(-20px, 20px, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-02 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * 24px),
            calc(var(--sx-hero-my) * -18px),
            40px
          ) rotateZ(2deg);
          animation: sxFloatP2 6.4s ease-in-out infinite alternate -2s;
        }
        .sx-panel-pulsing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
          animation: sxPulsePing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* PANEL 03: Mid-Right */
        .sx-panel-03 {
          top: 145px;
          right: -42px;
          z-index: 7;
          opacity: 0;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 12px 16px;
          transform: translate3d(-30px, 0, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-03 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * 28px),
            calc(var(--sx-hero-my) * 14px),
            45px
          ) rotateZ(-1deg);
          animation: sxFloatP3 6.0s ease-in-out infinite alternate -1s;
        }
        .sx-leads-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .sx-growth-pill {
          font-size: 10.5px;
          font-weight: 750;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 7px;
          border-radius: 9999px;
        }
        .sx-mini-barchart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 36px;
          padding-top: 4px;
        }
        .sx-bar {
          flex: 1;
          background: #cbd5e1;
          border-radius: 3px;
          transition: background 0.2s ease;
        }
        .sx-bar.active {
          background: var(--sx-blue);
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
        }

        /* PANEL 04: Bottom-Right */
        .sx-panel-04 {
          bottom: -20px;
          right: -20px;
          z-index: 6;
          opacity: 0;
          transform: translate3d(-20px, -20px, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-04 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * 22px),
            calc(var(--sx-hero-my) * 20px),
            38px
          ) rotateZ(1.8deg);
          animation: sxFloatP4 6.8s ease-in-out infinite alternate -3s;
        }

        /* PANEL 05: Bottom-Left */
        .sx-panel-05 {
          bottom: -30px;
          left: -26px;
          z-index: 7;
          opacity: 0;
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
          padding: 12px 14px;
          min-width: 195px;
          transform: translate3d(20px, -20px, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-05 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * -24px),
            calc(var(--sx-hero-my) * 20px),
            45px
          ) rotateZ(-1.8deg);
          animation: sxFloatP5 7.2s ease-in-out infinite alternate -1.5s;
        }
        .sx-activity-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }
        .sx-activity-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .sx-activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sx-activity-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          color: var(--sx-text-body);
          padding: 3px 6px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        .sx-activity-item:hover {
          background: rgba(59, 130, 246, 0.08);
        }
        .sx-act-icon {
          font-size: 11px;
          width: 14px;
          text-align: center;
        }
        .sx-act-time {
          margin-left: auto;
          font-size: 9.5px;
          color: #94a3b8;
        }

        /* PANEL 06: Mid-Left */
        .sx-panel-06 {
          top: 155px;
          left: -38px;
          z-index: 7;
          opacity: 0;
          transform: translate3d(30px, 0, 0) scale(0.9);
        }
        .sx-living-workspace.sx-unfolded .sx-panel-06 {
          opacity: 1;
          transform: translate3d(
            calc(var(--sx-hero-mx) * -28px),
            calc(var(--sx-hero-my) * 8px),
            48px
          ) rotateZ(1.2deg);
          animation: sxFloatP6 5.9s ease-in-out infinite alternate -2.5s;
        }
        .sx-collab-avatars {
          display: flex;
          margin-right: 4px;
        }
        .sx-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          font-size: 9.5px;
          font-weight: 750;
          color: #ffffff;
          margin-left: -7px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.12);
        }
        .sx-avatar:first-child { margin-left: 0; }
        .sx-av-1 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .sx-av-2 { background: linear-gradient(135deg, #6366f1, #4338ca); }
        .sx-av-3 { background: linear-gradient(135deg, #0ea5e9, #0284c7); }

        .sx-online-indicator {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          margin-right: 3px;
        }

        /* Keyframes for Continuous Gentle Floating */
        @keyframes sxFloatP1 {
          0% { transform: translateY(0px) rotateZ(-2.5deg); }
          100% { transform: translateY(-7px) rotateZ(-1deg); }
        }
        @keyframes sxFloatP2 {
          0% { transform: translateY(0px) rotateZ(2deg); }
          100% { transform: translateY(-8px) rotateZ(3deg); }
        }
        @keyframes sxFloatP3 {
          0% { transform: translateY(0px) rotateZ(-1deg); }
          100% { transform: translateY(7px) rotateZ(-2deg); }
        }
        @keyframes sxFloatP4 {
          0% { transform: translateY(0px) rotateZ(1.8deg); }
          100% { transform: translateY(-7px) rotateZ(1deg); }
        }
        @keyframes sxFloatP5 {
          0% { transform: translateY(0px) rotateZ(-1.8deg); }
          100% { transform: translateY(6px) rotateZ(-1deg); }
        }
        @keyframes sxFloatP6 {
          0% { transform: translateY(0px) rotateZ(1.2deg); }
          100% { transform: translateY(-7px) rotateZ(2deg); }
        }
        @keyframes sxPulsePing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .sx-workspace-caption {
          margin: 36px 0 0;
          font-size: 12px;
          color: var(--sx-text-muted);
          text-align: center;
          line-height: 1.5;
        }

        /* Tablet (1024px to 768px) */
        @media (max-width: 1024px) {
          .sx-main-dashboard-wrap {
            max-width: 440px;
          }
          .sx-panel-01 { top: -14px; left: -12px; }
          .sx-panel-02 { top: -12px; right: -14px; }
          .sx-panel-03 { right: -22px; }
          .sx-panel-04 { bottom: -14px; right: -12px; }
          .sx-panel-05 { bottom: -20px; left: -14px; }
          .sx-panel-06 { left: -22px; }
        }

        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .sx-living-workspace {
            min-height: auto;
            perspective: none;
            padding-top: 20px;
          }
          .sx-workspace-lines-svg {
            display: none;
          }
          .sx-main-dashboard-wrap {
            transform: none !important;
            max-width: 100%;
          }
          .sx-main-dashboard {
            animation: none !important;
          }
          .sx-floating-panel {
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
            animation: none !important;
            margin-top: 12px;
            width: 100%;
            box-sizing: border-box;
          }
          .sx-panel-03,
          .sx-panel-05,
          .sx-panel-06 {
            display: none;
          }
        }

        /* Reduced Motion Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .sx-main-dashboard,
          .sx-floating-panel,
          .sx-bg-orb,
          .sx-pulse-beacon,
          .sx-panel-pulsing-dot {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HeroLivingDashboard;
