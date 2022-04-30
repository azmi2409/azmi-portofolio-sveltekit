<script>
	import { education } from '$lib/education';
</script>

<div class="grid md:grid-cols-2 gap-2 md:gap-5 max-w-full">
	{#each education as edu}
		<div class="card bg-base-100 w-96 shadow-lg text-justify">
			<div class="card-body">
				<div>
					<div class="text-md">{edu.school}</div>
					<div class="text-sm">{edu.date}</div>
					<div class="text-sm">{edu.location}</div>
				</div>
				<div class="card-title text-xl text-left my-2">{edu.major}</div>
				<div class="text-md text-left italic">{edu.description}</div>
			</div>
		</div>
	{/each}
</div>
