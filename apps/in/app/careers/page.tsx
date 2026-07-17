import { CareersPage , pageMetadata} from "@solvrex/ui";


export const metadata = pageMetadata({
  title: "Careers at Solvrex | Join Our Team",
  description:
    "Explore open roles at Solvrex. Join our founding team across entry-level and lateral positions in technology, sales, marketing, and career services.",
  path: "/careers",
});

export default function Page() {
  return <CareersPage />;
}
