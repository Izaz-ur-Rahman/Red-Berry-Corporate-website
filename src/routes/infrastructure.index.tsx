import { SiteLayout } from "@/components/site/SiteLayout";
import { HubPage } from "@/components/site/HubPage";
import { SECTIONS, DISCIPLINES } from "@/lib/platform";

export default function InfrastructureIndex() {
  const section = SECTIONS.find((s) => s.key === "infrastructure")!;
  return (
    <SiteLayout>
      <HubPage section={section} items={DISCIPLINES} />
    </SiteLayout>
  );
}
