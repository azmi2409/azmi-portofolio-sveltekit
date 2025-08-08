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
			description: 'A comprehensive digital agency platform built with modern web technologies. Features include project management, client portal, and automated workflows.',
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
			description: 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management.',
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
			description: 'Secure and intuitive mobile banking application with biometric authentication and real-time transaction monitoring.',
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
			description: 'AI-powered content generation tool that helps marketers create engaging copy, social media posts, and blog articles.',
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
			description: 'Comprehensive real estate platform with property listings, virtual tours, and integrated CRM for agents.',
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
			description: 'Social fitness tracking application with workout plans, progress tracking, and community features.',
			image: '/api/placeholder/600/400',
			technologies: ['Flutter', 'Firebase', 'GraphQL', 'MongoDB'],
			liveUrl: '#',
			githubUrl: '#',
			featured: false,
			category: 'Mobile App'
		}
	];

	let selectedCategory = 'All';
	const categories = ['All', 'Web Application', 'Dashboard', 'Mobile App', 'AI Tool', 'Web Platform'];

	$: filteredProjects = selectedCategory === 'All' 
		? projects 
		: projects.filter(project => project.category === selectedCategory);

	$: featuredProjects = projects.filter(project => project.featured);
</script>

<section id="portfolio" bind:this={sectionElement} class="py-20 bg-background">
	<div class="max-w-7xl mx-auto px-6">
		<!-- Section header -->
		<div class="text-center mb-16">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					Featured <span class="text-primary">Work</span>
				</h2>
				<div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
				<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
					A showcase of my recent projects and creative solutions that demonstrate my expertise in modern web development.
				</p>
			</div>
		</div>

		<!-- Featured Projects -->
		<div class="mb-20">
			<h3 class="text-2xl font-semibold mb-8 {isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-400">Featured Projects</h3>
			<div class="grid lg:grid-cols-2 gap-8">
				{#each featuredProjects as project, index}
					<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} group" style="animation-delay: {(index * 0.2) + 0.6}s">
						<div class="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
							<!-- Project image -->
							<div class="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
								<div class="absolute top-4 left-4 z-20">
									<span class="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
										{project.category}
									</span>
								</div>
								<!-- Placeholder for project image -->
								<div class="w-full h-full flex items-center justify-center text-6xl font-bold text-primary/30">
									{project.title.charAt(0)}
								</div>
							</div>

							<!-- Project content -->
							<div class="p-6">
								<h4 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
									{project.title}
								</h4>
								<p class="text-muted-foreground mb-4 leading-relaxed">
									{project.description}
								</p>

								<!-- Technologies -->
								<div class="flex flex-wrap gap-2 mb-6">
									{#each project.technologies as tech}
										<span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
											{tech}
										</span>
									{/each}
								</div>

								<!-- Action buttons -->
								<div class="flex space-x-3">
									<a href={project.liveUrl} target="_blank" class="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
										<ExternalLink class="w-4 h-4" />
										<span>Live Demo</span>
									</a>
									<a href={project.githubUrl} target="_blank" class="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium">
										<Github class="w-4 h-4" />
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
			<h3 class="text-2xl font-semibold mb-8">All Projects</h3>
			<div class="flex flex-wrap gap-3 justify-center">
				{#each categories as category}
					<button
						on:click={() => selectedCategory = category}
						class="px-6 py-2 rounded-full font-medium transition-all duration-300 {
							selectedCategory === category 
								? 'bg-primary text-primary-foreground shadow-lg' 
								: 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
						}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- All Projects Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredProjects as project, index}
				<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} group" style="animation-delay: {(index * 0.1) + 1.2}s">
					<div class="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
						<!-- Project image -->
						<div class="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
							<div class="absolute top-3 left-3 z-10">
								<span class="px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-md">
									{project.category}
								</span>
							</div>
							<!-- Placeholder for project image -->
							<div class="w-full h-full flex items-center justify-center text-4xl font-bold text-primary/30">
								{project.title.charAt(0)}
							</div>
						</div>

						<!-- Project content -->
						<div class="p-5">
							<h4 class="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
								{project.title}
							</h4>
							<p class="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
								{project.description}
							</p>

							<!-- Technologies -->
							<div class="flex flex-wrap gap-1 mb-4">
								{#each project.technologies.slice(0, 3) as tech}
									<span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
										{tech}
									</span>
								{/each}
								{#if project.technologies.length > 3}
									<span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
										+{project.technologies.length - 3}
									</span>
								{/if}
							</div>

							<!-- Action buttons -->
							<div class="flex space-x-2">
								<a href={project.liveUrl} target="_blank" class="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
									<ExternalLink class="w-3 h-3" />
									<span>Demo</span>
								</a>
								<a href={project.githubUrl} target="_blank" class="flex items-center justify-center px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors">
									<Github class="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA Section -->
		<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1600 text-center mt-16">
			<div class="p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
				<h3 class="text-2xl font-semibold mb-4">Have a Project in Mind?</h3>
				<p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
					Let's collaborate and bring your ideas to life with cutting-edge technology and exceptional design.
				</p>
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
					Start a Project
					<ArrowRight class="w-5 h-5 ml-2" />
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

	.animation-delay-200 { animation-delay: 0.2s; }
	.animation-delay-400 { animation-delay: 0.4s; }
	.animation-delay-600 { animation-delay: 0.6s; }
	.animation-delay-800 { animation-delay: 0.8s; }
	.animation-delay-1000 { animation-delay: 1s; }
	.animation-delay-1200 { animation-delay: 1.2s; }
	.animation-delay-1400 { animation-delay: 1.4s; }
	.animation-delay-1600 { animation-delay: 1.6s; }

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>