<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Motion, AnimatePresence } from 'svelte-motion';
	import Button from '$lib/components/ui/button/button.svelte';
	import ThreeBackground from '$lib/components/ThreeBackground.svelte';
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

	// Animation variants for svelte-motion
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 12
			}
		}
	};

	// Parallax effect calculation
	$: parallaxX = mouseX * 0.01;
	$: parallaxY = mouseY * 0.01;

	const scrollToNext = () => {
		const aboutSection = document.getElementById('about');
		aboutSection?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<section
	id="hero"
	class="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted pt-16"
>
	<!-- Three.js Glyph Dither Background -->
	<!-- {#if browser}
		<ThreeBackground />
	{/if} -->

	<!-- Animated background elements -->
	<div class="absolute inset-0 overflow-hidden" style="z-index: 2;">
		<!-- Floating geometric shapes with enhanced parallax -->
		<div
			class="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-primary/5 blur-xl"
			style="transform: translate({parallaxX * 0.8}px, {parallaxY * 0.5}px)"
		></div>
		<div
			class="absolute top-40 right-20 h-24 w-24 rotate-45 animate-bounce rounded-lg bg-accent/10"
			style="transform: translate({parallaxX * -0.5}px, {parallaxY * 0.8}px) rotate(45deg)"
		></div>
		<div
			class="absolute bottom-32 left-1/4 h-16 w-16 animate-ping rounded-full bg-primary/8"
			style="transform: translate({parallaxX * 1.2}px, {parallaxY * -0.6}px)"
		></div>
	</div>

	<!-- Main content -->
	<Motion
		let:motion
		initial="hidden"
		animate={mounted ? 'visible' : 'hidden'}
		variants={containerVariants}
	>
		<div use:motion class="relative z-10 mx-auto max-w-6xl px-6 text-center">
			<!-- Profile image with glassmorphism effect -->
			<Motion let:motion variants={itemVariants}>
				<div use:motion class="relative mb-8 inline-block">
					<div class="relative mx-auto mb-6 h-32 w-32">
						<div
							class="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
						></div>
						<div
							class="absolute inset-1 flex items-center justify-center rounded-full bg-background"
						>
							<div
								class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-4xl font-bold text-primary"
							>
								A
							</div>
						</div>
					</div>
				</div>
			</Motion>

			<!-- Hero text with staggered animations -->
			<div class="space-y-6">
				<Motion let:motion variants={itemVariants}>
					<h1 use:motion class="text-6xl font-black tracking-tight md:text-8xl">
						<span
							class="animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
						>
							AZMI
						</span>
					</h1>
				</Motion>

				<Motion let:motion variants={itemVariants}>
					<h2 use:motion class="mb-4 text-2xl font-light text-muted-foreground md:text-4xl">
						Full Stack Developer & Digital Creator
					</h2>
				</Motion>

				<Motion let:motion variants={itemVariants}>
					<p
						use:motion
						class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
					>
						Crafting exceptional digital experiences with modern technologies. Specializing in
						React, Svelte, and cutting-edge web development.
					</p>
				</Motion>

				<!-- CTA Buttons -->
				<Motion let:motion variants={itemVariants}>
					<div use:motion class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							class="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
						>
							View My Work
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="rounded-full border-2 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
						>
							Get In Touch
						</Button>
					</div>
				</Motion>

				<!-- Social links -->
				<Motion let:motion variants={itemVariants}>
					<div use:motion class="mt-12 flex justify-center space-x-6">
						<a
							href="https://github.com/azmi2409"
							class="rounded-full bg-muted p-3 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
						>
							<Github class="h-6 w-6" />
						</a>
						<a
							href="https://linkedin.com/in/azmimuwahid"
							class="rounded-full bg-muted p-3 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
						>
							<Linkedin class="h-6 w-6" />
						</a>
						<a
							href="mailto:hello@azmi.web.id"
							class="rounded-full bg-muted p-3 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
						>
							<Mail class="h-6 w-6" />
						</a>
					</div>
				</Motion>
			</div>
		</div>
	</Motion>

	<!-- Scroll indicator -->
	<button
		on:click={scrollToNext}
		class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce rounded-full border border-border bg-background/80 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-muted"
	>
		<ChevronDown class="h-6 w-6" />
	</button>
</section>

<style>
	@keyframes gradient-x {
		0%,
		100% {
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

	.animate-gradient-x {
		animation: gradient-x 3s ease infinite;
	}

	.animate-spin-slow {
		animation: spin-slow 8s linear infinite;
	}
</style>
