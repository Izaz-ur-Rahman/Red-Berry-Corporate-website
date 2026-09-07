import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DetailPage } from "@/components/site/DetailPage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { SECTIONS, findItem, infrastructureForAmbition } from "@/lib/platform";

const REDIRECTS: Record<string, string> = {
  "launch-a-business": "/launch-a-business",
  "expand-into-the-gcc": "/expand-into-gcc",
  "expand-into-gcc": "/expand-into-gcc",
  "grow-and-protect-wealth": "/grow-and-protect-wealth",
  "grow-protect-wealth": "/grow-and-protect-wealth",
  "create-family-security": "/create-family-security",
  "family-security": "/create-family-security",
  "increase-global-freedom": "/increase-global-freedom",
  "global-freedom": "/increase-global-freedom",
  "sovereign-freedom": "/increase-global-freedom",
  "build-a-hospitality-venture": "/build-a-hospitality-venture",
  "hospitality-venture": "/build-a-hospitality-venture",
  "build-hospitality-venture": "/build-a-hospitality-venture",
};

export default function AmbitionsSlug() {
  const { slug = "" } = useParams();
  const redirect = REDIRECTS[slug];
  if (redirect) return <Navigate to={redirect} replace />;

  const item = findItem("ambitions", slug);
  if (!item) return <NotFoundPage />;

  const section = SECTIONS.find((s) => s.key === "ambitions")!;
  const infraSection = SECTIONS.find((s) => s.key === "infrastructure")!;
  const related = infrastructureForAmbition(item.slug).slice(0, 3);
  return (
    <SiteLayout>
      <DetailPage
        section={section}
        item={item}
        related={related}
        relatedSection={infraSection}
        relatedHeading="Infrastructure That Builds This Ambition"
      />
    </SiteLayout>
  );
}
