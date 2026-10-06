<script lang="ts">
	import { tick } from 'svelte';
	import SocialIcon from '$lib/components/icons/SocialIcon.svelte';
	import { ArrowLeft, ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import ProjectPreview from '$lib/components/ProjectPreview.svelte';
	import GoldenField from '$lib/components/GoldenField.svelte';

	let { data } = $props();
	const { project, Content, previous, next } = $derived(data);

	let study: HTMLDivElement;
	let toc = $state<{ id: string; label: string }[]>([]);

	// Build the in-page outline from the rendered case-study headings.
	$effect(() => {
		void project.slug;
		void tick().then(() => {
			toc = Array.from(study?.querySelectorAll('h2') ?? []).map((heading) => {
				const label = heading.textContent?.trim() ?? '';
				heading.id ||= label
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/^-|-$/g, '');
				return { id: heading.id, label };
			});
		});
	});
</script>

<svelte:head>
	<title>{project.name} — Case Study — Azmi Muwahid</title>
	<meta name="description" content={project.summary} />
	<meta property="og:title" content={`${project.name} — Case Study`} />
	<meta property="og:description" content={project.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://azmi.web.id/projects/${project.slug}`} />
	<meta
		property="og:image"
		content={new URL(project.cover ?? '/assets/profile.webp', 'https://azmi.web.id').href}
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${project.name} — Case Study`} />
	<meta name="twitter:description" content={project.summary} />
	<meta
		name="twitter:image"
		content={new URL(project.cover ?? '/assets/profile.webp', 'https://azmi.web.id').href}
	/>
	<link rel="canonical" href={`https://azmi.web.id/projects/${project.slug}`} />

	<!-- JSON-LD: CreativeWork + BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.name,
		description: project.summary,
		url: `https://azmi.web.id/projects/${project.slug}`,
		image: new URL(project.cover ?? '/assets/profile.webp', 'https://azmi.web.id').href,
		author: { '@type': 'Person', name: 'Azmi Muwahid', url: 'https://azmi.web.id' },
		dateCreated: project.year,
		keywords: project.stack.join(', '),
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Projects',
					item: 'https://azmi.web.id/projects'
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: project.name,
					item: `https://azmi.web.id/projects/${project.slug}`
				}
			]
		}
	})}<\/script>`}
</svelte:head>

<article class="case">
	<header class="case-hero" data-field-host>
		<GoldenField count={1800} class="case-field" />
		<div class="mx-auto max-w-7xl">
			<a href="/projects" class="back-link"><ArrowLeft class="h-4 w-4" /> All projects</a>

			<div class="grid-12 hero-grid">
				<div class="lg:span-7">
					<p class="case-kicker">{project.category} · {project.type}</p>
					<h1 class="case-title">{project.name}</h1>
					<p class="case-summary">{project.summary}</p>
				</div>
				<aside class="lg:span-5 case-meta" aria-label="Project details">
					<dl class="meta-grid">
						<div>
							<dt>Role</dt>
							<dd>{project.role}</dd>
						</div>
						<div>
							<dt>Year</dt>
							<dd>{project.year}</dd>
						</div>
						<div>
							<dt>Status</dt>
							<dd>{project.status}</dd>
						</div>
					</dl>
					<div class="meta-stack" aria-label="Tools used">
						{#each project.stack as item}<span class="stack-pill">{item}</span>{/each}
					</div>
					{#if project.liveUrl || project.githubUrl}
						<div class="meta-actions">
							{#if project.liveUrl}<a
									href={project.liveUrl}
									target="_blank"
									rel="noreferrer"
									class="button-primary">Visit live site <ArrowUpRight class="h-4 w-4" /></a
								>{/if}
							{#if project.githubUrl}<a
									href={project.githubUrl}
									target="_blank"
									rel="noreferrer"
									class="button-secondary">Code <SocialIcon name="github" class="h-4 w-4" /></a
								>{/if}
						</div>
					{/if}
				</aside>
			</div>
		</div>
	</header>

	<div class="case-body">
		<div class="mx-auto max-w-7xl">
			<section class="outcome grid-12" aria-label="Outcome summary">
				<p class="lg:span-3 outcome-label">Outcome</p>
				<p class="lg:span-7 outcome-text">{project.outcome}</p>
			</section>

			<section class="product" aria-labelledby="product-heading">
				<div class="grid-12 product-head">
					<div class="lg:span-7">
						<p class="label">Product</p>
						<h2 id="product-heading" class="section-title">The workflow in context</h2>
					</div>
					{#if project.coverCaption && project.slug !== 'futurelab-ai-workflows'}
						<p class="lg:span-5 product-caption">{project.coverCaption}</p>
					{/if}
				</div>

				{#if project.cover}
					<div class="product-frame">
						<ProjectPreview
							slug={project.slug}
							name={project.name}
							cover={project.cover}
							coverAlt={project.coverAlt}
							liveUrl={project.liveUrl}
						/>
					</div>
				{:else}
					<div class="product-empty">
						<p class="label">Product overview</p>
						<p>
							A current product screenshot is not available. Explore the workflow and technical
							decisions below.
						</p>
					</div>
				{/if}
			</section>

			{#if project.ownership.length}
				<section class="grid-12 ownership" aria-labelledby="ownership-heading">
					<div class="lg:span-3">
						<p class="label">My role</p>
						<p class="ownership-role">{project.role}</p>
					</div>
					<div class="lg:span-7">
						<h2 id="ownership-heading" class="section-title">How I helped</h2>
						<ul class="ownership-list">
							{#each project.ownership as item}<li>{item}</li>{/each}
						</ul>
					</div>
				</section>
			{/if}

			<div class="grid-12 study-grid">
				<nav class="lg:span-3 study-nav" aria-label="Case study sections">
					<div class="study-nav-inner">
						<p class="label">From challenge to solution</p>
						{#if toc.length}
							<ol>
								{#each toc as item, index}
									<li>
										<a href={`#${item.id}`}
											><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</a
										>
									</li>
								{/each}
							</ol>
						{/if}
					</div>
				</nav>
				<div class="lg:span-7 study-body">
					<div class="case-study" bind:this={study}><Content /></div>
					<section class="cta">
						<h2>Could a similar approach help your business?</h2>
						<p>
							Tell me where work gets stuck. We can identify a practical first improvement and what
							success should look like.
						</p>
						<a href="/contact" class="button-primary"
							>Discuss your challenge <ArrowRight class="h-4 w-4" /></a
						>
					</section>
				</div>
			</div>

			<nav class="grid-12 pager" aria-label="More projects">
				<a href="/projects/{previous.slug}" class="md:span-6 pager-link">
					<span class="label"><ArrowLeft class="h-3.5 w-3.5" /> Previous</span>
					<strong>{previous.name}</strong>
					<small>{previous.type}</small>
				</a>
				<a href="/projects/{next.slug}" class="md:span-6 pager-link next">
					<span class="label">Next <ArrowRight class="h-3.5 w-3.5" /></span>
					<strong>{next.name}</strong>
					<small>{next.type}</small>
				</a>
			</nav>
		</div>
	</div>
