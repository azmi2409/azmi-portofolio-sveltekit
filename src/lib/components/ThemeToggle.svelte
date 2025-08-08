<script lang="ts">
	// Theme toggle component for switching between light and dark modes
	import { Sun, Moon } from '@lucide/svelte';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	// Handle theme toggle with smooth transition
	function handleToggle() {
		// Add transition class temporarily
		document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

		toggleTheme();

		// Remove transition after animation
		setTimeout(() => {
			document.documentElement.style.transition = '';
		}, 300);
	}

	// Ensure theme is applied on mount
	onMount(() => {
		const currentTheme = $theme;
		document.documentElement.classList.toggle('dark', currentTheme === 'dark');
	});
</script>

<button
	on:click={handleToggle}
	class="group relative rounded-lg border border-border bg-background/80 p-2 backdrop-blur-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
	aria-label="Toggle theme"
>
	<!-- Sun icon for light mode -->
	<Sun
		class="h-5 w-5 transition-all duration-300 {$theme === 'dark'
			? 'scale-0 rotate-90'
			: 'scale-100 rotate-0'}"
	/>

	<!-- Moon icon for dark mode -->
	<Moon
		class="absolute inset-2 h-5 w-5 transition-all duration-300 {$theme === 'dark'
			? 'scale-100 rotate-0'
			: 'scale-0 -rotate-90'}"
	/>

	<!-- Hover effect -->
	<div
		class="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
	></div>
</button>

<style>
	/* Ensure smooth icon transitions */
	button {
		position: relative;
		overflow: hidden;
	}
</style>
