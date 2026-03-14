<!--
  ContactSection.svelte
  Two-column layout: Text/Socials on left, Functional Form on right.
-->

<script lang="ts">
	import { Mail, Linkedin, Github, Send, ArrowRight, MapPin, Sparkles } from '@lucide/svelte';
	import type { InviewOptions } from '$lib/actions/inview';

	let headerVisible = $state(false);
	
	// Form state
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		
		// Simulate network request
		setTimeout(() => {
			isSubmitting = false;
			isSuccess = true;
			
			// Reset success state after 5 seconds
			setTimeout(() => {
				isSuccess = false;
				(e.target as HTMLFormElement).reset();
			}, 5000);
		}, 1500);
	}

	function inviewTrigger(
		node: HTMLElement,
		opts: { options?: InviewOptions; onEnter: () => void }
	) {
		const { threshold = 0.15, rootMargin = '0px', once = true } = opts.options ?? {};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					opts.onEnter();
					if (once) observer.disconnect();
				}
			}
		}, { threshold, rootMargin });
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}
</script>

<section id="contact" class="relative py-24 sm:py-32">
	<!-- Background separator line -->
	<div class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

	<div class="mx-auto max-w-6xl px-6">
		<div
			class="grid gap-16 lg:grid-cols-2 lg:gap-8 transition-all duration-700"
			use:inviewTrigger={{ options: { threshold: 0.2 }, onEnter: () => (headerVisible = true) }}
			style="opacity: {headerVisible ? 1 : 0}; transform: translateY({headerVisible ? 0 : 24}px);"
		>
			
			<!-- Left Column: Copy & Info -->
			<div class="flex flex-col justify-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-50/20 bg-zinc-50/10 px-4 py-1.5 text-sm font-medium text-zinc-200 w-fit"
				>
					<Sparkles class="h-4 w-4" />
					<span>Available for hire</span>
				</div>
				
				<h2
					class="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white"
					style="font-family: var(--font-heading);"
				>
					Let's build<br />
					something <span class="gradient-text">intelligent.</span>
				</h2>
				
				<p class="mb-10 max-w-md text-lg leading-relaxed text-slate-400">
					Whether you want to talk about tool_calls, the future of RAG, or why Ruby on Rails is still a powerhouse for AI backends—reach out.
				</p>

				<div class="flex flex-col gap-6">
					<!-- Email -->
					<a
						href="mailto:azmimuwahid@gmail.com"
						class="group flex items-center gap-4 text-slate-300 transition-colors hover:text-zinc-300 w-fit"
					>
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700 transition-transform group-hover:scale-110 group-hover:border-zinc-50/50 group-hover:bg-zinc-50/10">
							<Mail class="h-5 w-5" />
						</div>
						<div class="flex flex-col">
							<span class="text-sm font-medium text-slate-500 uppercase tracking-wider">Email Me</span>
							<span class="text-lg font-semibold">azmimuwahid@gmail.com</span>
						</div>
					</a>
					
					<!-- Location -->
					<div class="flex items-center gap-4 text-slate-300 w-fit">
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
							<MapPin class="h-5 w-5" />
						</div>
						<div class="flex flex-col">
							<span class="text-sm font-medium text-slate-500 uppercase tracking-wider">Location</span>
							<span class="text-lg font-semibold">South East Asia (Remote)</span>
						</div>
					</div>
				</div>

				<!-- Social Links -->
				<div class="mt-12 flex items-center gap-4">
					<a
						href="https://github.com/azmimuwahid"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:bg-white hover:text-slate-900"
						aria-label="GitHub"
					>
						<Github class="h-5 w-5" />
					</a>
					<a
						href="https://linkedin.com/in/azmimuwahid"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:bg-[#0A66C2] hover:text-white"
						aria-label="LinkedIn"
					>
						<Linkedin class="h-5 w-5" />
					</a>
				</div>
			</div>

			<!-- Right Column: Form -->
			<div class="relative">
				<!-- Decorative backdrop -->
				<div class="absolute -inset-1 rounded-3xl bg-gradient-to-br from-zinc-500/20 to-zinc-700/20 blur-xl"></div>
				
				<div class="glass-card relative rounded-3xl p-8 sm:p-10">
					{#if isSuccess}
						<div class="flex h-full min-h-[400px] flex-col items-center justify-center text-center animate-fade-slide-up">
							<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50/20 text-zinc-100">
								<Send class="h-8 w-8" />
							</div>
							<h3 class="mb-2 text-2xl font-bold text-white" style="font-family: var(--font-heading);">Message Sent!</h3>
							<p class="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="flex flex-col gap-6">
							<div class="grid gap-6 sm:grid-cols-2">
								<div class="flex flex-col gap-2">
									<label for="name" class="text-sm font-medium text-slate-300">Name</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										placeholder="John Doe"
										class="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
									>
								</div>
								<div class="flex flex-col gap-2">
									<label for="email" class="text-sm font-medium text-slate-300">Email</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										placeholder="john@example.com"
										class="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
									>
								</div>
							</div>
							
							<div class="flex flex-col gap-2">
								<label for="subject" class="text-sm font-medium text-slate-300">Subject</label>
								<input
									type="text"
									id="subject"
									name="subject"
									required
									placeholder="Project Inquiry"
									class="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
								>
							</div>
							
							<div class="flex flex-col gap-2">
								<label for="message" class="text-sm font-medium text-slate-300">Message</label>
								<textarea
									id="message"
									name="message"
									required
									rows="5"
									placeholder="Tell me about your project, goals, and timeline..."
									class="min-h-[120px] resize-y rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
								></textarea>
							</div>
							
							<button
								type="submit"
								disabled={isSubmitting}
								class="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-50 px-6 py-4 text-base font-bold text-zinc-900 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
								style="box-shadow: 0 0 20px rgba(255,255,255,0.1);"
							>
								{#if isSubmitting}
									<div class="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></div>
									Sending...
								{:else}
									Send Message
									<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
								{/if}
							</button>
						</form>
					{/if}
				</div>
			</div>
			
		</div>
	</div>
</section>
