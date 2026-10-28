import { CategoryPage, getLevelBySlug, levelMetadata } from "@solvrex/ui";

const level = getLevelBySlug("entry-level")!;

export const metadata = levelMetadata(level);

export default function Page() {
  return <CategoryPage level={level} />;
}