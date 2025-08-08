<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Portfolio from '$lib/components/sections/Portfolio.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
	<title>AZMI - Full Stack Developer & Digital Creator</title>
	<meta name="description" content="Professional portfolio of AZMI - Full Stack Developer specializing in modern web technologies. Creating exceptional digital experiences." />
</svelte:head>

<main class="overflow-x-hidden">
	<Hero />
	<About />
	<Portfolio />
	<Contact />
</main>
