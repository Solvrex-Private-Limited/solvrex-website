// Pricing — single source of truth (homepage preview + /pricing page + Pricing mega-menu).
// Career Services is priced per application cycle (USD). Business & IT work is custom
// (project-based or monthly retainer) and quoted per engagement.
export const PRICING_IS_PLACEHOLDER = false;

export const PRICING_NOTE =
  "Career Services is priced per application cycle. We confirm the exact application cap for your tier before we start.";

export interface PricingTier {
  slug: string;
  name: string;
  blurb: string;
  priceFrom: string; // e.g. "$199"
  billing: string; // e.g. "per cycle"
  features: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    slug: "quarterly",
    name: "Quarterly",
    blurb: "Managed applications and a tailored resume to get moving.",
    priceFrom: "999",
    billing: "quarterly",
    features: [
      "Managed applications (up to your cycle cap)",
      "Resume tailoring",
      "Follow-ups",
      "Weekly report",
      "Dedicated operator + QA",
    ],
  },
  {
    slug: "half-yearly",
    name: "Half Yearly",
    blurb: "Higher volume, plus profile and interview prep.",
    priceFrom: "1499",
    billing: "half yearly",
    features: [
      "Everything in Quarterly, at higher volume",
      "LinkedIn optimization",
      "2 mock interviews",
    ],
    highlighted: true,
  },
  {
    slug: "yearly",
    name: "Yearly",
    blurb: "Our most hands-on tier, with coaching and priority support.",
    priceFrom: "2199",
    billing: "yearly",
    features: [
      "Everything in Half Yearly",
      "AI-assisted resume / JD matching",
      "Interview coaching",
      "Priority handling",
    ],
  },
];

// Feature × tier matrix for the comparison table.
// Cell value: true = included, false = not included, string = tier-specific detail.
export interface ComparisonRow {
  feature: string;
  tiers: [boolean | string, boolean | string, boolean | string];
}

export const COMPARISON: ComparisonRow[] = [
  { feature: "Managed applications", tiers: ["Up to cap", "Higher volume", "Higher volume"] },
  { feature: "Resume tailoring", tiers: [true, true, true] },
  { feature: "Follow-ups", tiers: [true, true, true] },
  { feature: "Weekly report", tiers: [true, true, true] },
  { feature: "Dedicated operator + QA", tiers: [true, true, true] },
  { feature: "LinkedIn optimization", tiers: [false, true, true] },
  { feature: "Mock interviews", tiers: [false, "2 sessions", "Included"] },
  { feature: "AI-assisted resume / JD matching", tiers: [false, false, true] },
  { feature: "Interview coaching", tiers: [false, false, true] },
  { feature: "Priority handling", tiers: [false, false, true] },
];

export interface AddOn {
  name: string;
  price: string;
}

export const ADD_ONS: AddOn[] = [
  { name: "Standalone mock interview session", price: "On request" },
  { name: "Resume / LinkedIn rewrite (one-off)", price: "On request" },
  { name: "AI-assisted resume / JD matching", price: "$49" },
];

// Secondary: business & IT work is scoped per engagement.
export const BUSINESS_PRICING = {
  heading: "Business & IT services",
  blurb:
    "Websites, digital marketing, and operational support are scoped to your needs — project-based or as a monthly retainer. Request a quote and we'll tailor it.",
};

// ── Business enablement pricing (solvrex.in primary) ──
// Business work is quoted per engagement — no fixed list price.
export const BUSINESS_HEADER = {
  h1: "Pricing built around your scope.",
  blurb:
    "Business work is scoped per engagement — a fixed-quote project, an ongoing monthly retainer, or senior advisory. Tell us what you need and we'll send a tailored quote.",
};

export interface EngagementModel {
  slug: string;
  name: string;
  billing: string; // short label shown in place of a price, e.g. "Fixed quote"
  blurb: string;
  features: string[];
  highlighted?: boolean;
}

export const BUSINESS_ENGAGEMENTS: EngagementModel[] = [
  {
    slug: "project",
    name: "Project-based",
    billing: "Fixed quote",
    blurb: "A defined build with a clear scope and a single fixed price.",
    features: [
      "Websites & digital enablement",
      "One-off technology builds & integrations",
      "Defined scope, timeline, and deliverables",
      "Fixed quote agreed up front",
    ],
  },
  {
    slug: "retainer",
    name: "Monthly retainer",
    billing: "Monthly",
    blurb: "Ongoing support across the areas your business needs most.",
    features: [
      "Sales & marketing support",
      "Operational support",
      "Technology maintenance & iteration",
      "Flexible monthly scope — no long lock-in",
    ],
    highlighted: true,
  },
  {
    slug: "advisory",
    name: "Advisory / fractional",
    billing: "On request",
    blurb: "Senior-led guidance and oversight without a full-time hire.",
    features: [
      "Strategy & roadmap input",
      "Vendor-independent advice",
      "Fractional leadership / oversight",
      "Scoped to your cadence",
    ],
  },
];

export const BUSINESS_PRICING_NOTE =
  "Every business engagement is quoted after a short consultation, so the scope and price match what you actually need.";

export const BUSINESS_FAQ: PricingFaq[] = [
  {
    q: "How is business work priced?",
    a: "Per engagement. A defined build is a fixed-quote project; ongoing work is a monthly retainer; senior guidance is scoped as advisory. We confirm scope and price before any commitment.",
  },
  {
    q: "Project or monthly retainer — which do I need?",
    a: "Use a project when the scope is well-defined (a website, an integration). Use a retainer when you need ongoing sales, marketing, operational, or technology support. We'll recommend the right fit on a call.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "No long lock-in. Projects are scoped to deliverables; retainers run month to month so you can adjust as your needs change.",
  },
  {
    q: "Do you also offer career services?",
    a: "Yes — career services are available as a secondary offering, priced per application cycle. See the Career Services plans below.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation. We'll discuss your needs, recommend project or retainer, and send a tailored quote.",
  },
];

export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_FAQ: PricingFaq[] = [
  {
    q: "How is pricing structured?",
    a: "Career Services is priced per application cycle. You pick a tier, we confirm the scope, and you're billed per cycle — no long lock-in.",
  },
  {
    q: "How many applications does a cycle include?",
    a: "Each tier covers a set number of managed applications per cycle. We confirm the exact cap with you before we start so expectations are clear.",
  },
  {
    q: "Can I add services to a plan?",
    a: "Yes. Add-ons like a standalone mock interview, a one-off resume/LinkedIn rewrite, or AI-assisted matching can be added to any tier.",
  },
  {
    q: "Do you work with businesses too?",
    a: "Yes. Business & IT work — websites, digital marketing, and operational support — is scoped per project or as a monthly retainer. Request a quote and we'll tailor it.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation. We'll recommend the right tier and confirm scope before any commitment.",
  },
];
