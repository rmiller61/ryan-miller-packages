import { defineConfig } from "tsup"

const tsupConfig = defineConfig({
  entry: ["src/index.ts", "src/index-node.ts"],
  format: ["esm", "cjs"],
  splitting: true,
  sourcemap: true,
  minify: false,
  clean: true,
  skipNodeModulesBundle: true,
  dts: true,
  external: ["node_modules"],
  tsconfig: "tsconfig.prod.json",
})

// eslint-disable-next-line import/no-default-export
export default tsupConfig
