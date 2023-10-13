/** @type {import("prettier").Config} */
const config = {
  semi: false,
  printWidth: 100,
  singleAttributePerLine: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
  pluginSearchDirs: false,
}

module.exports = config
