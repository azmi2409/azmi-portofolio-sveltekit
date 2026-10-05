<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import GtmScript from '$lib/components/GtmScript.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { sameAsUrls } from '$lib/config/socialLinks';
	import { dev } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { magnetic } from '$lib/magnetic';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
	let { children } = $props();
	onMount(magnetic);
	// A navigation parked inside a view transition can otherwise render after a
	// newer one (e.g. a quick Back), so later navigations wait for its DOM update.
	let pendingUpdate: Promise<unknown> | null = null;
	onNavigate((navigation) => {
		if (pendingUpdate) return pendingUpdate.then(() => undefined);
		if (
			!document.startViewTransition ||
			navigation.from?.url.pathname === navigation.to?.url.pathname ||
			matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;
		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				// A superseded navigation rejects with "navigation aborted"; that is expected.
				await navigation.complete.catch(() => {});
			});
			const update = transition.updateCallbackDone.finally(() => {
				if (pendingUpdate === update) pendingUpdate = null;
			});
			pendingUpdate = update;
		});
	});
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Azmi Muwahid',
		url: 'https://azmi.web.id',
		image: 'https://azmi.web.id/assets/profile.webp',
		jobTitle: 'Senior Software Engineer',
		description:
			'Senior software engineer and AI consultant based in Indonesia. Builds AI agents, manages cloud infrastructure, and helps businesses automate repetitive work with practical software.',
		email: 'azmimuwahid@gmail.com',
		sameAs: sameAsUrls,
		worksFor: {
			'@type': 'Organization',
			name: 'FutureLab',
			url: 'https://futurelab.my'
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Bogor',
			addressRegion: 'West Java',
			addressCountry: 'ID'
		},
		alumniOf: {
			'@type': 'EducationalOrganization',
			name: 'Institut Pertanian Bogor (IPB)'
		},
		knowsAbout: [
			'AI agents',
			'Cloud infrastructure',
			'AWS',
			'Business process automation',
			'Full-stack development',
			'Ruby on Rails',
			'SvelteKit',
			'TypeScript',
			'AI consulting',
			'Software delivery'
		],
		knowsLanguage: ['en', 'id']
	};
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Azmi Muwahid',
		url: 'https://azmi.web.id',
		description:
			'Portfolio and case studies by Azmi Muwahid, senior software engineer and AI consultant.',
		author: { '@type': 'Person', name: 'Azmi Muwahid', url: 'https://azmi.web.id' },
		inLanguage: 'en'
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
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`}
</svelte:head>

<GtmScript />
<a href="#main-content" class="skip-link">Skip to content</a>
<Navigation />
<main id="main-content" tabindex="-1" class="overflow-x-clip">{@render children?.()}</main>
<Footer />
