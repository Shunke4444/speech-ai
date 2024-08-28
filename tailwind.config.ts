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
      colors: {
        "background": "#151515",
        "navbar": "#181818",
        "card": "#1E1E1E",
        "link": "#FFD700",
        "white": "#FFF",
        "black": "#000",
        "btnWhite": "#D9D9D9",
        "green": "#54C541",
        "texttime": "#4C4C4C",
      },
    },
  },
  plugins: [],
};

export default config;