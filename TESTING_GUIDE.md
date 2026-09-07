# Testing Guide - Dynamic Categories & Blog Filtering

## ✅ Your Setup is Complete!

Everything is properly configured. Here's how to test that it's working correctly.

---

## Test Scenario: Adding a "Founder Resources" Blog

### Step 1: Add Blog in CMS

1. Go to your CMS
2. Create a new blog post
3. **Important**: Assign it to the **"Founder Resources"** category
4. Publish the blog

### Step 2: Test Navigation Dropdown

1. **Open your application** in browser: `http://localhost:3080`
2. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Hover over "Resources Hub"** in the navigation
4. **Check the dropdown** - should show:
   ```
   📚 The Ambition Library
   📁 Founder Resources  ← Should appear here!
   ```

### Step 3: Test the Page

1. **Click "Founder Resources"** in the dropdown
2. **Should navigate to**: `/resources-hub/founder-resources`
3. **Should display**: Your blog post(s) in the "Founder Resources" category

### Step 4: Verify Console Logs

Open DevTools (F12) → Console tab. You should see:

```javascript
=== MEGANAV DYNAMIC CATEGORIES ===
Blog categories from API: [
  { id: X, name: "Founder Resources", slug: "founder-resources", ... }
]
Blog cards from API: [
  { 
    title: "Your Blog Title",
    categoryName: "Founder Resources",
    category: { slug: "founder-resources", ... }
  }
]
Category slugs with blogs: ["founder-resources"]
Categories with blogs (filtered): [
  { id: X, name: "Founder Resources", slug: "founder-resources", ... }
]
Final dynamic items for MegaNav (with Ambition Library): [
  { slug: "ambition-library", title: "The Ambition Library", ... },
  { slug: "founder-resources", title: "Founder Resources", ... }
]
=== END MEGANAV DYNAMIC CATEGORIES ===
```

---

## Expected Behavior

### ✅ What Should Happen:

| Action | Expected Result |
|--------|----------------|
| Add blog with "Founder Resources" category | "Founder Resources" appears in dropdown |
| Click "Founder Resources" in dropdown | Navigate to `/resources-hub/founder-resources` |
| On Founder Resources page | See ONLY blogs with "Founder Resources" category |
| Click "The Ambition Library" | See ALL blogs from ALL categories |
| Remove all blogs from a category | That category disappears from dropdown |

### ❌ What Should NOT Happen:

- Dropdown should NOT show categories without blogs
- Dropdown should NOT show hardcoded dummy data (except "The Ambition Library")
- Category page should NOT show blogs from other categories
- Should NOT see "boolean is not iterable" errors

---

## Troubleshooting

### Issue: "Founder Resources" doesn't appear in dropdown

**Possible Causes**:
1. Blog not published in CMS
2. Blog category not assigned correctly
3. Browser cache showing old data
4. Dev server cache not cleared

**Solutions**:
```bash
# 1. Stop dev server
Ctrl+C

# 2. Clear build cache
rmdir /s /q .vite
rmdir /s /q dist

# 3. Restart dev server
npm run dev

# 4. In browser: Hard refresh
Ctrl+Shift+R
```

**Check Console Logs**:
- Look for "=== MEGANAV DYNAMIC CATEGORIES ==="
- Check if your blog appears in "Blog cards from API"
- Check if category appears in "Categories with blogs (filtered)"
- If blog is there but category isn't filtered, there's a slug mismatch

### Issue: Page shows "No Blog Posts Yet"

**Possible Causes**:
1. Category slug mismatch between CMS and route
2. API not returning category information with blog
3. Client-side filtering issue

**Check Console Logs** on the category page:
```javascript
=== FILTERED RESULTS for "founder-resources" ===
Total blogs fetched: X
After category filter: Y
```

**Verify**:
1. Check the URL that was called: Should include `?categorySlug=founder-resources`
2. Check API response: Should return only founder-resources blogs
3. Check blog data structure: Should have `category` or `categoryName` field

