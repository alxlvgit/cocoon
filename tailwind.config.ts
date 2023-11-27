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
        "custom-gradient":
          "linear-gradient(180deg, #6DB8C5 0%, rgba(161, 247, 247, 0) 100%)",
        "custom-gradient-dark":
          "linear-gradient(180deg, #4B8B9B 100%, rgba(120, 220, 220, 0) 100%)",
      },
      boxShadow: {
        "custom-shadow": "2px 6px 6px rgba(0, 0, 0, 0.25)",
      },
      backgroundColor: {
        "356CBE": "#356CBE",
        "custom-bg": "#C3EBF2",
        "button-bg": "#DBC2CF",
        "button-bg-hover": "#9E8B9A",
        "main-bg": "#6DB8C5",
        "bright-main": "#D0F0F6",
      },
      colors: {
        "main-color": "#6DB8C5",
        "bright-main-color": "#D0F0F6",
        "button-main": "#DBC2CF",
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
  daisyui: {
    themes: ["light"],
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};

export default config;
