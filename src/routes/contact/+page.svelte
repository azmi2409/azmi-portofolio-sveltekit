<script lang="ts">
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
</script>

<svelte:head>
	<title>Contact — Azmi Muwahid</title>
	<meta
		name="description"
		content="Contact Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot. Work email azmi@kilat.host, or azmimuwahid@gmail.com."
	/>
	<link rel="canonical" href="https://azmi.web.id/contact" />
	<meta property="og:title" content="Contact — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Contact Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot. Work email azmi@kilat.host, or azmimuwahid@gmail.com."
	/>
	<meta property="og:url" content="https://azmi.web.id/contact" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Contact — Azmi Muwahid" />
	<meta
		name="twitter:description"
		content="Contact Azmi Muwahid, Senior Software Engineer at FutureLab and founder of KilatBot. Work email azmi@kilat.host, or azmimuwahid@gmail.com."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />

	<!-- JSON-LD: BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
			{ '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://azmi.web.id/contact' }
		]
	})}<\/script>`}
</svelte:head>

<div class="pt-16">
	<ContactSection standalone />
</div>