</article>

<style>
	.case {
		padding-bottom: var(--space-2xl);
	}
	.case-body {
		padding-inline: var(--space-m);
	}
	.case-hero {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		padding: calc(var(--space-2xl) + var(--space-s)) var(--space-m) var(--space-xl);
		border-bottom: 1px solid var(--border);
	}
	.case-hero :global(.case-field) {
		z-index: -1;
		left: 38.2%;
		mask-image: radial-gradient(ellipse at 61.8% 50%, #000 30%, transparent 70%);
		opacity: 0.85;
	}
	.back-link {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: var(--space-2xs);
		margin-bottom: var(--space-l);
		color: var(--muted-foreground);
		font-size: 0.875rem;
		font-weight: 700;
	}
	.back-link:hover {
		color: var(--foreground);
	}
	.hero-grid {
		align-items: end;
	}
	.case-kicker,
	.label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--muted-foreground);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.case-title {
		margin-top: var(--space-s);
		color: var(--foreground);
		font-size: clamp(var(--text-xl), 7vw, var(--text-2xl) * 1.272);
		font-weight: 600;
		letter-spacing: -0.05em;
		line-height: 0.95;
		overflow-wrap: anywhere;
	}
	.case-summary {
		max-width: 40rem;
		margin-top: var(--space-m);
		color: var(--muted-foreground);
		font-size: var(--text-m);
		line-height: var(--phi);
	}
	.case-meta {
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		padding: var(--space-m);
		background: color-mix(in srgb, var(--card) 82%, transparent);
		backdrop-filter: blur(12px);
	}
	.meta-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-s);
	}
	.meta-grid dt {
		color: var(--muted-foreground);
		font-size: var(--text-xs);
	}
	.meta-grid dd {
		margin-top: var(--space-3xs);
		color: var(--foreground);
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.4;
	}
	.meta-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
		margin-top: var(--space-m);
		border-top: 1px solid var(--border);
		padding-top: var(--space-s);
	}
	.stack-pill {
		border: 1px solid var(--border);
		border-radius: var(--space-2xs);
		padding: 0.25rem 0.5rem;
		color: var(--muted-foreground);
		font-size: 0.7rem;
	}
	.meta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-m);
	}
	.outcome {
		margin-top: var(--space-xl);
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		padding: var(--space-l) var(--space-m);
		background:
			radial-gradient(
				circle at 0% 0%,
				color-mix(in srgb, var(--signal) 10%, transparent),
				transparent 61.8%
			),
			var(--card);
		row-gap: var(--space-s);
	}
	.outcome-label {
		color: var(--signal);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.outcome-text {
		color: var(--foreground);
		font-family: var(--font-heading);
		font-size: clamp(var(--text-m), 2.4vw, var(--text-l));
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.3;
	}
	.product {
		margin-top: var(--space-xl);
	}
	.product-head {
		align-items: end;
		margin-bottom: var(--space-m);
		row-gap: var(--space-xs);
	}
	.section-title {
		margin-top: var(--space-2xs);
		color: var(--foreground);
		font-size: var(--text-xl);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	.product-caption {
		color: var(--muted-foreground);
		font-size: 0.875rem;
		line-height: var(--phi);
	}
	.product-frame {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		box-shadow: 0 40px 90px -60px color-mix(in srgb, var(--signal) 60%, #000);
	}
	.product-empty {
		border: 1px dashed var(--border);
		border-radius: var(--space-m);
		padding: var(--space-xl) var(--space-m);
		color: var(--muted-foreground);
		text-align: center;
	}
	.product-empty p:last-child {
		max-width: 32rem;
		margin: var(--space-xs) auto 0;
		font-size: 0.875rem;
		line-height: var(--phi);
	}
	.ownership {
		margin-top: var(--space-xl);
		border-top: 1px solid var(--border);
		padding-top: var(--space-l);
	}
	.ownership-role {
		margin-top: var(--space-xs);
		color: var(--foreground);
		font-size: var(--text-m);
		font-weight: 700;
	}
	.ownership-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: var(--space-s) var(--space-m);
		margin-top: var(--space-m);
	}
	.ownership-list li {
		position: relative;
		padding-left: var(--space-s);
		color: var(--muted-foreground);
		font-size: 0.9rem;
		line-height: var(--phi);
	}
	.ownership-list li::before {
		content: '';
		position: absolute;
		top: 0.7em;
		left: 0;
		width: 0.382rem;
		height: 0.382rem;
		border-radius: 50%;
		background: var(--signal);
	}
	.study-grid {
		margin-top: var(--space-xl);
		border-top: 1px solid var(--border);
		padding-top: var(--space-l);
	}
	.study-nav-inner {
		position: sticky;
		top: 7rem;
	}
	.study-nav ol {
		display: grid;
		gap: var(--space-3xs);
		margin-top: var(--space-s);
	}
	.study-nav a {
		display: flex;
		gap: var(--space-xs);
		border-radius: var(--space-xs);
		padding: var(--space-2xs) var(--space-xs);
		margin-left: calc(var(--space-xs) * -1);
		color: var(--muted-foreground);
		font-size: 0.875rem;
		line-height: 1.4;
		transition:
			background-color 180ms ease,
			color 180ms ease;
	}
	.study-nav a:hover {
		background: var(--muted);
		color: var(--foreground);
	}
	.study-nav a span {
		color: var(--signal);
		font-family: var(--font-mono);
		font-size: var(--text-2xs);
		line-height: 2;
	}
	.study-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}
	.cta {
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		padding: var(--space-l) var(--space-m);
		background: var(--card);
	}
	.cta h2 {
		color: var(--foreground);
		font-size: var(--text-l);
		letter-spacing: -0.03em;
		line-height: 1.2;
	}
	.cta p {
		margin: var(--space-xs) 0 var(--space-m);
		color: var(--muted-foreground);
		line-height: var(--phi);
	}
	.pager {
		margin-top: var(--space-xl);
		row-gap: var(--grid-gap);
	}
	.pager-link {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		border: 1px solid var(--border);
		border-radius: var(--space-m);
		padding: var(--space-m);
		background: var(--card);
		transition:
			border-color 240ms ease,
			transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.pager-link.next {
		align-items: flex-end;
		text-align: right;
	}
	.pager-link:hover {
		border-color: color-mix(in srgb, var(--signal) 45%, var(--border));
		transform: translateY(-0.236rem);
	}
	.pager-link strong {
		margin-top: var(--space-xs);
		color: var(--foreground);
		font-family: var(--font-heading);
		font-size: var(--text-l);
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	.pager-link small {
		color: var(--muted-foreground);
		font-size: var(--text-xs);
	}
	@media (max-width: 1023px) {
		.study-nav {
			display: none;
		}
		.case-hero :global(.case-field) {
			left: 0;
			opacity: 0.5;
		}
	}
	@media (max-width: 767px) {
		.case-hero,
		.case-body {
			padding-inline: var(--space-s);
		}
		.meta-grid {
			grid-template-columns: minmax(0, 1fr) auto auto;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.pager-link:hover {
			transform: none;
		}
	}
	.case-study {
		color: var(--muted-foreground);
		font-size: 1.125rem;
		line-height: var(--phi);
	}
	.case-study :global(h2) {
		scroll-margin-top: 7rem;
	}
	.case-study :global(h2) {
		margin: 2.5rem 0 1rem;
		font-size: 1.875rem;
		font-weight: 600;
		line-height: 1.2;
		color: var(--foreground);
	}
	.case-study :global(h2:first-child) {
		margin-top: 0;
	}
	.case-study :global(h3) {
		margin: 2rem 0 1rem;
		font-size: 1.375rem;
		font-weight: 700;
		color: var(--foreground);
	}
	.case-study :global(:is(p, ul, ol)) {
		margin: 1rem 0;
	}
	.case-study :global(:is(ul, ol)) {
		padding-left: 1.5rem;
	}
	.case-study :global(ul) {
		list-style: disc;
	}
	.case-study :global(ol) {
		list-style: decimal;
	}
	.case-study :global(li) {
		margin: 0.5rem 0;
	}
	.case-study :global(a) {
		color: var(--signal);
		text-decoration: underline;
	}
	.case-study :global(code) {
		font-size: 0.9em;
		overflow-wrap: anywhere;
	}
	.case-study :global(pre) {
		overflow-x: auto;
		padding: 1rem;
		background: var(--muted);
		border-radius: 0.75rem;
	}
	.case-study :global(img) {
		max-width: 100%;
		border-radius: 0.75rem;
	}
</style>
