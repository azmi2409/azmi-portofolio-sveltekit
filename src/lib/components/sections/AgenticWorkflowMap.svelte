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
	let tabButtons = $state<HTMLButtonElement[]>([]);

	function selectWithKeyboard(event: KeyboardEvent, index: number) {
		let next = index;
		if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % steps.length;
		else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
			next = (index - 1 + steps.length) % steps.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = steps.length - 1;
		else return;

		event.preventDefault();
		active = next;
		tabButtons[next]?.focus();
	}
</script>

<section id="systems-map" class="relative border-y border-white/[0.06] px-6 py-24 sm:py-32">
	<div class="systems-glow pointer-events-none absolute inset-0"></div>
	<div class="relative mx-auto max-w-7xl">
		<div class="mb-12 max-w-3xl">
			<div class="eyebrow mb-5">Systems thinking · 02</div>
			<h2 class="text-4xl font-black tracking-[-0.045em] text-zinc-50 sm:text-6xl">
				An AI system is a loop.
			</h2>
			<p class="mt-5 text-lg leading-8 text-zinc-400">
				Signals become context, policy, tool calls, interface feedback, and eventually a measurable
				product outcome. Select a layer to inspect the flow.
			</p>
		</div>

		<div class="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
			<div class="space-y-2" role="tablist" aria-label="AI systems workflow steps">
				{#each steps as step, index}
					<button
						bind:this={tabButtons[index]}
						class="system-tab {active === index ? 'active' : ''}"
						onclick={() => (active = index)}
						onkeydown={(event) => selectWithKeyboard(event, index)}
						role="tab"
						aria-selected={active === index}
						aria-controls="system-panel"
						id={`system-tab-${index}`}
						tabindex={active === index ? 0 : -1}
					>
						<span class="font-mono text-[0.62rem] text-zinc-600">0{index + 1}</span>
						<span class="ml-3 text-sm font-bold text-zinc-200">{step.title}</span>
						<span class="tab-indicator"></span>
						<p class="mt-2 text-sm leading-6 text-zinc-500">{step.copy}</p>
					</button>
				{/each}
			</div>

			<div
				id="system-panel"
				role="tabpanel"
				aria-labelledby={`system-tab-${active}`}
				class="map-panel relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/[0.08] p-6"
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
					class="absolute right-6 bottom-6 left-6 rounded-2xl border border-emerald-100/[0.1] bg-black/55 p-4 backdrop-blur"
				>
					<p class="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
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
	.systems-glow {
		background: radial-gradient(circle at 75% 48%, rgba(90, 199, 176, 0.075), transparent 30%);
	}

	.system-tab {
		position: relative;
		width: 100%;
		padding: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.018);
		text-align: left;
		transition:
			border-color 220ms ease,
			background-color 220ms ease,
			transform 220ms ease;
	}

	.system-tab:hover {
		border-color: rgba(255, 255, 255, 0.13);
		transform: translateX(3px);
	}

	.system-tab.active {
		border-color: rgba(139, 226, 207, 0.2);
		background: linear-gradient(90deg, rgba(111, 211, 190, 0.08), rgba(255, 255, 255, 0.025));
	}

	.tab-indicator {
		position: absolute;
		right: 1rem;
		top: 1.2rem;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #3f3f46;
	}

	.system-tab.active .tab-indicator {
		background: #86dfcb;
		box-shadow: 0 0 9px #86dfcb;
	}

	.map-panel {
		background:
			radial-gradient(circle at 50% 38%, rgba(83, 184, 163, 0.1), transparent 34%),
			linear-gradient(150deg, rgba(255, 255, 255, 0.035), rgba(7, 8, 9, 0.96));
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.025);
	}

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
