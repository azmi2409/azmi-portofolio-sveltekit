<script lang="ts">
	import { Calendar, User, Tag, ArrowLeft } from '@lucide/svelte';
	import { format } from 'date-fns';
	import MarkdownRenderer from '$lib/components/blog/MarkdownRenderer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	const formattedDate = format(new Date(post.publishedAt || post.createdAt), 'MMMM dd, yyyy');
</script>

<svelte:head>
	<title>{post.title} - AZMI Blog</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	{#if post.featuredImage}
		<meta property="og:image" content={post.featuredImage} />
	{/if}
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.publishedAt || post.createdAt} />
	<meta property="article:author" content={post.author} />
	{#each post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-background via-background to-muted">
	<article class="container mx-auto px-4 py-20">
		<!-- Back Button -->
		<a
			href="/blog"
			class="mb-8 inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
		>
			<ArrowLeft class="h-5 w-5" />
			Back to Blog
		</a>

		<!-- Article Header -->
		<header class="mb-12">
			<div class="mb-6 flex flex-wrap gap-2">
				{#each post.categories as category}
					<span class="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
						{category}
					</span>
				{/each}
			</div>

			<h1 class="mb-6 text-4xl font-bold text-foreground md:text-5xl">
				{post.title}
			</h1>

			<p class="mb-6 text-xl text-muted-foreground">
				{post.excerpt}
			</p>

			<div class="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
				<div class="flex items-center gap-2">
					<User class="h-4 w-4" />
					<span>{post.author}</span>
				</div>
				<div class="flex items-center gap-2">
					<Calendar class="h-4 w-4" />
					<time datetime={post.publishedAt || post.createdAt}>{formattedDate}</time>
				</div>
			</div>
		</header>

		<!-- Featured Image -->
		{#if post.featuredImage}
			<div class="mb-12 overflow-hidden rounded-2xl">
				<img
					src={post.featuredImage}
					alt={post.title}
					class="h-auto w-full object-cover"
					style="max-height: 500px;"
				/>
			</div>
		{/if}

		<!-- Article Content -->
		<div class="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
			<MarkdownRenderer content={post.content} />
		</div>

		<!-- Tags -->
		{#if post.tags.length > 0}
			<footer class="mt-12 border-t border-border pt-8">
				<div class="flex flex-wrap items-center gap-2">
					<Tag class="h-5 w-5 text-muted-foreground" />
					{#each post.tags as tag}
						<a
							href="/blog?tag={encodeURIComponent(tag)}"
							class="rounded-full bg-muted px-4 py-1 text-sm text-foreground transition hover:bg-primary hover:text-primary-foreground"
						>
							{tag}
						</a>
					{/each}
				</div>
			</footer>
		{/if}
	</article>
</main>
