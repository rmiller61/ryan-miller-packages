import plugin from "tailwindcss/plugin"

const twPlugin = plugin(function ({ addBase, addComponents, theme }) {
  addBase({
    "@keyframes loading-skeleton": {
      "100%": {
        transform: "translateX(100%)",
      },
    },
  })
  addComponents({
    ".loading-skeleton": {
      "--base-color": theme("colors.loading-skeleton-base", "#ebebeb"),
      "--highlight-color": theme("colors.loading-skeleton-highlight", "#f5f5f5"),
      backgroundColor: "var(--base-color)",
      width: "var(--loading-skeleton-width)",
      borderRadius: "0.25rem",
      display: "inline-flex",
      lineHeight: "1",
      position: "relative",
      overflow: "hidden",
      height: "var(--loading-skeleton-height)",
      /* Necessary for overflow: hidden to work correctly in Safari */
      zIndex: "1",
      cursor: "progress",

      "&::before": {
        content: '""',
        position: "absolute",
        top: "0px",
        left: "0px",
        bottom: "0px",
        right: "0px",
        backgroundImage:
          "linear-gradient(90deg, var(--base-color), var(--highlight-color), var(--base-color))",
        backgroundRepeat: "no-repeat",
        animationName: "loading-skeleton",
        animationDirection: "normal",
        animationDuration: "1.5s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        transform: "translateX(-100%)",
        zIndex: "2",
        display: "block",

        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      },
    },
  })
})

export default twPlugin
