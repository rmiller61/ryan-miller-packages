import react from "@vitejs/plugin-react-swc"
import * as path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [path.resolve(__dirname, "tsconfig.test.json")],
    }),
    react(),
  ],
  test: {
    dir: "./",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
})
