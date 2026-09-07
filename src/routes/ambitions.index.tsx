import { SiteLayout } from "@/components/site/SiteLayout";
import { HubPage } from "@/components/site/HubPage";
import { SECTIONS, AMBITIONS } from "@/lib/platform";

export default function AmbitionsIndex() {
  const section = SECTIONS.find((s) => s.key === "ambitions")!;
  return (
    <SiteLayout>
      <HubPage section={section} items={AMBITIONS} />
    </SiteLayout>
  );
}
