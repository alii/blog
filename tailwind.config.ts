import {Config} from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			mono: ['var(--font-mono)', 'monospace'],
		},
		fontWeight: {
			light: '300',
			medium: '500',
		},
	},
	plugins: [require('@tailwindcss/typography')],
} satisfies Config;
