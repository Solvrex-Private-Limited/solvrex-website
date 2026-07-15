import { ServicesPage, pageMetadata } from "@solvrex/ui";


export const metadata = pageMetadata({
  title: "Services | Career, Technology Consulting & Business Enablement",
  description:
    "Explore Solvrex services — career services, technology consulting, and business enablement. Practical, human-led support for professionals and businesses.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
