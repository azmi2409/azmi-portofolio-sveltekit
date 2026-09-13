<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import WorkingPrinciples from '$lib/components/sections/WorkingPrinciples.svelte';
	import IndependentWork from '$lib/components/sections/IndependentWork.svelte';
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Azmi Muwahid — AI & Automation Consultant</title>
	<meta
		name="description"
		content="I help businesses automate repetitive work, control operating costs, and improve customer service with practical AI and software. Consulting through delivery."
	/>
	<link rel="canonical" href="https://azmi.web.id" />
	<meta property="og:title" content="Azmi Muwahid — AI & Automation Consultant" />
	<meta
		property="og:description"
		content="Less busywork. More room to grow your business. Practical AI and automation consulting, from finding the opportunity to delivering the solution."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://azmi.web.id" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Azmi Muwahid — AI & Automation Consultant" />
	<meta
		name="twitter:description"
		content="Less busywork. More room to grow your business. Practical AI and automation consulting, from finding the opportunity to delivering the solution."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />
</svelte:head>

<HeroSection metrics={data.proofMetrics} />
<section class="px-6 pb-16" aria-labelledby="company-proof-heading">
	<div class="mx-auto max-w-7xl border-t border-border pt-8">
		<p id="company-proof-heading" class="text-center text-sm text-muted-foreground">
			Experience with teams from
		</p>
		<div class="mx-auto mt-6 grid max-w-3xl grid-cols-3 items-center gap-8">
			<img
				src="/assets/futurelab-logo.webp"
				alt="FutureLab"
				class="mx-auto max-h-9 max-w-full rounded bg-white px-2 py-1"
			/>
			<img
				src="/assets/toptal-logo.webp"
				alt="Toptal"
				class="mx-auto max-h-8 max-w-full rounded bg-white px-2 py-1"
			/>
			<img
				src="/assets/automa8e-wordmark.webp"
				alt="Automa8e"
				class="mx-auto max-h-9 max-w-full rounded bg-white px-2 py-1"
			/>
		</div>
	</div>
</section>
<WorkingPrinciples />
<ProjectsSection projects={data.featuredProjects} />
<IndependentWork />
<section class="px-6 py-24">
	<div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.65fr_1fr] lg:gap-20">
		<img
			src="/assets/profile.webp"
			alt="Azmi Muwahid in Seattle"
			width="819"
			height="1024"
			loading="lazy"
			class="max-h-96 w-full rounded-2xl object-cover object-[center_35%]"
		/>
		<div>
			<p class="eyebrow mb-5">About Azmi</p>
			<h2 class="text-4xl font-black tracking-tight sm:text-5xl">
				A partner who understands the problem and builds the solution.
			</h2>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				I’m Azmi, an AI and automation consultant with hands-on software delivery experience. I help
				teams turn “there must be a better way” into practical changes they can use, from reducing
				admin work to making online sales easier.
			</p>
			<p class="mt-4 text-lg leading-8 text-muted-foreground">
				Before software, I studied fisheries. It taught me to look at how one change affects the
				whole picture. In your business, that means considering your people, processes, budget, and
				customers before recommending a tool.
			</p>
			<a href="/about" class="button-secondary mt-6">More about me</a>
		</div>
	</div>
</section>
<ContactSection />
