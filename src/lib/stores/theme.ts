// Theme store for managing tri-state theme mode (auto/light/dark)
import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';
const CYCLE_ORDER: ThemeMode[] = ['auto', 'light', 'dark'];
const VALID_MODES = new Set<string>(CYCLE_ORDER);

/**
 * Resolve a ThemeMode to a concrete light/dark value.
 * Exported for testability.
 */
export function resolveTheme(mode: ThemeMode, osPrefersDark: boolean): ResolvedTheme {
	if (mode === 'light') return 'light';
	if (mode === 'dark') return 'dark';
	// mode === 'auto'
	return osPrefersDark ? 'dark' : 'light';
}

/**
 * Read the persisted mode from localStorage, defaulting to 'auto'
 * on missing, corrupted, or unavailable storage.
 */
function loadMode(): ThemeMode {
	if (!browser) return 'auto';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && VALID_MODES.has(stored)) return stored as ThemeMode;
	} catch {
		// localStorage may throw (e.g. SecurityError in some contexts)
	}
	return 'auto';
}

/** Persist mode to localStorage (no-op outside browser). */
function persistMode(mode: ThemeMode): void {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, mode);
	} catch {
		// Silently ignore write failures
	}
}

/** Query the OS dark-mode preference. Returns false when matchMedia is unavailable (SSR). */
function getOsPrefersDark(): boolean {
	if (!browser || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// ── Stores ──────────────────────────────────────────────────────────

/** The user-selected mode (auto | light | dark). */
export const mode = writable<ThemeMode>(loadMode());

/** The resolved theme that is actually applied (light | dark). */
export const resolvedTheme = writable<ResolvedTheme>(
	resolveTheme(loadMode(), getOsPrefersDark())
);

// ── matchMedia listener management ──────────────────────────────────

let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((e: MediaQueryListEvent) => void) | null = null;

function addMediaListener(): void {
	if (!browser || typeof window.matchMedia !== 'function') return;
	removeMediaListener(); // ensure no duplicates
	mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaListener = (e: MediaQueryListEvent) => {
		// Only update resolved theme if still in auto mode
		if (get(mode) === 'auto') {
			const resolved = e.matches ? 'dark' : 'light';
			resolvedTheme.set(resolved);
			applyThemeToDOM(resolved);
		}
	};
	mediaQuery.addEventListener('change', mediaListener);
}

function removeMediaListener(): void {
	if (mediaQuery && mediaListener) {
		mediaQuery.removeEventListener('change', mediaListener);
	}
	mediaQuery = null;
	mediaListener = null;
}

// ── DOM application ─────────────────────────────────────────────────

function applyThemeToDOM(theme: ResolvedTheme): void {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Cycle through modes: auto → light → dark → auto.
 */
export function cycleMode(): void {
	mode.update((current) => {
		const idx = CYCLE_ORDER.indexOf(current);
		const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
		return next;
	});
}

/**
 * Compute the next mode in the cycle (pure function, exported for testing).
 */
export function getNextMode(current: ThemeMode): ThemeMode {
	const idx = CYCLE_ORDER.indexOf(current);
	return CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
}

/**
 * Initialize the theme system. Call once on the client (e.g. in +layout.svelte onMount).
 * Sets up the mode subscription that keeps resolvedTheme, localStorage, DOM, and
 * the matchMedia listener in sync.
 */
export function initTheme(): () => void {
	// Apply the initial resolved theme to the DOM immediately
	const initialResolved = resolveTheme(get(mode), getOsPrefersDark());
	resolvedTheme.set(initialResolved);
	applyThemeToDOM(initialResolved);

	// If starting in auto mode, attach the OS preference listener
	if (get(mode) === 'auto') {
		addMediaListener();
	}

	// Subscribe to mode changes to keep everything in sync
	const unsubscribe = mode.subscribe((currentMode) => {
		persistMode(currentMode);

		const resolved = resolveTheme(currentMode, getOsPrefersDark());
		resolvedTheme.set(resolved);
		applyThemeToDOM(resolved);

		if (currentMode === 'auto') {
			addMediaListener();
		} else {
			removeMediaListener();
		}
	});

	return () => {
		unsubscribe();
		removeMediaListener();
	};
}
