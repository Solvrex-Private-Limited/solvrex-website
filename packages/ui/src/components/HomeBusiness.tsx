"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { C, eyebrow, sectionHeading } from "../lib/theme";
import { PrimaryLink, ArrowRight } from "./ui/PrimaryLink";
import { Reveal } from "./ui/Reveal";
import { Aurora } from "./ui/Aurora";

const styles = `
  .sx-home-business .sx-home-hero-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
    align-items: center;
    gap: clamp(40px, 7vw, 104px);
  }
  .sx-home-business .sx-home-feature {
    position: relative;
    display: block;
    overflow: hidden;
    border: 1px solid ${C.border};
    background: linear-gradient(145deg, var(--sx-bg-surface), var(--sx-bg));
  }
  .sx-home-business .hx-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .sx-home-business .hx-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; align-items: stretch; }
  .sx-home-business .hx-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(28px, 5vw, 72px); position: relative; }
  .sx-home-business .sx-home-hero-business {
    isolation: isolate;
    padding: clamp(76px, 10vw, 128px) 0 clamp(66px, 8vw, 104px) !important;
    background:
      radial-gradient(ellipse at 84% 42%, rgba(77,124,255,0.09), transparent 38%),
      linear-gradient(110deg, var(--sx-bg) 0%, var(--sx-bg) 65%, var(--sx-bg-surface) 100%);
  }
  .sx-home-business .hx-hero-decoration {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: clamp(0px, 2vw, 32px);
    width: clamp(320px, 42vw, 560px);
    aspect-ratio: 1;
    border: 1px solid color-mix(in srgb, var(--sx-blue) 18%, transparent);
    border-radius: 50%;
    background: radial-gradient(circle at 55% 48%, color-mix(in srgb, var(--sx-blue) 12%, transparent), transparent 64%);
    box-shadow: 0 0 90px color-mix(in srgb, var(--sx-blue) 8%, transparent);
    transform: translate(-18%, -50%);
    pointer-events: none;
  }
  .sx-home-business .hx-hero-decoration::before,
  .sx-home-business .hx-hero-decoration::after {
    content: "";
    position: absolute;
    inset: 8%;
    border: 1px solid color-mix(in srgb, var(--sx-blue) 15%, transparent);
    border-radius: 50%;
  }
  .sx-home-business .hx-hero-decoration::after { inset: 18%; border-color: color-mix(in srgb, var(--sx-blue) 12%, transparent); }
  .sx-home-business .sx-home-hero-business h1 {
    max-width: 10ch !important;
    font-size: clamp(3.5rem, 7.1vw, 6.65rem) !important;
    line-height: 0.94 !important;
    letter-spacing: -0.065em !important;
  }
  .sx-home-business .hx-hero-lede { max-width: 530px; font-size: 17px; line-height: 1.7; color: ${C.textMuted}; margin: 28px 0 34px; }
  .sx-home-business .hx-hero-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
  .sx-home-business .hx-text-link { display: inline-flex; align-items: center; gap: 8px; color: ${C.textMuted}; font-size: 14px; transition: color 160ms ease; }
  .sx-home-business .hx-text-link:hover { color: ${C.text}; }
  .sx-home-business .hx-text-link:focus-visible,
  .sx-home-business .hx-resource-link:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 5px; }
  .sx-home-business .sx-home-feature-business {
    width: min(100%, 380px);
    aspect-ratio: 0.88;
    justify-self: center;
    padding: 0;
    border-color: rgba(77,124,255,0.25);
    box-shadow: 18px 20px 0 var(--sx-bg-raised), 0 18px 42px rgba(23,47,94,0.12);
  }
  .sx-home-business .sx-home-feature-business:focus-visible {
    outline: 2px solid ${C.blue};
    outline-offset: 6px;
  }
  .sx-home-business .hx-hero-systems-image {
    object-fit: cover;
    filter: grayscale(0.82) saturate(0.62) blur(2.5px);
    transform: scale(1.025);
    transition: filter 420ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 480ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .sx-home-business .sx-home-feature-business:hover .hx-hero-systems-image,
  .sx-home-business .sx-home-feature-business:focus-visible .hx-hero-systems-image,
  .sx-home-business .sx-home-feature-business:focus-within .hx-hero-systems-image {
    filter: grayscale(0) saturate(1) blur(0);
    transform: scale(1);
  }
  @media (hover: none), (pointer: coarse) {
    .sx-home-business .hx-hero-systems-image { filter: none; transform: none; }
  }
  .sx-home-business .hx-section-intro { display: flex; align-items: end; justify-content: space-between; gap: 32px; margin-bottom: 42px; }
  .sx-home-business .hx-section-intro h2 { max-width: 620px; }
  .sx-home-business .hx-section-note { max-width: 300px; padding-bottom: 5px; font-size: 14px; line-height: 1.65; color: ${C.textMuted}; }
  .sx-home-business .hx-process-section { position: relative; isolation: isolate; overflow: hidden; }
  .sx-home-business .hx-process-container { position: relative; z-index: 1; width: min(calc(100% - clamp(48px, 6vw, 112px)), 1600px); max-width: 1600px; padding: 0; }
  .sx-home-business .hx-process-orbit { position: absolute; z-index: 0; width: 430px; height: 430px; border: 1px solid rgba(37,99,235,0.15); border-radius: 50%; pointer-events: none; }
  .sx-home-business .hx-process-orbit::after { content: ""; position: absolute; width: 13px; height: 13px; border-radius: 50%; background: ${C.blue}; box-shadow: 0 0 24px 7px rgba(37,99,235,0.22); }
  .sx-home-business .hx-process-orbit-top { top: -230px; left: -250px; box-shadow: 0 0 70px rgba(37,99,235,0.08); }
  .sx-home-business .hx-process-orbit-top::after { right: 16%; bottom: 22%; }
  .sx-home-business .hx-process-orbit-bottom { right: -280px; bottom: -250px; width: 500px; height: 500px; box-shadow: 0 0 90px rgba(37,99,235,0.09); }
  .sx-home-business .hx-process-orbit-bottom::after { top: 8%; left: 23%; }
  .sx-home-business .hx-process-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; font-size: 12px; letter-spacing: 0.22em; }
  .sx-home-business .hx-process-eyebrow::before { content: ""; display: block; width: 28px; height: 2px; background: ${C.blue}; }
  .sx-home-business .hx-process-intro { display: grid; grid-template-columns: minmax(0, 1.8fr) minmax(360px, 0.9fr); align-items: center; gap: clamp(36px, 5.5vw, 100px); margin-bottom: clamp(54px, 6vw, 78px); }
  .sx-home-business .hx-process-intro h2 { max-width: none; font-size: clamp(40px, 4.7vw, 72px) !important; font-weight: 300 !important; line-height: 1.04 !important; letter-spacing: -0.055em !important; }
  .sx-home-business .hx-process-note { max-width: none; justify-self: stretch; padding: 2px 0 2px clamp(24px, 3vw, 46px); margin: 0; border-left: 1px solid ${C.borderStrong}; color: ${C.textMuted}; font-size: clamp(15px, 1.2vw, 20px); line-height: 1.65; }
  .sx-home-business .hx-trust-editorial { border-top: 1px solid ${C.borderStrong}; }
  .sx-home-business .hx-trust-heading {
    display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    align-items: end; gap: 48px; padding: 28px 0 34px;
  }
  .sx-home-business .hx-trust-heading h2 { max-width: 600px; }
  .sx-home-business .hx-trust-featured-intro {
    display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: start; gap: 18px;
    padding-left: 26px; border-left: 1px solid ${C.border};
  }
  .sx-home-business .hx-trust-index {
    color: ${C.blue}; font: 400 48px/0.9 Georgia, "Times New Roman", serif; letter-spacing: -0.06em;
  }
  .sx-home-business .hx-trust-featured-intro h3,
  .sx-home-business .hx-trust-item h3 { margin: 0 0 8px; color: ${C.text}; font-size: 16px; font-weight: 600; letter-spacing: -0.025em; }
  .sx-home-business .hx-trust-featured-intro p,
  .sx-home-business .hx-trust-item p { margin: 0; color: ${C.textMuted}; font-size: 14px; line-height: 1.65; }
  .sx-home-business .hx-trust-editorial-grid {
    display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(340px, 0.85fr);
    min-height: 366px; border-top: 1px solid ${C.borderStrong}; border-bottom: 1px solid ${C.borderStrong};
  }
  .sx-home-business .hx-trust-feature {
    position: relative; display: block; min-height: 366px; overflow: hidden; background: var(--sx-bg-raised);
  }
  .sx-home-business .hx-trust-feature img,
  .sx-home-business .hx-trust-item img {
    display: block; width: 100%; height: 100%; object-fit: cover;
    filter: grayscale(1) saturate(0.45) blur(2px);
    transition: filter 420ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .sx-home-business .hx-trust-feature:hover img,
  .sx-home-business .hx-trust-feature:focus-visible img,
  .sx-home-business .hx-trust-item:hover img,
  .sx-home-business .hx-trust-item:focus-within img,
  .sx-home-business .hx-trust-item:focus-visible img { filter: grayscale(0) saturate(1) blur(0); transform: scale(1.035); }
  .sx-home-business .hx-trust-feature:focus-visible,
  .sx-home-business .hx-trust-item:focus-within { outline: 2px solid ${C.blue}; outline-offset: -2px; }
  .sx-home-business .hx-trust-feature::after {
    position: absolute; inset: 42% 0 0; content: ""; pointer-events: none;
    background: linear-gradient(transparent, rgba(8, 16, 33, 0.78));
  }
  .sx-home-business .hx-trust-feature-caption {
    position: absolute; z-index: 1; right: 28px; bottom: 24px; left: 28px;
    display: flex; align-items: end; justify-content: space-between; gap: 24px; color: #fff;
  }
  .sx-home-business .hx-trust-feature-caption strong { display: block; font-size: clamp(22px, 3vw, 38px); font-weight: 500; letter-spacing: -0.045em; line-height: 1; }
  .sx-home-business .hx-trust-feature-caption span { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; }
  .sx-home-business .hx-trust-list { display: grid; grid-template-rows: repeat(3, 1fr); }
  .sx-home-business .hx-trust-item {
    display: grid; grid-template-columns: minmax(112px, 0.7fr) minmax(0, 1fr);
    align-items: stretch; min-height: 122px; border-bottom: 1px solid ${C.border};
  }
  .sx-home-business .hx-trust-item:last-child { border-bottom: 0; }
  .sx-home-business .hx-trust-item-image { min-height: 122px; overflow: hidden; background: var(--sx-bg-raised); }
  .sx-home-business .hx-trust-item-copy { position: relative; padding: 18px 18px 16px 22px; }
  .sx-home-business .hx-trust-item-copy .hx-trust-index {
    display: block; margin-bottom: 12px; font: 400 12px/1 Georgia, "Times New Roman", serif; letter-spacing: 0.05em;
  }
  @media (hover: none), (pointer: coarse) {
    .sx-home-business .hx-trust-feature img,
    .sx-home-business .hx-trust-item img { filter: none; }
  }
  .sx-home-business .hx-offering { min-height: 218px; }
  .sx-home-business .hx-offering-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 26px; }
  .sx-home-business .hx-offering-number { color: ${C.textSubtle}; font-size: 11px; letter-spacing: 0.1em; }
  .sx-home-business .hx-offering-mark { color: ${C.blueLight}; font-size: 20px; line-height: 1; transition: transform 180ms ease; }
  .sx-home-business .hx-cardlink:hover .hx-offering-mark,
  .sx-home-business .hx-cardlink:focus-visible .hx-offering-mark { transform: translate(3px, -3px); }
  .sx-home-business .hx-cardlink:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 5px; }
  .sx-home-business .hx-more { transition: color 160ms ease; }
  .sx-home-business .hx-process { --hx-step-gap: clamp(36px, 4.2vw, 80px); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--hx-step-gap); position: relative; padding: 0; border: 0; }
  .sx-home-business .hx-step { position: relative; min-width: 0; padding: 0 0 8px; transition: transform 240ms ease; }
  .sx-home-business .hx-step:hover { transform: translateY(-3px); }
  .sx-home-business .hx-step + .hx-step::before { content: ""; position: absolute; top: 0; bottom: 0; left: calc(var(--hx-step-gap) / -2); width: 1px; background: ${C.border}; }
  .sx-home-business .hx-step-number { position: relative; z-index: 1; margin: 0 0 14px; color: ${C.blue}; font-size: 12px; font-weight: 600; line-height: 1; letter-spacing: 0.13em; }
  .sx-home-business .hx-step-icon { position: relative; z-index: 1; display: grid; width: 72px; height: 72px; margin-bottom: 22px; place-items: center; border-radius: 50%; color: ${C.blue}; background: rgba(37,99,235,0.075); }
  .sx-home-business .hx-step-icon svg { width: 32px; height: 32px; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; fill: none; }
  .sx-home-business .hx-step-track { position: absolute; z-index: 0; top: 63px; left: 86px; right: calc(var(--hx-step-gap) / -2); height: 1px; background: linear-gradient(90deg, rgba(37,99,235,0.28), rgba(37,99,235,0.14)); pointer-events: none; }
  .sx-home-business .hx-step-track::after { content: ""; position: absolute; top: 50%; right: 9%; width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle, ${C.blue} 0 4px, rgba(255,255,255,0.98) 5px, rgba(255,255,255,0.78) 10px, transparent 72%); box-shadow: 0 0 15px rgba(37,99,235,0.3); transform: translate(50%, -50%); }
  .sx-home-business .hx-step:last-child .hx-step-track { right: 0; }
  .sx-home-business .hx-step:last-child .hx-step-track::after { display: none; }
  .sx-home-business .hx-engagement {
    display: grid; grid-template-columns: minmax(0, 1.22fr) minmax(220px, 0.68fr) minmax(0, 0.94fr);
    align-items: center; gap: clamp(24px, 3.2vw, 52px); padding: 22px 0 8px; border-top: 1px solid ${C.borderStrong};
  }
  .sx-home-business .hx-engagement-section {
    overflow: hidden;
    background: radial-gradient(ellipse at 58% 42%, rgba(37,99,235,0.09), transparent 29%),
      radial-gradient(ellipse at 94% 12%, rgba(37,99,235,0.035), transparent 34%), ${C.bg};
  }
  .sx-home-business .hx-engagement-container {
    width: min(calc(100% - clamp(48px, 6vw, 112px)), 1600px);
    max-width: 1600px;
    padding: 0;
  }
  .sx-home-business .hx-engagement-copy { width: min(100%, 590px); max-width: 590px; position: relative; z-index: 1; }
  .sx-home-business .hx-engagement-copy h2 { max-width: 13ch; font-size: clamp(38px, 5.25vw, 68px) !important; font-weight: 300 !important; line-height: 1.04 !important; letter-spacing: -0.055em !important; }
  .sx-home-business .hx-engagement-art { position: relative; min-height: 350px; display: grid; place-items: center; isolation: isolate; }
  .sx-home-business .hx-engagement-art::before {
    content: ""; position: absolute; top: -12%; left: 50%; width: 1px; height: 34%; background: linear-gradient(transparent, rgba(37,99,235,0.28));
  }
  .sx-home-business .hx-engagement-art::after {
    content: ""; position: absolute; top: 21%; left: calc(50% - 4px); width: 8px; height: 8px; border-radius: 50%;
    background: ${C.blue}; box-shadow: 0 0 16px rgba(37,99,235,0.38);
  }
  .sx-home-business .hx-engagement-orb { display: block; width: min(132%, 420px); max-width: none; height: auto; overflow: visible; }
  .sx-home-business .hx-engagement-aside {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(110px, 0.72fr); align-items: center;
    gap: clamp(16px, 2.3vw, 34px); padding: 30px 0 30px clamp(20px, 2.5vw, 38px);
    border-left: 1px solid ${C.border}; border-top: 1px solid ${C.border}; position: relative;
  }
  .sx-home-business .hx-engagement-aside::after { content: ""; position: absolute; right: 0; top: 30px; bottom: 0; width: 1px; background: ${C.border}; }
  .sx-home-business .hx-engagement-perspectives { min-width: 0; }
  .sx-home-business .hx-engagement-aside-label { margin: 0 0 24px; color: ${C.textSubtle}; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
  .sx-home-business .hx-engagement-aside-copy { max-width: 270px; margin: 0; color: ${C.text}; font-size: clamp(15px, 1.15vw, 18px); line-height: 1.55; letter-spacing: -0.025em; }
  .sx-home-business .hx-engagement-architecture {
    position: relative; display: block; width: 100%; min-width: 0; overflow: hidden; aspect-ratio: 0.68;
    background: linear-gradient(150deg, #f8fafc, #e5ebf2 60%, #d6dee8);
  }
  .sx-home-business .hx-engagement-architecture::before { content: ""; position: absolute; top: 0; right: 0; width: 2px; height: 36%; background: ${C.blue}; z-index: 1; }
  .sx-home-business .hx-engagement-architecture svg { display: block; width: 100%; height: 100%; }
  .sx-home-business .hx-resource-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 18px; color: ${C.blueLight}; font-size: 13px; }
  .sx-home-business .hx-resource-link:hover { text-decoration: underline; text-underline-offset: 4px; }
  .sx-home-business .sx-home-cta {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-bottom: 1px solid ${C.border};
    background:
      radial-gradient(ellipse at 74% 50%, rgba(37,99,235,0.075), transparent 42%),
      radial-gradient(ellipse at 8% 14%, rgba(255,255,255,0.64), transparent 38%),
      linear-gradient(112deg, var(--sx-bg-surface), var(--sx-bg));
  }
  .sx-home-business .hx-cta-atmosphere {
    position: absolute;
    z-index: 0;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .sx-home-business .sx-home-cta > .sx-container {
    position: relative;
    z-index: 1;
  }
  .sx-home-business .hx-cta-sphere {
    position: absolute;
    top: -76px;
    left: clamp(12px, 5vw, 76px);
    width: clamp(190px, 28vw, 340px);
    aspect-ratio: 1;
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 50%;
    opacity: 0.84;
    background:
      radial-gradient(ellipse at 30% 23%, rgba(255,255,255,0.98) 0 4%, rgba(217,232,255,0.88) 15%, transparent 38%),
      radial-gradient(ellipse at 64% 70%, rgba(37,99,235,0.32), transparent 50%),
      linear-gradient(145deg, rgba(94,153,255,0.48), rgba(208,228,255,0.28) 48%, rgba(50,116,231,0.38));
    box-shadow: inset -18px -24px 48px rgba(38,94,174,0.2), inset 10px 12px 28px rgba(255,255,255,0.72), 0 24px 58px rgba(52,100,176,0.2);
    backdrop-filter: blur(1px);
  }
  .sx-home-business .hx-cta-orbit {
    position: absolute;
    top: 50%;
    left: clamp(-34px, 4vw, 64px);
    width: clamp(330px, 45vw, 570px);
    height: clamp(164px, 22vw, 240px);
    border: 1px solid rgba(37,99,235,0.27);
    border-radius: 50%;
    transform: translateY(-50%) rotate(-18deg);
  }
  .sx-home-business .hx-cta-orbit-two {
    width: clamp(390px, 53vw, 660px);
    height: clamp(204px, 28vw, 300px);
    border-color: rgba(37,99,235,0.17);
    transform: translateY(-50%) rotate(24deg);
  }
  .sx-home-business .hx-cta-dot {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #75a7ff;
    box-shadow: 0 0 15px 4px rgba(80,139,255,0.35);
  }
  .sx-home-business .hx-cta-dot-one { top: 22%; left: 43%; }
  .sx-home-business .hx-cta-dot-two { right: 14%; bottom: 23%; width: 5px; height: 5px; opacity: 0.7; }
  .sx-home-business .hx-cta-layout {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(28px, 6vw, 84px);
  }
  .sx-home-business .hx-cta-copy { max-width: 660px; }
  .sx-home-business .hx-cta-copy h2 { max-width: 14ch; }
  .sx-home-business .hx-cta-copy > p:last-child { max-width: 500px; }
  .sx-home-business .hx-cta-layout a:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 6px; }
  .sx-home-business .hx-areas {
    background:
      radial-gradient(ellipse at 6% 22%, rgba(77,124,255,0.055), transparent 28%),
      var(--sx-bg);
  }
  .sx-home-business .hx-areas-intro {
    display: flex; align-items: end; justify-content: space-between; gap: 32px; margin-bottom: 36px;
  }
  .sx-home-business .hx-areas-intro h2 { max-width: 620px; }
  .sx-home-business .hx-area-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .sx-home-business .hx-area-card {
    display: flex; min-width: 0; min-height: 350px; flex-direction: column;
    overflow: hidden; border: 1px solid ${C.border}; color: ${C.text};
    background: var(--sx-bg-surface);
    transition: border-color 220ms ease, background-color 220ms ease, transform 220ms ease;
  }
  .sx-home-business .hx-area-card:hover,
  .sx-home-business .hx-area-card:focus-within {
    border-color: rgba(77,124,255,0.58); background: var(--sx-bg-raised); transform: translateY(-3px);
  }
  .sx-home-business .hx-area-card:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 4px; }
  .sx-home-business .hx-area-art {
    position: relative; display: grid; min-height: 208px; flex: 1; place-items: center; overflow: hidden;
    background:
      radial-gradient(ellipse at 48% 48%, rgba(145,177,232,0.17), transparent 55%),
      linear-gradient(140deg, rgba(127,146,176,0.12), rgba(77,124,255,0.07));
  }
  .sx-home-business .hx-area-art::before,
  .sx-home-business .hx-area-art::after {
    position: absolute; content: ""; border: 1px solid rgba(94,120,161,0.14); border-radius: 50%;
    transition: border-color 320ms ease, transform 480ms ease;
  }
  .sx-home-business .hx-area-art::before { width: 180px; height: 180px; transform: translate(36%, -18%); }
  .sx-home-business .hx-area-art::after { width: 260px; height: 260px; transform: translate(-28%, 40%); }
  .sx-home-business .hx-area-photo {
    position: absolute; inset: 0; display: block; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: grayscale(0.94) saturate(0.52) blur(2.5px);
    transition: filter 420ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 480ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .sx-home-business .hx-area-card:hover .hx-area-photo,
  .sx-home-business .hx-area-card:focus-within .hx-area-photo { filter: grayscale(0) saturate(1) blur(0); transform: scale(1.035); }
  .sx-home-business .hx-area-card:hover .hx-area-art::before,
  .sx-home-business .hx-area-card:focus-within .hx-area-art::before { border-color: rgba(77,124,255,0.26); transform: translate(31%, -14%) scale(1.04); }
  .sx-home-business .hx-area-card:hover .hx-area-art::after,
  .sx-home-business .hx-area-card:focus-within .hx-area-art::after { border-color: rgba(77,124,255,0.2); transform: translate(-23%, 34%) scale(1.04); }
  .sx-home-business .hx-area-copy { padding: 18px 20px 19px; }
  .sx-home-business .hx-area-title-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .sx-home-business .hx-area-title { margin: 0; color: ${C.text}; font-size: 17px; font-weight: 600; letter-spacing: -0.025em; }
  .sx-home-business .hx-area-arrow { color: ${C.blueLight}; font-size: 17px; transition: transform 200ms ease; }
  .sx-home-business .hx-area-card:hover .hx-area-arrow,
  .sx-home-business .hx-area-card:focus-within .hx-area-arrow { transform: translate(3px, -3px); }
  .sx-home-business .hx-area-description { margin: 7px 0 0; color: ${C.textMuted}; font-size: 13px; line-height: 1.55; }
  @media (hover: none), (pointer: coarse) {
    .sx-home-business .hx-area-photo { filter: none; }
  }
  .sx-home-business .hx-pointer-trail,
  .sx-home-business .hx-pointer-glow {
    position: fixed;
    pointer-events: none;
  }
  .sx-home-business .hx-pointer-trail {
    inset: 0;
    z-index: 9998;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .sx-home-business .hx-pointer-glow {
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
    transform: translate3d(var(--hx-pointer-x, -100px), var(--hx-pointer-y, -100px), 0) translate(-50%, -50%);
    transition: opacity 180ms ease;
    will-change: transform;
  }
  @media (hover: none), (pointer: coarse) {
    .sx-home-business .hx-pointer-trail,
    .sx-home-business .hx-pointer-glow { display: none; }
  }
  @media (max-width: 900px) {
    .sx-home-business .sx-home-hero-layout { gap: 36px; }
    .sx-home-business .hx-process-intro { gap: 32px; grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.9fr); }
    .sx-home-business .hx-process-intro h2 { font-size: clamp(40px, 5vw, 58px) !important; }
    .sx-home-business .hx-process { --hx-step-gap: 32px; }
    .sx-home-business .hx-trust-editorial-grid { grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.9fr); }
    .sx-home-business .hx-trust-item { grid-template-columns: minmax(92px, 0.65fr) minmax(0, 1fr); }
    .sx-home-business .hx-trust-item-copy { padding: 14px; }
    .sx-home-business .hx-trust-item h3 { font-size: 14px; }
    .sx-home-business .hx-trust-item p { font-size: 12px; }
    .sx-home-business .hx-grid-4 { grid-template-columns: repeat(2, 1fr); }
    .sx-home-business .hx-grid-3 { grid-template-columns: repeat(2, 1fr); }
    .sx-home-business .hx-area-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .sx-home-business .hx-steps { gap: 24px; }
    .sx-home-business .hx-engagement { grid-template-columns: minmax(0, 1.05fr) minmax(190px, 0.75fr); gap: 26px; }
    .sx-home-business .hx-engagement-copy { grid-row: span 2; }
    .sx-home-business .hx-engagement-art { min-height: 290px; }
    .sx-home-business .hx-engagement-aside { grid-template-columns: 1fr 0.7fr; padding: 18px 14px 18px 20px; border-left: 1px solid ${C.border}; }
    .sx-home-business .hx-engagement-aside::after { top: 18px; }
    .sx-home-business .hx-engagement-aside-label { margin-bottom: 14px; }
    .sx-home-business .hx-engagement-aside-copy { font-size: 14px; }
  }
  @media (max-width: 768px) {
    .sx-home-business .sx-home-hero-layout { grid-template-columns: 1fr; }
    .sx-home-business .sx-home-feature-business { width: min(56%, 320px); }
    .sx-home-business .hx-trust-heading { grid-template-columns: 1fr; gap: 24px; }
    .sx-home-business .hx-process-intro { display: grid; grid-template-columns: 1fr; gap: 18px; margin-bottom: 34px; }
    .sx-home-business .hx-process-intro h2 { font-size: clamp(38px, 8vw, 54px) !important; }
    .sx-home-business .hx-process-note { max-width: 560px; justify-self: start; padding: 14px 0 0; border-top: 1px solid ${C.border}; border-left: 0; }
    .sx-home-business .hx-process { grid-template-columns: 1fr; gap: 0; }
    .sx-home-business .hx-step { padding: 0 0 24px; margin-bottom: 24px; border-bottom: 1px solid ${C.border}; }
    .sx-home-business .hx-step:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: 0; }
    .sx-home-business .hx-step + .hx-step::before,
    .sx-home-business .hx-step-track { display: none; }
    .sx-home-business .hx-step-number { margin-bottom: 14px; }
    .sx-home-business .hx-process-orbit { opacity: 0.48; transform: scale(0.72); }
    .sx-home-business .hx-trust-featured-intro { padding-left: 0; border-left: 0; }
    .sx-home-business .hx-trust-editorial-grid { grid-template-columns: 1fr; }
    .sx-home-business .hx-trust-feature { min-height: 330px; }
    .sx-home-business .hx-trust-list { grid-template-rows: none; }
    .sx-home-business .hx-trust-item { grid-template-columns: minmax(120px, 0.42fr) minmax(0, 1fr); min-height: 132px; }
    .sx-home-business .hx-trust-item-image { min-height: 132px; }
    .sx-home-business .hx-section-intro { display: block; }
    .sx-home-business .hx-process-intro { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .sx-home-business .hx-process-note { justify-self: start; }
    .sx-home-business .hx-areas-intro { display: block; }
    .sx-home-business .hx-section-note { margin-top: 16px; }
    .sx-home-business .hx-cta-layout { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 24px; }
    .sx-home-business .hx-engagement { grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr); row-gap: 14px; }
    .sx-home-business .hx-engagement-copy { grid-row: auto; grid-column: 1 / -1; }
    .sx-home-business .hx-engagement-art { min-height: 240px; }
    .sx-home-business .hx-engagement-aside { grid-template-columns: 1fr; gap: 18px; padding: 20px 12px 20px 18px; }
    .sx-home-business .hx-engagement-architecture { width: min(100%, 150px); justify-self: end; aspect-ratio: 0.9; }
    .sx-home-business .hx-engagement-aside::after { top: 18px; }
  }
  @media (max-width: 620px) {
    .sx-home-business .hx-grid-4, .sx-home-business .hx-grid-3 { grid-template-columns: 1fr; }
    .sx-home-business .hx-offering { min-height: 0; }
    .sx-home-business .sx-home-feature-business { width: min(78%, 300px); }
    .sx-home-business .hx-hero-lede { font-size: 16px; }
    .sx-home-business .hx-area-grid { gap: 10px; }
    .sx-home-business .hx-area-card { min-height: 290px; }
    .sx-home-business .hx-area-art { min-height: 164px; }
    .sx-home-business .hx-area-copy { padding: 14px 13px 15px; }
    .sx-home-business .hx-area-title { font-size: 15px; }
    .sx-home-business .hx-area-description { font-size: 12px; }
    .sx-home-business .hx-engagement { grid-template-columns: 1fr; gap: 22px; padding-top: 26px; }
    .sx-home-business .hx-engagement-copy { grid-column: auto; }
    .sx-home-business .hx-engagement-copy h2 { max-width: 13ch; font-size: clamp(40px, 12vw, 58px) !important; }
    .sx-home-business .hx-engagement-art { min-height: 260px; margin: -2px auto -4px; width: min(100%, 330px); }
    .sx-home-business .hx-engagement-orb { width: 100%; max-width: 330px; }
    .sx-home-business .hx-engagement-aside { grid-template-columns: minmax(0, 1fr) minmax(96px, 0.5fr); min-height: 178px; padding: 18px 12px 18px 18px; }
    .sx-home-business .hx-engagement-architecture { width: 100%; }
    .sx-home-business .hx-areas-intro h2 { margin-bottom: 0; }
    .sx-home-business .hx-trust-feature { min-height: 260px; }
    .sx-home-business .hx-trust-feature-caption { right: 16px; bottom: 18px; left: 16px; }
    .sx-home-business .hx-trust-item { grid-template-columns: 112px minmax(0, 1fr); }
    .sx-home-business .hx-trust-item-copy { padding: 13px; }
    .sx-home-business .hx-trust-item h3 { font-size: 14px; }
    .sx-home-business .hx-trust-item p { font-size: 12px; }
    .sx-home-business .hx-cta-sphere { top: -48px; left: -42px; width: 210px; }
    .sx-home-business .hx-cta-orbit { left: -100px; width: 360px; height: 190px; }
    .sx-home-business .hx-cta-orbit-two { width: 420px; height: 230px; }
    .sx-home-business .hx-cta-dot-one { left: 54%; }
    .sx-home-business .hx-cta-layout { display: flex; align-items: start; flex-direction: column; gap: 26px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sx-home-business .hx-pointer-glow { transition: none; }
    .sx-home-business .hx-hero-systems-image { transition: none; }
    .sx-home-business .hx-area-card,
    .sx-home-business .hx-area-photo,
    .sx-home-business .hx-trust-feature img,
    .sx-home-business .hx-trust-item img,
    .sx-home-business .hx-area-art::before,
    .sx-home-business .hx-area-art::after,
    .sx-home-business .hx-area-arrow { transition: none; }
    .sx-home-business .hx-area-card:hover,
    .sx-home-business .hx-area-card:focus-within,
    .sx-home-business .hx-area-card:hover .hx-area-photo,
    .sx-home-business .hx-area-card:focus-within .hx-area-photo { transform: none; }
    .sx-home-business .hx-trust-feature:hover img,
    .sx-home-business .hx-trust-feature:focus-visible img,
    .sx-home-business .hx-trust-item:hover img,
    .sx-home-business .hx-trust-item:focus-within img { transform: none; }
    .sx-home-business .hx-text-link,
    .sx-home-business .hx-offering-mark,
    .sx-home-business .hx-more { transition: none; }
    .sx-home-business .hx-step { transition: none; }
    .sx-home-business .hx-step:hover { transform: none; }
    .sx-home-business .hx-cardlink:hover .hx-offering-mark,
    .sx-home-business .hx-cardlink:focus-visible .hx-offering-mark { transform: none; }
  }
`;

