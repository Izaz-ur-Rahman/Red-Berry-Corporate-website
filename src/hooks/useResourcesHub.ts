// import { useEffect, useState } from "react";
// import { FolderOpen, Library } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchBlogCategories } from "@/store/blogSlice";

// export interface ResourceHubItem {
//   slug: string;
//   title: string;
//   tagline: string;
//   icon: typeof FolderOpen;
//   accent: "berry" | "azure";
// }

// export function useResourcesHub() {
//   const dispatch = useAppDispatch();

//   const {
//     blogCategories,
//     blogCategoriesLoading,
//     blogCategoriesError,
//   } = useAppSelector((state) => state.blog);

//   const [items, setItems] = useState<ResourceHubItem[]>([]);
//   const [checkingBlogs, setCheckingBlogs] = useState(false);

//   useEffect(() => {
//     if (blogCategories.length === 0) {
//       dispatch(fetchBlogCategories());
//     }
//   }, [dispatch, blogCategories.length]);

//   useEffect(() => {
//     if (blogCategories.length === 0) {
//       return;
//     }

//     const checkCategoriesWithBlogs = async () => {
//       setCheckingBlogs(true);

//       try {
//         const apiUrl =
//           import.meta.env.VITE_API_URL ||
//           "https://api.redberry.ae/api";

//         const categoriesWithBlogs: typeof blogCategories = [];

//         for (const category of blogCategories) {
//           try {
//             const response = await fetch(
//               `${apiUrl}/Blog/Cards?categorySlug=${encodeURIComponent(
//                 category.slug
//               )}`
//             );

//             if (!response.ok) {
//               continue;
//             }

//             const data = await response.json();

//             const blogCount = data.data?.length || 0;

//             if (blogCount > 0) {
//               categoriesWithBlogs.push(category);
//             }
//           } catch (error) {
//             console.error(
//               `Error checking category ${category.slug}:`,
//               error
//             );
//           }
//         }

//         const dynamicItems: ResourceHubItem[] =
//           categoriesWithBlogs.map((category, index) => ({
//             slug: category.slug,
//             title: category.name,
//             tagline:
//               category.description ||
//               "Resources and insights.",
//             icon: FolderOpen,
//             accent:
//               index % 2 === 0 ? "berry" : "azure",
//           }));

//         const finalItems: ResourceHubItem[] = [
//           {
//             slug: "ambition-library",
//             title: "The Ambition Library",
//             tagline:
//               "All resources and insights from every category.",
//             icon: Library,
//             accent: "berry",
//           },
//           ...dynamicItems,
//         ];

//         setItems(finalItems);
//       } catch (error) {
//         console.error(
//           "Failed to load Resources Hub categories:",
//           error
//         );

//         setItems([]);
//       } finally {
//         setCheckingBlogs(false);
//       }
//     };

//     checkCategoriesWithBlogs();
//   }, [blogCategories]);

//   return {
//     items,
//     loading: blogCategoriesLoading || checkingBlogs,
//     error: blogCategoriesError,
//   };
// }

import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogCategories } from "@/store/blogSlice";

export interface ResourceHubItem {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof FolderOpen;
  accent: "berry" | "azure";
}

export function useResourcesHub() {
  const dispatch = useAppDispatch();

  const {
    blogCategories,
    blogCategoriesLoading,
    blogCategoriesError,
  } = useAppSelector((state) => state.blog);

  const [items, setItems] = useState<ResourceHubItem[]>([]);
  const [checkingBlogs, setCheckingBlogs] = useState(false);

  useEffect(() => {
    if (blogCategories.length === 0) {
      dispatch(fetchBlogCategories());
    }
  }, [dispatch, blogCategories.length]);

  useEffect(() => {
    if (blogCategories.length === 0) {
      return;
    }

    const checkCategoriesWithBlogs = async () => {
      setCheckingBlogs(true);

      try {
        const apiUrl =
          import.meta.env.VITE_API_URL ||
          "https://api.redberry.ae/api";

        const categoriesWithBlogs: typeof blogCategories = [];

        for (const category of blogCategories) {
          try {
            const response = await fetch(
              `${apiUrl}/Blog/Cards?categorySlug=${encodeURIComponent(
                category.slug
              )}`
            );

            if (!response.ok) {
              continue;
            }

            const data = await response.json();

            const blogCount = data.data?.length || 0;

            if (blogCount > 0) {
              categoriesWithBlogs.push(category);
            }
          } catch (error) {
            console.error(
              `Error checking category ${category.slug}:`,
              error
            );
          }
        }

        const dynamicItems: ResourceHubItem[] =
          categoriesWithBlogs.map((category, index) => ({
            slug: category.slug,
            title: category.name,
            tagline:
              category.description ||
              "Resources and insights.",
            icon: FolderOpen,
            accent:
              index % 2 === 0 ? "berry" : "azure",
          }));

        // Resources Hub is now completely CMS-driven.
        setItems(dynamicItems);
      } catch (error) {
        console.error(
          "Failed to load Resources Hub categories:",
          error
        );

        setItems([]);
      } finally {
        setCheckingBlogs(false);
      }
    };

    checkCategoriesWithBlogs();
  }, [blogCategories]);

  return {
    items,
    loading: blogCategoriesLoading || checkingBlogs,
    error: blogCategoriesError,
  };
}