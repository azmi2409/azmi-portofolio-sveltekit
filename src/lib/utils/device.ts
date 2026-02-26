/**
 * Device capability detection for 3D rendering decisions.
 * Used to determine whether to show the Hero 3D element or a static fallback.
 *
 * Requirements: 11.5, 11.6
 */

export interface DeviceCapabilities {
	webglAvailable: boolean;
	isLowEnd: boolean;
	hardwareConcurrency: number;
	deviceMemory: number | undefined;
}

/**
 * Check if WebGL is available by creating a temporary canvas
 * and attempting to get a WebGL context.
 * Returns false during SSR or if WebGL is not supported.
 */
export function isWebGLAvailable(): boolean {
	if (typeof document === 'undefined') return false;

	try {
		const canvas = document.createElement('canvas');
		const gl =
			canvas.getContext('webgl2') ||
			canvas.getContext('webgl');
		return gl !== null;
	} catch {
		return false;
	}
}

/**
 * Detect if the device is low-end based on hardware concurrency and device memory.
 * Low-end threshold: hardwareConcurrency <= 2 OR deviceMemory <= 2.
 * Returns false during SSR (safe default — capability check happens client-side).
 */
export function isLowEndDevice(): boolean {
	if (typeof navigator === 'undefined') return false;

	const cores = navigator.hardwareConcurrency;
	const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

	if (cores !== undefined && cores <= 2) return true;
	if (memory !== undefined && memory <= 2) return true;

	return false;
}

/**
 * Detect all device capabilities in one call.
 * Safe to call during SSR — returns conservative defaults.
 */
export function detectCapabilities(): DeviceCapabilities {
	const hardwareConcurrency =
		typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 0 : 0;
	const deviceMemory =
		typeof navigator !== 'undefined'
			? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
			: undefined;

	return {
		webglAvailable: isWebGLAvailable(),
		isLowEnd: isLowEndDevice(),
		hardwareConcurrency,
		deviceMemory
	};
}
