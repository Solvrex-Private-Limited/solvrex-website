import { ResourcesIndex, pageMetadata } from "@solvrex/ui";


export const metadata = pageMetadata({
  title: "Career Resources | Resume, LinkedIn, Referrals & Interview Guides",
  description:
    "Free Solvrex career guides on resume tailoring, LinkedIn optimization, referral outreach, job search planning, and interview preparation — practical, no fluff.",
  path: "/resources",
});

export default function Page() {
  return <ResourcesIndex />;
}
