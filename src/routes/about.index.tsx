import { SiteLayout } from "@/components/site/SiteLayout";
import { HubPage } from "@/components/site/HubPage";
import { SECTIONS, ABOUT } from "@/lib/platform";

export default function AboutIndex() {
  const section = SECTIONS.find((s) => s.key === "about")!;
  return (
    <SiteLayout>
      <HubPage section={section} items={ABOUT} />
    </SiteLayout>
  );
}
