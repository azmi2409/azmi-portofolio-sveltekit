<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { SiteMetric } from '$lib/types/portfolio';
	let { metrics = [] }: { metrics?: SiteMetric[] } = $props();
</script>

<section id="hero" class="px-6 pt-32 pb-12 sm:pt-40 sm:pb-16">
	<div class="mx-auto max-w-7xl">
		<div class="grid items-center gap-10 lg:grid-cols-[1.35fr_0.8fr] lg:gap-20">
			<div class="hero-copy">
				<p class="eyebrow mb-6">Azmi Muwahid · AI & Automation Consultant</p>
				<h1 class="text-[clamp(2.8rem,5.7vw,5.5rem)] leading-[1.02] font-black tracking-[-0.055em]">
					Less busywork.<br />More room to
					<span class="text-[var(--signal)]">grow your business.</span>
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
					I help you use AI and practical software to automate repetitive work, reduce operating
					costs, and serve customers better. From finding the right opportunity to building a
					solution your team can use every day.
				</p>
				<p class="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
					<span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--signal)]"></span>
					Available for remote consulting and hands-on delivery.
				</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<a class="button-primary" href="#projects"
						>See solutions in action <ArrowRight class="h-4 w-4" /></a
					>
					<a class="button-secondary" href="#contact">Discuss your business</a>
				</div>
				<div class="mt-5 flex flex-wrap gap-x-6 text-sm font-semibold">
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="https://linkedin.com/in/azmimuwahid"
						target="_blank"
						rel="noreferrer">LinkedIn</a
					>
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="https://github.com/azmi2409"
						target="_blank"
						rel="noreferrer">GitHub</a
					>
					<a
						class="inline-flex min-h-11 items-center hover:underline"
						href="mailto:azmimuwahid@gmail.com?subject=R%C3%A9sum%C3%A9%20request">Request résumé</a
					>
				</div>
			</div>
			<figure class="mx-auto w-full max-w-sm lg:max-w-none">
				<div class="hero-portrait">
					<img
						src="/assets/profile.webp"
						alt="Azmi Muwahid outside the Amazon Spheres in Seattle"
						width="819"
						height="1024"
						fetchpriority="high"
						class="aspect-[4/5] w-full rounded-2xl object-cover"
					/>
				</div>
				<figcaption class="mt-4 flex justify-between gap-4 text-xs text-muted-foreground">
					<span>Business first. Technology with a purpose.</span><span>Seattle, WA</span>
				</figcaption>
			</figure>
		</div>
		<dl class="mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
			{#each metrics as metric}
				<div>
					<dt class="text-sm text-muted-foreground">{metric.label}</dt>
					<dd class="mt-2 font-semibold">{metric.value}</dd>
				</div>
			{/each}
		</dl>
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
