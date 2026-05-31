<script lang="ts">
	const steps = [
		{
			title: 'User signal',
			copy: 'Prompt, voice, pause, click, or business event enters the system.'
		},
		{
			title: 'Context layer',
			copy: 'RAG retrieves product, policy, and session context with traceable sources.'
		},
		{
			title: 'Agent policy',
			copy: 'The workflow decides whether to answer, ask, call a tool, or wait.'
		},
		{
			title: 'Tool / audio loop',
			copy: 'Typed and streamed interfaces call APIs, jobs, or realtime audio services.'
		},
		{
			title: 'Business outcome',
			copy: 'The UI exposes a useful result, not an impressive internal chain of thought.'
		}
	];

	let active = $state(0);
</script>

<section id="systems-map" class="relative border-y border-white/[0.06] px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-12 max-w-3xl">
			<p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
				Signature interaction
			</p>
			<h2 class="text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl">AI Systems Map</h2>
			<p class="mt-5 text-lg leading-8 text-zinc-400">
				A lightweight map of how I think about agentic product work: signals become context, policy,
				tool calls, interface feedback, and eventually a measurable product outcome.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="space-y-2" role="tablist" aria-label="AI systems workflow steps">
				{#each steps as step, index}
					<button
						class="w-full rounded-2xl border p-4 text-left transition {active === index
							? 'border-white/25 bg-white/[0.08]'
							: 'border-white/[0.06] bg-white/[0.025] hover:border-white/15'}"
						onclick={() => (active = index)}
						role="tab"
						aria-selected={active === index}
					>
						<span class="text-xs font-mono text-zinc-500">0{index + 1}</span>
						<span class="ml-3 text-sm font-bold text-zinc-100">{step.title}</span>
						<p class="mt-2 text-sm leading-6 text-zinc-500">{step.copy}</p>
					</button>
				{/each}
			</div>

			<div
				class="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950 p-6"
			>
				<svg
					viewBox="0 0 760 360"
					class="h-full min-h-[24rem] w-full"
					role="img"
					aria-label="Agentic workflow map diagram"
				>
					<defs>
						<linearGradient id="flow" x1="0" x2="1">
							<stop offset="0%" stop-color="#71717a" />
							<stop offset="100%" stop-color="#fafafa" />
						</linearGradient>
					</defs>
					{#each steps as step, index}
						{@const x = 80 + index * 150}
						<circle
							cx={x}
							cy="160"
							r={active === index ? 42 : 32}
							class="map-node"
							fill={active === index ? '#fafafa' : '#18181b'}
							stroke={active === index ? '#fafafa' : '#3f3f46'}
						/>
						<text
							{x}
							y="166"
							text-anchor="middle"
							class="fill-zinc-950 text-sm font-bold {active === index ? '' : 'fill-zinc-400'}"
							>0{index + 1}</text
						>
						<text {x} y="238" text-anchor="middle" class="fill-zinc-400 text-[13px] font-semibold"
							>{step.title}</text
						>
						{#if index < steps.length - 1}
							<path
								d="M {x + 42} 160 C {x + 72} 112, {x + 108} 112, {x + 138} 160"
								fill="none"
								stroke="url(#flow)"
								stroke-width="2"
								stroke-dasharray="8 10"
								class:active-path={active >= index}
							/>
						{/if}
					{/each}
				</svg>
				<div
					class="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/[0.08] bg-black/50 p-4 backdrop-blur"
				>
					<p class="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
						Active layer
					</p>
					<h3 class="mt-2 text-xl font-black text-zinc-50">{steps[active].title}</h3>
					<p class="mt-2 text-sm leading-6 text-zinc-400">{steps[active].copy}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.map-node,
	path {
		transition: all 260ms ease;
	}

	.active-path {
		animation: dash 1.8s linear infinite;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: -36;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.map-node,
		path {
			transition: none;
		}

		.active-path {
			animation: none;
		}
	}
</style>
