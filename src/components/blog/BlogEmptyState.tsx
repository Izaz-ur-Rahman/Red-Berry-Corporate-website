/**
 * Blog Empty State Component
 * Displays when no blog posts are available
 */

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlogEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
        <FileText className="h-10 w-10 text-foreground/40" />
      </div>
      <h3 className="text-xl font-display text-foreground mb-2">No Blog Posts Yet</h3>
      <p className="text-foreground/60 max-w-md">
        We're working on creating valuable content for you. Check back soon for insights and updates.
      </p>
    </motion.div>
  );
}