### Issue: Category Slug Mismatch

CMS category names are converted to slugs like this:
```
"Founder Resources" → "founder-resources"
"Investor Resources" → "investor-resources"
"Family Office Resources" → "family-office-resources"
```

**Conversion Logic**:
```javascript
categoryName
  .toLowerCase()           // "Founder Resources" → "founder resources"
  .trim()                  // Remove spaces at start/end
  .replace(/\s+/g, '-')    // Replace spaces with dashes → "founder-resources"
  .replace(/[^a-z0-9-]/g, '') // Remove special characters
```

**If Category Has Special Characters**:
- CMS: "Founder's Resources" 
- Slug: "founders-resources" (apostrophe removed)
- Route file should use: `category="founders-resources"`

---

## Testing Multiple Categories

### Test 1: Add Multiple Blogs to One Category

1. Add 3 blogs to "Founder Resources"
2. Dropdown should show "Founder Resources" (only once)
3. Clicking it should show all 3 blogs

### Test 2: Add Blogs to Multiple Categories

1. Add blog to "Founder Resources"
2. Add blog to "Investor Resources"
3. Dropdown should show both categories
4. Each page should show only its category's blogs
5. "The Ambition Library" should show all blogs from both categories

### Test 3: Remove All Blogs from a Category

1. Delete or unpublish all blogs in "Founder Resources"
2. Hard refresh browser
3. "Founder Resources" should disappear from dropdown
4. Other categories with blogs should still appear

---

## API Endpoints Being Used

### 1. Get Categories
```
GET /api/BlogCategory/List
Returns: All active categories from CMS
```

### 2. Get All Blogs
```
GET /api/Blog/Cards
Returns: All published blogs (for Ambition Library page)
```

### 3. Get Category-Specific Blogs
```
GET /api/Blog/Cards?categorySlug=founder-resources
Returns: Only blogs in "Founder Resources" category
```

---

## File Structure Reference

### Route Files:
```
src/routes/
├── resources-hub.ambition-library.index.tsx    (ALL blogs)
├── resources-hub.founder-resources.index.tsx   (Founder only)
├── resources-hub.investor-resources.index.tsx  (Investor only)
└── resources-hub.family-office-resources.index.tsx (Family Office only)
```

### Components:
```
src/components/
├── site/MegaNav.tsx                     (Navigation with dynamic dropdown)
└── resources/AmbitionLibraryPage.tsx    (Blog list page with filtering)
```

### API Services:
```
src/services/blogService.ts              (API calls)
src/store/blogSlice.ts                   (Redux state)
```

---

## Quick Test Commands

```bash
# Full reset (if something isn't working)
Ctrl+C
rmdir /s /q .vite
rmdir /s /q dist
rmdir /s /q node_modules\.vite
npm run dev

# Build to check for errors
npm run build

# Check if dev server is running
# Should be on: http://localhost:3080
```

---

## Success Checklist

- [ ] Blog added in CMS with "Founder Resources" category
- [ ] Dev server restarted and caches cleared
- [ ] Browser cache cleared (Ctrl+Shift+R)
- [ ] "Founder Resources" appears in dropdown
- [ ] Clicking it navigates to `/resources-hub/founder-resources`
- [ ] Page displays the blog post
- [ ] Console shows proper debug logs
- [ ] No errors in console
- [ ] "The Ambition Library" shows ALL blogs
- [ ] Founder Resources page shows ONLY Founder blogs

---

## Summary

Your setup is complete! The system will:

1. ✅ **Fetch categories** from CMS API
2. ✅ **Fetch blogs** from CMS API  
3. ✅ **Filter categories** to only show those with blogs
4. ✅ **Display in dropdown**: The Ambition Library + Dynamic Categories
5. ✅ **Navigate to pages**: Each with proper category filtering
6. ✅ **Show correct blogs**: All blogs OR category-filtered blogs

Everything is dynamic and pulling from your CMS!
