<script lang="ts">
	import { onMount } from 'svelte';

	// Mouse tracking for subtle parallax
	let mouseX = 0;
	let mouseY = 0;
	let container: HTMLDivElement;
	let isReducedMotion = false;

	function handleMouseMove(e: MouseEvent) {
		if (!container || isReducedMotion) return;
		const { left, top, width, height } = container.getBoundingClientRect();
		const x = (e.clientX - left) / width - 0.5;
		const y = (e.clientY - top) / height - 0.5;
		// Subtle parallax constraint
		mouseX = x * 30;
		mouseY = y * 30;
	}

	onMount(() => {
		isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div
	bind:this={container}
	class="absolute inset-0 w-full h-full overflow-hidden bg-[#09090b]"
	aria-hidden="true"
>
	<!-- Base radial gradient to break flatness -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,#18181b_0%,#09090b_100%)] opacity-80"></div>

	<!-- Dynamic blurred orbs -->
	<div 
		class="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-zinc-800/30 rounded-full blur-[120px] mix-blend-screen transition-transform duration-700 ease-out"
		style="transform: translate({mouseX * -1}px, {mouseY * -1}px);"
	></div>
	
	<div 
		class="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-zinc-700/20 rounded-full blur-[150px] mix-blend-screen transition-transform duration-700 ease-out"
		style="transform: translate({mouseX}px, {mouseY}px);"
	></div>

	<!-- Minimal CSS Grid Pattern overlay -->
	<div 
		class="absolute inset-0 opacity-[0.03] transition-transform duration-500 ease-out"
		style="background-image: linear-gradient(#fafafa 1px, transparent 1px), linear-gradient(90deg, #fafafa 1px, transparent 1px); background-size: 50px 50px; background-position: center; transform: translate({mouseX * 0.5}px, {mouseY * 0.5}px);"
	></div>

	<!-- Vignette to focus center -->
	<div class="absolute inset-0 shadow-[inset_0_0_200px_rgba(9,9,11,1)] pointer-events-none"></div>
</div>
