/**
 * Centralized social media links configuration.
 * Update URLs here — they propagate to Hero, Contact, Footer, and SEO structured data.
 */

import type { SocialIconName } from '$lib/components/icons/SocialIcon.svelte';

export interface SocialLink {
	icon: SocialIconName;
	label: string;
	href: string;
	hoverColor: string; // Tailwind-compatible hover color class
	brandHex: string; // Raw hex for inline style usage
}

export const socialLinks: SocialLink[] = [
	{
		icon: 'github',
		label: 'GitHub',
		href: 'https://github.com/azmi2409',
		hoverColor: 'hover:bg-white hover:text-zinc-900',
		brandHex: '#fafafa'
	},
	{
		icon: 'x',
		label: 'X',
		href: 'https://x.com/azmikaze',
		hoverColor: 'hover:bg-white hover:text-zinc-900',
		brandHex: '#000000'
	},
	{
		icon: 'linkedin',
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/azmimuwahid',
		hoverColor: 'hover:bg-[#0A66C2] hover:text-white',
		brandHex: '#0A66C2'
	},
	{
		icon: 'instagram',
		label: 'Instagram',
		href: 'https://instagram.com/azmimuwahid',
		hoverColor: 'hover:bg-[#E4405F] hover:text-white',
		brandHex: '#E4405F'
	},
	{
		icon: 'threads',
		label: 'Threads',
		href: 'https://threads.net/@azmimuwahid',
		hoverColor: 'hover:bg-white hover:text-zinc-900',
		brandHex: '#000000'
	},
	{
		icon: 'facebook',
		label: 'Facebook',
		href: 'https://facebook.com/azmimuwahid',
		hoverColor: 'hover:bg-[#1877F2] hover:text-white',
		brandHex: '#1877F2'
	},
	{
		icon: 'youtube',
		label: 'YouTube',
		href: 'https://youtube.com/@azmimuwahid',
		hoverColor: 'hover:bg-[#FF0000] hover:text-white',
		brandHex: '#FF0000'
	}
];

/** Work and personal email. Work is the address to use for Kilat and new projects. */
export const workEmail = 'azmi@kilat.host';
export const personalEmail = 'azmimuwahid@gmail.com';

export const workEmailLink = {
	label: 'Work email',
	href: `mailto:${workEmail}`
};

/** Personal email — kept for résumé requests and existing contacts. */
export const emailLink = {
	label: 'Email',
	href: `mailto:${personalEmail}`
};

/** URLs for JSON-LD sameAs (SEO structured data) */
export const sameAsUrls: string[] = socialLinks.map((s) => s.href);
