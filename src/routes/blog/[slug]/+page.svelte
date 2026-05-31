<script lang="ts">
	import NotionBlockRenderer from '$lib/components/blog/NotionBlockRenderer.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Calendar, Clock, ArrowLeft, Tag } from '@lucide/svelte';
	import { format } from 'date-fns';

	let { data } = $props();
	const { post, blocks } = $derived(data);

	const formattedDate = $derived(
		format(new Date(post.publishedAt || post.createdAt), 'MMMM dd, yyyy')
	);

	// Rough reading time based on block count (avg ~50 words/block)
	const readingTime = $derived(Math.max(1, Math.ceil((blocks.length * 50) / 200)));
</script>

<svelte:head>
	<!-- Primary Meta -->
	<title>{post.title} — Azmi Muwahid</title>
	<meta
		name="description"
		content={post.excerpt || `Read "${post.title}" on Azmi Muwahid's blog.`}
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://azmi.web.id/blog/{post.slug}" />

	<!-- Open Graph: article -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Azmi Muwahid" />
	<meta property="og:title" content="{post.title} — Azmi Muwahid" />
	<meta
		property="og:description"
		content={post.excerpt || `Read "${post.title}" on Azmi Muwahid's blog.`}
	/>
	<meta property="og:url" content="https://azmi.web.id/blog/{post.slug}" />
	{#if post.featuredImage}
		<meta property="og:image" content={post.featuredImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	{#if post.publishedAt}
		<meta property="article:published_time" content={post.publishedAt} />
	{/if}
	{#if post.updatedAt}
		<meta property="article:modified_time" content={post.updatedAt} />
	{/if}
	{#each post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
	<meta property="article:author" content="Azmi Muwahid" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content={post.featuredImage ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content="{post.title} — Azmi Muwahid" />
	<meta
		name="twitter:description"
		content={post.excerpt || `Read "${post.title}" on Azmi Muwahid's blog.`}
	/>
	{#if post.featuredImage}
		<meta name="twitter:image" content={post.featuredImage} />
	{/if}

	<!-- JSON-LD: BlogPosting -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": post.title,
		"description": post.excerpt ?? "",
		"url": `https://azmi.web.id/blog/${post.slug}`,
		"datePublished": post.publishedAt ?? post.createdAt,
		"dateModified": post.updatedAt ?? post.publishedAt ?? post.createdAt,
		"image": post.featuredImage ?? null,
		"keywords": [...post.categories, ...post.tags].join(", "),
		"author": {
			"@type": "Person",
			"name": "Azmi Muwahid",
			"url": "https://azmi.web.id"
		},
		"publisher": {
			"@type": "Person",
			"name": "Azmi Muwahid",
			"url": "https://azmi.web.id"
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": `https://azmi.web.id/blog/${post.slug}`
		},
		"breadcrumb": {
			"@type": "BreadcrumbList",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://azmi.web.id" },
				{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://azmi.web.id/blog" },
				{ "@type": "ListItem", "position": 3, "name": post.title, "item": `https://azmi.web.id/blog/${post.slug}` }
			]
		}
	})}</script>`}
</svelte:head>

<!-- ── Cover ─────────────────────────────────────────────────────────────── -->
{#if post.featuredImage}
	<div class="relative h-72 w-full overflow-hidden md:h-96">
		<img
			src={post.featuredImage}
			alt={post.title}
			class="h-full w-full object-cover"
		/>
		<!-- Dark gradient overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent"
		></div>
	</div>
{:else}
	<!-- Subtle gradient bar when no cover -->
	<div class="h-32 w-full bg-gradient-to-b from-zinc-900/60 to-transparent"></div>
{/if}

<!-- ── Article ────────────────────────────────────────────────────────────── -->
<article class="mx-auto max-w-3xl px-6 pb-24">

	<!-- Back link -->
	<div class="mb-8 pt-8">
		<Button
			href="/blog"
			variant="ghost"
			class="cursor-pointer -ml-2 gap-2 text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
		>
			<ArrowLeft class="h-4 w-4" />
			All posts
		</Button>
	</div>

	<!-- Header -->
	<header class="mb-10">
		<!-- Categories -->
		{#if post.categories.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.categories as category}
					<Badge
						variant="secondary"
						class="rounded-full border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400"
					>
						{category}
					</Badge>
				{/each}
			</div>
		{/if}

		<!-- Title -->
		<h1
			class="mb-5 text-4xl font-black leading-tight tracking-tight text-zinc-50 md:text-5xl"
			style="font-family: var(--font-heading); letter-spacing: -0.03em;"
		>
			{post.title}
		</h1>

		<!-- Excerpt -->
		{#if post.excerpt}
			<p class="mb-6 text-lg leading-relaxed text-zinc-400">
				{post.excerpt}
			</p>
		{/if}

		<!-- Meta row -->
		<div class="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
			<div class="flex items-center gap-1.5">
				<Calendar class="h-4 w-4" />
				<time datetime={post.publishedAt || post.createdAt}>{formattedDate}</time>
			</div>
			<div class="flex items-center gap-1.5">
				<Clock class="h-4 w-4" />
				<span>~{readingTime} min read</span>
			</div>
			{#if post.tags.length > 0}
				<div class="flex items-center gap-1.5">
					<Tag class="h-4 w-4" />
					<span>{post.tags.join(', ')}</span>
				</div>
			{/if}
		</div>
	</header>

	<Separator class="mb-10 bg-white/[0.04]" />

	<!-- Notion content -->
	<div class="notion-article">
		<NotionBlockRenderer {blocks} />
	</div>

	<!-- Footer -->
	<Separator class="mb-10 mt-16 bg-white/[0.04]" />

	<footer class="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-zinc-600">Written by</p>
			<p class="font-semibold text-zinc-300">Azmi Muwahid</p>
		</div>
		<Button
			href="/blog"
			variant="outline"
			class="cursor-pointer gap-2 border-white/[0.06] bg-transparent text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
		>
			<ArrowLeft class="h-4 w-4" />
			Back to Blog
		</Button>
	</footer>
</article>

<style>
	.notion-article {
		/* Constrain reading width for optimal line length (65–75 chars) */
		max-width: 65ch;
	}
</style>
