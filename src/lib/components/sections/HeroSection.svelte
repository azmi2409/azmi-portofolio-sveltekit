<script lang="ts">
	import { ArrowDown, ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import LocalTime from '$lib/components/LocalTime.svelte';
	import type { SiteMetric } from '$lib/types/portfolio';
	let { metrics = [] }: { metrics?: SiteMetric[] } = $props();
	let hero: HTMLElement;

	// Soft signal-coloured spotlight that trails a fine pointer across the hero.
	onMount(() => {
		const enabled = window.matchMedia(
			'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
		);
		let frame = 0;
		const move = (event: PointerEvent) => {
			if (!enabled.matches) return;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const bounds = hero.getBoundingClientRect();
				hero.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
				hero.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
				hero.classList.add('spot-on');
			});
		};
		const leave = () => {
			cancelAnimationFrame(frame);
			hero.classList.remove('spot-on');
		};
		hero.addEventListener('pointermove', move);
		hero.addEventListener('pointerleave', leave);
		return () => {
			leave();
			hero.removeEventListener('pointermove', move);
			hero.removeEventListener('pointerleave', leave);
		};
	});
</script>

<section id="hero" bind:this={hero} class="px-6 pt-32 pb-12 sm:pt-40 sm:pb-16">
	<div class="hero-copy mx-auto max-w-7xl">
		<div class="hero-reveal flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
			<p class="eyebrow">Azmi Muwahid · AI & Automation Consultant</p>
			<LocalTime
				class="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase"
			/>
		</div>
		<h1
			class="hero-title mt-8 text-[clamp(2.6rem,12.5vw,10.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] sm:mt-10"
		>
			<span class="line" style="--i: 0"><span>Less busywork.</span></span>
			<span class="line" style="--i: 1"><span>More room to</span></span>
			<span class="line accent-serif text-[var(--signal)]" style="--i: 2"
				><span>grow your business.</span></span
			>
		</h1>

		<div
			class="mt-10 grid items-start gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-20"
		>
			<div class="hero-reveal">
				<p class="max-w-xl text-lg leading-8 text-muted-foreground">
					I help you use AI and practical software to automate repetitive work, reduce operating
					costs, and serve customers better. From finding the right opportunity to building a
					solution your team can use every day.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a class="button-primary" href="#projects"
						>See solutions in action <ArrowRight class="h-4 w-4" /></a
					>
					<a class="button-secondary" href="#contact">Discuss your business</a>
				</div>
				<div class="mt-5 flex flex-wrap gap-x-6 text-sm font-semibold">
					<a
						class="inline-flex min-h-11 items-center"
						href="https://linkedin.com/in/azmimuwahid"
						target="_blank"
						rel="noreferrer"><span class="link-sweep">LinkedIn</span></a
					>
					<a
						class="inline-flex min-h-11 items-center"
						href="https://github.com/azmi2409"
						target="_blank"
						rel="noreferrer"><span class="link-sweep">GitHub</span></a
					>
					<a
						class="inline-flex min-h-11 items-center"
						href="mailto:azmimuwahid@gmail.com?subject=R%C3%A9sum%C3%A9%20request"
						><span class="link-sweep">Request résumé</span></a
					>
				</div>
				<dl class="hero-metrics mt-10 grid border-y border-border sm:grid-cols-3">
					{#each metrics as metric, index}
						<div class="py-5 sm:px-5 sm:first:pl-0">
							<dt class="flex items-baseline gap-2 text-xs text-muted-foreground">
								<span class="font-mono text-[0.6rem] text-[var(--signal)]">0{index + 1}</span
								>{metric.label}
							</dt>
							<dd
								class="mt-2 font-[family-name:var(--font-heading)] text-lg leading-snug font-semibold tracking-[-0.03em]"
							>
								{metric.value}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
			<figure class="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
				<div class="hero-portrait">
					<img
						src="/assets/profile.webp"
						alt="Azmi Muwahid outside the Amazon Spheres in Seattle"
						width="819"
						height="1024"
						fetchpriority="high"
						class="aspect-[4/5] w-full rounded-2xl object-cover"
					/>
					<span class="portrait-tag">Photo · Seattle, WA</span>
				</div>
				<!-- Decorative duplicate of the "Discuss your business" action for pointer users. -->
				<a href="#contact" class="hero-badge" tabindex="-1" aria-hidden="true">
					<svg viewBox="0 0 100 100" class="hero-badge-ring">
						<defs>
							<path id="hero-badge-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
						</defs>
						<text
							><textPath href="#hero-badge-path"
								>Available for new projects · Remote worldwide ·</textPath
							></text
						>
					</svg>
					<span class="hero-badge-core"><ArrowUpRight class="h-5 w-5" /></span>
				</a>
				<figcaption class="mt-4 text-right text-xs text-muted-foreground">
					Business first. Technology with a purpose.
				</figcaption>
			</figure>
		</div>
		<a
			href="#services"
			class="scroll-cue mt-8 hidden w-fit items-center gap-3 font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase sm:inline-flex"
		>
			<span class="scroll-cue-icon"><ArrowDown class="h-3.5 w-3.5" /></span>
			Scroll to explore
		</a>
	</div>
</section>

<style>
	#hero {
		position: relative;
		isolation: isolate;
	}

	#hero::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(
				ellipse at 78% 34%,
				color-mix(in srgb, var(--signal) 16%, transparent),
				transparent 48%
			),
			linear-gradient(
				120deg,
				transparent 45%,
				color-mix(in srgb, var(--signal) 4%, transparent),
				transparent 75%
			);
		mask-image: linear-gradient(black 65%, transparent);
	}

	/* Pointer spotlight; position comes from the script, never animated. */
	#hero::after {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			32rem circle at var(--spot-x, 50%) var(--spot-y, 30%),
			color-mix(in srgb, var(--signal) 11%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 600ms ease;
	}

	:global(#hero.spot-on)::after {
		opacity: 1;
	}

	.portrait-tag {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		padding: 0.35rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 999px;
		background: rgba(9, 9, 11, 0.6);
		color: #e4e4e7;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		backdrop-filter: blur(8px);
	}

	.hero-badge {
		position: absolute;
		/* bottom-left so the portrait's tilt surface stays unobstructed */
		bottom: -1rem;
		left: -2.75rem;
		display: grid;
		width: 7.5rem;
		height: 7.5rem;
		place-items: center;
		border-radius: 50%;
		background: var(--background);
		box-shadow: 0 0 0 1px var(--border);
		color: var(--foreground);
	}

	.hero-badge-ring {
		position: absolute;
		inset: 0.35rem;
		width: calc(100% - 0.7rem);
		height: calc(100% - 0.7rem);
		fill: currentColor;
		font-family: var(--font-mono);
		font-size: 7.4px;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	.hero-badge-core {
		display: grid;
		width: 2.75rem;
		height: 2.75rem;
		place-items: center;
		border-radius: 50%;
		background: var(--signal);
		color: #fff;
		transition: rotate 500ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-badge:hover .hero-badge-core {
		rotate: 45deg;
	}

	@media (max-width: 1023px) {
		.hero-badge {
			top: -2rem;
			bottom: auto;
			left: auto;
			right: -1rem;
			width: 6rem;
			height: 6rem;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-badge-ring {
			animation: spin 18s linear infinite;
		}
	}

	@keyframes spin {
		to {
			rotate: 360deg;
		}
	}

	.hero-title .line {
		display: block;
		overflow: clip;
		/* room for descenders without loosening the tight leading */
		padding-bottom: 0.1em;
		margin-bottom: -0.1em;
	}

	.hero-title .line > span {
		display: block;
	}

	/* Italic serif descenders (g, y) sit lower than the grotesk's. */
	.hero-title .line.accent-serif {
		padding-bottom: 0.2em;
		margin-bottom: -0.2em;
		letter-spacing: -0.025em;
	}

	.hero-metrics > div + div {
		border-top: 1px solid var(--border);
	}

	@media (min-width: 640px) {
		.hero-metrics > div + div {
			border-top: 0;
			border-left: 1px solid var(--border);
		}
	}

	.scroll-cue-icon {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		color: var(--foreground);
	}

	.scroll-cue:hover .scroll-cue-icon {
		border-color: var(--signal);
		color: var(--signal);
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-title .line > span {
			animation: line-up 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
			animation-delay: calc(var(--i) * 90ms + 80ms);
		}

		.hero-portrait img {
			animation: portrait-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
		}

		.scroll-cue-icon :global(svg) {
			animation: cue 2.4s cubic-bezier(0.65, 0, 0.35, 1) 1.6s 3;
		}
	}

	@keyframes line-up {
		from {
			translate: 0 110%;
			rotate: 0 0 1 2deg;
		}
	}

	@keyframes portrait-in {
		from {
			clip-path: inset(100% 0 0 0 round 1rem);
			scale: 1.18;
		}
		to {
			clip-path: inset(0 0 0 0 round 1rem);
		}
	}

	@keyframes cue {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 4px;
		}
	}

	.hero-copy {
		position: relative;
		isolation: isolate;
	}

	.hero-copy::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: -2rem -1rem;
		pointer-events: none;
		background-image: radial-gradient(
			circle,
			color-mix(in srgb, var(--signal) 32%, transparent) 1px,
			transparent 1.5px
		);
		background-size: 20px 20px;
		mask-image: radial-gradient(ellipse at 45% 35%, black, transparent 72%);
	}

	.hero-portrait {
		position: relative;
		border-radius: 1rem;
		transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
		transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 30px 80px -35px color-mix(in srgb, var(--signal) 35%, transparent);
	}

	.hero-portrait::before {
		content: '';
		position: absolute;
		inset: -1px;
		z-index: -1;
		border-radius: inherit;
		background: linear-gradient(
			145deg,
			var(--signal),
			transparent 35%,
			transparent 65%,
			var(--border)
		);
	}

	.hero-portrait::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background: radial-gradient(
			circle at var(--pointer-x, 50%) var(--pointer-y, 20%),
			#ffffff24,
			transparent 60%
		);
		opacity: 0;
		transition: opacity 350ms ease;
	}

	@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
		.hero-portrait:hover::after {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-portrait {
			transform: none;
		}
	}
</style>
