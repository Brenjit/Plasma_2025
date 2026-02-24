/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                burgundy: {
                    50: '#fef2f2',
                    100: '#ffe1e1',
                    200: '#ffc7c7',
                    300: '#ffa0a0',
                    400: '#ff6b6b',
                    500: '#f83b3b',
                    600: '#e51d1d',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#8A211D', // User specified color
                    950: '#450a0a',
                },
                gold: {
                    50: '#fffbf0',
                    100: '#fff4d6',
                    200: '#ffeeb0',
                    300: '#ffe07d',
                    400: '#ffce47',
                    500: '#ffba1a',
                    600: '#e69a0a',
                    700: '#bf760a',
                    800: '#9c5e0e',
                    900: '#7e4d0f',
                    950: '#482803',
                }
            },
            fontFamily: {
                display: ["var(--font-space-grotesk)", "sans-serif"],
                sans: ["var(--font-noto-sans)", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
