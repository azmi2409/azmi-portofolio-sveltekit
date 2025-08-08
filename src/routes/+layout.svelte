<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	let { children } = $props();

	// Initialize theme on mount
	onMount(() => {
		if (browser) {
			// Apply saved theme or default
			const savedTheme = localStorage.getItem('theme') || 'light';
			theme.set(savedTheme as 'light' | 'dark');
			document.documentElement.classList.toggle('dark', savedTheme === 'dark');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation />
{@render children?.()}
