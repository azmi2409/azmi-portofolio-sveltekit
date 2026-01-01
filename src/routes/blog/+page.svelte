<script lang="ts">
	import { Search, Filter } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state(data.filters.search || '');
	let selectedCategory = $state(data.filters.category || '');
	let selectedTag = $state(data.filters.tag || '');

	function handleSearch() {
		const params = new URLSearchParams();
		if (searchQuery) params.set('search', searchQuery);
		if (selectedCategory) params.set('category', selectedCategory);
		if (selectedTag) params.set('tag', selectedTag);

		const queryString = params.toString();
		goto(`/blog${queryString ? '?' + queryString : ''}`);
	}

	function clearFilters() {
		searchQuery = '';
		selectedCategory = '';
		selectedTag = '';
		goto('/blog');
	}
</script>

<svelte:head>
	<title>Blog - AZMI</title>
	<meta
		name="description"
		content="Read the latest articles and insights from AZMI on web development, technology, and digital innovation."
	/>
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-background via-background to-muted">
	<div class="container mx-auto px-4 py-20">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-5xl font-bold text-foreground">Blog</h1>
			<p class="text-xl text-muted-foreground">
				Thoughts, tutorials, and insights on web development
			</p>
		</div>

		<!-- Search and Filters -->
		<div class="mb-12 space-y-4">
			<div class="flex flex-col gap-4 md:flex-row">
				<!-- Search -->
				<div class="relative flex-1">
					<Search class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						bind:value={searchQuery}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
						placeholder="Search articles..."
						class="w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-foreground placeholder-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
					/>
				</div>

				<!-- Category Filter -->
				<select
					bind:value={selectedCategory}
					onchange={handleSearch}
					class="rounded-lg border border-border bg-background px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
				>
					<option value="">All Categories</option>
					{#each data.categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>

				<!-- Tag Filter -->
				<select
					bind:value={selectedTag}
					onchange={handleSearch}
					class="rounded-lg border border-border bg-background px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
				>
					<option value="">All Tags</option>
					{#each data.tags as tag}
						<option value={tag}>{tag}</option>
					{/each}
				</select>

				{#if data.filters.search || data.filters.category || data.filters.tag}
					<button
						onclick={clearFilters}
						class="rounded-lg border border-border bg-background px-6 py-3 text-foreground transition hover:bg-muted"
					>
						Clear
					</button>
				{/if}
			</div>
		</div>

		<!-- Blog Posts Grid -->
		{#if data.posts.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post}
					<BlogCard {post} />
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center">
				<p class="text-xl text-muted-foreground">
					No posts found. {#if data.filters.search || data.filters.category || data.filters.tag}
						Try adjusting your filters.
					{/if}
				</p>
			</div>
		{/if}
	</div>
</main>
