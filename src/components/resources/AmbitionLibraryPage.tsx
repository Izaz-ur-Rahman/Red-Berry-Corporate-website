import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import type { NodeItem, Section } from "@/lib/platform";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogCards } from "@/store/blogSlice";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCardSkeletonGrid } from "@/components/blog/BlogCardSkeleton";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BlogErrorState } from "@/components/blog/BlogErrorState";

export function AmbitionLibraryPage({
  section,
  item,
  category,
}: {
  section: Section;
  item: NodeItem;
  category?: string;
}) {
  const dispatch = useAppDispatch();
  const { blogCards, blogCardsLoading, blogCardsError } = useAppSelector((state) => state.blog);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log('=== PAGE LOADED ===');
    console.log('Current page category:', category);
    console.log('Fetching blogs with categorySlug filter');
    
    // Use server-side filtering with categorySlug parameter
    // Special case: Ambition Library gets all blogs (no categorySlug parameter)
    const categoryParam = category === 'ambition-library' ? undefined : category;
    dispatch(fetchBlogCards(categoryParam));
  }, [dispatch, category]);

  // Helper function to get category slug from category object or string
  const getCategorySlug = (blog: typeof blogCards[0]): string => {
    // First, try to get from category field
    if (blog.category) {
      if (typeof blog.category === 'string') {
        return blog.category;
      }
      if (typeof blog.category === 'object' && blog.category.slug) {
        return blog.category.slug;
      }
    }
    
    // Fallback: try categoryName and normalize it
    if (blog.categoryName) {
      // Convert "Investor Resources" to "investor-resources"
      return blog.categoryName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    
    return '';
  };

  // Server-side filtering is working, so we don't need client-side filtering
  // Just use the blogs returned from the API directly
  const categoryFilteredBlogs = blogCards;

  // Then filter by search query
  const filtered = categoryFilteredBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.trim().toLowerCase()) ||
    blog.shortDescription.toLowerCase().includes(query.trim().toLowerCase())
  );

  // DEBUG: Log final filtered results (AFTER filtered is defined)
  console.log(`=== FILTERED RESULTS for "${category}" ===`);
  console.log(`Total blogs fetched: ${blogCards.length}`);
  console.log(`After category filter: ${categoryFilteredBlogs.length}`);
  console.log(`After search filter: ${filtered.length}`);
  console.log('Filtered blogs:', categoryFilteredBlogs.map(b => ({
    title: b.title,
    category: b.category,
    categoryName: b.categoryName,
    slug: getCategorySlug(b)
  })));
  console.log('=== END FILTERED RESULTS ===');

  const handleRetry = () => {
    // Use server-side filtering with categorySlug parameter
    const categoryParam = category === 'ambition-library' ? undefined : category;
    dispatch(fetchBlogCards(categoryParam));
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 relative">
          <nav className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to={section.to as never} className="hover:text-foreground">{section.label}</Link>
            <span>/</span>
            <span className="text-foreground/80">{item.title}</span>
          </nav>

          <div className="mt-8 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
              {section.label}
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient">
              {item.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              {item.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="container-rb pb-24">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-4 sm:px-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-background/60 border border-border/60 focus:border-primary/60 focus:outline-none transition-colors text-sm md:text-base"
            />
          </div>
        </div>

        {/* Content States */}
        {blogCardsLoading && <BlogCardSkeletonGrid />}

        {!blogCardsLoading && blogCardsError && (
          <BlogErrorState error={blogCardsError} onRetry={handleRetry} />
        )}

        {!blogCardsLoading && !blogCardsError && filtered.length === 0 && query && (
          <div className="text-center py-12 px-4">
            <p className="text-foreground/55">No articles found matching "{query}".</p>
          </div>
        )}

        {!blogCardsLoading && !blogCardsError && categoryFilteredBlogs.length === 0 && !query && (
          <BlogEmptyState />
        )}

        {!blogCardsLoading && !blogCardsError && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-4 sm:px-0">
            {filtered.map((blog, index) => (
              <BlogCard key={blog.slug} blog={blog} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
