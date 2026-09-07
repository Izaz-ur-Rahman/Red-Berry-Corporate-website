/**
 * Blog Detail Page
 * Displays full blog content with author info and related blogs
 */

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowLeft, Tag, FolderOpen, HelpCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogBySlug, clearSelectedBlog } from '@/store/blogSlice';
import { RelatedBlogCard } from '@/components/blog/RelatedBlogCard';
import { BlogDetailSkeleton } from '@/components/blog/BlogDetailSkeleton';
import { BlogErrorState } from '@/components/blog/BlogErrorState';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Helper function to get full image URL
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const baseUrl = 'https://api.redberry.ae';
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
};

// Helper function to get author image URL
const getAuthorImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const baseUrl = 'https://api.redberry.ae';
  if (!url.includes('/')) {
    return `${baseUrl}/uploads/users/${url}`;
  }
  if (url.includes('/uploads/blogs/')) {
    const correctedUrl = url.replace('/uploads/blogs/', '/uploads/users/');
    return `${baseUrl}${correctedUrl.startsWith('/') ? correctedUrl : '/' + correctedUrl}`;
  }
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
};

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedBlog, selectedBlogLoading, selectedBlogError } = useAppSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }

    return () => {
      dispatch(clearSelectedBlog());
    };
  }, [slug, dispatch]);

  const handleRetry = () => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }
  };

  const handleBack = () => {
    navigate('/resources-hub/ambition-library');
  };

  if (selectedBlogLoading) {
    return (
      <SiteLayout>
        <div className="min-h-screen" style={{ background: 'var(--gradient-base)' }}>
          <div className="container-rb py-16">
            <BlogDetailSkeleton />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (selectedBlogError) {
    return (
      <SiteLayout>
        <Helmet>
          <title>Blog Not Found - Red Berry Corporate Services</title>
        </Helmet>
        <div className="min-h-screen" style={{ background: 'var(--gradient-base)' }}>
          <div className="container-rb py-12 sm:py-16 px-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </button>
            
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Unable to Load Blog
                </h1>
                <p className="text-base sm:text-lg text-foreground/70 mb-2">
                  {selectedBlogError === 'Blog not found' 
                    ? 'The blog post you\'re looking for doesn\'t exist or has been removed.'
                    : 'There was an error loading this blog post. The server may be temporarily unavailable.'}
                </p>
                <p className="text-sm text-foreground/50 mb-8">
                  Error: {selectedBlogError}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-foreground/10 text-foreground rounded-lg font-medium hover:bg-foreground/20 transition-colors"
                >
                  Back to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!selectedBlog) {
    return null;
  }

  const publishDate = new Date(selectedBlog.publishingDate);
    const currentUrl = `https://redberry.ae/blog/${slug}`;
  const ogImage = selectedBlog.coverImage 
    ? getFullImageUrl(selectedBlog.coverImage) 
      : 'https://redberry.ae/navbar-logo.png';

  return (
    <SiteLayout>
      <Helmet>
        <title>{selectedBlog.metaTitle || selectedBlog.title}</title>
        <meta
          name="description"
          content={selectedBlog.metaDescription || selectedBlog.shortDescription}
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={selectedBlog.title} />
        <meta property="og:description" content={selectedBlog.metaDescription || selectedBlog.shortDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={selectedBlog.title} />
        <meta name="twitter:description" content={selectedBlog.metaDescription || selectedBlog.shortDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Article Meta */}
        <meta property="article:published_time" content={selectedBlog.publishingDate} />
        <meta property="article:author" content={selectedBlog.author.fullName} />
        {selectedBlog.category && (
          <meta 
            property="article:section" 
            content={typeof selectedBlog.category === 'string' 
              ? selectedBlog.category 
              : selectedBlog.category?.name || ''} 
          />
        )}
        {Array.isArray(selectedBlog.tags) && selectedBlog.tags.map((tag, index) => {
          const tagName = typeof tag === 'string' ? tag : tag?.name || tag?.slug || '';
          const tagKey = typeof tag === 'string' ? tag : tag?.id || tag?.slug || index;
          return tagName ? <meta key={tagKey} property="article:tag" content={tagName} /> : null;
        })}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="border-b border-border/40">
          <div className="container-rb py-3 sm:py-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </motion.button>
          </div>
        </div>

        {/* Article Content */}
        <article className="container-rb  py-6 sm:py-10 md:py-12 lg:py-16 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Category Badge - Above Title */}
          {selectedBlog.category && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-primary bg-primary/10">
                {typeof selectedBlog.category === 'string' 
                  ? selectedBlog.category 
                  : selectedBlog.category?.name || 'Uncategorized'}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6"
          >
            {selectedBlog.title}
          </motion.h1>

          {/* Author & Meta Info - Responsive Layout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 border-b border-border/40"
          >
            {/* Author Avatar */}
            {selectedBlog.author.profileImage ? (
              <img
                src={getAuthorImageUrl(selectedBlog.author.profileImage)}
                alt={selectedBlog.author.fullName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-primary/20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/10 flex items-center justify-center ring-2 ring-primary/20 ${selectedBlog.author.profileImage ? 'hidden' : ''}`}>
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/60" />
            </div>

            {/* Author Name */}
            <div className="flex-1 sm:mr-4 min-w-0">
              <div className="text-sm sm:text-base font-medium text-foreground truncate">
                {selectedBlog.author.fullName}
              </div>
              <div className="text-xs sm:text-sm text-foreground/50">
                Author
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden xs:inline">{format(publishDate, 'MMM dd, yyyy')}</span>
                <span className="xs:hidden">{format(publishDate, 'MMM dd')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {selectedBlog.readTime}
              </span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 sm:mb-8 md:mb-10 -mx-4 sm:mx-0"
          >
            <div className="relative w-full aspect-[16/9] sm:rounded-xl md:rounded-2xl overflow-hidden shadow-[var(--shadow-lift)]">
              <img
                src={getFullImageUrl(selectedBlog.coverImage)}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x675?text=Blog+Cover';
                }}
              />
            </div>
          </motion.div>

          {/* Tags */}
          {Array.isArray(selectedBlog.tags) && selectedBlog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8"
            >
              {selectedBlog.tags.map((tag, index) => {
                const tagName = typeof tag === 'string' ? tag : tag?.name || tag?.slug || '';
                const tagKey = typeof tag === 'string' ? tag : tag?.id || tag?.slug || index;
                
                return (
                  <span
                    key={tagKey}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-foreground/5 text-foreground/70 text-xs sm:text-sm border border-border/40"
                  >
                    <Tag className="h-3 w-3" />
                    {tagName}
                  </span>
                );
              })}
            </motion.div>
          )}

          {/* Meta Description */}
          {selectedBlog.metaDescription && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10 sm:mb-12 md:mb-14 lg:mb-16"
            >
              <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-foreground/5 border border-border/40">
                <p 
                  className="text-sm sm:text-base text-foreground/80 leading-relaxed"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    hyphens: 'auto'
                  }}
                >
                  {selectedBlog.metaDescription}
                </p>
              </div>
            </motion.div>
          )}

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
              <style>
                {`
                  .blog-content h1 {
                    margin-top: 3rem !important;
                    margin-bottom: 2.5rem !important;
                  }
                  .blog-content h2 {
                    margin-top: 2.5rem !important;
                    margin-bottom: 2rem !important;
                  }
                  .blog-content h3 {
                    margin-top: 2rem !important;
                    margin-bottom: 1.5rem !important;
                  }
                  .blog-content h4 {
                    margin-top: 1.75rem !important;
                    margin-bottom: 1.25rem !important;
                  }
                  .blog-content h5 {
                    margin-top: 1.5rem !important;
                    margin-bottom: 1rem !important;
                  }
                  .blog-content p {
                    margin-bottom: 0.5rem !important;
                  }
                  .blog-content ul,
                  .blog-content ol {
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                  }
                  .blog-content li {
                    margin-top: 0.15rem !important;
                    margin-bottom: 0.15rem !important;
                  }
                  
                  @media (min-width: 640px) {
                    .blog-content h1 {
                      margin-top: 3.5rem !important;
                      margin-bottom: 3rem !important;
                    }
                    .blog-content h2 {
                      margin-top: 3rem !important;
                      margin-bottom: 2.5rem !important;
                    }
                    .blog-content h3 {
                      margin-top: 2.5rem !important;
                      margin-bottom: 2rem !important;
                    }
                    .blog-content h4 {
                      margin-top: 2rem !important;
                      margin-bottom: 1.75rem !important;
                    }
                    .blog-content h5 {
                      margin-top: 1.75rem !important;
                      margin-bottom: 1.5rem !important;
                    }
                    .blog-content p {
                      margin-bottom: 0.65rem !important;
                    }
                    .blog-content ul,
                    .blog-content ol {
                      margin-top: 0.65rem !important;
                      margin-bottom: 0.65rem !important;
                    }
                    .blog-content li {
                      margin-top: 0.15rem !important;
                      margin-bottom: 0.15rem !important;
                    }
                  }
                `}
              </style>
              <div
                className="blog-content prose prose-sm sm:prose-base lg:prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-foreground prose-headings:tracking-tight
                  prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl
                  prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl
                  prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl
                  prose-h4:text-base sm:prose-h4:text-lg lg:prose-h4:text-xl
                  prose-p:text-foreground/80 prose-p:leading-[1.7] sm:prose-p:leading-[1.8]
                  prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/90
                  prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 sm:prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:text-foreground/70 prose-blockquote:italic prose-blockquote:bg-foreground/5 prose-blockquote:rounded-r-lg prose-blockquote:!my-6
                  prose-code:text-primary prose-code:bg-foreground/5 prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-border/60 prose-pre:rounded-lg sm:prose-pre:rounded-xl prose-pre:p-4 sm:prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm prose-pre:!my-6
                  prose-img:rounded-lg sm:prose-img:rounded-xl lg:prose-img:rounded-2xl prose-img:shadow-lg prose-img:!my-8 sm:prose-img:!my-10
                  prose-hr:border-border/60 prose-hr:!my-10 sm:prose-hr:!my-14
                  prose-ul:list-disc prose-ul:pl-5 sm:prose-ul:pl-6 prose-ul:text-foreground/80
                  prose-ol:list-decimal prose-ol:pl-5 sm:prose-ol:pl-6 prose-ol:text-foreground/80
                  prose-li:leading-relaxed prose-li:marker:text-primary
                  prose-table:border-collapse prose-table:w-full prose-table:!my-8 sm:prose-table:!my-10 prose-table:text-sm sm:prose-table:text-base
                  prose-th:border prose-th:border-border/60 prose-th:bg-foreground/5 prose-th:p-2 sm:prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:border prose-td:border-border/60 prose-td:p-2 sm:prose-td:p-3"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere'
                }}
                dangerouslySetInnerHTML={{ __html: selectedBlog.blogDetails }}
              />
          </motion.div>

          {/* FAQs Section */}
          {selectedBlog.faqs && selectedBlog.faqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-10 sm:mb-12 md:mb-16"
            >
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                  <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-foreground/60">
                  Find answers to common questions about this topic
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {selectedBlog.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={faq.id || index} 
                    value={`faq-${faq.id || index}`}
                    className="rounded-lg sm:rounded-xl glass border border-border/60 px-4 sm:px-6 py-2 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-base sm:text-lg font-display font-semibold text-foreground pr-3 sm:pr-4 leading-snug">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-foreground/80 leading-relaxed pt-2 pb-3 sm:pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </article>

        {/* Related Blogs */}
        {Array.isArray(selectedBlog.relatedBlogs) && selectedBlog.relatedBlogs.length > 0 && (
          <section className="border-t border-border/40 bg-foreground/[0.02]">
            <div className="container-rb py-10 sm:py-12 md:py-16 max-w-6xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="mb-8 sm:mb-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-2 sm:mb-3">
                    Related Articles
                  </h2>
                  <p className="text-sm sm:text-base text-foreground/60">
                    Continue exploring our insights and expertise
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {selectedBlog.relatedBlogs.map((relatedBlog, index) => (
                    <RelatedBlogCard key={relatedBlog.slug} blog={relatedBlog} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
