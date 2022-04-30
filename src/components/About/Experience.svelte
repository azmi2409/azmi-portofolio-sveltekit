<script>
	import { experience } from '$lib/experience';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
	{#each experience as exp}
		<div class="card bg-base-100 shadow-lg text-justify">
			<div class="card-body">
				<div>
					<div class="text-md">{exp.company} ({exp.date})</div>
					<div class="text-sm">{exp.location}</div>
				</div>
				<div class="card-title text-2xl my-2">{exp.title}</div>
			</div>
		</div>
	{/each}
</div>
