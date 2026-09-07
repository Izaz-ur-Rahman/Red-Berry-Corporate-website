# Blog Module Documentation

## Overview
Complete, production-ready blog module for Red Berry Corporate Services website with full API integration, Redux state management, responsive design, SEO optimization, and comprehensive error handling.

## Architecture

### Technology Stack
- **State Management**: Redux Toolkit
- **API Layer**: Custom service with TypeScript types
- **Routing**: React Router v7
- **SEO**: React Helmet Async
- **UI**: Framer Motion animations, Tailwind CSS
- **Date Handling**: date-fns

### Project Structure
```
src/
├── services/
│   └── blogService.ts           # API service layer
├── store/
│   ├── index.ts                 # Redux store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── blogSlice.ts             # Blog Redux slice
├── components/
│   └── blog/
│       ├── BlogCard.tsx         # Blog card component
│       ├── BlogCardSkeleton.tsx # Loading skeleton
│       ├── BlogEmptyState.tsx   # Empty state
│       ├── BlogErrorState.tsx   # Error state
│       ├── AuthorCard.tsx       # Author information card
│       ├── RelatedBlogCard.tsx  # Related blog card
│       └── BlogDetailSkeleton.tsx # Blog detail loader
└── routes/
    ├── blog.index.tsx           # Blog listing page
    └── blog.$slug.tsx           # Blog detail page
```

## API Integration

### Endpoints

#### 1. Blog Cards API
**Endpoint**: `GET /api/Blog/Cards`

**Purpose**: Fetch all published blog cards for listing page

**Response Structure**:
```typescript
{
  success: boolean;
  message: string;
  data: BlogCard[];
  errors: any;
  timeStamp: string;
}
```

**BlogCard Interface**:
```typescript
{
  slug: string;
  coverImage: string;
  title: string;
  shortDescription: string;
  publishingDate: string;
  readTime: number;
  authorImage: string;
  authorName: string;
  authorDesignation: string;
}
```

#### 2. Blog View API
**Endpoint**: `GET /api/Blog/View/{slug}`

**Purpose**: Fetch blog details and automatically increment view count

**Response Structure**:
```typescript
{
  success: boolean;
  message: string;
  data: BlogDetail;
  errors: any;
  timeStamp: string;
}
```

**BlogDetail Interface**:
```typescript
{
  slug: string;
  coverImage: string;
  title: string;
  shortDescription: string;
  publishingDate: string;
  readTime: number;
  category: string;
  tags: string[];
  viewCount: number;
  blogDetails: string; // HTML content
  author: BlogAuthor;
  relatedBlogs: RelatedBlog[];
  metaTitle: string;
  metaDescription: string;
}
```

## Redux State Management

### Blog Slice State
```typescript
interface BlogState {
  // Blog Cards
  blogCards: BlogCard[];
  blogCardsLoading: boolean;
  blogCardsError: string | null;

  // Selected Blog
  selectedBlog: BlogDetail | null;
  selectedBlogLoading: boolean;
  selectedBlogError: string | null;
}
```

### Async Actions
- `fetchBlogCards()` - Fetch all blog cards
- `fetchBlogBySlug(slug)` - Fetch blog details by slug

### Synchronous Actions
- `clearSelectedBlog()` - Clear selected blog
- `clearBlogCardsError()` - Clear blog cards error
- `clearSelectedBlogError()` - Clear selected blog error

### Usage Example
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogCards, fetchBlogBySlug } from '@/store/blogSlice';

// In component
const dispatch = useAppDispatch();
const { blogCards, blogCardsLoading, blogCardsError } = useAppSelector(state => state.blog);

// Fetch blogs
useEffect(() => {
  dispatch(fetchBlogCards());
}, [dispatch]);
```

## Components

### BlogCard
Displays individual blog card with:
- Cover image with hover effect
- Title and description
- Publishing date and read time
- Author info with avatar
- "Read More" link

**Props**:
```typescript
{
  blog: BlogCard;
  index?: number; // For stagger animation
}
```

### AuthorCard
Displays comprehensive author information:
- Profile image
- Full name and designation
- Biography
- Social media links (Email, Phone, WhatsApp, LinkedIn, Facebook, Twitter)

**Props**:
```typescript
{
  author: BlogAuthor;
}
```

### RelatedBlogCard
Compact card for related blogs:
- Cover image
- Title
- Publishing date
- Read time

**Props**:
```typescript
{
  blog: RelatedBlog;
  index?: number;
}
```

### Loading States
- `BlogCardSkeleton` - Single card skeleton
- `BlogCardSkeletonGrid` - Grid of skeletons
- `BlogDetailSkeleton` - Full page skeleton

### Empty & Error States
- `BlogEmptyState` - No blogs available
- `BlogErrorState` - Error with retry button

## Pages

### Blog Listing Page (`/blog`)
**Features**:
- Grid layout (responsive: 1 col mobile, 2 tablet, 3 desktop)
- Loading skeletons
- Empty state
- Error state with retry
- SEO meta tags
- Stagger animations

**States Handled**:
- Loading: Shows skeleton grid
- Error: Shows error message with retry
- Empty: Shows empty state message
- Success: Shows blog cards grid

### Blog Detail Page (`/blog/:slug`)
**Features**:
- Hero section with cover image
- Title and meta information
- Category and tags display
- Author card with social links
- HTML content rendering (dangerouslySetInnerHTML)
- Related blogs section
- View count auto-increment
- Back navigation
- Loading skeleton
- 404 handling
- SEO meta tags (title, description, OG, Twitter)

**Content Sections**:
1. Back button
2. Hero image
3. Title and meta (date, read time, views)
4. Category and tags
5. Author card
6. Blog HTML content
7. Related blogs

## SEO Implementation

### Meta Tags
Both pages include:
- Page title
- Meta description
- Open Graph tags (title, description, image, type)
- Twitter Card tags
- Proper URL structure

### Blog Detail SEO
```typescript
<Helmet>
  <title>{metaTitle || title}</title>
  <meta name="description" content={metaDescription || shortDescription} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={shortDescription} />
  <meta property="og:image" content={coverImage} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={shortDescription} />
  <meta name="twitter:image" content={coverImage} />
