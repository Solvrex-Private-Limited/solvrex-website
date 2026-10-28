import { CategoryPage, getLevelBySlug, levelMetadata } from "@solvrex/ui";

const level = getLevelBySlug("lateral")!;

export const metadata = levelMetadata(level);

export default function Page() {
  return <CategoryPage level={level} />;
}