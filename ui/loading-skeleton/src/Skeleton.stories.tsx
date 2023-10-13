import Skeleton from "."
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Skeleton",
  component: Skeleton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
