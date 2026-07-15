import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ROLES, getRole, RoleDetailPage } from "@solvrex/ui";


export function generateStaticParams() {
  return ROLES.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const role = getRole(id);
  if (!role) return {};
  return { title: role.title, description: role.tagline };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = getRole(id);
  if (!role) notFound();
  return <RoleDetailPage role={role} />;
}
