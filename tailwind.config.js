/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#141414",
          raised: "#1c1c1c",
          overlay: "#242424",
          border: "#2a2a2a",
          hover: "#303030",
        },
        accent: {
          DEFAULT: "#818cf8",
          dim: "#6366f1",
          glow: "rgba(129, 140, 248, 0.15)",
        },
        success: {
          DEFAULT: "#34d399",
          dim: "#059669",
          glow: "rgba(52, 211, 153, 0.15)",
        },
        muted: "#71717a",
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        display: ['"Sora"', "system-ui", "sans-serif"],
      },
      animation: {
        "progress-fill": "progressFill 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.2s ease-out forwards",
        "check-pop": "checkPop 0.3s ease-out forwards",
      },
      keyframes: {
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        checkPop: {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
