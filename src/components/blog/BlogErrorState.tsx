/**
 * Blog Error State Component
 * Displays when there's an error loading blogs
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function BlogErrorState({ error, onRetry }: BlogErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-xl font-display text-foreground mb-2">Unable to Load Blogs</h3>
      <p className="text-foreground/60 max-w-md mb-6">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
