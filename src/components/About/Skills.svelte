<script>
	import { skills } from '$lib/skills';
	import Icon from '@iconify/svelte';
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
	{#each skills as skill}
		<div class="card bg-base-100 shadow-lg text-justify">
			<div class="card-body">
				<div class="flex">
					<Icon icon={skill.icon} width="2rem" height="2rem" />
				</div>
				<div class="card-title text-2xl my-2">{skill.name}</div>
				<div class="text-md">{skill.level}</div>
			</div>
		</div>
	{/each}
</div>
