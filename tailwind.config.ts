import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "d3-navy": "#0A0A0A",
        "d3-navy-dark": "#111111",
        "d3-purple": "#7C3AED",
        "d3-purple-light": "#9b5cf6",
        "d3-purple-dark": "#6d28d9",
      },
    },
  },
  plugins: [],
} satisfies Config;
