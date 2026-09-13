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

<section id="services" class="border-y border-border px-6 py-20 sm:py-24">
	<div class="mx-auto max-w-7xl">
		<p class="eyebrow mb-5">How I can help</p>
		<h2 class="text-4xl font-black tracking-tight sm:text-5xl">
			Start with the work that slows you down.
		</h2>
		<div class="mt-10 grid gap-8 md:grid-cols-3">
			{#each services as service, index}
				<article class="border-t border-border pt-6">
					<p class="font-mono text-sm text-[var(--signal)]">0{index + 1}</p>
					<h3 class="mt-4 text-xl font-bold">{service.title}</h3>
					<p class="mt-3 leading-7 text-muted-foreground">{service.text}</p>
				</article>
			{/each}
		</div>
		<div class="mt-10 border-t border-border pt-8">
			<h3 class="text-2xl font-bold">A clear path from problem to everyday use.</h3>
			<ol class="mt-6 grid gap-6 leading-7 text-muted-foreground md:grid-cols-3">
				<li>
					<strong class="text-foreground">1. Find the opportunity</strong><br />Map your current
					process, time spent, costs, and bottlenecks. Agree on what a useful improvement looks
					like.
				</li>
				<li>
					<strong class="text-foreground">2. Prove it on one workflow</strong><br />Build a focused
					solution, test it with your team, and keep people in control of important decisions.
				</li>
				<li>
					<strong class="text-foreground">3. Put it to work</strong><br />Connect it to your
					existing tools, help your team adopt it, and compare time, cost, and quality against the
					starting point.
				</li>
			</ol>
		</div>
	</div>
</section>
