<script lang="ts">
	import { onMount } from 'svelte';
	import { Activity, BrainCircuit, Database, GitBranch, ShieldCheck } from '@lucide/svelte';

	let scene: HTMLDivElement;
	let reduceMotion = false;
	let frame = 0;

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		return () => cancelAnimationFrame(frame);
	});

	function move(event: PointerEvent) {
		if (reduceMotion || event.pointerType === 'touch') return;
		const bounds = scene.getBoundingClientRect();
		const x = (event.clientX - bounds.left) / bounds.width - 0.5;
		const y = (event.clientY - bounds.top) / bounds.height - 0.5;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			scene.style.setProperty('--scene-rx', `${-y * 7}deg`);
			scene.style.setProperty('--scene-ry', `${x * 9}deg`);
			scene.style.setProperty('--scene-x', `${x * 12}px`);
			scene.style.setProperty('--scene-y', `${y * 12}px`);
			scene.style.setProperty('--scene-x-reverse', `${x * -4.2}px`);
			scene.style.setProperty('--scene-y-reverse', `${y * -4.2}px`);
		});
	}

	function reset() {
		scene.style.setProperty('--scene-rx', '0deg');
		scene.style.setProperty('--scene-ry', '0deg');
		scene.style.setProperty('--scene-x', '0px');
		scene.style.setProperty('--scene-y', '0px');
		scene.style.setProperty('--scene-x-reverse', '0px');
		scene.style.setProperty('--scene-y-reverse', '0px');
	}
</script>

<div bind:this={scene} class="scene" onpointermove={move} onpointerleave={reset} aria-hidden="true">
	<div class="scene-glow"></div>
	<div class="scene-grid"></div>

	<div class="system">
		<div class="orbit orbit-a"><span></span></div>
		<div class="orbit orbit-b"><span></span></div>
		<div class="core-shell">
			<div class="core">
				<BrainCircuit class="h-9 w-9" strokeWidth={1.5} />
			</div>
		</div>

		<div class="node node-context">
			<Database class="h-4 w-4" />
			<span>Context</span>
			<small>RAG / memory</small>
		</div>
		<div class="node node-policy">
			<GitBranch class="h-4 w-4" />
			<span>Policy</span>
			<small>route / reason</small>
		</div>
		<div class="node node-observe">
			<Activity class="h-4 w-4" />
			<span>Observe</span>
			<small>trace / evaluate</small>
		</div>
	</div>

	<div class="status-card">
		<div class="status-head">
			<span><i></i> System trace</span>
			<ShieldCheck class="h-4 w-4" />
		</div>
		<div class="trace-row"><b>01</b><span>signal received</span><em>12ms</em></div>
		<div class="trace-row active"><b>02</b><span>context retrieved</span><em>84ms</em></div>
		<div class="trace-row"><b>03</b><span>tool selected</span><em>ready</em></div>
	</div>

	<div class="scene-caption">
		<span>Interactive system model</span>
		<span class="caption-line"></span>
		<span>Pointer reactive</span>
	</div>
</div>

