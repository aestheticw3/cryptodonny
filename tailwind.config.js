/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["Exo_2", "sans-serif"],
			},
			backgroundColor: {
				banana: "#ffeeb4",
				emerald: "#014751",
				firefly: "#0f2830",
				zircon: "#F8FBFF",
			},
			colors: {
				banana: "#ffeeb4",
				emerald: "#014751",
				firefly: "#0f2830",
				zircon: "#F8FBFF",
			},
			screens: {
				sm: "893px",
			},
		},
	},
	plugins: [],
};
