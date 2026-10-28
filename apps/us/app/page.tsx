import type { Metadata } from "next";
import { Home, JsonLd, organizationLd, siteConfig } from "@solvrex/ui";

// Title, description, Open Graph and Twitter come from the root layout. Only the
// canonical is set here: the layout no longer sets one, so the homepage declares its own.
export const metadata: Metadata = {
  alternates: { canonical: `${siteConfig.url}/` },
};

export default function Page() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <Home />
    </>
  );
}