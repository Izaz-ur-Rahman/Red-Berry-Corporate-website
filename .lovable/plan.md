## Goal

Turn this into a **plain Vite + React SPA** (React Router DOM) that builds to a single `dist/` folder and drops onto IIS as static files with one `web.config` for SPA fallback. No Node, no reverse proxy, no server functions.

## Scope confirmed

- 33 route files, ~9,500 lines, no auth, no Supabase, no protected content
- 1 real server function (`summarizeArticle`) → **deleted per your instruction**
- SEO (`head()`, canonical, OG image, schemas) → **you will re-add manually after**

## What I'll change

### 1. Dependencies
- **Remove:** `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `nitro`, `@lovable.dev/vite-tanstack-config`, `ai`, `@ai-sdk/openai-compatible`
- **Add:** `react-router-dom`, `@vitejs/plugin-react`

### 2. Config files
- **`vite.config.ts`** — rewrite as plain `@vitejs/plugin-react` + `@tailwindcss/vite` + `vite-tsconfig-paths`, port 8080
- **`package.json`** — scripts stay `dev` / `build` / `preview` but pointed at plain Vite
- **`index.html`** — new file at project root (Vite SPA entry), mounts `#root`, loads `/src/main.tsx`

### 3. New app shell
- **`src/main.tsx`** — creates React root, mounts `<App />`
- **`src/App.tsx`** — `BrowserRouter` + one `<Routes>` table mapping every URL to its page component, wrapped in the existing header/footer layout that was in `__root.tsx`

### 4. Route files (all 33)
Each file today looks like:
```tsx
export const Route = createFileRoute("/path")({ head: () => ({...}), component: MyPage });
function MyPage() { ... }
```
Becomes:
```tsx
export default function MyPage() { ... }
```
- `head()` blocks stripped (you'll re-add SEO manually)
- `loader` + `Route.useLoaderData()` + `notFound()` + `redirect()` in dynamic routes (`about.$slug`, `ambitions.$slug`, `infrastructure.$slug`, `blueprint.$slug`, `resources-hub.$slug`) → rewritten to read `useParams()` and look up data client-side; unknown slug renders a 404 UI inline
- `<Link to="/about/$slug" params={{ slug: x }}>` → `<Link to={\`/about/${x}\`}>`
- `useNavigate({ to: "/x" })` → `navigate("/x")`
- Layout files (`resources-hub.ambition-library.tsx`) → become wrapper components rendering children directly in `App.tsx`

### 5. Files deleted
- `src/routes/__root.tsx` (layout moved into `App.tsx`)
- `src/routeTree.gen.ts`
- `src/start.ts`, `src/server.ts` (SSR entries)
- `src/lib/summarize.functions.ts`, `src/lib/ai-gateway.server.ts`
- `src/lib/api/example.functions.ts`, `src/lib/config.server.ts`
- `scripts/check-og-images.mjs`, `scripts/verify-iis-proxy.mjs` (SSR-specific)
- `docs/IIS_DEPLOYMENT.md` (replaced by a SPA-focused version)
- Any component still using `useServerFn` for `summarizeArticle` gets the button removed

### 6. IIS deployment
- **`public/web.config`** — SPA fallback rewrite so `/about/anything` refresh doesn't 404
- **`docs/IIS_DEPLOYMENT.md`** — rewritten: copy `dist/` to the IIS site folder, done. No Node, no ARR, no NSSM.

## Confirmed regressions

You accepted these:
1. Crawlers see empty HTML shell (no SSR). You'll re-add SEO client-side.
2. Article `summarizeArticle` AI feature is gone. Any UI button that called it is removed.
3. No streaming / SSR / server functions of any kind. Every dynamic thing is client-side.

## Verification after conversion

- `bun run build` produces a `dist/` with `index.html` + `assets/*`
- `bun run preview` (plain Vite preview) serves the SPA at :4173; every current URL loads on refresh
- Manual smoke test of the 5 dynamic slug routes and the article page

## What I need from you

**Approve this plan** and I'll execute it in one focused pass. It's an irreversible one-way conversion — I don't want to start halfway and leave the project in a broken state.
