// import { useParams } from "react-router-dom";
// import { SiteLayout } from "@/components/site/SiteLayout";
// import { DetailPage } from "@/components/site/DetailPage";
// import { LeadershipPage } from "@/components/site/LeadershipPage";
// import { NotFoundPage } from "@/components/site/NotFoundPage";
// import { SECTIONS, ABOUT, findItem } from "@/lib/platform";
// import { SEOHead } from "@/components/common/SEOHead";
// export default function AboutSlug() {
//   const { slug = "" } = useParams();
//   const item = findItem("about", slug);
//   if (!item) return <NotFoundPage />;
//   const section = SECTIONS.find((s) => s.key === "about")!;

//   if (item.slug === "leadership") {
//     return <LeadershipPage section={section} item={item} />;
//   }

//   const related = ABOUT.filter((i) => i.slug !== item.slug).slice(0, 3);
//   return (

//     <SiteLayout>
//       <SEOHead
//         title="Leadership | Red Berry"
//         description="The people behind Red Berry. Advisors who have built, structured and protected businesses across the UAE and GCC, and now do it for other founders."
//         url="https://redberry.ae/leadership"
//       />
//       <DetailPage section={section} item={item} related={related} />
//     </SiteLayout>
//   );
// }

import { useParams } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DetailPage } from "@/components/site/DetailPage";
import { LeadershipPage } from "@/components/site/LeadershipPage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { SECTIONS, ABOUT, findItem } from "@/lib/platform";
import { SEOHead } from "@/components/common/SEOHead";

export default function AboutSlug() {
  const { slug = "" } = useParams();

  const item = findItem("about", slug);

  if (!item) return <NotFoundPage />;

  const section = SECTIONS.find((s) => s.key === "about")!;

  const related = ABOUT
    .filter((i) => i.slug !== item.slug)
    .slice(0, 3);

  return (
    <SiteLayout>
      <SEOHead
        title={item.metaTitle}
        description={item.metaDescription}
        url={`https://redberry.ae/about/${item.slug}`}
      />

      {item.slug === "leadership" ? (
        <LeadershipPage section={section} item={item} />
      ) : (
        <DetailPage
          section={section}
                item={item}
          related={related}
        />
      )}
    </SiteLayout>
  );
}