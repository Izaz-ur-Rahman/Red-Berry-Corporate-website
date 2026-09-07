import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DetailPage } from "@/components/site/DetailPage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { BLUEPRINT_SECTION, BLUEPRINT_TOOLS, findItem } from "@/lib/platform";
import { ArrowRight, Sparkles } from "lucide-react";

const REMOVED_SLUGS = [
  "gcc-move-blueprint",
  "structure-cost-calculator",
  "sovereign-readiness-assessment",
];

function RemovedBlueprintPage({ slug }: { slug: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/blueprint-tool");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const titles: Record<string, string> = {
    "gcc-move-blueprint": "GCC Move Blueprint",
    "structure-cost-calculator": "Structure Cost Calculator",
    "sovereign-readiness-assessment": "Sovereign Readiness Assessment",
  };

  return (
    <SiteLayout>
      <section className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-berry/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-berry" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-heading">
            {titles[slug] ?? "This Tool"} Has Evolved
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            We have consolidated this diagnostic into the{" "}
            <span className="font-semibold text-heading">Ambition Infrastructure Blueprint</span>
            {" "}— a more powerful, comprehensive assessment that covers corporate, financial, sovereign, and legacy layers in one session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/blueprint-tool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry text-white font-semibold hover:bg-berry/90 transition-colors"
            >
              Open the Blueprint Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-sm text-muted">Redirecting automatically in a few seconds…</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default function BlueprintSlug() {
  const { slug = "" } = useParams();
  if (REMOVED_SLUGS.includes(slug)) return <RemovedBlueprintPage slug={slug} />;

  const item = findItem("blueprint", slug);
  if (!item) return <NotFoundPage />;

  const related = BLUEPRINT_TOOLS.filter((i) => i.slug !== item.slug).slice(0, 3);
  return (
    <SiteLayout>
      <DetailPage section={BLUEPRINT_SECTION} item={item} related={related} />
    </SiteLayout>
  );
}
