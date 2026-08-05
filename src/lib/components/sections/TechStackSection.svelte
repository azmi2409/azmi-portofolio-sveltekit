<!--
  TechStackSection.svelte
  Horizontal marquee for tech logos and bento-grid for categories.
-->

<script lang="ts">
	import { Code, Layout, Cloud, Database, Brain, Zap } from '@lucide/svelte';

	type InviewOptions = {
		threshold?: number;
		rootMargin?: string;
		once?: boolean;
	};

	const TECH_CATEGORIES = [
		{
			name: 'The AI Edge',
			icon: Brain,
			skills: ['Agentic Workflows', 'RAG', 'Tool Calling', 'Vector Databases', 'LLM Orchestration']
		},
		{
			name: 'The Real-Time Layer',
			icon: Zap,
			skills: [
				'Binary Audio Streaming',
				'WebSockets',
				'Whisper (Transcription)',
				'Live State Management'
			]
		},
		{
			name: 'The Core Stack',
			icon: Code,
			skills: ['TypeScript 5', 'Ruby on Rails', 'Next.js 15 (App Router)', 'tRPC', 'SvelteKit']
		},
		{
			name: 'The Infra',
			icon: Cloud,
			skills: ['AWS (ECS/Lambda/S3)', 'Google Cloud', 'Terraform', 'Docker']
		},
		{ name: 'Languages', icon: Layout, skills: ['TypeScript', 'Ruby', 'Python', 'Go'] },
		{
			name: 'Databases',
			icon: Database,
			skills: ['PostgreSQL', 'Redis', 'Pinecone', 'Elasticsearch']
		}
	];

	// Marquee items
	const MARQUEE_ITEMS = [
		'TypeScript',
		'React',
		'SvelteKit',
		'Node.js',
		'Ruby on Rails',
		'PostgreSQL',
		'AWS',
		'Docker',
		'Tailwind CSS',
		'OpenAI'
	];

	let headerVisible = $state(false);
	let visibleCards = $state(new Set<number>());

	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						opts.onEnter();
						if (once) observer.disconnect();
					}
				}
			},
			{ threshold, rootMargin }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section id="tech-stack" class="relative overflow-hidden py-24 sm:py-32">
	<!-- Background glow accents -->
	<div
		class="pointer-events-none absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-zinc-500/10 opacity-50 blur-[120px]"
	></div>
	<div
		class="pointer-events-none absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-zinc-600/10 opacity-50 blur-[120px]"
	></div>

	<div class="mx-auto max-w-7xl px-6">
		<!-- Section Header -->
		<div
			class="mb-14 grid gap-6 transition-all duration-700 sm:mb-20 lg:grid-cols-[1fr_0.9fr] lg:items-end"
			use:inviewTrigger={{
				options: { threshold: 0.2 },
				onEnter: () => (headerVisible = true)
			}}
			style="
				opacity: {headerVisible ? 1 : 0};
				transform: translateY({headerVisible ? 0 : 24}px);
			"
		>
			<div>
				<div class="eyebrow mb-5">Working stack · 03</div>
				<h2 class="text-4xl font-black tracking-[-0.045em] text-zinc-50 sm:text-6xl">
					Tools follow the system.
				</h2>
			</div>
			<p class="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
				The tools I use when model behavior, product UX, backend reliability, and cost controls all
				matter.
			</p>
		</div>

		<!-- Infinite Marquee -->
		<div
			class="marquee-wrapper relative mb-20 flex overflow-hidden border-y border-white/[0.055] py-5"
		>
			<!-- Fade edges -->
			<div
				class="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-[#09090b] to-transparent sm:w-40"
			></div>
			<div
				class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#09090b] to-transparent sm:w-40"
			></div>

			<!-- Marquee track -->
			<div class="animate-marquee flex w-max items-center gap-8 pl-8 sm:gap-16 sm:pl-16">
				{#each [...MARQUEE_ITEMS, ...MARQUEE_ITEMS] as item}
					<div
						class="flex items-center justify-center font-mono text-sm font-medium tracking-[0.12em] whitespace-nowrap text-zinc-600 uppercase transition-colors hover:text-emerald-100/70 sm:text-base"
						style="font-family: var(--font-heading);"
					>
						{item}
					</div>
				{/each}
			</div>
		</div>

		<!-- Category Grid (Bento style) -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each TECH_CATEGORIES as category, index}
				{@const isVisible = visibleCards.has(index)}
				{@const Icon = category.icon}
				<div
					use:inviewTrigger={{
						onEnter: () => {
							visibleCards = new Set([...visibleCards, index]);
						}
					}}
					class="transition-all duration-500"
					style="
						transition-delay: {index * 100}ms;
						opacity: {isVisible ? 1 : 0};
						transform: translateY({isVisible ? 0 : 24}px);
					"
				>
					<div
						class="glass-card group flex h-full flex-col rounded-[1.35rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100/20 hover:shadow-[0_18px_45px_-24px_rgba(86,190,167,0.2)]"
					>
						<div class="mb-5 flex items-center gap-4">
							<div
								class="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100/10 bg-emerald-100/[0.055] text-emerald-100/70 transition-all duration-300 group-hover:scale-105 group-hover:text-emerald-100"
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
									class="rounded-lg border border-white/[0.05] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-zinc-50"
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
