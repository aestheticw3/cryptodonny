/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				main: ["Exo_2", "sans-serif"],
			},
			backgroundImage: {
				root: "linear-gradient( 135deg, rgba(24, 19, 37, 1) 0%, rgba(42, 33, 64, 1) 50%, rgba(61, 48, 94, 1) 100% )",
				heading:
					"linear-gradient(110deg,rgba(120, 100, 255, 1) 25%,rgba(140, 120, 255, 1) 50%,rgba(160, 140, 255, 1) 75%,rgba(180, 120, 255, 1) 100%)",
				mainShape: `url("./assets/bg-shape.png")`,
			},
			height: {
				screenWithoutHeader: "calc(100vh - 49px)",
			},
		},
	},
	plugins: [],
};
