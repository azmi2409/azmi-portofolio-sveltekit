<script>
	import { education } from '$lib/education';
</script>

<div class="grid md:grid-cols-2 gap-2 md:gap-5 max-w-full">
	{#each education as edu}
		<div class="card bg-base-100 w-96 shadow-lg text-justify h-48 p-5">
			<div class="card-title text-2xl text-left p-2">{edu.major}</div>
			<div class="mt-auto p-2">
				<div class="text-md">{edu.school}</div>
				<div class="text-sm">{edu.date}</div>
				<div class="text-sm">{edu.location}</div>
			</div>
		</div>
	{/each}
</div>
