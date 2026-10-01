<script lang="ts">
	import { ArrowRight, ExternalLink } from '@lucide/svelte';
	import SocialIcon from '$lib/components/icons/SocialIcon.svelte';
	import type { Project } from '$lib/types/portfolio';
	import ProjectPreview from '$lib/components/ProjectPreview.svelte';

	let {
		projects = [],
		showArchiveLink = true,
		compact = false
	}: { projects?: Project[]; showArchiveLink?: boolean; compact?: boolean } = $props();

	let activeProject = $state(0);
	let category = $state('All');
	const categories = ['All', 'Web App', 'OS Library', 'API / Gateway'];
	const visibleProjects = $derived(projects.filter(project => category === 'All' || project.category === category));
</script>

<section id="projects" class:compact class="relative px-6 py-24 sm:py-32">
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
	></div>
	<div class="mx-auto max-w-7xl">
		<div class="mb-14 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
			<div class="max-w-3xl">
				<div class="eyebrow mb-5">Selected projects · 01</div>
				<svelte:element this={showArchiveLink ? 'h2' : 'h1'} class="text-4xl leading-[0.98] font-black tracking-[-0.045em] text-zinc-50 sm:text-6xl">
					Practical solutions to everyday business problems.
				</svelte:element>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
					From reducing session admin to helping customers buy online. See the work I delivered, who
					it helps, and what changed.
				</p>
			</div>
			{#if showArchiveLink}
				<a href="/projects" class="button-secondary group w-fit">
					View project archive
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</a>
			{/if}
		</div>

		<div class="mb-6 flex flex-wrap gap-2" aria-label="Project categories">
			{#each categories as item}
				<button type="button" class="button-secondary" aria-pressed={category === item}
					onclick={() => { category = item; activeProject = 0; }}>{item}</button>
			{/each}
		</div>
		{#if compact}<p class="deck-hint">Explore the stack · hover, tap, or tab to reveal a project</p>{/if}
		<div id="project-grid" class="project-grid" class:domino-deck={compact}>
			{#each visibleProjects as project, index (project.slug)}
				<article class="project-card group" class:active={index === activeProject}>
					{#if compact}
						<button
							class="domino-tab"
							type="button"
							aria-expanded={index === activeProject}
							aria-controls={`project-panel-${project.slug}`}
							onpointerenter={(event) => { if (event.pointerType === 'mouse') activeProject = index; }}
							onfocus={() => activeProject = index}
							onclick={() => activeProject = index}
						>
							<span class="domino-number">{String(index + 1).padStart(2, '0')}</span>
							<span>{project.name}</span>
							<ArrowRight class="h-4 w-4 shrink-0" />
						</button>
					{/if}
					<div class="project-panel" id={`project-panel-${project.slug}`} hidden={compact && index !== activeProject}>
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

					<div class="project-content">
						<div class="project-meta">
							<span>{project.year}</span>
							<span class="project-status">{project.status}</span>
						</div>
						<p class="project-category">{project.category} · {project.type}</p>
						<h3 class="project-title">
							<a href="/projects/{project.slug}">{project.name}</a>
						</h3>
						<p class="project-description">{project.summary}</p>

						<div class="project-outcome">
							<p class="outcome-label">
								Outcome
							</p>
							<p class="text-sm leading-6 text-zinc-300">{project.outcome}</p>
						</div>

						<div class="project-stack" aria-label="Technology stack">
							{#each project.stack as item}
								<span class="stack-pill">{item}</span>
							{/each}
						</div>

						<div class="project-footer">
							<a
								href="/projects/{project.slug}"
								class="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-zinc-100"
							>
								Case study <ArrowRight
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
										Live site <ExternalLink class="h-3.5 w-3.5" />
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
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.compact { padding-block: 4rem; }
	.compact .project-visual { aspect-ratio: 16 / 9; }
	.compact .project-outcome, .compact .project-meta { display: none; }
	.compact .project-content { padding: 1.25rem; }
	.project-panel { display: flex; flex: 1; flex-direction: column; min-width: 0; }
	.project-panel[hidden] { display: none; }
	.deck-hint { margin-bottom: 1rem; color: var(--muted-foreground); font-size: 0.8rem; }
	button[aria-pressed='true'] { border-color: var(--signal); background: color-mix(in srgb, var(--signal) 10%, var(--card)); }
	.domino-tab {
		display: flex; align-items: center; gap: 0.75rem; width: 100%;
		min-height: 3.5rem; padding: 1rem; text-align: left; cursor: pointer;
		font-size: 0.85rem; font-weight: 600; color: var(--foreground);
	}
	.domino-tab > :global(svg) { margin-left: auto; }
	.domino-number { color: var(--muted-foreground); font-family: var(--font-mono); font-size: 0.7rem; }
	.domino-tab:focus-visible { outline: 2px solid var(--signal); outline-offset: -5px; border-radius: 1rem; }
	@media (min-width: 1024px) {
		.project-grid.domino-deck { display: flex; gap: 0; min-height: 39rem; padding-top: 0.75rem; }
		.domino-deck .project-card {
			flex: 0 0 4.5rem; border-radius: 1rem; margin-left: -0.4rem;
			background: var(--card); box-shadow: -10px 0 24px -18px #0009;
			transition: flex-basis 360ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
		}
		.domino-deck .project-card:first-child { margin-left: 0; }
		.domino-deck .project-card.active { flex: 1 1 0%; transform: translateY(-0.75rem); }
		.domino-deck .project-card:not(.active) .domino-tab {
			writing-mode: vertical-rl; flex: 1; justify-content: flex-start; padding: 1.25rem; gap: 1.5rem;
		}
		.domino-deck .project-card:not(.active) .domino-tab > :global(svg) { margin: auto 0 0; }
		.domino-deck .project-visual { max-height: 19rem; }
		.domino-deck .project-description { flex: none; }
		.domino-deck .project-footer { margin-top: auto; }
	}
	@media (max-width: 1023px) {
		.project-grid.domino-deck { grid-template-columns: minmax(0, 1fr); gap: 0; }
		.domino-deck .project-card { border-radius: 1rem; margin-top: -0.25rem; }
		.domino-deck .project-card.active { margin-block: 0.5rem; }
	}
	@media (prefers-reduced-motion: reduce) {
		.domino-deck .project-card { transition: none; }
	}
	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem;
	}
	.project-card {
		display: flex;
		min-width: 0;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: 1.5rem;
		background: var(--card);
		overflow: hidden;
		transition: border-color 180ms ease, box-shadow 180ms ease;
	}
	.project-card:hover, .project-card:focus-within {
		border-color: color-mix(in srgb, var(--signal) 45%, var(--border));
		box-shadow: 0 16px 40px -28px #0008;
	}
	.project-visual {
		display: block;
		aspect-ratio: 3 / 2;
		margin: 0.75rem 0.75rem 0;
		border: 1px solid var(--border);
		border-radius: 0.9rem;
		overflow: hidden;
	}
	.project-visual:focus-visible { outline-offset: -4px; }
	.project-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 1.75rem;
	}
	.project-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		color: var(--muted-foreground);
		font-size: 0.75rem;
	}
	.project-status {
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.25rem 0.65rem;
	}
	.project-category {
		margin-top: 1.25rem;
		color: var(--muted-foreground);
		font-size: 0.8rem;
		line-height: 1.5;
	}
	.project-title {
		margin-top: 0.4rem;
		color: var(--foreground);
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.15;
	}
	.project-description {
		flex: 1;
		margin-top: 0.85rem;
		color: var(--muted-foreground);
		font-size: 0.9rem;
		line-height: 1.8;
		overflow-wrap: anywhere;
	}
	.project-outcome {
		margin-top: 1.25rem;
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--signal) 5%, var(--card));
		padding: 1rem;
	}
	.outcome-label {
		margin-bottom: 0.35rem;
		color: var(--muted-foreground);
		font-size: 0.7rem;
		font-weight: 600;
	}
	.project-outcome :global(p:last-child) { color: var(--foreground); }
	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}
	.stack-pill {
		border: 1px solid var(--border);
		border-radius: 0.4rem;
		padding: 0.3rem 0.55rem;
		color: var(--muted-foreground);
		font-size: 0.7rem;
	}
	.project-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
		border-top: 1px solid var(--border);
		padding-top: 1rem;
	}
	.project-footer :global(a) { color: var(--foreground); }
	.project-action {
		display: inline-flex;
		min-height: 2.75rem;
		min-width: 2.75rem;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border: 1px solid var(--border);
		border-radius: 0.6rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
	}
	.project-action:hover { background: var(--muted); }
	@media (max-width: 767px) {
		.project-grid { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
		.project-content { padding: 1.25rem; }
	}
</style>
