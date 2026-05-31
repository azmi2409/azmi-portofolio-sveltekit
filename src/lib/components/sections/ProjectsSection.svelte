<script lang="ts">
	import { ArrowRight, ExternalLink, Github } from '@lucide/svelte';
	import type { Project } from '$lib/types/portfolio';

	let { projects = [] }: { projects?: Project[] } = $props();
</script>

<section id="projects" class="relative px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div class="max-w-2xl">
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
					Selected case studies
				</p>
				<h2 class="text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl">
					Built systems, not slideware.
				</h2>
				<p class="mt-5 text-lg leading-8 text-zinc-400">
					Each case study documents the problem, constraints, architecture, decisions, and tradeoffs
					behind the work.
				</p>
			</div>
			<a
				href="/projects"
				class="inline-flex items-center gap-2 text-sm font-bold text-zinc-200 hover:text-white"
			>
				All projects <ArrowRight class="h-4 w-4" />
			</a>
		</div>

		<div class="grid gap-5 lg:grid-cols-3">
			{#each projects as project, index}
				<article
					class="group flex min-h-[30rem] flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] {index ===
					0
						? 'lg:col-span-2'
						: ''}"
				>
					<a href="/projects/{project.slug}" class="block">
						{#if project.cover}
							<div class="relative overflow-hidden">
								<img src={project.cover} alt="" loading="lazy" class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
								<div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
							</div>
						{:else}
							<div class="project-placeholder flex h-56 items-end p-6">
								<span class="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
									>{project.type}</span
								>
							</div>
						{/if}
					</a>
					<div class="flex flex-1 flex-col p-6">
						<div class="mb-4 flex flex-wrap gap-2 text-xs text-zinc-500">
							<span>{project.year}</span>
							<span>/</span>
							<span>{project.status}</span>
						</div>
						<h3 class="text-2xl font-black tracking-tight text-zinc-50">{project.name}</h3>
						<p class="mt-4 flex-1 text-sm leading-7 text-zinc-400">{project.summary}</p>
						<p
							class="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm leading-6 text-zinc-300"
						>
							{project.outcome}
						</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each project.stack.slice(0, 5) as item}
								<span
									class="rounded-full border border-white/[0.07] px-3 py-1 text-xs text-zinc-500"
									>{item}</span
								>
							{/each}
						</div>
						<div class="mt-6 flex items-center justify-between gap-3">
							<a
								href="/projects/{project.slug}"
								class="inline-flex items-center gap-2 text-sm font-bold text-zinc-100"
							>
								Read case study <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" />
							</a>
							<div class="flex gap-2">
								{#if project.liveUrl}<a
										href={project.liveUrl}
										target="_blank"
										rel="noreferrer"
										aria-label="Live project"
										class="rounded-full border border-white/[0.08] p-2 text-zinc-500 hover:text-zinc-100"
										><ExternalLink class="h-4 w-4" /></a
									>{/if}
								{#if project.githubUrl}<a
										href={project.githubUrl}
										target="_blank"
										rel="noreferrer"
										aria-label="GitHub repository"
										class="rounded-full border border-white/[0.08] p-2 text-zinc-500 hover:text-zinc-100"
										><Github class="h-4 w-4" /></a
									>{/if}
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
