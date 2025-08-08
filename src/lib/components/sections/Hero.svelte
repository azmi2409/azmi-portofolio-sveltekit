<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronDown, Github, Linkedin, Mail } from '@lucide/svelte';

	let mounted = false;
	let mouseX = 0;
	let mouseY = 0;

	onMount(() => {
		mounted = true;
		
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	// Parallax effect calculation
	$: parallaxX = mouseX * 0.01;
	$: parallaxY = mouseY * 0.01;

	const scrollToNext = () => {
		const aboutSection = document.getElementById('about');
		aboutSection?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<section id="hero" class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted pt-16">
	<!-- Animated background elements -->
	<div class="absolute inset-0 overflow-hidden">
		<!-- Floating geometric shapes -->
		<div 
			class="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"
			style="transform: translate({parallaxX * 0.5}px, {parallaxY * 0.3}px)"
		></div>
		<div 
			class="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-lg rotate-45 animate-bounce"
			style="transform: translate({parallaxX * -0.3}px, {parallaxY * 0.5}px) rotate(45deg)"
		></div>
		<div 
			class="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/15 rounded-full animate-ping"
			style="transform: translate({parallaxX * 0.7}px, {parallaxY * -0.4}px)"
		></div>
		
		<!-- Grid pattern overlay -->
		<div class="absolute inset-0 opacity-50">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
						<circle cx="30" cy="30" r="1" fill="currentColor" fill-opacity="0.02" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#dots)" />
			</svg>
		</div>
	</div>

	<!-- Main content -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
		<!-- Profile image with glassmorphism effect -->
		<div class="mb-8 relative inline-block">
			<div class="relative w-32 h-32 mx-auto mb-6">
				<div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-spin-slow"></div>
				<div class="absolute inset-1 bg-background rounded-full flex items-center justify-center">
					<div class="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary">
						A
					</div>
				</div>
			</div>
		</div>

		<!-- Hero text with staggered animations -->
		<div class="space-y-6">
			<div class="{mounted ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h1 class="text-6xl md:text-8xl font-black tracking-tight">
					<span class="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
						AZMI
					</span>
				</h1>
			</div>

			<div class="{mounted ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-400">
				<h2 class="text-2xl md:text-4xl font-light text-muted-foreground mb-4">
					Full Stack Developer & Digital Creator
				</h2>
			</div>

			<div class="{mounted ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-600">
				<p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
					Crafting exceptional digital experiences with modern technologies.
					Specializing in React, Svelte, and cutting-edge web development.
				</p>
			</div>

			<!-- CTA Buttons -->
			<div class="{mounted ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-800 flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
				<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
					View My Work
				</Button>
				<Button variant="outline" size="lg" class="border-2 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
					Get In Touch
				</Button>
			</div>

			<!-- Social links -->
			<div class="{mounted ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1000 flex justify-center space-x-6 mt-12">
				<a href="https://github.com" class="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
					<Github class="w-6 h-6" />
				</a>
				<a href="https://linkedin.com" class="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
					<Linkedin class="w-6 h-6" />
				</a>
				<a href="mailto:hello@azmi.web.id" class="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
					<Mail class="w-6 h-6" />
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<button 
		on:click={scrollToNext}
		class="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300 animate-bounce"
	>
		<ChevronDown class="w-6 h-6" />
	</button>
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

	@keyframes gradient-x {
		0%, 100% {
			background-size: 200% 200%;
			background-position: left center;
		}
		50% {
			background-size: 200% 200%;
			background-position: right center;
		}
	}

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animate-gradient-x {
		animation: gradient-x 3s ease infinite;
	}

	.animate-spin-slow {
		animation: spin-slow 8s linear infinite;
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
</style>