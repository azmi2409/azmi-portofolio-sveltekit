<script lang="ts">
	import { ArrowDownRight, ArrowRight, Mail } from '@lucide/svelte';
	import { socialLinks, emailLink } from '$lib/config/socialLinks';
	import SocialIcon from '$lib/components/icons/SocialIcon.svelte';
	import type { SiteMetric } from '$lib/types/portfolio';
	import HeroSpatialScene from './HeroSpatialScene.svelte';

	let { metrics = [] }: { metrics?: SiteMetric[] } = $props();
</script>

<section id="hero" class="hero-shell relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
	<div class="editorial-grid pointer-events-none absolute inset-0 opacity-40"></div>
	<div class="hero-aurora pointer-events-none absolute inset-x-0 top-0 h-[52rem]"></div>

	<div class="relative mx-auto max-w-7xl">
		<div class="grid gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-10">
			<div class="hero-copy">
				<div class="eyebrow mb-7">
					<span class="availability-dot"></span>
					Available for select product work · 2026
				</div>

				<h1
					class="max-w-4xl text-[clamp(3.4rem,7.1vw,6.7rem)] leading-[0.9] font-black tracking-[-0.065em] text-zinc-50"
				>
					AI systems for the
					<span class="signal-text">messy middle.</span>
				</h1>

				<p class="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
					I’m Azmi Muwahid. I design and ship agentic workflows, RAG systems, and realtime
					interfaces where model behavior, product UX, and backend reliability have to agree.
				</p>

				<div class="mt-10 flex flex-col gap-3 sm:flex-row">
					<a class="button-primary group" href="/projects">
						Explore case studies
						<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</a>
					<a class="button-secondary" href="/contact"> Start a conversation </a>
				</div>

				<div class="mt-9 flex items-center gap-2 text-zinc-500">
					{#each socialLinks.slice(0, 4) as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							class="social-button"
						>
							<SocialIcon name={social.icon} class="h-4 w-4" />
						</a>
					{/each}
					<a href={emailLink.href} aria-label={emailLink.label} class="social-button">
						<Mail class="h-4 w-4" />
					</a>
					<span
						class="ml-2 hidden font-mono text-[0.63rem] tracking-[0.16em] text-zinc-600 uppercase sm:inline"
					>
						Jakarta · working globally
					</span>
				</div>
			</div>

			<div class="hero-scene">
				<HeroSpatialScene />
			</div>
		</div>

		<div class="mt-12 grid border-y border-white/[0.07] sm:grid-cols-[auto_1fr] lg:mt-16">
			<div
				class="flex items-center gap-3 border-b border-white/[0.07] py-5 pr-8 sm:border-r sm:border-b-0"
			>
				<ArrowDownRight class="h-4 w-4 text-emerald-300/70" />
				<span class="font-mono text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase"
					>Proof over promises</span
				>
			</div>
			<div class="grid sm:grid-cols-3">
				{#each metrics as metric}
					<article class="metric-item">
						<p class="text-lg font-bold tracking-tight text-zinc-100">{metric.value}</p>
						<h2 class="mt-1 text-xs font-semibold text-zinc-400">{metric.label}</h2>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.hero-shell {
		min-height: 100svh;
	}

	.hero-aurora {
		background:
			radial-gradient(circle at 72% 25%, rgba(87, 208, 181, 0.11), transparent 29%),
			radial-gradient(circle at 28% 8%, rgba(255, 255, 255, 0.055), transparent 25%);
		mask-image: linear-gradient(to bottom, black 62%, transparent);
	}

	.hero-copy,
	.hero-scene {
		animation: hero-enter 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.hero-scene {
		animation-delay: 100ms;
	}

	.signal-text {
		display: block;
		background: linear-gradient(100deg, #f4f4f5 5%, #9be5d5 64%, #5ea997);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.availability-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: #6ee7b7;
		box-shadow:
			0 0 0 4px rgba(110, 231, 183, 0.08),
			0 0 14px rgba(110, 231, 183, 0.45);
	}

	.metric-item {
		padding: 1.2rem 1.4rem;
		border-right: 1px solid rgba(255, 255, 255, 0.07);
	}

	.metric-item:last-child {
		border-right: 0;
	}

	@keyframes hero-enter {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 639px) {
		.metric-item {
			border-right: 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.07);
			padding-inline: 0;
		}

		.metric-item:last-child {
			border-bottom: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-copy,
		.hero-scene {
			animation: none;
		}
	}
</style>
