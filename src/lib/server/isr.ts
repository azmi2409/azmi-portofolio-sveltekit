import type { RequestEvent } from '@sveltejs/kit';

const REVALIDATE_SECONDS = 60 * 60;
const STALE_SECONDS = 60 * 60 * 24;
const sharedPolicy = `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`;

export const isrHeaders = {
	'Cache-Control': 'public, max-age=0, must-revalidate',
	'CDN-Cache-Control': sharedPolicy,
	'Netlify-CDN-Cache-Control': `public, durable, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`
} as const;

/**
 * Cache an SSR response at the hosting CDN and refresh it in the background.
 * Netlify uses the durable cache directive; CDN-Cache-Control keeps the policy
 * portable for a later adapter migration.
 */
export function setIsrHeaders(setHeaders: RequestEvent['setHeaders']): void {
	setHeaders(isrHeaders);
}
