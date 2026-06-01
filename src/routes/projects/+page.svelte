<script lang="ts">
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Azmi Muwahid</title>
	<meta
		name="description"
		content="Case studies on agentic AI workflows, realtime interfaces, SvelteKit, Rails, and production product engineering by Azmi Muwahid."
	/>
	<meta property="og:title" content="Projects — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Deep technical case studies with problem, constraints, architecture, decisions, and outcomes."
	/>
	<meta property="og:url" content="https://azmi.web.id/projects" />
	<meta property="og:image" content="https://azmi.web.id/logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects — Azmi Muwahid" />
	<meta name="twitter:image" content="https://azmi.web.id/logo.png" />
	<link rel="canonical" href="https://azmi.web.id/projects" />
</svelte:head>

<section class="px-6 pb-4 pt-32">
	<div class="mx-auto max-w-6xl">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
			Project archive
		</p>
		<h1 class="max-w-4xl text-5xl font-black tracking-tight text-zinc-50 sm:text-7xl">
			Case studies for AI product systems.
		</h1>
		<p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
			A deeper look at shipped work, prototypes, constraints, and decisions.
		</p>
	</div>
</section>

<ProjectsSection projects={data.projects} />
