import type { RequestEvent } from '@sveltejs/kit';

const REVALIDATE_SECONDS = 60 * 60;
const STALE_SECONDS = 60 * 60 * 24;

export const isrHeaders = {
	'Cache-Control': `public, max-age=0, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`
} as const;

/**
 * Cache an SSR response at the hosting CDN and refresh it in the background.
 * Vercel respects the shared-cache directives while keeping browser caching at
 * zero, so content changes can be picked up on the next request after refresh.
 */
export function setIsrHeaders(setHeaders: RequestEvent['setHeaders']): void {
	setHeaders(isrHeaders);
}
