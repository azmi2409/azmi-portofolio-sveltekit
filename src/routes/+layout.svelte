<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import GtmScript from '$lib/components/GtmScript.svelte';
	import { initTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Initialize tri-state theme system on mount
	onMount(() => {
		const cleanup = initTheme();
		return cleanup;
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<title>Azmi Muwahid — Senior Full Stack Engineer</title>
	<meta
		name="description"
		content="Portfolio of Azmi Muwahid, Senior Full Stack Engineer specializing in AI-powered EdTech solutions. Building scalable web applications with TypeScript, SvelteKit, React, and AWS."
	/>
	<meta property="og:title" content="Azmi Muwahid — Senior Full Stack Engineer" />
	<meta
		property="og:description"
		content="Portfolio of Azmi Muwahid, Senior Full Stack Engineer specializing in AI-powered EdTech solutions. Building scalable web applications with TypeScript, SvelteKit, React, and AWS."
	/>
	<meta property="og:url" content="https://azmi.web.id" />
</svelte:head>

<GtmScript />
<Navigation />
<main class="overflow-x-hidden">
	{@render children?.()}
</main>
