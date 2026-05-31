# Azmi Muwahid Portfolio

Production SvelteKit portfolio for `azmi.web.id`, built as a fast editorial portfolio for AI systems engineering, agentic workflows, RAG, real-time interfaces, and full stack product work.

The site is intentionally not a generic resume page. It is structured around case studies, experiments, technical decisions, and a lightweight signature interaction called the AI Systems Map.

## Application Overview

This app powers:

- A dark-mode-first portfolio homepage
- Notion-backed project case studies
- Notion-backed experiments/lab entries
- Optional Notion-backed blog posts/notes
- Static local UI and motion components
- SEO routes including `sitemap.xml` and `robots.txt`
- Server-only Notion API integration

Primary public routes:

- `/` — homepage with hero, proof metrics, AI Systems Map, stack, selected case studies, and contact section
- `/projects` — full project archive from Notion or fallback data
- `/projects/[slug]` — detailed case-study pages
- `/about` — senior engineering positioning and background
- `/lab` — experiments and research notes
- `/contact` — contact section/page
- `/blog` — optional Notion-backed posts
- `/blog/[slug]` — optional Notion-backed post detail pages
- `/sitemap.xml` — generated sitemap
- `/robots.txt` — crawler directives

## Tech Stack

Core framework:

- SvelteKit 2
- Svelte 5 runes
- TypeScript
- Vite
- Netlify adapter

Styling and UI:

- Tailwind CSS 4
- Local Svelte components
- `bits-ui` primitives for existing UI components
- `tailwind-variants`, `tailwind-merge`, `clsx`
- Custom CSS utilities for editorial grid, dark surfaces, project placeholders, reduced motion, and Notion typography

CMS and content:

- Notion API via `@notionhq/client`
- Server-only SvelteKit load functions
- Local fallback data for projects and experiments when Notion env vars are missing

Content rendering:

- Notion block rendering for rich body content
- `highlight.js` for code blocks
- `marked` for legacy markdown preview/admin compatibility

Icons and visuals:

- `@lucide/svelte`
- Lightweight CSS/SVG interaction for the AI Systems Map
- No heavy animation library required for the primary portfolio experience

Validation and formatting:

- `svelte-check`
- Prettier
- `prettier-plugin-svelte`
- `prettier-plugin-tailwindcss`

## Architecture

High-level flow:

```text
Browser
  -> SvelteKit route
  -> +page.server.ts
  -> src/lib/server/notion/*
  -> Notion API
  -> mapped typed data
  -> local Svelte components
```

Notion credentials are never exposed to the browser. All Notion calls live under `src/lib/server/notion/*` and are called from server load functions only.

Important files:

- `src/lib/server/notion/client.ts` — private Notion client and database IDs
- `src/lib/server/notion/projects.ts` — project queries
- `src/lib/server/notion/experiments.ts` — experiment queries
- `src/lib/server/notion/blocks.ts` — recursive Notion page block loading
- `src/lib/server/notion/mappers.ts` — Notion page-to-app data mappers
- `src/lib/server/notion/blog.ts` — optional blog queries
- `src/lib/types/portfolio.ts` — project, experiment, and metric types
- `src/lib/types/blog.ts` — blog and Notion block types
- `src/lib/data/fallback.ts` — local fallback project and experiment content
- `src/lib/components/sections/AgenticWorkflowMap.svelte` — signature AI Systems Map interaction
- `src/lib/components/sections/ProjectsSection.svelte` — case-study cards
- `src/lib/components/blog/NotionBlockRenderer.svelte` — Notion page body renderer

## Environment Variables

Create `.env` locally. Use `.env.example` as the template.

Required for Notion projects:

```bash
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PROJECTS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_EXPERIMENTS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Optional:

```bash
NOTION_BLOG_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_GTM_ID=GTM-XXXXXXX
```

Legacy compatibility:

- `NOTION_API_KEY` is still accepted by the server client as a fallback, but `NOTION_TOKEN` is preferred.

Do not create `PUBLIC_NOTION_TOKEN`. Any variable prefixed with `PUBLIC_` can be exposed to browser code in SvelteKit.

## Notion Setup

1. Go to `https://www.notion.so/my-integrations`.
2. Create an internal integration.
3. Copy the integration secret into `NOTION_TOKEN`.
4. Create the required Notion databases.
5. Share each database with the integration using Notion's `Add connections` menu.
6. Copy each database ID from the database URL.
7. Add the IDs to `.env` locally and to Netlify environment variables for production.

