// Theme store for managing dark/light mode state
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Check for saved theme preference or default to 'dark'
const defaultTheme = 'dark';
const initialTheme = browser ? (localStorage.getItem('theme') ?? defaultTheme) : defaultTheme;

// Create writable store for theme
export const theme = writable<'light' | 'dark'>(initialTheme as 'light' | 'dark');

// Function to toggle between light and dark themes
export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';

		// Save to localStorage if in browser
		if (browser) {
			localStorage.setItem('theme', newTheme);
			// Update document class for CSS
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
		}

		return newTheme;
	});
}

// Initialize theme on store creation
if (browser) {
	theme.subscribe((value) => {
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
