import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RESOURCES, getArticle, ArticlePage, JsonLd, pageMetadata, articleLd } from "@solvrex/ui";


export function generateStaticParams() {
  return RESOURCES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/resources/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <>
      <JsonLd data={articleLd({ title: article.title, description: article.description, path: `/resources/${slug}` })} />
      <ArticlePage article={article} />
    </>
  );
}
