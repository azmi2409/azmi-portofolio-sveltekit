# Azmi Muwahid Portfolio

SvelteKit portfolio for AI, automation, and software delivery work.

## Content

- Blog posts: `src/content/blog/*.mdx`
- Project case studies: `src/content/projects/*.mdx`
- Lab experiments: `src/lib/data/experiments.ts`

MDX filename becomes route slug. Frontmatter drives listing metadata; body renders on detail page.

## Development

```bash
yarn install
yarn dev
```

Quality gates:

```bash
yarn check
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
