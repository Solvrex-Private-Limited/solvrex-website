import { PricingPage } from "@solvrex/ui";
import { JsonLd } from "@solvrex/ui";
import { pageMetadata, serviceLd } from "@solvrex/ui";

export const metadata = pageMetadata({
  title: "Business Pricing | Solvrex",
  description:
    "Transparent Solvrex business pricing — project-based builds, monthly retainers, and senior advisory for website & digital enablement, technology, sales, marketing, and operational support. Career services available as a secondary offering.",
  path: "/pricing",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          name: "Solvrex Business Enablement",
          description:
            "Website & digital enablement, technology consulting, and sales, marketing, and operational support — scoped per engagement as a fixed-quote project, monthly retainer, or senior advisory.",
          path: "/pricing",
        })}
      />
      <PricingPage variant="business" />
    </>
  );
}
