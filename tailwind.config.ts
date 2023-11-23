import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "356CBE": "#356CBE",
        "main-bg": "#6DB8C5",
        "bright-main": "#D0F0F6",
        "button-bg": "#DBC2CF",
      },
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animated"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
export default config;
