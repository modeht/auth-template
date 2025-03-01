import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
		extend: {
			fontFamily: {
				sans: [
					'Poppins',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
					'Apple Color Emoji"',
					'Segoe UI Emoji"',
					'Segoe UI Symbol"',
					'Noto Color Emoji"',
				],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			maxWidth: {
				'8xl': '1440px',
			},
			colors: {
				cblack: '#040405',
				cgray: {
					25: '#FCFCFC',
					50: '#F6F6F8',
					100: '#F0F0F3',
					200: '#E2E1E8',
					300: '#CBCAD7',
					400: '#9794AA',
					500: '#686677',
					600: '#49475A',
					700: '#313039',
					800: '#19181F',
					900: '#100F14',
				},
				cpurple: {
					25: '#FAFAFF',
					50: '#F4F3FF',
					100: '#EBE9FE',
					200: '#D9D6FE',
					300: '#BDB4FE',
					400: '#9B8AFB',
					500: '#7A5AF8',
					600: '#6938EF',
					700: '#5925DC',
					800: '#4A1FB8',
					900: '#3E1C96',
				},

				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
