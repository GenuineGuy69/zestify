/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#13ec13',
                    glow: 'rgba(19, 236, 19, 0.3)',
                    10: 'rgba(19, 236, 19, 0.1)',
                },
                background: {
                    light: '#f6f8f6',
                    dark: '#102210',
                },
                card: {
                    light: '#ffffff',
                    dark: '#1a2c1a',
                },
                border: {
                    light: '#e5e5e5',
                    dark: '#2a3c2a',
                },
                text: {
                    primary: { light: '#111111', dark: '#ffffff' },
                    secondary: { light: '#666666', dark: '#a0a0a0' },
                },
                status: {
                    success: '#22c55e',
                    warning: '#eab308',
                    error: '#ef4444',
                },
                calorie: '#fb923c',
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '32px',
            }
        },
    },
    plugins: [],
}
