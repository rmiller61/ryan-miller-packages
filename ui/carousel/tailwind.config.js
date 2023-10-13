const plugin = require("./tailwind.plugin.js")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [plugin],
}
