<!--
  HeroSection.svelte
  Top-of-page hero section displaying name, title, tagline, achievements, CTAs, and social links.
  Lazy-loads Hero3DElement when WebGL is available and device is capable; shows HeroFallback otherwise.
  Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.4, 11.5, 11.6, 13.4
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Linkedin, Github, Mail, ArrowRight, Sparkles } from '@lucide/svelte';
	import { detectCapabilities } from '$lib/utils/device';
	import HeroFallback from './HeroFallback.svelte';

	let Hero3DComponent: any = $state(null);
	let mounted = $state(false);

	const achievements = [
		{ label: '200% B2B Sales Increase', variant: 'secondary' as const },
		{ label: '40% AWS Cost Reduction', variant: 'secondary' as const },
		{ label: 'AI Mentorship Program', variant: 'secondary' as const }
	];

	onMount(async () => {
		mounted = true;

		const capabilities = detectCapabilities();

		if (capabilities.webglAvailable && !capabilities.isLowEnd) {
			try {
				const module = await import('./Hero3DElement.svelte');
				Hero3DComponent = module.default;
			} catch {
				// Dynamic import failed — keep fallback
				Hero3DComponent = null;
			}
		}
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section
	id="hero"
	class="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
>
	<!-- Background: 3D element or fallback -->
	{#if Hero3DComponent}
		<Hero3DComponent />
	{:else}
		<HeroFallback />
	{/if}

	<!-- Content overlay -->
	<div class="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
		<!-- Greeting chip -->
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-opacity duration-700"
			class:opacity-0={!mounted}
			class:opacity-100={mounted}
		>
			<Sparkles class="h-3.5 w-3.5" />
			<span>Building the future of EdTech</span>
		</div>

		<!-- Name -->
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight text-foreground transition-all duration-700 sm:text-5xl md:text-6xl lg:text-7xl"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			Azmi Muwahid
		</h1>

		<!-- Title -->
		<p
			class="mb-4 text-xl font-medium text-primary transition-all delay-100 duration-700 sm:text-2xl"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			Senior Full Stack Engineer
		</p>

		<!-- Tagline -->
		<p
			class="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground transition-all delay-200 duration-700 sm:text-lg"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			Crafting AI-powered EdTech solutions at
			<span class="font-semibold text-foreground">FutureLab.my</span>
			— turning complex ideas into elegant, scalable products.
		</p>

		<!-- Achievement badges -->
		<div
			class="mb-10 flex flex-wrap items-center justify-center gap-2 transition-all delay-300 duration-700"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			{#each achievements as achievement}
				<Badge variant={achievement.variant} class="px-3 py-1 text-xs sm:text-sm">
					{achievement.label}
				</Badge>
			{/each}
		</div>

		<!-- CTA buttons -->
		<div
			class="mb-12 flex flex-col items-center justify-center gap-3 transition-all delay-[400ms] duration-700 sm:flex-row sm:gap-4"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			<Button
				size="lg"
				class="min-h-[44px] min-w-[44px] gap-2 rounded-full px-8 text-base font-semibold shadow-md transition-transform hover:scale-[1.03]"
				onclick={() => scrollTo('projects')}
			>
				View Projects
				<ArrowRight class="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="lg"
				class="min-h-[44px] min-w-[44px] rounded-full px-8 text-base font-semibold transition-transform hover:scale-[1.03]"
				onclick={() => scrollTo('contact')}
			>
				Get in Touch
			</Button>
		</div>

		<!-- Social links -->
		<div
			class="flex items-center justify-center gap-4 transition-all delay-500 duration-700"
			class:translate-y-4={!mounted}
			class:opacity-0={!mounted}
			class:translate-y-0={mounted}
			class:opacity-100={mounted}
		>
			<a
				href="https://linkedin.com/in/azmimuwahid"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn profile"
				class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/60 text-muted-foreground backdrop-blur-sm transition-all hover:scale-110 hover:border-primary/50 hover:text-primary"
			>
				<Linkedin class="h-5 w-5" />
			</a>
			<a
				href="https://github.com/azmimuwahid"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub profile"
				class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/60 text-muted-foreground backdrop-blur-sm transition-all hover:scale-110 hover:border-primary/50 hover:text-primary"
			>
				<Github class="h-5 w-5" />
			</a>
			<a
				href="mailto:azmimuwahid@gmail.com"
				aria-label="Send email"
				class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/60 text-muted-foreground backdrop-blur-sm transition-all hover:scale-110 hover:border-primary/50 hover:text-primary"
			>
				<Mail class="h-5 w-5" />
			</a>
		</div>
	</div>
</section>