Database ID example:

```text
https://www.notion.so/workspace/1234567890abcdef1234567890abcdef?v=...
                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                              database ID
```

## Projects Database

Create a Notion database for projects and set `NOTION_PROJECTS_DATABASE_ID`.

Required project properties:

| Property     | Notion type    | Notes                                             |
| ------------ | -------------- | ------------------------------------------------- |
| `Name`       | Title          | Project title                                     |
| `Slug`       | Text           | URL slug, for example `futurelab-ai-workflows`    |
| `Published`  | Checkbox       | Must be checked to appear on the site             |
| `Featured`   | Checkbox       | Shows on homepage when checked                    |
| `Year`       | Date or Text   | Displayed on cards and case-study pages           |
| `Role`       | Text or Select | Your role on the project                          |
| `Type`       | Text or Select | Product/category label                            |
| `Status`     | Text or Select | Example: `Production`, `Prototype`, `Shipped MVP` |
| `Stack`      | Multi-select   | Technologies used                                 |
| `Summary`    | Text           | Short project description                         |
| `Outcome`    | Text           | Specific, credible result or learning             |
| `Cover`      | Files or URL   | Optional cover image                              |
| `Live URL`   | URL            | Optional production URL                           |
| `GitHub URL` | URL            | Optional source URL                               |
| `Sort Order` | Number         | Lower numbers appear first                        |

Optional project properties used on case-study pages:

| Property              | Notion type | Notes                           |
| --------------------- | ----------- | ------------------------------- |
| `Problem`             | Text        | What needed to be solved        |
| `Constraints`         | Text        | One item per line               |
| `Approach`            | Text        | How the solution was approached |
| `Architecture`        | Text        | System shape and data flow      |
| `Technical Decisions` | Text        | One item per line               |
| `Key Features`        | Text        | One item per line               |
| `Result`              | Text        | Final result                    |
| `Lessons Learned`     | Text        | What the project taught         |

For list-style fields, write one item per line:

```text
Keep Notion API server-side only
Avoid heavy animation dependencies
Support fallback content when Notion is unavailable
```

Long-form content:

- Open the Notion project page.
- Write the full case-study body below the database properties.
- Supported blocks are rendered by `NotionBlockRenderer.svelte`, including paragraphs, headings, lists, todos, code, quotes, callouts, toggles, dividers, images, video embeds, bookmarks, tables, and columns.

Adding a project:

1. Add a row to the Projects database.
2. Fill the required fields.
3. Set `Published` to checked.
4. Set `Featured` to checked if it should appear on the homepage.
5. Set `Sort Order`.
6. Write any long-form case-study body in the Notion page.
7. Visit `/projects/your-slug`.

Editing a project:

- Edit the Notion database row for card and metadata changes.
- Edit the Notion page body for long-form case-study content.
- The site loads content server-side from Notion at request/render time.

## Experiments Database

Create a Notion database for experiments and set `NOTION_EXPERIMENTS_DATABASE_ID`.

Required experiment properties:

| Property     | Notion type    | Notes                                 |
| ------------ | -------------- | ------------------------------------- |
| `Name`       | Title          | Experiment title                      |
| `Slug`       | Text           | Stable URL-friendly slug              |
| `Published`  | Checkbox       | Must be checked to appear on `/lab`   |
| `Year`       | Date or Text   | Display year                          |
| `Status`     | Text or Select | Example: `Prototype`, `Research note` |
| `Stack`      | Multi-select   | Technologies or topics                |
| `Summary`    | Text           | Short description                     |
| `Outcome`    | Text           | What was learned or produced          |
| `Cover`      | Files or URL   | Optional image                        |
| `Sort Order` | Number         | Lower numbers appear first            |

Adding or editing experiments works the same way as projects.

## Blog Database

The blog is optional. Set `NOTION_BLOG_DATABASE_ID` if you want `/blog` and `/blog/[slug]` to render Notion posts.

Expected blog properties:

