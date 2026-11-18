<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import GtmScript from '$lib/components/GtmScript.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { personalEmail, sameAsUrls, workEmail } from '$lib/config/socialLinks';
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
		'@id': 'https://azmi.web.id/#person',
		name: 'Azmi Muwahid',
		url: 'https://azmi.web.id',
		image: 'https://azmi.web.id/assets/profile.webp',
		jobTitle: [
			'AI & Automation Consultant',
			'Senior Software Engineer at FutureLab',
			'Founder of KilatBot'
		],
		description:
			'Senior Software Engineer at FutureLab (February 2023–present) and founder of KilatBot (also known as KilatHost), AI agents for small business owners, through PT Kilat Inovasi Cerdas. Full-stack engineer based in Indonesia.',
		email: [workEmail, personalEmail],
		sameAs: sameAsUrls,
		worksFor: [
			{
				'@type': 'Organization',
				name: 'FutureLab',
				url: 'https://futurelab.my'
			},
			{
				'@type': 'Organization',
				name: 'PT Kilat Inovasi Cerdas',
				alternateName: ['KilatBot', 'KilatHost'],
				url: 'https://kilatbot.com'
			}
		],
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
		areaServed: [
			{ '@type': 'City', name: 'Jakarta' },
			{ '@type': 'Country', name: 'Indonesia' }
		],
		knowsAbout: [
			'AI agents',
			'AI automation consulting',
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
			'Portfolio of Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot.',
		author: { '@type': 'Person', name: 'Azmi Muwahid', url: 'https://azmi.web.id' },
		inLanguage: 'en'
	};
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'PT Kilat Inovasi Cerdas',
		alternateName: ['KilatBot', 'KilatHost'],
		url: 'https://kilatbot.com',
		email: 'support@kilat.host',
		telephone: '+62-812-9770-8306',
		foundingDate: '2026',
		description:
			'Indonesian PT Perseorangan based in Bogor. Operates KilatBot, also known as KilatHost: AI agents for small business owners.',
		founder: {
			'@type': 'Person',
			name: 'Azmi Muwahid',
			url: 'https://azmi.web.id',
			email: workEmail
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'JL H. Abdullah RT 001/RW 001, Kel. Kayumanis, Kec. Tanah Sareal',
			addressLocality: 'Kota Bogor',
			addressRegion: 'Jawa Barat',
			postalCode: '16169',
			addressCountry: 'ID'
		},
		identifier: [
			{ '@type': 'PropertyValue', name: 'NIB', value: '1910260001491' },
			{ '@type': 'PropertyValue', name: 'PSE (PB UMKU)', value: '191026000149100000001' }
		],
		sameAs: ['https://kilat.host', 'https://kilatbot.com', 'https://x.com/kilatbot']
	};
</script>

<svelte:head>
	<link rel="icon" href="/favicon.webp" type="image/webp" />
	<link rel="shortcut icon" href="/favicon.webp" />
	<meta name="theme-color" content="#09090b" />
	<meta name="author" content="Azmi Muwahid" />
	<meta name="robots" content="index, follow" />
	<meta property="og:site_name" content="Azmi Muwahid" />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:creator" content="@azmikaze" />
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`}
</svelte:head>

<GtmScript />
<a href="#main-content" class="skip-link">Skip to content</a>
<Navigation />
<main id="main-content" tabindex="-1" class="overflow-x-clip">{@render children?.()}</main>
<Footer />
