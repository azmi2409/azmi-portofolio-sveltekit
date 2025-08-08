<script lang="ts">
	import { onMount } from 'svelte';
	import { ExternalLink, Github, ArrowRight } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let sectionElement: HTMLElement;
	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});

	const projects = [
		{
			id: 1,
			title: 'Beeleaf.id Platform',
			description:
				'A comprehensive digital agency platform built with modern web technologies. Features include project management, client portal, and automated workflows.',
			image: '/api/placeholder/600/400',
			technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
			liveUrl: 'https://beeleaf.id',
			githubUrl: '#',
			featured: true,
			category: 'Web Application'
		},
		{
			id: 2,
			title: 'E-Commerce Dashboard',
			description:
				'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.',
			image: '/api/placeholder/600/400',
			technologies: ['Svelte', 'TypeScript', 'Supabase', 'Tailwind'],
			liveUrl: '#',
			githubUrl: '#',
			featured: true,
			category: 'Dashboard'
		},
		{
			id: 3,
			title: 'Mobile Banking App',
			description:
				'Secure and intuitive mobile banking application with biometric authentication and real-time transaction monitoring.',
			image: '/api/placeholder/600/400',
			technologies: ['React Native', 'Firebase', 'Redux', 'Stripe'],
			liveUrl: '#',
			githubUrl: '#',
			featured: false,
			category: 'Mobile App'
		},
		{
			id: 4,
			title: 'AI Content Generator',
			description:
				'AI-powered content generation tool that helps marketers create engaging copy, social media posts, and blog articles.',
			image: '/api/placeholder/600/400',
			technologies: ['Next.js', 'OpenAI API', 'Prisma', 'Vercel'],
			liveUrl: '#',
			githubUrl: '#',
			featured: false,
			category: 'AI Tool'
		},
		{
			id: 5,
			title: 'Real Estate Platform',
			description:
				'Comprehensive real estate platform with property listings, virtual tours, and integrated CRM for agents.',
			image: '/api/placeholder/600/400',
			technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
			liveUrl: '#',
			githubUrl: '#',
			featured: false,
			category: 'Web Platform'
		},
		{
			id: 6,
			title: 'Fitness Tracking App',
			description:
				'Social fitness tracking application with workout plans, progress tracking, and community features.',
			image: '/api/placeholder/600/400',
			technologies: ['Flutter', 'Firebase', 'GraphQL', 'MongoDB'],
			liveUrl: '#',
			githubUrl: '#',
			featured: false,
			category: 'Mobile App'
		}
	];

	let selectedCategory = 'All';
	const categories = [
		'All',
		'Web Application',
		'Dashboard',
		'Mobile App',
		'AI Tool',
		'Web Platform'
	];

	$: filteredProjects =
		selectedCategory === 'All'
			? projects
			: projects.filter((project) => project.category === selectedCategory);

	$: featuredProjects = projects.filter((project) => project.featured);
</script>

