<!--
  ProjectsSection.svelte
  Displays featured project cards with tech badges and optional links.
  Uses shadcn Card, Badge, and Button components.
  Uses inview action pattern for scroll-triggered entrance animations.
  Requirements: 6.1, 6.2, 6.3, 6.4
-->

<script lang="ts">
	import { ExternalLink, Github } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { InviewOptions } from '$lib/actions/inview';

	interface Project {
		title: string;
		description: string;
		techTags: string[];
		liveUrl?: string;
		sourceUrl?: string;
		featured: boolean;
	}

	const PROJECTS: Project[] = [
		{
			title: 'AI-Powered Mentorship Platform',
			description:
				'Intelligent mentorship matching and tracking system built for FutureLab.my. Features AI-driven mentor-mentee pairing, progress tracking, and automated feedback loops.',
			techTags: ['Ruby on Rails', 'React', 'OpenAI', 'PostgreSQL', 'AWS'],
			liveUrl: 'https://futurelab.my',
			featured: true
		},
		{
			title: 'EdTech Learning Management System',
			description:
				'Scalable LMS platform serving thousands of students across Southeast Asia. Reduced AWS costs by 50% through architecture optimization.',
			techTags: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Docker', 'Terraform'],
			featured: false
		},
		{
			title: 'B2B Sales Intelligence Dashboard',
			description:
				'AI-powered analytics dashboard that increased B2B sales by 30%. Real-time data visualization with predictive insights.',
			techTags: ['Next.js', 'TypeScript', 'OpenAI', 'Redis', 'AWS'],
			featured: false
		}
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

<section id="projects" class="py-20">
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
				Featured <span class="text-primary">Projects</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				A selection of projects showcasing AI-powered solutions and scalable architectures.
			</p>
		</div>

		<!-- Project cards grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each PROJECTS as project, index}
				{@const isVisible = visibleCards.has(index)}
				<div
					use:inviewTrigger={{
						onEnter: () => {
							visibleCards = new Set([...visibleCards, index]);
						}
					}}
					class="transition-all duration-500"
					style="transition-delay: {index * 100}ms"
					class:opacity-0={!isVisible}
					class:translate-y-8={!isVisible}
					class:scale-95={!isVisible}
					class:opacity-100={isVisible}
					class:translate-y-0={isVisible}
					class:scale-100={isVisible}
				>
					<Card.Root
						class="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg {project.featured
							? 'border-primary/30 shadow-md'
							: ''}"
					>
						<Card.Header>
							<div class="flex items-center gap-2">
								{#if project.featured}
									<Badge variant="default" class="text-xs">Featured</Badge>
								{/if}
							</div>
							<Card.Title class="text-xl">{project.title}</Card.Title>
							<Card.Description class="text-sm leading-relaxed">
								{project.description}
							</Card.Description>
						</Card.Header>

						<Card.Content class="flex-1">
							<div class="flex flex-wrap gap-2">
								{#each project.techTags as tag}
									<Badge variant="secondary" class="text-xs">{tag}</Badge>
								{/each}
							</div>
						</Card.Content>

						{#if project.liveUrl || project.sourceUrl}
							<Card.Footer class="gap-3">
								{#if project.liveUrl}
									<Button
										variant="default"
										size="sm"
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="View live demo of {project.title}"
										class="min-h-[44px] min-w-[44px]"
									>
										<ExternalLink class="h-4 w-4" />
										Live Demo
									</Button>
								{/if}
								{#if project.sourceUrl}
									<Button
										variant="outline"
										size="sm"
										href={project.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="View source code of {project.title}"
										class="min-h-[44px] min-w-[44px]"
									>
										<Github class="h-4 w-4" />
										Source
									</Button>
								{/if}
							</Card.Footer>
						{/if}
					</Card.Root>
				</div>
			{/each}
		</div>
	</div>
</section>
