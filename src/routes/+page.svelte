<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import TechStackSection from '$lib/components/sections/TechStackSection.svelte';
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import AgenticWorkflowMap from '$lib/components/sections/AgenticWorkflowMap.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Azmi Muwahid — AI Systems Engineer</title>
	<meta
		name="description"
		content="Senior full stack engineer building agentic workflows, RAG systems, and real-time AI product interfaces with SvelteKit, Rails, TypeScript, and cloud infrastructure."
	/>
	<link rel="canonical" href="https://azmi.web.id" />
	<meta property="og:title" content="Azmi Muwahid — AI Systems Engineer" />
	<meta
		property="og:description"
		content="Case studies, experiments, and systems thinking from an engineer shipping credible AI product workflows."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://azmi.web.id" />
	<meta property="og:image" content="https://azmi.web.id/logo.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Azmi Muwahid — AI Systems Engineer" />
	<meta
		name="twitter:description"
		content="Case studies, experiments, and systems thinking from an engineer shipping credible AI product workflows."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/logo.png" />
</svelte:head>

<HeroSection metrics={data.proofMetrics} />
<AgenticWorkflowMap />
<TechStackSection />
<ProjectsSection projects={data.featuredProjects} />
<ContactSection />
