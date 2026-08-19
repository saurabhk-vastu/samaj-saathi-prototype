import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ss: {
          primary: "var(--ss-primary)",
          deep: "var(--ss-primary-deep)",
          soft: "var(--ss-primary-soft)",
          gold: "var(--ss-gold)",
          ivory: "var(--ss-ivory)",
          paper: "var(--ss-paper)",
          ink: "var(--ss-ink)",
          muted: "var(--ss-muted)",
          line: "var(--ss-line)",
          verify: "var(--ss-verify)",
          error: "var(--ss-error)",
        },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        btn: "var(--shadow-btn)",
      },
    },
  },
  plugins: [],
} satisfies Config;
