<script>
	import { coords } from '$lib/windowStore';

	$: x = Math.round(-$coords.x / 5);
	$: y = Math.round(-$coords.y / 5);
</script>

<div class="w-full">
	<div class="relative box-border pointer-events-none w-3/4 transform-gpu">
		<div
			class="relative p-5 z-50 border-8 left-0 top-0 border-black h-full w-full box-border rounded-lg"
			style={`transform: translate3d(${x / 30}px,${y / 30}px,0);`}
		>
			<img src="bg.jpeg" class="opacity-0 max-w-full" alt="image1" preload />
		</div>
		<div
			class="absolute left-0 top-0 z-10 p-7 w-full box-border align-middle"
			style={`transform: translate3d(${x / 35}px,${y / 35}px,0);`}
		>
			<img src="bg.jpeg" class="opacity-0 max-w-full" alt="image1" />
			<div
				style={`background-image: url("profile.webp");background-position: 50%;`}
				class="absolute bg-cover bg-no-repeat inset-5 rounded-lg"
			/>
		</div>
		<div
			class="absolute top-14 bottom-14 -left-5 -right-5 p-0 box-border bg-accent rounded-lg"
			style={`transform: translate3d(${x / 20}px,${y / 10}px,0);`}
		/>
	</div>
</div>
