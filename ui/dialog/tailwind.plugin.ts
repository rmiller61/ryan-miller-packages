import plugin from "tailwindcss/plugin"

const twPlugin = plugin(function ({ addBase, addComponents, theme }) {
  addBase({
    "@keyframes modal-animateIn": {
      from: {
        transform: "scale(0.4)",
        opacity: "0",
      },
      to: {
        transform: "scale(1)",
        opacity: "1",
      },
    },
    "@keyframes modal-animateOut": {
      from: {
        transform: "scale(1)",
        opacity: "1",
      },
      to: {
        transform: "scale(0.4)",
        opacity: "0",
      },
    },
    "@keyframes overlay-animateIn": {
      from: {
        opacity: "0",
      },
      to: {
        opacity: "1",
      },
    },
    "@keyframes overlay-animateOut": {
      from: {
        opacity: "1",
      },
      to: {
        opacity: "0",
      },
    },
  })
  addComponents({
    ".dialog, .dialogContent, .dialogOverlay": {
      position: "fixed",
      zIndex: "999",
    },
    ".dialog, .dialogOverlay": {
      top: "0px",
      left: "0px",
      bottom: "0px",
      right: "0px",
    },
    ".dialog": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ".dialogContent": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    ".dialogContent-animateIn": {
      animation: "modal-animateIn 0.6s ease-in-out 0.2s",
      animationFillMode: "both",
    },
    ".dialogContent-animateOut": {
      animation: "modal-animateOut 0.6s ease-in-out 0.2s",
      animationFillMode: "both",
    },
    ".dialogOverlay": {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(1px)",
    },
    ".dialogOverlay-animateIn": {
      animation: "overlay-animateIn 0.6s ease-in-out",
      animationFillMode: "both",
    },
    ".dialogOverlay-animateOut": {
      animation: "overlay-animateOut 0.6s ease-in-out",
      animationFillMode: "both",
    },
    ".dialogClose": {
      position: "absolute",
      top: "0px",
      right: "0px",
      cursor: "pointer",
      lineHeight: "0",
      padding: "0.5em",
    },
  })
})

export default twPlugin
