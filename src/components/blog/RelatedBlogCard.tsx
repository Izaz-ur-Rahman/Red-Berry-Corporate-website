/**
 * Related Blog Card Component
 * Premium card for displaying related blogs
 */

import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { RelatedBlog } from '@/services/blogService';

interface RelatedBlogCardProps {
  blog: RelatedBlog;
  index?: number;
}

// Helper function to get full image URL
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const baseUrl = 'https://api.redberry.ae';
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
};

export function RelatedBlogCard({ blog, index = 0 }: RelatedBlogCardProps) {
  const publishDate = new Date(blog.publishingDate);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link
        to={`/blog/${blog.slug}`}
        className="flex flex-col h-full rounded-2xl glass border border-border/60 overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-foreground/5">
          <img
            src={getFullImageUrl(blog.coverImage)}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Blog+Image';
            }}
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5">
          {/* Title */}
          <h3 className="text-lg font-display text-foreground leading-snug group-hover:text-primary transition-colors mb-4 line-clamp-3 flex-1">
            {blog.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-foreground/50 pt-3 border-t border-border/40">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {format(publishDate, 'MMM dd, yyyy')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {blog.readTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
