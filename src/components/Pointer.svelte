<script>
	import { coords, size } from '$lib/windowStore';
	$: x = $coords.x;
	$: y = $coords.y;
</script>

<svelte:window
	on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
	on:mousedown={() => size.set(20)}
	on:mouseup={() => size.set(10)}
/>

<svg class="absolute top-0 left-0 w-full h-full m-['-8px'] z-50 pointer-events-none">
	<circle class="stroke-accent fill-transparent" stroke-width="2" cx={x} cy={y} r={$size} />
	<circle class="fill-accent" cx={x} cy={y} r={2} />
</svg>
