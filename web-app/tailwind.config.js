/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", ".dark"],
    theme: {
        extend: {
            colors: {
                // Định nghĩa các biến màu cho theme
                neutral: {
                    50: "var(--color-neutral-50)",
                    100: "var(--color-neutral-100)",
                    200: "var(--color-neutral-200)",
                    300: "var(--color-neutral-300)",
                    400: "var(--color-neutral-400)",
                    500: "var(--color-neutral-500)",
                    600: "var(--color-neutral-600)",
                    700: "var(--color-neutral-700)",
                    800: "var(--color-neutral-800)",
                    900: "var(--color-neutral-900)",
                },
                blue: {
                    50: "var(--color-blue-50)",
                    100: "var(--color-blue-100)",
                    200: "var(--color-blue-200)",
                    300: "var(--color-blue-300)",
                    400: "var(--color-blue-400)",
                    500: "var(--color-blue-500)",
                    600: "var(--color-blue-600)",
                    700: "var(--color-blue-700)",
                    800: "var(--color-blue-800)",
                    900: "var(--color-blue-900)",
                },
                lime: {
                    50: "var(--color-lime-50)",
                    100: "var(--color-lime-100)",
                    200: "var(--color-lime-200)",
                    300: "var(--color-lime-300)",
                    400: "var(--color-lime-400)",
                    500: "var(--color-lime-500)",
                    600: "var(--color-lime-600)",
                    700: "var(--color-lime-700)",
                    800: "var(--color-lime-800)",
                    900: "var(--color-lime-900)",
                },
                amber: {
                    50: "var(--color-amber-50)",
                    100: "var(--color-amber-100)",
                    200: "var(--color-amber-200)",
                    300: "var(--color-amber-300)",
                    400: "var(--color-amber-400)",
                    500: "var(--color-amber-500)",
                    600: "var(--color-amber-600)",
                    700: "var(--color-amber-700)",
                    800: "var(--color-amber-800)",
                    900: "var(--color-amber-900)",
                },
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
    plugins: [],
} 