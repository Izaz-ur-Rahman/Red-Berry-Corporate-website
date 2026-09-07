// /**
//  * SEO Head Component
//  * Provides dynamic Open Graph and Twitter Card meta tags for all pages
//  */

// import { Helmet } from 'react-helmet-async';

// interface SEOHeadProps {
//   title?: string;
//   description?: string;
//   image?: string;
//   url?: string;
//   type?: 'website' | 'article';
//   article?: {
//     publishedTime?: string;
//     author?: string;
//     section?: string;
//     tags?: string[];
//   };
// }

// export function SEOHead({
//   title = 'Red Berry | Ambition Infrastructure for the UAE & GCC',
//   description = 'Red Berry builds the corporate, financial, sovereign and legacy infrastructure ambitious founders, investors and families need to build in the UAE.',
//   image,
//   url,
//   type = 'website',
//   article,
// }: SEOHeadProps) {
//   // Default image fallback
//     const ogImage = image || 'https://redberry.ae/og-image.jpg';
  
//   // Get current URL if not provided
//     const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://redberry.ae/');

//   return (
//     <Helmet>
//       {/* Basic Meta Tags */}
//       <title>{title}</title>
//       <meta name="description" content={description} />
      
//       {/* Open Graph / Facebook */}
//       <meta property="og:type" content={type} />
//       <meta property="og:url" content={currentUrl} />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={ogImage} />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />
//       <meta property="og:image:alt" content={title} />
//       <meta property="og:site_name" content="Red Berry Corporate Services" />
      
//       {/* Twitter Card */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:url" content={currentUrl} />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={ogImage} />
//       <meta name="twitter:image:alt" content={title} />
      
//       {/* Article-specific meta (for blog posts) */}
//       {type === 'article' && article && (
//         <>
//           {article.publishedTime && (
//             <meta property="article:published_time" content={article.publishedTime} />
//           )}
//           {article.author && (
//             <meta property="article:author" content={article.author} />
//           )}
//           {article.section && (
//             <meta property="article:section" content={article.section} />
//           )}
//           {article.tags && article.tags.map((tag) => (
//             <meta key={tag} property="article:tag" content={tag} />
//           ))}
//         </>
//       )}
//     </Helmet>
//   );
// }

/**
 * SEO Head Component
 * Provides dynamic SEO, Open Graph, Twitter Card,
 * and canonical meta tags for all pages.
 */

/**
 * SEO Head Component
 * Provides dynamic SEO, Open Graph, Twitter Card,
 * and canonical meta tags for all pages.
 */

import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SITE_URL = 'https://redberry.ae';

export function SEOHead({
  title = 'Red Berry | Ambition Infrastructure for the UAE & GCC',
  description = 'Red Berry builds the corporate, financial, sovereign and legacy infrastructure ambitious founders, investors and families need to build in the UAE.',
  image = '/og-image.jpg',
  url,
  type = 'website',
  article,
}: SEOHeadProps) {
  const currentUrl =
    url ||
    (typeof window !== 'undefined'
      ? `${SITE_URL}${window.location.pathname}`
      : SITE_URL);

  const ogImage = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Red Berry" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Article-specific meta */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}

          {article.author && (
            <meta
              property="article:author"
              content={article.author}
            />
          )}

          {article.section && (
            <meta
              property="article:section"
              content={article.section}
            />
          )}

          {article.tags?.map((tag) => (
            <meta
              key={tag}
              property="article:tag"
              content={tag}
            />
          ))}
        </>
      )}
    </Helmet>
  );
}