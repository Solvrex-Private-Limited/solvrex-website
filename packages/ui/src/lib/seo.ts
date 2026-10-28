import type { Metadata } from "next";
import { siteConfig } from "./site";
import type { LevelInfo, Role } from "../data/roles";

/* ── Helpers ─────────────────────────────────────────────────── */

/** Absolute URL on this site. "/" becomes "https://<domain>/". */
function absoluteUrl(path: string): string {
  return path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`;
}

/** Keep generated descriptions within ~160 chars, cutting at a word boundary. */
function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:\s—-]+$/, "")}…`;
}

const orgId = () => `${siteConfig.url}/#organization`;
const websiteId = () => `${siteConfig.url}/#website`;
const logoUrl = () => `${siteConfig.url}${siteConfig.logoPath}`;
const ogImageUrl = () => `${siteConfig.url}/opengraph-image`;
const twitterImageUrl = () => `${siteConfig.url}/twitter-image`;
const imageSize = { width: 1200, height: 630 };

/* ── Metadata builders ───────────────────────────────────────── */

/** Build per-page metadata with an absolute canonical URL + Open Graph + Twitter cards.
 *
 *  Every indexable route should call this (or roleMetadata / levelMetadata below) so it
 *  gets its own canonical. The root layouts must NOT set a canonical, otherwise pages
 *  that forget to set one would inherit the homepage as their canonical.
 *
 *  A page-level openGraph/twitter object replaces the layout's (Next does not
 *  deep-merge), so the social image is referenced here explicitly. */
export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url,
      title,
      description,
      locale: siteConfig.locale,
      images: [{ url: ogImageUrl(), ...imageSize, alt: siteConfig.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: twitterImageUrl(), ...imageSize, alt: siteConfig.ogImageAlt }],
    },
  };
}

/** Metadata for a /careers/[id] role page. */
export function roleMetadata(role: Role): Metadata {
  return pageMetadata({
    title: `${role.title} | Careers at ${siteConfig.name}`,
    description: clampDescription(
      `${role.tagline} ${role.track} role at ${siteConfig.name} — ${role.type}, ${role.location}.`,
    ),
    path: `/careers/${role.id}`,
  });
}

/** Metadata for a careers level listing page (/careers/entry-level, /careers/lateral). */
export function levelMetadata(level: LevelInfo): Metadata {
  return pageMetadata({
    title: `${level.name} Roles | Careers at ${siteConfig.name}`,
    description: clampDescription(
      `${level.description} Browse open ${level.name.toLowerCase()} positions at ${siteConfig.name}.`,
    ),
    path: `/careers/${level.slug}`,
  });
}

/* ── JSON-LD (Schema.org) builders ───────────────────────────── */

/** Homepage graph: one Organization + one WebSite, linked by @id.
 *  Used on the homepage only, so each entity is declared once per site. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId(),
        name: siteConfig.name,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: logoUrl(), width: 360, height: 300 },
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        sameAs: [siteConfig.linkedInUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId(),
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: siteConfig.hreflang,
        publisher: { "@id": orgId() },
      },
    ],
  };
}

export function serviceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      "@id": orgId(),
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function articleLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: ogImageUrl(),
    inLanguage: siteConfig.hreflang,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      "@id": orgId(),
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: logoUrl() },
    },
    // datePublished / dateModified are intentionally omitted: add real dates to
    // data/resources.ts first, then emit them here.
  };
}

/** ProfessionalService for the booking page. No areaServed / priceRange: the site
 *  content does not support either claim. */
export function professionalServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/book#professional-service`,
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Book a free consultation with Solvrex for career services, technology consulting, or business enablement.",
    email: siteConfig.contactEmail,
    image: logoUrl(),
  };
}

/** BreadcrumbList for a trail like Home / Services / Career Services.
 *  The last crumb is the current page and carries no URL. */
export function breadcrumbLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(item.href && !isLast ? { item: absoluteUrl(item.href) } : {}),
      };
    }),
  };
}