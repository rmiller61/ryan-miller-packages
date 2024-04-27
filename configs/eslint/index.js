/** @type {import("eslint").Linter.Config} */

module.exports = {
  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint", "import", "testing-library"],

  extends: [
    "prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:testing-library/react",
  ],

  rules: {
    "testing-library/prefer-screen-queries": "off",
    "@typescript-eslint/consistent-type-imports": "error",
  },

  overrides: [
    {
      files: ["**/*.ts?(x)"],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["off"],
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error"],
        "react/display-name": "off",
        "tailwindcss/no-custom-classname": "off",
        "tailwindcss/enforces-negative-arbitrary-values": "off",
        "tailwindcss/classnames-order": "off",
      },
    },
  ],

  // ESlint default behaviour ignores file/folders starting with "." - https://github.com/eslint/eslint/issues/10341
  ignorePatterns: [
    "!.*",
    "node_modules",
    ".next",
    ".turbo",
    "dist",
    "compiled",
    "next-static",
    "storybook-static",
    // Files bellow are not git ignored. Eslint fix in the making https://github.com/eslint/eslint/issues/15010
    "VersionInfo.ts",
    "next-env.d.ts",
  ],

  settings: {
    typescript: {},
    "import/resolver": {
      typescript: {
        project: ["apps/*/tsconfig.json", "packages/**/tsconfig.json"],
      },
    },
    react: {
      version: "detect",
    },
  },
}
