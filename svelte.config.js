import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: ['.svelte', '.mdx'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.mdx'] })],
	kit: { adapter: adapter({ runtime: 'nodejs24.x' }) }
};

export default config;
