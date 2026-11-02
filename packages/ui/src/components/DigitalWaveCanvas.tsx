"use client";

import { useEffect, useRef } from "react";

interface DigitalWaveCanvasProps {
  inView?: boolean;
}

interface WaveStrand {
  baseYPercent: number;
  amplitude: number;
  frequency: number;
  speed: number;
  dotColor: string;
  dotSize: number;
  lineColor: string;
  lineWidth: number;
  glowColor: string;
}

export function DigitalWaveCanvas({ inView = true }: DigitalWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let width = 0;
    let height = 0;
    let time = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Configure 4 harmonious wave strands
    const strands: WaveStrand[] = [
      {
        baseYPercent: 0.62,
        amplitude: 22,
        frequency: 0.0032,
        speed: 0.008,
        dotColor: "rgba(147, 197, 253, 0.8)",
        dotSize: 1.8,
        lineColor: "rgba(96, 165, 250, 0.28)",
        lineWidth: 0.9,
        glowColor: "rgba(59, 130, 246, 0.25)",
      },
      {
        baseYPercent: 0.72,
        amplitude: 28,
        frequency: 0.0026,
        speed: -0.006,
        dotColor: "rgba(255, 255, 255, 0.9)",
        dotSize: 1.6,
        lineColor: "rgba(59, 130, 246, 0.32)",
        lineWidth: 1.1,
        glowColor: "rgba(147, 197, 253, 0.3)",
      },
      {
        baseYPercent: 0.82,
        amplitude: 24,
        frequency: 0.0038,
        speed: 0.01,
        dotColor: "rgba(191, 219, 254, 0.75)",
        dotSize: 1.7,
        lineColor: "rgba(129, 140, 248, 0.24)",
        lineWidth: 0.85,
        glowColor: "rgba(56, 189, 248, 0.22)",
      },
      {
        baseYPercent: 0.92,
        amplitude: 18,
        frequency: 0.0028,
        speed: -0.0075,
        dotColor: "rgba(147, 197, 253, 0.65)",
        dotSize: 1.4,
        lineColor: "rgba(59, 130, 246, 0.2)",
        lineWidth: 0.75,
        glowColor: "rgba(59, 130, 246, 0.18)",
      },
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    const drawWaveMesh = () => {
      if (!ctx || width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // Point step along the x-axis
      const step = Math.max(16, Math.min(26, width / 65));
      const strandPoints: Array<Array<{ x: number; y: number }>> = [];

      // Calculate points for each strand
      for (let s = 0; s < strands.length; s++) {
        const strand = strands[s];
        const points: Array<{ x: number; y: number }> = [];
        const baseY = height * strand.baseYPercent;

        for (let x = -20; x <= width + 20; x += step) {
          // Double harmonic wave for organic digital motion
          const y =
            baseY +
            Math.sin(x * strand.frequency + time * strand.speed) * strand.amplitude +
            Math.cos(x * strand.frequency * 0.6 - time * strand.speed * 0.5) * (strand.amplitude * 0.45);

          points.push({ x, y });
        }
        strandPoints.push(points);
      }

      // Draw faint vertical / diagonal connector mesh between adjacent strands
      for (let s = 0; s < strandPoints.length - 1; s++) {
        const upper = strandPoints[s];
        const lower = strandPoints[s + 1];
        const minLen = Math.min(upper.length, lower.length);

        ctx.beginPath();
        for (let i = 0; i < minLen; i += 3) {
          ctx.moveTo(upper[i].x, upper[i].y);
          ctx.lineTo(lower[i].x, lower[i].y);
        }
        ctx.strokeStyle = "rgba(96, 165, 250, 0.08)";
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // Draw each continuous wave strand line and glowing particles
      for (let s = 0; s < strands.length; s++) {
        const strand = strands[s];
        const points = strandPoints[s];

        if (points.length < 2) continue;

        // Continuous curved line through points
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.strokeStyle = strand.lineColor;
        ctx.lineWidth = strand.lineWidth;
        ctx.stroke();

        // Tiny glowing particles at each point
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];

          // Particle dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, strand.dotSize, 0, Math.PI * 2);
          ctx.fillStyle = strand.dotColor;
          ctx.fill();

          // Subtle glowing halo on periodic highlight nodes
          if (i % 4 === 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, strand.dotSize + 2.5, 0, Math.PI * 2);
            ctx.fillStyle = strand.glowColor;
            ctx.fill();
          }
        }
      }
    };

    if (prefersReducedMotion) {
      drawWaveMesh();
      return () => {
        resizeObserver.disconnect();
      };
    }

    const render = () => {
      if (inView) {
        time += 1;
        drawWaveMesh();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [inView]);

  return (
    <div className="sx-digital-wave-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="sx-digital-wave-canvas" />
      <style>{`
        .sx-digital-wave-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .sx-digital-wave-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0.85;
          mask-image: radial-gradient(ellipse 90% 75% at 50% 65%, black 45%, transparent 92%);
          -webkit-mask-image: radial-gradient(ellipse 90% 75% at 50% 65%, black 45%, transparent 92%);
        }
      `}</style>
    </div>
  );
}

export default DigitalWaveCanvas;