<style>
	.scene {
		--scene-rx: 0deg;
		--scene-ry: 0deg;
		--scene-x: 0px;
		--scene-y: 0px;
		--scene-x-reverse: 0px;
		--scene-y-reverse: 0px;
		position: relative;
		isolation: isolate;
		min-height: 36rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 2rem;
		background:
			linear-gradient(145deg, rgba(255, 255, 255, 0.045), transparent 38%),
			linear-gradient(180deg, rgba(16, 22, 24, 0.94), rgba(7, 9, 10, 0.98));
		box-shadow:
			0 32px 90px -44px rgba(0, 0, 0, 0.95),
			inset 0 1px rgba(255, 255, 255, 0.045);
		perspective: 1100px;
	}

	.scene-glow {
		position: absolute;
		inset: 8% 5% auto;
		height: 70%;
		background: radial-gradient(circle, rgba(95, 225, 197, 0.14), transparent 64%);
		filter: blur(32px);
		transform: translate3d(var(--scene-x), var(--scene-y), 0);
		transition: transform 300ms ease-out;
	}

	.scene-grid {
		position: absolute;
		inset: 46% -15% -25%;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
		background-size: 38px 38px;
		mask-image: linear-gradient(to bottom, transparent, black 30%, transparent 94%);
		transform: rotateX(67deg) translateY(30px) translateZ(-70px);
		transform-origin: center top;
	}

	.system {
		position: absolute;
		left: 50%;
		top: 43%;
		width: 21rem;
		height: 21rem;
		transform: translate(-50%, -50%) rotateX(var(--scene-rx)) rotateY(var(--scene-ry));
		transform-style: preserve-3d;
		transition: transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.core-shell {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 7.5rem;
		height: 7.5rem;
		padding: 0.6rem;
		border: 1px solid rgba(129, 230, 209, 0.24);
		border-radius: 50%;
		background: rgba(88, 201, 177, 0.06);
		box-shadow: 0 0 54px rgba(88, 201, 177, 0.16);
		transform: translate3d(-50%, -50%, 44px);
		animation: core-float 5s ease-in-out infinite;
	}

	.core {
		display: grid;
		width: 100%;
		height: 100%;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.13);
		border-radius: 50%;
		background:
			radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.22), transparent 25%),
			linear-gradient(145deg, #b4f3e5, #438c7c 64%, #163b35);
		color: #07100f;
		box-shadow:
			inset -14px -18px 25px rgba(0, 0, 0, 0.24),
			0 12px 34px rgba(49, 154, 132, 0.28);
	}

	.orbit {
		position: absolute;
		left: 50%;
		top: 50%;
		border: 1px solid rgba(136, 233, 212, 0.22);
		border-radius: 50%;
		transform-style: preserve-3d;
	}

	.orbit-a {
		width: 16.5rem;
		height: 16.5rem;
		transform: translate(-50%, -50%) rotateX(69deg) rotateZ(-12deg);
		animation: orbit-turn 15s linear infinite;
	}

	.orbit-b {
		width: 13.5rem;
		height: 13.5rem;
		border-style: dashed;
		transform: translate(-50%, -50%) rotateY(68deg) rotateZ(28deg);
		animation: orbit-turn-reverse 19s linear infinite;
	}

	.orbit span {
		position: absolute;
		left: 50%;
		top: -4px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #a7eadc;
		box-shadow: 0 0 14px #76dac5;
	}

	.node {
		position: absolute;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0 0.55rem;
		width: 8.5rem;
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.85rem;
		background: rgba(11, 15, 16, 0.82);
		color: #b7efe3;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(12px);
	}

	.node span {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: #f4f4f5;
	}

	.node small {
		grid-column: 2;
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: #71717a;
	}

	.node-context {
		left: -1rem;
		top: 2.5rem;
		transform: translateZ(20px) rotateY(5deg);
	}

	.node-policy {
		right: -1.25rem;
		top: 4.5rem;
		transform: translateZ(55px) rotateY(-6deg);
	}

	.node-observe {
		bottom: 1.2rem;
		left: 2rem;
		transform: translateZ(72px) rotateX(-4deg);
	}

	.status-card {
		position: absolute;
		right: 1.1rem;
		bottom: 3.8rem;
		width: min(15.5rem, calc(100% - 2.2rem));
		padding: 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 1rem;
		background: rgba(8, 11, 12, 0.82);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(16px);
		transform: translate3d(var(--scene-x-reverse), var(--scene-y-reverse), 80px);
		transition: transform 350ms ease-out;
	}

	.status-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.6rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		font-size: 0.63rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #a1a1aa;
	}

	.status-head span {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.status-head i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #6ee7b7;
		box-shadow: 0 0 10px #6ee7b7;
	}

	.trace-row {
		display: grid;
		grid-template-columns: 1.5rem 1fr auto;
		gap: 0.4rem;
		align-items: center;
		padding: 0.43rem 0.45rem;
		border-radius: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.58rem;
		color: #71717a;
	}

	.trace-row b {
		color: #52525b;
	}

	.trace-row em {
		font-style: normal;
		color: #52525b;
	}

	.trace-row.active {
		background: rgba(110, 231, 183, 0.07);
		color: #d4d4d8;
	}

	.trace-row.active b,
	.trace-row.active em {
		color: #7dd3bd;
	}

	.scene-caption {
		position: absolute;
		bottom: 1.35rem;
		left: 1.35rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-mono);
		font-size: 0.55rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #52525b;
	}

	.caption-line {
		width: 1.5rem;
		height: 1px;
		background: #3f3f46;
	}

	@keyframes core-float {
		50% {
			transform: translate3d(-50%, calc(-50% - 8px), 54px);
		}
	}

	@keyframes orbit-turn {
		to {
			transform: translate(-50%, -50%) rotateX(69deg) rotateZ(348deg);
		}
	}

	@keyframes orbit-turn-reverse {
		to {
			transform: translate(-50%, -50%) rotateY(68deg) rotateZ(-332deg);
		}
	}

	@media (max-width: 640px) {
		.scene {
			min-height: 31rem;
		}

		.system {
			width: 18rem;
			height: 18rem;
			transform: translate(-50%, -54%) scale(0.84) rotateX(var(--scene-rx)) rotateY(var(--scene-ry));
		}

		.status-card {
			bottom: 3.4rem;
		}

		.scene-caption span:last-child,
		.caption-line {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.core-shell,
		.orbit-a,
		.orbit-b {
			animation: none;
		}

		.system,
		.scene-glow,
		.status-card {
			transition: none;
		}
	}
</style>
