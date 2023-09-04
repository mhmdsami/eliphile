import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["DM Sans", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#0F1A20",
        white: "#FCF7FF",
        primary: "#C2D076",
        secondary: "#C4F1BE",
      },
    },
  },
  plugins: [],
} satisfies Config;
