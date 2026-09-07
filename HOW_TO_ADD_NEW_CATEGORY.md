# How To Add A New Blog Category

## Quick Reference

When you create a new category in CMS and want it to work on the website, follow these **3 simple steps**:

---

## Step 1: Create Route File

**File**: `src/routes/resources-hub.{SLUG}.index.tsx`

Replace `{SLUG}` with the category slug (e.g., `finance`, `business`, `marketing`)

**Template**:
```typescript
import { SiteLayout } from "@/components/site/SiteLayout";
import { AmbitionLibraryPage } from "@/components/resources/AmbitionLibraryPage";
import { SECTIONS, findItem } from "@/lib/platform";
import { NotFoundPage } from "@/components/site/NotFoundPage";

export default function {NAME}Index() {
  const section = SECTIONS.find((s) => s.key === "resources-hub")!;
  const item = findItem("resources-hub", "{SLUG}");
  if (!item) return <NotFoundPage />;
  return (
    <SiteLayout>
      <AmbitionLibraryPage section={section} item={item} category="{SLUG}" />
    </SiteLayout>
  );
}
```

**Replace**:
- `{NAME}`: PascalCase function name (e.g., `Finance`, `Business`, `Marketing`)
- `{SLUG}`: Lowercase slug (e.g., `finance`, `business`, `marketing`)

**Examples**:

### Finance
```typescript
// File: src/routes/resources-hub.finance.index.tsx
export default function FinanceIndex() {
  const item = findItem("resources-hub", "finance");
  // ...
  <AmbitionLibraryPage category="finance" />
}
```

### Business
```typescript
// File: src/routes/resources-hub.business.index.tsx
export default function BusinessIndex() {
  const item = findItem("resources-hub", "business");
  // ...
  <AmbitionLibraryPage category="business" />
}
```

---

## Step 2: Add to Platform Configuration

**File**: `src/lib/platform.ts`

### 2a. Import Icon (if needed)

```typescript
import {
  Building2, Coins, Globe2, /* ... other icons ... */
  YourNewIcon,  // ← Add your icon here
  type LucideIcon,
} from "lucide-react";
```

**Popular Icons**:
| Icon | Best For |
|------|----------|
| `DollarSign` | Finance, Money |
| `Briefcase` | Business, Work |
| `Code` | Technology, Programming |
| `TrendingUp` | Growth, Analytics |
| `ShoppingCart` | E-commerce, Retail |
| `Megaphone` | Marketing, Advertising |
| `BookOpen` | Education, Learning |
| `Heart` | Health, Wellness |
| `Scale` | Legal, Justice |

Browse more: https://lucide.dev/icons/

### 2b. Add to RESOURCES_HUB Array

```typescript
export const RESOURCES_HUB: NodeItem[] = [
  { slug: "ambition-library", title: "The Ambition Library", ... },
  // ... other categories ...
  { slug: "{SLUG}", title: "{TITLE}", tagline: "{TAGLINE}", icon: {ICON}, accent: "{ACCENT}" },
];
```

**Replace**:
- `{SLUG}`: Must match CMS category slug exactly
- `{TITLE}`: Display name (e.g., "Finance", "Business")
- `{TAGLINE}`: Short description
- `{ICON}`: Icon component name (e.g., `DollarSign`, `Briefcase`)
- `{ACCENT}`: Either `"berry"` or `"azure"` (alternate for visual variety)

**Example**:
```typescript
{ slug: "finance", title: "Finance", tagline: "Financial insights and strategies.", icon: DollarSign, accent: "berry" },
```

---

## Step 3: Register in App.tsx

**File**: `src/App.tsx`

### 3a. Import the Component

Add to the imports section (around line 18-26):

```typescript
import FinanceIndex from "./routes/resources-hub.finance.index";
```

### 3b. Add Route

Add to the Routes section (around line 69-79), **BEFORE** the catch-all `/:slug` route:

```typescript
<Route path="/resources-hub/finance" element={<FinanceIndex />} />
```

**IMPORTANT**: Must be BEFORE this line:
```typescript
<Route path="/resources-hub/:slug" element={<ResourcesHubSlug />} />
```

