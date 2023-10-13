import modalPlugin from "./tailwind.plugin"
import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    modalPlugin,
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        body: {
          lineHeight: "1.5",
        },
        "#storybook-root": {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        },
        p: {
          marginBottom: theme("spacing.8"),
        },
        ["h1, h2, h3, h4, h5, h6"]: {
          fontFamily: theme("fontFamily.serif"),
          lineHeight: "1",
          marginBottom: theme("spacing.10"),
        },
        h1: {
          fontSize: "3rem",
          "@media (min-width: 1024px)": {
            fontSize: "4rem",
          },
        },
        h2: {
          fontSize: "2rem",
          "@media (min-width: 1024px)": {
            fontSize: "3rem",
          },
        },
        h3: {
          fontSize: "1.5rem",
          "@media (min-width: 1024px)": {
            fontSize: "2rem",
          },
        },
        h4: {
          fontSize: "1rem",
          "@media (min-width: 1024px)": {
            fontSize: "1.5rem",
          },
        },
      })
    }),
  ],
} satisfies Config
