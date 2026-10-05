<script lang="ts">
	const services = [
		{
			title: 'Give your team time back',
			text: 'Turn recordings into follow-ups, organize incoming requests, and prepare routine reports. Spend less time copying information and more time acting on it.'
		},
		{
			title: 'Make operating costs easier to control',
			text: 'Find unnecessary software spend, repeated work, and expensive processes. Choose improvements around your budget and measure the cost of running them.'
		},
		{
			title: 'Make buying and getting help easier',
			text: 'Bring your catalog, payments, order updates, and support together. Give customers a clear next step and your team fewer things to chase.'
		}
	];
</script>

<section id="services" class="border-y border-border px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-7xl">
		<p class="section-index mb-8"><b>(01)</b> How I can help</p>
		<h2 class="max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl">
			Start with the work that <span class="accent-serif text-muted-foreground"
				>slows you down.</span
			>
		</h2>
		<div class="service-list mt-14">
			{#each services as service, index}
				<article class="service-row">
					<p class="service-number">0{index + 1}</p>
					<h3 class="service-title">{service.title}</h3>
					<p class="service-text">{service.text}</p>
				</article>
			{/each}
		</div>
		<div class="mt-20">
			<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">
				A clear path from problem to everyday use.
			</h3>
			<ol class="process mt-10 grid gap-10 leading-7 text-muted-foreground md:grid-cols-3 md:gap-8">
				<li>
					<strong class="text-foreground">Find the opportunity</strong><br />Map your current
					process, time spent, costs, and bottlenecks. Agree on what a useful improvement looks
					like.
				</li>
				<li>
					<strong class="text-foreground">Prove it on one workflow</strong><br />Build a focused
					solution, test it with your team, and keep people in control of important decisions.
				</li>
				<li>
					<strong class="text-foreground">Put it to work</strong><br />Connect it to your existing
					tools, help your team adopt it, and compare time, cost, and quality against the starting
					point.
				</li>
			</ol>
		</div>
	</div>
</section>

<style>
	.service-list {
		border-bottom: 1px solid var(--border);
	}

	.service-row {
		position: relative;
		display: grid;
		gap: 0.75rem;
		padding: 2rem 0;
		border-top: 1px solid var(--border);
	}

	/* Signal rule that draws across the row on hover. */
	.service-row::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--signal);
		transform-origin: left;
		scale: 0 1;
		transition: scale 700ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.service-number {
		color: var(--signal);
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.service-title {
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.1;
		transition: translate 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.service-text {
		max-width: 34rem;
		color: var(--muted-foreground);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.service-row {
			grid-template-columns: 5rem minmax(0, 1fr) minmax(0, 1fr);
			align-items: baseline;
			gap: 2rem;
			padding: 2.5rem 0;
		}
	}

	@media (hover: hover) {
		.service-row:hover::before {
			scale: 1 1;
		}

		.service-row:hover .service-title {
			translate: 0.75rem 0;
		}
	}

	.process {
		counter-reset: step;
	}

	.process li {
		position: relative;
		padding-top: 2.25rem;
		counter-increment: step;
	}

	/* Timeline rail with a numbered node per step. */
	.process li::before {
		content: '';
		position: absolute;
		top: 0.55rem;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, var(--signal), var(--border) 40%);
	}

	.process li::after {
		content: '0' counter(step);
		position: absolute;
		top: 0;
		left: 0;
		padding-right: 0.75rem;
		background: var(--background);
		color: var(--signal);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1.1rem;
	}

	:global(html.light) .process li::after {
		background: #f7f7f5;
	}
</style>
