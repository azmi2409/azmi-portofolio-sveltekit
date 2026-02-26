/**
 * Svelte action for scroll-triggered animations using IntersectionObserver.
 *
 * Usage:
 *   <div use:inview={{ threshold: 0.2, once: true }} oninview={handleInview}>
 *
 * Dispatches a custom 'inview' event when the element enters the viewport.
 * Supports threshold, rootMargin, and once options.
 */

export interface InviewOptions {
	/** Percentage of element visible to trigger (0–1). Default: 0 */
	threshold?: number;
	/** Margin around root for early/late triggering. Default: '0px' */
	rootMargin?: string;
	/** If true, disconnect observer after first trigger. Default: false */
	once?: boolean;
}

export function inview(node: HTMLElement, options: InviewOptions = {}) {
	const { threshold = 0, rootMargin = '0px', once = false } = options;

	let observer: IntersectionObserver | null = null;

	function createObserver() {
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.dispatchEvent(new CustomEvent('inview', { detail: { entry } }));

						if (once && observer) {
							observer.disconnect();
							observer = null;
						}
					}
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(node);
	}

	createObserver();

	return {
		destroy() {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		}
	};
}
