<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import SocialIcon from '$lib/components/icons/SocialIcon.svelte';
	import type { Project } from '$lib/types/portfolio';
	import ProjectPreview from '$lib/components/ProjectPreview.svelte';
	import GoldenField from '$lib/components/GoldenField.svelte';

	let {
		projects = [],
		showArchiveLink = true,
		compact = false
	}: { projects?: Project[]; showArchiveLink?: boolean; compact?: boolean } = $props();

	let activeProject = $state(0);
	let category = $state('All');
	let reduced = $state(true);
	const categories = ['All', 'Web App', 'OS Library', 'API / Gateway'] as const;
	const visibleProjects = $derived(
		projects.filter((project) => category === 'All' || project.category === category)
	);
	const spotlight = $derived(compact ? undefined : visibleProjects[0]);
	const gridProjects = $derived(compact ? [] : visibleProjects.slice(1));
	const liveCount = $derived(projects.filter((project) => project.liveUrl).length);
	const countFor = (item: string) =>
		item === 'All' ? projects.length : projects.filter((p) => p.category === item).length;
	const pad = (value: number) => String(value).padStart(2, '0');
	// Rows of three; a leftover row closes as 6 + 6 or one full-width 7/5 card.
	const spanFor = (index: number) => {
		const total = gridProjects.length;
		const remainder = total % 3;
		if (remainder === 0 || index < total - remainder) return 'lg:span-4';
		return remainder === 2 ? 'lg:span-6' : 'lg:span-12';
	};

	onMount(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => (reduced = query.matches);
		sync();
		query.addEventListener('change', sync);
		return () => query.removeEventListener('change', sync);
	});
</script>

