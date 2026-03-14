<!--
  HeroSection.svelte
  Award-winning fullscreen hero with typewriter role text, Three.js 3D animation,
  staggered fade-in content, CTA buttons, social links, and scroll indicator.
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import { Github, Linkedin, Mail, ArrowDown, ArrowRight, ExternalLink } from '@lucide/svelte';
	import { detectCapabilities } from '$lib/utils/device';
	import HeroFallback from './HeroFallback.svelte';

	let Hero3DComponent: any = $state(null);
	let mounted = $state(false);
	let typedText = $state('');
	let typewriterDone = $state(false);

	const roles = [
		'Senior Fullstack Engineer',
		'AI Builder & Architect',
		'EdTech Craftsman',
		'Open Source Contributor'
	];
	let roleIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typeTimer: ReturnType<typeof setTimeout>;

	function typewriter() {
		const current = roles[roleIndex];

		if (!isDeleting) {
			typedText = current.slice(0, charIndex + 1);
			charIndex++;
			if (charIndex === current.length) {
				isDeleting = true;
				typeTimer = setTimeout(typewriter, 2200);
				return;
			}
		} else {
			typedText = current.slice(0, charIndex - 1);
			charIndex--;
			if (charIndex === 0) {
				isDeleting = false;
				roleIndex = (roleIndex + 1) % roles.length;
				typeTimer = setTimeout(typewriter, 400);
				return;
			}
		}

		typeTimer = setTimeout(typewriter, isDeleting ? 52 : 80);
	}

	onMount(async () => {
		mounted = true;

		// Start typewriter
		typeTimer = setTimeout(typewriter, 900);

		// Load 3D component
		const capabilities = detectCapabilities();
		if (capabilities.webglAvailable && !capabilities.isLowEnd) {
			try {
				const module = await import('./Hero3DElement.svelte');
				Hero3DComponent = module.default;
			} catch {
				Hero3DComponent = null;
			}
		}

		return () => clearTimeout(typeTimer);
	});

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	const socialLinks = [
		{
			label: 'GitHub',
			href: 'https://github.com/azmimuwahid',
			icon: Github
		},
		{
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/azmimuwahid',
			icon: Linkedin
		},
		{
			label: 'Email',
			href: 'mailto:azmimuwahid@gmail.com',
			icon: Mail
		}
	];

	const achievements = [
		'200% B2B Growth',
		'40% AWS Cost Reduction',
		'AI-Powered EdTech'
	];
</script>

<section
	id="hero"
	class="relative flex min-h-screen items-center justify-center overflow-hidden"
	style="background: var(--gradient-hero);"
