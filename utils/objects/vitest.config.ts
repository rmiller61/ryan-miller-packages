import * as path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [path.resolve(__dirname, "tsconfig.test.json")],
    }),
  ],
  test: {
    dir: "./",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
    //environment: "jsdom",
  },
})
