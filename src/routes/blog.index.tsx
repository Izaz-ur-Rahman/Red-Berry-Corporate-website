/**
 * Blog Listing Page
 * Displays all published blog cards
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogCards } from '@/store/blogSlice';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogCardSkeletonGrid } from '@/components/blog/BlogCardSkeleton';
import { BlogEmptyState } from '@/components/blog/BlogEmptyState';
import { BlogErrorState } from '@/components/blog/BlogErrorState';

export default function BlogListingPage() {
  const dispatch = useAppDispatch();
  const { blogCards, blogCardsLoading, blogCardsError } = useAppSelector((state) => state.blog);

  useEffect(() => {
    console.log('Blog Listing Page - Fetching blogs...');
    dispatch(fetchBlogCards());
  }, [dispatch]);

  useEffect(() => {
    console.log('Blog Cards State:', { blogCards, blogCardsLoading, blogCardsError });
  }, [blogCards, blogCardsLoading, blogCardsError]);

  const handleRetry = () => {
    console.log('Retrying blog fetch...');
    dispatch(fetchBlogCards());
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Blog - Red Berry Corporate Services</title>
        <meta
          name="description"
          content="Explore insights, guides, and updates on UAE business setup, corporate infrastructure, and ambition architecture."
        />
      </Helmet>

      <div className="min-h-screen" style={{ background: 'var(--gradient-base)' }}>
        <div className="container-rb py-16 md:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-[0.18em] uppercase text-foreground/70 mb-4">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--berry)' }} />
              Insights & Updates
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-gradient leading-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Explore insights on UAE business infrastructure, ambition architecture, and strategic growth.
            </p>
          </motion.div>

          {/* Content */}
          {blogCardsLoading && <BlogCardSkeletonGrid />}

          {!blogCardsLoading && blogCardsError && (
            <BlogErrorState error={blogCardsError} onRetry={handleRetry} />
          )}

          {!blogCardsLoading && !blogCardsError && blogCards.length === 0 && <BlogEmptyState />}

          {!blogCardsLoading && !blogCardsError && blogCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogCards.map((blog, index) => (
                <BlogCard key={blog.slug} blog={blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
