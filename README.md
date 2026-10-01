# Azmi Muwahid Portfolio

SvelteKit portfolio for AI, automation, and software delivery work.

Hero uses a full-size portrait with pointer-reactive tilt and a static, theme-aware CSS dot matrix behind the copy. Backgrounds and imagery stay fixed within the page while scrolling. Motion handles one-shot entrances and pointer effects, with reduced-motion support and cleanup on navigation. No WebGL runtime is required.

## Content

- Project case studies: `src/content/projects/*.mdx`

AI Showdown lives in Projects. Lab route, experiment data, Agent Timeline Debugger, and Voice Latency Budget have been removed; navigation and sitemap expose Projects instead.

Projects include the former Beyond client work libraries and gateways, plus Rails Crypto Payment. Required `category` frontmatter uses `Web App`, `OS Library`, or `API / Gateway`; homepage and archive filter by category and show all recorded stack tags. Case studies document AI implementation or explicitly identify deterministic, non-AI processing. The portfolio cover shows the current local implementation because the deployed site still serves the previous version.

Project MDX filename becomes route slug. Frontmatter drives listing metadata; body renders on detail page. Blog source remains unpublished until its content pipeline is repaired.

Home uses a compact domino project deck: hover, tap, or keyboard focus reveals one project at a time. Desktop cards overlap horizontally; mobile uses stacked headers. Motion respects reduced-motion preferences and colors follow the active theme. The project archive retains the full two-column grid (one column below 768px), including outcomes and stack tags.

Kilat.host is featured with a real homepage screenshot captured in October 2026. The project archive uses one heading, shared with its project section; it renders as `h1` on the archive and `h2` on the homepage.

Employment is separate from projects: the homepage Work experience section states the current Senior Software Engineer role at FutureLab.my. The FutureLab case study is unpublished and excluded from project listings and public project routes.

Project deck browser self-check: `node scripts/check-project-deck.mjs /path/to/playwright/index.mjs [base-url]`.

## Development

```bash
yarn install
yarn dev
```

Quality gates:

```bash
yarn run check
yarn lint
yarn build
```

Motion browser self-check:

```bash
node scripts/check-motion.mjs /path/to/playwright/index.mjs
```

## Stack

- SvelteKit 2 and Svelte 5
- TypeScript
- Tailwind CSS 4
- mdsvex
- Motion
- Vercel adapter, Analytics, and Speed Insights

Content is local and version-controlled. No runtime CMS connection is required.
