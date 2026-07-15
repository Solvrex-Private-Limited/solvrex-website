import { CategoryPage , getLevelBySlug} from "@solvrex/ui";


export const metadata = { title: "Entry Level Roles" };

export default function Page() {
  return <CategoryPage level={getLevelBySlug("entry-level")!} />;
}
