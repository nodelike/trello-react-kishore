/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'selector',
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                lime: "rgb(255, 103, 0)",
                dark: "rgb(12, 22, 25)",
                glare: "rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};
