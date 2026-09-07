import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DetailPage } from "@/components/site/DetailPage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { SECTIONS, findItem, ambitionsForDiscipline } from "@/lib/platform";

const REDIRECTS: Record<string, string> = {
  "foundation-build": "/foundation-build",
  "financial-infrastructure": "/financial-infrastructure",
  "wealth-structure-design": "/wealth-structure-design",
  "identity-foundation": "/identity-foundation",
  "venture-architecture": "/venture-architecture",
  "sovereign-freedom": "/sovereign-freedom",
  "legacy-life-architecture": "/legacy-life-architecture",
};

export default function InfrastructureSlug() {
  const { slug = "" } = useParams();
  const redirect = REDIRECTS[slug];
  if (redirect) return <Navigate to={redirect} replace />;

  const item = findItem("infrastructure", slug);
  if (!item) return <NotFoundPage />;

  const section = SECTIONS.find((s) => s.key === "infrastructure")!;
  const ambitionsSection = SECTIONS.find((s) => s.key === "ambitions")!;
  const related = ambitionsForDiscipline(item.slug).slice(0, 3);
  return (
    <SiteLayout>
      <DetailPage
        section={section}
        item={item}
        related={related}
        relatedSection={ambitionsSection}
        relatedHeading="Ambitions This Infrastructure Powers"
      />
    </SiteLayout>
  );
}
