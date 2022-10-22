<script>
	import { skillSets } from '$lib/skills';
	import Icon from '@iconify/svelte';
</script>

<div class="grid md:grid-cols-2 gap-2 md:gap-5 max-w-full">
	{#each skillSets as set}
		<div class="card bg-base-100 shadow-lg w-96 h-64 p-5 group">
			<div class="card-title px-5 text-2xl">{set.title}</div>
			<div class="card-body px-5">
				<div class={`flex ${set.skills.length > 2 ? 'group-hover:animate-move' : ''}`}>
					{#each set.skills as skill, index}
						<div
							id={`${set.title}-${index}`}
							class="flex flex-col justify-center items-center ml-5 gap-2"
						>
							<Icon icon={skill.icon} class="w-20 h-20" />
							<span class="ml-2">{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>
