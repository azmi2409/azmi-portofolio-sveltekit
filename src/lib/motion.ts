import { animate } from 'motion/mini';
import { inView } from 'motion';

export function portfolioMotion(root: HTMLElement) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
	const animations = new Map<Element, ReturnType<typeof animate>>();
	const targets = root.querySelectorAll<HTMLElement>(
		'#hero .hero-reveal, #hero figure, #hero dl > div, section:not(#hero) h2, section:not(#hero) article, .reveal-image'
	);
	// Delegated so cards added later (e.g. after filtering) also respond.
	const cardSelector = '.project-card, .hero-portrait';
	let frame = 0;
	let active: HTMLElement | null = null;

	// ponytail: one-shot entrances; use a timeline when sections need coordinated playback.
	const stopWatching = inView(
		targets,
		(element) => {
			if (reduced.matches || element.contains(document.activeElement)) return;
			const siblings = Array.from(element.parentElement?.children ?? []);
			const delay = Math.min(siblings.indexOf(element), 5) * 0.065;
			const keyframes = element.matches('.reveal-image')
				? { clipPath: ['inset(18% 8% 18% 8% round 1.5rem)', 'inset(0% 0% 0% 0% round 1rem)'] }
				: element.matches('h2')
					? { opacity: [0, 1], translate: ['0 0.45em', '0 0'], filter: ['blur(10px)', 'blur(0px)'] }
					: { opacity: [0, 1], translate: ['0 22px', '0 0'] };
			const animation = animate(element, keyframes, {
				duration: element.matches('.reveal-image') ? 1.2 : 0.8,
				delay,
				ease: [0.16, 1, 0.3, 1]
			});
			animations.set(element, animation);
			void animation.then(() => {
				animation.cancel();
				animations.delete(element);
			});
		},
		{ margin: '0px 0px -32px 0px' }
	);

	function revealFocused(event: FocusEvent) {
		for (const [element, animation] of animations) {
			if (event.target instanceof Node && element.contains(event.target)) {
				animation.cancel();
				animations.delete(element);
			}
		}
	}

	function reset() {
		cancelAnimationFrame(frame);
		active?.style.removeProperty('--pointer-x');
		active?.style.removeProperty('--pointer-y');
		active?.style.removeProperty('--tilt-x');
		active?.style.removeProperty('--tilt-y');
		active = null;
	}

	function move(event: PointerEvent) {
		if (reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
		const card =
			event.target instanceof Element ? event.target.closest<HTMLElement>(cardSelector) : null;
		if (!card || !root.contains(card)) return reset();
		if (active !== card) reset();
		active = card;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const bounds = card.getBoundingClientRect();
			const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
			const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
			card.style.setProperty('--pointer-x', `${x * 100}%`);
			card.style.setProperty('--pointer-y', `${y * 100}%`);
			card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
			card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
		});
	}

	function preferenceChanged() {
		reset();
		if (reduced.matches) {
			for (const animation of animations.values()) animation.cancel();
			animations.clear();
		}
	}

	root.addEventListener('pointermove', move);
	root.addEventListener('pointerleave', reset);
	root.addEventListener('pointercancel', reset);
	root.addEventListener('focusin', revealFocused);
	window.addEventListener('blur', reset);
	reduced.addEventListener('change', preferenceChanged);
	finePointer.addEventListener('change', reset);

	return {
		destroy() {
			stopWatching();
			reset();
			for (const animation of animations.values()) animation.cancel();
			animations.clear();
			root.removeEventListener('pointermove', move);
			root.removeEventListener('pointerleave', reset);
			root.removeEventListener('pointercancel', reset);
			root.removeEventListener('focusin', revealFocused);
			window.removeEventListener('blur', reset);
			reduced.removeEventListener('change', preferenceChanged);
			finePointer.removeEventListener('change', reset);
		}
	};
}
