import { basePreview } from "@social-hustle/config-storybook"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    layout: "fullscreen",
  },
}
export default preview
