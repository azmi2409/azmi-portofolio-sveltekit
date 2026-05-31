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
	<meta property="og:title" content="Azmi Muwahid — AI Systems Engineer" />
	<meta
		property="og:description"
		content="Case studies, experiments, and systems thinking from an engineer shipping credible AI product workflows."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://azmi.web.id" />
</svelte:head>

<HeroSection metrics={data.proofMetrics} />
<AgenticWorkflowMap />
<TechStackSection />
<ProjectsSection projects={data.featuredProjects} />
<ContactSection />
