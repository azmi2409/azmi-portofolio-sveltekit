<script lang="ts">
	import { ArrowUpRight, Mail } from '@lucide/svelte';
</script>

<section id="contact" class="border-t border-border px-6 py-24 sm:py-32">
	<div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
		<div>
			<p class="eyebrow mb-5">Let’s talk</p>
			<h2 class="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
				What is taking more time or money than it should?
			</h2>
			<p class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
				Tell me what your team does manually, where customers get stuck, or which costs keep
				growing. We can work out whether AI, automation, or a simpler process would help.
			</p>
		</div>
		<div class="rounded-2xl border border-border bg-card p-6 sm:p-8">
			<p class="mb-6 leading-7 text-muted-foreground">
				Available for remote consulting and hands-on delivery. Share your current process, goals,
				and rough timeline. Based in Southeast Asia, working globally.
			</p>
			<a class="button-primary" href="mailto:azmimuwahid@gmail.com"
				><Mail class="h-4 w-4" /> Email Azmi</a
			>
			<p class="mt-4 text-base break-all select-all">azmimuwahid@gmail.com</p>
			<p class="mt-2 text-sm text-muted-foreground">
				Opens your email app. You can also copy the address above.
			</p>
			<div class="mt-6 flex flex-wrap gap-x-6 text-sm font-semibold">
				<a
					class="inline-flex min-h-11 items-center gap-2 hover:underline"
					href="https://linkedin.com/in/azmimuwahid"
					target="_blank"
					rel="noreferrer">LinkedIn <ArrowUpRight class="h-4 w-4" /></a
				>
				<a
					class="inline-flex min-h-11 items-center hover:underline"
					href="mailto:azmimuwahid@gmail.com?subject=R%C3%A9sum%C3%A9%20request">Request résumé</a
				>
			</div>
		</div>
	</div>
</section>
