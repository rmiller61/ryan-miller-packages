import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    dir: "./",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
  },
})
