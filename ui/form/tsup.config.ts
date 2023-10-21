import { defineConfig } from "tsup"

const tsupConfig = defineConfig({
  entry: ["src/primitives/index.ts", "src/form/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  external: [
    "react",
    "react-dom",
    "zod",
    "tailwindcss",
    "react-hook-form",
    "@radix-ui/react-slot",
    "@social-hustle/utils-classnames",
    "@hookform/resolvers",
    "react-icons",
  ],
  splitting: false,
  minify: true,
  clean: true,
  tsconfig: "tsconfig.prod.json",
})

// eslint-disable-next-line import/no-default-export
export default tsupConfig