const TRUST = [
  { title: "Senior-led delivery", body: "Experienced people do the work — not hand-offs to juniors." },
  { title: "Independent advice", body: "No vendor commissions or hidden incentives — just what fits." },
  { title: "Practical & measurable", body: "Focused on outcomes you can see, not slideware." },
  { title: "Transparent", body: "Clear scope, clear pricing, and clear communication throughout." },
];

const TRUST_IMAGES = ["/business/digital.jpg", "/business/sales.jpg", "/business/operations.jpg"] as const;

const STEPS = [
  { title: "Discovery", body: "We learn your goals, constraints, and where the friction really is." },
  { title: "Plan", body: "A clear, scoped plan — deliverables, timeline, and a transparent price." },
  { title: "Deliver", body: "We do the work alongside you and stay accountable to outcomes." },
];

const BUSINESS_AREAS = [
  { title: "Technology", description: "Build a stable foundation for the way you work.", href: "/services/technology-consulting", image: "technology" },
  { title: "Digital", description: "Create the useful digital touchpoints customers need.", href: "/services/business-enablement", image: "digital" },
  { title: "Sales", description: "Make outreach and opportunities easier to manage.", href: "/contact", image: "sales" },
  { title: "Operations", description: "Bring clarity and momentum to day-to-day work.", href: "/services/business-enablement", image: "operations" },
  { title: "Marketing", description: "Turn a strong offer into a story people remember.", href: "/contact", image: "marketing" },
  { title: "Career", description: "Help people take their next confident step.", href: "/services/career-services", image: "career" },
] as const;

