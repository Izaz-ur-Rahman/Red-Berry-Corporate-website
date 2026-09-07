/**
 * Blog Detail Skeleton Loader
 * Displays loading placeholder for blog detail page
 */

export function BlogDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="aspect-[21/9] bg-foreground/10 rounded-2xl  mb-8" />

      {/* Title & Meta Skeleton */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="h-10 bg-foreground/10 rounded mb-4" />
        <div className="h-10 w-3/4 bg-foreground/10 rounded mb-6" />
        <div className="flex gap-4">
          <div className="h-4 w-32 bg-foreground/10 rounded" />
          <div className="h-4 w-24 bg-foreground/10 rounded" />
          <div className="h-4 w-28 bg-foreground/10 rounded" />
        </div>
      </div>

      {/* Author Skeleton */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="p-6 rounded-2xl glass border border-border/60">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-full bg-foreground/10" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-40 bg-foreground/10 rounded" />
              <div className="h-4 w-32 bg-foreground/10 rounded" />
              <div className="h-4 bg-foreground/10 rounded" />
              <div className="h-4 w-5/6 bg-foreground/10 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto space-y-4 mb-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-foreground/10 rounded" />
        ))}
        <div className="h-4 w-4/5 bg-foreground/10 rounded" />
      </div>

      {/* Related Blogs Skeleton */}
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-48 bg-foreground/10 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl glass border border-border/60 overflow-hidden">
              <div className="aspect-[16/9] bg-foreground/10" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-32 bg-foreground/10 rounded" />
                <div className="h-4 bg-foreground/10 rounded" />
                <div className="h-4 w-3/4 bg-foreground/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
