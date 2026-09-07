/**
 * Blog Card Skeleton Loader
 * Displays loading placeholder for blog cards
 */

export function BlogCardSkeleton() {
  return (
    <div className="h-full flex flex-col rounded-2xl glass border border-border/60 overflow-hidden animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="aspect-[16/9] bg-foreground/10" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col p-6">
        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 w-24 bg-foreground/10 rounded" />
          <div className="h-4 w-20 bg-foreground/10 rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-foreground/10 rounded" />
          <div className="h-6 w-3/4 bg-foreground/10 rounded" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="h-4 bg-foreground/10 rounded" />
          <div className="h-4 bg-foreground/10 rounded" />
          <div className="h-4 w-2/3 bg-foreground/10 rounded" />
        </div>

        {/* Author Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-foreground/10" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-foreground/10 rounded" />
              <div className="h-3 w-20 bg-foreground/10 rounded" />
            </div>
          </div>
          <div className="h-4 w-20 bg-foreground/10 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of Blog Card Skeletons
 */
export function BlogCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
