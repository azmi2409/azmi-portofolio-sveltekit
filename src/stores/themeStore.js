import { writable } from 'svelte/store';

const themeList = [
	'light',
	'dark',
	'lofi',
	'luxury',
	'halloween',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'garden',
	'forest',
	'aqua',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter'
];

export function randomThemes() {
    return themeList[Math.floor(Math.random() * themeList.length)];
}


export let themes = writable('business');
