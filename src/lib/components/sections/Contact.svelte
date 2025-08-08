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
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		submitMessage = 'Thank you for your message! I\'ll get back to you soon.';
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

<section id="contact" bind:this={sectionElement} class="py-20 bg-muted/30">
	<div class="max-w-6xl mx-auto px-6">
		<!-- Section header -->
		<div class="text-center mb-16">
			<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200">
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					Get In <span class="text-primary">Touch</span>
				</h2>
				<div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
				<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
					Ready to start your next project? Let's collaborate and create something amazing together.
				</p>
			</div>
		</div>

		<div class="grid lg:grid-cols-2 gap-16">
			<!-- Contact Information -->
			<div class="{isVisible ? 'animate-fade-in-left' : 'opacity-0'} animation-delay-400">
				<div class="space-y-8">
					<div>
						<h3 class="text-2xl font-semibold mb-6">Let's Talk</h3>
						<p class="text-muted-foreground leading-relaxed mb-8">
							I'm always excited to work on new projects and collaborate with amazing people. 
							Whether you have a project in mind or just want to chat about technology, 
							feel free to reach out!
						</p>
					</div>

					<!-- Contact Info Cards -->
					<div class="space-y-4">
						{#each contactInfo as info, index}
							<a 
								href={info.href}
								class="group flex items-center p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
								style="animation-delay: {(index * 0.2) + 0.6}s"
							>
								<div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mr-4">
									<svelte:component this={info.icon} class="w-6 h-6" />
								</div>
								<div>
									<div class="text-sm text-muted-foreground">{info.label}</div>
									<div class="font-medium group-hover:text-primary transition-colors">{info.value}</div>
								</div>
							</a>
						{/each}
					</div>

					<!-- Social Links -->
					<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1000">
						<h4 class="text-lg font-semibold mb-4">Follow Me</h4>
						<div class="flex space-x-4">
							{#each socialLinks as social}
								<a 
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="p-3 bg-muted rounded-lg transition-all duration-300 hover:scale-110 {social.color}"
									aria-label={social.label}
								>
									<svelte:component this={social.icon} class="w-6 h-6" />
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="{isVisible ? 'animate-fade-in-right' : 'opacity-0'} animation-delay-600">
				<div class="bg-card p-8 rounded-2xl border border-border shadow-lg">
					<h3 class="text-2xl font-semibold mb-6">Send a Message</h3>
					
					{#if submitMessage}
						<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
							{submitMessage}
						</div>
					{/if}

					<form on:submit={handleSubmit} class="space-y-6">
						<div class="grid md:grid-cols-2 gap-6">
							<div>
								<label for="name" class="block text-sm font-medium mb-2">Name</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									required
									class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
									placeholder="Your name"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium mb-2">Email</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
									placeholder="your@email.com"
								/>
							</div>
						</div>

						<div>
							<label for="subject" class="block text-sm font-medium mb-2">Subject</label>
							<input
								id="subject"
								type="text"
								bind:value={formData.subject}
								required
								class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
								placeholder="Project inquiry, collaboration, etc."
							/>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium mb-2">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="6"
								class="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
								placeholder="Tell me about your project or idea..."
							></textarea>
						</div>

						<Button 
							type="submit" 
							disabled={isSubmitting}
							size="lg" 
							class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if isSubmitting}
								<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
								Sending...
							{:else}
								<Send class="w-5 h-5 mr-2" />
								Send Message
							{/if}
						</Button>
					</form>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="{isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-1200 text-center mt-20">
			<div class="p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
				<h3 class="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
				<p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
					Let's discuss your ideas and turn them into reality. I'm here to help you build something extraordinary.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105">
						Schedule a Call
					</Button>
					<Button variant="outline" size="lg" class="border-2 px-8 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105">
						View My Resume
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-card border-t border-border py-12">
	<div class="max-w-6xl mx-auto px-6">
		<div class="grid md:grid-cols-3 gap-8">
			<div>
				<h3 class="text-xl font-bold mb-4">AZMI</h3>
				<p class="text-muted-foreground leading-relaxed">
					Full Stack Developer & Digital Creator passionate about building exceptional web experiences.
				</p>
			</div>
			
			<div>
				<h4 class="font-semibold mb-4">Quick Links</h4>
				<ul class="space-y-2 text-muted-foreground">
					<li><a href="#about" class="hover:text-primary transition-colors">About</a></li>
					<li><a href="#portfolio" class="hover:text-primary transition-colors">Portfolio</a></li>
					<li><a href="#contact" class="hover:text-primary transition-colors">Contact</a></li>
					<li><a href="https://beeleaf.id" target="_blank" class="hover:text-primary transition-colors">Beeleaf.id</a></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold mb-4">Connect</h4>
				<div class="flex space-x-4">
					{#each socialLinks as social}
						<a 
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="p-2 bg-muted rounded-lg transition-all duration-300 hover:scale-110 {social.color}"
							aria-label={social.label}
						>
							<svelte:component this={social.icon} class="w-5 h-5" />
						</a>
					{/each}
				</div>
			</div>
		</div>
		
		<div class="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
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

	.animation-delay-200 { animation-delay: 0.2s; }
	.animation-delay-400 { animation-delay: 0.4s; }
	.animation-delay-600 { animation-delay: 0.6s; }
	.animation-delay-800 { animation-delay: 0.8s; }
	.animation-delay-1000 { animation-delay: 1s; }
	.animation-delay-1200 { animation-delay: 1.2s; }
</style>