<section id="portfolio" bind:this={sectionElement} class="bg-background py-20">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Section header -->
		<div class="mb-16 text-center">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="mb-4 text-4xl font-bold md:text-5xl">
					Featured <span class="text-primary">Work</span>
				</h2>
				<div class="mx-auto mb-6 h-1 w-24 bg-primary"></div>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					A showcase of my recent projects and creative solutions that demonstrate my expertise in
					modern web development.
				</p>
			</div>
		</div>

		<!-- Featured Projects -->
		<div class="mb-20">
			<h3
				class="mb-8 text-2xl font-semibold {isVisible
					? 'animate-fade-in-up'
					: 'opacity-0'} animation-delay-400"
			>
				Featured Projects
			</h3>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each featuredProjects as project, index}
					<div
						class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} group"
						style="animation-delay: {index * 0.2 + 0.6}s"
					>
						<div
							class="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
						>
							<!-- Project image -->
							<div
								class="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20"
							>
								<div
									class="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent"
								></div>
								<div class="absolute top-4 left-4 z-20">
									<span
										class="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
									>
										{project.category}
									</span>
								</div>
								<!-- Placeholder for project image -->
								<div
									class="flex h-full w-full items-center justify-center text-6xl font-bold text-primary/30"
								>
									{project.title.charAt(0)}
								</div>
							</div>

							<!-- Project content -->
							<div class="p-6">
								<h4 class="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
									{project.title}
								</h4>
								<p class="mb-4 leading-relaxed text-muted-foreground">
									{project.description}
								</p>

								<!-- Technologies -->
								<div class="mb-6 flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span class="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
											{tech}
										</span>
									{/each}
								</div>

								<!-- Action buttons -->
								<div class="flex space-x-3">
									<a
										href={project.liveUrl}
										target="_blank"
										class="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
									>
										<ExternalLink class="h-4 w-4" />
										<span>Live Demo</span>
									</a>
									<a
										href={project.githubUrl}
										target="_blank"
										class="flex items-center space-x-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
									>
										<Github class="h-4 w-4" />
										<span>Code</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Category filter -->
		<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1000 mb-12">
			<h3 class="mb-8 text-2xl font-semibold">All Projects</h3>
			<div class="flex flex-wrap justify-center gap-3">
				{#each categories as category}
					<button
						on:click={() => (selectedCategory = category)}
						class="rounded-full px-6 py-2 font-medium transition-all duration-300 {selectedCategory ===
						category
							? 'bg-primary text-primary-foreground shadow-lg'
							: 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- All Projects Grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project, index}
				<div
					class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} group"
					style="animation-delay: {index * 0.1 + 1.2}s"
				>
					<div
						class="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
					>
						<!-- Project image -->
						<div
							class="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10"
						>
							<div class="absolute top-3 left-3 z-10">
								<span
									class="rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
								>
									{project.category}
								</span>
							</div>
							<!-- Placeholder for project image -->
							<div
								class="flex h-full w-full items-center justify-center text-4xl font-bold text-primary/30"
							>
								{project.title.charAt(0)}
							</div>
						</div>

						<!-- Project content -->
						<div class="p-5">
							<h4 class="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
								{project.title}
							</h4>
							<p class="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
								{project.description}
							</p>

							<!-- Technologies -->
							<div class="mb-4 flex flex-wrap gap-1">
								{#each project.technologies.slice(0, 3) as tech}
									<span class="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
										{tech}
									</span>
								{/each}
								{#if project.technologies.length > 3}
									<span class="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
										+{project.technologies.length - 3}
									</span>
								{/if}
							</div>

							<!-- Action buttons -->
							<div class="flex space-x-2">
								<a
									href={project.liveUrl}
									target="_blank"
									class="flex flex-1 items-center justify-center space-x-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
								>
									<ExternalLink class="h-3 w-3" />
									<span>Demo</span>
								</a>
								<a
									href={project.githubUrl}
									target="_blank"
									class="flex items-center justify-center rounded-md bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
								>
									<Github class="h-4 w-4" />
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Section -->
		<div
			class="{isVisible
				? 'animate-fade-in-up'
				: 'opacity-0'} animation-delay-1600 mt-16 text-center"
		>
			<div
				class="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8"
			>
				<h3 class="mb-4 text-2xl font-semibold">Have a Project in Mind?</h3>
				<p class="mx-auto mb-6 max-w-2xl text-muted-foreground">
					Let's collaborate and bring your ideas to life with cutting-edge technology and
					exceptional design.
				</p>
				<Button
					size="lg"
					class="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
				>
					Start a Project
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}
	.animation-delay-400 {
		animation-delay: 0.4s;
	}
	.animation-delay-600 {
		animation-delay: 0.6s;
	}
	.animation-delay-800 {
		animation-delay: 0.8s;
	}
	.animation-delay-1000 {
		animation-delay: 1s;
	}
	.animation-delay-1200 {
		animation-delay: 1.2s;
	}
	.animation-delay-1400 {
		animation-delay: 1.4s;
	}
	.animation-delay-1600 {
		animation-delay: 1.6s;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
