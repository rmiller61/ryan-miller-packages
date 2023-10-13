import type { StorybookConfig as NextStorybookConfig } from "@storybook/nextjs"
import type { StorybookConfig as ViteStorybookConfig } from "@storybook/react-vite"

export const baseConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  features: {
    storyStoreV7: true,
  },
}

export const viteConfig: ViteStorybookConfig = {
  ...baseConfig,
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
}

export const nextConfig: NextStorybookConfig = {
  ...baseConfig,
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
}
