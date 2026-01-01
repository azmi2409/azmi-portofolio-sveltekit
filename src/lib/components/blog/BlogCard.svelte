<script lang="ts">
	import { Calendar, Clock } from '@lucide/svelte';
	import { format } from 'date-fns';
	import type { BlogPost } from '$lib/types/blog';

	let { post }: { post: BlogPost } = $props();

	const formattedDate = format(new Date(post.publishedAt || post.createdAt), 'MMM dd, yyyy');
	const readingTime = Math.ceil(post.content.split(' ').length / 200); // Assume 200 words per minute
</script>

<a
	href="/blog/{post.slug}"
	class="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg"
>
	{#if post.featuredImage}
		<div class="aspect-video overflow-hidden">
			<img
				src={post.featuredImage}
				alt={post.title}
				class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
			/>
		</div>
	{/if}

	<div class="p-6">
		<!-- Categories -->
		{#if post.categories.length > 0}
			<div class="mb-3 flex flex-wrap gap-2">
				{#each post.categories.slice(0, 2) as category}
					<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
						{category}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Title -->
		<h3 class="mb-3 text-xl font-bold text-card-foreground transition group-hover:text-primary">
			{post.title}
		</h3>

		<!-- Excerpt -->
		<p class="mb-4 line-clamp-3 text-muted-foreground">
			{post.excerpt}
		</p>

		<!-- Meta -->
		<div class="flex items-center gap-4 text-sm text-muted-foreground">
			<div class="flex items-center gap-1">
				<Calendar class="h-4 w-4" />
				<time datetime={post.publishedAt || post.createdAt}>{formattedDate}</time>
			</div>
			<div class="flex items-center gap-1">
				<Clock class="h-4 w-4" />
				<span>{readingTime} min read</span>
			</div>
		</div>
	</div>
</a>
