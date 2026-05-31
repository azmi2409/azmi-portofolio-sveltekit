<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<!-- Fallback title — child pages override this with their own full SEO -->
	<title>Blog — Azmi Muwahid</title>
</svelte:head>

<main class="min-h-screen overflow-x-hidden">
	{@render children?.()}
</main>
