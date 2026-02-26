<!--
  TechStackSection.svelte
  Displays categorized technical skills using shadcn Card + Badge components.
  Uses inview action for scroll-triggered entrance animations.
  Requirements: 4.1, 4.2, 4.3
-->

<script lang="ts">
	import { Code, Layout, Server, Cloud, Database, Brain } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import type { InviewOptions } from '$lib/actions/inview';

	const TECH_CATEGORIES = [
		{ name: 'Languages', icon: Code, skills: ['TypeScript', 'JavaScript', 'Ruby', 'Go'] },
		{
			name: 'Frontend',
			icon: Layout,
			skills: ['React', 'Next.js', 'Vue.js', 'Redux', 'Tailwind', 'Svelte']
		},
		{ name: 'Backend', icon: Server, skills: ['Rails', 'Node.js', 'Express'] },
		{
			name: 'Cloud & DevOps',
			icon: Cloud,
			skills: ['AWS', 'Docker', 'Terraform', 'GitHub Actions']
		},
		{ name: 'Database', icon: Database, skills: ['PostgreSQL', 'MongoDB', 'Redis'] },
		{ name: 'AI/ML', icon: Brain, skills: ['OpenAI'] }
	];

	let headerVisible = $state(false);
	let visibleCards = $state(new Set<number>());

	/**
	 * Svelte action that wraps IntersectionObserver for scroll-triggered visibility.
	 * Calls the provided callback when the element enters the viewport.
	 */
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

<section id="tech-stack" class="py-20">
	<div class="mx-auto max-w-6xl px-6">
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
				Tech <span class="text-primary">Stack</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Tools and technologies I use to build scalable, AI-powered solutions.
			</p>
		</div>

		<!-- Category grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each TECH_CATEGORIES as category, index}
				{@const isVisible = visibleCards.has(index)}
				<div
					use:inviewTrigger={{
						onEnter: () => {
							visibleCards = new Set([...visibleCards, index]);
						}
					}}
					class="transition-all duration-500"
					style="transition-delay: {index * 80}ms"
					class:opacity-0={!isVisible}
					class:translate-y-8={!isVisible}
					class:scale-95={!isVisible}
					class:opacity-100={isVisible}
					class:translate-y-0={isVisible}
					class:scale-100={isVisible}
				>
					<Card.Root
						class="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
					>
						<Card.Header>
							{@const Icon = category.icon}
							<Card.Title class="flex items-center gap-3 text-lg">
								<div class="rounded-lg bg-primary/10 p-2 text-primary">
									<Icon class="h-5 w-5" />
								</div>
								{category.name}
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="flex flex-wrap gap-2">
								{#each category.skills as skill}
									<Badge variant="secondary" class="text-sm">{skill}</Badge>
								{/each}
							</div>
						</Card.Content>
					</Card.Root>
				</div>

				<!-- Separator between rows on mobile (after every card except last) -->
				{#if index < TECH_CATEGORIES.length - 1}
					<div class="col-span-full sm:hidden">
						<Separator />
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
