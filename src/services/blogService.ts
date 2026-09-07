/**
 * Blog Service
 * Handles all blog-related API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.redberry.ae/api';

// ============== Type Definitions ==============

export interface BlogAuthor {
  profileImage: string;
  fullName: string;
  designation: string;
  biography: string;
  email: string;
  phone: string;
  whatsApp: string;
  linkedIn: string;
  facebook: string;
  twitter: string;
}

export interface BlogCard {
  slug: string;
  coverImage: string;
  title: string;
  shortDescription: string;
  publishingDate: string;
  readTime: number;
  // Category information for filtering
  category?: string | { id: number; name: string; slug: string };
  categoryName?: string; // Some APIs return categoryName instead of category.slug
  tags?: (string | { id: number; name: string; slug: string })[];
  // API returns author as nested object, not flat fields
  author?: {
    name: string;
    designation: string | null;
    profileImage: string;
  };
  // Legacy flat fields (for backward compatibility)
  authorImage?: string;
  authorName?: string;
  authorDesignation?: string;
  // FAQ data
  faqs?: Array<{
    id?: number;
    question: string;
    answer: string;
    createdAt?: string;
    isActive?: boolean;
  }>;
}

export interface RelatedBlog {
  slug: string;
  coverImage: string;
  title: string;
  publishingDate: string;
  readTime: number;
}

export interface BlogDetail {
  slug: string;
  coverImage: string;
  title: string;
  shortDescription: string;
  publishingDate: string;
  readTime: number;
  category: string | { id: number; name: string; slug: string };
  tags: (string | { id: number; name: string; slug: string })[];
  viewCount: number;
  blogDetails: string; // HTML content
  author: BlogAuthor;
  relatedBlogs: RelatedBlog[];
  metaTitle: string;
  metaDescription: string;
  faqs?: Array<{
    id?: number;
    question: string;
    answer: string;
    createdAt?: string;
    isActive?: boolean;
  }>;
}

export interface BlogCardsResponse {
  success: boolean;
  message: string;
  data: BlogCard[];
  errors: any;
  timeStamp: string;
}

export interface BlogDetailResponse {
  success: boolean;
  message: string;
  data: BlogDetail;
  errors: any;
  timeStamp: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface BlogCategoriesResponse {
  success: boolean;
  message: string;
  data: BlogCategory[];
  errors: any;
  timeStamp: string;
}

// ============== API Functions ==============

/**
 * Fetch all published blog cards, optionally filtered by category
 * @param category - Optional category slug to filter blogs by category
 * @returns Promise with blog cards array
 */
export async function getBlogCards(category?: string): Promise<BlogCardsResponse> {
  try {
    // Build URL with optional categorySlug parameter (backend uses categorySlug not category)
    const url = category && category !== 'ambition-library'
      ? `${API_BASE_URL}/Blog/Cards?categorySlug=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/Blog/Cards`;
    
    console.log('Fetching blog cards from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Blog Cards Response Status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BlogCardsResponse = await response.json();
    console.log('Blog Cards Data:', data);
    console.log('Blog Cards Count:', data.data?.length);
    console.log('Blog Cards - Category check:', {
      hasCategory: !!data.data?.[0]?.category,
      categoryData: data.data?.[0]?.category
    });
    
    // DEBUG: Log all blog categories to help identify mismatches
    console.log('=== BLOG CATEGORIES DEBUG ===');
    console.log(`URL used: ${url}`);
    console.log(`Total blogs returned: ${data.data?.length || 0}`);
    data.data?.forEach((blog, index) => {
      console.log(`Blog ${index + 1}: "${blog.title}"`);
      console.log('  Full blog object:', JSON.stringify(blog, null, 2));
      console.log('  category:', blog.category);
      console.log('  categoryName:', blog.categoryName);
      console.log('  slug:', blog.slug);
    });
    console.log('=== END BLOG CATEGORIES DEBUG ===');
    
    return data;
  } catch (error) {
    console.error('Error fetching blog cards:', error);
    throw error;
  }
}

/**
 * Fetch blog details by slug and increment view count
 * @param slug - Blog slug
 * @returns Promise with blog details
 */
export async function getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/Blog/View/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BlogDetailResponse = await response.json();
    
    // FIX: Backend returns "faQs" (capital Q) but we need "faqs" (lowercase)
    if (data.data && 'faQs' in data.data) {
      (data.data as any).faqs = (data.data as any).faQs;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
}

/**
 * Fetch all active blog categories
 * @returns Promise with blog categories array
 */
export async function getBlogCategories(): Promise<BlogCategoriesResponse> {
  try {
    console.log('Fetching blog categories from:', `${API_BASE_URL}/BlogCategory/List`);
    
    const response = await fetch(`${API_BASE_URL}/BlogCategory/List`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Blog Categories Response Status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BlogCategoriesResponse = await response.json();
    console.log('Blog Categories Data:', data);
    console.log('Blog Categories Count:', data.data?.length);
    
    return data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
}
