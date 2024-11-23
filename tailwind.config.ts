import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#FAFAF8",
          dark: "#1A1F2C",
        },
        foreground: {
          DEFAULT: "#141413",
          dark: "#FAFAF8",
        },
        primary: {
          DEFAULT: "#8989DE",
          foreground: "#FAFAF8",
        },
        secondary: {
          DEFAULT: "#F0EFEA",
          foreground: "#141413",
          dark: "#252A3C",
        },
        destructive: {
          DEFAULT: "#D2886F",
          foreground: "#FAFAF8",
        },
        muted: {
          DEFAULT: "#E6E4DD",
          foreground: "#605F5B",
          dark: "#353B4D",
        },
        accent: {
          DEFAULT: "#7EBF8E",
          foreground: "#141413",
        },
        card: {
          DEFAULT: "#F0EFEA",
          foreground: "#141413",
          dark: "#252A3C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
