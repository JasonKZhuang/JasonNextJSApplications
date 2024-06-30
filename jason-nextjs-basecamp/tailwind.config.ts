import type {Config} from "tailwindcss";

const config: { plugins: any[]; theme: {}; content: string[] } = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./_components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [],
};
export default config;