| Property         | Notion type  | Notes                      |
| ---------------- | ------------ | -------------------------- |
| `Name`           | Title        | Post title                 |
| `Slug`           | Text         | URL slug                   |
| `Excerpt`        | Text         | Short description          |
| `Status`         | Select       | Use `Published` to publish |
| `Published Date` | Date         | Display and sorting date   |
| `Category`       | Multi-select | Categories                 |
| `Tags`           | Multi-select | Tags                       |

Adding a blog post:

1. Add a row to the Blog database.
2. Fill `Name`, `Slug`, `Excerpt`, and `Published Date`.
3. Set `Status` to `Published`.
4. Add categories and tags if useful.
5. Write the post body inside the Notion page.
6. Visit `/blog/your-slug`.

## Local Development

Install dependencies:

```bash
yarn install
```

Start the dev server:

```bash
yarn dev
```

Run checks:

```bash
npm run check
npm run lint
npm run build
```

Format files:

```bash
npm run format
```

Preview production build:

```bash
npm run preview
```

This repo currently uses `yarn.lock`. Prefer `yarn install` for dependency installation to avoid mixed lockfiles.

## Deployment

The app uses `@sveltejs/adapter-netlify`.

Netlify setup:

1. Connect the GitHub repository to Netlify.
2. Set the build command to `npm run build` or `yarn build`.
3. Set the publish/output directory according to Netlify's SvelteKit adapter defaults.
4. Add all private env vars in Netlify project settings.
5. Deploy.

Required production env vars:

```bash
NOTION_TOKEN=
NOTION_PROJECTS_DATABASE_ID=
NOTION_EXPERIMENTS_DATABASE_ID=
```

Optional production env vars:

```bash
NOTION_BLOG_DATABASE_ID=
PUBLIC_GTM_ID=
```

## Performance Notes

The portfolio is designed to stay fast and credible:

- Notion calls run server-side only.
- Primary interaction uses CSS/SVG/Svelte rather than heavy 3D or animation libraries.
- Non-critical images use lazy loading.
- `prefers-reduced-motion` is respected for custom motion.
- No scroll hijacking.
- Local fallback content keeps pages functional if Notion is not configured.

Current build output includes some legacy dependencies and components that are still in the repository. Future cleanup can remove unused admin and legacy portfolio components to reduce maintenance surface.

## Accessibility Notes

Implemented or preserved:

- Semantic route structure and page headings
- Keyboard-accessible nav links and buttons
- Visible focus styles
- Good dark-mode contrast targets
- Reduced-motion handling for custom motion
- No hover-only critical content

Known warnings from `svelte-check` are currently in older admin/legacy components, not the primary portfolio routes.

## SEO Notes

Implemented:

- Page metadata for homepage, projects, project details, about, lab, contact, and blog routes
- Open Graph metadata
- Person JSON-LD in the root layout
- `sitemap.xml`
- `robots.txt`
- Project-specific title and description metadata

## Fallback Content

If Notion env vars are missing or Notion requests fail, the app uses local fallback data from:

```text
src/lib/data/fallback.ts
```

This prevents local development and production builds from failing when CMS credentials are unavailable.

Fallback project detail pages do not fetch Notion blocks unless the project has a valid Notion UUID page ID.

## Troubleshooting

Notion project does not appear:

- Confirm `Published` is checked.
- Confirm the integration has access to the database.
- Confirm `NOTION_PROJECTS_DATABASE_ID` is correct.
- Confirm the property names match exactly.
- Confirm `Sort Order` is set if ordering looks wrong.

Blog post does not appear:

- Confirm `Status` is exactly `Published`.
- Confirm `NOTION_BLOG_DATABASE_ID` is configured.
- Confirm the integration has access to the database.

500 error from Notion block ID validation:

- This happens if a non-Notion fallback ID is passed to the Notion blocks API.
- The project detail route guards against this by only fetching blocks for valid Notion UUID page IDs.

Environment variables are not working locally:

- Restart the dev server after editing `.env`.
- Make sure private variables do not start with `PUBLIC_`.
- Make sure `.env` is not committed.

## Useful Commands

```bash
yarn install
yarn dev
npm run check
npm run lint
npm run format
npm run build
npm run preview
```

## Repository Notes

- Main branch deploys to production.
- The site is currently Netlify-oriented.
- Keep CMS/API secrets out of client code.
- Keep content changes in Notion when possible.
- Keep UI/system changes in Svelte components.
