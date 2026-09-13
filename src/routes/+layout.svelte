<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import GtmScript from '$lib/components/GtmScript.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { sameAsUrls } from '$lib/config/socialLinks';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
	let { children } = $props();
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Azmi Muwahid',
		url: 'https://azmi.web.id',
		jobTitle: 'AI & Automation Consultant',
		description:
			'Helping businesses automate repetitive work, control operating costs, and improve customer service with practical AI and software.',
		email: 'azmimuwahid@gmail.com',
		sameAs: sameAsUrls,
		knowsAbout: [
			'Business process automation',
			'AI consulting',
			'Customer experience',
			'Online commerce',
			'Software delivery'
		]
	};
</script>

<svelte:head>
	<link rel="icon" href="/favicon.webp" type="image/webp" />
	<link rel="shortcut icon" href="/favicon.webp" />
	<meta name="theme-color" content="#09090b" />
	<meta name="author" content="Azmi Muwahid" />
	<meta name="robots" content="index, follow" />
	<meta property="og:site_name" content="Azmi Muwahid — AI & Automation Consultant" />
	<meta property="og:locale" content="en_US" />
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`}
</svelte:head>

<GtmScript />
<Navigation />
<main class="overflow-x-hidden">{@render children?.()}</main>
<Footer />
