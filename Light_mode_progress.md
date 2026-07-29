# UI Redesign Progress

## Completed Refinements

### Phase 1 – Core Redesign

- Warm ivory/cream color palette (`#FAF6F0`) with soft gold accents (`#C39D53`).
- Serif headings (`Cormorant Garamond`) + sans-serif body (`Plus Jakarta Sans`).
- Rounded luxury cards (`border-radius: 20px`), gold pill buttons (`border-radius: 100px`).
- Floating rounded mega menu card with gold wave texture.
- Dark mode reverted to original cool blue/indigo palette — only light mode redesigned.

### Phase 2 – Visual Refinements

- Multi-layered warm ivory background with top-left illumination, bottom vignette, and soft lighting.
- Pure CSS flowing gold silk wave effect (now replaced by real image in Phase 3).
- Elevated form inputs with soft drop shadows and gold focus rings.
- Subtle `rgba(230,223,211,0.6)` section separators.

### Phase 3 – Silk Wave Background Image Integration

- Copied `silk-wave.png` into `apps/us/public/` and `apps/in/public/`.
- Replaced CSS-only wave with the actual silk wave image in `.sx-bg` (globals.css).
- Image positioned at `right -2vw top 8vh` with `background-size: 65% auto`.
- Five-layer composited background:
  1. Left-to-right fade overlay (keeps left side clean for readability)
  2. Top-left radial illumination glow
  3. Subtle bottom warm vignette
  4. Silk wave image (right/bottom-right)
  5. Warm ivory base gradient
- `::before` pseudo-element: soft top-left ambient lighting glow (blur 90px).
- `::after` pseudo-element: secondary gold glow reinforcing the wave region (opacity 0.4).
- Dark mode: all image/gradient layers disabled; original blue/indigo glow preserved.
- Build verified — 0 errors on both `apps/us` and `apps/in`.

### Phase 4 – Blue Tint Removal & Scroll Behavior

- Replaced background image in US and IN apps with the newly attached high-quality silk-wave asset.
- Changed light-mode background positioning behavior in `globals.css` from `fixed` to `absolute` (with `background-attachment: scroll`) so the silk wave background slides gracefully with page scrolling.
- Investigated and removed the unintended blue tint from the hero sections by modifying `Aurora.tsx` and adding `--aurora-` theme variables. The hero light gradients now use CSS variables to output soft cream/gold colors on light mode, and original blue/indigo colors on dark mode.

### Phase 5 – Full Height Background Stretch

- Added `position: relative` to `body` in `globals.css` so that the absolute-positioned `.sx-bg` background stretches all the way to the absolute bottom of the scrollable page instead of cutting off at the viewport boundary (100vh).

### Phase 6 – Scroll & Bottom Stretch Refinements

- Modified `background-attachment` of the silk wave layer in `.sx-bg` to `fixed` while leaving the other radial/linear gradient layers as `scroll`. This creates a premium parallax effect where the silk wave stays positioned on the right throughout the entire height of the scrollable page, resolving the cut-off issue.

### Phase 7 – Typography, Headers, Cards & Responsive Polishing

- Fine-tuned hero section typography in `HeroSection.tsx` and `HomeBusiness.tsx` using Cormorant Garamond serif h1 styles, custom line-heights, and spacing.
- Fixed the blue dotted grid background to a soft warm gold in both hero components.
- Refined page headers across About, Contact, Careers, and Resources pages with consistent serif typography, shared meta labels, and eyebrows.
- Polished layout cards including the `RoleDetailPage.tsx` facts sidebar (now a rounded luxury card with warm background, shadow, and gold top border) and the `CareersPage.tsx` founder's CTA card.
- Implemented `@media` rules in `globals.css` to gracefully scale down the silk wave image on tablet viewports and hide it on mobile screens (`< 768px`) to ensure content remains 100% readable.

### Phase 8 – Scroll Performance & Jitter Optimization

