<script lang="ts">
	import { Calendar, Clock, ArrowRight } from '@lucide/svelte';
	import { format } from 'date-fns';
	import type { BlogPost } from '$lib/types/blog';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';

	let { post }: { post: BlogPost } = $props();

	const formattedDate = $derived(
		format(new Date(post.publishedAt || post.createdAt), 'MMM dd, yyyy')
	);
	// Estimate ~200 words/min from excerpt length (blocks not available here)
	const readingTime = $derived(
		Math.max(1, Math.ceil(((post.excerpt?.split(' ').length ?? 20) * 6) / 200))
	);
</script>

<a
	href="/blog/{post.slug}"
	class="group block cursor-pointer"
	aria-label="Read {post.title}"
>
	<Card
		class="overflow-hidden border-white/[0.06] bg-zinc-900/60 backdrop-blur-sm transition-all duration-300
			hover:border-white/[0.1] hover:bg-zinc-800/70 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
			hover:-translate-y-0.5"
	>
		<!-- Cover Image -->
		{#if post.featuredImage}
			<div class="aspect-video overflow-hidden">
				<img
					src={post.featuredImage}
					alt={post.title}
					width="640"
					height="360"
					loading="lazy"
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
		{:else}
			<!-- Gradient placeholder when no cover -->
			<div
				class="aspect-video bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 flex items-center justify-center"
			>
				<span
					class="text-4xl font-black text-zinc-700 select-none"
					style="font-family: var(--font-heading);"
				>
					{post.title.charAt(0).toUpperCase()}
				</span>
			</div>
		{/if}

		<CardContent class="p-5">
			<!-- Categories -->
			{#if post.categories.length > 0}
				<div class="mb-3 flex flex-wrap gap-1.5">
					{#each post.categories.slice(0, 3) as category}
						<Badge
							variant="secondary"
							class="rounded-full border-white/[0.06] bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-zinc-400 hover:bg-white/[0.1] transition-colors duration-200"
						>
							{category}
						</Badge>
					{/each}
				</div>
			{/if}

			<!-- Title -->
			<h3
				class="mb-2 text-lg font-bold leading-snug text-zinc-100 transition-colors duration-200 group-hover:text-white"
				style="font-family: var(--font-heading); letter-spacing: -0.02em;"
			>
				{post.title}
			</h3>

			<!-- Excerpt -->
			{#if post.excerpt}
				<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
					{post.excerpt}
				</p>
			{/if}

			<!-- Footer Meta -->
			<div class="flex items-center justify-between text-xs text-zinc-600">
				<div class="flex items-center gap-3">
					<div class="flex items-center gap-1">
						<Calendar class="h-3.5 w-3.5" />
						<time datetime={post.publishedAt || post.createdAt}>{formattedDate}</time>
					</div>
					<div class="flex items-center gap-1">
						<Clock class="h-3.5 w-3.5" />
						<span>{readingTime} min</span>
					</div>
				</div>
				<span
					class="flex items-center gap-1 text-zinc-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-400"
				>
					Read <ArrowRight class="h-3.5 w-3.5" />
				</span>
			</div>
		</CardContent>
	</Card>
</a>
