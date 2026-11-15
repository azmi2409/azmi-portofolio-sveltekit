<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioMotion } from '$lib/motion';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import WorkingPrinciples from '$lib/components/sections/WorkingPrinciples.svelte';
	import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
	import CapabilityMarquee from '$lib/components/sections/CapabilityMarquee.svelte';

	let { data } = $props();

	const ossLibraries = [
		{ name: 'pocketbase-ruby', url: 'https://github.com/azmi2409/pocketbase-ruby' },
		{
			name: 'gopay-merchant-qris-gateway',
			url: 'https://github.com/azmi2409/gopay-merchant-qris-gateway'
		},
		{ name: 'rails-ai-gateway', url: 'https://github.com/azmi2409/rails-ai-gateway' },
		{ name: 'rails-crypto-payment', url: 'https://github.com/azmi2409/rails-crypto-payment' },
		{ name: 'rails-gopay-unofficial', url: 'https://github.com/azmi2409/rails-gopay-unofficial' },
		{ name: 'rails-mailer-sandbox', url: 'https://github.com/azmi2409/rails-mailer-sandbox' },
		{ name: 'jamboard', url: 'https://github.com/azmi2409/jamboard' },
		{ name: 'rails-shopee-qris', url: 'https://github.com/azmi2409/rails-shopee-qris' }
	];

	onMount(() => {
		const root = document.getElementById('hero')?.parentElement;
		if (root) return portfolioMotion(root).destroy;
	});
</script>

<svelte:head>
	<title>Azmi Muwahid — FutureLab & KilatBot</title>
	<meta
		name="description"
		content="Azmi Muwahid is a Senior Software Engineer at FutureLab (February 2023–present) and founder of KilatBot (KilatHost), AI agents for small business owners, through PT Kilat Inovasi Cerdas."
	/>
	<link rel="canonical" href="https://azmi.web.id" />
	<meta property="og:title" content="Azmi Muwahid — FutureLab & KilatBot" />
	<meta
		property="og:description"
		content="Senior Software Engineer at FutureLab and founder of KilatBot, also known as KilatHost. Based in Indonesia. Work email azmi@kilat.host."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://azmi.web.id" />
	<meta property="og:image" content="https://azmi.web.id/assets/profile.webp" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Azmi Muwahid — FutureLab & KilatBot" />
	<meta
		name="twitter:description"
		content="Senior Software Engineer at FutureLab and founder of KilatBot, also known as KilatHost. Based in Indonesia. Work email azmi@kilat.host."
	/>
	<meta name="twitter:image" content="https://azmi.web.id/assets/profile.webp" />
</svelte:head>

<HeroSection metrics={data.proofMetrics} />
<section class="px-6 pb-16" aria-labelledby="company-proof-heading">
	<div class="mx-auto max-w-7xl border-t border-border pt-8">
		<p
			id="company-proof-heading"
			class="text-center font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase"
		>
			Experience with teams from
		</p>
		<div class="logo-row mx-auto mt-6 grid max-w-4xl grid-cols-2 items-center gap-6 sm:grid-cols-4">
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
				src="/assets/turing-logo.webp"
				alt="Turing"
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
<CapabilityMarquee />
<section id="work" class="px-6 py-12" aria-labelledby="work-heading">
	<div class="mx-auto max-w-7xl">
		<p class="section-index mb-8"><b>(02)</b> Work experience</p>
		<div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-12">
			<div class="sm:col-span-2">
				<h2
					id="work-heading"
					class="max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
				>
					FutureLab and KilatBot
				</h2>
			</div>
			<div>
				<h3 class="text-xl font-bold">Senior Software Engineer, FutureLab.my</h3>
				<p class="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
					<span class="h-1.5 w-1.5 rounded-full bg-[var(--signal)]"></span>February 2023–present
				</p>
			</div>
			<div class="max-w-2xl">
				<p class="leading-7 text-muted-foreground">
					I’m currently a Senior Software Engineer at
					<a
						href="https://futurelab.my"
						target="_blank"
						rel="noreferrer"
						class="link-sweep text-foreground">FutureLab.my</a
					>. I own cloud infrastructure and deployment pipelines, maintain the Rails platform, and
					build AI agents for mentoring-session transcription, summaries, and reporting.
				</p>
			</div>
			<div class="border-t border-border sm:col-span-2" aria-hidden="true"></div>
			<div>
				<h3 class="text-xl font-bold">Founder, PT Kilat Inovasi Cerdas</h3>
				<p class="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
					<span class="h-1.5 w-1.5 rounded-full bg-[var(--signal)]"></span>2026–present
				</p>
			</div>
			<div class="max-w-2xl">
				<p class="leading-7 text-muted-foreground">
					I build
					<a
						href="https://kilatbot.com"
						target="_blank"
						rel="noreferrer"
						class="link-sweep text-foreground">KilatBot</a
					>, also known as
					<a
						href="https://kilat.host"
						target="_blank"
						rel="noreferrer"
						class="link-sweep text-foreground">KilatHost</a
					>: AI agents for small business owners. The company is an Indonesian PT Perseorangan based
					in Bogor. Agents start from a template, chat on the web or Telegram, and ask before risky
					steps.
				</p>
			</div>
		</div>
	</div>
