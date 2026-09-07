import { SiteLayout } from "@/components/site/SiteLayout";
import { HubPage } from "@/components/site/HubPage";
import { BLUEPRINT_SECTION, BLUEPRINT_TOOLS } from "@/lib/platform";

export default function BlueprintIndex() {
  return (
    <SiteLayout>
      <HubPage section={BLUEPRINT_SECTION} items={BLUEPRINT_TOOLS} />
    </SiteLayout>
  );
}
