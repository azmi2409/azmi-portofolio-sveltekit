<script>
	import Icon from '@iconify/svelte';
	import { socialMedia } from '$lib/socialMedia';
</script>

<div class="stats stats-vertical lg:stats-horizontal">
	<div class="stat">
		<div class="stat-title text-2xl">Name</div>
		<div class="stat-value text-lg">Azmi Muwahid</div>
	</div>

	<div class="stat">
		<div class="stat-title text-2xl">Birthday</div>
		<div class="stat-value text-lg">24 September 1994</div>
	</div>

	<div class="stat">
		<div class="stat-title text-2xl">Address</div>
		<div class="stat-value text-lg">Jakarta, Indonesia</div>
	</div>
</div>
<div class="stats stats-vertical lg:stats-horizontal">
	<div class="stat">
		<div class="stat-title text-2xl">Email</div>
		<div class="stat-value text-lg">azmimuwahid@gmail.com</div>
	</div>
	<div class="stat">
		<div class="stat-title text-2xl">Social Media</div>
		<div class="stat-value text-lg">
			<div class="flex flex-row gap-2 py-2">
				{#each socialMedia as item}
					<a href={item.link} id={item.name} class="hover:scale-110 transition-all duration-200">
						<Icon icon={item.icon} width="32" height="32" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>