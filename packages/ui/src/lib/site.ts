/**
 * Single source of truth for brand / contact / config values.
 * Anything that might change later lives here — not hardcoded in components.
 */

/** Production domains of the two sites. Used for region detection and hreflang. */
const DOMAINS = {
  in:  "https://www.solvrex.in",
  us: "https://www.solvrex.us",
} as const;

export type SiteRegion = keyof typeof DOMAINS;

/** Per-region language/locale tags. Site copy is English on both domains. */
const REGION_META: Record<SiteRegion, { locale: string; hreflang: string }> = {
  in: { locale: "en_IN", hreflang: "en-IN" },
  us: { locale: "en_US", hreflang: "en-US" },
};

/** Trim, drop trailing slashes, and fall back to the India domain if empty/invalid. */
function resolveSiteUrl(raw: string | undefined): string {
  const candidate = (raw ?? "").trim().replace(/\/+$/, "");
  if (!candidate) return DOMAINS.in;
  try {
    new URL(candidate);
    return candidate;
  } catch {
    return DOMAINS.in;
  }
}

/** A .us hostname is the US site; everything else (incl. the default) is India. */
function detectRegion(siteUrl: string): SiteRegion {
  try {
    return new URL(siteUrl).hostname.endsWith(".us") ? "us" : "in";
  } catch {
    return "in";
  }
}

// Each app sets NEXT_PUBLIC_SITE_URL in its next.config.mjs
// (https://solvrex.in for apps/in, https://solvrex.us for apps/us). No trailing slash.
const url = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const region = detectRegion(url);
const alternateRegion: SiteRegion = region === "in" ? "us" : "in";

export const siteConfig = {
  name: "Solvrex",
  url,
  /** Which of the two sites this build is: "in" or "us". */
  region,
  /** Open Graph locale, e.g. en_IN / en_US. */
  locale: REGION_META[region].locale,
  /** hreflang / BCP-47 tag for this site, e.g. en-IN / en-US. */
  hreflang: REGION_META[region].hreflang,
  /** The sibling site, for hreflang alternates. Always the production domain. */
  alternate: {
    region: alternateRegion,
    url: DOMAINS[alternateRegion] as string,
    hreflang: REGION_META[alternateRegion].hreflang,
  },
  description:
    "Practical career services, technology consulting, and business enablement. Resume reviews, LinkedIn optimization, job search strategy, website development, and operational support.",
  // Public-facing contact inbox (the contact form's API route can override via env).
  contactEmail: "official@solvrex.in",
  linkedInUrl: "https://www.linkedin.com/company/solvrex-private-limited/",
  // Shared Google Form the Careers "Apply" button opens.
  applyFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfqfcGhR_3LsTCc1UQ6KaqdaQyAR9uxb18B7LVsHc_sKgRb-w/viewform",
  /** Logo served from each app's /public folder (exists in both apps). */
  logoPath: "/mark.png",
  /** Alt text for the generated OG/Twitter image (matches app/opengraph-image.tsx). */
  ogImageAlt:
    "Solvrex — Career Services, Technology Consulting & Business Enablement",
};