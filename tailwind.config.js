/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"b-primary": "#1fc7d4",
				"t-primary": "#F4EEFF",
			},
		},
	},
	plugins: [],
};