---

## Complete Example: Adding "Marketing" Category

### 1. Create Route File

**File**: `src/routes/resources-hub.marketing.index.tsx`

```typescript
import { SiteLayout } from "@/components/site/SiteLayout";
import { AmbitionLibraryPage } from "@/components/resources/AmbitionLibraryPage";
import { SECTIONS, findItem } from "@/lib/platform";
import { NotFoundPage } from "@/components/site/NotFoundPage";

export default function MarketingIndex() {
  const section = SECTIONS.find((s) => s.key === "resources-hub")!;
  const item = findItem("resources-hub", "marketing");
  if (!item) return <NotFoundPage />;
  return (
    <SiteLayout>
      <AmbitionLibraryPage section={section} item={item} category="marketing" />
    </SiteLayout>
  );
}
```

### 2. Update platform.ts

```typescript
// Add to imports
import { ..., Megaphone } from "lucide-react";

// Add to RESOURCES_HUB array
{ slug: "marketing", title: "Marketing", tagline: "Marketing strategies and insights.", icon: Megaphone, accent: "azure" },
```

### 3. Update App.tsx

```typescript
// Add import
import MarketingIndex from "./routes/resources-hub.marketing.index";

// Add route (before /:slug)
<Route path="/resources-hub/marketing" element={<MarketingIndex />} />
```

---

## Verification Checklist

After adding a new category, verify:

- [ ] Route file created: `resources-hub.{slug}.index.tsx`
- [ ] Function name is PascalCase + "Index"
- [ ] Category prop matches slug exactly
- [ ] Icon imported in platform.ts
- [ ] Category added to RESOURCES_HUB array
- [ ] Slug matches CMS category slug exactly
- [ ] Component imported in App.tsx
- [ ] Route added BEFORE `/:slug` route
- [ ] Build successful: `npm run build`
- [ ] Category appears in dropdown (if has blogs)
- [ ] Clicking it shows blog list (not 404)
- [ ] Only shows blogs from that category

---

## Testing

```bash
# 1. Clear caches
Ctrl+C
rmdir /s /q .vite
npm run dev

# 2. In browser
- Hover over "Resources Hub"
- Category should appear (if it has blogs)
- Click it
- Should show blog list for that category
```

---

## Common Mistakes

### ❌ Wrong slug in route file
```typescript
// CMS slug: "finance"
<AmbitionLibraryPage category="financial" />  // ❌ WRONG - doesn't match
```

### ❌ Wrong function name format
```typescript
export default function financeIndex() { }  // ❌ WRONG - not PascalCase
export default function FinanceRoute() { }  // ❌ WRONG - doesn't end with Index
export default function FinanceIndex() { }  // ✅ CORRECT
```

### ❌ Route added after catch-all
```typescript
<Route path="/resources-hub/:slug" element={<ResourcesHubSlug />} />
<Route path="/resources-hub/finance" element={<FinanceIndex />} />  // ❌ Too late!
```

### ❌ Slug mismatch with CMS
```typescript
// CMS category: "Finance" → slug auto-generated as "finance"
{ slug: "finances", ... }  // ❌ WRONG - doesn't match CMS
{ slug: "finance", ... }   // ✅ CORRECT
```

---

## Categories Currently Working

| Category | Slug | Status |
|----------|------|--------|
| The Ambition Library | `ambition-library` | ✅ |
| Founder Resources | `founder-resources` | ✅ |
| Investor Resources | `investor-resources` | ✅ |
| Family Office Resources | `family-office-resources` | ✅ |
| Sovereign Freedom & The Open World | `sovereign-freedom-&-the-open-world` | ✅ |
| Technology | `technology` | ✅ |
| Finance | `finance` | ✅ |

---

## Summary

**3 Files to Edit**:
1. Create: `src/routes/resources-hub.{slug}.index.tsx`
2. Edit: `src/lib/platform.ts` (add icon + add to array)
3. Edit: `src/App.tsx` (import + register route)

**Always Remember**:
- Slug must match CMS exactly
- Route must be before catch-all
- Function name: PascalCase + Index
- Test after each addition

Done! 🎉
