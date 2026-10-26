// Shared design system + components/data/lib consumed by the apps.
// Server-only helpers (Resend handler, sitemap/robots) live in "@solvrex/ui/server".

// lib
export * from "./lib/theme";
export * from "./lib/site";
export * from "./lib/seo";
export * from "./lib/pricing";

// data
export * from "./data/services";
export * from "./data/resources";
export * from "./data/roles";
export * from "./data/careerServices";

// chrome
export { Navbar } from "./components/Navbar";
export { Footer } from "./components/Footer";
export { JsonLd } from "./components/JsonLd";
export { default as BubbleBackground } from "./components/BubbleBackground";

// homepages (app-specific entry points; both live here, each app imports one)
export { Home } from "./components/Home";
export { HomeBusiness } from "./components/HomeBusiness";

// page bodies (shared across both apps)
export { ServicesPage } from "./components/ServicesPage";
export { ServiceDetailPage } from "./components/ServiceDetailPage";
export { CareersPage } from "./components/CareersPage";
export { CategoryPage } from "./components/CategoryPage";
export { RoleDetailPage } from "./components/RoleDetailPage";
export { ResourcesIndex } from "./components/ResourcesIndex";
export { default as ResourceGrid } from "./components/ResourceGrid/ResourceGrid";
export { ArticlePage } from "./components/ArticlePage";
export { PricingPage } from "./components/PricingPage";
export { AboutPage } from "./components/AboutPage";
export { ContactPage } from "./components/ContactPage";
export { BookPage } from "./components/BookPage";
