/** @type {import('tailwindcss').Config} */
// Tailwind tokens and scan paths shared by app and reusable components.
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                turf: {
                    light: "#2E7D32", // Light Green
                    DEFAULT: "#006400", // Dark Green (Primary)
                    dark: "#003300",
                },
                cricket: {
                    red: "#D32F2F",
                    ball: "#B71C1C",
                },
            },
        },
    },
    plugins: [],
}
