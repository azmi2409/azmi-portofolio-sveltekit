<script lang="ts">
	import NotionBlockRenderer from '$lib/components/blog/NotionBlockRenderer.svelte';
	import { ArrowLeft, ExternalLink, Github } from '@lucide/svelte';

	let { data } = $props();
	const { project, blocks } = $derived(data);

	const sections = $derived(
		[
			['Problem', project.problem],
			['Approach', project.approach],
			['Architecture', project.architecture],
			['Result', project.result],
			['Lessons learned', project.lessonsLearned]
		].filter(([, value]) => value)
	);
</script>

<svelte:head>
	<title>{project.name} — Case Study — Azmi Muwahid</title>
	<meta name="description" content={project.summary} />
	<meta property="og:title" content={`${project.name} — Case Study`} />
	<meta property="og:description" content={project.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://azmi.web.id/projects/${project.slug}`} />
	{#if project.cover}<meta property="og:image" content={project.cover} />{/if}
	<link rel="canonical" href={`https://azmi.web.id/projects/${project.slug}`} />
</svelte:head>

<article class="px-6 pb-24 pt-32">
	<div class="mx-auto max-w-6xl">
		<a
			href="/projects"
			class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-200"
			><ArrowLeft class="h-4 w-4" /> Back to projects</a
		>

		<header class="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
			<div>
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
					{project.type}
				</p>
				<h1 class="text-5xl font-black tracking-tight text-zinc-50 sm:text-7xl">{project.name}</h1>
				<p class="mt-6 max-w-3xl text-xl leading-9 text-zinc-400">{project.summary}</p>
			</div>
			<aside class="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
				<dl class="space-y-4 text-sm">
					<div>
						<dt class="text-zinc-500">Role</dt>
						<dd class="mt-1 font-semibold text-zinc-200">{project.role}</dd>
					</div>
					<div>
						<dt class="text-zinc-500">Year</dt>
						<dd class="mt-1 font-semibold text-zinc-200">{project.year}</dd>
					</div>
					<div>
						<dt class="text-zinc-500">Status</dt>
						<dd class="mt-1 font-semibold text-zinc-200">{project.status}</dd>
					</div>
				</dl>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each project.stack as item}<span
							class="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-zinc-500"
							>{item}</span
						>{/each}
				</div>
				<div class="mt-6 flex gap-2">
					{#if project.liveUrl}<a
							href={project.liveUrl}
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950"
							>Live <ExternalLink class="h-4 w-4" /></a
						>{/if}
					{#if project.githubUrl}<a
							href={project.githubUrl}
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-4 py-2 text-sm font-bold text-zinc-200"
							>Code <Github class="h-4 w-4" /></a
						>{/if}
				</div>
			</aside>
		</header>

		{#if project.cover}
			<img
				src={project.cover}
				alt=""
				class="mt-12 max-h-[34rem] w-full rounded-[2rem] border border-white/[0.08] object-cover"
			/>
		{:else}
			<div
				class="project-placeholder mt-12 h-[24rem] rounded-[2rem] border border-white/[0.08]"
			></div>
		{/if}

		<section class="mt-12 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
			<p class="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Outcome</p>
			<p class="mt-3 text-2xl font-bold leading-snug text-zinc-100">{project.outcome}</p>
		</section>

		<div class="mt-14 grid gap-10 lg:grid-cols-[16rem_1fr]">
			<nav class="hidden lg:block">
				<p class="sticky top-28 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-600">
					Case-study anatomy
				</p>
			</nav>
			<div class="space-y-12">
				{#each sections as [title, value]}
					<section>
						<h2 class="text-3xl font-black tracking-tight text-zinc-50">{title}</h2>
						<p class="mt-4 text-lg leading-8 text-zinc-400">{value}</p>
					</section>
				{/each}

				{#if project.constraints.length}
					<section>
						<h2 class="text-3xl font-black tracking-tight text-zinc-50">Constraints</h2>
						<ul class="mt-4 space-y-3">
							{#each project.constraints as item}<li
									class="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-zinc-400"
								>
									{item}
								</li>{/each}
						</ul>
					</section>
				{/if}

				{#if project.technicalDecisions.length || project.keyFeatures.length}
					<section class="grid gap-5 md:grid-cols-2">
						<div>
							<h2 class="text-2xl font-black tracking-tight text-zinc-50">Technical decisions</h2>
							<ul class="mt-4 space-y-3">
								{#each project.technicalDecisions as item}<li class="text-zinc-400">
										• {item}
									</li>{/each}
							</ul>
						</div>
						<div>
							<h2 class="text-2xl font-black tracking-tight text-zinc-50">Key features</h2>
							<ul class="mt-4 space-y-3">
								{#each project.keyFeatures as item}<li class="text-zinc-400">• {item}</li>{/each}
							</ul>
						</div>
					</section>
				{/if}

				{#if blocks.length}
					<section class="notion-article"><NotionBlockRenderer {blocks} /></section>
				{/if}
			</div>
		</div>
	</div>
</article>
