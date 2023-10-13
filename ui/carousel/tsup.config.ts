import { defineConfig } from "tsup"

const tsupConfig = defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom", "clsx", "framer-motion", "react-use"],
  splitting: false,
  minify: true,
  clean: true,
  tsconfig: "tsconfig.prod.json",
})

// eslint-disable-next-line import/no-default-export
export default tsupConfig
