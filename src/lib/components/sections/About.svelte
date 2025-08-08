<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Palette, Zap, Users } from '@lucide/svelte';

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

	const skills = [
		{ name: 'Frontend Development', icon: Code, description: 'React, Svelte, Vue.js, TypeScript' },
		{ name: 'UI/UX Design', icon: Palette, description: 'Figma, Adobe Creative Suite, Design Systems' },
		{ name: 'Performance Optimization', icon: Zap, description: 'Web Vitals, SEO, Accessibility' },
		{ name: 'Team Leadership', icon: Users, description: 'Agile, Mentoring, Project Management' }
	];

	const technologies = [
		'JavaScript', 'TypeScript', 'React', 'Svelte', 'Node.js', 'Python',
		'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Figma'
	];
</script>

<section id="about" bind:this={sectionElement} class="py-20 bg-muted/30">
	<div class="max-w-6xl mx-auto px-6">
		<!-- Section header -->
		<div class="text-center mb-16">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					About <span class="text-primary">Me</span>
				</h2>
				<div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
				<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
					Passionate developer with 5+ years of experience creating digital solutions that make a difference.
				</p>
			</div>
		</div>

		<div class="grid lg:grid-cols-2 gap-16 items-center">
			<!-- Left column - Story -->
			<div class="{isVisible ? 'animate-fade-in-left' : 'opacity-0'} animation-delay-400">
				<div class="prose prose-lg max-w-none">
					<h3 class="text-2xl font-semibold mb-6 text-foreground">My Journey</h3>
					<p class="text-muted-foreground leading-relaxed mb-6">
						Started as a curious developer exploring the endless possibilities of the web. 
						Today, I'm the founder of <a href="https://www.beeleaf.id" target="_blank" class="text-primary font-semibold hover:underline">Beeleaf.id</a>, 
						a digital agency focused on creating exceptional user experiences.
					</p>
					<p class="text-muted-foreground leading-relaxed mb-6">
						Based in Jakarta, Indonesia, I specialize in full-stack development with a keen eye for design. 
						I believe in writing clean, maintainable code and creating interfaces that users love to interact with.
					</p>
					<p class="text-muted-foreground leading-relaxed">
						When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
						or sharing knowledge with the developer community.
					</p>
				</div>

				<!-- Technologies -->
				<div class="mt-8">
					<h4 class="text-lg font-semibold mb-4">Technologies I Love</h4>
					<div class="flex flex-wrap gap-2">
						{#each technologies as tech, index}
							<span 
								class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-default"
								style="animation-delay: {(index * 0.1) + 0.6}s"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right column - Skills -->
			<div class="{isVisible ? 'animate-fade-in-right' : 'opacity-0'} animation-delay-600">
				<h3 class="text-2xl font-semibold mb-8">What I Do Best</h3>
				<div class="space-y-6">
					{#each skills as skill, index}
						<div 
							class="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
							style="animation-delay: {(index * 0.2) + 0.8}s"
						>
							<div class="flex items-start space-x-4">
								<div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
									<svelte:component this={skill.icon} class="w-6 h-6" />
								</div>
								<div class="flex-1">
									<h4 class="text-lg font-semibold mb-2">{skill.name}</h4>
									<p class="text-muted-foreground">{skill.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Stats section -->
		<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1200 mt-20">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				<div class="p-6">
					<div class="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
					<div class="text-muted-foreground">Years Experience</div>
				</div>
				<div class="p-6">
					<div class="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
					<div class="text-muted-foreground">Projects Completed</div>
				</div>
				<div class="p-6">
					<div class="text-3xl md:text-4xl font-bold text-primary mb-2">30+</div>
					<div class="text-muted-foreground">Happy Clients</div>
				</div>
				<div class="p-6">
					<div class="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
					<div class="text-muted-foreground">Support</div>
				</div>
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

	@keyframes fade-in-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fade-in-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animate-fade-in-left {
		animation: fade-in-left 0.8s ease-out forwards;
	}

	.animate-fade-in-right {
		animation: fade-in-right 0.8s ease-out forwards;
	}

	.animation-delay-200 { animation-delay: 0.2s; }
	.animation-delay-400 { animation-delay: 0.4s; }
	.animation-delay-600 { animation-delay: 0.6s; }
	.animation-delay-800 { animation-delay: 0.8s; }
	.animation-delay-1000 { animation-delay: 1s; }
	.animation-delay-1200 { animation-delay: 1.2s; }
</style>