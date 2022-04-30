<script>
	import Stats from './Stats.svelte';
	import Icon from '@iconify/svelte';
	import Tabs from './Tabs.svelte';
</script>

<section class="w-full text-center flex justify-center items-center flex-col py-20 gap-5">
	<div class="my-5">
		<h3
			class="text-4xl md:text-6xl uppercase font-extrabold relative after:-bottom-5 after:left-10 after:right-0 after:border-b-4 after:border-base-content after:w-3/4 after:bg-primary after:absolute"
		>
			About Me
		</h3>
	</div>
	<article class="prose py-5">
		<p class="prose-p md:prose-h3 text-lg max-w-full overflow-ellipsis">
			Founder of <a class="font-bold no-underline" href="https://www.beeleaf.id" target="_blank"
				>Beeleaf.id</a
			> , I am a web Developer currently based in Jakarta , Indonesia. Currently focus at freelance and
			working on my own projects.
		</p>
	</article>
	<Stats />
	<div class="my-5 py-5 flex flex-col items-center text-center content-center">
		<Icon icon="gg:format-separator" height="64" width="64" />
		<div class="h-80 w-80 bg-accent my-5 flex flex-col justify-center items-center rounded-xl">
			<a href="cv.pdf" alt="cv">
				<Icon
					icon="bx:download"
					class="flex cursor-pointer hover:scale-110 transition-all duration-200"
					height="64"
					width="64"
				/>
			</a>
			<h2 class="text-xl font-bold cursor">Download My CV</h2>
		</div>
		<Icon icon="gg:format-separator" height="64" width="64" rotate="180deg" />
	</div>
	<Tabs />
</section>
