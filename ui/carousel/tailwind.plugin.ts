import plugin from "tailwindcss/plugin"

const twPlugin = plugin(function ({ addUtilities, addComponents, e, config }) {
  // Add your custom styles here
  const components = {
    // ...
    ".carouselWrapper": {
      width: "100%",
      height: "500px",
      overflow: "hidden",
    },
    ".carousel": {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    ".carouselItem": {},
  }
  addComponents(components)
})

export default twPlugin
