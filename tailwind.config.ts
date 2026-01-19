import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#58CC02", // Duolingo Green
          dark: "#4CA302",
          hover: "#66E302",
        },
        secondary: {
          DEFAULT: "#1CB0F6", // Sky Blue
          dark: "#1699D9",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          light: "#F7F7F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