{#snippet links(project: Project)}
	<div class="project-links">
		{#if project.liveUrl}
			<a
				href={project.liveUrl}
				target="_blank"
				rel="noreferrer"
				aria-label={`${project.name} live project`}
				class="project-action"
			>
				Live site <ArrowUpRight class="h-3.5 w-3.5" />
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
{/snippet}

{#snippet body(project: Project, index: number, featured: boolean)}
	<div class="project-content">
		<div class="project-meta">
			<span class="project-index">{pad(index + 1)}</span>
			<span>{project.year}</span>
			<span class="project-status" class:live={project.liveUrl}>{project.status}</span>
		</div>
		<p class="project-category">{project.category} · {project.type}</p>
		<svelte:element this={featured ? 'h2' : 'h3'} class="project-title">
			<a href="/projects/{project.slug}">{project.name}</a>
		</svelte:element>
		<p class="project-description">{project.summary}</p>

		<div class="project-outcome">
			<p class="outcome-label">Outcome</p>
			<p>{project.outcome}</p>
		</div>

		<div class="project-stack" aria-label="Technology stack">
			{#each project.stack as item}
				<span class="stack-pill">{item}</span>
			{/each}
		</div>

		<div class="project-footer">
			<a href="/projects/{project.slug}" class="case-link">
				Case study <ArrowRight class="h-4 w-4" />
			</a>
			{@render links(project)}
		</div>
	</div>
{/snippet}

{#snippet visual(project: Project)}
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
{/snippet}

<section id="projects" class:compact class="projects-section">
	<div class="mx-auto max-w-7xl">
		<header class="grid-12 projects-head">
			<div class="lg:span-7 head-copy">
				<p class="section-index">
					{#if showArchiveLink}<b>(03)</b>{/if} Selected projects
				</p>
				<svelte:element this={showArchiveLink ? 'h2' : 'h1'} class="projects-heading">
					Practical solutions to <span class="accent-serif text-muted-foreground"
						>everyday business problems.</span
					>
				</svelte:element>
				<p class="projects-intro">
					From reducing session admin to helping customers buy online. See the work I delivered, who
					it helps, and what changed.
				</p>
			</div>

			<div class="lg:span-5 field-panel" data-field-host>
				<GoldenField count={compact ? 1600 : 2400} />
				<dl class="field-stats">
					<div>
						<dt>Projects</dt>
						<dd>{pad(projects.length)}</dd>
					</div>
					<div>
						<dt>Live</dt>
						<dd>{pad(liveCount)}</dd>
					</div>
					<div>
						<dt>Categories</dt>
						<dd>{pad(categories.length - 1)}</dd>
					</div>
				</dl>
				{#if showArchiveLink}
					<a href="/projects" class="button-secondary magnetic group field-link">
						View project archive
						<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</a>
				{/if}
			</div>
		</header>

		<div class="project-toolbar">
			<div class="filter-group" role="group" aria-label="Project categories">
				{#each categories as item}
					<button
						type="button"
						class="filter-chip"
						aria-pressed={category === item}
						onclick={() => {
							category = item;
							activeProject = 0;
						}}
					>
						{item}<span class="filter-count">{countFor(item)}</span>
					</button>
				{/each}
			</div>
			<p class="result-count" aria-live="polite">
				{compact
					? 'Explore the stack · hover, tap, or tab to reveal a project'
					: `Showing ${visibleProjects.length} of ${projects.length}`}
			</p>
		</div>

		{#if compact}
			<div id="project-grid" class="project-grid domino-deck">
				{#each visibleProjects as project, index (project.slug)}
					<article class="project-card group" class:active={index === activeProject}>
						<button
							class="domino-tab"
							type="button"
							aria-expanded={index === activeProject}
							aria-controls={`project-panel-${project.slug}`}
							onpointerenter={(event) => {
								if (event.pointerType === 'mouse') activeProject = index;
							}}
							onfocus={() => (activeProject = index)}
							onclick={() => (activeProject = index)}
						>
							<span class="domino-number">{pad(index + 1)}</span>
							<span>{project.name}</span>
							<ArrowRight class="h-4 w-4 shrink-0" />
						</button>
						<div
							class="project-panel"
							id={`project-panel-${project.slug}`}
							hidden={index !== activeProject}
						>
							{@render visual(project)}
							{@render body(project, index, false)}
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div id="project-grid" class="archive">
				{#if spotlight}
					{#key spotlight.slug}
						<article class="project-card spotlight grid-12">
							<div class="lg:span-7 spotlight-visual">{@render visual(spotlight)}</div>
							<div class="lg:span-5 spotlight-body">{@render body(spotlight, 0, true)}</div>
						</article>
					{/key}
				{/if}
				<div class="grid-12 archive-grid">
					{#each gridProjects as project, index (project.slug)}
						<article
							class="project-card archive-card md:span-6 {spanFor(index)}"
							class:wide={spanFor(index) === 'lg:span-12'}
							animate:flip={{ duration: reduced ? 0 : 420 }}
						>
							{@render visual(project)}
							{@render body(project, index + 1, false)}
						</article>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Vertical rhythm follows the φ spacing scale defined in app.css. */
	.projects-section {
		position: relative;
		padding: var(--space-2xl) var(--space-m);
	}
	.projects-section.compact {
		padding-block: var(--space-xl);
	}
	.projects-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--border), transparent);
	}

	/* Header: 7 + 5 golden split. */
	.projects-head {
		align-items: stretch;
		margin-bottom: var(--space-l);
	}
	.head-copy {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-m);
	}
	.head-copy .section-index {
		margin-bottom: var(--space-s);
	}
	.projects-heading {
		color: var(--foreground);
		font-size: clamp(var(--text-xl), 5.4vw, var(--text-2xl));
		font-weight: 600;
		letter-spacing: -0.045em;
		line-height: 1;
		text-wrap: balance;
	}
	.projects-intro {
		max-width: 38rem;
		color: var(--muted-foreground);
		font-size: var(--text-m);
		line-height: var(--phi);
	}

	.field-panel {
		position: relative;
		isolation: isolate;
		display: flex;
		min-height: 18rem;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-s);
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		padding: var(--space-m);
		background:
			radial-gradient(
				circle at 50% 38%,
				color-mix(in srgb, var(--signal) 9%, transparent),
				transparent 61.8%
			),
			var(--card);
		aspect-ratio: var(--ratio-golden);
	}
	.field-panel :global(.golden-field) {
		z-index: -1;
		mask-image: linear-gradient(to bottom, #000 38%, transparent 92%);
	}
	.field-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-xs);
	}
	.field-stats div {
		border-top: 1px solid var(--border);
		padding-top: var(--space-xs);
	}
	.field-stats dt {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.field-stats dd {
		margin-top: var(--space-3xs);
		color: var(--foreground);
		font-family: var(--font-heading);
		font-size: var(--text-l);
		font-weight: 600;
		letter-spacing: -0.03em;
		font-variant-numeric: tabular-nums;
	}
	.field-link {
		width: 100%;
	}

	/* Toolbar */
	.project-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		margin-bottom: var(--space-m);
	}
	.filter-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: var(--space-3xs);
		background: color-mix(in srgb, var(--card) 70%, transparent);
	}
	.filter-chip {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: var(--space-xs);
		border-radius: 999px;
		padding: 0 var(--space-s);
		color: var(--muted-foreground);
		font-size: 0.8125rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color 180ms ease,
			color 180ms ease;
	}
	.filter-chip:hover {
		color: var(--foreground);
	}
	.filter-chip[aria-pressed='true'] {
		background: var(--foreground);
		color: var(--background);
	}
	.filter-count {
		min-width: 1.5rem;
		border-radius: 999px;
		padding: 0.1rem 0.4rem;
		background: color-mix(in srgb, currentColor 14%, transparent);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		text-align: center;
	}
	.result-count {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* Card base */
	.project-card {
		--tilt: perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
		position: relative;
		display: flex;
		min-width: 0;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		background: var(--card);
		overflow: hidden;
		transition:
			border-color 240ms ease,
			box-shadow 240ms ease,
			transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	/* Pointer-following light, positioned by $lib/motion. */
	.project-card::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		border-radius: inherit;
		opacity: 0;
		background: radial-gradient(
			38rem circle at var(--pointer-x, 50%) var(--pointer-y, 0%),
			color-mix(in srgb, var(--signal) 13%, transparent),
			transparent 38.2%
		);
		transition: opacity 320ms ease;
	}
	.project-card:hover::after,
	.project-card:focus-within::after {
		opacity: 1;
	}
	.project-card:hover,
	.project-card:focus-within {
		border-color: color-mix(in srgb, var(--signal) 45%, var(--border));
		box-shadow: 0 26px 60px -38px color-mix(in srgb, var(--signal) 55%, #000);
	}
	.archive-card:hover,
	.spotlight:hover {
		transform: var(--tilt) translateY(-0.236rem);
	}
	.project-visual {
		position: relative;
		z-index: 2;
		display: block;
		aspect-ratio: var(--ratio-golden);
		margin: var(--space-xs) var(--space-xs) 0;
		border: 1px solid var(--border);
		border-radius: var(--space-s);
		overflow: hidden;
	}
	.project-visual:focus-visible {
		outline-offset: -4px;
	}
	.project-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: var(--space-m);
	}
	.project-meta {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.08em;
	}
	.project-index {
		color: var(--signal);
	}
	.project-status {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.25rem 0.618rem;
		text-transform: uppercase;
	}
	.project-status.live::before {
		content: '';
		width: 0.382rem;
		height: 0.382rem;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px color-mix(in srgb, #34d399 22%, transparent);
	}
	.project-category {
		margin-top: var(--space-s);
		color: var(--muted-foreground);
		font-size: var(--text-xs);
		line-height: 1.5;
	}
	.project-title {
		margin-top: var(--space-2xs);
		color: var(--foreground);
		font-size: var(--text-l);
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.15;
	}
	.project-title a::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
	}
	.project-description {
		flex: 1;
		margin-top: var(--space-xs);
		color: var(--muted-foreground);
		font-size: 0.9rem;
		line-height: var(--phi);
		overflow-wrap: anywhere;
	}
	.project-outcome {
		margin-top: var(--space-s);
		border-left: 2px solid var(--signal);
		border-radius: 0 var(--space-xs) var(--space-xs) 0;
		background: color-mix(in srgb, var(--signal) 6%, var(--card));
		padding: var(--space-xs) var(--space-s);
		color: var(--foreground);
		font-size: 0.85rem;
		line-height: 1.55;
	}
	.outcome-label {
		margin-bottom: var(--space-3xs);
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin-top: var(--space-s);
	}
	.stack-pill {
		border: 1px solid var(--border);
		border-radius: var(--space-2xs);
		padding: 0.25rem 0.5rem;
		color: var(--muted-foreground);
		font-size: 0.7rem;
	}
	.project-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-m);
		border-top: 1px solid var(--border);
		padding-top: var(--space-s);
	}
	.case-link {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--foreground);
		font-size: 0.875rem;
		font-weight: 700;
	}
	.case-link :global(svg) {
		transition: translate 240ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.project-card:hover .case-link :global(svg) {
		translate: 0.236rem 0;
	}
	.project-links {
		display: flex;
		gap: var(--space-2xs);
	}
	.project-action {
		position: relative;
		z-index: 1;
		display: inline-flex;
		min-height: 2.75rem;
		min-width: 2.75rem;
		align-items: center;
		justify-content: center;
		gap: var(--space-2xs);
		border: 1px solid var(--border);
		border-radius: var(--space-xs);
		padding: var(--space-2xs) var(--space-xs);
		color: var(--foreground);
		font-size: 0.75rem;
	}
	.project-action:hover {
		background: var(--muted);
	}

	/* Archive: spotlight (7 + 5) above a 3-up grid. */
	.archive {
		display: flex;
		flex-direction: column;
		gap: var(--grid-gap);
	}
	.archive-grid {
		row-gap: var(--grid-gap);
	}
	.spotlight {
		display: grid;
		row-gap: 0;
		column-gap: 0;
	}
	.spotlight-visual {
		display: flex;
	}
	.spotlight-visual .project-visual {
		flex: 1;
		margin: var(--space-xs);
	}
	.spotlight-body .project-content {
		height: 100%;
		padding: var(--space-l) var(--space-l) var(--space-m) var(--space-m);
	}
	.spotlight .project-title {
		font-size: clamp(var(--text-l), 3vw, var(--text-xl));
	}

	@media (min-width: 1024px) {
		.archive-card.wide {
			display: grid;
			grid-template-columns: 7fr 5fr;
		}
		.archive-card.wide .project-visual {
			align-self: start;
			margin-bottom: var(--space-xs);
		}
	}

	/* Home: compact domino deck */
	.compact .project-outcome {
		display: none;
	}
	.project-panel {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
	}
	.project-panel[hidden] {
		display: none;
	}
	.domino-tab {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		width: 100%;
		min-height: 3.5rem;
		padding: var(--space-s);
		text-align: left;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--foreground);
	}
	.domino-tab > :global(svg) {
		margin-left: auto;
	}
	.domino-number {
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: 0.7rem;
	}
	.project-card.active .domino-number {
		color: var(--signal);
	}
	.domino-tab:focus-visible {
		outline: 2px solid var(--signal);
		outline-offset: -5px;
		border-radius: 1rem;
	}
	@media (min-width: 1024px) {
		.project-grid.domino-deck {
			display: flex;
			gap: 0;
			min-height: 40rem;
			padding-top: var(--space-xs);
		}
		.domino-deck .project-card {
			flex: 0 0 4.236rem;
			border-radius: var(--space-s);
			margin-left: -0.382rem;
			box-shadow: -10px 0 24px -18px #0009;
			transition:
				flex-basis 420ms cubic-bezier(0.2, 0.8, 0.2, 1),
				transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1),
				border-color 240ms ease;
		}
		.domino-deck .project-card:first-child {
			margin-left: 0;
		}
		.domino-deck .project-card.active {
			flex: 1 1 0%;
			transform: translateY(calc(var(--space-xs) * -1));
		}
		.domino-deck .project-card:not(.active) .domino-tab {
			writing-mode: vertical-rl;
			flex: 1;
			justify-content: flex-start;
			padding: var(--space-m) var(--space-s);
			gap: var(--space-m);
		}
		.domino-deck .project-card:not(.active):hover {
			background: color-mix(in srgb, var(--signal) 5%, var(--card));
		}
		.domino-deck .project-card:not(.active) .domino-tab > :global(svg) {
			margin: auto 0 0;
		}
		.domino-deck .project-visual {
			flex: none;
			max-height: 19rem;
		}
		.domino-deck .project-description {
			flex: none;
		}
		.domino-deck .project-footer {
			margin-top: auto;
		}
	}
	@media (max-width: 1023px) {
		.project-grid.domino-deck {
			display: grid;
			grid-template-columns: minmax(0, 1fr);
		}
		.domino-deck .project-card {
			border-radius: var(--space-s);
			margin-top: -0.236rem;
		}
		.domino-deck .project-card.active {
			margin-block: var(--space-xs);
		}
		.field-panel {
			aspect-ratio: auto;
		}
		.spotlight-body .project-content {
			padding: var(--space-m);
		}
	}
	@media (max-width: 767px) {
		.projects-section {
			padding-inline: var(--space-s);
		}
		.project-content {
			padding: var(--space-s);
		}
		.filter-group {
			flex-wrap: nowrap;
			max-width: 100%;
			overflow-x: auto;
			scrollbar-width: none;
		}
		.filter-chip {
			flex: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.project-card,
		.domino-deck .project-card {
			transition: none;
		}
		.archive-card:hover,
		.spotlight:hover {
			transform: none;
		}
	}
</style>
