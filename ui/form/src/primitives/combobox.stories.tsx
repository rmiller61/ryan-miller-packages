import { Combobox } from "./combobox"
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Primitives/Combobox",
  component: Combobox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
