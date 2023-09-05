import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["DM Sans", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#1d1c1c",
        "black-too": "#2D2D2D",
        white: "#FCF7FF",
        primary: "#C2D076",
        secondary: "#C4F1BE",
      },
    },
  },
  plugins: [],
} satisfies Config;