const sectionPad = { padding: "clamp(64px, 8vw, 92px) 0", borderBottom: `1px solid ${C.border}` } as const;
const cardLabel = { fontSize: "17px", fontWeight: 600, color: C.text, marginBottom: "10px", letterSpacing: "-0.02em" } as const;
const cardBody = { fontSize: "14px", color: C.textMuted, lineHeight: 1.7 } as const;

type TrailPoint = { x: number; y: number; time: number };

function HomePointerAura() {
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
      glow.style.setProperty("--hx-pointer-x", `${event.clientX}px`);
      glow.style.setProperty("--hx-pointer-y", `${event.clientY}px`);
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
      <canvas ref={canvasRef} className="hx-pointer-trail" aria-hidden="true" />
      <span ref={glowRef} className="hx-pointer-glow" aria-hidden="true" />
    </>
  );
}

export function HomeBusiness() {
  return (
    <div className="sx-home sx-home-business" style={{ backgroundColor: "transparent" }}>
      <style>{styles}</style>
      <HomePointerAura />

      <section className="sx-home-hero sx-home-hero-business" style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <Aurora variant="business" />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 12% 8%, color-mix(in srgb, var(--sx-blue) 5%, transparent), transparent 58%), radial-gradient(rgba(77,124,255,0.055) 1px, transparent 1px)", backgroundSize: "auto, 30px 30px", pointerEvents: "none" }} />
        <div className="hx-hero-decoration" aria-hidden="true" />
        <div className="sx-container sx-home-hero-layout" style={{ position: "relative", zIndex: 1 }}>
          <div className="sx-home-hero-copy">
            <p className="sx-home-eyebrow" style={eyebrow}>Business enablement · India</p>
            <h1 style={{ color: C.text, marginBottom: "24px" }}>
              Make good work <em style={{ color: C.blue, fontWeight: 400 }}>easier to run.</em>
            </h1>
            <p className="hx-hero-lede">
              Technology, digital foundations, and hands-on business support — brought together by a senior, independent team focused on useful outcomes.
            </p>
            <div className="hx-hero-actions">
              <PrimaryLink href="/book">Book a consultation<ArrowRight /></PrimaryLink>
              <Link className="hx-text-link" href="/services">Explore our services <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div
            className="sx-home-feature sx-home-feature-business"
            role="img"
            aria-label="Solvrex business systems"
            tabIndex={0}
          >
            <Image
              className="hx-hero-systems-image"
              src="/business/hero-systems.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 78vw, 380px"
            />
          </div>
        </div>
      </section>

      <section className="hx-areas" style={sectionPad} aria-labelledby="hx-areas-title">
        <div className="sx-container">
          <div className="hx-areas-intro">
            <div>
              <p style={eyebrow}>One team, six ways to move forward</p>
              <h2 id="hx-areas-title" style={sectionHeading}>Support for the work behind a stronger business.</h2>
            </div>
            <p className="hx-section-note">Explore the practical capabilities we bring together—from your technology foundations to the people building what comes next.</p>
          </div>
          <div className="hx-area-grid">
            {BUSINESS_AREAS.map((area) => (
              <Link key={area.title} href={area.href} className="hx-area-card">
                <div className="hx-area-art">
                  <Image
                    className="hx-area-photo"
                    src={`/business/${area.image}.jpg`}
                    alt=""
                    width={640}
                    height={420}
                    sizes="(max-width: 620px) 46vw, (max-width: 900px) 44vw, 30vw"
                    aria-hidden="true"
                  />
                </div>
                <div className="hx-area-copy">
                  <div className="hx-area-title-row">
                    <h3 className="hx-area-title">{area.title}</h3>
                    <span className="hx-area-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="hx-area-description">{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sx-home-trust" style={sectionPad} aria-label="Why businesses work with Solvrex">
        <div className="sx-container">
          <Reveal>
            <div className="hx-trust-editorial">
              <div className="hx-trust-heading">
                <div>
                  <p style={eyebrow}>Why businesses work with Solvrex</p>
                  <h2 style={sectionHeading}>Good work starts with the right kind of support.</h2>
                </div>
                <article className="hx-trust-featured-intro">
                  <span className="hx-trust-index" aria-hidden="true">01</span>
                  <div>
                    <h3>{TRUST[0].title}</h3>
                    <p>{TRUST[0].body}</p>
                  </div>
                </article>
              </div>
              <div className="hx-trust-editorial-grid">
                <div className="hx-trust-feature" tabIndex={0} aria-label="Team working together to deliver practical business support">
                  <Image
                    src="/business/technology.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="hx-trust-feature-caption" aria-hidden="true">
                    <strong>People who move work forward.</strong>
                    <span>Solvrex / How we work</span>
                  </div>
                </div>
                <div className="hx-trust-list">
                  {TRUST.slice(1).map((item, i) => (
                    <article className="hx-trust-item" key={item.title} tabIndex={0}>
                      <div className="hx-trust-item-image">
                        <Image
                          src={TRUST_IMAGES[i]}
                          alt=""
                          width={360}
                          height={240}
                          sizes="(max-width: 768px) 32vw, 15vw"
                        />
                      </div>
                      <div className="hx-trust-item-copy">
                        <span className="hx-trust-index" aria-hidden="true">{String(i + 2).padStart(2, "0")}</span>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      <section className="hx-process-section" style={{ ...sectionPad, background: `radial-gradient(ellipse at 9% 8%, rgba(219,233,255,0.42), transparent 24%), radial-gradient(ellipse at 88% 92%, rgba(219,233,255,0.42), transparent 30%), linear-gradient(112deg, var(--sx-bg-surface), ${C.bg})` }}>
        <span className="hx-process-orbit hx-process-orbit-top" aria-hidden="true" />
        <span className="hx-process-orbit hx-process-orbit-bottom" aria-hidden="true" />
        <div className="sx-container hx-process-container">
          <Reveal>
            <div className="hx-section-intro hx-process-intro">
              <div>
                <p className="hx-process-eyebrow" style={eyebrow}>How we work</p>
                <h2 style={sectionHeading}>A simple, accountable process.</h2>
              </div>
              <p className="hx-process-note">No black box, no hand-offs. You know what happens next and who is responsible.</p>
            </div>
            <div className="hx-steps hx-process">
              {STEPS.map((step, i) => (
                <article className="hx-step" key={step.title}>
                  <p className="hx-step-number">STEP 0{i + 1}</p>
                  <div className="hx-step-icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32">
                      {i === 0 ? <>
                        <circle cx="13.5" cy="13.5" r="8.5" />
                        <path d="m20 20 7 7" />
                      </> : i === 1 ? <>
                        <rect x="7" y="4.5" width="18" height="23" rx="1.5" />
                        <path d="M11 11h10M11 16h10M11 21h7" />
                      </> : <>
                        <path d="M28 4 4 14.5l9.5 3.5L17 28 28 4Z" />
                        <path d="m13.5 18 8-8" />
                      </>}
                    </svg>
                  </div>
                  <span className="hx-step-track" aria-hidden="true" />
                  <h3 style={{ ...cardLabel, fontSize: "27px", marginBottom: "12px" }}>{step.title}</h3>
                  <p style={{ ...cardBody, fontSize: "clamp(16px, 1.12vw, 21px)", lineHeight: 1.65 }}>{step.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hx-engagement-section" style={{ ...sectionPad, padding: "clamp(82px, 10vw, 136px) 0" }}>
        <div className="sx-container hx-engagement-container">
          <Reveal>
            <div className="hx-engagement">
              <div className="hx-engagement-copy">
                <p style={eyebrow}>Engagements</p>
                <h2 style={{ ...sectionHeading, marginBottom: "20px" }}>Project-based or monthly retainer.</h2>
                <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7, marginBottom: "28px" }}>
                  One-off builds and projects, or ongoing support as a monthly retainer — scoped to what your business actually needs. Tell us your goals and we’ll tailor a quote.
                </p>
                <div className="hx-hero-actions">
                  <PrimaryLink href="/book">Request a quote<ArrowRight /></PrimaryLink>
                  <Link href="/pricing" className="hx-text-link">View pricing <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
              <div className="hx-engagement-art" aria-hidden="true">
                <svg className="hx-engagement-orb" viewBox="0 0 380 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="hx-orb-glass" cx="0" cy="0" r="1" gradientTransform="matrix(89 99 -97 87 143 174)" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D9E8FF" />
                      <stop offset=".28" stopColor="#4D8CFF" />
                      <stop offset=".7" stopColor="#1460E8" />
                      <stop offset="1" stopColor="#083DAE" />
                    </radialGradient>
                    <linearGradient id="hx-glass-panel" x1="109" y1="98" x2="253" y2="292" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fff" stopOpacity=".68" />
                      <stop offset="1" stopColor="#7FAAFF" stopOpacity=".12" />
                    </linearGradient>
                    <radialGradient id="hx-orb-light" cx="0" cy="0" r="1" gradientTransform="matrix(0 61 -113 0 190 285)" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4C8BFF" stopOpacity=".36" />
                      <stop offset="1" stopColor="#4C8BFF" stopOpacity="0" />
                    </radialGradient>
                    <filter id="hx-orb-blur" x="24" y="250" width="320" height="105" filterUnits="userSpaceOnUse">
                      <feGaussianBlur stdDeviation="18" />
                    </filter>
                  </defs>
                  <path d="M42 234a150 150 0 0 1 150-150" stroke="#6F9EFF" strokeOpacity=".82" />
                  <path d="M42 234a150 150 0 0 1 150-150" stroke="#6F9EFF" strokeDasharray="2 9" strokeOpacity=".68" />
                  <ellipse cx="192" cy="303" rx="145" ry="34" fill="#4C8BFF" fillOpacity=".3" filter="url(#hx-orb-blur)" />
                  <ellipse cx="191" cy="302" rx="102" ry="30" fill="url(#hx-orb-light)" />
                  <path d="m194 92 90-52v206l-90 52V92Z" fill="url(#hx-glass-panel)" stroke="#7BA4F5" strokeOpacity=".72" />
                  <path d="m122 130 72-38v206l-72-37V130Z" fill="url(#hx-glass-panel)" fillOpacity=".62" stroke="#7BA4F5" strokeOpacity=".68" />
                  <path d="m194 92 90-52M194 92v206M122 130l72-38m0 0 72 42" stroke="#fff" strokeOpacity=".78" />
                  <path d="m194 151 68-39v140l-68 39V151Z" fill="#fff" fillOpacity=".12" stroke="#8CB2FF" strokeOpacity=".62" />
                  <circle cx="192" cy="225" r="96" fill="url(#hx-orb-glass)" stroke="#276BEF" strokeWidth="2" />
                  <circle cx="192" cy="225" r="93.5" stroke="#fff" strokeOpacity=".5" />
                  <path d="M149 183c10-16 27-25 46-26" stroke="#fff" strokeLinecap="round" strokeOpacity=".76" strokeWidth="4" />
                  <ellipse cx="162" cy="181" rx="9" ry="5" fill="#fff" fillOpacity=".68" transform="rotate(-38 162 181)" />
                  <path d="M138 271c15 14 34 22 55 22" stroke="#8CB8FF" strokeLinecap="round" strokeOpacity=".48" strokeWidth="2" />
                  <path d="m126 293 66 36 94-54" stroke="#fff" strokeOpacity=".7" />
                </svg>
              </div>
              <aside className="hx-engagement-aside">
                <div className="hx-engagement-perspectives">
                  <p className="hx-engagement-aside-label">Useful perspectives</p>
                  <p className="hx-engagement-aside-copy">Ideas and practical guidance for building a business that works better.</p>
                  <Link href="/resources" className="hx-resource-link">Browse business resources <span aria-hidden="true">→</span></Link>
                </div>
                <div className="hx-engagement-architecture" aria-hidden="true">
                  <svg viewBox="0 0 190 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="hx-architecture-sky" x1="24" y1="0" x2="166" y2="300" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F9FBFD" />
                        <stop offset="1" stopColor="#DDE4EC" />
                      </linearGradient>
                      <linearGradient id="hx-architecture-concrete" x1="25" y1="78" x2="160" y2="280" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F8FAFC" />
                        <stop offset=".55" stopColor="#D8E0E8" />
                        <stop offset="1" stopColor="#B9C4D0" />
                      </linearGradient>
                      <linearGradient id="hx-architecture-shadow" x1="20" y1="190" x2="157" y2="190" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7E8996" stopOpacity=".22" />
                        <stop offset="1" stopColor="#7E8996" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <rect width="190" height="300" fill="url(#hx-architecture-sky)" />
                    <path d="M-24 300V112C-24 38 18 3 84 0c68 3 113 43 113 116v184h-53V118c0-42-23-69-61-73-40 4-61 29-61 73v182h-46Z" fill="#BBC5D0" />
                    <path d="M-9 300V116C-9 55 25 20 84 16c60 4 98 39 98 101v183h-42V119c0-41-20-66-56-71-37 5-55 29-55 71v181H-9Z" fill="url(#hx-architecture-concrete)" />
                    <path d="M-12 300V126c0-43 14-75 39-94-13 18-19 41-19 70v198H-12Z" fill="#fff" fillOpacity=".55" />
                    <path d="m100 52 90 64v184h-57V123c0-35-11-57-33-71Z" fill="url(#hx-architecture-shadow)" />
                    <path d="M0 237 190 184v116H0V237Z" fill="#E7ECF1" fillOpacity=".78" />
                    <path d="m0 237 190-53M84 16v284M140 119v181" stroke="#fff" strokeOpacity=".66" />
                    <path d="M0 299h190" stroke="#9BA7B4" strokeOpacity=".45" />
                  </svg>
                </div>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sx-home-cta" style={{ padding: "clamp(68px, 9vw, 104px) 0" }}>
        <div className="hx-cta-atmosphere" aria-hidden="true">
          <span className="hx-cta-sphere" />
          <span className="hx-cta-orbit" />
          <span className="hx-cta-orbit hx-cta-orbit-two" />
          <span className="hx-cta-dot hx-cta-dot-one" />
          <span className="hx-cta-dot hx-cta-dot-two" />
        </div>
        <div className="sx-container">
          <Reveal>
            <div className="hx-cta-layout">
              <div className="hx-cta-copy">
                <p style={eyebrow}>YOUR NEXT STEP</p>
                <h2 style={{ fontSize: "clamp(34px, 4.8vw, 58px)", fontWeight: 400, color: C.text, letterSpacing: "-0.055em", lineHeight: 1.02, marginBottom: "20px" }}>
                  Let’s build what your business needs.
                </h2>
                <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.7 }}>
                  Book a free consultation. We’ll review your situation and recommend practical next steps.
                </p>
              </div>
              <PrimaryLink href="/book">Book a consultation<ArrowRight /></PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
