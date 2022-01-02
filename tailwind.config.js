// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./src/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			mono: ['monospace'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