</Helmet>
```

## Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

### Component Responsiveness
- Blog cards: Fluid layout with aspect ratio images
- Author card: Flexbox that stacks on mobile
- Navigation: Touch-friendly buttons
- Images: Lazy loading with proper aspect ratios
- Typography: Responsive font sizes

## Error Handling

### Network Errors
- Caught and displayed with user-friendly messages
- Retry functionality available
- Loading states prevent multiple requests

### 404 Errors
- Blog not found shows error state
- Back to blog list navigation
- Proper error messaging

### Edge Cases
- Empty blog list
- Missing images (handled by browser)
- Invalid slugs
- Network timeouts
- API errors

## Animations

### Framer Motion Animations
- Page entrance: Fade in with Y translation
- Cards: Stagger animation based on index
- Hover effects: Scale and shadow transitions
- Loading: Pulse animation on skeletons

### Performance
- CSS transforms for smooth animations
- Hardware acceleration
- Reduced motion support

## Best Practices Implemented

### Code Quality
✅ TypeScript for type safety
✅ Reusable components
✅ Clean architecture (services, store, components, pages)
✅ Consistent naming conventions
✅ Proper error handling
✅ Loading states for all async operations

### Performance
✅ Lazy loading images
✅ Redux for state management
✅ Memoization where appropriate
✅ Skeleton loaders for perceived performance
✅ Optimized animations

### Accessibility
✅ Semantic HTML
✅ Alt text for images
✅ Keyboard navigation
✅ Focus states
✅ ARIA labels where needed
✅ Readable contrast ratios

### SEO
✅ Meta tags (title, description)
✅ Open Graph tags
✅ Twitter Card tags
✅ Semantic HTML structure
✅ Proper heading hierarchy

## Testing Checklist

### Functional Testing
- [ ] Blog cards load correctly
- [ ] Blog detail page loads correctly
- [ ] Related blogs clickable
- [ ] Author social links work
- [ ] Back navigation works
- [ ] Loading states display
- [ ] Error states display
- [ ] Empty state displays
- [ ] Retry functionality works
- [ ] View count increments

### Responsive Testing
- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Images scale properly
- [ ] Text is readable
- [ ] Buttons are tappable

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Testing
- [ ] Page load time < 3s
- [ ] Images lazy load
- [ ] No layout shifts
- [ ] Smooth animations

## Deployment

### Environment Configuration
Ensure `.env` contains:
```env
VITE_API_URL=https://api.redberry.ae/api
```

### Build Process
```bash
npm run build
```

### Pre-deployment Checklist
- [ ] All dependencies installed
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] SEO tags verified
- [ ] Images load properly
- [ ] API endpoints accessible

## Troubleshooting

### Common Issues

**Issue**: Redux store not working
**Solution**: Ensure App.tsx is wrapped with Provider

**Issue**: Blog cards not loading
**Solution**: Check API_BASE_URL in .env and network requests

**Issue**: Images not displaying
**Solution**: Verify image URLs from API, check CORS

**Issue**: SEO tags not working
**Solution**: Ensure HelmetProvider wraps App

**Issue**: Routing not working
**Solution**: Verify routes in App.tsx, check slug parameter

## Future Enhancements

Potential improvements:
1. **Search functionality** - Filter blogs by title/content
2. **Pagination** - Load more blogs
3. **Categories filter** - Filter by category
4. **Tags filter** - Filter by tags
5. **Share buttons** - Social sharing
6. **Comments system** - User comments
7. **Reading progress** - Progress bar
8. **Bookmark feature** - Save for later
9. **Dark mode** - Theme toggle
10. **Analytics** - Track blog views

## Support

For issues or questions:
- Check API documentation
- Verify environment variables
- Check browser console for errors
- Review network requests in DevTools
- Check Redux DevTools for state issues

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ Blog Cards API integration
- ✅ Blog View API integration
- ✅ Redux state management
- ✅ Blog listing page
- ✅ Blog detail page
- ✅ Author card component
- ✅ Related blogs component
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Animations
- ✅ Production-ready
