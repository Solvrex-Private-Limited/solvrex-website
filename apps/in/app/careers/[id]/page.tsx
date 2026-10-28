import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ROLES, getRole, roleMetadata } from "@solvrex/ui";
import { RoleDetailPage } from "@solvrex/ui";

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
  return roleMetadata(role);
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
