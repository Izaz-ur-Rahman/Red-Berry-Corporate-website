// import { SiteLayout } from "@/components/site/SiteLayout";
// import { HubPage } from "@/components/site/HubPage";
// import { SECTIONS } from "@/lib/platform";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchBlogCategories, fetchBlogCards } from "@/store/blogSlice";
// import type { NodeItem } from "@/lib/platform";
// import { FolderOpen } from "lucide-react";

// export default function ResourcesHubIndex() {
//   const section = SECTIONS.find((s) => s.key === "resources-hub")!;
//   const dispatch = useAppDispatch();
//   const { blogCategories, blogCategoriesLoading, blogCategoriesError, blogCards, blogCardsLoading } = useAppSelector((state) => state.blog);
//   const [resourceItems, setResourceItems] = useState<NodeItem[]>([]);

//   useEffect(() => {
//     // Fetch categories and all blogs from API
//     dispatch(fetchBlogCategories());
//     dispatch(fetchBlogCards()); // Fetch all blogs to check which categories have content
//   }, [dispatch]);

//   useEffect(() => {
//     // Filter categories that have at least one blog
//     if (blogCategories.length > 0 && blogCards.length > 0) {
//       // Get unique category slugs from blogs
//       const categorySlugsWithBlogs = new Set(
//         blogCards
//           .map(blog => {
//             // Extract slug from category
//             if (typeof blog.category === 'object' && blog.category?.slug) {
//               return blog.category.slug;
//             }
//             if (typeof blog.category === 'string') {
//               return blog.category;
//             }
//             // Try categoryName if category is not available
//             if (blog.categoryName) {
//               // Convert "Founder Resources" to "founder-resources"
//               return blog.categoryName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
//             }
//             return null;
//           })
//           .filter(Boolean) as string[]
//       );

//       console.log('Categories with blogs:', Array.from(categorySlugsWithBlogs));

//       // Filter categories to only include those with blogs
//       const categoriesWithBlogs = blogCategories.filter(category => 
//         categorySlugsWithBlogs.has(category.slug)
//       );

//       console.log('Filtered categories:', categoriesWithBlogs);

//       // Convert to NodeItems
//       const items: NodeItem[] = categoriesWithBlogs.map((category, index) => ({
//         slug: category.slug,
//         title: category.name,
//         tagline: category.description || "Resources and insights.",
//         icon: FolderOpen,
//         accent: index % 2 === 0 ? "berry" : "azure" as "berry" | "azure",
//       }));

//       setResourceItems(items);
//       console.log('Final resource items to display:', items);
//     }
//   }, [blogCategories, blogCards]);

//   // Show loading state
//   if (blogCategoriesLoading || blogCardsLoading) {
//     return (
//       <SiteLayout>
//         <div className="container-rb py-20 text-center">
//           <p>Loading resources...</p>
//         </div>
//       </SiteLayout>
//     );
//   }

//   // Show error state
//   if (blogCategoriesError) {
//     return (
//       <SiteLayout>
//         <div className="container-rb py-20 text-center">
//           <p className="text-red-500">Error loading categories: {blogCategoriesError}</p>
//         </div>
//       </SiteLayout>
//     );
//   }

//   // Show empty state
//   if (resourceItems.length === 0) {
//     return (
//       <SiteLayout>
//         <div className="container-rb py-20 text-center">
//           <h2 className="text-2xl font-semibold mb-4">No Resources Yet</h2>
//           <p className="text-foreground/60">Resources will appear here once blogs are added in the CMS.</p>
//         </div>
//       </SiteLayout>
//     );
//   }

//   return (
//     <SiteLayout>
//       <HubPage section={section} items={resourceItems} />
//     </SiteLayout>
//   );
// }

import { SiteLayout } from "@/components/site/SiteLayout";
import { HubPage } from "@/components/site/HubPage";
import { SECTIONS } from "@/lib/platform";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBlogCategories,
  fetchBlogCards,
} from "@/store/blogSlice";
import type { NodeItem } from "@/lib/platform";
import { FolderOpen } from "lucide-react";

export default function ResourcesHubIndex() {
  const section = SECTIONS.find(
    (s) => s.key === "resources-hub"
  )!;

  const dispatch = useAppDispatch();

  const {
    blogCategories,
    blogCategoriesLoading,
    blogCategoriesError,
    blogCards,
    blogCardsLoading,
  } = useAppSelector((state) => state.blog);

  const [resourceItems, setResourceItems] = useState<NodeItem[]>([]);

  useEffect(() => {
    dispatch(fetchBlogCategories());
    dispatch(fetchBlogCards());
  }, [dispatch]);

  useEffect(() => {
    if (
      blogCategories.length === 0 ||
      blogCards.length === 0
    ) {
      return;
    }

    const categorySlugsWithBlogs = new Set<string>();

    blogCards.forEach((blog) => {
      if (
        typeof blog.category === "object" &&
        blog.category?.slug
      ) {
        categorySlugsWithBlogs.add(blog.category.slug);
        return;
      }

      if (typeof blog.category === "string") {
        categorySlugsWithBlogs.add(blog.category);
        return;
      }

      if (blog.categoryName) {
        const slug = blog.categoryName
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        categorySlugsWithBlogs.add(slug);
      }
    });

    const categoriesWithBlogs = blogCategories.filter(
      (category) =>
        categorySlugsWithBlogs.has(category.slug)
    );

    const items: NodeItem[] = categoriesWithBlogs.map(
      (category, index) => ({
        slug: category.slug,
        title: category.name,
        tagline:
          category.description ||
          "Resources and insights.",
        icon: FolderOpen,
        accent:
          index % 2 === 0
            ? "berry"
            : "azure",
      })
    );

    setResourceItems(items);
  }, [blogCategories, blogCards]);

  if (blogCategoriesLoading || blogCardsLoading) {
    return (
      <SiteLayout>
        <div className="container-rb py-20 text-center">
          <p>Loading resources...</p>
        </div>
      </SiteLayout>
    );
  }

  if (blogCategoriesError) {
    return (
      <SiteLayout>
        <div className="container-rb py-20 text-center">
          <p className="text-red-500">
            Error loading categories:{" "}
            {blogCategoriesError}
          </p>
        </div>
      </SiteLayout>
    );
  }

  if (resourceItems.length === 0) {
    return (
      <SiteLayout>
        <div className="container-rb py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            No Resources Yet
          </h2>

          <p className="text-foreground/60">
            Resources will appear here once blogs are
            added in the CMS.
          </p>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <HubPage
        section={section}
        items={resourceItems}
      />
    </SiteLayout>
  );
}