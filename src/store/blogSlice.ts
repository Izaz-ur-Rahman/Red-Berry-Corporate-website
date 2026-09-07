/**
 * Blog Redux Slice
 * Manages blog state with Redux Toolkit
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBlogCards, getBlogBySlug, getBlogCategories, BlogCard, BlogDetail, BlogCategory } from '@/services/blogService';

// ============== State Interface ==============

interface BlogState {
  // Blog Cards
  blogCards: BlogCard[];
  blogCardsLoading: boolean;
  blogCardsError: string | null;

  // Selected Blog
  selectedBlog: BlogDetail | null;
  selectedBlogLoading: boolean;
  selectedBlogError: string | null;

  // Blog Categories
  blogCategories: BlogCategory[];
  blogCategoriesLoading: boolean;
  blogCategoriesError: string | null;
}

const initialState: BlogState = {
  blogCards: [],
  blogCardsLoading: false,
  blogCardsError: null,

  selectedBlog: null,
  selectedBlogLoading: false,
  selectedBlogError: null,

  blogCategories: [],
  blogCategoriesLoading: false,
  blogCategoriesError: null,
};

// ============== Async Thunks ==============

/**
 * Fetch all blog cards, optionally filtered by category
 * @param category - Optional category slug for server-side filtering
 */
export const fetchBlogCards = createAsyncThunk(
  'blog/fetchBlogCards',
  async (category?: string, { rejectWithValue }) => {
    try {
      const response = await getBlogCards(category);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Failed to fetch blog cards');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * Fetch blog by slug
 */
export const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBlogBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await getBlogBySlug(slug);
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Failed to fetch blog details');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

/**
 * Fetch all blog categories
 */
export const fetchBlogCategories = createAsyncThunk(
  'blog/fetchBlogCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBlogCategories();
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Failed to fetch blog categories');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

// ============== Slice ==============

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Clear selected blog
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
      state.selectedBlogError = null;
    },
    // Clear errors
    clearBlogCardsError: (state) => {
      state.blogCardsError = null;
    },
    clearSelectedBlogError: (state) => {
      state.selectedBlogError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Blog Cards
    builder.addCase(fetchBlogCards.pending, (state) => {
      state.blogCardsLoading = true;
      state.blogCardsError = null;
    });
    builder.addCase(fetchBlogCards.fulfilled, (state, action: PayloadAction<BlogCard[]>) => {
      state.blogCardsLoading = false;
      state.blogCards = action.payload;
      state.blogCardsError = null;
    });
    builder.addCase(fetchBlogCards.rejected, (state, action) => {
      state.blogCardsLoading = false;
      state.blogCardsError = action.payload as string;
    });

    // Fetch Blog by Slug
    builder.addCase(fetchBlogBySlug.pending, (state) => {
      state.selectedBlogLoading = true;
      state.selectedBlogError = null;
    });
    builder.addCase(fetchBlogBySlug.fulfilled, (state, action: PayloadAction<BlogDetail>) => {
      state.selectedBlogLoading = false;
      state.selectedBlog = action.payload;
      state.selectedBlogError = null;
    });
    builder.addCase(fetchBlogBySlug.rejected, (state, action) => {
      state.selectedBlogLoading = false;
      state.selectedBlogError = action.payload as string;
    });

    // Fetch Blog Categories
    builder.addCase(fetchBlogCategories.pending, (state) => {
      state.blogCategoriesLoading = true;
      state.blogCategoriesError = null;
    });
    builder.addCase(fetchBlogCategories.fulfilled, (state, action: PayloadAction<BlogCategory[]>) => {
      state.blogCategoriesLoading = false;
      state.blogCategories = action.payload;
      state.blogCategoriesError = null;
    });
    builder.addCase(fetchBlogCategories.rejected, (state, action) => {
      state.blogCategoriesLoading = false;
      state.blogCategoriesError = action.payload as string;
    });
  },
});

export const { clearSelectedBlog, clearBlogCardsError, clearSelectedBlogError } = blogSlice.actions;

export default blogSlice.reducer;
