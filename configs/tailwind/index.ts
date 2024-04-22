import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [""],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1120px",
        "2xl": "1120px",
      },
    },
    /** Add these so we don't have to keep writing custom classes for common use cases */
    extend: {
      content: {
        empty: "''",
      },
      lineHeight: {
        0: "0",
      },
      zIndex: {
        "-1": "-1",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "99": "99",
        "100": "100",
        "999": "999",
        "1000": "1000",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-easing"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    plugin(function ({ matchUtilities }) {
      matchUtilities({
        "truncate-multiline": (value) => ({
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": value,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      })
    }),
  ],
} satisfies Config