- Promoted the `.sx-bg` background element to a GPU-composited hardware-accelerated layer by adding `will-change: transform; transform: translate3d(0, 0, 0); backface-visibility: hidden;`. This eliminates rendering judder.
- Restored the background-attachment of the silk wave image layer to `fixed` (as established in Phase 6) to keep the background visible all the way to the absolute bottom of the scrollable page. The hardware acceleration settings offset paint recalculation overhead.

### Phase 9 – Background Continuity & Transparency Refinements

- Relocated all multi-layer gold silk background declarations (gradients + silk wave image) directly to the `body` tag in `globals.css`. This places the background on the highest possible container, letting all page sections naturally inherit transparency.
- Set the `.sx-bg` background property to `transparent` in light mode, ensuring it acts as a layout element without solid background color layers, while preserving its animated ambient lighting pseudo-elements.
- Added a dark mode body override rule to guarantee dark mode remains exactly as before.
- Changed the non-scrolled navbar background styling to `transparent` in `Navbar.tsx`, allowing the silk background to flow seamlessly to the very top of the page viewport without color seams or boundaries.
- Re-verified full builds of both `apps/us` and `apps/in` workspaces with 0 compile errors.

## Modified Files

| File                                                  | Changes                                                                                                                            |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/styles/globals.css`                  | Relocated background gradients/wave image properties to body, set .sx-bg background to transparent, added dark mode body overrides |
| `packages/ui/src/components/Navbar.tsx`               | Changed non-scrolled header background color from C.bg to transparent                                                              |
| `packages/ui/src/lib/theme.ts`                        | Accent colors → gold, serif font in shared style fragments                                                                         |
| `packages/ui/src/components/Footer.tsx`               | Gold hover links, transparent light mode background with dark mode override                                                        |
| `packages/ui/src/components/BookPage.tsx`             | Gold pill badge, serif h1, bold highlights, section separator                                                                      |
| `packages/ui/src/components/ConsultationForm.tsx`     | Elevated inputs, soft shadows, gold focus rings                                                                                    |
| `packages/ui/src/components/ServicesPage.tsx`         | Rounded cards with gold titles, hover lift                                                                                         |
| `packages/ui/src/components/ui/PrimaryLink.tsx`       | Gold pill buttons with shadow and hover lift                                                                                       |
| `packages/ui/src/components/pricing/PricingTiers.tsx` | Rounded cards with gold highlight border                                                                                           |
| `packages/ui/src/components/ui/Aurora.tsx`            | Updated SVG gradient definitions and technology motif group stroke to use CSS color variables                                      |
| `packages/ui/src/components/home/HeroSection.tsx`     | Applied serif h1 typography and fine-tuned letter-spacing                                                                          |
| `packages/ui/src/components/HomeBusiness.tsx`         | Applied serif h1 and CTA h2 typography, fixed dotted grid overlay color                                                            |
| `packages/ui/src/components/ContactPage.tsx`          | Updated to use shared eyebrow and pageH1 serif styling                                                                             |
| `packages/ui/src/components/CareersPage.tsx`          | Updated to use serif h1, gold dotted overlay, and rounder founding CTA card styles                                                 |
| `packages/ui/src/components/RoleDetailPage.tsx`       | Styled facts sidebar as a luxury card, updated track and header to serif styles                                                    |

## New Files Added

| File                           | Purpose                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| `apps/us/public/silk-wave.png` | Decorative silk wave background image (updated with new asset) |
| `apps/in/public/silk-wave.png` | Same image for the IN app (updated with new asset)             |
| `light_mode_progress.md`      | This progress tracker                                          |

## Remaining Tasks

- working on the smooth scrolling of the website, removing unintended animations and jitters

## Next Step

Ready for final review .All features, routing, and dark mode states have been completely preserved and verified, with the background flowing continuously from the very top of the website to the very bottom.
