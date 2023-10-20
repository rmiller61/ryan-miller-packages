import plugin from "./tailwind.plugin"
import type { Config } from "tailwindcss"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [plugin],
} satisfies Config
