import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService, ServiceDetailPage, JsonLd, pageMetadata, serviceLd } from "@solvrex/ui";


export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd data={serviceLd({ name: service.title, description: service.metaDescription, path: `/services/${slug}` })} />
      <ServiceDetailPage service={service} />
    </>
  );
}
