# OLeft

<https://github.com/bcms/starters/assets/15079459/05d4a313-d7b6-4b0f-95d9-e041eca3ce9e>

## Deploy

### Vercel

Run this command from the root project:

```sh
vercel
```

### TODO Cloudflare

<https://docs.astro.build/en/guides/integrations-guide/cloudflare/>

We have errors now after deploy:

```txt
2025-08-06T11:50:04.301Z Initializing build environment...
2025-08-06T11:50:11.723Z Success: Finished initializing build environment
2025-08-06T11:50:12.023Z Cloning repository...
2025-08-06T11:50:14.523Z Restoring from dependencies cache
2025-08-06T11:50:14.529Z Restoring from build output cache
2025-08-06T11:50:15.607Z Detected the following tools from environment: pnpm@10.14.0, nodejs@22.16.0, npm@10.9.2
2025-08-06T11:50:16.590Z Installing project dependencies: pnpm install --frozen-lockfile
2025-08-06T11:50:17.067Z Scope: all 13 workspace projects
2025-08-06T11:50:17.289Z ../..                                    | Progress: resolved 1, reused 0, downloaded 0, added 0
2025-08-06T11:50:17.375Z ../..                                    | +819 ++++++++++++++++++++++++++++++++
2025-08-06T11:50:18.290Z ../..                                    | Progress: resolved 819, reused 0, downloaded 11, added 0
2025-08-06T11:50:19.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 15, added 0
2025-08-06T11:50:20.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 119, added 41
2025-08-06T11:50:21.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 299, added 113
2025-08-06T11:50:04.301Z Initializing build environment...
2025-08-06T11:50:11.723Z Success: Finished initializing build environment
2025-08-06T11:50:12.023Z Cloning repository...
2025-08-06T11:50:14.523Z Restoring from dependencies cache
2025-08-06T11:50:14.529Z Restoring from build output cache
2025-08-06T11:50:15.607Z Detected the following tools from environment: pnpm@10.14.0, nodejs@22.16.0, npm@10.9.2
2025-08-06T11:50:16.590Z Installing project dependencies: pnpm install --frozen-lockfile
2025-08-06T11:50:17.067Z Scope: all 13 workspace projects
2025-08-06T11:50:17.289Z ../..                                    | Progress: resolved 1, reused 0, downloaded 0, added 0
2025-08-06T11:50:17.375Z ../..                                    | +819 ++++++++++++++++++++++++++++++++
2025-08-06T11:50:18.290Z ../..                                    | Progress: resolved 819, reused 0, downloaded 11, added 0
2025-08-06T11:50:19.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 15, added 0
2025-08-06T11:50:20.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 119, added 41
2025-08-06T11:50:21.291Z ../..                                    | Progress: resolved 819, reused 0, downloaded 299, added 113
2025-08-06T11:50:22.292Z ../..                                    | Progress: resolved 819, reused 0, downloaded 380, added 151
2025-08-06T11:50:23.294Z ../..                                    | Progress: resolved 819, reused 0, downloaded 420, added 163
2025-08-06T11:50:24.293Z ../..                                    | Progress: resolved 819, reused 0, downloaded 537, added 207
2025-08-06T11:50:25.294Z ../..                                    | Progress: resolved 819, reused 0, downloaded 687, added 302
2025-08-06T11:50:26.295Z ../..                                    | Progress: resolved 819, reused 0, downloaded 749, added 324
2025-08-06T11:50:27.294Z ../..                                    | Progress: resolved 819, reused 0, downloaded 814, added 348
2025-08-06T11:50:28.299Z ../..                                    | Progress: resolved 819, reused 0, downloaded 816, added 351
2025-08-06T11:50:29.295Z ../..                                    | Progress: resolved 819, reused 0, downloaded 817, added 406
2025-08-06T11:50:30.295Z ../..                                    | Progress: resolved 819, reused 0, downloaded 817, added 726
2025-08-06T11:50:30.424Z ../..                                    | Progress: resolved 819, reused 0, downloaded 817, added 819, done
2025-08-06T11:50:30.828Z 
2025-08-06T11:50:30.828Z dependencies:
2025-08-06T11:50:30.828Z + @astrojs/check 0.9.4
2025-08-06T11:50:30.828Z + @astrojs/cloudflare 12.6.2
2025-08-06T11:50:30.828Z + @astrojs/react 4.3.0
2025-08-06T11:50:30.829Z + @astrojs/tailwind 6.0.2
2025-08-06T11:50:30.829Z + @thebcms/cli 1.4.0
2025-08-06T11:50:30.829Z + @thebcms/client 1.5.5
2025-08-06T11:50:30.829Z + @thebcms/components-react 2.0.0
2025-08-06T11:50:30.830Z + @thebcms/types 1.3.0
2025-08-06T11:50:30.830Z + @thebcms/utils 1.1.0
2025-08-06T11:50:30.830Z + @types/marked 6.0.0
2025-08-06T11:50:30.830Z + @types/react 19.1.9
2025-08-06T11:50:30.830Z + @types/react-dom 19.1.7
2025-08-06T11:50:30.831Z + astro 5.12.7
2025-08-06T11:50:30.831Z + classnames 2.5.1
2025-08-06T11:50:30.831Z + marked 16.1.1
2025-08-06T11:50:30.831Z + react 19.1.1
2025-08-06T11:50:30.831Z + react-dom 19.1.1
2025-08-06T11:50:30.831Z + react-transition-group 4.4.5
2025-08-06T11:50:30.832Z + tailwindcss 3.4.17
2025-08-06T11:50:30.832Z + typescript 5.9.2
2025-08-06T11:50:30.832Z 
2025-08-06T11:50:30.832Z devDependencies:
2025-08-06T11:50:30.832Z + @biomejs/biome 2.1.3
2025-08-06T11:50:30.832Z + @types/react-transition-group 4.4.12
2025-08-06T11:50:30.832Z + wrangler 4.28.0
2025-08-06T11:50:30.832Z 
2025-08-06T11:50:30.832Z ╭ Warning ─────────────────────────────────────────────────────────────────────╮
2025-08-06T11:50:30.833Z │                                                                              │
2025-08-06T11:50:30.833Z │   Ignored build scripts: core-js-pure, sharp, workerd.                       │
2025-08-06T11:50:30.833Z │   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
2025-08-06T11:50:30.833Z │   to run scripts.                                                            │
2025-08-06T11:50:30.833Z │                                                                              │
2025-08-06T11:50:30.833Z ╰──────────────────────────────────────────────────────────────────────────────╯
2025-08-06T11:50:30.833Z 
2025-08-06T11:50:30.891Z Done in 14.1s using pnpm v10.14.0
2025-08-06T11:50:30.926Z Executing user deploy command: npx wrangler deploy
2025-08-06T11:50:33.962Z 
2025-08-06T11:50:33.962Z  ⛅️ wrangler 4.28.0
2025-08-06T11:50:33.962Z ───────────────────
2025-08-06T11:50:33.969Z [custom build] Running: pnpm build
2025-08-06T11:50:34.383Z [custom build] 
2025-08-06T11:50:34.384Z [custom build] > gift-site@0.0.1 build /opt/buildhome/repo/apps/gift-site
2025-08-06T11:50:34.388Z [custom build] > bcms pull types lng ts && astro check && astro build && node scripts/post-build.js
2025-08-06T11:50:34.388Z [custom build] 
2025-08-06T11:50:34.388Z [custom build] 
2025-08-06T11:50:50.344Z [custom build] Pulling types for TypeScript ... 
2025-08-06T11:50:50.581Z [custom build] Done
2025-08-06T11:50:50.581Z [custom build] Saving types to bcms/types/ts/* ... 
2025-08-06T11:50:50.594Z [custom build] Done
2025-08-06T11:50:50.594Z [custom build] 
2025-08-06T11:50:53.224Z [custom build] 11:50:53 [content] Syncing content
2025-08-06T11:50:53.225Z [custom build] 
2025-08-06T11:50:53.228Z [custom build] 11:50:53 [content] Synced content
2025-08-06T11:50:53.228Z [custom build] 
2025-08-06T11:50:53.229Z [custom build] 11:50:53 [types] Generated 192ms
2025-08-06T11:50:53.229Z [custom build] 
2025-08-06T11:50:53.236Z [custom build] 11:50:53 [check] Getting diagnostics for Astro files in /opt/buildhome/repo/apps/gift-site...
2025-08-06T11:50:53.236Z [custom build] 
2025-08-06T11:50:57.659Z [custom build] src/components/articles/GoodsForArticle.tsx:8:1 - warning ts(6133): 'ContentManager' is declared but its value is never read.
2025-08-06T11:50:57.659Z [custom build] 
2025-08-06T11:50:57.659Z [custom build] 8 import ContentManager from "../ContentManager";
2025-08-06T11:50:57.660Z [custom build]   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
2025-08-06T11:50:57.660Z [custom build] 
2025-08-06T11:50:57.660Z [custom build] 
2025-08-06T11:50:58.155Z [custom build] src/pages/[country]/[language]/articles/[slug]/index.astro:26:1 - warning ts(6133): 'marked' is declared but its value is never read.
2025-08-06T11:50:58.156Z [custom build] 
2025-08-06T11:50:58.157Z [custom build] 26 import { marked } from "marked";
2025-08-06T11:50:58.157Z [custom build]    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
2025-08-06T11:50:58.157Z [custom build] src/pages/[country]/[language]/articles/[slug]/index.astro:15:1 - warning ts(6133): 'ContentManager' is declared but its value is never read.
2025-08-06T11:50:58.158Z [custom build] 
2025-08-06T11:50:58.158Z [custom build] 15 import ContentManager from "../../../../../components/ContentManager";
2025-08-06T11:50:58.159Z [custom build]    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
2025-08-06T11:50:58.159Z [custom build] src/pages/[country]/[language]/articles/[slug]/index.astro:13:1 - warning ts(6133): 'Ingredients' is declared but its value is never read.
2025-08-06T11:50:58.159Z [custom build] 
2025-08-06T11:50:58.159Z [custom build] 13 import { Ingredients } from "../../../../../components/articles/Ingredients";
2025-08-06T11:50:58.159Z [custom build]    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
2025-08-06T11:50:58.160Z [custom build] 
2025-08-06T11:50:58.160Z [custom build] 
2025-08-06T11:50:58.224Z [custom build] src/pages/articles/[slug]/index.astro:12:7 - warning ts(6133): 'slug' is declared but its value is never read.
2025-08-06T11:50:58.225Z [custom build] 
2025-08-06T11:50:58.226Z [custom build] 12 const { slug } = Astro.params;
2025-08-06T11:50:58.226Z [custom build]          ~~~~~~~~
2025-08-06T11:50:58.226Z [custom build] 
2025-08-06T11:50:58.226Z [custom build] 
2025-08-06T11:50:58.260Z [custom build] Result (42 files): 
2025-08-06T11:50:58.260Z [custom build] - 0 errors
2025-08-06T11:50:58.260Z [custom build] - 0 warnings
2025-08-06T11:50:58.260Z [custom build] - 5 hints
2025-08-06T11:50:58.260Z [custom build] 
2025-08-06T11:50:58.260Z [custom build] 
2025-08-06T11:51:08.591Z [custom build] 11:51:08 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV for production with the "SESSION" KV binding.
2025-08-06T11:51:08.591Z [custom build] 
2025-08-06T11:51:08.591Z [custom build] 11:51:08 [@astrojs/cloudflare] If you see the error "Invalid binding `SESSION`" in your build output, you need to add the binding to your wrangler config file.
2025-08-06T11:51:08.591Z [custom build] 
2025-08-06T11:51:08.721Z [custom build] 11:51:08 [content] Syncing content
2025-08-06T11:51:08.721Z [custom build] 
2025-08-06T11:51:08.722Z [custom build] 11:51:08 [content] Astro config changed
2025-08-06T11:51:08.722Z [custom build] 11:51:08 [content] Clearing content store
2025-08-06T11:51:08.723Z [custom build] 
2025-08-06T11:51:08.739Z [custom build] 11:51:08 [content] Synced content
2025-08-06T11:51:08.739Z [custom build] 
2025-08-06T11:51:08.744Z [custom build] 11:51:08 [types] Generated 80ms
2025-08-06T11:51:08.744Z [custom build] 
2025-08-06T11:51:08.748Z [custom build] 11:51:08 [build] output: "server"
2025-08-06T11:51:08.748Z [custom build] 11:51:08 [build] mode: "server"
2025-08-06T11:51:08.748Z [custom build] 11:51:08 [build] directory: /opt/buildhome/repo/apps/gift-site/dist/
2025-08-06T11:51:08.749Z [custom build] 11:51:08 [build] adapter: @astrojs/cloudflare
2025-08-06T11:51:08.749Z [custom build] 11:51:08 [build] Collecting build info...
2025-08-06T11:51:08.749Z [custom build] 
2025-08-06T11:51:08.750Z [custom build] 11:51:08 [build] ✓ Completed in 157ms.
2025-08-06T11:51:08.750Z [custom build] 11:51:08 [build] Building server entrypoints...
2025-08-06T11:51:08.750Z [custom build] 
2025-08-06T11:51:10.002Z [custom build] 11:51:09 [WARN] [router] getStaticPaths() ignored in dynamic page /src/pages/[country]/[language]/index.astro. Add `export const prerender = true;` to prerender the page as static HTML during the build process.
2025-08-06T11:51:10.003Z [custom build] 11:51:09 [WARN] [router] getStaticPaths() ignored in dynamic page /src/pages/[country]/[language]/articles/index.astro. Add `export const prerender = true;` to prerender the page as static HTML during the build process.
2025-08-06T11:51:10.006Z [custom build] 11:51:09 [WARN] [router] getStaticPaths() ignored in dynamic page /src/pages/[country]/[language]/articles/[slug]/index.astro. Add `export const prerender = true;` to prerender the page as static HTML during the build process.
2025-08-06T11:51:10.006Z [custom build] 11:51:09 [WARN] [router] getStaticPaths() ignored in dynamic page /src/pages/articles/[slug]/index.astro. Add `export const prerender = true;` to prerender the page as static HTML during the build process.
2025-08-06T11:51:10.006Z [custom build] 
2025-08-06T11:51:12.067Z [custom build] 11:51:12 [vite] ✓ built in 3.28s
2025-08-06T11:51:12.068Z [custom build] 
2025-08-06T11:51:12.068Z [custom build] 11:51:12 [build] ✓ Completed in 3.32s.
2025-08-06T11:51:12.068Z [custom build] 
2025-08-06T11:51:12.070Z [custom build] 
2025-08-06T11:51:12.071Z [custom build]  building client (vite) 
2025-08-06T11:51:12.071Z [custom build] 
2025-08-06T11:51:12.079Z [custom build] 11:51:12 [vite] transforming...
2025-08-06T11:51:12.091Z [custom build] 
2025-08-06T11:51:13.010Z [custom build] 11:51:13 [vite] ✓ 162 modules transformed.
2025-08-06T11:51:13.010Z [custom build] 
2025-08-06T11:51:13.087Z [custom build] 11:51:13 [vite] rendering chunks...
2025-08-06T11:51:13.088Z [custom build] 
2025-08-06T11:51:13.177Z [custom build] 11:51:13 [vite] computing gzip size...
2025-08-06T11:51:13.178Z [custom build] 
2025-08-06T11:51:13.186Z [custom build] 11:51:13 [vite] dist/_astro/Filters.DAV4jpsK.js             0.93 kB │ gzip:  0.57 kB
2025-08-06T11:51:13.186Z [custom build] 11:51:13 [vite] dist/_astro/Btn.su6yAAPa.js                 0.99 kB │ gzip:  0.51 kB
2025-08-06T11:51:13.187Z [custom build] 
2025-08-06T11:51:13.188Z [custom build] 11:51:13 [vite] dist/_astro/Hero.t-4BMy6q.js                1.68 kB │ gzip:  0.83 kB
2025-08-06T11:51:13.189Z [custom build] 
2025-08-06T11:51:13.189Z [custom build] 11:51:13 [vite] dist/_astro/ContentManager.DmwnkAHR.js      1.75 kB │ gzip:  0.75 kB
2025-08-06T11:51:13.189Z [custom build] 11:51:13 [vite] dist/_astro/arrow-right.DZ2VJJ53.js         2.01 kB │ gzip:  1.04 kB
2025-08-06T11:51:13.189Z [custom build] 11:51:13 [vite] dist/_astro/GoodsForArticle.n12T-aCC.js     2.60 kB │ gzip:  1.00 kB
2025-08-06T11:51:13.189Z [custom build] 11:51:13 [vite] dist/_astro/Dropdown.DB5aqFcF.js            2.84 kB │ gzip:  1.31 kB
2025-08-06T11:51:13.189Z [custom build] 11:51:13 [vite] dist/_astro/List.B_xvjHtA.js                3.12 kB │ gzip:  1.44 kB
2025-08-06T11:51:13.190Z [custom build] 11:51:13 [vite] dist/_astro/index.DO352gg1.js               3.89 kB │ gzip:  1.52 kB
2025-08-06T11:51:13.190Z [custom build] 11:51:13 [vite] dist/_astro/index.CQ95-tCy.js               8.01 kB │ gzip:  3.11 kB
2025-08-06T11:51:13.191Z [custom build] 11:51:13 [vite] dist/_astro/Search.3LWDamVd.js              8.13 kB │ gzip:  3.31 kB
2025-08-06T11:51:13.191Z [custom build] 11:51:13 [vite] dist/_astro/components-react.BTWv_R3q.js   68.06 kB │ gzip: 21.56 kB
2025-08-06T11:51:13.195Z [custom build] 
2025-08-06T11:51:13.196Z [custom build] 11:51:13 [vite] dist/_astro/client.knIjkhL_.js            175.55 kB │ gzip: 55.67 kB
2025-08-06T11:51:13.197Z [custom build] 11:51:13 [vite] ✓ built in 1.11s
2025-08-06T11:51:13.198Z [custom build] 
2025-08-06T11:51:13.228Z [custom build] 
2025-08-06T11:51:13.228Z [custom build]  prerendering static routes 
2025-08-06T11:51:13.228Z [custom build] 
2025-08-06T11:51:13.229Z [custom build] 11:51:13 ✓ Completed in 22ms.
2025-08-06T11:51:13.229Z [custom build] 
2025-08-06T11:51:13.229Z [custom build] 
2025-08-06T11:51:13.232Z [custom build] 11:51:13 [build] Rearranging server assets...
2025-08-06T11:51:13.233Z [custom build] 
2025-08-06T11:51:13.236Z [custom build] 11:51:13 [build] Server built in 4.65s
2025-08-06T11:51:13.237Z [custom build] 11:51:13 [build] Complete!
2025-08-06T11:51:13.237Z [custom build] 
2025-08-06T11:51:13.311Z [custom build] ✅ Created .assetsignore file in dist directory
2025-08-06T11:51:13.311Z [custom build] 
2025-08-06T11:51:14.203Z 🌀 Building list of assets...
2025-08-06T11:51:14.205Z ✨ Read 55 files from the assets directory /opt/buildhome/repo/apps/gift-site/dist
2025-08-06T11:51:14.216Z 🌀 Starting asset upload...
2025-08-06T11:51:15.900Z No updated asset files to upload. Proceeding with deployment...
2025-08-06T11:51:15.932Z Total Upload: 1250.32 KiB / gzip: 255.73 KiB
2025-08-06T11:51:16.935Z Your Worker has access to the following bindings:
2025-08-06T11:51:16.935Z Binding                                             Resource          
2025-08-06T11:51:16.936Z env.SESSION (f675055b126e47629ddacc444e505bf0)      KV Namespace      
2025-08-06T11:51:16.936Z env.ASSETS                                          Assets            
2025-08-06T11:51:16.936Z 
2025-08-06T11:51:17.007Z 
2025-08-06T11:51:17.047Z ✘ [ERROR] A request to the Cloudflare API (/accounts/4300b51226d758c9c8aff76fc9557565/workers/scripts/partner-links/versions) failed.
2025-08-06T11:51:17.047Z 
2025-08-06T11:51:17.048Z   Uncaught ReferenceError: MessageChannel is not defined
2025-08-06T11:51:17.048Z     at null.<anonymous> (file:///opt/buildhome/repo/apps/gift-site/dist/_worker.js/chunks/_@astro-renderers_TaRILP3u.mjs:6804:16) in requireReactDomServer_browser_production
2025-08-06T11:51:17.048Z     at null.<anonymous> (file:///opt/buildhome/repo/apps/gift-site/dist/_worker.js/chunks/_@astro-renderers_TaRILP3u.mjs:13074:8) in requireServer_browser
2025-08-06T11:51:17.048Z     at null.<anonymous> (file:///opt/buildhome/repo/apps/gift-site/dist/_worker.js/chunks/_@astro-renderers_TaRILP3u.mjs:13086:29) in dist/_worker.js/chunks/_@astro-renderers_TaRILP3u.mjs
2025-08-06T11:51:17.048Z     at null.<anonymous> (index.js:5:56) in __init
2025-08-06T11:51:17.048Z     at null.<anonymous> (file:///opt/buildhome/repo/apps/gift-site/dist/_worker.js/index.js:2:1)
2025-08-06T11:51:17.049Z    [code: 10021]
2025-08-06T11:51:17.049Z 
2025-08-06T11:51:17.049Z   
2025-08-06T11:51:17.049Z   If you think this is a bug, please open an issue at: https://github.com/cloudflare/workers-sdk/issues/new/choose
2025-08-06T11:51:17.049Z 
2025-08-06T11:51:17.049Z 
2025-08-06T11:51:17.050Z 
2025-08-06T11:51:17.050Z Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2025-08-06T11:51:17.148Z Failed: error occurred while running deploy command
```

## BCMS Articles code starter for Astro.js

This is an Astro.js starter kit for BCMS, a headless CMS. It's minimal but solid, with a clean codebase that hooks directly into your BCMS project, ready to extend and scale as needed.

## Getting Started

Run the following command

```bash
npx @thebcms/cli create astro starter articles
```

and follow the prompts.

---

### Useful links

- [BCMS website](https://thebcms.com/)
- [BCMS documentation](https://thebcms.com/docs/)
- [BCMS and Astro integration](https://thebcms.com/docs/integrations/astro)
- [All BCMS starters](https://thebcms.com/starters)
- [Join our Discord](https://discord.com/invite/SYBY89ccaR)
