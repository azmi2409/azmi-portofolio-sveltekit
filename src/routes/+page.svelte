<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import TechStackSection from '$lib/components/sections/TechStackSection.svelte';
	import GitHubStatsSection from '$lib/components/sections/GitHubStatsSection.svelte';
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { data } = $props();
</script>

<HeroSection />
<TechStackSection />
<GitHubStatsSection stats={data.githubStats} />
<ProjectsSection />
<ContactSection />
<Footer />
