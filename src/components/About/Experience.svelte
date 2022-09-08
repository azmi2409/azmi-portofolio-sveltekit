<script>
	import { experience } from '$lib/experience';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
	{#each experience as exp}
		<div class="card bg-base-100 shadow-lg text-justify h-48 w-96">
			<div class="card-title text-2xl p-5">{exp.title}</div>
			<div class="p-5 mt-auto">
				<div>
					<div class="text-md">{exp.company} ({exp.date})</div>
					<div class="text-sm">{exp.location}</div>
				</div>
			</div>
		</div>
	{/each}
</div>
