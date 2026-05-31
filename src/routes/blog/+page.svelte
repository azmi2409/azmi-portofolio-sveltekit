<script lang="ts">
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Rss, BookOpen } from '@lucide/svelte';
	import type { BlogPost } from '$lib/types/blog';

	let { data } = $props();
	const posts = $derived(data.posts as BlogPost[]);

	// Collect all unique categories
	const allCategories = $derived(['All', ...new Set(posts.flatMap((p) => p.categories))]);

	let activeCategory = $state('All');

	const filteredPosts = $derived(
		activeCategory === 'All' ? posts : posts.filter((p) => p.categories.includes(activeCategory))
	);
</script>

<svelte:head>
	<!-- Primary Meta -->
	<title>Blog — Azmi Muwahid</title>
	<meta
		name="description"
		content="Thoughts on full stack engineering, AI, SvelteKit, TypeScript, and building scalable products."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://azmi.web.id/blog" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog — Azmi Muwahid" />
	<meta
		property="og:description"
		content="Thoughts on full stack engineering, AI, SvelteKit, TypeScript, and building scalable products."
	/>
	<meta property="og:url" content="https://azmi.web.id/blog" />
	<meta property="og:site_name" content="Azmi Muwahid" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Blog — Azmi Muwahid" />
	<meta
		name="twitter:description"
		content="Thoughts on full stack engineering, AI, SvelteKit, TypeScript, and building scalable products."
	/>

	<!-- JSON-LD: BreadcrumbList -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azmi.web.id' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://azmi.web.id/blog' }
		]
	})}</script>`}
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
<section class="relative overflow-hidden pb-12 pt-16">
	<!-- Background glow -->
	<div
		class="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
		aria-hidden="true"
	>
		<div class="h-80 w-80 rounded-full bg-white/[0.03] blur-[96px]"></div>
	</div>

	<div class="relative mx-auto max-w-6xl px-6">
		<div class="flex flex-col items-center text-center">
			<!-- Eyebrow -->
			<div
				class="mb-6 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5"
			>
				<Rss class="h-3.5 w-3.5 text-zinc-500" />
				<span class="text-xs font-medium uppercase tracking-widest text-zinc-500">Blog</span>
			</div>

			<!-- Title -->
			<h1
				class="mb-4 text-5xl font-black tracking-tight text-zinc-100 md:text-6xl"
				style="font-family: var(--font-heading); letter-spacing: -0.03em;"
			>
				Writing &amp;
				<span class="gradient-text">Thoughts</span>
			</h1>

			<!-- Subtitle -->
			<p class="max-w-xl text-base leading-relaxed text-zinc-500">
				Deep dives into full stack engineering, AI, SvelteKit, TypeScript, and the craft of building
				scalable products.
			</p>
		</div>
	</div>
</section>

<Separator class="bg-white/[0.04]" />

<!-- ── Filter + Grid ──────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-6xl px-6 py-12">
	<!-- Category filter pills -->
	{#if allCategories.length > 1}
		<div class="mb-10 flex flex-wrap items-center gap-2">
			{#each allCategories as cat}
				<button
					onclick={() => (activeCategory = cat)}
					class="cursor-pointer transition-all duration-200"
				>
					<Badge
						variant={activeCategory === cat ? 'default' : 'secondary'}
						class={activeCategory === cat
							? 'rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-white'
							: 'rounded-full border-white/[0.06] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-500 hover:border-white/[0.1] hover:bg-white/[0.08] hover:text-zinc-300'}
					>
						{cat}
					</Badge>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Post count -->
	<p class="mb-6 flex items-center gap-2 text-sm text-zinc-600">
		<BookOpen class="h-4 w-4" />
		{filteredPosts.length}
		{filteredPosts.length === 1 ? 'post' : 'posts'}
		{activeCategory !== 'All' ? `in "${activeCategory}"` : ''}
	</p>

	{#if filteredPosts.length > 0}
		<!-- Blog grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredPosts as post (post.id)}
				<BlogCard {post} />
			{/each}
		</div>
	{:else}
		<!-- Empty state -->
		<div class="flex flex-col items-center py-24 text-center">
			<div
				class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-zinc-900/60"
			>
				<BookOpen class="h-7 w-7 text-zinc-600" />
			</div>
			<h2
				class="mb-2 text-xl font-semibold text-zinc-400"
				style="font-family: var(--font-heading);"
			>
				No posts yet
			</h2>
			<p class="mb-6 max-w-sm text-sm text-zinc-600">
				{activeCategory !== 'All'
					? `Nothing published in "${activeCategory}" yet.`
					: 'Check back soon — posts are on the way.'}
			</p>
			{#if activeCategory !== 'All'}
				<Button
					variant="outline"
					onclick={() => (activeCategory = 'All')}
					class="cursor-pointer border-white/[0.06] bg-transparent text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
				>
					View all posts
				</Button>
			{/if}
		</div>
	{/if}
</section>
