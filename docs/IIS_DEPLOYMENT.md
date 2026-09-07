# Deploying to IIS (Windows Server)

This app is a **plain Vite + React SPA**. The build output is a static folder
(`dist/`) with `index.html`, hashed JS/CSS bundles, and static assets. IIS
serves it directly — no Node.js process, no reverse proxy, no ARR, no
Windows service.

## 1. Prerequisites on the Windows server

Install once:

1. **IIS** with the *Static Content*, *Default Document*, and *HTTP Errors* role
   services enabled (Server Manager → Add Roles).
2. **URL Rewrite 2.1** — https://www.iis.net/downloads/microsoft/url-rewrite
   (needed for the SPA fallback rule in `web.config`).

That's it. No Node.js, no ARR, no NSSM, no PM2.

## 2. Build the app

On any machine with Bun (or Node 20+) and this repo:

```bash
bun install
bun run build
```

That produces `dist/`:

```
dist/
├── index.html
├── web.config          # SPA fallback + cache headers for IIS
├── assets/             # hashed JS/CSS bundles
├── favicon.ico
└── ...static files
```

`web.config` ships from `public/web.config` and is copied into `dist/`
automatically by Vite. Do not edit the copy in `dist/` — edit
`public/web.config` and rebuild.

## 3. Deploy to IIS

1. Copy the **contents** of `dist/` (not the folder itself) into the physical
   path of your IIS site — e.g. `C:\inetpub\wwwroot\rb-web\`. After copying,
   `web.config` sits directly next to `index.html`.
2. IIS Manager → **Sites → Add Website** (skip if the site already exists)
   - Site name: `rb-web`
   - Physical path: `C:\inetpub\wwwroot\rb-web`
   - Binding: `https` on 443, hostname = your domain. Bind your TLS cert.
3. Recycle the app pool (or restart the site) so the new `web.config` is
   picked up.
4. Open `https://your-domain/` — the home page renders. Open a deep link
   like `https://your-domain/ambitions/launch-a-business` and refresh —
   it still renders (the SPA fallback rule in `web.config` handles it).

## 4. What `web.config` does

- **SPA fallback rewrite** — any URL that isn't a real file or folder is
  rewritten to `/index.html` so React Router can resolve the route on the
  client. Without this rule, `/about` returns an IIS 404 on refresh.
- **Long cache for hashed assets** — `assets/*` files ship with content
  hashes in their filenames, so they can safely cache for a year.
- **No cache for `index.html`** — forces browsers to revalidate every load
  so new deploys are picked up immediately.
- **Basic hardening headers** — `X-Content-Type-Options: nosniff` and
  `Referrer-Policy: strict-origin-when-cross-origin`.

## 5. Updating the app

1. Rebuild locally: `bun run build`.
2. Copy the new `dist/` contents over the existing site folder.
3. No app-pool recycle needed — clients pick up the new `index.html` on
   next request and hashed asset URLs invalidate the old bundles.

## 6. Common issues

| Symptom | Cause | Fix |
| --- | --- | --- |
| Refresh on `/about` returns IIS 404 (yellow page) | URL Rewrite module not installed, or `web.config` missing | Install URL Rewrite 2.1; confirm `web.config` is at the site root next to `index.html` |
| Browser shows an old version after deploy | `index.html` was cached | Verify the `<location path="index.html">` block in `web.config` is present; hard-refresh (Ctrl+F5) once |
| Fonts or images 404 | Case mismatch (Windows filesystem is case-insensitive at rest but IIS URL paths are not) | Check the exact filename case matches the code's import path |
| Blank white page in production, works in dev | Base path mismatch | Confirm `<script type="module" src="/src/main.tsx">` was replaced by hashed asset tags in the built `dist/index.html`; if you see the raw `/src/` path, you served the dev source folder instead of `dist/` |
| API/backend calls fail with 404 | This is a static SPA — there is no backend running on the IIS server | Any dynamic feature must call an external API (e.g. Lovable Cloud edge function) |

## 7. What this app does NOT include

- **No SSR** — search engines and social-preview crawlers see the empty
  `index.html` shell first, then the JS bundle hydrates. If a page needs
  crawler-visible metadata, set it manually in `index.html` (site-wide) or
  render it client-side via `react-helmet-async` (per-route).
- **No server functions** — the previous `summarizeArticle` AI feature was
  removed during the SPA conversion. If you need dynamic server work, host
  it as a separate API (Lovable Cloud edge function or a small backend
  next to IIS) and call it from the client with `fetch()`.
- **No auth middleware or session cookies** — there is no server to enforce
  them. Use a client-side auth SDK (e.g. Supabase JS) if you add login later.
