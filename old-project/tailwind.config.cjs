/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				move: {
					'0%': { transform: 'translate3d(0,0,0)' },
					'100%': { transform: 'translate3d(-300px,0,0)' }
				}
			},
			animation: {
				move: 'move 8s linear infinite'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'forest',
		themes: true,
	}
}
