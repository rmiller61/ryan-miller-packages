/// <reference types="unlighthouse" />
import { defineConfig } from "unlighthouse"

export default defineConfig({
  site: process.env.UNLIGHTHOUSE_SITE_URL,
  debug: true,
  ci: {
    budget: 90,
    reporter: "jsonExpanded",
  },
})
