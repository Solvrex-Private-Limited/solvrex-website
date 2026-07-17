import { BookPage, JsonLd, pageMetadata, professionalServiceLd } from "@solvrex/ui";


export const metadata = pageMetadata({
  title: "Book a Free Career Consultation | Solvrex",
  description:
    "Book a free consultation with Solvrex. Share your goals and we'll review your profile and recommend practical next steps for your job search and career.",
  path: "/book",
});

export default function Page() {
  return (
    <>
      <JsonLd data={professionalServiceLd()} />
      <BookPage />
    </>
  );
}
