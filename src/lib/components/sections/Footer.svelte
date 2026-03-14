<!--
  Footer.svelte
  Minimal dark footer with gradient text
-->

<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="relative mt-auto overflow-hidden bg-[#0a0f1d] py-16">
	<!-- Subtle top border glow -->
	<div class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>

	<div class="mx-auto max-w-6xl px-6 relative z-10">
		<div class="flex flex-col items-center gap-8 text-center sm:gap-10">
			
			<!-- Logo -->
			<a
				href="#hero"
				onclick={(e) => { 
					e.preventDefault(); 
					document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); 
				}}
				class="group flex flex-col items-center gap-2 cursor-pointer"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black transition-all duration-300 group-hover:-translate-y-1"
					style="background: #22c55e; color: #0f172a; font-family: var(--font-heading); box-shadow: 0 0 20px rgba(34,197,94,0.2);"
				>
					A
				</div>
				<span
					class="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-green-400"
					style="font-family: var(--font-heading);"
				>
					Azmi Muwahid
				</span>
			</a>

			<!-- Navigation Links -->
			<nav class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
				<a href="#hero" class="transition-colors hover:text-green-400">Home</a>
				<a href="#tech-stack" class="transition-colors hover:text-green-400">Stack</a>
				<a href="#projects" class="transition-colors hover:text-green-400">Projects</a>
				<a href="#contact" class="transition-colors hover:text-green-400">Contact</a>
			</nav>

			<div class="h-px w-full max-w-md bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

			<!-- Copyright -->
			<div class="flex flex-col items-center gap-2 text-sm text-slate-500">
				<p>© {currentYear} Azmi Muwahid. All rights reserved.</p>
				<p class="text-xs">
					Designed & Built with <span class="text-green-500">SvelteKit</span> + <span class="text-blue-400">Tailwind CSS</span> + <span class="text-slate-300">Three.js</span>
				</p>
			</div>
			
		</div>
	</div>
</footer>
