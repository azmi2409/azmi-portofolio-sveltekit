<!--
  GitHubStatsSection.svelte
  Animated stat counters with bento-style cards and glowing avatar ring.
-->

<script lang="ts">
	import { FolderGit, Users, UserPlus, GitCommit, Star, Github } from '@lucide/svelte';
	import type { InviewOptions } from '$lib/actions/inview';
	import { onMount } from 'svelte';

	interface GitHubStats {
		publicRepos: number;
		followers: number;
		following: number;
		avatarUrl: string;
	}

	let { stats }: { stats: GitHubStats | null } = $props();

	// Fallback/Demo data if rate limited or unavailable
	const displayStats = $derived(stats || {
		publicRepos: 142,
		followers: 1204,
		following: 45,
		avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4'
	});

	const statItems = $derived([
		{ label: 'Repositories', icon: FolderGit, value: displayStats.publicRepos, color: '#22c55e' },
		{ label: 'Followers', icon: Users, value: displayStats.followers, color: '#3b82f6' },
		{ label: 'Following', icon: UserPlus, value: displayStats.following, color: '#a855f7' },
		{ label: 'Total Commits', icon: GitCommit, value: 4892, color: '#f59e0b' },
		{ label: 'Stars Earned', icon: Star, value: 328, color: '#eab308' }
	]);

	let headerVisible = $state(false);
	let visibleCards = $state(new Set<number>());
	let animatedValues = $state<Record<number, number>>({});

	function animateValue(index: number, target: number, duration = 2000) {
		let startTimestamp: number | null = null;
		const step = (timestamp: number) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			// easeOutExpo
			const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
			animatedValues[index] = Math.floor(easeProgress * target);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			} else {
				animatedValues[index] = target;
			}
		};
		window.requestAnimationFrame(step);
	}

	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					opts.onEnter();
					if (once) observer.disconnect();
				}
			}
		}, { threshold, rootMargin });
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}
</script>

<section id="github-stats" class="relative py-24 sm:py-32">
	<!-- Background grid pattern -->
	<div
		class="pointer-events-none absolute inset-0 opacity-20"
		style="background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 32px 32px;"
	></div>

	<div class="mx-auto max-w-6xl px-6 relative z-10">
		<div class="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">

			<!-- Left Column: Header & Avatar -->
			<div
				class="flex w-full flex-col items-center text-center lg:w-1/3 lg:items-start lg:text-left transition-all duration-700"
				use:inviewTrigger={{ options: { threshold: 0.2 }, onEnter: () => (headerVisible = true) }}
				style="opacity: {headerVisible ? 1 : 0}; transform: translateX({headerVisible ? 0 : -32}px);"
			>
				<h2
					class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
					style="font-family: var(--font-heading); color: #f8fafc;"
				>
					Open <span class="gradient-text">Source</span>
				</h2>
				<p class="mb-10 text-lg text-slate-400">
					Building in public, contributing to the community, and constantly exploring new paradigms.
				</p>

				<!-- Glowing Avatar -->
				<div class="relative inline-block">
					<div class="pulse-ring absolute inset-0 rounded-full"></div>
					<div
						class="relative h-32 w-32 overflow-hidden rounded-full border-4"
						style="border-color: #22c55e; box-shadow: 0 0 30px rgba(34,197,94,0.3);"
					>
						<img
							src={displayStats.avatarUrl}
							alt="GitHub Avatar"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
					<!-- Badge -->
					<div class="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
						<Github class="h-5 w-5 text-white" />
					</div>
				</div>

				{#if stats === null}
					<p class="mt-6 text-xs text-slate-500 flex items-center gap-2">
						<span class="relative flex h-2 w-2">
						  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
						  <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
						</span>
						Live data currently unavailable (showing demo)
					</p>
				{/if}
			</div>

			<!-- Right Column: Stats Bento Grid -->
			<div class="grid w-full gap-4 sm:grid-cols-2 lg:w-2/3">
				{#each statItems as stat, index}
					{@const isVisible = visibleCards.has(index)}
					{@const isLarge = index === 0 || index === 3}
					{@const Icon = stat.icon}
					<div
						use:inviewTrigger={{ onEnter: () => {
							visibleCards = new Set([...visibleCards, index]);
							animateValue(index, stat.value);
						}}}
						class="transition-all duration-500 {isLarge ? 'sm:col-span-2' : ''}"
						style="
							transition-delay: {index * 100}ms;
							opacity: {isVisible ? 1 : 0};
							transform: translateY({isVisible ? 0 : 24}px);
						"
					>
						<div
							class="glass-card group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 h-full"
							onmouseenter={(e) => {
								const el = e.currentTarget as HTMLElement;
								el.style.borderColor = `rgba(${stat.color === '#22c55e' ? '34,197,94' : '255,255,255'}, 0.2)`;
								el.style.transform = 'translateY(-2px)';
							}}
							onmouseleave={(e) => {
								const el = e.currentTarget as HTMLElement;
								el.style.borderColor = 'rgba(255,255,255,0.07)';
								el.style.transform = 'translateY(0)';
							}}
						>
							<div class="mb-4 flex items-center gap-3">
								<div class="rounded-lg p-2" style="background: {stat.color}15; color: {stat.color};">
									<Icon class="h-5 w-5" />
								</div>
								<span class="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
							</div>

							<div class="flex items-baseline gap-1">
								<span
									class="text-4xl font-black tracking-tight text-white sm:text-5xl"
									style="font-family: var(--font-heading);"
								>
									{animatedValues[index] ?? 0}
								</span>
								{#if stat.value > 1000}
									<span class="text-xl font-bold text-slate-500">+</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>

		</div>
	</div>
</section>
