<!--
  ProjectsSection.svelte
  Bento-grid project layout with glassmorphism cards and hover overlays.
-->

<script lang="ts">
	import { ExternalLink, Github, ArrowUpRight } from '@lucide/svelte';
	import type { InviewOptions } from '$lib/actions/inview';
	import { onMount } from 'svelte';

	interface Project {
		title: string;
		description: string;
		techTags: string[];
		liveUrl?: string;
		sourceUrl?: string;
		featured: boolean;
		imageColor: string;
	}

	const PROJECTS: Project[] = [
		{
			title: 'Codexia Live',
			description: 'Lead Engineer & Architect. Engineered a custom Agentic Coaching Engine that monitors user anxiety (typing pauses/silence signals) and intervenes with progressive hints. Built on a Google Cloud Run stack using WebSockets for binary audio streaming.',
			techTags: ['Agentic AI', 'WebSockets', 'Google Cloud Run', 'TypeScript', 'Binary Audio'],
			featured: true,
			imageColor: 'from-zinc-500/20 to-zinc-700/20'
		},
		{
			title: 'FutureLab.my',
			description: 'Senior Fullstack Engineer. Architected an AI transcription and summarization pipeline using GPT-4 and RSpec-tested Rails services. Boosted B2B sales by 30% and slashed monthly cloud spend by 50% via aggressive AWS optimization.',
			techTags: ['Ruby on Rails', 'GPT-4', 'AWS', 'RSpec', 'PostgreSQL'],
			featured: true,
			imageColor: 'from-slate-500/20 to-zinc-800/20'
		},
		{
			title: 'Scalable LMS Platform',
			description: 'High-performance Learning Management System processing 50k+ daily events. Reduced AWS costs by 40% through infrastructure optimization and query tuning.',
			techTags: ['SvelteKit', 'TypeScript', 'Docker', 'Terraform'],
			featured: false,
			imageColor: 'from-zinc-400/10 to-zinc-600/10'
		}
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

<section id="projects" class="relative py-24 sm:py-32">
	<!-- Background decoration -->
	<div class="pointer-events-none absolute right-0 top-1/2 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-zinc-500/5 blur-[120px]"></div>

	<div class="mx-auto max-w-6xl px-6 relative z-10">
		<!-- Section Header -->
		<div
			class="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end transition-all duration-700"
			use:inviewTrigger={{ options: { threshold: 0.2 }, onEnter: () => (headerVisible = true) }}
			style="opacity: {headerVisible ? 1 : 0}; transform: translateY({headerVisible ? 0 : 24}px);"
		>
			<div class="max-w-2xl">
				<h2
					class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
					style="font-family: var(--font-heading); color: #f8fafc;"
				>
					Featured <span class="gradient-text">Case Studies</span>
				</h2>
				<p class="text-lg text-slate-400">
					A deep dive into technical challenges and high-impact solutions engineered for complexity and scale.
				</p>
			</div>
			
			<div class="hidden md:block">
				<a
					href="https://github.com/azmimuwahid"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300"
					style="border-color: rgba(255,255,255,0.1); color: #f8fafc;"
					onmouseenter={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = '#fafafa';
						el.style.background = 'rgba(255,255,255,0.1)';
						el.style.color = '#fafafa';
					}}
					onmouseleave={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'rgba(255,255,255,0.1)';
						el.style.background = 'transparent';
						el.style.color = '#f8fafc';
					}}
				>
					<Github class="h-4 w-4" />
					View all on GitHub
					<ArrowUpRight class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</a>
			</div>
		</div>

		<!-- Bento Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each PROJECTS as project, index}
				{@const isVisible = visibleCards.has(index)}
				{@const isFeatured = project.featured}
				<div
					use:inviewTrigger={{ onEnter: () => { visibleCards = new Set([...visibleCards, index]); } }}
					class="group relative overflow-hidden transition-all duration-500 {isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}"
					style="
						transition-delay: {index * 100}ms;
						opacity: {isVisible ? 1 : 0};
						transform: translateY({isVisible ? 0 : 24}px);
					"
				>
					<!-- Card Container -->
					<div
						class="glass-card flex h-full flex-col rounded-3xl p-1 transition-all duration-500"
						style="background: rgba(15,23,42,0.4);"
						onmouseenter={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.borderColor = 'rgba(255,255,255,0.3)';
							el.style.boxShadow = '0 12px 40px -12px rgba(255,255,255,0.15)';
							el.style.transform = 'translateY(-4px) scale(1.01)';
						}}
						onmouseleave={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.borderColor = 'rgba(255,255,255,0.07)';
							el.style.boxShadow = 'none';
							el.style.transform = 'translateY(0) scale(1)';
						}}
					>
						<!-- Abstract Image Placeholder -->
						<div class="relative h-48 w-full overflow-hidden rounded-[20px] bg-gradient-to-br {project.imageColor} sm:h-64">
							<div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
							
							<!-- Interactive Overlay -->
							<div class="absolute inset-0 flex items-center justify-center gap-4 bg-slate-900/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
								{#if project.liveUrl}
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-900 transition-transform hover:scale-110"
										aria-label="View Live Project"
									>
										<ExternalLink class="h-5 w-5" />
									</a>
								{/if}
								{#if project.sourceUrl}
									<a
										href={project.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 transition-transform hover:scale-110"
										aria-label="View Source Code"
									>
										<Github class="h-5 w-5" />
									</a>
								{/if}
							</div>
							
							{#if isFeatured}
								<div class="absolute left-4 top-4 rounded-full bg-zinc-100/20 px-3 py-1 text-xs font-bold text-zinc-100 backdrop-blur-md border border-zinc-100/30">
									FEATURED
								</div>
							{/if}
						</div>

						<!-- Content -->
						<div class="flex flex-1 flex-col p-6 sm:p-8">
							<h3
								class="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-zinc-300 sm:text-3xl"
								style="font-family: var(--font-heading);"
							>
								{project.title}
							</h3>
							
							<p class="mb-8 flex-1 text-base leading-relaxed text-slate-400">
								{project.description}
							</p>
							
							<div class="flex flex-wrap gap-2">
								{#each project.techTags as tag}
									<span class="rounded-md bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700/50">
										{tag}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Mobile GitHub Link -->
		<div class="mt-8 flex justify-center md:hidden">
			<a
				href="https://github.com/azmimuwahid"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
			>
				<Github class="h-4 w-4" />
				View all on GitHub
				<ArrowUpRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</section>
