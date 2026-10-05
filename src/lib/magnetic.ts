const SELECTOR = '.button-primary, .magnetic';
const STRENGTH = 0.28;
const MAX_PULL = 10;

/** Nudges buttons toward a fine pointer. One delegated listener covers every page. */
export function magnetic() {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
	let active: HTMLElement | null = null;
	let frame = 0;

	function release() {
		cancelAnimationFrame(frame);
		active?.style.removeProperty('--magnet-x');
		active?.style.removeProperty('--magnet-y');
		active = null;
	}

	function move(event: PointerEvent) {
		if (reduced.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
		const target = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
		if (target !== active) release();
		if (!target) return;
		active = target;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const bounds = target.getBoundingClientRect();
			const clamp = (value: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, value));
			const x = clamp((event.clientX - bounds.left - bounds.width / 2) * STRENGTH);
			const y = clamp((event.clientY - bounds.top - bounds.height / 2) * STRENGTH);
			target.style.setProperty('--magnet-x', `${x.toFixed(1)}px`);
			target.style.setProperty('--magnet-y', `${y.toFixed(1)}px`);
		});
	}

	document.addEventListener('pointermove', move, { passive: true });
	document.addEventListener('pointerleave', release);
	window.addEventListener('blur', release);
	reduced.addEventListener('change', release);

	return () => {
		release();
		document.removeEventListener('pointermove', move);
		document.removeEventListener('pointerleave', release);
		window.removeEventListener('blur', release);
		reduced.removeEventListener('change', release);
	};
}
