<script lang="ts">
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import { faqPageSchema } from '$lib/data/faq';
</script>

<svelte:head>
	<title>Questions — Azmi Muwahid</title>
	<meta
		name="description"
		content="Answers about Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot, what KilatBot is, who it is for, and how to contact him."
	/>
	<link rel="canonical" href="https://azmi.web.id/faq" />
	<meta property="og:title" content="Questions — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Answers about Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot, what KilatBot is, who it is for, and how to contact him."
	/>
	<meta property="og:url" content="https://azmi.web.id/faq" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Questions — Azmi Muwahid" />
	<meta
		name="twitter:description"
		content="Answers about Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot, what KilatBot is, who it is for, and how to contact him."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />

	{@html `<script type="application/ld+json">${JSON.stringify(faqPageSchema())}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
			{ '@type': 'ListItem', position: 2, name: 'Questions', item: 'https://azmi.web.id/faq' }
		]
	})}<\/script>`}
</svelte:head>

<div class="pt-16">
	<FaqSection standalone />
</div>
