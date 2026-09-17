/**
 * Blog Detail Page
 * Displays full blog content with author info and related blogs
 */

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowLeft, Tag, FolderOpen, HelpCircle, User, Mail, Phone, MessageCircle, Linkedin, Facebook, Twitter } from 'lucide-react';
import { format } from 'date-fns';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogBySlug, clearSelectedBlog } from '@/store/blogSlice';
import { RelatedBlogCard } from '@/components/blog/RelatedBlogCard';
import { BlogDetailSkeleton } from '@/components/blog/BlogDetailSkeleton';
import { BlogErrorState } from '@/components/blog/BlogErrorState';
import { API_BASE_URL } from '@/services/blogService';

// Base URL for uploaded images (covers, author photos, etc). Images are
// served from the API's static file root, not under "/api", so the
// trailing "/api" from API_BASE_URL is stripped here. Deriving this from
// API_BASE_URL (which already respects VITE_API_URL) instead of a
// hardcoded production domain means images resolve correctly whichever
// API this site is actually pointed at — local or production — instead
// of always asking production even when a file was only ever uploaded
// to a local dev API.
const IMAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');
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
  return `${IMAGE_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
};

// Helper function to get author image URL
const getAuthorImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (!url.includes('/')) {
    return `${IMAGE_BASE_URL}/uploads/users/${url}`;
  }
  if (url.includes('/uploads/blogs/')) {
    const correctedUrl = url.replace('/uploads/blogs/', '/uploads/users/');
    return `${IMAGE_BASE_URL}${correctedUrl.startsWith('/') ? correctedUrl : '/' + correctedUrl}`;
  }
  return `${IMAGE_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
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
                  /*
                   * Blog content typography — this is a literal port of the
                   * CMS editor's ".prose-post" rules (redberry-coprate-cms
                   * src/styles.css). The old approach here used Tailwind's
                   * "prose" typography plugin with its own guessed rem-based
                   * scale (prose-sm/base/lg + prose-h1:text-2xl, etc.), which
                   * has nothing to do with what the editor actually renders —
                   * that's why headings (and everything else) kept coming out
                   * a different size than what was typed. Tailwind's "prose"
                   * classes are intentionally NOT used below anymore, so any
                   * heading level, list, quote, code block, etc. typed in the
                   * editor will always render at this exact same size here,
                   * for any future post, without needing another one-off fix.
                   * If the editor's .prose-post rules ever change, mirror the
                   * change here too so the two stay identical.
                   */
                  .blog-content {
                    font-size: 17px;
                    line-height: 1.75;
                    color: var(--color-foreground);
                    word-break: break-word;
                    overflow-wrap: break-word;
                  }
                  .blog-content > * + * { margin-top: 0.85em; }

                  .blog-content h1,
                  .blog-content h2,
                  .blog-content h3,
                  .blog-content h4 {
                    font-family: "Instrument Serif", ui-serif, Georgia, serif;
                    font-weight: 400;
                    color: var(--color-foreground);
                    text-wrap: balance;
                    word-break: break-word;
                    overflow-wrap: break-word;
                  }
                  .blog-content h1 {
                    font-size: 2.1em;
                    line-height: 1.15;
                    letter-spacing: -0.012em;
                    margin-top: 1.2em;
                    margin-bottom: 0.3em;
                  }
                  .blog-content h2 {
                    font-size: 1.7em;
                    line-height: 1.2;
                    letter-spacing: -0.012em;
                    margin-top: 1.2em;
                    margin-bottom: 0.3em;
                  }
                  .blog-content h3 {
                    font-size: 1.3em;
                    line-height: 1.25;
                    margin-top: 1em;
                    margin-bottom: 0.25em;
                  }
                  .blog-content h4 {
                    font-size: 1.1em;
                    line-height: 1.3;
                    margin-top: 0.9em;
                    margin-bottom: 0.2em;
                    color: var(--color-muted-foreground);
                  }
                  .blog-content h2 + p,
                  .blog-content h3 + p,
                  .blog-content h4 + p { margin-top: 0.2em; }

                  .blog-content p {
                    margin: 0.55em 0;
                    color: var(--color-foreground);
                    opacity: 0.85;
                    text-wrap: pretty;
                    hyphens: auto;
                    word-break: break-word;
                    overflow-wrap: break-word;
                  }
                  .blog-content ul,
                  .blog-content ol { padding-left: 1.5em; margin: 0.6em 0; }
                  .blog-content ul { list-style: disc; }
                  .blog-content ol { list-style: decimal; }
                  .blog-content li { margin: 0.2em 0; color: var(--color-foreground); opacity: 0.85; }
                  .blog-content li > p { margin: 0; }

                  .blog-content blockquote {
                    border-left: 3px solid var(--color-primary);
                    padding: 0.25em 0 0.25em 1.1em;
                    font-family: "Instrument Serif", ui-serif, Georgia, serif;
                    font-style: italic;
                    font-size: 1.2em;
                    line-height: 1.45;
                    color: var(--color-muted-foreground);
                    margin: 1.1em 0;
                  }
                  .blog-content hr {
                    border: none;
                    height: 1px;
                    background: var(--color-border);
                    margin: 1.6em auto;
                    width: 40%;
                  }
                  .blog-content code {
                    background: var(--color-muted);
                    color: var(--color-primary);
                    padding: 0.15em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                  }
                  .blog-content pre {
                    background: var(--color-muted);
                    color: var(--color-foreground);
                    border: 1px solid var(--color-border);
                    padding: 0.9em 1.1em;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 1em 0;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                    font-size: 0.9em;
                    line-height: 1.55;
                    white-space: pre-wrap;
                    tab-size: 2;
                  }
                  .blog-content pre code {
                    background: transparent;
                    padding: 0;
                    color: inherit;
                    font-family: inherit;
                    font-size: inherit;
                    white-space: inherit;
                  }
                  .blog-content a {
                    color: var(--color-primary);
                    text-decoration: underline;
                    text-underline-offset: 3px;
                  }
                  .blog-content img {
                    border-radius: 10px;
                    margin: 1em 0;
                    max-width: 100%;
                    height: auto;
                  }
                  .blog-content strong { color: var(--color-foreground); font-weight: 600; }
                  .blog-content table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 1.6em 0;
                    font-size: 0.95em;
                  }
                  .blog-content th,
                  .blog-content td {
                    border: 1px solid var(--color-border);
                    padding: 0.5em 0.75em;
                    text-align: left;
                  }
                  .blog-content th { background: var(--color-muted); font-weight: 600; }
                `}
              </style>
              <div
                className="blog-content max-w-none"
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

          {/* About the Author */}
          {selectedBlog.author?.fullName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mb-6 sm:mb-8 md:mb-10"
            >
              <div className="rounded-xl sm:rounded-2xl border border-border/40 bg-foreground/[0.02] p-5 sm:p-6 md:p-8">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-foreground/50 mb-4 sm:mb-5">
                  About the Author
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {selectedBlog.author.profileImage ? (
                      <img
                        src={getAuthorImageUrl(selectedBlog.author.profileImage)}
                        alt={selectedBlog.author.fullName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-primary/20"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-foreground/10 flex items-center justify-center ring-2 ring-primary/20 ${selectedBlog.author.profileImage ? 'hidden' : ''}`}>
                      <User className="h-7 w-7 sm:h-8 sm:w-8 text-foreground/60" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      {selectedBlog.author.fullName}
                    </h3>
                    {selectedBlog.author.designation && (
                      <p className="text-sm text-primary mb-2 sm:mb-3">
                        {selectedBlog.author.designation}
                      </p>
                    )}
                    {selectedBlog.author.biography && (
                      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-3 sm:mb-4">
                        {selectedBlog.author.biography}
                      </p>
                    )}

                    {/* Contact */}
                    {(selectedBlog.author.email || selectedBlog.author.phone || selectedBlog.author.whatsApp) && (
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60 mb-3">
                        {selectedBlog.author.email && (
                          <a
                            href={`mailto:${selectedBlog.author.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                          >
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            {selectedBlog.author.email}
                          </a>
                        )}
                        {selectedBlog.author.phone && (
                          <a
                            href={`tel:${selectedBlog.author.phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            {selectedBlog.author.phone}
                          </a>
                        )}
                        {selectedBlog.author.whatsApp && (
                          <a
                            href={`https://wa.me/${selectedBlog.author.whatsApp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                          >
                            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            {selectedBlog.author.whatsApp}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Social Links */}
                    {(selectedBlog.author.linkedIn || selectedBlog.author.facebook || selectedBlog.author.twitter) && (
                      <div className="flex items-center gap-3">
                        {selectedBlog.author.linkedIn && (
                          <a
                            href={selectedBlog.author.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-foreground/50 hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                        )}
                        {selectedBlog.author.facebook && (
                          <a
                            href={selectedBlog.author.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="text-foreground/50 hover:text-primary transition-colors"
                          >
                            <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                        )}
                        {selectedBlog.author.twitter && (
                          <a
                            href={selectedBlog.author.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-foreground/50 hover:text-primary transition-colors"
                          >
                            <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
