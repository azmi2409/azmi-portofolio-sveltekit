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
		{
			name: 'UI/UX Design',
			icon: Palette,
			description: 'Figma, Adobe Creative Suite, Design Systems'
		},
		{ name: 'Performance Optimization', icon: Zap, description: 'Web Vitals, SEO, Accessibility' },
		{ name: 'Team Leadership', icon: Users, description: 'Agile, Mentoring, Project Management' }
	];

	const technologies = [
		'JavaScript',
		'TypeScript',
		'React',
		'Svelte',
		'Node.js',
		'Python',
		'PostgreSQL',
		'MongoDB',
		'Docker',
		'AWS',
		'Git',
		'Figma'
	];
</script>

<section id="about" bind:this={sectionElement} class="bg-muted/30 py-20">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section header -->
		<div class="mb-16 text-center">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="mb-4 text-4xl font-bold md:text-5xl">
					About <span class="text-primary">Me</span>
				</h2>
				<div class="mx-auto mb-6 h-1 w-24 bg-primary"></div>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					Passionate developer with 5+ years of experience creating digital solutions that make a
					difference.
				</p>
			</div>
		</div>

		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- Left column - Story -->
			<div class="{isVisible ? 'animate-fade-in-left' : 'opacity-0'} animation-delay-400">
				<div class="prose prose-lg max-w-none">
					<h3 class="mb-6 text-2xl font-semibold text-foreground">My Journey</h3>
					<p class="mb-6 leading-relaxed text-muted-foreground">
						I’m a <span class="font-semibold text-foreground">Senior Full Stack Engineer</span> with a 6-year track record of shipping scalable web apps. These days, I’m obsessed with moving beyond simple chat interfaces. I specialize in building <span class="font-semibold text-foreground">Agentic Workflows, RAG architectures</span>, and low-latency <span class="font-semibold text-foreground">AI Audio streaming</span>—essentially, making AI systems that don't just talk, but actually act and reason in real-time.
					</p>
					<p class="leading-relaxed text-muted-foreground">
						<span class="italic text-zinc-400">Expert Note:</span> I transitioned from systems thinking in marine biology to architecting sustainable tech solutions, bringing a unique perspective on complex ecosystem modeling to my software architecture.
					</p>
				</div>

				<!-- Technologies -->
				<div class="mt-8">
					<h4 class="mb-4 text-lg font-semibold">Technologies I Love</h4>
					<div class="flex flex-wrap gap-2">
						{#each technologies as tech, index}
							<span
								class="cursor-default rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
								style="animation-delay: {index * 0.1 + 0.6}s"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right column - Skills -->
			<div class="{isVisible ? 'animate-fade-in-right' : 'opacity-0'} animation-delay-600">
				<h3 class="mb-8 text-2xl font-semibold">Experience & Education</h3>
				<div class="space-y-6">
					<!-- Exp 1 -->
					<div class="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50">
						<div class="flex flex-col">
							<span class="text-xs font-bold uppercase tracking-widest text-zinc-500">Feb 2023 – Present</span>
							<h4 class="mt-1 text-lg font-bold">Senior Fullstack Engineer</h4>
							<p class="text-sm font-medium text-zinc-400">FutureLab.my (Remote)</p>
						</div>
					</div>
					<!-- Exp 2 -->
					<div class="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50">
						<div class="flex flex-col">
							<span class="text-xs font-bold uppercase tracking-widest text-zinc-500">July 2022 – Feb 2023</span>
							<h4 class="mt-1 text-lg font-bold">Frontend Developer</h4>
							<p class="text-sm font-medium text-zinc-400">Automa8e (Remote)</p>
						</div>
					</div>
					<!-- Exp 3 -->
					<div class="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50">
						<div class="flex flex-col">
							<span class="text-xs font-bold uppercase tracking-widest text-zinc-500">June 2021 – Feb 2023</span>
							<h4 class="mt-1 text-lg font-bold">Full Stack Developer</h4>
							<p class="text-sm font-medium text-zinc-400">Embreo Pte Ltd (Remote)</p>
						</div>
					</div>
					<!-- Edu -->
					<div class="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50">
						<div class="flex flex-col">
							<span class="text-xs font-bold uppercase tracking-widest text-zinc-500">Bachelor of Fisheries</span>
							<h4 class="mt-1 text-lg font-bold">IPB University</h4>
							<p class="text-sm font-medium text-zinc-400">Minor in Information Systems</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Stats section -->
		<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1200 mt-20">
			<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
				<div class="p-6">
					<div class="mb-2 text-3xl font-bold text-primary md:text-4xl">5+</div>
					<div class="text-muted-foreground">Years Experience</div>
				</div>
				<div class="p-6">
					<div class="mb-2 text-3xl font-bold text-primary md:text-4xl">50+</div>
					<div class="text-muted-foreground">Projects Completed</div>
				</div>
				<div class="p-6">
					<div class="mb-2 text-3xl font-bold text-primary md:text-4xl">30+</div>
					<div class="text-muted-foreground">Happy Clients</div>
				</div>
				<div class="p-6">
					<div class="mb-2 text-3xl font-bold text-primary md:text-4xl">24/7</div>
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
</style>
