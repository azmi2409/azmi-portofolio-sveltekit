<script lang="ts">
	import { FileText, FilePlus, Eye, Clock } from '@lucide/svelte';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin Dashboard - AZMI</title>
</svelte:head>

<div>
	<h1 class="mb-8 text-3xl font-bold text-foreground">Dashboard</h1>

	<!-- Stats Grid -->
	<div class="mb-8 grid gap-6 md:grid-cols-3">
		<div
			class="rounded-xl border border-border bg-card p-6 border-border bg-card"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-muted-foreground">Total Posts</p>
					<p class="mt-2 text-3xl font-bold text-foreground">{data.stats.total}</p>
				</div>
				<div class="rounded-full bg-primary/10 p-3 bg-primary/10">
					<FileText class="h-6 w-6 text-primary dark:text-primary" />
				</div>
			</div>
		</div>

		<div
			class="rounded-xl border border-border bg-card p-6 border-border bg-card"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-muted-foreground">Published</p>
					<p class="mt-2 text-3xl font-bold text-primary text-primary">
						{data.stats.published}
					</p>
				</div>
				<div class="rounded-full bg-primary/10 p-3 bg-primary/10">
					<Eye class="h-6 w-6 text-primary text-primary" />
				</div>
			</div>
		</div>

		<div
			class="rounded-xl border border-border bg-card p-6 border-border bg-card"
		>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-muted-foreground">Drafts</p>
					<p class="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">
						{data.stats.drafts}
					</p>
				</div>
				<div class="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
					<Clock class="h-6 w-6 text-orange-600 dark:text-orange-400" />
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="mb-8">
		<h2 class="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
		<div class="flex flex-wrap gap-4">
			<a
				href="/admin/posts/new"
				class="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary"
			>
				<FilePlus class="h-5 w-5" />
				Create New Post
			</a>
			<a
				href="/admin/posts"
				class="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold text-muted-foreground transition hover:bg-muted/30hover:bg-muted"
			>
				<FileText class="h-5 w-5" />
				Manage Posts
			</a>
		</div>
	</div>

	<!-- Recent Posts -->
	<div>
		<h2 class="mb-4 text-xl font-semibold text-foreground">Recent Posts</h2>
		<div
			class="overflow-hidden rounded-xl border border-border bg-card border-border bg-card"
		>
			{#if data.recentPosts.length > 0}
				<div class="divide-y divide-gray-200 dark:divide-gray-800">
					{#each data.recentPosts as post}
						<a
							href="/admin/posts/edit/{post.slug}"
							class="block p-4 transition hover:bg-muted/30 hover:bg-muted"
						>
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<h3 class="font-semibold text-foreground">{post.title}</h3>
									<p class="mt-1 text-sm text-muted-foreground">
										{format(new Date(post.updatedAt), 'MMM dd, yyyy')}
									</p>
								</div>
								<span
									class="rounded-full px-3 py-1 text-xs font-medium {post.status === 'published'
										? 'bg-primary/10 text-primary bg-primary/10 text-primary'
										: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'}"
								>
									{post.status}
								</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="p-8 text-center text-muted-foreground">
					No posts yet. Create your first post to get started!
				</div>
			{/if}
		</div>
	</div>
</div>
