<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Fallback title — child pages override this with their own full SEO -->
	<title>Blog — Azmi Muwahid</title>
</svelte:head>

<Navigation />
<main class="min-h-screen overflow-x-hidden">
	{@render children?.()}
</main>
<Footer />