>
	<!-- Radial gradient overlay for depth -->
	<div
		class="pointer-events-none absolute inset-0 hidden"
	></div>

	<!-- CSS/SVG geometric background -->
	<div class="absolute inset-0">
		{#if Hero3DComponent}
			<Hero3DComponent />
		{:else}
			<HeroFallback />
		{/if}
	</div>

	<!-- ── Content ── -->
	<div class="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">

		<!-- Availability badge -->
		<div
			class="mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-700"
			style="
				border-color: rgba(255,255,255,0.2);
				background: rgba(255,255,255,0.08);
				color: #fafafa;
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : -8}px);
				backdrop-filter: blur(8px);
				transition-delay: 0ms;
			"
		>
			<span
				class="inline-block h-2 w-2 rounded-full"
				style="background: #fafafa; box-shadow: 0 0 6px rgba(255,255,255,0.5);"
			></span>
			Open to new opportunities
		</div>

		<!-- Name -->
		<h1
			class="mb-4 text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
			style="
				font-family: var(--font-heading);
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 28}px);
				transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
			"
		>
			<span
				style="
					background: linear-gradient(135deg, #ffffff 0%, #ffffff 65%, #a1a1aa 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				"
			>
				Azmi Muwahid
			</span>
		</h1>

		<!-- Role typewriter -->
		<div
			class="mb-6 flex h-10 items-center justify-center gap-1 text-xl font-semibold sm:text-2xl"
			style="
				color: #f4f4f5;
				font-family: var(--font-heading);
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 20}px);
				transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
			"
			aria-live="polite"
		>
			<span>{typedText}</span>
			<span class="cursor-blink ml-0.5 text-current" style="opacity: 0.8;">|</span>
		</div>

		<!-- Tagline -->
		<p
			class="mx-auto mb-8 max-w-2xl text-base leading-relaxed sm:text-lg"
			style="
				color: #94a3b8;
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 16}px);
				transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
			"
		>
			Crafting AI-powered EdTech solutions at
			<span style="color: #f8fafc; font-weight: 600;">FutureLab.my</span>
			— turning complex ideas into elegant, scalable products that reach thousands of learners.
		</p>

		<!-- Achievement chips -->
		<div
			class="mb-10 flex flex-wrap items-center justify-center gap-2"
			style="
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 12}px);
				transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
			"
		>
			{#each achievements as chip}
				<span
					class="rounded-full px-3 py-1 text-xs font-medium"
					style="
						background: rgba(255,255,255,0.05);
						border: 1px solid rgba(255,255,255,0.1);
						color: #cbd5e1;
					"
				>
					{chip}
				</span>
			{/each}
		</div>

		<!-- CTA buttons -->
		<div
			class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
			style="
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 12}px);
				transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
			"
		>
			<button
				onclick={() => scrollTo('projects')}
				class="group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-bold transition-all duration-200"
				style="
					background: #fafafa;
					color: #09090b;
					box-shadow: 0 0 20px rgba(255,255,255,0.15);
					min-width: 160px;
					justify-content: center;
				"
				onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
				onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
			>
				View My Work
				<ArrowRight class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
			</button>

			<button
				onclick={() => scrollTo('contact')}
				class="group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-bold transition-all duration-200"
				style="
					background: transparent;
					color: #f8fafc;
					border: 1px solid rgba(255,255,255,0.15);
					backdrop-filter: blur(8px);
					min-width: 160px;
					justify-content: center;
				"
				onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
				onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#f8fafc'; }}
			>
				Get in Touch
				<ExternalLink class="h-4 w-4" />
			</button>
		</div>

		<!-- Social links -->
		<div
			class="flex items-center justify-center gap-4"
			style="
				opacity: {mounted ? 1 : 0};
				transform: translateY({mounted ? 0 : 8}px);
				transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
			"
		>
			{#each socialLinks as { label, href, icon: Icon }}
				<a
					{href}
					target={href.startsWith('http') ? '_blank' : undefined}
					rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
					aria-label={label}
					class="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200"
					style="
						background: rgba(255,255,255,0.05);
						border: 1px solid rgba(255,255,255,0.1);
						color: #94a3b8;
					"
					onmouseenter={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'rgba(255,255,255,0.3)';
						el.style.color = '#fafafa';
						el.style.boxShadow = '0 0 12px rgba(255,255,255,0.15)';
						el.style.transform = 'translateY(-2px)';
					}}
					onmouseleave={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'rgba(255,255,255,0.1)';
						el.style.color = '#94a3b8';
						el.style.boxShadow = 'none';
						el.style.transform = 'translateY(0)';
					}}
				>
					<Icon class="h-5 w-5" />
				</a>
			{/each}
		</div>
	</div>

	<!-- Scroll indicator -->
	{#if mounted}
		<button
			onclick={() => scrollTo('tech-stack')}
			class="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-200"
			style="opacity: 0.5; color: #94a3b8;"
			aria-label="Scroll to tech stack"
			onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.color = '#fafafa'; }}
			onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
		>
			<div class="flex flex-col items-center gap-1.5">
				<span class="text-xs font-medium tracking-widest uppercase">Scroll</span>
				<ArrowDown class="h-4 w-4 animate-bounce" />
			</div>
		</button>
	{/if}
</section>
