/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.tsx"],
	theme: {
		extend: {
			screens: {
				xs: "480px",
			},
		},
	},
	darkMode: "class",
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
