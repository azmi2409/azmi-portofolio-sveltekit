<!--
  GitHubStatsSection.svelte
  Displays GitHub profile statistics (repos, followers, following) using shadcn Card components.
  Uses inview action pattern for scroll-triggered entrance animations.
  Requirements: 5.2, 5.3
-->

<script lang="ts">
	import { FolderGit, Users, UserPlus } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import type { InviewOptions } from '$lib/actions/inview';

	interface GitHubStats {
		publicRepos: number;
		followers: number;
		following: number;
		avatarUrl: string;
	}

	let { stats }: { stats: GitHubStats | null } = $props();

	const statItems = $derived([
		{ label: 'Public Repos', icon: FolderGit, value: stats?.publicRepos ?? 0 },
		{ label: 'Followers', icon: Users, value: stats?.followers ?? 0 },
		{ label: 'Following', icon: UserPlus, value: stats?.following ?? 0 }
	]);

	let headerVisible = $state(false);
	let visibleCards = $state(new Set<number>());

	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						opts.onEnter();
						if (once) {
							observer.disconnect();
						}
					}
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section id="github-stats" class="py-20">
	<div class="mx-auto max-w-4xl px-6">
		<!-- Section header -->
		<div
			class="mb-16 text-center transition-all duration-700"
			use:inviewTrigger={{
				options: { threshold: 0.2 },
				onEnter: () => (headerVisible = true)
			}}
			class:opacity-0={!headerVisible}
			class:translate-y-6={!headerVisible}
			class:opacity-100={headerVisible}
			class:translate-y-0={headerVisible}
		>
			<h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				GitHub <span class="text-primary">Stats</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				A snapshot of my open-source presence and activity.
			</p>
		</div>

		<!-- Stats cards -->
		<div class="grid gap-6 sm:grid-cols-3">
			{#each statItems as stat, index}
				{@const isVisible = visibleCards.has(index)}
				<div
					use:inviewTrigger={{
						onEnter: () => {
							visibleCards = new Set([...visibleCards, index]);
						}
					}}
					class="transition-all duration-500"
					style="transition-delay: {index * 120}ms"
					class:opacity-0={!isVisible}
					class:translate-y-8={!isVisible}
					class:scale-95={!isVisible}
					class:opacity-100={isVisible}
					class:translate-y-0={isVisible}
					class:scale-100={isVisible}
				>
					<Card.Root
						class="text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
					>
						<Card.Header class="pb-2">
							{@const Icon = stat.icon}
							<div class="mx-auto mb-2 rounded-lg bg-primary/10 p-3 text-primary w-fit">
								<Icon class="h-6 w-6" />
							</div>
							<Card.Title class="text-sm font-medium text-muted-foreground">
								{stat.label}
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<p class="text-4xl font-bold tracking-tight sm:text-5xl">{stat.value}</p>
						</Card.Content>
					</Card.Root>
				</div>
			{/each}
		</div>

		<!-- Unavailable message when stats is null -->
		{#if stats === null}
			<p class="mt-6 text-center text-sm text-muted-foreground">
				Data currently unavailable
			</p>
		{/if}
	</div>
</section>
