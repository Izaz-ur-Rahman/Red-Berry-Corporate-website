import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { HeroStats } from "@/components/home/HeroStats";
import { Ambitions } from "@/components/home/Ambitions";
import { Methodology } from "@/components/home/Methodology";
import { Blueprint } from "@/components/home/Blueprint";
import { Disciplines } from "@/components/home/Disciplines";
import { ResourcesHub } from "@/components/home/ResourcesHub";
import { SEOHead } from "@/components/common/SEOHead";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQ, FAQS } from "@/components/home/FAQ";
import ogCover from "@/assets/rb-og-cover.jpg";

const TITLE = "Red Berry | Ambition Infrastructure for the UAE & GCC";

const DESC =
  "Red Berry builds the corporate, financial, sovereign and legacy infrastructure ambitious founders, investors and families need to build in the UAE.";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

function Index() {
  return (
    <SiteLayout>
      <SEOHead
        title={TITLE}
        description={DESC}
        image={ogCover}
        url="https://redberry.ae/"
      />

      <Hero />
      <HeroStats />
      <Ambitions />
      <Methodology />
      <Blueprint />
      <Disciplines />
      <ResourcesHub />

      <FinalCTA />
      <FAQ />
    </SiteLayout>
  );
}

export default Index;