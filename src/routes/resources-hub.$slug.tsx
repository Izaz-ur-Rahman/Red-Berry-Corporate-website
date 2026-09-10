// import { useParams, Navigate } from "react-router-dom";
// import { SiteLayout } from "@/components/site/SiteLayout";
// import { DetailPage } from "@/components/site/DetailPage";
// import { AmbitionLibraryPage } from "@/components/resources/AmbitionLibraryPage";
// import { NotFoundPage } from "@/components/site/NotFoundPage";
// import { SECTIONS, RESOURCES_HUB, findItem } from "@/lib/platform";
// import { useEffect, useState } from "react";

// const REDIRECTS: Record<string, string> = {
//   "cost-of-wrong-structure": "/resources-hub/ambition-library",
//   "building-in-the-gcc": "/resources-hub/ambition-library",
//   "people-building-the-gcc": "/resources-hub/ambition-library",
//   "infrastructure-reports": "/resources-hub/ambition-library",
//   "gcc-ambition-index": "/resources-hub/ambition-library",
// };

// export default function ResourcesHubSlug() {
//   const { slug = "" } = useParams();
//   const [isBlogCategory, setIsBlogCategory] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if this slug is a blog category
//     const checkIfBlogCategory = async () => {
//       try {
//         const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.redberry.ae/api';
//         const response = await fetch(`${API_BASE_URL}/BlogCategory/List`);
        
//         if (response.ok) {
//           const data = await response.json();
//           const categories = data.data || [];
          
//           // Check if any category matches this slug
//           const matchingCategory = categories.find((cat: any) => cat.slug === slug);
//           setIsBlogCategory(!!matchingCategory);
//         } else {
//           setIsBlogCategory(false);
//         }
//       } catch (error) {
//         console.error('Error checking blog category:', error);
//         setIsBlogCategory(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkIfBlogCategory();
//   }, [slug]);

//   // Handle redirects
//   const redirect = REDIRECTS[slug];
//   if (redirect) return <Navigate to={redirect} replace />;

//   // Show loading state
//   if (isLoading) {
//     return (
//       <SiteLayout>
//         <div className="container-rb py-20 text-center">
//           <p className="text-foreground/60">Loading...</p>
//         </div>
//       </SiteLayout>
//     );
//   }

//   // If it's a blog category, show the blog list page
//   if (isBlogCategory) {
//     const section = SECTIONS.find((s) => s.key === "resources-hub")!;
    
//     // Try to find existing item configuration
//     let item = findItem("resources-hub", slug);
    
//     // If no item found, create a dynamic one
//     if (!item) {
//       item = {
//         slug: slug,
//         title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
//         tagline: "Resources and insights.",
//         icon: RESOURCES_HUB[0].icon, // Use default icon
//         accent: "berry" as const,
//       };
//     }

//     return (
//       <SiteLayout>
//         <AmbitionLibraryPage section={section} item={item} category={slug} />
//       </SiteLayout>
//     );
//   }

//   // Not a blog category - check if it's a static detail page
//   const item = findItem("resources-hub", slug);
//   if (!item) return <NotFoundPage />;

//   const section = SECTIONS.find((s) => s.key === "resources-hub")!;
//   const related = RESOURCES_HUB.filter((i) => i.slug !== item.slug).slice(0, 3);
  
//   return (
//     <SiteLayout>
//       <DetailPage section={section} item={item} related={related} />
//     </SiteLayout>
//   );
// }

import { useParams } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AmbitionLibraryPage } from "@/components/resources/AmbitionLibraryPage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { SECTIONS } from "@/lib/platform";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogCategories } from "@/store/blogSlice";
import { FolderOpen } from "lucide-react";

export default function ResourcesHubSlug() {
  const { slug = "" } = useParams();

  const dispatch = useAppDispatch();

  const {
    blogCategories,
    blogCategoriesLoading,
    blogCategoriesError,
  } = useAppSelector((state) => state.blog);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogCategories.length === 0) {
      dispatch(fetchBlogCategories());
    }
  }, [dispatch, blogCategories.length]);

  useEffect(() => {
    if (
      !blogCategoriesLoading &&
      blogCategories.length > 0
    ) {
      setLoading(false);
    }
  }, [blogCategoriesLoading, blogCategories]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-rb py-20 text-center">
          <p className="text-foreground/60">
            Loading resources...
          </p>
        </div>
      </SiteLayout>
    );
  }

  if (blogCategoriesError) {
    return (
      <SiteLayout>
        <div className="container-rb py-20 text-center">
          <p className="text-red-500">
            Error loading resources:{" "}
            {blogCategoriesError}
          </p>
        </div>
      </SiteLayout>
    );
  }

  const category = blogCategories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return <NotFoundPage />;
  }

  const section = SECTIONS.find(
    (s) => s.key === "resources-hub"
  )!;

  const item = {
    slug: category.slug,
    title: category.name,
    tagline:
      category.description ||
      "Resources and insights.",
    icon: FolderOpen,
    accent: "berry" as const,
  };

  return (
    <SiteLayout>
      <AmbitionLibraryPage
        section={section}
        item={item}
        category={category.slug}
      />
    </SiteLayout>
  );
}