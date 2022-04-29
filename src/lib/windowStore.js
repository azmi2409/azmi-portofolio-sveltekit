import { spring } from 'svelte/motion';

export let coords = spring(
    { x: 50, y: 50 },
    {
        stiffness: 0.5,
        damping: 0.95
    }
);

export let size = spring(10);