</section>
<ProjectsSection projects={data.featuredProjects} compact />
<section class="px-6 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl">
		<p class="section-index mb-12"><b>(04)</b> About Azmi</p>
		<div class="grid items-center gap-10 md:grid-cols-[0.65fr_1fr] lg:gap-20">
			<div class="reveal-image about-photo overflow-hidden rounded-2xl">
				<img
					src="/assets/profile.webp"
					alt="Azmi Muwahid in Seattle"
					width="819"
					height="1024"
					loading="lazy"
					class="max-h-[28rem] w-full object-cover object-[center_35%]"
				/>
			</div>
			<div>
				<h2 class="text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-5xl">
					A partner who understands the problem and <span class="accent-serif text-muted-foreground"
						>builds the solution.</span
					>
				</h2>
				<p class="mt-6 text-lg leading-8 text-muted-foreground">
					I’m Azmi, a Senior Software Engineer at
					<a
						href="https://futurelab.my"
						target="_blank"
						rel="noreferrer"
						class="link-sweep text-foreground">FutureLab</a
					>
					and founder of
					<a
						href="https://kilatbot.com"
						target="_blank"
						rel="noreferrer"
						class="link-sweep text-foreground">KilatBot</a
					>, also known as KilatHost, through PT Kilat Inovasi Cerdas. KilatBot is AI agents for
					small business owners. I help teams turn “there must be a better way” into practical
					changes they can use, from reducing admin work to making online sales easier.
				</p>
				<p class="mt-4 text-lg leading-8 text-muted-foreground">
					Before software, I studied fisheries. It taught me to look at how one change affects the
					whole picture. In your business, that means considering your people, processes, budget,
					and customers before recommending a tool.
				</p>
				<p class="mt-4 text-sm leading-7 text-muted-foreground/70">
					I also contribute to open source in my spare time — upstream fixes across Rails, Devise
					and Sentient, plus a few libraries I maintain:
				</p>
				<div class="mt-4 border-t border-border/60 pt-4">
					<ul class="space-y-2">
						{#each ossLibraries as lib}
							<li class="text-sm">
								<a
									href={lib.url}
									target="_blank"
									rel="noreferrer"
									class="link-sweep text-foreground">{lib.name}</a
								>
							</li>
						{/each}
					</ul>
					<p class="mt-3 text-xs text-muted-foreground/70">
						<a
							href="https://github.com/azmi2409"
							target="_blank"
							rel="noreferrer"
							class="link-sweep text-foreground">More on GitHub</a
						>
					</p>
				</div>
				<a href="/about" class="button-secondary magnetic mt-8">More about me</a>
			</div>
		</div>
	</div>
</section>
<FaqSection />
<ContactSection />

<style>
	.logo-row img {
		filter: grayscale(1);
		opacity: 0.7;
		transition:
			filter 400ms ease,
			opacity 400ms ease,
			scale 400ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.logo-row img:hover {
		filter: none;
		opacity: 1;
		scale: 1.06;
	}

	.about-photo img {
		transition: scale 1.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (hover: hover) and (prefers-reduced-motion: no-preference) {
		.about-photo:hover img {
			scale: 1.04;
		}
	}
</style>
