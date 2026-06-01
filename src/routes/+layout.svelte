<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import GtmScript from '$lib/components/GtmScript.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { initTheme } from '$lib/stores/theme';
	import { sameAsUrls } from '$lib/config/socialLinks';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Initialize tri-state theme system on mount
	onMount(() => {
		const cleanup = initTheme();
		return cleanup;
	});

	const BASE_URL = 'https://azmi.web.id';
	const OG_IMAGE = `${BASE_URL}/logo.png`;

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Azmi Muwahid',
		url: BASE_URL,
		jobTitle: 'AI Systems Engineer',
		description:
			'Senior full stack engineer building agentic workflows, RAG systems, and real-time AI product interfaces.',
		email: 'azmimuwahid@gmail.com',
		knowsAbout: [
			'AI Systems Engineering',
			'Agentic Workflows',
			'RAG (Retrieval-Augmented Generation)',
			'SvelteKit',
			'Ruby on Rails',
			'TypeScript',
			'Cloud Infrastructure'
		],
		sameAs: sameAsUrls
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Azmi Muwahid',
		url: BASE_URL,
		description: 'Portfolio of Azmi Muwahid — AI Systems Engineer & Full Stack Product Builder'
	};
</script>

<svelte:head>
	<!-- Core -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/favicon.ico" />
	<meta name="theme-color" content="#09090b" />

	<!-- Primary SEO -->
	<title>Azmi Muwahid — AI Systems Engineer & Full Stack Product Builder</title>
	<meta
		name="description"
		content="Senior full stack engineer building agentic workflows, RAG systems, and real-time AI product interfaces with SvelteKit, Rails, TypeScript, and cloud infrastructure."
	/>
	<meta
		name="keywords"
		content="AI systems engineer, agentic workflows, RAG, SvelteKit, Ruby on Rails, TypeScript, full stack engineer, portfolio, Azmi Muwahid"
	/>
	<meta name="author" content="Azmi Muwahid" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={BASE_URL} />

	<!-- Open Graph -->
	<meta property="og:site_name" content="Azmi Muwahid" />
	<meta property="og:title" content="Azmi Muwahid — AI Systems Engineer" />
	<meta
		property="og:description"
		content="Senior full stack engineer building agentic workflows, RAG systems, and real-time AI product interfaces."
	/>
	<meta property="og:url" content={BASE_URL} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Azmi Muwahid — AI Systems Engineer portfolio" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter / X Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Azmi Muwahid — AI Systems Engineer" />
	<meta
		name="twitter:description"
		content="Senior full stack engineer building agentic workflows, RAG systems, and real-time AI product interfaces."
	/>
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Azmi Muwahid — AI Systems Engineer portfolio" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`}
</svelte:head>

<GtmScript />
<Navigation />
<main class="overflow-x-hidden">
	{@render children?.()}
</main>
<Footer />
