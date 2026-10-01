<script lang="ts">
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Azmi Muwahid</title>
	<meta
		name="description"
		content="See how Azmi helps businesses reduce manual work, simplify online sales, and improve customer experiences with AI and practical software."
	/>
	<meta property="og:title" content="Projects — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Real projects: the business challenge, how I helped, and what changed."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://azmi.web.id/projects" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects — Azmi Muwahid" />
	<meta
		name="twitter:description"
		content="See how Azmi helps businesses reduce manual work, simplify online sales, and improve customer experiences with AI and practical software."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />
	<link rel="canonical" href="https://azmi.web.id/projects" />

	<!-- JSON-LD: BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
			{ '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://azmi.web.id/projects' }
		]
	})}<\/script>`}
</svelte:head>

<ProjectsSection projects={data.projects} showArchiveLink={false} />
