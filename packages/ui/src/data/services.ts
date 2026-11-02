// Single source of truth for the three services.
// Used by the Navbar mega-menu, the /services overview grid, and each
// /services/[slug] detail page — so service copy lives in exactly one place.

export interface Service {
  slug: string;
  number: string; // tile index on the overview page, e.g. "01"
  title: string;
  seoTitle: string; // full <title> for the detail page (absolute)
  metaDescription: string; // 140–160 char meta description
  // Short description shown in the Navbar mega-menu.
  navDescription: string;
  // One-line description shown on the /services overview cards.
  cardDescription: string;
  // Sub-links listed under the service in the Navbar mega-menu.
  megaLinks: string[];
  // Detail page (/services/[slug]) content.
  h1: string;
  overview: string;
  typicalEngagements: string[];
  expectedOutcomes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "business-enablement",
    number: "01",
    title: "Business Enablement",
    seoTitle: "Website Development & Business Enablement | Solvrex",
    metaDescription:
      "Solvrex helps small businesses build websites, set up their online presence, and improve operations — practical digital enablement and operational support.",
    navDescription: "Website development and operational support",
    cardDescription:
      "Website development, online presence, and operational support for small businesses.",
    megaLinks: [
      "Website Development",
      "Google Business Profile Setup",
      "Business Process Improvement",
      "Operational Support",
      "Digital Enablement",
    ],
    h1: "Website development, online presence, and operational support.",
    overview:
      "We help small businesses and organizations establish their online presence, improve their operations, and work more effectively with technology.",
    typicalEngagements: [
      "Website development and maintenance",
      "Online presence setup (Google Business Profile, social profiles)",
      "Business process improvement",
      "Operational support and workflow optimization",
      "Digital enablement for local businesses",
    ],
    expectedOutcomes: [
      "Functional, professional online presence",
      "Improved operational efficiency",
      "Better use of existing tools and systems",
    ],
  },
  {
    slug: "technology-consulting",
    number: "02",
    title: "Technology Consulting",
    seoTitle: "Technology Consulting & Architecture Guidance | Solvrex",
    metaDescription:
      "Independent technology consulting from Solvrex — platform evaluation, architecture guidance, and implementation planning, with no vendor affiliations.",
    navDescription: "Independent technology guidance",
    cardDescription:
      "Platform evaluation, architecture guidance, and implementation planning.",
    megaLinks: [
      "Technology Assessment",
      "Platform Evaluation",
      "Architecture Guidance",
      "Implementation Planning",
      "Automation Opportunities",
    ],
    h1: "Independent guidance on technology decisions.",
    overview:
      "Independent guidance on technology decisions — technology assessment, architecture guidance, platform evaluation, and implementation planning. We have no vendor affiliations.",
    typicalEngagements: [
      "Technology & Architecture Assessment",
      "Platform & Vendor Evaluation",
      "Cloud & Infrastructure Strategy",
      "Technical Roadmap & Planning",
      "Implementation & Migration Advisory",
    ],
    expectedOutcomes: [
      "Informed Technology Decisions",
      "Reduced Implementation Risk",
      "Clearer Technical Direction",
    ],
  },
  {
    slug: "career-services",
    number: "03",
    title: "Career Services",
    seoTitle: "Career Services | Resume Review, LinkedIn Optimization & Job Search Support",
    metaDescription:
      "Human-led career services from Solvrex: resume review, LinkedIn optimization, job search strategy, application support, and interview preparation.",
    navDescription: "Support for career transitions",
    cardDescription:
      "Resume review, LinkedIn optimization, and job search strategy.",
    megaLinks: [
      "Resume Review",
      "LinkedIn Review",
      "Job Search Strategy",
      "Application Support",
      "Career Guidance",
    ],
    h1: "Practical support for professionals in transition.",
    overview:
      "We work with professionals navigating career transitions — resume review, LinkedIn optimization, job search strategy, and application support.",
    typicalEngagements: [
      "Resume review and optimization",
      "LinkedIn profile review",
      "Job search strategy",
      "Application support",
      "Career guidance and direction",
    ],
    expectedOutcomes: [
      "Stronger professional positioning",
      "Clearer career direction",
      "Improved application materials",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
