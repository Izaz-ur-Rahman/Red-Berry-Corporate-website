/**
 * Author Card Component
 * Displays author information with social links
 */

import { Mail, Phone, MessageCircle, Linkedin, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogAuthor } from '@/services/blogService';

interface AuthorCardProps {
  author: BlogAuthor;
}

// Helper function to get full image URL for author images
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  // If already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const baseUrl = 'https://api.redberry.ae';
  
  // If it's just a filename (no slashes), prepend the user uploads path
  if (!url.includes('/')) {
    return `${baseUrl}/uploads/users/${url}`;
  }
  
  // If it has /uploads/blogs/, replace with /uploads/users/
  if (url.includes('/uploads/blogs/')) {
    const correctedUrl = url.replace('/uploads/blogs/', '/uploads/users/');
    return `${baseUrl}${correctedUrl.startsWith('/') ? correctedUrl : '/' + correctedUrl}`;
  }
  
  // For images with existing paths
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
};

export function AuthorCard({ author }: AuthorCardProps) {
  const imageUrl = getFullImageUrl(author.profileImage);
  console.log('AuthorCard - Original profileImage:', author.profileImage);
  console.log('AuthorCard - Final imageUrl:', imageUrl);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 rounded-2xl glass border border-border/60 shadow-[var(--shadow-soft)]"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={author.fullName}
            className="w-24 h-24 rounded-full object-cover shadow-lg"
            onError={(e) => {
              console.error('AuthorCard - Image failed to load:', imageUrl);
              e.currentTarget.src = 'https://via.placeholder.com/100?text=Author';
            }}
          />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="text-xl font-display text-foreground mb-1">{author.fullName}</h3>
            <p className="text-sm text-foreground/60">{author.designation}</p>
          </div>

          {/* Biography */}
          <p className="text-foreground/75 leading-relaxed mb-4">{author.biography}</p>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-3">
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="Email"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
            {author.phone && (
              <a
                href={`tel:${author.phone}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="Phone"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Phone</span>
              </a>
            )}
            {author.whatsApp && (
              <a
                href={`https://wa.me/${author.whatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
            {author.linkedIn && (
              <a
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            {author.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors text-sm"
                title="Twitter"
              >
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
