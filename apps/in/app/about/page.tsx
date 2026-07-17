import { 
  AboutPage, 
  pageMetadata 
} from "@solvrex/ui";


export const metadata = pageMetadata({
  title: "About Solvrex | Human-Led Career & Technology Consulting",
  description:
    "Solvrex is a small practice focused on career services, technology consulting, and business enablement — practical, personalized, and independent support.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
