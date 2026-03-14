<!--
  TechStackSection.svelte
  Horizontal marquee for tech logos and bento-grid for categories.
-->

<script lang="ts">
	import { Code, Layout, Server, Cloud, Database, Brain, Zap } from '@lucide/svelte';
	import type { InviewOptions } from '$lib/actions/inview';
	import { onMount } from 'svelte';

	const TECH_CATEGORIES = [
		{ name: 'The AI Edge', icon: Brain, skills: ['Agentic Workflows', 'RAG', 'Tool Calling', 'Vector Databases', 'LLM Orchestration'] },
		{ name: 'The Real-Time Layer', icon: Zap, skills: ['Binary Audio Streaming', 'WebSockets', 'Whisper (Transcription)', 'Live State Management'] },
		{ name: 'The Core Stack', icon: Code, skills: ['TypeScript 5', 'Ruby on Rails', 'Next.js 15 (App Router)', 'tRPC', 'SvelteKit'] },
		{ name: 'The Infra', icon: Cloud, skills: ['AWS (ECS/Lambda/S3)', 'Google Cloud', 'Terraform', 'Docker'] },
		{ name: 'Languages', icon: Layout, skills: ['TypeScript', 'Ruby', 'Python', 'Go'] },
		{ name: 'Databases', icon: Database, skills: ['PostgreSQL', 'Redis', 'Pinecone', 'Elasticsearch'] }
	];

	// Marquee items
	const MARQUEE_ITEMS = [
		'TypeScript', 'React', 'SvelteKit', 'Node.js', 'Ruby on Rails',
		'PostgreSQL', 'AWS', 'Docker', 'Tailwind CSS', 'OpenAI',
		'TypeScript', 'React', 'SvelteKit', 'Node.js', 'Ruby on Rails' // Duplicated for seamless loop
	];

	let headerVisible = $state(false);
	let visibleCards = $state(new Set<number>());

	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					opts.onEnter();
					if (once) observer.disconnect();
				}
			}
		}, { threshold, rootMargin });
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}
</script>

<section id="tech-stack" class="relative py-24 sm:py-32 overflow-hidden">
	<!-- Background glow accents -->
	<div class="pointer-events-none absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-zinc-500/10 opacity-50 blur-[120px]"></div>
	<div class="pointer-events-none absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-zinc-600/10 opacity-50 blur-[120px]"></div>

	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div
			class="mb-16 text-center transition-all duration-700 sm:mb-20"
			use:inviewTrigger={{
				options: { threshold: 0.2 },
				onEnter: () => (headerVisible = true)
			}}
			style="
				opacity: {headerVisible ? 1 : 0};
				transform: translateY({headerVisible ? 0 : 24}px);
			"
		>
			<h2
				class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
				style="font-family: var(--font-heading); color: #f8fafc;"
			>
				My <span class="gradient-text">Arsenal</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-400">
				The tools I use to build robust, scalable, and award-winning products.
			</p>
		</div>

		<!-- Infinite Marquee -->
		<div class="marquee-wrapper relative mb-24 flex overflow-hidden py-4">
			<!-- Fade edges -->
			<div class="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[#0f172a] to-transparent sm:w-40"></div>
			<div class="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[#0f172a] to-transparent sm:w-40"></div>

			<!-- Marquee track -->
			<div class="animate-marquee flex w-max items-center gap-8 pl-8 sm:gap-16 sm:pl-16">
				{#each MARQUEE_ITEMS as item}
					<div
						class="flex items-center justify-center whitespace-nowrap text-xl font-bold tracking-tight text-slate-500 transition-colors hover:text-zinc-300 sm:text-3xl"
						style="font-family: var(--font-heading);"
					>
						{item}
					</div>
				{/each}
			</div>
		</div>

		<!-- Category Grid (Bento style) -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each TECH_CATEGORIES as category, index}
				{@const isVisible = visibleCards.has(index)}
				{@const Icon = category.icon}
				<div
					use:inviewTrigger={{ onEnter: () => { visibleCards = new Set([...visibleCards, index]); } }}
					class="transition-all duration-500"
					style="
						transition-delay: {index * 100}ms;
						opacity: {isVisible ? 1 : 0};
						transform: translateY({isVisible ? 0 : 24}px);
					"
				>
					<div
						class="glass-card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300"
						onmouseenter={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.borderColor = 'rgba(255,255,255,0.3)';
							el.style.boxShadow = '0 8px 32px -8px rgba(255,255,255,0.15)';
							el.style.transform = 'translateY(-4px)';
						}}
						onmouseleave={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.borderColor = 'rgba(255,255,255,0.07)';
							el.style.boxShadow = 'none';
							el.style.transform = 'translateY(0)';
						}}
					>
						<div class="mb-5 flex items-center gap-4">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
								style="background: rgba(255,255,255,0.1); color: #fafafa;"
							>
								<Icon class="h-6 w-6" />
							</div>
							<h3 class="text-xl font-bold text-white" style="font-family: var(--font-heading);">
								{category.name}
							</h3>
						</div>

						<div class="flex flex-wrap gap-2">
							{#each category.skills as skill}
								<span
									class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200"
									style="background: rgba(255,255,255,0.04); color: #94a3b8; border: 1px solid rgba(255,255,255,0.05);"
									onmouseenter={(e) => {
										const el = e.currentTarget as HTMLElement;
										el.style.background = 'rgba(255,255,255,0.1)';
										el.style.color = '#fafafa';
										el.style.borderColor = 'rgba(255,255,255,0.2)';
									}}
									onmouseleave={(e) => {
										const el = e.currentTarget as HTMLElement;
										el.style.background = 'rgba(255,255,255,0.04)';
										el.style.color = '#94a3b8';
										el.style.borderColor = 'rgba(255,255,255,0.05)';
									}}
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
