import { SiteLayout } from "@/components/site/SiteLayout";
import { AmbitionLibraryPage } from "@/components/resources/AmbitionLibraryPage";
import { SECTIONS, findItem } from "@/lib/platform";
import { NotFoundPage } from "@/components/site/NotFoundPage";

export default function TestingWebDesignCategoryIndex() {
  const section = SECTIONS.find((s) => s.key === "resources-hub")!;
  const item = findItem("resources-hub", "testing-web-design-category");
  if (!item) return <NotFoundPage />;
  return (
    <SiteLayout>
      <AmbitionLibraryPage section={section} item={item} category="testing-web-design-category" />
    </SiteLayout>
  );
}
