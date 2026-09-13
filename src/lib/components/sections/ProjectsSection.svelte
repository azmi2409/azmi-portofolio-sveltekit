<script lang="ts">
	import { ArrowRight, ExternalLink } from '@lucide/svelte';
	import SocialIcon from '$lib/components/icons/SocialIcon.svelte';
	import type { Project } from '$lib/types/portfolio';
	import ProjectPreview from '$lib/components/ProjectPreview.svelte';

	let { projects = [] }: { projects?: Project[] } = $props();

	function span(index: number) {
		return index === 0 || (projects.length % 2 === 0 && index === projects.length - 1)
			? 'lg:col-span-12'
			: 'lg:col-span-6';
	}
</script>

<section id="projects" class="relative px-6 py-24 sm:py-32">
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
	></div>
	<div class="mx-auto max-w-7xl">
		<div class="mb-14 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
			<div class="max-w-3xl">
				<div class="eyebrow mb-5">Selected work · 01</div>
				<h2 class="text-4xl leading-[0.98] font-black tracking-[-0.045em] text-zinc-50 sm:text-6xl">
					Practical solutions to everyday business problems.
				</h2>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
					From reducing session admin to helping customers buy online. See the work I delivered, who
					it helps, and what changed.
				</p>
			</div>
			<a href="/projects" class="button-secondary group w-fit">
				View project archive
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<div class="grid gap-4 lg:grid-cols-12">
			{#each projects as project, index}
				<article class="project-card group {span(index)}">
					<a
						href="/projects/{project.slug}"
						class="project-visual"
						aria-label={`Read ${project.name} case study`}
					>
						<ProjectPreview
							slug={project.slug}
							name={project.name}
							cover={project.cover}
							coverAlt={project.coverAlt}
							liveUrl={project.liveUrl}
						/>
					</a>

					<div class="flex flex-1 flex-col p-6 sm:p-7">
						<div
							class="mb-4 flex items-center justify-between gap-3 font-mono text-[0.62rem] tracking-[0.14em] text-zinc-600 uppercase"
						>
							<span>{project.year} · {project.status}</span>
							<span class="flex items-center gap-1.5 text-emerald-200/60"
								><i class="h-1.5 w-1.5 rounded-full bg-emerald-300/80"></i>{project.type}</span
							>
						</div>
						<h3 class="text-2xl font-black tracking-[-0.035em] text-zinc-50 sm:text-3xl">
							{project.name}
						</h3>
						<p class="mt-3 flex-1 text-sm leading-7 text-zinc-400">{project.summary}</p>

						<div class="mt-5 border-l border-emerald-200/20 pl-4">
							<p class="mb-1 font-mono text-[0.58rem] tracking-[0.16em] text-zinc-600 uppercase">
								Outcome
							</p>
							<p class="text-sm leading-6 text-zinc-300">{project.outcome}</p>
						</div>

						<details class="mt-6">
							<summary class="cursor-pointer text-sm text-muted-foreground"
								>Tools behind the solution</summary
							>
							<div class="mt-3 flex flex-wrap gap-2">
								{#each project.stack.slice(0, 3) as item}
									<span class="stack-pill">{item}</span>
								{/each}
							</div>
						</details>

						<div
							class="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5"
						>
							<a
								href="/projects/{project.slug}"
								class="inline-flex items-center gap-2 text-sm font-bold text-zinc-100"
							>
								Open case study <ArrowRight
									class="h-4 w-4 transition-transform group-hover:translate-x-1"
								/>
							</a>
							<div class="flex gap-2">
								{#if project.liveUrl}
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noreferrer"
										aria-label={`${project.name} live project`}
										class="project-action"
									>
										<ExternalLink class="h-4 w-4" />
									</a>
								{/if}
								{#if project.githubUrl}
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noreferrer"
										aria-label={`${project.name} GitHub repository`}
										class="project-action"
									>
										<SocialIcon name="github" class="h-4 w-4" />
									</a>
								{/if}
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.project-card {
		display: flex;
		min-width: 0;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.075);
		border-radius: 1.65rem;
		background: linear-gradient(155deg, rgba(255, 255, 255, 0.045), rgba(10, 11, 12, 0.86) 45%);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.025);
		transition:
			transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 260ms ease,
			box-shadow 260ms ease;
	}

	.project-card:hover {
		transform: translateY(-5px);
		border-color: rgba(153, 229, 212, 0.19);
		box-shadow: 0 24px 70px -34px rgba(0, 0, 0, 0.9);
	}

	.project-visual {
		position: relative;
		display: block;
		height: 14rem;
		overflow: hidden;
		border-bottom: 1px solid rgba(255, 255, 255, 0.065);
	}

	.stack-pill {
		padding: 0.33rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.025);
		font-family: var(--font-mono);
		font-size: 0.58rem;
		color: #71717a;
	}

	.project-action {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 50%;
		color: #71717a;
		transition:
			color 160ms ease,
			border-color 160ms ease;
	}

	.project-action:hover {
		border-color: rgba(255, 255, 255, 0.18);
		color: #f4f4f5;
	}
</style>
