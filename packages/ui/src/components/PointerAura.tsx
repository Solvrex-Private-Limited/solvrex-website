"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; time: number };

const styles = `
  .sx-pointer-trail,
  .sx-pointer-glow {
    position: fixed;
    pointer-events: none;
  }
  .sx-pointer-trail {
    inset: 0;
    z-index: 9998;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .sx-pointer-glow {
    top: 0;
    left: 0;
    z-index: 9999;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(191, 215, 255, 0.9);
    border-radius: 50%;
    opacity: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.82) 0 8%, rgba(121, 169, 255, 0.32) 31%, rgba(77, 124, 255, 0.12) 58%, transparent 76%);
    box-shadow: 0 0 13px rgba(112, 163, 255, 0.48), inset 0 0 8px rgba(255, 255, 255, 0.4);
    transform: translate3d(var(--sx-pointer-x, -100px), var(--sx-pointer-y, -100px), 0) translate(-50%, -50%);
    transition: opacity 180ms ease;
    will-change: transform;
  }
  @media (hover: none), (pointer: coarse) {
    .sx-pointer-trail,
    .sx-pointer-glow { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sx-pointer-glow { transition: none; }
  }
`;

export default function PointerAura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = canvasRef.current?.parentElement;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!scope || !canvas || !glow) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const context = canvas.getContext("2d");
    if (!finePointer.matches || !context) return;

    let points: TrailPoint[] = [];
    let frame = 0;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const clearTrail = () => {
      points = [];
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const draw = (now: number) => {
      frame = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points.filter((point) => now - point.time < 560);

      if (points.length > 1) {
        const oldest = points[0];
        const age = Math.max(0, now - oldest.time);
        const opacity = (1 - age / 560) * 0.72;

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i += 1) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          context.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        const last = points[points.length - 1];
        context.lineTo(last.x, last.y);

        context.save();
        context.globalAlpha = opacity;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = "rgba(89, 145, 255, 0.8)";
        context.shadowBlur = 12;
        context.strokeStyle = "rgba(93, 151, 255, 0.48)";
        context.lineWidth = 7;
        context.stroke();
        context.shadowBlur = 0;
        context.strokeStyle = "rgba(126, 177, 255, 0.8)";
        context.lineWidth = 2;
        context.stroke();
        context.strokeStyle = "rgba(255, 255, 255, 0.88)";
        context.lineWidth = 0.8;
        context.stroke();
        context.restore();

        for (let i = 0; i < points.length; i += 3) {
          const point = points[i];
          const pointOpacity = Math.max(0, 1 - (now - point.time) / 560);
          context.beginPath();
          context.arc(point.x, point.y, 1.1 + pointOpacity * 0.7, 0, Math.PI * 2);
          context.fillStyle = `rgba(220, 235, 255, ${pointOpacity * 0.7})`;
          context.fill();
        }
      }

      if (points.length) frame = window.requestAnimationFrame(draw);
    };

    const queueDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const hideAura = () => {
      glow.style.opacity = "0";
      clearTrail();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      glow.style.setProperty("--sx-pointer-x", `${event.clientX}px`);
      glow.style.setProperty("--sx-pointer-y", `${event.clientY}px`);
      glow.style.opacity = "1";

      if (reducedMotion.matches) return;
      const previous = points[points.length - 1];
      if (!previous || Math.hypot(event.clientX - previous.x, event.clientY - previous.y) >= 2) {
        points.push({ x: event.clientX, y: event.clientY, time: performance.now() });
        if (points.length > 48) points.shift();
        queueDraw();
      }
    };

    const handlePointerLeave = () => hideAura();
    const handleScroll = () => hideAura();

    resize();
    scope.addEventListener("pointermove", handlePointerMove);
    scope.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      scope.removeEventListener("pointermove", handlePointerMove);
      scope.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <canvas ref={canvasRef} className="sx-pointer-trail" aria-hidden="true" />
      <span ref={glowRef} className="sx-pointer-glow" aria-hidden="true" />
    </>
  );
}
