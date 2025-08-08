<script lang="ts">
	import { onMount } from 'svelte';
	import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let sectionElement: HTMLElement;
	let isVisible = false;
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	let isSubmitting = false;
	let submitMessage = '';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isSubmitting = true;

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 2000));

		submitMessage = "Thank you for your message! I'll get back to you soon.";
		isSubmitting = false;

		// Reset form
		formData = { name: '', email: '', subject: '', message: '' };

		// Clear message after 5 seconds
		setTimeout(() => {
			submitMessage = '';
		}, 5000);
	};

	const contactInfo = [
		{
			icon: Mail,
			label: 'Email',
			value: 'hello@azmi.web.id',
			href: 'mailto:hello@azmi.web.id'
		},
		{
			icon: Phone,
			label: 'Phone',
			value: '+62 812 3456 7890',
			href: 'tel:+6281234567890'
		},
		{
			icon: MapPin,
			label: 'Location',
			value: 'Jakarta, Indonesia',
			href: '#'
		}
	];

	const socialLinks = [
		{
			icon: Github,
			label: 'GitHub',
			href: 'https://github.com/azmi',
			color: 'hover:text-gray-900 dark:hover:text-gray-100'
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/azmi',
			color: 'hover:text-blue-600'
		},
		{
			icon: Twitter,
			label: 'Twitter',
			href: 'https://twitter.com/azmi',
			color: 'hover:text-blue-400'
		}
	];
</script>

<section id="contact" bind:this={sectionElement} class="bg-muted/30 py-20">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section header -->
		<div class="mb-16 text-center">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="mb-4 text-4xl font-bold md:text-5xl">
					Get In <span class="text-primary">Touch</span>
				</h2>
				<div class="mx-auto mb-6 h-1 w-24 bg-primary"></div>
				<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
					Ready to start your next project? Let's collaborate and create something amazing together.
				</p>
			</div>
		</div>

		<div class="grid gap-16 lg:grid-cols-2">
			<!-- Contact Information -->
			<div class="{isVisible ? 'animate-fade-in-left' : 'opacity-0'} animation-delay-400">
				<div class="space-y-8">
					<div>
						<h3 class="mb-6 text-2xl font-semibold">Let's Talk</h3>
						<p class="mb-8 leading-relaxed text-muted-foreground">
							I'm always excited to work on new projects and collaborate with amazing people.
							Whether you have a project in mind or just want to chat about technology, feel free to
							reach out!
						</p>
					</div>

					<!-- Contact Info Cards -->
					<div class="space-y-4">
						{#each contactInfo as info, index}
							<a
								href={info.href}
								class="group flex items-center rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
								style="animation-delay: {index * 0.2 + 0.6}s"
							>
								<div
									class="mr-4 rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
								>
									<svelte:component this={info.icon} class="h-6 w-6" />
								</div>
								<div>
									<div class="text-sm text-muted-foreground">{info.label}</div>
									<div class="font-medium transition-colors group-hover:text-primary">
										{info.value}
									</div>
								</div>
							</a>
						{/each}
					</div>

					<!-- Social Links -->
					<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1000">
						<h4 class="mb-4 text-lg font-semibold">Follow Me</h4>
						<div class="flex space-x-4">
							{#each socialLinks as social}
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="rounded-lg bg-muted p-3 transition-all duration-300 hover:scale-110 {social.color}"
									aria-label={social.label}
								>
									<svelte:component this={social.icon} class="h-6 w-6" />
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="{isVisible ? 'animate-fade-in-right' : 'opacity-0'} animation-delay-600">
				<div class="rounded-2xl border border-border bg-card p-8 shadow-lg">
					<h3 class="mb-6 text-2xl font-semibold">Send a Message</h3>

					{#if submitMessage}
						<div class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
							{submitMessage}
						</div>
					{/if}

					<form on:submit={handleSubmit} class="space-y-6">
						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<label for="name" class="mb-2 block text-sm font-medium">Name</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									required
									class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label for="email" class="mb-2 block text-sm font-medium">Email</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary"
									placeholder="your@email.com"
								/>
							</div>
						</div>

						<div>
							<label for="subject" class="mb-2 block text-sm font-medium">Subject</label>
							<input
								id="subject"
								type="text"
								bind:value={formData.subject}
								required
								class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary"
								placeholder="Project inquiry, collaboration, etc."
							/>
						</div>

						<div>
							<label for="message" class="mb-2 block text-sm font-medium">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="6"
								class="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary"
								placeholder="Tell me about your project or idea..."
							></textarea>
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							size="lg"
							class="w-full bg-primary py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if isSubmitting}
								<div
									class="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-primary-foreground"
								></div>
								Sending...
							{:else}
								<Send class="mr-2 h-5 w-5" />
								Send Message
							{/if}
						</Button>
					</form>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div
			class="{isVisible
				? 'animate-fade-in-up'
				: 'opacity-0'} animation-delay-1200 mt-20 text-center"
		>
			<div
				class="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8"
			>
				<h3 class="mb-4 text-2xl font-semibold">Ready to Start Your Project?</h3>
				<p class="mx-auto mb-6 max-w-2xl text-muted-foreground">
					Let's discuss your ideas and turn them into reality. I'm here to help you build something
					extraordinary.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						size="lg"
						class="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
					>
						Schedule a Call
					</Button>
					<Button
						variant="outline"
						size="lg"
						class="rounded-full border-2 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
					>
						View My Resume
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-border bg-card py-12">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-8 md:grid-cols-3">
			<div>
				<h3 class="mb-4 text-xl font-bold">AZMI</h3>
				<p class="leading-relaxed text-muted-foreground">
					Full Stack Developer & Digital Creator passionate about building exceptional web
					experiences.
				</p>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Quick Links</h4>
				<ul class="space-y-2 text-muted-foreground">
					<li><a href="#about" class="transition-colors hover:text-primary">About</a></li>
					<li><a href="#portfolio" class="transition-colors hover:text-primary">Portfolio</a></li>
					<li><a href="#contact" class="transition-colors hover:text-primary">Contact</a></li>
					<li>
						<a
							href="https://beeleaf.id"
							target="_blank"
							class="transition-colors hover:text-primary">Beeleaf.id</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Connect</h4>
				<div class="flex space-x-4">
					{#each socialLinks as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-lg bg-muted p-2 transition-all duration-300 hover:scale-110 {social.color}"
							aria-label={social.label}
						>
							<svelte:component this={social.icon} class="h-5 w-5" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
			<p>&copy; 2024 AZMI. All rights reserved. Built with SvelteKit & ❤️</p>
		</div>
	</div>
</footer>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-in-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fade-in-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	.animate-fade-in-left {
		animation: fade-in-left 0.8s ease-out forwards;
	}

	.animate-fade-in-right {
		animation: fade-in-right 0.8s ease-out forwards;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}
	.animation-delay-400 {
		animation-delay: 0.4s;
	}
	.animation-delay-600 {
		animation-delay: 0.6s;
	}
	.animation-delay-800 {
		animation-delay: 0.8s;
	}
	.animation-delay-1000 {
		animation-delay: 1s;
	}
	.animation-delay-1200 {
		animation-delay: 1.2s;
	}
</style>
