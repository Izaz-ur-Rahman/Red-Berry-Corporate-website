/**
 * Blog Card Component
 * Displays a single blog card with image, title, description, author, etc.
 */

import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { BlogCard as BlogCardType } from '@/services/blogService';

interface BlogCardProps {
  blog: BlogCardType;
  index?: number;
}

// Helper function to get full image URL
const getFullImageUrl = (url: string, isAuthorImage: boolean = false): string => {
  if (!url) return '';
  // If already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const baseUrl = 'https://api.redberry.ae';
  
  // If it's an author image and doesn't have a path prefix, add /uploads/users/
  if (isAuthorImage) {
    // If it's just a filename (no slashes), prepend the user uploads path
    if (!url.includes('/')) {
      return `${baseUrl}/uploads/users/${url}`;
    }
    // If it has /uploads/blogs/, replace with /uploads/users/
    if (url.includes('/uploads/blogs/')) {
      const correctedUrl = url.replace('/uploads/blogs/', '/uploads/users/');
      return `${baseUrl}${correctedUrl.startsWith('/') ? correctedUrl : '/' + correctedUrl}`;
    }
  }
  
  // For blog images or images with existing paths
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
};

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const publishDate = new Date(blog.publishingDate);
  
  // Handle both nested author object and flat fields
  const authorImage = blog.author?.profileImage || blog.authorImage || '';
  const authorName = blog.author?.name || blog.authorName || 'Unknown Author';
  const authorDesignation = blog.author?.designation || blog.authorDesignation || '';

  // Debug: Log blog data including FAQ
  console.log('BlogCard - Rendering blog:', {
    title: blog.title,
    slug: blog.slug,
    hasFaqs: !!blog.faqs,
    faqCount: blog.faqs?.length || 0,
    faqs: blog.faqs,
    allData: blog
  });

  // Debug: Log author image URL construction
  if (authorImage) {
    const fullAuthorImageUrl = getFullImageUrl(authorImage, true);
    console.log('BlogCard - Author Image:', {
      original: authorImage,
      full: fullAuthorImageUrl,
      authorName
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full flex flex-col rounded-2xl glass border border-border/60 overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all my-4 sm:my-6"
    >
      {/* Cover Image */}
      <Link to={`/blog/${blog.slug}`} className="relative aspect-[16/9] sm:aspect-[16/9] overflow-hidden">
        <img
          src={getFullImageUrl(blog.coverImage)}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Blog+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-foreground/60 mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">{format(publishDate, 'MMM dd, yyyy')}</span>
            <span className="xs:hidden">{format(publishDate, 'MMM dd')}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {blog.readTime} min
          </span>
          {blog.faqs && blog.faqs.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
              <HelpCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{blog.faqs.length} FAQ{blog.faqs.length > 1 ? 's' : ''}</span>
              <span className="sm:hidden">{blog.faqs.length}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/blog/${blog.slug}`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display text-foreground leading-tight mb-3 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 flex-1">
          {blog.shortDescription}
        </p>

        {/* Author & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between pt-4 sm:pt-5 border-t border-border/40 mt-auto">
          {/* Author */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {authorImage ? (
              <img
                src={getFullImageUrl(authorImage, true)}
                alt={authorName}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-primary/30 shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/30 shrink-0 ${authorImage ? 'hidden' : ''}`}>
              <span className="text-xs sm:text-sm font-medium text-primary">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base font-medium text-foreground truncate">{authorName}</div>
              {authorDesignation && (
                <div className="text-xs sm:text-sm text-foreground/60 truncate">{authorDesignation}</div>
              )}
            </div>
          </div>

          {/* Read More Button */}
          <Link
            to={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-primary hover:gap-2.5 transition-all whitespace-nowrap self-end sm:self-auto"
          >
            Read More
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
