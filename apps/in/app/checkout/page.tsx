import { CheckoutFlow } from "@solvrex/ui";
import { pageMetadata } from "@solvrex/ui";

export const metadata = pageMetadata({
  title: "Checkout | Solvrex",
  description: "Complete your Solvrex career service plan enrollment with secure checkout.",
  path: "/checkout",
});

export default function Page() {
  return <CheckoutFlow />;
}
