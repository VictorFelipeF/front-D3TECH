import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "d3-navy": "#181B52",
        "d3-navy-dark": "#12143D",
        "d3-purple": "#7C3AED",
        "d3-purple-light": "#9b5cf6",
        "d3-purple-dark": "#6d28d9",
      },
    },
  },
  plugins: [],
} satisfies Config;
